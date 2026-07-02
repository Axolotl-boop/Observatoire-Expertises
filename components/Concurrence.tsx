"use client";

import { useState } from "react";
import Chip from "@/components/Chip";
import Disclosure from "@/components/Disclosure";
import SnapshotDownload from "@/components/SnapshotDownload";
import type { ConcurrenceQuarter } from "@/lib/content";

function quarterLabel(q: string): string {
  const m = q.match(/^(\d{4})-T([1-4])$/i);
  return m ? `T${m[2]} ${m[1]}` : q;
}

export default function Concurrence({ quarters }: { quarters: ConcurrenceQuarter[] }) {
  const keys = quarters.map((q) => q.quarter);
  const [quarter, setQuarter] = useState<string>(() => keys[0] ?? "");
  // Ouverture par axe (clé = titre de l'axe), centralisée pour « tout déplier/replier ».
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const current = quarters.find((q) => q.quarter === quarter) ?? quarters[0];

  const setAll = (value: boolean) =>
    setOpenMap(Object.fromEntries((current?.axes ?? []).map((a) => [a.title, value])));

  return (
    <div>
      {/* Filtre par trimestre */}
      <div className="mb-4 flex flex-wrap gap-2">
        {keys.map((q) => (
          <Chip key={q} active={q === current?.quarter} onClick={() => setQuarter(q)}>
            {quarterLabel(q)}
          </Chip>
        ))}
      </div>

      {!current ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune donnée pour ce trimestre.
        </div>
      ) : (
        <>
          {/* Barre d'outils : déplier/replier tout (gauche) · télécharger (droite) */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAll(true)}
                className="font-medium text-electrique hover:underline"
              >
                Tout déplier
              </button>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => setAll(false)}
                className="font-medium text-electrique hover:underline"
              >
                Tout replier
              </button>
            </div>
            <SnapshotDownload filename={current.filename} content={current.raw} />
          </div>

          <div className="space-y-4">
            {current.axes.map((axis) => (
              <Disclosure
                key={axis.title}
                open={!!openMap[axis.title]}
                onToggle={() =>
                  setOpenMap((m) => ({ ...m, [axis.title]: !m[axis.title] }))
                }
                html={axis.html}
                header={
                  <h3 className="font-title text-[17px] font-semibold leading-snug text-marine">
                    {axis.title}
                  </h3>
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
