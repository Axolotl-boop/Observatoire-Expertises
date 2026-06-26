"use client";

import Link from "next/link";
import { useState } from "react";
import type { ExpertiseDigest } from "@/lib/content";

const DIGEST_BLOCKS: { key: "bloc1" | "bloc2" | "bloc3" | "bloc4"; title: string }[] = [
  { key: "bloc1", title: "Problématiques clients & positionnement offre" },
  { key: "bloc2", title: "Signaux qui challengent nos convictions" },
  { key: "bloc3", title: "Skills, méthodes & outils" },
  { key: "bloc4", title: "Sujets éditoriaux & angle" },
];

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { year: "numeric", month: "long" });
}

export default function ExpertiseDigests({ digests }: { digests: ExpertiseDigest[] }) {
  const firstAvailable = digests.find((d) => d.available) ?? digests[0];
  const [active, setActive] = useState<string>(firstAvailable?.key ?? "");
  const current = digests.find((d) => d.key === active);

  return (
    <section className="mb-12">
      {/* Boutons-filtres par expertise */}
      <div className="flex flex-wrap gap-2">
        {digests.map((d) => {
          const isActive = d.key === active;
          return (
            <button
              key={d.key}
              type="button"
              disabled={!d.available}
              onClick={() => setActive(d.key)}
              className={[
                "rounded-full px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-indigo-600 text-white"
                  : d.available
                    ? "border border-gray-300 bg-white text-gray-700 hover:border-indigo-400 hover:text-indigo-700"
                    : "cursor-not-allowed border border-gray-200 bg-gray-50 text-gray-300",
              ].join(" ")}
              title={d.available ? undefined : "Aucun digest disponible"}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      {current?.available && current.sections ? (
        <div className="mt-6">
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-xl font-bold text-gray-900">
              {current.label}
              {current.date && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  · digest {formatDate(current.date)}
                </span>
              )}
            </h2>
            {current.slug && (
              <Link
                href={`/entries/${encodeURIComponent(current.slug)}`}
                className="text-sm text-indigo-600 hover:underline"
              >
                Lire le digest complet →
              </Link>
            )}
          </div>

          {/* Bloc principal : les signaux du mois */}
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5">
            <h3 className="mb-2 font-semibold text-indigo-900">
              Les signaux importants du mois
            </h3>
            {current.sections.signaux ? (
              <div
                className="prose prose-sm prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: current.sections.signaux }}
              />
            ) : (
              <p className="text-sm text-gray-400">Section non disponible.</p>
            )}
          </div>

          {/* Les 4 blocs */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {DIGEST_BLOCKS.map((block) => {
              const html = current.sections?.[block.key];
              return (
                <div
                  key={block.key}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <h3 className="mb-2 font-semibold text-gray-900">{block.title}</h3>
                  {html ? (
                    <div
                      className="prose prose-sm prose-slate max-w-none"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  ) : (
                    <p className="text-sm text-gray-400">Section non disponible.</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-500">
          Aucun digest disponible pour cette expertise.
        </p>
      )}
    </section>
  );
}
