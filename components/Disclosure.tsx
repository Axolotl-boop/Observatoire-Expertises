"use client";

import type { ReactNode } from "react";

/** Classe `prose` de référence pour le corps replié/déplié (typo alignée sur tout le portail). */
export const DISCLOSURE_PROSE =
  "prose prose-sm prose-slate max-w-none leading-relaxed prose-headings:font-title prose-headings:font-medium prose-headings:text-marine prose-strong:font-semibold prose-strong:text-marine prose-li:my-1.5";

/**
 * Accordéon générique, contrôlé par le parent (`open` + `onToggle`).
 * - `header` : contenu cliquable à gauche (titre, tags…).
 * - `html` : corps rendu ; tronqué avec un fondu quand replié.
 * Le conteneur et le fondu sont paramétrables pour les variantes (cartes persona).
 */
export default function Disclosure({
  header,
  html,
  open,
  onToggle,
  containerClassName = "rounded-xl border border-gray-200 bg-white",
  proseClassName = DISCLOSURE_PROSE,
  fadeFrom = "from-white",
  emptyLabel = "Section non disponible.",
}: {
  header: ReactNode;
  html?: string;
  open: boolean;
  onToggle: () => void;
  containerClassName?: string;
  proseClassName?: string;
  fadeFrom?: string;
  emptyLabel?: string;
}) {
  return (
    <div className={["transition-opacity", containerClassName].join(" ")}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-2 p-5 text-left"
      >
        {header}
        <svg
          className={[
            "mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform",
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
              className={proseClassName}
              dangerouslySetInnerHTML={{ __html: html }}
            />
            {!open && (
              <div
                className={[
                  "pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t",
                  fadeFrom,
                ].join(" ")}
              />
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500">{emptyLabel}</p>
        )}
      </div>
    </div>
  );
}
