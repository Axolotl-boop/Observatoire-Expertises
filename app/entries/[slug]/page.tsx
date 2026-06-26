import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllSlugs, getEntry } from "@/lib/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry(decodeURIComponent(slug));
  if (!entry) return { title: "Entrée introuvable" };
  return { title: `${entry.title} — Observatoire des Expertises` };
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getEntry(decodeURIComponent(slug));
  if (!entry) notFound();

  return (
    <article>
      <Link
        href="/"
        className="text-sm text-indigo-600 hover:underline"
      >
        ← Retour au catalogue
      </Link>

      <header className="mt-4 mb-6 border-b border-gray-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {entry.agent && (
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
              {entry.agent}
            </span>
          )}
          {entry.category && (
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
              {entry.category}
            </span>
          )}
          {entry.date && (
            <span className="text-gray-400">{formatDate(entry.date)}</span>
          )}
        </div>
        <h1 className="mt-3 text-3xl font-bold text-gray-900">{entry.title}</h1>
        {entry.description && (
          <p className="mt-2 text-gray-600">{entry.description}</p>
        )}
      </header>

      <div
        className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-a:text-indigo-600"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}
