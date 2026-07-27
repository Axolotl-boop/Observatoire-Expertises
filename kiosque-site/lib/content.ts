import fs from "node:fs";
import path from "node:path";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

/** Dossier où sont déposés les .md synchronisés depuis SharePoint. */
export const CONTENT_DIR = path.join(process.cwd(), "content");

/**
 * Seuls les fichiers de ce dossier SharePoint sont des newsletters. On cible le
 * dossier exact et non la sous-chaîne « Newsletter », qui attraperait aussi les
 * fiches du référentiel technique (ex. « Fiche-Flux-Newsletters-Format-A.md »).
 */
const NEWSLETTER_FOLDER = "Newsletters-pré-digérées/";

export interface Newsletter {
  /** Identifiant dérivé du nom de fichier, utilisé dans l'URL. */
  slug: string;
  /** Titre de l'édition (extrait de l'entête « Digest de contenu — … »). */
  title: string;
  /** Source / publication canonique (ex. « Le Ticket », « SVPG »). */
  source: string;
  /** Date ISO (front-matter, sinon déduite du chemin/nom, sinon mtime). */
  date?: string;
  /** Début de la section « Verdict » de la newsletter. */
  verdict?: string;
  /** Chemin SharePoint d'origine (traçabilité). */
  sourcePath?: string;
}

export interface NewsletterEntry extends Newsletter {
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

/** Slugs des seuls fichiers issus du dossier des newsletters pré-digérées. */
function newsletterSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((name) => name.toLowerCase().endsWith(".md"))
    .map((name) => name.replace(/\.md$/i, ""))
    .filter((slug) => (INDEX[slug]?.path || "").includes(NEWSLETTER_FOLDER));
}

/** Déduit une date ISO (AAAA-MM-JJ) depuis un chemin/nom de fichier. */
function extractDate(p: string): string | undefined {
  const full = p.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (full) return `${full[1]}-${full[2]}-${full[3]}`;
  const ym = p.match(/(\d{4})-(\d{2})(?!\d)/);
  if (ym) return `${ym[1]}-${ym[2]}-01`;
  return undefined;
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
  [/bytebytego|alex xu/i, "ByteByteGo"],
  // « The Skip » avant « Lenny » : ses éditions sont cross-postées chez Lenny et
  // portent les deux noms — la publication d'origine doit l'emporter.
  [/the skip|nikhyl singhal/i, "The Skip"],
  [/lenny/i, "Lenny's Newsletter"],
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

/** Titre lisible déduit du nom de fichier, en dernier recours. */
function deriveTitle(relPath: string): string {
  const file = relPath.split("/").pop() || relPath;
  const base = file.replace(/\.md$/i, "").replace(/^\d{4}-\d{2}-\d{2}[_-]?/, "");
  const s = base.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : file;
}

/**
 * Lit le fichier BRUT d'une newsletter. On n'utilise volontairement pas
 * gray-matter ici : certains fichiers commencent par « --- » sans être un vrai
 * front-matter, et l'entête « Digest de contenu » (ligne #) serait alors vue
 * comme un commentaire YAML puis supprimée.
 */
function readRaw(slug: string): { raw: string; mtime: Date } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  return {
    raw: fs.readFileSync(filePath, "utf8"),
    mtime: fs.statSync(filePath).mtime,
  };
}

function buildNewsletter(slug: string): Newsletter | null {
  const parsed = readRaw(slug);
  if (!parsed) return null;
  const { raw, mtime } = parsed;
  const idx = INDEX[slug];
  const relPath = idx?.path;
  const { source, title } = parseNewsletterHeading(raw);

  return {
    slug,
    title: title || (relPath ? deriveTitle(relPath) : slug),
    source: source || "Autres",
    date:
      (relPath ? extractDate(relPath) : undefined) || idx?.modified || mtime.toISOString(),
    verdict: extractVerdict(raw),
    sourcePath: relPath,
  };
}

/** Toutes les newsletters, de la plus récente à la plus ancienne. */
export function getNewsletters(): Newsletter[] {
  return newsletterSlugs()
    .map(buildNewsletter)
    .filter((n): n is Newsletter => n !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

/** Slugs à pré-générer statiquement. */
export function getNewsletterSlugs(): string[] {
  return newsletterSlugs();
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

/**
 * Retire le préambule d'une newsletter : l'entête « Digest de contenu — … »
 * (déjà affichée comme titre de page) et les séparateurs « --- » qui
 * l'encadrent. L'entête se présente sous plusieurs formes selon l'agent qui a
 * produit le fichier — nue, en gras `**…**` ou en titre `## …` — et tantôt
 * avant, tantôt après le premier « --- » : on balaie donc les premières lignes
 * plutôt que d'essayer de couvrir chaque combinaison par une expression.
 *
 * Si aucune entête n'est trouvée, le corps est renvoyé intact : mieux vaut une
 * redite qu'un début de contenu amputé.
 */
function stripDigestHeading(raw: string): string {
  const lines = raw.replace(/^﻿/, "").split(/\r?\n/);
  let i = 0;
  let found = false;
  while (i < lines.length) {
    const l = lines[i].trim();
    if (l === "" || /^-{3,}$/.test(l)) {
      i++;
      continue;
    }
    if (!found && /Digest de contenu/i.test(l)) {
      found = true;
      i++;
      continue;
    }
    break;
  }
  return found ? lines.slice(i).join("\n") : raw;
}

/** Charge une newsletter complète (métadonnées + HTML rendu). */
export async function getNewsletter(slug: string): Promise<NewsletterEntry | null> {
  const meta = buildNewsletter(slug);
  if (!meta) return null;
  const parsed = readRaw(slug);
  if (!parsed) return null;
  return { ...meta, html: await renderMarkdown(stripDigestHeading(parsed.raw)) };
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
