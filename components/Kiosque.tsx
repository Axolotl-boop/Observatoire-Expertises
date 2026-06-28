"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Newsletter } from "@/lib/content";
import { SOURCE_INFO } from "@/lib/sources";
import { track } from "@/lib/track";

// Couleurs de la charte pour la tranche des dossiers (cycle stable par source).
const ACCENTS = ["#002882", "#6abfa3", "#380066", "#f98f03", "#1a4d3e", "#0e2a3a", "#e8572a"];

function monthKey(iso?: string): string {
  if (!iso) return "????";
  const m = iso.match(/^(\d{4})-(\d{2})/);
  return m ? `${m[1]}-${m[2]}` : "????";
}

function monthLabel(key: string): string {
  const m = key.match(/^(\d{4})-(\d{2})$/);
  if (!m) return "Date inconnue";
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
  const label = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

function displayName(source: string): string {
  return SOURCE_INFO[source]?.name ?? source;
}

export default function Kiosque({ newsletters }: { newsletters: Newsletter[] }) {
  const months = useMemo(
    () => Array.from(new Set(newsletters.map((n) => monthKey(n.date)))).sort().reverse(),
    [newsletters],
  );

  const [month, setMonth] = useState<string>(() => months[0] ?? "");
  const [openSource, setOpenSource] = useState<string | null>(null);

  const filtered = useMemo(
    () => (month ? newsletters.filter((n) => monthKey(n.date) === month) : newsletters),
    [newsletters, month],
  );

  const groups = useMemo(() => {
    const map = new Map<string, Newsletter[]>();
    for (const n of filtered) {
      const arr = map.get(n.source) ?? [];
      arr.push(n);
      map.set(n.source, arr);
    }
    return Array.from(map.entries())
      .map(([source, items]) => ({
        source,
        items: items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "")),
      }))
      .sort((a, b) => b.items.length - a.items.length || a.source.localeCompare(b.source));
  }, [filtered]);

  const accentOf = (source: string) => {
    const i = groups.findIndex((g) => g.source === source);
    return ACCENTS[(i < 0 ? 0 : i) % ACCENTS.length];
  };

  const opened = openSource ? groups.find((g) => g.source === openSource) : null;

  return (
    <div>
      {/* Filtre par mois */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMonth("")}
          className={[
            "rounded-full px-4 py-2 text-sm font-medium transition",
            month === ""
              ? "bg-electrique text-white"
              : "border border-gray-300 bg-white text-marine hover:border-electrique hover:text-electrique",
          ].join(" ")}
        >
          Tous les mois
        </button>
        {months.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMonth(m);
              track("filter", `Kiosque · mois:${m}`);
            }}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              month === m
                ? "bg-electrique text-white"
                : "border border-gray-300 bg-white text-marine hover:border-electrique hover:text-electrique",
            ].join(" ")}
          >
            {monthLabel(m)}
          </button>
        ))}
      </div>

      {opened ? (
        /* ----- Dossier ouvert : éditions de la source ----- */
        <div>
          <button
            type="button"
            onClick={() => setOpenSource(null)}
            className="mb-4 text-sm font-medium text-electrique hover:underline"
          >
            ← Tous les dossiers
          </button>

          <div
            className="mb-6 rounded-xl border border-gray-200 bg-white p-5"
            style={{ borderTopColor: accentOf(opened.source), borderTopWidth: 4 }}
          >
            <h2 className="font-title text-xl font-bold text-marine">
              {displayName(opened.source)}
              <span className="ml-2 text-sm font-normal text-gray-500">
                {opened.items.length} édition{opened.items.length > 1 ? "s" : ""}
              </span>
            </h2>
            {SOURCE_INFO[opened.source]?.description && (
              <p className="mt-2 text-sm text-gray-600">
                {SOURCE_INFO[opened.source].description}
              </p>
            )}
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {opened.items.map((n) => (
              <li key={n.slug}>
                <Link
                  href={`/entries/${encodeURIComponent(n.slug)}`}
                  className="block h-full rounded-lg border border-gray-200 bg-white p-5 transition hover:border-electrique hover:shadow-sm"
                >
                  {n.date && (
                    <span className="text-xs text-gray-500">{formatDate(n.date)}</span>
                  )}
                  <h3 className="mt-1 font-semibold text-gray-900">{n.title}</h3>
                  {n.verdict && (
                    <p className="mt-1 line-clamp-4 text-sm text-gray-600">{n.verdict}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /* ----- Étagère : un dossier par source ----- */
        <>
          <p className="mb-6 text-sm text-gray-500">
            {groups.length} source{groups.length > 1 ? "s" : ""} ·{" "}
            {filtered.length} newsletter{filtered.length > 1 ? "s" : ""}
          </p>

          {groups.length === 0 ? (
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
              Aucune newsletter pour cette période.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => {
                const info = SOURCE_INFO[group.source];
                return (
                  <button
                    key={group.source}
                    type="button"
                    onClick={() => {
                      setOpenSource(group.source);
                      track("source_open", group.source);
                    }}
                    className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="h-2" style={{ backgroundColor: accentOf(group.source) }} />
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl">🗞️</span>
                        <span className="rounded-full bg-glace px-2 py-0.5 text-xs font-medium text-marine">
                          {group.items.length} édition{group.items.length > 1 ? "s" : ""}
                        </span>
                      </div>
                      <h2 className="mt-3 font-title text-lg font-bold text-marine">
                        {displayName(group.source)}
                      </h2>
                      {info?.description && (
                        <p className="mt-2 line-clamp-4 text-sm text-gray-600">
                          {info.description}
                        </p>
                      )}
                      <span className="mt-4 inline-block text-sm font-medium text-electrique group-hover:underline">
                        Ouvrir le dossier →
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
