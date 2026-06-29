# 00 — Comment ça marche

*Espace documentaire & Intelligence Produit de la Tribe — manuel de fonctionnement.*
*Lis cette page une fois : tu sauras à quoi sert l'espace, comment il marche, et ce qu'on attend de toi.*

---

## 1. À quoi sert cet espace

La Tribe Produit produit et reçoit une matière précieuse mais dispersée : veille externe, signaux terrain, données business. Cet espace la **centralise** et, surtout, la **transforme en intelligence décisionnelle**.

Le principe fondateur, valable partout ici : **on ne se limite jamais à résumer.** On lit, on trie, on interprète, on challenge, et on traduit en implications concrètes pour nos métiers.

Trois objectifs, dans cet ordre — cet ordre tranche tous les arbitrages :
1. **Faire évoluer nos convictions et notre offre** (priorité n°1).
2. **Alimenter l'avant-vente** et le discours commercial.
3. **Nourrir la culture Produit interne.**

Six expertises couvertes : Product Management · Product AI · Product Ops · PMM · QA · Data Product Management.

---

## 2. Comment c'est organisé

```
/Veille-Tribe-Produit
  /00-Comment-ça-marche        ← tu es ici
  /01-Matière-brute            ← la matière, pas le livrable
     /Newsletters-pré-digérées       (alimenté automatiquement)
     /Pipe-Boond                     (accès restreint — voir §7)
     /Notes-PAD-retraitées           (synthèse anonymisée auto-générée chaque mois depuis le pipe Boond, accès ouvert)
     /REX-et-learning-expeditions
     /Veille-concurrentielle         (brique pure : qui bouge / convergence par axe)
     /Veille-emploi                  (snapshots trimestriels par expertise)
     /Rapports-Emploi                (baromètres emploi — lus par l'agent emploi seul)
     /Rapports-State-of-X
  /02-Digests-par-expertise    ← le livrable des squads
     Grille-validation-Format-B      (moteur de l'agent-annotateur + ton aide de lecture critique — voir §4)
     /Product-Management  /Product-AI  /Product-Ops  /PMM  /QA  /Data-PM
  /03-Synthèse-Tribe
  /04-Convictions-et-offre     ← DÉPRÉCIÉ (v4.2) — les convictions vivent dans les decks d'expertise
  /Référentiel-technique       ← comment c'est construit (pour reprendre/maintenir)
  /Consultation                ← le dashboard de lecture des digests
```

---

## 3. La chaîne de production

La matière remonte en six couches. **La machine capte et structure ; l'humain trie et juge.**

