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
  /** Titre affiché (front-matter `title`, sinon 1er titre H1, sinon nom de fichier). */
  title: string;
  /** Résumé optionnel (front-matter `description`/`resume`). */
  description?: string;
  /** Agent IA à l'origine de la donnée (front-matter `agent`). */
  agent?: string;
  /** Catégorie / thème (front-matter `categorie`/`category`). */
  category?: string;
  /** Étiquettes (front-matter `tags`). */
  tags: string[];
  /** Date ISO (front-matter `date`, sinon date de modification du fichier). */
  date?: string;
}

export interface Entry extends EntryMeta {
  /** Contenu HTML rendu depuis le Markdown. */
  html: string;
}

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

function readRaw(slug: string): { data: Record<string, unknown>; body: string; mtime: Date } | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const stat = fs.statSync(filePath);
  return { data: data as Record<string, unknown>, body: content, mtime: stat.mtime };
}

function buildMeta(slug: string): EntryMeta | null {
  const parsed = readRaw(slug);
  if (!parsed) return null;
  const { data, body, mtime } = parsed;

  const title =
    (typeof data.title === "string" && data.title.trim()) ||
    firstHeading(body) ||
    slug;

  const description =
    (typeof data.description === "string" && data.description) ||
    (typeof data.resume === "string" && data.resume) ||
    undefined;

  const agent = typeof data.agent === "string" ? data.agent : undefined;

  const category =
    (typeof data.categorie === "string" && data.categorie) ||
    (typeof data.category === "string" && data.category) ||
    undefined;

  const date =
    (typeof data.date === "string" && data.date) ||
    (data.date instanceof Date && data.date.toISOString()) ||
    mtime.toISOString();

  return {
    slug,
    title: String(title),
    description: description || undefined,
    agent,
    category: category || undefined,
    tags: toStringArray(data.tags),
    date,
  };
}

/** Liste toutes les entrées (métadonnées seules), triées de la plus récente à la plus ancienne. */
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
