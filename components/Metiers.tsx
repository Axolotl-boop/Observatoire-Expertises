"use client";

import { useState } from "react";
import type { EmploiQuarter } from "@/lib/content";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

function Section({ title, html }: { title: string; html?: string }) {
  return (
    <div className="mt-4 first:mt-0">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {html && html.trim() ? (
        <div
          className="prose prose-sm prose-slate mt-1 max-w-none prose-strong:text-marine"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <p className="mt-1 text-sm text-gray-400">—</p>
      )}
    </div>
  );
}

export default function Metiers({ quarters }: { quarters: EmploiQuarter[] }) {
  const keys = quarters.map((q) => q.quarter);
  const [quarter, setQuarter] = useState<string>(() => keys[0] ?? "");
  const current = quarters.find((q) => q.quarter === quarter) ?? quarters[0];

  return (
    <div>
      {/* Filtre par trimestre */}
      <div className="mb-6 flex flex-wrap gap-2">
        {keys.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => setQuarter(q)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              q === current?.quarter
                ? "bg-electrique text-white"
                : "border border-gray-300 bg-white text-marine hover:border-electrique hover:text-electrique",
            ].join(" ")}
          >
            {quarterLabel(q)}
          </button>
        ))}
      </div>

      {!current ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune donnée pour ce trimestre.
        </div>
      ) : (
        <div className="grid items-start gap-4 md:grid-cols-2">
          {current.expertises.map((exp) => (
            <div key={exp.key} className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-2 font-title text-lg font-bold text-marine">{exp.label}</h2>
              <Section title="Compétences" html={exp.competencesHtml} />
              <Section title="Outils" html={exp.outilsHtml} />
              <Section title="Lecture transverse" html={exp.lectureHtml} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
