import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsletter, getNewsletterSlugs } from "@/lib/content";
import { SOURCE_INFO } from "@/lib/sources";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getNewsletterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getNewsletter(decodeURIComponent(slug));
  if (!entry) return { title: "Édition introuvable" };
  return { title: entry.title, description: entry.verdict };
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

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getNewsletter(decodeURIComponent(slug));
  if (!entry) notFound();

  const sourceName = SOURCE_INFO[entry.source]?.name ?? entry.source;

  return (
    <article>
      <Link href="/" className="text-sm text-electrique hover:underline">
        ← Retour au kiosque
      </Link>

      <header className="mt-4 mb-6 border-b border-gray-200 pb-6">
        <p className="text-sm font-medium text-marine">{sourceName}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.01em] text-marine">
          {entry.title}
        </h1>
        {entry.date && <p className="mt-2 text-sm text-gray-500">{formatDate(entry.date)}</p>}
      </header>

      <div
        className="prose prose-slate max-w-none prose-headings:scroll-mt-20 prose-headings:font-title prose-a:text-electrique"
        dangerouslySetInnerHTML={{ __html: entry.html }}
      />
    </article>
  );
}
