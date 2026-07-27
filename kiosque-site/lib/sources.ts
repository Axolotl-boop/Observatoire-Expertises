export interface SourceInfo {
  /** Nom affiché du dossier. */
  name: string;
  /** Définition / ligne éditoriale de la source. */
  description: string;
}

/**
 * Définitions des sources de newsletters, indexées par leur libellé canonique
 * (cf. canonicalSource dans lib/content.ts). Une source absente d'ici s'affiche
 * avec son nom brut et sans définition.
 */
export const SOURCE_INFO: Record<string, SourceInfo> = {
  "Product Ops Confidential": {
    name: "Product Ops Confidential",
    description:
      "Voix de référence mondiale du Product Ops, ton praticien et sans complaisance sur la maturité (et la fragilité) du métier. Couvre tout le périmètre : piliers du rôle, career path, salary survey communautaire, IA & Product Ops, vulnérabilité du poste quand les budgets se resserrent.",
  },
  "Le Ticket": {
    name: "Le Ticket",
    description:
      "Le média francophone de la culture produit, accessible, sans jargon, avec un brin d'humour (« pertinent mais pas chiant »). Décrypte les frameworks et surtout leur mise en application concrète dans l'écosystème FR/EU, relaie l'actualité produit, fait les comptes-rendus d'événements (La Product Conf, School of Product, étude LPC), et couvre toute la famille (PM, PO, design, ops, PMM).",
  },
  "John Cutler": {
    name: "John Cutler — The Beautiful Mess (TBM)",
    description:
      "Référence intellectuelle « haut de gamme », ton réflexif et nuancé, anti-recette. Il modélise la complexité des systèmes produit (modèles mentaux, schémas) plutôt que de livrer des playbooks : orgs et operating models, dette de décision, feature factory, discovery continue, dynamiques d'équipe.",
  },
  "Ravi Mehta": {
    name: "Ravi Mehta",
    description:
      "Regard d'opérateur senior, structuré, orienté frameworks actionnables et carrière. Best-of : Product Strategy Stack, Shape of a PM (12 compétences), NCTs en alternative aux OKR, premiers 90 jours d'un leader — et de plus en plus le « PM AI-first » (prototypage/vibe coding comme nouveau PRD).",
  },
  SVPG: {
    name: "SVPG",
    description:
      "Le discours le plus normatif du marché : équipes produit « empowered » vs feature teams, rôle du PM, transformation produit, coaching. Ton prescriptif, opinionné, parfois dogmatique.",
  },
  Yeita: {
    name: "Yeita",
    description:
      "Ton chaleureux, incarné, ludique, « build/transparence in public ». Thématiques : product strategy, management, marketing, design, OKR, maturité produit, IA (de l'expérimentation au delivery), et beaucoup les coulisses d'un modèle de conseil alternatif (salaires/marge transparents).",
  },
  // ⚠️ Les trois définitions ci-dessous ont été rédigées lors de l'extraction du
  // kiosque : elles décrivent des sources jusqu'ici non répertoriées. À relire
  // et à ajuster à la ligne éditoriale de l'équipe.
  "Lenny's Newsletter": {
    name: "Lenny's Newsletter",
    description:
      "La newsletter produit la plus lue du marché (Lenny Rachitsky). Format dominant : l'interview d'opérateur — souvent co-signée avec l'invité, souvent cross-postée depuis le podcast — sur la croissance, le métier de PM, l'organisation produit et la carrière. Utile pour ce qui circule dans l'écosystème US ; à lire en gardant en tête son biais scale-up tech américaine.",
  },
  ByteByteGo: {
    name: "ByteByteGo",
    description:
      "Newsletter d'architecture et de système (Alex Xu) : design distribué, backend, infrastructure des grands acteurs, et de plus en plus les patterns d'intégration de l'IA (MCP, agents, RAG). C'est la source la plus technique du kiosque — utile pour comprendre ce que recouvrent les sujets dont parlent les équipes, moins pour la pratique produit elle-même.",
  },
  "The Skip": {
    name: "The Skip — Nikhyl Singhal",
    description:
      "Newsletter de carrière et de leadership produit (Nikhyl Singhal, ex-Meta/Google) : progression, passage au management, dynamiques d'équipe et de niveau. Régulièrement cross-postée chez Lenny's Newsletter — elle est ici rattachée à sa publication d'origine.",
  },
  "The Setups": {
    name: "The Setups",
    description:
      "Newsletter « terrain » sur les meilleurs setups IA : workflows concrets, agents, outils testés et benchés, interviews de builders. Posture revendiquée : pas de théorie, pas de hype, que du vécu. Exemples typiques d'éditions : la AI Maturity Map de Payfit (passer de 400 à 20 agents vraiment utiles), les workflows multi-agents de Dust pour produire des customer stories, la documentation d'un design system par agents IA. Très alimentée par la communauté (les lecteurs envoient leurs propres setups).",
  },
};
