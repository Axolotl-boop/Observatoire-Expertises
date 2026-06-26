"use client";

import { useMemo, useState } from "react";
import type { EmploiQuarter, SynthRow } from "@/lib/content";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

function Verdict({ value }: { value?: string }) {
  const v = (value ?? "").replace(/`/g, "").trim();
  if (/\[structurel\]/i.test(v)) return <span className="tag-structurel">{v}</span>;
  if (/\[tendance\]/i.test(v)) return <span className="tag-tendance">{v}</span>;
  if (/\[mode\]/i.test(v)) return <span className="tag-mode">{v}</span>;
  return <span className="text-gray-400">{v || "—"}</span>;
}

function SynthTable({ title, rows }: { title: string; rows: SynthRow[] }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-3 font-title text-lg font-bold text-marine">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-sm text-gray-400">Aucune donnée ce trimestre.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="py-2 pr-3 font-semibold">Élément</th>
                <th className="py-2 pr-3 font-semibold">Statut</th>
                <th className="py-2 pr-3 font-semibold">Verdict</th>
                <th className="py-2 font-semibold">Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-3 text-gray-800">{r[0]}</td>
                  <td className="py-2 pr-3 whitespace-nowrap text-gray-600">{r[1]}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    <Verdict value={r[2]} />
                  </td>
                  <td className="py-2 text-gray-500">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function Metiers({ quarters }: { quarters: EmploiQuarter[] }) {
  const expertises = useMemo(() => {
    const map = new Map<string, string>();
    for (const q of quarters) {
      for (const e of q.expertises) if (!map.has(e.key)) map.set(e.key, e.label);
    }
    return Array.from(map, ([key, label]) => ({ key, label }));
  }, [quarters]);

  const quarterKeys = quarters.map((q) => q.quarter);

  const [expKey, setExpKey] = useState<string>(() => expertises[0]?.key ?? "");
  const [quarter, setQuarter] = useState<string>(() => quarterKeys[0] ?? "");

  const selectedQuarter = quarterKeys.includes(quarter) ? quarter : quarterKeys[0];
  const currentQuarter = quarters.find((q) => q.quarter === selectedQuarter);
  const exp =
    currentQuarter?.expertises.find((e) => e.key === expKey) ??
    currentQuarter?.expertises[0];

  return (
    <div>
      {/* Filtre par expertise */}
      <div className="flex flex-wrap gap-2">
        {expertises.map((e) => (
          <button
            key={e.key}
            type="button"
            onClick={() => setExpKey(e.key)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              e.key === exp?.key
                ? "bg-electrique text-white"
                : "border border-gray-300 bg-white text-marine hover:border-electrique hover:text-electrique",
            ].join(" ")}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Filtre par trimestre */}
      {quarterKeys.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {quarterKeys.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => setQuarter(q)}
              className={[
                "rounded-full px-3 py-1.5 text-xs font-medium transition",
                q === selectedQuarter
                  ? "bg-marine text-white"
                  : "border border-gray-300 bg-white text-marine hover:border-marine",
              ].join(" ")}
            >
              {quarterLabel(q)}
            </button>
          ))}
        </div>
      )}

      {!exp ? (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune donnée pour cette sélection.
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="mb-4 font-title text-xl font-bold text-marine">
            {exp.label}
            <span className="ml-2 text-sm font-normal text-gray-400">
              · {quarterLabel(selectedQuarter)}
            </span>
          </h2>

          <div className="space-y-4">
            <SynthTable title="Compétences" rows={exp.competences} />
            <SynthTable title="Outils" rows={exp.outils} />
          </div>
        </div>
      )}
    </div>
  );
}
