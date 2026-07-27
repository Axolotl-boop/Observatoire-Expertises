"use client";

import { useEffect, useState } from "react";

function relative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return "à l'instant";
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  return `il y a ${j} j`;
}

export default function SyncFreshness({ syncedAt }: { syncedAt: string | null }) {
  const [rel, setRel] = useState("");

  useEffect(() => {
    if (!syncedAt) return;
    const update = () => setRel(relative(syncedAt));
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, [syncedAt]);

  if (!syncedAt) {
    return <span>Contenu synchronisé automatiquement depuis SharePoint.</span>;
  }

  const abs = new Date(syncedAt).toLocaleString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <span>
      Synchronisé {rel || "récemment"} <span className="text-gray-400">· {abs}</span>
    </span>
  );
}
