# Prompt de relance trimestrielle — Veille concurrence & emploi

*Procédure reproductible. Chaque trimestre, coller ce prompt dans une conversation Claude **avec recherche web activée**, en y joignant : (1) le format de référence, (2) le snapshot du trimestre précédent. Claude produit le nouveau snapshot en **deltas**. On valide, on dépose. C'est tout.*

---

## À joindre à chaque relance
- `Format-veille-concurrentielle.md` (ou `Format-veille-emploi.md`)
- Le **snapshot du trimestre précédent** (la ligne de base contre laquelle mesurer le delta)

## Inputs figés *(ne pas changer sans le noter)*

**Concurrence — listes par expertise**
- PM : Thiga · Hubvisory · Wivoo · Yield Studio
- QA : Qestit · KP2i · Smartesting
- 4 surfaces : offre/positionnement · discours/contenu · recrutement · structurel (événement, partenariat, levée, acquisition).

**Emploi — jeu de requêtes figé**
- PM : « Product Manager » · « Product Owner » · « Senior/Lead PM » · « Head of Product / CPO » · « AI Product Manager »
- Dimensions : intitulés · compétences · outils · séniorité/volume.
- Sources : études marché (Welcome to the Jungle, Indeed Hiring Lab, baromètres) + échantillon d'annonces.

---

## Le prompt à coller

> Tu es l'assistant de veille de la Tribe Produit. Produis le **snapshot [concurrence | emploi] [expertise] T_ AAAA**, en suivant le format joint et en mesurant les **deltas** contre le snapshot précédent joint.
>
> Méthode :
> - Recherche web sur les **inputs figés** ci-dessus (listes / jeu de requêtes). Sources **publiques uniquement**.
> - **Capture le mouvement, pas le statique.** Compare au snapshot précédent : qu'est-ce qui a **changé** depuis ? (nouveaux mouvements, mouvements confirmés, abandons). Si rien n'a bougé sur un item → « RAS ce trimestre ».
> - **Tague** chaque signal `[mode] / [tendance] / [structurel]`. Sois prudent : dans le doute, `[tendance]`. **Tout `[structurel]` est suffixé `(à valider)`** — tu ne tranches pas le structurel.
> - Mets en avant la **convergence** (plusieurs concurrents / dimensions qui bougent dans le même sens = direction de marché).
> - Le champ **croisement** : tu n'as **pas** accès au PAD ni au pipe → formule des **questions à confronter**, pas des affirmations.
> - Rends un **.md** au format joint, en statut « à valider », prêt à déposer.
>
> Rappel : tu pré-rédiges. Axel valide les verdicts (surtout `[structurel]`) avant que ça remonte.

---

## Après la relance
1. Axel relit, corrige les tags, tranche les `[structurel]`.
2. Renommer en `Snapshot-[concurrence|emploi]-[expertise]-T_-AAAA.md`.
3. Déposer dans `01-Matière-brute/Veille-concurrentielle` (ou `Veille-emploi`).
4. Ce snapshot devient la **base** de la relance suivante.

> **Pourquoi pas un pipeline auto ?** Cadence trimestrielle (4×/an) + analyse à haut jugement : automatiser la répétition n'économise rien puisque la validation reste humaine. Le coût/valeur penche vers cette procédure reproductible, pas vers un agent à construire et maintenir.

---
*v1 — à affiner après 1-2 relances. La précision « au poste près » n'est pas l'objectif : on cherche le mouvement.*
