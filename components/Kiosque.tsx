"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Newsletter } from "@/lib/content";

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

export default function Kiosque({ newsletters }: { newsletters: Newsletter[] }) {
  const months = useMemo(
    () => Array.from(new Set(newsletters.map((n) => monthKey(n.date)))).sort().reverse(),
    [newsletters],
  );

  // Par défaut, on affiche le mois le plus récent.
  const [month, setMonth] = useState<string>(() => months[0] ?? "");

  const filtered = useMemo(
    () => (month ? newsletters.filter((n) => monthKey(n.date) === month) : newsletters),
    [newsletters, month],
  );

  // Regroupement par source, trié par nombre de newsletters décroissant.
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
            onClick={() => setMonth(m)}
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

      <p className="mb-6 text-sm text-gray-500">
        {filtered.length} newsletter{filtered.length > 1 ? "s" : ""} ·{" "}
        {groups.length} source{groups.length > 1 ? "s" : ""}
      </p>

      {groups.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune newsletter pour cette période.
        </div>
      ) : (
        <div className="space-y-8">
          {groups.map((group) => (
            <section key={group.source}>
              <h2 className="mb-3 flex items-baseline gap-2 font-title text-lg font-bold text-marine">
                {group.source}
                <span className="text-sm font-normal text-gray-400">
                  {group.items.length} édition{group.items.length > 1 ? "s" : ""}
                </span>
              </h2>
              <ul className="grid gap-4 sm:grid-cols-2">
                {group.items.map((n) => (
                  <li key={n.slug}>
                    <Link
                      href={`/entries/${encodeURIComponent(n.slug)}`}
                      className="block h-full rounded-lg border border-gray-200 bg-white p-5 transition hover:border-electrique hover:shadow-sm"
                    >
                      {n.date && (
                        <span className="text-xs text-gray-400">{formatDate(n.date)}</span>
                      )}
                      <h3 className="mt-1 font-semibold text-gray-900">{n.title}</h3>
                      {n.description && (
                        <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                          {n.description}
                        </p>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
