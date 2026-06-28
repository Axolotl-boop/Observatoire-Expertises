"use client";

import { useState } from "react";

const MONO = 'ui-monospace, SFMono-Regular, Menlo, "Liberation Mono", monospace';

/**
 * Légende des tags de maturité d'un signal de veille, par intensité croissante :
 * [mode] (effet de surface) · [tendance] (mouvement réel) · [structurel]
 * (changement de fond, candidat à valider). Repliée par défaut pour rester
 * discrète ; charte alignée sur les pastilles des blocs.
 */
export default function ConfidenceLegend() {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-4 rounded-xl border border-lilas bg-white">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left"
      >
        <span className="flex flex-wrap items-center gap-2">
          <span className="font-title text-sm font-medium text-marine">Légende</span>
          <span className="tagpill tagpill-mode">[mode]</span>
          <span className="tagpill tagpill-tendance">[tendance]</span>
          <span className="tagpill tagpill-structurel">[structurel]</span>
        </span>
        <svg
          className={[
            "h-4 w-4 shrink-0 text-gray-400 transition-transform",
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

      {open && (
        <div className="flex flex-col gap-4 border-t border-gray-100 px-4 py-4">
          {/* [mode] */}
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2.5">
              <span className="tagpill tagpill-mode">[mode]</span>
              <span className="text-[13px] font-medium text-gray-700">effet de surface</span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-600">
              Ça fait du bruit, mais ça repose sur peu : une source isolée, un discours marché, aucun
              ancrage solide. C&rsquo;est le tag par défaut quand l&rsquo;adossement est faible.
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
              → À lire avec recul, le plus souvent à ignorer.
            </p>
          </div>

          {/* [tendance] */}
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2.5">
              <span className="tagpill tagpill-tendance">[tendance]</span>
              <span className="text-[13px] font-medium text-gray-700">mouvement réel</span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-600">
              Un mouvement confirmé : le signal est repris par au moins une autre source
              indépendante, mais il n&rsquo;est ni irréversible ni encore structurant.
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
              → À suivre. Pas (encore) de quoi infléchir nos offres ou convictions.
            </p>
          </div>

          {/* [structurel] */}
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2.5">
              <span className="tagpill tagpill-structurel">[structurel]</span>
              <span className="text-[13px] font-medium text-gray-700">changement de fond</span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 11,
                  color: "var(--color-avert)",
                  border: "1px solid var(--color-avert)",
                  padding: "1px 7px",
                  borderRadius: 6,
                }}
              >
                candidat — à valider
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-gray-600">
              Un changement qui rebat les cartes du métier, appuyé sur un fait dur (étude/baromètre,
              M&amp;A, levée…) et corroboré par nos propres données (demande commerciale, emploi,
              concurrence).
            </p>
            <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
              → Le signal le plus lourd — à prendre au sérieux dans nos réflexions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
