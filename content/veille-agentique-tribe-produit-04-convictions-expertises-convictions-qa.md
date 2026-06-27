# Convictions — QA

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

### QA-01 — Sans vision du risque, la QA sécurise ce qui importe peu.
- **Énoncé** : « La QE structure et pilote la couverture de test par le risque produit. Ce qui est critique pour les utilisateurs et le business est testé en profondeur ; ce qui est stable et peu risqué est couvert superficiellement. C'est la priorisation par le risque qui donne à la QA sa valeur stratégique. »
- **Statut** : active
- **Dernière décision** : Posée — Pierre ELOY · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### QA-02 — La qualité est une responsabilité d'équipe, pas d'une fonction.
- **Énoncé** : « Un Quality Engineer seul ne peut pas garantir la qualité d'un produit construit par une équipe entière. Sa valeur, c'est de créer les conditions pour que les devs, POs et PMs se sentent co-responsables de la qualité. Chez WeFiiT, on ne vient pas « trouver des bugs », on vient construire une culture qualité.​ »
- **Statut** : active
- **Dernière décision** : Posée — Pierre ELOY · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### QA-03 — Le shift-left n'est pas une méthode, c'est une culture.
- **Énoncé** : « Intervenir dès la discovery n'est pas une technique, c'est un changement de paradigme. Quand la QE entre dans la conversation au moment où les choix coûtent le moins cher à corriger, les économies peuvent atteindre un facteur 10 à 100 par rapport à une détection en production. Mais pour que ça fonctionne, toute l'équipe doit y croire. »
- **Statut** : active
- **Dernière décision** : Posée — Pierre ELOY · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### QA-04 — Sans architecture, l'automatisation construit la dette de demain.
- **Énoncé** : « Automatiser sans cadre stratégique, c'est accumuler des tests fragiles qui brisent à chaque refactorisation, coûtent plus à maintenir qu'ils n'en économisent, et créent une fausse sécurité. Chez WeFiiT, l'automatisation est toujours précédée d'une décision stratégique : quoi automatiser, dans quel ordre, avec quelle stack, avec quel niveau de maintenance. »
- **Statut** : active
- **Dernière décision** : Posée — Pierre ELOY · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### QA-05 — La QA est un levier de pilotage, pas un filtre de release.
- **Énoncé** : « Les KPIs qualité sont des indicateurs de santé produit à part entière. Un Quality Engineer qui sait les lire et les raconter parle d'égal à égal avec le CPO et la direction technique. Chez WeFiiT, on pilote la qualité dans la durée. »
- **Statut** : active
- **Dernière décision** : Posée — Pierre ELOY · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

### QA-06 — L'IA ne remplace pas le jugement du Quality Engineer elle l'amplifie.
- **Énoncé** : « Les LLMs génèrent des cas de test, analysent des logs et produisent de la documentation à une vitesse impossible manuellement. Mais ils n'ont pas de stratégie de risque, ne savent pas ce qui est critique pour le business et ne peuvent pas décider d'un go/no-go. Le QE définit les oracles, challenge les outputs IA et maintient la maîtrise du résultat. »
- **Statut** : active
- **Dernière décision** : Posée — Pierre ELOY · [27/06/2026]
- **Note (optionnel)** : [nuance, périmètre, ce qui la ferait basculer]

---

## Convictions retirées *(conservées pour traçabilité)*

### `[EXP]-NN` — [titre court]
- **Énoncé (historique)** : « [...] »
- **Statut** : retirée — [JJ/MM/AAAA]
- **Motif** : [pourquoi abandonnée — quel signal/croisement l'a renversée]

---
*Registre v1.0 — input humain canonique, lu par le pipeline (Carte Convictions), jamais écrit par lui. Un fichier par expertise : `Convictions-pm.md`, `Convictions-productai.md`, `Convictions-productops.md`, `Convictions-pmm.md`, `Convictions-qa.md`, `Convictions-datapm.md`. Révision trimestrielle au point d'usage. Les IDs sont stables et jamais réattribués.*
