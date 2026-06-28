"use client";

import { useState } from "react";
import Chip from "@/components/Chip";
import type { ConcurrenceQuarter } from "@/lib/content";
import { track } from "@/lib/track";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

function downloadMd(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function Collapsible({ title, html }: { title: string; html: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
        <div className={open ? "" : "relative max-h-24 overflow-hidden"}>
          <div
            className="prose prose-sm prose-slate max-w-none prose-strong:text-marine"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          {!open && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white" />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Concurrence({ quarters }: { quarters: ConcurrenceQuarter[] }) {
  const keys = quarters.map((q) => q.quarter);
  const [quarter, setQuarter] = useState<string>(() => keys[0] ?? "");
  const current = quarters.find((q) => q.quarter === quarter) ?? quarters[0];

  return (
    <div>
      {/* Filtre par trimestre + téléchargement */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {keys.map((q) => (
            <Chip
              key={q}
              active={q === current?.quarter}
              onClick={() => setQuarter(q)}
            >
              {quarterLabel(q)}
            </Chip>
          ))}
        </div>
        {current && (
          <button
            type="button"
            onClick={() => {
              track("download", current.filename);
              downloadMd(current.filename, current.raw);
            }}
            className="text-sm font-medium text-electrique hover:underline"
          >
            ⬇ Télécharger le snapshot (.md)
          </button>
        )}
      </div>

      {!current ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune donnée pour ce trimestre.
        </div>
      ) : (
        <div className="space-y-4">
          {current.axes.map((axis) => (
            <Collapsible key={axis.title} title={axis.title} html={axis.html} />
          ))}
        </div>
      )}
    </div>
  );
}
