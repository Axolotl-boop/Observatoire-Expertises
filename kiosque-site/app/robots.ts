import type { MetadataRoute } from "next";

/**
 * Indexation par les moteurs de recherche : **bloquée par défaut**.
 *
 * Le kiosque publie des digests de newsletters tierces ; tant que l'ouverture
 * au référencement n'est pas explicitement validée, on garde le site hors des
 * résultats de recherche. Pour l'ouvrir, définir la variable d'environnement
 * `NEXT_PUBLIC_ALLOW_INDEXING=true` (côté Vercel) et redéployer.
 */
export default function robots(): MetadataRoute.Robots {
  const allow = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  return {
    rules: allow
      ? [{ userAgent: "*", allow: "/" }]
      : [{ userAgent: "*", disallow: "/" }],
  };
}
