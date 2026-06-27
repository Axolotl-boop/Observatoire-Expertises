# Convictions — [EXPERTISE]

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

### `[EXP]-01` — [titre court]
- **Énoncé** : « [la conviction, telle qu'elle vit dans le deck] »
- **Statut** : active
- **Dernière décision** : [Réaffirmée / Posée] — [qui] · [JJ/MM/AAAA]
- **Note** *(optionnel)* : [nuance, périmètre, ce qui la ferait basculer]

### `[EXP]-02` — [titre court]
- **Énoncé** : « [...] »
- **Statut** : active
- **Dernière décision** : [...] — [qui] · [JJ/MM/AAAA]

### `[EXP]-03` — [titre court]
- **Énoncé** : « [...] »
- **Statut** : en révision *(sous pression ce cycle — voir Carte Convictions du digest)*
- **Dernière décision** : [...] — [qui] · [JJ/MM/AAAA]

*(Ajouter autant de convictions que le deck en porte. Garder l'ordre stable.)*

---

## Convictions retirées *(conservées pour traçabilité)*

### `[EXP]-NN` — [titre court]
- **Énoncé (historique)** : « [...] »
- **Statut** : retirée — [JJ/MM/AAAA]
- **Motif** : [pourquoi abandonnée — quel signal/croisement l'a renversée]

---
*Registre v1.0 — input humain canonique, lu par le pipeline (Carte Convictions), jamais écrit par lui. Un fichier par expertise : `Convictions-pm.md`, `Convictions-productai.md`, `Convictions-productops.md`, `Convictions-pmm.md`, `Convictions-qa.md`, `Convictions-datapm.md`. Révision trimestrielle au point d'usage. Les IDs sont stables et jamais réattribués.*
