"use client";

import { downloadMarkdown } from "@/lib/download";
import { track } from "@/lib/track";

/**
 * Bouton « Télécharger le snapshot (.md) » partagé par les rubriques trimestrielles
 * (Métiers, Concurrence). Un seul style et un seul comportement, où qu'il soit placé.
 */
export default function SnapshotDownload({
  filename,
  content,
}: {
  filename: string;
  content: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        track("download", filename);
        downloadMarkdown(filename, content);
      }}
      title="Télécharger le fichier Markdown source de ce snapshot"
      className="text-sm font-medium text-electrique hover:underline focus-visible:outline-2 focus-visible:outline-electrique focus-visible:outline-offset-2"
    >
      ⬇ Télécharger le snapshot (.md)
    </button>
  );
}
