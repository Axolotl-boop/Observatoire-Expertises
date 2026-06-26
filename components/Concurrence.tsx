"use client";

import { useState } from "react";
import type { ConcurrenceQuarter } from "@/lib/content";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

export default function Concurrence({ quarters }: { quarters: ConcurrenceQuarter[] }) {
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
        <div>
          {/* Bandeau : lecture transverse */}
          <div className="mb-4 rounded-xl border border-lavande bg-glace p-5">
            <h2 className="mb-2 font-title text-lg font-bold text-marine">
              Lecture transverse
            </h2>
            {current.lectureHtml ? (
              <div
                className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
                dangerouslySetInnerHTML={{ __html: current.lectureHtml }}
              />
            ) : (
              <p className="text-sm text-gray-400">Section non disponible.</p>
            )}
          </div>

          {/* Blocs : les axes */}
          <div className="space-y-4">
            {current.axes.map((axis) => (
              <div key={axis.title} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="mb-2 font-title font-bold text-marine">{axis.title}</h3>
                <div
                  className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
                  dangerouslySetInnerHTML={{ __html: axis.html }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
