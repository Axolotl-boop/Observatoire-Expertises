"use client";

import { useMemo, useState } from "react";
import Chip from "@/components/Chip";
import type { PadChartRow, PadMonth } from "@/lib/content";
import { track } from "@/lib/track";

function monthLabel(key: string): string {
  const m = key.match(/^(\d{4})-(\d{2})$/);
  if (!m) return "Date inconnue";
  const d = new Date(Number(m[1]), Number(m[2]) - 1, 1);
  const label = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function BarChart({ rows, color }: { rows: PadChartRow[]; color: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
        >
          <div
            className="w-full text-sm text-gray-700 sm:w-36 sm:shrink-0 sm:truncate"
            title={r.label}
          >
            {r.label}
          </div>
          <div className="flex flex-1 items-center gap-3">
            <div className="h-5 flex-1 overflow-hidden rounded bg-glace">
              <div
                className="h-full rounded"
                style={{ width: `${(r.value / max) * 100}%`, backgroundColor: color }}
              />
            </div>
            <div className="w-8 shrink-0 text-right text-sm font-semibold text-marine">
              {r.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Pouls({ months }: { months: PadMonth[] }) {
  const monthKeys = useMemo(() => months.map((m) => m.month), [months]);
  const [month, setMonth] = useState<string>(() => monthKeys[0] ?? "");
  const current = months.find((m) => m.month === month) ?? months[0];

  return (
    <div>
      {/* Filtre par mois */}
      <div className="mb-6 flex flex-wrap gap-2">
        {monthKeys.map((m) => (
          <Chip
            key={m}
            active={m === current?.month}
            onClick={() => {
              setMonth(m);
              track("filter", `Pouls · mois:${m}`);
            }}
          >
            {monthLabel(m)}
          </Chip>
        ))}
      </div>

      {!current ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune note pour cette période.
        </div>
      ) : (
        <div>
          {/* Bandeau principal : les grands signaux du mois */}
          <div className="mb-4 rounded-xl border border-lavande bg-glace p-5">
            <h2 className="mb-2 font-title text-lg font-bold text-marine">
              Les grands signaux du mois
            </h2>
            {current.signauxHtml ? (
              <div
                className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
                dangerouslySetInnerHTML={{ __html: current.signauxHtml }}
              />
            ) : (
              <p className="text-sm text-gray-400">Section non disponible.</p>
            )}
          </div>

          {/* Deux graphes : mix par expertise & profils/séniorité */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-4 font-title text-lg font-bold text-marine">
                Mix par expertise
              </h2>
              {current.mix.rows.length > 0 ? (
                <BarChart rows={current.mix.rows} color="#0042ff" />
              ) : (
                <p className="text-sm text-gray-400">Données non disponibles.</p>
              )}
              {current.mix.conclusionHtml && (
                <div
                  className="prose prose-sm prose-slate mt-4 max-w-none prose-strong:text-marine"
                  dangerouslySetInnerHTML={{ __html: current.mix.conclusionHtml }}
                />
              )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-4 font-title text-lg font-bold text-marine">
                Profils et séniorité
              </h2>
              {current.profils.rows.length > 0 ? (
                <BarChart rows={current.profils.rows} color="#6abfa3" />
              ) : (
                <p className="text-sm text-gray-400">Données non disponibles.</p>
              )}
              {current.profils.conclusionHtml && (
                <div
                  className="prose prose-sm prose-slate mt-4 max-w-none prose-strong:text-marine"
                  dangerouslySetInnerHTML={{ __html: current.profils.conclusionHtml }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
