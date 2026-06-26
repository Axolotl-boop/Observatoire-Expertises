"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { EntryMeta } from "@/lib/content";

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

export default function Kiosque({ newsletters }: { newsletters: EntryMeta[] }) {
  const [month, setMonth] = useState<string>("");

  const months = useMemo(
    () => Array.from(new Set(newsletters.map((n) => monthKey(n.date)))).sort().reverse(),
    [newsletters],
  );

  const filtered = useMemo(
    () => (month ? newsletters.filter((n) => monthKey(n.date) === month) : newsletters),
    [newsletters, month],
  );

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

      <p className="mb-4 text-sm text-gray-500">
        {filtered.length} newsletter{filtered.length > 1 ? "s" : ""}
        {filtered.length !== newsletters.length ? ` sur ${newsletters.length}` : ""}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune newsletter pour cette période.
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/entries/${encodeURIComponent(n.slug)}`}
                className="block h-full rounded-lg border border-gray-200 bg-white p-5 transition hover:border-electrique hover:shadow-sm"
              >
                {n.date && (
                  <span className="text-xs text-gray-400">{formatDate(n.date)}</span>
                )}
                <h2 className="mt-1 font-semibold text-gray-900">{n.title}</h2>
                {n.description && (
                  <p className="mt-1 line-clamp-3 text-sm text-gray-600">
                    {n.description}
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
