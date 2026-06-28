import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

/** Dossier où sont déposés les .md synchronisés depuis SharePoint. */
export const CONTENT_DIR = path.join(process.cwd(), "content");

export interface EntryMeta {
  /** Identifiant dérivé du nom de fichier, utilisé dans l'URL. */
  slug: string;
  /** Titre affiché. */
  title: string;
  /** Résumé / extrait affiché dans le catalogue. */
  description?: string;
  /** Espace de plus haut niveau (ex. « Veille Agentique Tribe Produit »). */
  section?: string;
  /** Catégorie (ex. « Matière brute », « Digests par expertise »). */
  category?: string;
  /** Sous-catégorie / expertise (ex. « Veille concurrentielle », « QA »). */
  subcategory?: string;
  /** Agent IA à l'origine de la donnée (front-matter `agent`). */
  agent?: string;
  /** Étiquettes (front-matter `tags`). */
  tags: string[];
  /** Date ISO (front-matter, sinon déduite du chemin/nom, sinon mtime). */
  date?: string;
  /** Chemin SharePoint d'origine (pour affichage / traçabilité). */
  sourcePath?: string;
}

export interface Entry extends EntryMeta {
  /** Contenu HTML rendu depuis le Markdown. */
  html: string;
}

interface IndexEntry {
  path: string;
  modified?: string | null;
}

/** Index slug -> chemin SharePoint, produit par la synchro (content/_index.json). */
function loadIndex(): Record<string, IndexEntry> {
  const p = path.join(CONTENT_DIR, "_index.json");
  if (!fs.existsSync(p)) return {};
  try {
    return JSON.parse(fs.readFileSync(p, "utf8")) as Record<string, IndexEntry>;
  } catch {
    return {};
  }
}
const INDEX = loadIndex();

function listMarkdownFiles(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.toLowerCase().endsWith(".md"));
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/i, "");
}

function firstHeading(markdown: string): string | undefined {
  const match = markdown.match(/^\s*#\s+(.+?)\s*$/m);
  return match?.[1]?.trim();
}

function toStringArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

// ---------------------------------------------------------------------------
// Déduction de métadonnées à partir du chemin SharePoint d'origine
// ---------------------------------------------------------------------------

/** Nettoie un segment de chemin pour l'affichage. */
function cleanLabel(seg: string): string {
  const s = seg
    .replace(/\.md$/i, "")
    .replace(/^\d+\s*[-_.)]\s*/, "") // retire une numérotation en tête : "01-", "2 - "
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : seg;
}

function isPeriodSegment(seg: string): boolean {
  return /^\d{4}-(\d{2}|T[1-4])$/i.test(seg);
}

/** Déduit une date ISO (AAAA-MM-JJ) depuis un chemin/nom de fichier. */
function extractDate(p: string): string | undefined {
  const full = p.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (full) return `${full[1]}-${full[2]}-${full[3]}`;
  const q = p.match(/(\d{4})-T([1-4])/i);
  if (q) {
    const month = (Number(q[2]) - 1) * 3 + 1;
    return `${q[1]}-${String(month).padStart(2, "0")}-01`;
  }
  const ym = p.match(/(\d{4})-(\d{2})(?!\d)/);
  if (ym) return `${ym[1]}-${ym[2]}-01`;
  return undefined;
}

/** Titre lisible déduit du nom de fichier. */
function deriveTitle(relPath: string): string {
  const file = relPath.split("/").pop() || relPath;
  const base = file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}[_-]?/, "");
  return cleanLabel(base);
}

function deriveTaxonomy(relPath: string): {
  section?: string;
  category?: string;
  subcategory?: string;
} {
  const segs = relPath.split("/").filter(Boolean);
  const parents = segs.slice(0, -1); // tout sauf le fichier
  const section = parents[0] ? cleanLabel(parents[0]) : undefined;
  const category = parents[1] ? cleanLabel(parents[1]) : undefined;
  let subcategory: string | undefined;
  for (const seg of parents.slice(2)) {
    if (isPeriodSegment(seg)) continue; // on ignore les dossiers de période
    subcategory = cleanLabel(seg);
    break;
  }
  return { section, category, subcategory };
}

