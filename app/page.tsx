import Link from "next/link";
import { getAllEntries } from "@/lib/content";

export const dynamic = "force-static";

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

export default function HomePage() {
  const entries = getAllEntries();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Catalogue des données traitées par les agents IA
        </h1>
        <p className="mt-2 text-gray-600">
          {entries.length} entrée{entries.length > 1 ? "s" : ""} recensée
          {entries.length > 1 ? "s" : ""}.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune entrée pour le moment. Les fichiers Markdown synchronisés
          depuis SharePoint apparaîtront ici.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/entries/${encodeURIComponent(entry.slug)}`}
                className="block h-full rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm"
              >
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
                <h2 className="mt-2 font-semibold text-gray-900">
                  {entry.title}
                </h2>
                {entry.description && (
                  <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                    {entry.description}
                  </p>
                )}
                {entry.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-gray-50 px-1.5 py-0.5 text-xs text-gray-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
