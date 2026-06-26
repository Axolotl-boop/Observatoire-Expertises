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

export function getAllSlugs(): string[] {
  return listMarkdownFiles().map(slugFromFilename);
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
  const meta = buildMeta(slug);
  const parsed = readRaw(slug);
  if (!meta || !parsed) return null;
  const html = await renderMarkdown(parsed.body);
  return { ...meta, html };
}
