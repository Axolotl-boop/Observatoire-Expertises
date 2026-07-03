/**
 * Tags de maturité d'un signal de veille, par intensité croissante.
 * Source de vérité partagée par le rendu serveur (colorisation des pastilles
 * dans lib/content.ts) et les composants client (ConfidenceLegend, Verdict…),
 * pour que la clé de lecture soit identique partout où les tags apparaissent.
 */
export type TagKey = "mode" | "tendance" | "structurel";

/** Libellé court de l'intensité. */
export const TAG_LABEL: Record<TagKey, string> = {
  mode: "effet de surface",
  tendance: "mouvement réel",
  structurel: "changement de fond",
};

/**
 * Explication condensée, utilisée en infobulle (`title` / `aria-label`) sur
 * chaque pastille, pour rendre les tags auto-explicatifs sans ouvrir la légende.
 */
export const TAG_TOOLTIP: Record<TagKey, string> = {
  mode: "[mode] · effet de surface — beaucoup de bruit, peu d'ancrage. À lire avec recul, souvent à ignorer.",
  tendance: "[tendance] · mouvement réel — confirmé par au moins une autre source, sans être encore structurant. À suivre.",
  structurel: "[structurel] · changement de fond — appuyé sur un fait dur et corroboré par nos données. À prendre au sérieux.",
};

/** Détecte la clé de tag présente dans un texte brut (ex. « [tendance] »). */
export function tagKeyOf(value: string | undefined): TagKey | null {
  const v = (value ?? "").toLowerCase();
  if (v.includes("structurel")) return "structurel";
  if (v.includes("tendance")) return "tendance";
  if (v.includes("mode")) return "mode";
  return null;
}