/** Court extrait textuel depuis le corps Markdown. */
function deriveExcerpt(body: string): string | undefined {
  const text = body
    .replace(/```[\s\S]*?```/g, " ") // blocs de code
    .replace(/^#{1,6}\s.*$/gm, " ") // titres
    .replace(/!\[.*?\]\(.*?\)/g, " ") // images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // liens -> texte
    .replace(/[>#*_`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return undefined;
  return text.length > 180 ? `${text.slice(0, 180).trim()}…` : text;
}

function readRaw(
  slug: string,
): { data: Record<string, unknown>; body: string; mtime: Date } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const stat = fs.statSync(filePath);
  // Beaucoup de fichiers (contenus scrapés) commencent par "---" sans être un
  // vrai front-matter YAML : on tolère l'échec d'analyse et on traite alors le
  // fichier comme du contenu brut, plutôt que de faire planter tout le build.
  let data: Record<string, unknown> = {};
  let content = raw;
  try {
    const parsed = matter(raw);
    data = parsed.data as Record<string, unknown>;
    content = parsed.content;
  } catch {
    data = {};
    content = raw;
  }
  return { data, body: content, mtime: stat.mtime };
}

function buildMeta(slug: string): EntryMeta | null {
  const parsed = readRaw(slug);
  if (!parsed) return null;
  const { data, body, mtime } = parsed;

  const idx = INDEX[slug];
  const relPath = idx?.path;
  const tax = relPath ? deriveTaxonomy(relPath) : {};

  const title =
    (typeof data.title === "string" && data.title.trim()) ||
    firstHeading(body) ||
    (relPath ? deriveTitle(relPath) : "") ||
    slug;

  const description =
    (typeof data.description === "string" && data.description) ||
    (typeof data.resume === "string" && data.resume) ||
    deriveExcerpt(body);

  const agent = typeof data.agent === "string" ? data.agent : undefined;

  const category =
    (typeof data.categorie === "string" && data.categorie) ||
    (typeof data.category === "string" && data.category) ||
    tax.category;

  const date =
    (typeof data.date === "string" && data.date) ||
    (data.date instanceof Date && data.date.toISOString()) ||
    (relPath ? extractDate(relPath) : undefined) ||
    idx?.modified ||
    mtime.toISOString();

  return {
    slug,
    title: String(title),
    description: description || undefined,
    section: tax.section,
    category: category || undefined,
    subcategory: tax.subcategory,
    agent,
    tags: toStringArray(data.tags),
    date,
    sourcePath: relPath,
  };
}

/** Liste toutes les entrées (métadonnées seules), de la plus récente à la plus ancienne. */
export function getAllEntries(): EntryMeta[] {
  return listMarkdownFiles()
    .map((file) => buildMeta(slugFromFilename(file)))
    .filter((e): e is EntryMeta => e !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/** Le fichier PAD « bootstrap » ne doit jamais apparaître sur le site. */
function isHidden(slug: string): boolean {
  return /bootstrap/i.test(INDEX[slug]?.path || "");
}

export function getAllSlugs(): string[] {
  return listMarkdownFiles().map(slugFromFilename).filter((s) => !isHidden(s));
}

export interface Newsletter extends EntryMeta {
  /** Source / publication (ex. « Ravi Mehta », « Le Ticket »). */
  source: string;
  /** Début de la section « Verdict » de la newsletter. */
  verdict?: string;
}

/** Extrait le début de la section « VERDICT » d'une newsletter. */
function extractVerdict(raw: string): string | undefined {
  const lines = raw.split(/\r?\n/);
  const start = lines.findIndex((l) => /^#{0,6}\s*\d*\.?\s*verdict\b/i.test(l.trim()));
  if (start < 0) return undefined;
  const collected: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) break; // section suivante
    if (/^\s*-{3,}\s*$/.test(line)) break; // séparateur ---
    collected.push(line);
    if (collected.join(" ").trim().length > 240) break;
  }
  const text = collected
    .join(" ")
    .replace(/[#>*_`]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return undefined;
  return text.length > 220 ? `${text.slice(0, 220).trim()}…` : text;
}

/**
 * Sources connues : plusieurs formulations (auteur, publication, co-signatures)
 * désignent la même source. On les ramène à un libellé canonique pour le
 * regroupement. Une source inconnue conserve son libellé nettoyé.
 */
const SOURCE_ALIASES: [RegExp, string][] = [
  [/product ops confidential|graham reed|antonia landi|popsco|opscast/i, "Product Ops Confidential"],
  [/the setups|florian mascaro/i, "The Setups"],
  [/yeita|pauline egea/i, "Yeita"],
  [/le ticket/i, "Le Ticket"],
  [/john cutler|\btbm\b/i, "John Cutler"],
  [/ravi mehta/i, "Ravi Mehta"],
  [/svpg|silicon valley product group|marty cagan/i, "SVPG"],
];

function canonicalSource(raw: string): string {
  for (const [re, name] of SOURCE_ALIASES) if (re.test(raw)) return name;
  return raw;
}

/**
 * Extrait la source et le titre d'une newsletter depuis sa 1re ligne
 * « Digest de contenu — <Source>, « <Titre> » (date) ».
 */
function parseNewsletterHeading(body: string): { source?: string; title?: string } {
  const m = body.match(/Digest de contenu\s*[—–-]\s*([^\n]+)/i);
  if (!m) return {};
  const s = m[1].replace(/\*+/g, "").trim();
  const titleM = s.match(/[«"“]\s*(.+?)\s*[»"”]/);
  const title = titleM?.[1]?.trim();
  const before = titleM ? s.slice(0, s.indexOf(titleM[0])) : s;
  const cleaned = before
    .replace(/newsletter\s*N[°ºo]?\s*\d+/gi, "") // « newsletter #96 »
    .replace(/N[°ºo]\s*\d+/gi, "") // numéros d'édition
    .replace(/\([^)]*\)/g, "") // parenthèses (emails, mentions)
    .replace(/^[\s,;/&-]+|[\s,;/&-]+$/g, "") // ponctuation en début/fin
    .replace(/\s+/g, " ")
    .trim();
  return { source: cleaned ? canonicalSource(cleaned) : undefined, title };
}

/** Newsletters (dossier « Newsletters-pré-digérées »), enrichies de leur source et titre. */
export function getNewsletters(): Newsletter[] {
  return getAllEntries()
    .filter((e) => (e.sourcePath || "").includes("Newsletter"))
    .map((e) => {
      // On lit le fichier BRUT : certains commencent par « --- » et gray-matter
      // retirerait l'entête « Digest de contenu » (ligne #, vue comme commentaire YAML).
      const filePath = path.join(CONTENT_DIR, `${e.slug}.md`);
      const raw = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
      const { source, title } = parseNewsletterHeading(raw);
      return {
        ...e,
        title: title || e.title,
        source: source || "Autres",
        verdict: extractVerdict(raw),
      };
    });
}

/** Mois (AAAA-MM) d'une date ISO, ou « ???? » si indéterminé. */
export function monthOf(iso?: string): string {
  if (!iso) return "????";
  const m = iso.match(/^(\d{4})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}` : "????";
}

/** Date ISO du dernier passage de synchro SharePoint (content/_meta.json). */
export function getLastSync(): string | null {
  const p = path.join(CONTENT_DIR, "_meta.json");
  if (fs.existsSync(p)) {
    try {
      const meta = JSON.parse(fs.readFileSync(p, "utf8")) as { syncedAt?: string };
      if (meta.syncedAt) return meta.syncedAt;
    } catch {
      /* ignore */
    }
  }
  // Repli : la plus récente date de modification des fichiers indexés.
  const mods = Object.values(INDEX)
    .map((v) => v.modified)
    .filter((m): m is string => Boolean(m))
    .sort();
  return mods.length ? mods[mods.length - 1] : null;
}

/** Une ligne du tableau de synthèse : [élément, statut, verdict, source/date]. */
export type SynthRow = string[];

export interface EmploiExpertise {
  key: string;
  label: string;
  competences: SynthRow[];
  outils: SynthRow[];
  /** Contenu brut du .md et nom de fichier d'origine (pour téléchargement). */
  raw: string;
  filename: string;
}

export interface EmploiQuarter {
  quarter: string; // ex. « 2026-T2 »
  expertises: EmploiExpertise[];
}

const EMPLOI_ORDER = ["pm", "qa", "productops", "pmm", "datapm", "productai"];
const EMPLOI_LABELS: Record<string, string> = {
  pm: "Product Management",
  qa: "QA",
  productops: "Product Ops",
  pmm: "PMM",
  datapm: "Data PM",
  productai: "IA PM",
};

/**
 * Extrait les lignes de synthèse d'une dimension (Compétences / Outils), en colonnes.
 * Gère trois formats rencontrés au fil des synchros :
 *  1. Sous-section démarrée par une ligne « **LABEL** » autonome, puis tableau
 *     Markdown (| Item | État | … |) ou puces « - item · statut · verdict · date ».
 *  2. Puces où la dimension est préfixée dans le libellé et les colonnes séparées
 *     par des « | » : « - **Compétences — libellé** | ✅ | [verdict] | date ».
 */
function synthRows(lines: string[], labelRe: RegExp): SynthRow[] {
  // Format 1 : en-tête de sous-section « **LABEL** » autonome.
  const start = lines.findIndex((l) => /^\*\*.+\*\*$/.test(l.trim()) && labelRe.test(l));
  if (start >= 0) {
    const rows: SynthRow[] = [];
    for (let i = start + 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (/^\*\*.+\*\*$/.test(l)) break; // sous-section suivante
      if (l.startsWith("|")) {
        const cells = l.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        if (cells.length < 2) continue;
        if (/^-+$/.test(cells[0].replace(/\s/g, ""))) continue; // séparateur |---|
        if (/^(item|[ée]l[ée]ment)$/i.test(cells[0])) continue; // ligne d'en-tête
        rows.push(cells);
      } else if (l.startsWith("-")) {
        rows.push(l.replace(/^-\s*/, "").split(/\s[·•]\s/).map((c) => c.trim()));
      }
    }
    if (rows.length) return rows;
  }

  // Format 2 : puces « - **Dimension — libellé** | statut | verdict | date ».
  const rows: SynthRow[] = [];
  for (const raw of lines) {
    const l = raw.trim();
    if (!l.startsWith("-")) continue;
    const cells = l.replace(/^-\s*/, "").split("|").map((c) => c.trim());
    if (cells.length < 2) continue;
    const head = cells[0].replace(/\*\*/g, "").trim(); // « Dimension — libellé »
    const idx = head.search(/\s[—–]\s/);
    if (idx < 0) continue;
    const dim = head.slice(0, idx).trim();
    if (!labelRe.test(dim)) continue;
    const item = head.slice(idx).replace(/^\s*[—–]\s*/, "").trim();
    rows.push([item, ...cells.slice(1)]);
  }
  return rows;
}

/**
 * Veille-emploi trimestrielle : un fichier par expertise dans les dossiers
 * « 20XX-TX » (les dossiers « 20XX-06 » sont des snapshots mensuels, ignorés).
 * On en extrait les tableaux de synthèse « Compétences » et « Outils ».
 */
export async function getEmploiQuarters(): Promise<EmploiQuarter[]> {
  const byQuarter = new Map<string, Map<string, EmploiExpertise>>();
  for (const e of getAllEntries()) {
    const p = e.sourcePath || "";
    if (!p.includes("Veille-emploi")) continue;
    const qm = p.match(/\/(20\d\d-T[1-4])\//i);
    if (!qm) continue; // on écarte les snapshots mensuels
    const quarter = qm[1].toUpperCase();
    const km = p.match(/snapshot-emploi-([a-z]+)-t[1-4]/i);
    const key = km ? km[1].toLowerCase() : "";
    if (!EMPLOI_LABELS[key]) continue;

    const filePath = path.join(CONTENT_DIR, `${e.slug}.md`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw.split(/\r?\n/);
    const synth = sectionLines(lines, /^##\s*Tableau de synth/i);

    const exp: EmploiExpertise = {
      key,
      label: EMPLOI_LABELS[key],
      competences: synthRows(synth, /COMP[ÉE]TENCES/i),
      outils: synthRows(synth, /OUTILS/i),
      raw,
      filename: (e.sourcePath || `${e.slug}.md`).split("/").pop() || `${e.slug}.md`,
    };
    if (!byQuarter.has(quarter)) byQuarter.set(quarter, new Map());
    byQuarter.get(quarter)!.set(key, exp);
  }

  return Array.from(byQuarter.entries())
    .map(([quarter, m]) => ({
      quarter,
      expertises: EMPLOI_ORDER.filter((k) => m.has(k)).map((k) => m.get(k)!),
    }))
    .sort((a, b) => b.quarter.localeCompare(a.quarter));
}

export interface ConcurrenceAxis {
  title: string;
  html: string;
}

export interface ConcurrenceTrackingRow {
  cabinet: string;
  axis: string; // libellé court de l'axe (ex. « Axe 1 »)
  move: string; // description du mouvement
  verdict: string; // verdict brut (ex. « [tendance] »)
  verdictKey: string; // mode | tendance | structurel | ""
  date: string;
}

export interface ConcurrenceQuarter {
  quarter: string;
  lectureHtml: string;
  axes: ConcurrenceAxis[];
  tracking: ConcurrenceTrackingRow[];
  cabinets: string[];
  /** Contenu brut du .md et nom de fichier d'origine (pour téléchargement). */
  raw: string;
  filename: string;
}

/** Parse le « Tableau de suivi » (cabinet × axe) en lignes longues filtrables. */
function parseTracking(lines: string[]): ConcurrenceTrackingRow[] {
  const section = sectionLines(lines, /^##\s*Tableau de suivi/i);
  const tableRows = section.filter((l) => l.trim().startsWith("|"));
  const rows: ConcurrenceTrackingRow[] = [];
  let axisHeaders: string[] = [];
  for (const r of tableRows) {
    const cells = r
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((c) => c.trim());
    if (cells.every((c) => /^-+$/.test(c.replace(/\s/g, "")))) continue; // séparateur
    if (axisHeaders.length === 0 && /cabinet/i.test(cells[0])) {
      axisHeaders = cells.slice(1).map((c) => {
        const m = c.replace(/\*\*/g, "").match(/Axe\s*\d+/i);
        return m ? m[0] : c.replace(/\*\*/g, "").trim();
      });
      continue;
    }
    const cabinet = cells[0].replace(/\*\*/g, "").trim();
    if (!cabinet) continue;
    cells.slice(1).forEach((cell, idx) => {
      const c = cell.trim();
      if (!c || /^⬜/.test(c) || c === "—") return;
      const vm = c.match(/\[(mode|tendance|structurel)[^\]]*\]/i);
      const dm = c.match(/\d{4}-\d{2}(?:-\d{2})?/);
      const move = c
        .replace(/^✅\s*/, "")
        .replace(/\s*·?\s*\[(mode|tendance|structurel)[^\]]*\][^·]*/i, "")
        .replace(/\s*·?\s*\d{4}-\d{2}(?:-\d{2})?\s*$/, "")
        .replace(/\s*·\s*$/, "")
        .trim();
      rows.push({
        cabinet,
        axis: axisHeaders[idx] || `Axe ${idx + 1}`,
        move,
        verdict: vm ? vm[0] : "",
        verdictKey: vm ? vm[1].toLowerCase() : "",
        date: dm ? dm[0] : "",
      });
    });
  }
  return rows;
}

/**
 * Nettoie les puces de la veille concurrentielle : retire les segments
 * « surface : … », « source : … », « tag : … » et les verdicts inline
 * [mode]/[tendance]/[structurel].
 */
function stripConcurrenceMeta(md: string): string {
  return md
    .split(/\r?\n/)
    .map((line) => {
      let l = line;
      if (/\s[·•]\s/.test(l)) {
        const parts = l.split(/\s[·•]\s/);
        l = parts
          .filter((p, i) => i === 0 || !/^(surfaces?|sources?|tags?)\s*:/i.test(p.trim()))
          .join(" · ");
      }
      return l
        .replace(/\[(mode|tendance|structurel)[^\]]*\]/gi, "") // verdicts inline
        .replace(/\s+·\s*$/, "") // séparateur orphelin en fin
        .replace(/[ \t]{2,}/g, " ")
        .replace(/\s+([.,;])/g, "$1")
        .trimEnd();
    })
    .join("\n");
}

/**
 * Veille concurrentielle trimestrielle : un fichier unique par trimestre
 * (dossiers « 20XX-TX »), organisé par Axes + une Lecture transverse.
 */
export async function getConcurrenceQuarters(): Promise<ConcurrenceQuarter[]> {
  const byQuarter = new Map<string, string>(); // quarter -> slug
  for (const e of getAllEntries()) {
    const p = e.sourcePath || "";
    if (!p.includes("Veille-concurrentielle")) continue;
    const qm = p.match(/\/(20\d\d-T[1-4])\//i);
    if (!qm) continue; // on écarte les snapshots mensuels
    byQuarter.set(qm[1].toUpperCase(), e.slug);
  }

  const result: ConcurrenceQuarter[] = [];
  for (const [quarter, slug] of byQuarter) {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) continue;
    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw.split(/\r?\n/);
    const meta = INDEX[slug];

    const axes: ConcurrenceAxis[] = [];
    for (let i = 0; i < lines.length; i++) {
      const m = lines[i].match(/^##\s*(Axe\s*\d+.*)$/i);
      if (!m) continue;
      const title = m[1].split(/\s[·•]\s/)[0].trim(); // on retire les tags « · [transverse] »
      const body: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (/^##\s/.test(lines[j])) break;
        body.push(lines[j]);
      }
      const md = stripConcurrenceMeta(
        body.join("\n").replace(/^\s*-{3,}\s*$/gm, "").trim(),
      );
      axes.push({ title, html: await renderMarkdown(md) });
    }

    const lecture = sectionLines(lines, /^##\s*Lecture transverse/i);
    const tracking = parseTracking(lines);
    const cabinets = Array.from(new Set(tracking.map((t) => t.cabinet))).sort();
    result.push({
      quarter,
      lectureHtml: await renderMarkdown(lecture.join("\n")),
      axes,
      tracking,
      cabinets,
      raw,
      filename: (meta?.path || `${slug}.md`).split("/").pop() || `${slug}.md`,
    });
  }
  return result.sort((a, b) => b.quarter.localeCompare(a.quarter));
}

export interface PadChartRow {
  label: string;
  value: number;
}

export interface PadMonth {
  month: string; // AAAA-MM
  date?: string;
  signauxHtml: string;
  mix: { rows: PadChartRow[]; conclusionHtml: string };
  profils: { rows: PadChartRow[]; conclusionHtml: string };
}

/** Lignes d'une section délimitée par son titre, jusqu'au prochain titre ## / ### ou « --- ». */
function sectionLines(lines: string[], startRe: RegExp): string[] {
  const start = lines.findIndex((l) => startRe.test(l));
  if (start < 0) return [];
  const out: string[] = [];
  for (let i = start + 1; i < lines.length; i++) {
    const l = lines[i];
    if (/^#{2,3}\s/.test(l)) break;
    if (/^\s*-{3,}\s*$/.test(l)) break;
    out.push(l);
  }
  return out;
}

/** Parse un tableau Markdown « | label | valeur | » en lignes {label, value}. */
function parsePadTable(lines: string[]): PadChartRow[] {
  const rows: PadChartRow[] = [];
  for (const l of lines) {
    const m = l.match(/^\s*\|(.+)\|\s*$/);
    if (!m) continue;
    const cells = m[1].split("|").map((c) => c.trim());
    if (cells.length < 2) continue;
    if (/^-+$/.test(cells[0].replace(/\s/g, ""))) continue; // séparateur |---|
    const numStr = cells[1].replace(/[^\d.-]/g, "");
    if (numStr === "") continue; // ligne d'en-tête (« Mentions », « Occurrences »)
    const value = Number(numStr);
    if (Number.isNaN(value)) continue;
    rows.push({ label: cells[0], value });
  }
  return rows;
}

/** Texte de conclusion d'une section (les lignes hors tableau). */
function padConclusion(lines: string[]): string {
  return lines
    .filter((l) => !/^\s*\|/.test(l))
    .join("\n")
    .trim();
}

/** Notes PAD mensuelles (hors « bootstrap »), parsées en sections, plus récentes d'abord. */
export async function getPadMonths(): Promise<PadMonth[]> {
  const notes = getAllEntries().filter(
    (e) => (e.sourcePath || "").includes("Notes-PAD") && !/bootstrap/i.test(e.sourcePath || ""),
  );
  const result: PadMonth[] = [];
  for (const e of notes) {
    const filePath = path.join(CONTENT_DIR, `${e.slug}.md`);
    if (!fs.existsSync(filePath)) continue;
    const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

    const signaux = sectionLines(lines, /^##\s*5\.?\s*Signaux saillants/i);
    const mixL = sectionLines(lines, /^###\s*Mix par expertise/i);
    const profL = sectionLines(lines, /^###\s*Profils?\s+et\s+s[ée]niorit/i);

    result.push({
      month: monthOf(e.date),
      date: e.date,
      signauxHtml: await renderMarkdown(signaux.join("\n")),
      mix: {
        rows: parsePadTable(mixL),
        conclusionHtml: await renderMarkdown(padConclusion(mixL)),
      },
      profils: {
        rows: parsePadTable(profL),
        conclusionHtml: await renderMarkdown(padConclusion(profL)),
      },
    });
  }
  return result.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

async function renderMarkdown(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown);
  return String(file);
}

/** Charge une entrée complète (métadonnées + HTML rendu). */
export async function getEntry(slug: string): Promise<Entry | null> {
  if (isHidden(slug)) return null;
  const meta = buildMeta(slug);
  if (!meta) return null;
  const isNewsletter = (meta.sourcePath || "").includes("Newsletter");
  let bodyMd: string;
  if (isNewsletter) {
    // Contenu brut : conserve l'entête « Digest de contenu — … » que gray-matter
    // retirerait sur les fichiers commençant par « --- » (ligne # vue comme commentaire).
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    if (!fs.existsSync(filePath)) return null;
    bodyMd = fs
      .readFileSync(filePath, "utf8")
      .replace(/^﻿?---[ \t]*\r?\n/, ""); // retire un « --- » d'ouverture éventuel
  } else {
    const parsed = readRaw(slug);
    if (!parsed) return null;
    bodyMd = parsed.body;
  }
  const html = await renderMarkdown(bodyMd);
  return { ...meta, html };
}

// ---------------------------------------------------------------------------
// Digests par expertise (dossier 02-Digests-par-expertise)
// ---------------------------------------------------------------------------

/** Les 6 expertises et le dossier SharePoint correspondant. Ordre = ordre d'affichage. */
export const EXPERTISES: { key: string; label: string; folder: string }[] = [
  { key: "product-management", label: "Product Management", folder: "Product-Management" },
  { key: "qa", label: "QA", folder: "QA" },
  { key: "product-ops", label: "Product Ops", folder: "Product-Ops" },
  { key: "pmm", label: "PMM", folder: "PMM" },
  { key: "data-pm", label: "Data PM", folder: "Data-PM" },
  { key: "ia-pm", label: "IA PM", folder: "Product-AI" },
];

/** Clés des 4 blocs « carte » de l'Observatoire. */
export type DigestBlockKey = "avantVente" | "convictions" | "competences" | "contenus";

/** Les 4 blocs (hors « hero », « matière ») avec leur titre d'affichage. */
export const DIGEST_BLOCKS: { key: DigestBlockKey; title: string }[] = [
  { key: "avantVente", title: "Problématiques récurrentes & Offres" },
  { key: "convictions", title: "Convictions à challenger" },
  { key: "competences", title: "Compétences recherchées" },
  { key: "contenus", title: "Contenus de notoriété suggérés" },
];

export interface DigestSections {
  /** « Les signaux importants du mois » (bloc hero). */
  signaux: string;
  /** « Matière mobilisée ce cycle » (encart de bas de page). */
  matiere: string;
  avantVente: string;
  convictions: string;
  competences: string;
  contenus: string;
}

export interface DigestEntry {
  month: string; // AAAA-MM
  date?: string;
  slug: string;
  sections: DigestSections;
}

export interface ExpertiseDigest {
  key: string;
  label: string;
  available: boolean;
  /** Digests mensuels, du plus récent au plus ancien. */
  entries: DigestEntry[];
}

/** Digests d'une expertise (hors fichiers *REPORT*), du plus récent au plus ancien. */
function digestSlugsForFolder(folder: string): { slug: string; date: string }[] {
  const needle = `/02-Digests-par-expertise/${folder}/`;
  return Object.entries(INDEX)
    .filter(([, v]) => v.path.includes(needle))
    .filter(([, v]) => !/report/i.test(v.path))
    .map(([slug, v]) => ({ slug, date: extractDate(v.path) || "" }))
    .sort((a, b) => b.date.localeCompare(a.date) || b.slug.localeCompare(a.slug));
}

/**
 * Extrait le texte situé entre une ligne de début (exclue) et la première ligne
 * suivante qui matche l'une des bornes de fin. Nettoie les séparateurs « --- ».
 */
function extractBetween(lines: string[], startRe: RegExp, endRes: RegExp[]): string {
  const start = lines.findIndex((l) => startRe.test(l));
  if (start < 0) return "";
  let end = lines.length;
  for (let i = start + 1; i < lines.length; i++) {
    if (endRes.some((re) => re.test(lines[i]))) {
      end = i;
      break;
    }
  }
  return lines
    .slice(start + 1, end)
    .join("\n")
    .replace(/^\s*-{3,}\s*$/gm, "")
    .trim();
}

/**
 * Extrait l'encart « Matière mobilisée ce cycle » : les cases ☑/☐ (sur une seule
 * ligne, séparées par « · ») et la ligne de conclusion « → … » qui suit.
 */
function extractMatiere(lines: string[]): string {
  const i = lines.findIndex((l) => /Matière mobilisée ce cycle/i.test(l));
  if (i < 0) return "";
  const first = lines[i].replace(/^.*?Matière mobilisée ce cycle\s*\**\s*:?\s*/i, "");
  const parts = [first];
  for (let j = i + 1; j < lines.length; j++) {
    const l = lines[j].trim();
    if (!l || /^-{3,}$/.test(l) || /^#{1,4}\s/.test(l)) break;
    parts.push(l);
  }
  return parts.join("\n").trim();
}

/** Découpe le corps d'un digest (format « Bloc 1-4 ») en ses sections. */
function sliceDigestSections(body: string): DigestSections {
  const lines = body.split(/\r?\n/);
  const h2 = /^##\s/; // titre de bloc (les sous-titres ### ne matchent pas)
  const bloc = (n: number) =>
    extractBetween(lines, new RegExp(`^##\\s*Bloc\\s*${n}\\b`, "i"), [h2]);
  return {
    signaux: extractBetween(lines, /^##\s*Les signaux importants/i, [h2]),
    matiere: extractMatiere(lines),
    avantVente: bloc(1),
    convictions: bloc(2),
    competences: bloc(3),
    contenus: bloc(4),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Colore les verdicts [mode]/[tendance]/[structurel] dans du HTML déjà rendu,
 * qu'ils soient nus ou encadrés par <code> (cas du Markdown `[tendance]`).
 */
function colorizeTagsHtml(html: string): string {
  return html.replace(
    /(?:<code>)?\s*\[(mode|tendance|structurel)\]\s*(?:<\/code>)?/gi,
    (_, t: string) => {
      const k = t.toLowerCase();
      return `<span class="tagpill tagpill-${k}">[${k}]</span>`;
    },
  );
}

/**
 * Rend l'encart « Matière mobilisée ce cycle » : une liste de cases ☑/☐ suivie
 * d'une ligne de conclusion « → … ». (Rendu direct, hors Markdown, pour garder
 * une case par ligne et griser les briques non mobilisées.)
 */
function renderMatiereHtml(md: string): string {
  const items: string[] = [];
  let note = "";
  // Les cases peuvent être sur une seule ligne séparées par « · » (format récent)
  // ou une par ligne (ancien format).
  for (const raw of md.split(/\n|·|•/)) {
    const l = raw.trim();
    if (!l) continue;
    if (/^→/.test(l)) {
      note = l.replace(/^→\s*/, "");
      continue;
    }
    const m = l.match(/^([☑☐✅❌])\s*(.+)$/);
    if (!m) continue;
    const on = /[☑✅]/.test(m[1]);
    items.push(
      `<span style="white-space:nowrap;${on ? "" : "color:#9ca3af;"}">${on ? "☑" : "☐"} ${escapeHtml(
        m[2],
      )}</span>`,
    );
  }
  if (!items.length && !note) return "";
  const list = `<div style="display:flex;flex-wrap:wrap;gap:.35rem 1.25rem">${items.join("")}</div>`;
  const n = note ? `<p style="margin-top:.5rem;color:#5b6472">${escapeHtml(note)}</p>` : "";
  return list + n;
}

/** Pour chaque expertise, charge et rend tous les digests mensuels (format cartes). */
export async function getExpertiseDigests(): Promise<ExpertiseDigest[]> {
  const renderCard = async (s: string) => (s ? colorizeTagsHtml(await renderMarkdown(s)) : "");
  const result: ExpertiseDigest[] = [];
  for (const exp of EXPERTISES) {
    const slugs = digestSlugsForFolder(exp.folder);
    const entries: DigestEntry[] = [];
    for (const { slug, date } of slugs) {
      const parsed = readRaw(slug);
      if (!parsed) continue;
      const secs = sliceDigestSections(parsed.body);
      const sections: DigestSections = {
        signaux: await renderCard(secs.signaux),
        matiere: renderMatiereHtml(secs.matiere),
        avantVente: await renderCard(secs.avantVente),
        convictions: await renderCard(secs.convictions),
        competences: await renderCard(secs.competences),
        contenus: await renderCard(secs.contenus),
      };
      // On n'expose que les mois au nouveau format (au moins un bloc rempli).
      const hasContent =
        sections.signaux ||
        sections.matiere ||
        sections.avantVente ||
        sections.convictions ||
        sections.competences ||
        sections.contenus;
      if (!hasContent) continue;
      entries.push({ month: monthOf(date), date, slug, sections });
    }
    result.push({
      key: exp.key,
      label: exp.label,
      available: entries.length > 0,
      entries,
    });
  }
  return result;
}