1. **Captation** — toutes les newsletters arrivent dans un point unique. *Automatique.*
2. **Pré-digestion** — un agent produit une **fiche par newsletter** (Format A). C'est de la matière brute structurée, pas un livrable. *Automatique.*
3. **Briques propriétaires** — ce que la veille externe ne donne pas : extract Boond, notes PAD retraitées, REX & learning expeditions, veille concurrentielle, veille emploi, rapports State of X. *La veille concurrentielle et la veille emploi sont des **briques factuelles** : elles décrivent le marché et les concurrents ; on s'y **positionne** au Format B, pas dans la brique.*
4. **Digest par expertise** — un **assembleur pré-drafte mensuellement** le digest (Format B) : il agrège les fiches du mois + les briques propriétaires et **croise**. **C'est le vrai livrable, la couche de jugement, et le seul lieu du croisement et du positionnement.** *(Génération sur AI Builder GPT-4.1 — transparent pour toi.)*
5. **Annotation & publication** — un **agent-annotateur** passe sur le digest : il applique la **`Grille-validation-Format-B`** (il corrige les tags mal posés — un `[structurel]` qui ne tient que sur une newsletter redevient `[tendance]` — et **annote la provenance** de chaque signal : « source unique », « non corroboré », `⚠ poussé par <acteur>»…), puis **publie**. Il **annote, il ne juge pas** : il te dit sur quoi tient un signal, c'est toi qui décides quoi en faire. *Pas de validation humaine bloquante : le digest est un **briefing informatif**.*
6. **Consultation — c'est par là que tu entres** — un **dashboard** restitue les digests **annotés** (4 blocs déroulables par expertise + la couche de confiance + statut des sources). C'est l'**outil de minage** : tu y prends ce qui te sert (deck, article, compétences à développer). *(prototype livré ; alimentation automatique à câbler.)*

> **Important (recadré v4.2)** : le dispositif **fournit du briefing sourcé** ; il ne met jamais à jour un deck et n'émet jamais « conviction du cabinet ». **Une conviction ne naît que quand un humain la pose** — toi, dans ton deck ou ton article, au point d'usage. Le digest te donne des **pistes qualifiées**, pas des certitudes : un signal « source unique » ou `⚠ poussé par <acteur>` est à creuser avant d'être porté devant un client.

> **La valeur naît du croisement, jamais d'un signal isolé.** Une tendance vue en newsletter × un besoin récurrent en PAD × un mouvement chez un concurrent = une inflexion d'offre à acter.

---

## 4. Les deux formats

| | **Format A — Fiche de contenu** | **Format B — Digest par expertise** |
|---|---|---|
| **Quoi** | Une newsletter pré-digérée | La synthèse mensuelle d'une expertise |
| **Qui** | L'agent (automatique) | Agent (pré-draft mensuel) → agent-annotateur → publication |
| **Quand** | Au fil de l'eau | Mensuel (voir §5) |
| **Contient** | Verdict, à retenir, signaux tagués, impact, convictions | **4 blocs** : problématiques clients & positionnement offre · signaux qui challengent les convictions · skills/outils · éditorial — le tout **croisé** avec nos données propriétaires |
| **Où** | `01-Matière-brute/Newsletters-pré-digérées` | `02-Digests-par-expertise/[expertise]` |

Le Format A **ne croise rien** : il ne mobilise aucune donnée interne. Le croisement — la vraie valeur ajoutée — se fait en Format B, par la squad. C'est aussi **le seul endroit où l'on se positionne** face aux concurrents : le snapshot concurrentiel décrit leur mouvement, le Format B en tire *notre* position.

---

## 5. La cadence

| Expertise | Cadence |
|---|---|
| Product Management · Product AI · Product Ops · PMM · QA | Mensuelle |
| Data Product Management | Mensuelle *(en test, coloration technique, à réévaluer à 3 mois)* |
| Veille concurrentielle & emploi | Trimestrielle |

**Cadence mensuelle pour les 6 expertises.** Et règle non négociable : **pas de digest sans un minimum de signaux réels.** S'il n'y a pas assez de matière un mois, on le dit et on bascule en trimestriel — on ne meuble jamais.

---

## 6. Les règles d'or

- **On ne résume jamais.** On trie, on interprète, on challenge, on traduit.
- **Le croisement prime sur l'accumulation.** On n'ajoute un type de signal que si on compte réellement le croiser.
- **Chaque signal est tagué** : `[mode]` (buzz), `[tendance]` (mouvement réel), `[structurel]` (changement de fond). **Un `[structurel]` ne tient que s'il s'appuie sur un baromètre/étude** — l'agent-annotateur rétrograde en `[tendance]` ceux qui ne reposent que sur une newsletter. Reste un **candidat à corroborer** : la machine qualifie, c'est toi qui tranches en l'exploitant.
- **On repère le sponsoring.** Un contenu de marque est annoté `⚠ poussé par <acteur>` ; on sépare l'idée de fond de l'argument de vente.
- **Seuil de matière.** Pas de volume pour faire du volume — un cycle maigre se déclare en clair.
- **Le digest est un briefing, il ne met pas à jour le deck.** Une conviction ne naît que **quand un humain la pose** (deck, article), au point d'usage. Le pipeline ne consacre jamais une conviction.
- **Diffusion large par défaut**, sauf la donnée business brute (voir §7).

---

## 7. Confidentialité & accès

- **Tout est ouvert** à la Tribe par défaut.
- **Exception : `Pipe-Boond` brut** — accès restreint à Axel, Delphine, + KR Owners au besoin. Seule la **synthèse anonymisée** des notes PAD est ouverte à tous.
- Les digests et synthèses sont aussi partagés au management de la Tribe, aux 6 autres Tribe Leads, aux 7 PADs, et aux équipes commerciales et recrutement.

---

## 8. Qui fait quoi

| Rôle | Responsabilité |
|---|---|
| **Axel** | Sponsor, cadrage. Propriétaire de la synthèse Tribe et de la boucle convictions/offre (`03` et `04`). |
| **Delphine** | Construction du dispositif, premiers cycles, puis passage de relais aux squads. |
| **KR Owners + squads** (~15 consultants) | Production récurrente du digest de leur expertise (Format B) après handover. |
| **Lecteurs** | Management, 6 Tribe Leads, 7 PADs, commercial, recrutement. |

**Un responsable par brique.** C'est la condition de survie de l'espace : sans propriétaire identifié, une brique se dégrade et entraîne le reste.

---

## 9. Comment contribuer, selon ton rôle

- **Tu es KR Owner / dans une squad** → chaque mois, le **digest de ton expertise est produit et publié automatiquement** (croisement newsletters × PAD × concurrence × emploi déjà fait, signaux annotés en provenance/confiance). Ton rôle n'est plus de le *valider* mais de le **miner** : qu'est-ce que tu en tires pour ton **deck d'expertise**, un **article**, les **compétences à screener/développer** ? Utilise la **`Grille-validation-Format-B`** (racine de `02-Digests-par-expertise/`) comme **aide de lecture critique** — elle te dit comment lire les tags et les annotations (un signal « source unique » est une piste, pas une preuve). Si l'agent a déclaré un cycle maigre, c'est honnête : on ne meuble pas.
- **Tu es en mission / PAD** → fais remonter les besoins récurrents, objections et REX vers la brique correspondante. C'est cette matière qui rend le croisement possible.
- **Tu es lecteur** (Tribe Lead, PAD, **commercial, leader**) → lis le digest de l'expertise qui t'intéresse via le **dashboard de consultation** (couche 6, surface primaire). **Lis la couche de confiance avant d'utiliser un signal devant un client.** Si tu réutilises un signal en avant-vente, signale-le (indicateur n°2). **Tes retours alimentent le backlog d'évolution** — dis ce qui manque ou ce qui cloche.

---

## 10. Comment on mesure le succès (trimestriel)

1. **Convictions touchées** — créées, mises à jour ou challengées grâce à la veille. *Indicateur n°1.*
2. **Réemploi en avant-vente** — propositions / pitchs ayant puisé dans la matière.
3. **Vivacité de production** — expertises ayant tenu leur cadence. *Indicateur de survie.*

---

## 11. Statut actuel

Le pipeline complet est **construit et validé sur les 6 expertises** (digest Format B généré en ~3 min par cycle), et le flux tourne **en récurrence** (1er run autonome le 1er juillet). **Recadrage v4.2** : le digest est un **briefing informatif publié sans validation humaine** ; un **agent-annotateur** qualifie la provenance et applique les downgrades de tags, puis publie. Le chemin critique actuel = **câbler l'agent-annotateur + la couche de confiance + le dashboard** (surface primaire de consultation). Première revue à 3 mois.

---
*Doc v1.5 — mise à jour 25 juin 2026 : **RECADRAGE DE FINALITÉ.** Le digest devient un **briefing informatif publié sans validation** ; le rôle KR Owner passe de **valideur à consommateur/mineur** (§3, §9) ; la couche 5 passe de « validation » à **agent-annotateur** (annote, ne juge pas) ; la couche 6 **consultation est promue surface primaire** et porte la couche de confiance ; **`04` déprécié** (convictions au point d'usage) ; **report abandonné** (cycle maigre déclaré). — v1.4 (24 juin) : chaîne portée à 6 couches ; arborescence enrichie ; pivot AI Builder GPT-4.1. — v1.3 (21 juin) : Format B automatisé en **assembleur mensuel**. — v1.2 (19 juin) : cadence **mensuelle pour les 6**. — v1.1 (17 juin) : séparation brique/croisement ; Format B = 4 blocs. — v1 : création.*
