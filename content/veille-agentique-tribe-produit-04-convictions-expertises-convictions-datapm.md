# Convictions — Data PM

> **Ce que c'est.** Le **registre canonique** des convictions de l'expertise : la liste de référence, avec un **ID stable par conviction** (`[EXP]-NN`). C'est le **miroir du deck**, pas un nouveau lieu de doctrine.
>
> **Qui le tient.** Le **KR Owner** de l'expertise, **au point d'usage** : on l'édite quand on révise le deck. **Le pipeline le LIT, ne l'écrit jamais.** La Carte Convictions du digest se joint ici par l'ID et montre la pression du cycle ; **la décision (réaffirmer / réviser / retirer) se pose ici, à la main.**
>
> **Cadence.** Révision **trimestrielle**, alignée deck/snapshot — **pas mensuelle**. Au mois, la charge est quasi nulle : la carte est dérivée, le registre ne bouge que quand le deck bouge.
>
> **IDs.** Stables et jamais réattribués. Une conviction retirée garde son ID (statut `retirée`) pour ne pas casser les jointures historiques. Une nouvelle prend le numéro suivant.
>
> **Légende statut.** `active` = tenue · `en révision` = sous pression, décision en cours · `retirée` = abandonnée (datée, conservée pour traçabilité).

| | |
|---|---|
| **Expertise** | [Product Management / Product AI / Product Ops / PMM / QA / Data PM] |
| **Préfixe ID** | [`pm` / `productai` / `productops` / `pmm` / `qa` / `datapm`] |
| **Propriétaire (KR Owner)** | [nom] |
| **Dernière révision** | [JJ/MM/AAAA] |
| **Source miroir** | [deck d'expertise — réf./lien] |

---

## Convictions actives

### DATAPM-01 — Talk-to-data : “Don’t focus on the shiny, focus on the boring”
- **Énoncé** : « À l'ère de l'IA, la qualité de la donnée est un actif produit — pas un sujet technique.​ Le Data PM est garant de la gouvernance, la traçabilité et la couverture des cas d’usage. Il s’agit alors de documenter et communiquer les métadonnées, le lineage, les règles de gestion et les actions mises en place sur les données sensibles afin d’augmenter la confiance en une source de données unique (“golden source”). ​»
- **Statut** : active
- **Dernière décision** : Posée — Julia MATHURIN · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### DATAPM-02 — Le Data PM est avant tout un PM —​ avec une culture data renforcée.
- **Énoncé** : « On ne part pas nécessairement de profils data engineers pour en faire des PM, mais plutôt de profils produit solides que l'on ancre dans les contraintes réelles de la donnée : qualité, gouvernance, pipelines, modèles sémantiques. La différence se joue dans la compréhension du métier ET de la technique et dans la capacité à arbitrer. »
- **Statut** : active
- **Dernière décision** : Posée — Julia MATHURIN · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### DATAPM-03 — Adopter une posture Data as a Product : du cadrage à l’amélioration continue
- **Énoncé** : « Des dizaines de dashboards livrés pour zéro usage réel. Le vrai succès d'un produit data se mesure à l'adoption et à l'impact business — pas par la vélocité ou au nombre de tickets fermés. ​»
- **Statut** : active
- **Dernière décision** : Posée — Julia MATHURIN · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### DATAPM-04 — Sortir d’une logique de ticketing pour privilégier une approche partenariale mesurable par l’impact
- **Énoncé** : « Les roadmaps data sont trop souvent arbitrées par le rapport de force interne ou la simple capacité à livrer. Un modèle explicite, chiffré et partagé entre toutes les directions — avec des Business Owners accountables — change tout. ​»
- **Statut** : active
- **Dernière décision** : Posée — Julia MATHURIN · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### DATAPM-05 — L'acculturation métier est une​ condition sine qua non — pas une​ option de fin de projet.​
- **Énoncé** : « Sans adhésion des parties prenantes à la logique d'impact, aucun produit data ne survit à la mise en production. Guides utilisateurs, ambassadeurs, formations par profil — c'est du delivery produit, pas de la conduite du changement. ​»
- **Statut** : active
- **Dernière décision** : Posée — Julia MATHURIN · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

---

## Convictions retirées *(conservées pour traçabilité)*

### `[EXP]-NN` — [titre court]
- **Énoncé (historique)** : « [...] »
- **Statut** : retirée — [JJ/MM/AAAA]
- **Motif** : [pourquoi abandonnée — quel signal/croisement l'a renversée]

---
*Registre v1.0 — input humain canonique, lu par le pipeline (Carte Convictions), jamais écrit par lui. Un fichier par expertise : `Convictions-pm.md`, `Convictions-productai.md`, `Convictions-productops.md`, `Convictions-pmm.md`, `Convictions-qa.md`, `Convictions-datapm.md`. Révision trimestrielle au point d'usage. Les IDs sont stables et jamais réattribués.*
