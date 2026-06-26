"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EntryMeta } from "@/lib/content";

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Catalog({ entries }: { entries: EntryMeta[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");

  const categories = useMemo(
    () =>
      Array.from(new Set(entries.map((e) => e.category).filter(Boolean))).sort() as string[],
    [entries],
  );

  const subcategories = useMemo(() => {
    const pool = category ? entries.filter((e) => e.category === category) : entries;
    return Array.from(
      new Set(pool.map((e) => e.subcategory).filter(Boolean)),
    ).sort() as string[];
  }, [entries, category]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (category && e.category !== category) return false;
      if (subcategory && e.subcategory !== subcategory) return false;
      if (!q) return true;
      const haystack = [
        e.title,
        e.description,
        e.category,
        e.subcategory,
        e.section,
        e.agent,
        ...e.tags,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [entries, query, category, subcategory]);

  return (
    <div>
      {/* Barre de recherche + filtres */}
      <div className="mb-6 space-y-3">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher dans le catalogue…"
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-electrique focus:ring-1 focus:ring-electrique"
        />
        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory("");
            }}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {subcategories.length > 0 && (
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700"
            >
              <option value="">Toutes les expertises / sous-catégories</option>
              {subcategories.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          )}
          {(query || category || subcategory) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("");
                setSubcategory("");
              }}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">
        {filtered.length} entrée{filtered.length > 1 ? "s" : ""}
        {filtered.length !== entries.length ? ` sur ${entries.length}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune entrée ne correspond à votre recherche.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((entry) => (
            <li key={entry.slug}>
              <Link
                href={`/entries/${encodeURIComponent(entry.slug)}`}
                className="block h-full rounded-lg border border-gray-200 bg-white p-5 transition hover:border-gray-400 hover:shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {entry.category && (
                    <span className="rounded-full bg-lilas px-2 py-0.5 font-medium text-violet">
                      {entry.category}
                    </span>
                  )}
                  {entry.subcategory && (
                    <span className="rounded-full bg-glace px-2 py-0.5 text-marine">
                      {entry.subcategory}
                    </span>
                  )}
                  {entry.date && (
                    <span className="text-gray-400">{formatDate(entry.date)}</span>
                  )}
                </div>
                <h2 className="mt-2 font-semibold text-gray-900">{entry.title}</h2>
                {entry.description && (
                  <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                    {entry.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
