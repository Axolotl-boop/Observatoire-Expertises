"use client";

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

function Collapsible({
  title,
  html,
  accent,
  defaultOpen = true,
}: {
  title: string;
  html?: string;
  accent?: boolean;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className={[
        "group rounded-xl border",
        accent ? "border-lavande bg-glace" : "border-gray-200 bg-white",
      ].join(" ")}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 p-5">
        <h3
          className={[
            "font-title font-semibold",
            accent ? "text-marine" : "text-marine",
          ].join(" ")}
        >
          {title}
        </h3>
        <svg
          className="h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </summary>
      <div className="px-5 pb-5">
        {html ? (
          <div
            className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <p className="text-sm text-gray-400">Section non disponible.</p>
        )}
      </div>
    </details>
  );
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
                  ? "bg-electrique text-white"
                  : d.available
                    ? "border border-gray-300 bg-white text-marine hover:border-electrique hover:text-electrique"
                    : "cursor-not-allowed border border-gray-200 bg-gray-50 text-desactive",
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
          <h2 className="mb-4 font-title text-xl font-bold text-marine">
            {current.label}
            {current.date && (
              <span className="ml-2 text-sm font-normal text-gray-400">
                · digest {formatDate(current.date)}
              </span>
            )}
          </h2>

          {/* Bloc principal : les signaux du mois */}
          <Collapsible
            title="Les signaux importants du mois"
            html={current.sections.signaux}
            accent
          />

          {/* Les 4 blocs */}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {DIGEST_BLOCKS.map((block) => (
              <Collapsible
                key={block.key}
                title={block.title}
                html={current.sections?.[block.key]}
              />
            ))}
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
