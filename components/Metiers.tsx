"use client";

import { useMemo, useState } from "react";
import type { EmploiQuarter } from "@/lib/content";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

function Block({
  title,
  html,
  accent,
}: {
  title: string;
  html?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-xl border p-5",
        accent ? "border-lavande bg-glace" : "border-gray-200 bg-white",
      ].join(" ")}
    >
      <h2 className="mb-2 font-title text-lg font-bold text-marine">{title}</h2>
      {html && html.trim() ? (
        <div
          className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="text-sm text-gray-400">—</p>
      )}
    </div>
  );
}

export default function Metiers({ quarters }: { quarters: EmploiQuarter[] }) {
  // Liste des expertises (union ordonnée à travers les trimestres).
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
            <Block title="Lecture transverse" html={exp.lectureHtml} accent />
            <div className="grid items-start gap-4 md:grid-cols-2">
              <Block title="Compétences" html={exp.competencesHtml} />
              <Block title="Outils" html={exp.outilsHtml} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
