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

  const isNewsletter = (entry.sourcePath ?? "").includes("Newsletter");
  const isPad = (entry.sourcePath ?? "").includes("Notes-PAD");
  const backHref = isNewsletter ? "/kiosque" : isPad ? "/pouls" : "/";
  const backLabel = isNewsletter
    ? "← Retour au kiosque"
    : isPad
      ? "← Retour au pouls du marché"
      : "← Retour à l'accueil";

  return (
    <article>
      <Link href={backHref} className="text-sm text-electrique hover:underline">
        {backLabel}
      </Link>

      <header className="mt-4 mb-6 border-b border-gray-200 pb-6">
        {!isNewsletter && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {entry.category && (
              <span className="rounded-full bg-lilas px-2 py-0.5 font-medium text-violet">
                {entry.category}
              </span>
            )}
            {entry.subcategory && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                {entry.subcategory}
              </span>
            )}
            {entry.agent && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                {entry.agent}
              </span>
            )}
          </div>
        )}
        <h1 className="mt-3 text-3xl font-bold text-gray-900">{entry.title}</h1>
        {entry.date && (
          <p className="mt-2 text-sm text-gray-500">{formatDate(entry.date)}</p>
        )}
        {!isNewsletter && entry.description && (
          <p className="mt-2 text-gray-600">{entry.description}</p>
        )}
      </header>

      <div
        className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-headings:font-title prose-a:text-electrique"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}
