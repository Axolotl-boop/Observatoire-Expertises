"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { SearchItem } from "@/lib/content";

function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default function Search({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const nq = normalizeForSearch(query.trim());
    if (nq.length < 2) return [];
    const terms = nq.split(/\s+/).filter(Boolean);
    return items
      .map((it) => {
        if (!terms.every((t) => it.text.includes(t))) return null;
        const titleN = normalizeForSearch(it.title);
        const score = terms.reduce((s, t) => s + (titleN.includes(t) ? 2 : 0), 0);
        return { it, score };
      })
      .filter((x): x is { it: SearchItem; score: number } => x !== null)
      .sort((a, b) => b.score - a.score || (b.it.date ?? "").localeCompare(a.it.date ?? ""))
      .slice(0, 60)
      .map((x) => x.it);
  }, [query, items]);

  const showHint = normalizeForSearch(query.trim()).length < 2;

  return (
    <div>
      <input
        type="search"
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un sujet, un cabinet, une expertise, une newsletter…"
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-electrique focus:ring-1 focus:ring-electrique"
      />

      {showHint ? (
        <p className="mt-6 text-sm text-gray-500">
          Saisissez au moins 2 caractères. La recherche couvre tous les contenus
          (digests, newsletters, notes PAD, concurrence, emploi).
        </p>
      ) : (
        <>
          <p className="mt-4 mb-3 text-sm text-gray-500">
            {results.length} résultat{results.length > 1 ? "s" : ""}
          </p>
          {results.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              Aucun résultat.
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/entries/${encodeURIComponent(r.slug)}`}
                    className="block rounded-lg border border-gray-200 bg-white p-4 transition hover:border-electrique hover:shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="rounded-full bg-lilas px-2 py-0.5 font-medium text-violet">
                        {r.type}
                      </span>
                      {r.subtitle && <span className="text-gray-500">{r.subtitle}</span>}
                      {r.date && <span className="text-gray-400">{formatDate(r.date)}</span>}
                    </div>
                    <h2 className="mt-1 font-semibold text-gray-900">{r.title}</h2>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
