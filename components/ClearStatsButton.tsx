"use client";

import { useState } from "react";

export default function ClearStatsButton() {
  const [busy, setBusy] = useState(false);

  async function clear() {
    if (busy) return;
    if (
      !window.confirm(
        "Effacer DÉFINITIVEMENT toutes les statistiques de tracking ? Cette action est irréversible.",
      )
    ) {
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/admin/clear-stats", { method: "POST" });
      if (!res.ok) throw new Error();
      const d = await res.json().catch(() => ({ deleted: 0 }));
      window.alert(`${d.deleted ?? 0} événement(s) supprimé(s).`);
      window.location.reload();
    } catch {
      window.alert("Échec de la suppression.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={clear}
      disabled={busy}
      className="rounded-full border border-alerte px-4 py-2 text-sm font-medium text-alerte transition hover:bg-alerte hover:text-white disabled:opacity-50"
    >
      {busy ? "Suppression…" : "🗑 Réinitialiser les statistiques"}
    </button>
  );
}
