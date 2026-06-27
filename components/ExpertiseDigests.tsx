"use client";

import { useEffect, useRef, useState } from "react";
import type { ExpertiseDigest } from "@/lib/content";

const DIGEST_BLOCKS: { key: "bloc1" | "bloc2" | "bloc3" | "bloc4"; title: string }[] = [
  { key: "bloc1", title: "Problématiques clients & positionnement offre" },
  { key: "bloc2", title: "Signaux qui challengent nos convictions" },
  { key: "bloc3", title: "Skills, méthodes & outils" },
  { key: "bloc4", title: "Sujets éditoriaux & angle" },
];

function monthLabel(key: string): string {
  const m = key.match(/^(\d{4})-(\d{2})$/);
  if (!m) return key;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
  const label = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function Block({
  title,
  html,
  open,
  onToggle,
  accent,
}: {
  title: string;
  html?: string;
  open: boolean;
  onToggle: () => void;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border",
        accent ? "border-lavande bg-glace" : "border-gray-200 bg-white",
      ].join(" ")}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 p-5 text-left"
      >
        <h3 className="font-title font-semibold text-marine">{title}</h3>
        <svg
          className={[
            "h-5 w-5 shrink-0 text-gray-400 transition-transform",
            open ? "rotate-180" : "",
          ].join(" ")}
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
      </button>
      <div className="px-5 pb-5">
        {html ? (
          <div className={open ? "" : "relative max-h-24 overflow-hidden"}>
            <div
              className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {!open && (
              <div
                className={[
                  "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t",
                  accent ? "from-glace" : "from-white",
                ].join(" ")}
              />
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-400">Section non disponible.</p>
        )}
      </div>
    </div>
  );
}

export default function ExpertiseDigests({ digests }: { digests: ExpertiseDigest[] }) {
  const firstAvailable = digests.find((d) => d.available) ?? digests[0];
  const [active, setActive] = useState<string>(firstAvailable?.key ?? "");
  const [month, setMonth] = useState<string>("");
  const [openSignaux, setOpenSignaux] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [openRows, setOpenRows] = useState<[boolean, boolean]>([false, false]);
  const toggleRow = (i: 0 | 1) =>
    setOpenRows((r) => (i === 0 ? [!r[0], r[1]] : [r[0], !r[1]]));

  // Fermeture de l'infobulle au clic à l'extérieur.
  const infoRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!showInfo) return;
    function onDoc(e: MouseEvent) {
      if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
        setShowInfo(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [showInfo]);

  const current = digests.find((d) => d.key === active);
  const months = current?.entries.map((e) => e.month) ?? [];
  const selectedMonth = months.includes(month) ? month : months[0];
  const entry = current?.entries.find((e) => e.month === selectedMonth);

  return (
    <section className="mb-12">
      {/* Filtre par expertise */}
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

      {/* Filtre par mois */}
      {months.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {months.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMonth(m)}
              className={[
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                m === selectedMonth
                  ? "bg-marine text-white"
                  : "border border-gray-300 bg-white text-marine hover:border-marine",
              ].join(" ")}
            >
              {monthLabel(m)}
            </button>
          ))}
        </div>
      )}

      {current?.available && entry ? (
        <div className="mt-6">
          <h2 className="mb-4 font-title text-xl font-bold text-marine">
            {current.label}
            <span className="ml-2 text-sm font-normal text-gray-400">
              · digest {monthLabel(entry.month)}
            </span>
          </h2>

          {/* Légende des verdicts */}
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-3 text-sm">
            <div className="flex items-start justify-between gap-2">
              <ul className="space-y-1">
                <li>
                  <span className="tag-mode">[mode]</span>{" "}
                  <span className="text-gray-600">— Buzz ou signal isolé. Rien à acter.</span>
                </li>
                <li>
                  <span className="tag-tendance">[tendance]</span>{" "}
                  <span className="text-gray-600">
                    — Mouvement réel mais pas acquis. À surveiller.
                  </span>
                </li>
                <li>
                  <span className="tag-structurel">[structurel]</span>{" "}
                  <span className="text-gray-600">
                    — Fait dur croisé à une donnée interne. À acter.
                  </span>
                </li>
              </ul>
              <div className="relative shrink-0" ref={infoRef}>
                <button
                  type="button"
                  onClick={() => setShowInfo((v) => !v)}
                  aria-expanded={showInfo}
                  aria-label="En savoir plus sur les verdicts"
                  title="En savoir plus"
                  className="text-gray-400 transition hover:text-electrique"
                >
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9a1 1 0 012 0v4a1 1 0 11-2 0V9zm1-4.25a1.1 1.1 0 100 2.2 1.1 1.1 0 000-2.2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {showInfo && (
                  <div
                    role="tooltip"
                    className="absolute right-0 top-8 z-20 w-[min(24rem,90vw)] space-y-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-600 shadow-lg"
                  >
                    <p>
                      <span className="tag-mode">[mode]</span> — Signal repéré dans une ou
                      deux sources, sans mouvement observable derrière. On le note sans lui
                      prêter de portée. Tant qu'un signal n'a pas fait la preuve du
                      contraire, il reste ici.
                    </p>
                    <p>
                      <span className="tag-tendance">[tendance]</span> — Le signal se
                      répète, converge depuis plusieurs sources indépendantes ou s'installe
                      dans la durée. C'est un déplacement réel du marché, mais qui peut
                      encore refluer. On le suit, on ne le grave pas.
                    </p>
                    <div>
                      <p>
                        <span className="tag-structurel">[structurel]</span> — Réservé aux
                        signaux qui réunissent deux conditions cumulatives :
                      </p>
                      <ul className="ml-5 mt-1 list-disc space-y-0.5">
                        <li>
                          Une preuve quantitative dure (étude chiffrée, opération M&amp;A,
                          fait mesurable) ;
                        </li>
                        <li>
                          Une corroboration par nos données propriétaires (PAD, emploi,
                          concurrence).
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bloc principal : les signaux du mois */}
          <Block
            title="Les signaux importants du mois"
            html={entry.sections.signaux}
            open={openSignaux}
            onToggle={() => setOpenSignaux((v) => !v)}
            accent
          />

          {/* Les 4 blocs, ouverture synchronisée par ligne */}
          <div className="mt-4 grid items-start gap-4 md:grid-cols-2">
            {DIGEST_BLOCKS.map((block, i) => {
              const row: 0 | 1 = i < 2 ? 0 : 1;
              return (
                <Block
                  key={block.key}
                  title={block.title}
                  html={entry.sections[block.key]}
                  open={openRows[row]}
                  onToggle={() => toggleRow(row)}
                />
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
