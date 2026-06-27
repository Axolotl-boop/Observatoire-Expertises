"use client";

import { useMemo, useState } from "react";
import type { ConcurrenceQuarter, ConcurrenceTrackingRow } from "@/lib/content";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

const VERDICTS = [
  { key: "structurel", label: "[structurel]", cls: "tag-structurel" },
  { key: "tendance", label: "[tendance]", cls: "tag-tendance" },
  { key: "mode", label: "[mode]", cls: "tag-mode" },
];

function verdictClass(key: string): string {
  return key === "structurel"
    ? "tag-structurel"
    : key === "tendance"
      ? "tag-tendance"
      : key === "mode"
        ? "tag-mode"
        : "";
}

function TrackingTable({ rows, cabinets }: { rows: ConcurrenceTrackingRow[]; cabinets: string[] }) {
  const [cabinet, setCabinet] = useState("");
  const [verdict, setVerdict] = useState("");
  const [sortKey, setSortKey] = useState<"cabinet" | "axis" | "verdict" | "date">("cabinet");
  const [sortDir, setSortDir] = useState<1 | -1>(1);

  const view = useMemo(() => {
    let r = rows.filter(
      (x) =>
        (!cabinet || x.cabinet === cabinet) && (!verdict || x.verdictKey === verdict),
    );
    const val = (x: ConcurrenceTrackingRow) =>
      sortKey === "verdict" ? x.verdictKey : x[sortKey];
    r = [...r].sort((a, b) => val(a).localeCompare(val(b)) * sortDir);
    return r;
  }, [rows, cabinet, verdict, sortKey, sortDir]);

  const toggleSort = (k: typeof sortKey) => {
    if (sortKey === k) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(k);
      setSortDir(1);
    }
  };
  const arrow = (k: typeof sortKey) => (sortKey === k ? (sortDir === 1 ? " ▲" : " ▼") : "");

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-3 font-title font-bold text-marine">Tableau de suivi</h3>

      {/* Filtres */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          value={cabinet}
          onChange={(e) => setCabinet(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-marine"
        >
          <option value="">Tous les cabinets</option>
          {cabinets.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setVerdict("")}
          className={[
            "rounded-full px-3 py-1.5 text-xs font-medium transition",
            verdict === ""
              ? "bg-marine text-white"
              : "border border-gray-300 bg-white text-marine hover:border-marine",
          ].join(" ")}
        >
          Tous les verdicts
        </button>
        {VERDICTS.map((v) => (
          <button
            key={v.key}
            type="button"
            onClick={() => setVerdict(verdict === v.key ? "" : v.key)}
            className={[
              "rounded-full border px-3 py-1.5 text-xs font-medium transition",
              verdict === v.key ? "border-marine bg-glace" : "border-gray-300 bg-white",
            ].join(" ")}
          >
            <span className={v.cls}>{v.label}</span>
          </button>
        ))}
      </div>

      {view.length === 0 ? (
        <p className="text-sm text-gray-400">Aucune ligne pour cette sélection.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="cursor-pointer py-2 pr-3" onClick={() => toggleSort("cabinet")}>
                  Cabinet{arrow("cabinet")}
                </th>
                <th className="cursor-pointer py-2 pr-3" onClick={() => toggleSort("axis")}>
                  Axe{arrow("axis")}
                </th>
                <th className="py-2 pr-3">Mouvement</th>
                <th className="cursor-pointer py-2 pr-3" onClick={() => toggleSort("verdict")}>
                  Verdict{arrow("verdict")}
                </th>
                <th className="cursor-pointer py-2" onClick={() => toggleSort("date")}>
                  Date{arrow("date")}
                </th>
              </tr>
            </thead>
            <tbody>
              {view.map((r, i) => (
                <tr key={`${r.cabinet}-${r.axis}-${i}`} className="border-b border-gray-100 align-top">
                  <td className="py-2 pr-3 font-medium text-gray-800">{r.cabinet}</td>
                  <td className="py-2 pr-3 whitespace-nowrap text-gray-600">{r.axis}</td>
                  <td className="py-2 pr-3 text-gray-700">{r.move}</td>
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {r.verdict ? (
                      <span className={verdictClass(r.verdictKey)}>{r.verdict}</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="py-2 whitespace-nowrap text-gray-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
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
        {current && (
          <button
            type="button"
            onClick={() => downloadMd(current.filename, current.raw)}
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
          {current.tracking.length > 0 && (
            <TrackingTable rows={current.tracking} cabinets={current.cabinets} />
          )}
        </div>
      )}
    </div>
  );
}
