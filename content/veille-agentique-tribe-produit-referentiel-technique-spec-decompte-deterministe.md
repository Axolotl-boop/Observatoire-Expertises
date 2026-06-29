# Spec — décompte déterministe du dashboard (3 règles)

> **Rôle.** Comble le trou laissé par le contrat (`Contrat-dashboard-data` §2, ligne « décompte exact = déterministe sur `sigs[].prov` ») : **comment** compter sans hériter des erreurs de calibration de l'annotateur. À insérer comme **§6 du contrat** (ou fiche autonome référencée par `Fiche-Dashboard-consultation`).
>
> **Principe directeur (v4.3).** L'annotateur **classe** (tag, provenance, thème) ; le dashboard **compte**. Le compte ne fait **jamais** confiance aux labels `croisement` / `multi-axes` ni au compteur de downgrades de l'annotateur — il les **recalcule** depuis les tokens. Trois tests ont prouvé qu'un LLM ne recompte pas ses annotations ; ces règles ferment les trois fuites observées sur le run réel `2026-06`.

---

## 0. Entrée

Les `sigs` agrégés de tous les blocs d'un digest (le `[[DASH_JSON]]`). Chaque sig :
`{ tag, prov[], vendor, x, tagCorrige?, theme?, tagOrigine? }` (les deux derniers = ajouts proposés, cf. §5).

---

## 1. Lexique de catégories *(= taxonomie du contrat §3.2)*

Chaque source nommée dans une `prov` se mappe à **une catégorie d'indépendance**. **L'Emploi absorbe ses baromètres de grounding** : l'agent snapshot emploi est *construit sur* APEC/Noé/Seyos/LPC → croiser le snapshot emploi avec l'un d'eux, c'est croiser une source avec sa propre source = **faisceau, pas corroboration indépendante**.

| Token (lowercase, `contains`) | Catégorie | Propriétaire ? |
|---|---|---|
| `pad`, `pipe`, `boond` | `pad` | ✅ |
| `concurrence`, `concurrentiel` | `concurrence` | ✅ |
| `emploi` · **+** `seyos` `apec` `noé`/`noe` `lpc` `baromètre(s)` | `emploi` | ✅ |
| `newsletter(s)` | `newsletters` | ❌ |
| `state of x` | `stateofx` | ❌ |

> `baromètre(s)` générique (non nommé) → mappé **conservateur** sur `emploi` (les baromètres tracés sont ceux du grounding emploi). Si un jour un baromètre hors-emploi entre en jeu, l'ajouter explicitement au lexique.

---

## 2. Règle 1 — effondrer le signal transverse *(dé-duplication par thème)*

**Problème.** Un même signal de fond (« la valeur se déplace vers l'orchestration / le jugement / la gouvernance ») apparaît dans 4 expertises et parfois 2 fois dans un même digest. Compté brut, il gonfle le cycle (9 occurrences sur `2026-06`). Faisceau ≠ corroborations.

**Règle.** Avant tout comptage, **grouper les sigs par `theme`** ; un groupe de même thème ≠ null compte pour **un seul** signal — au niveau *corpus* (pour le headline « N signaux distincts ce cycle ») **et** intra-digest. Les sigs `theme = null` sont comptés individuellement.

- **Voie robuste (recommandée)** : l'annotateur émet un champ `theme` par sig, tiré d'un **registre contrôlé** de méta-signaux transverses. Registre amorcé à **une** entrée : `valeur-vers-orchestration`. Groupby déterministe.
- **Voie zéro-amont (fallback)** : l'indexeur matche `x` contre un petit registre de motifs. Best-effort, fragile aux reformulations — n'utiliser qu'en attendant le champ `theme`.

> Portée : la dé-dup agit sur le **rollup corpus** et le **décompte** ; elle **n'efface pas** les occurrences dans les vues par expertise (le méga-signal reste pertinent et affiché pour pm, productai, productops, datapm).

---

## 3. Règle 2 — validité d'un croisement *(indépendance des axes)*

**Problème.** L'annotateur étiquette `croisement sur 1 axe (snapshot emploi × Seyos)` — mais emploi et Seyos sont la même catégorie. Croisement fantôme.

**Règle.** Une `prov` qui commence par `croisement` ne compte comme croisement **que si** ses tokens, mappés au lexique §1 et **dédupliqués par catégorie**, donnent **≥ 2 catégories distinctes ET ≥ 1 propriétaire**. Le label `1 axe` / `multi-axes` de l'annotateur est **ignoré** — on recompte sur les tokens.

```
croisementReel(provEntry):
    tokens = split(contenu_entre_parenthèses, sur [× + ,])
    cats   = { categorie(t) for t in tokens if categorie(t) != null }
    return  taille(cats) >= 2  ET  (cats ∩ {pad, emploi, concurrence}) != ∅
```

**Atterrissage d'un croisement recalé** (faisceau) : il **ne devient pas** « non corroboré ». S'il contenait un token propriétaire (ex. `emploi`), le sig reste **propriétaire (source unique)**. Un faisceau garde son ancre interne — il perd seulement le statut de corroboration indépendante.

Exemples (run `2026-06`) :
- `(PAD + snapshot emploi)` → {pad, emploi} → **croisement ✅**
- `(PAD, emploi, Seyos 2026)` → {pad, emploi} → **croisement ✅** (Seyos absorbé, mais PAD×emploi tient)
- `(baromètres, emploi)` → {emploi} → **faisceau ❌** → sig reclassé *propriétaire : emploi*
- `(snapshot emploi × Seyos 2026)` → {emploi} → **faisceau ❌** → *propriétaire : emploi*

---

## 4. Règle 3 — validité d'un downgrade *(garde no-op)*

**Problème.** Le contrat veut `tagCorrige = true` **uniquement** sur un vrai downgrade. Sur le run, datapm a posé `tagCorrige` sur un `[tendance] → [tendance]` (no-op) → `confidenceSummary` annonce « 1 downgrade » alors que rien n'a bougé.

**Règle.** Un downgrade ne compte que si **sévérité(tagOrigine) > sévérité(tag)**, avec `struct = 3 > tend = 2 > mode = 1 > null = 0`. `tagCorrige` seul ne suffit pas.

- **Voie robuste (recommandée)** : l'annotateur émet `tagOrigine` (le tag *avant* correction). Test = comparaison de sévérité. Détecte le no-op et l'« upgrade » accidentel.
- **Voie zéro-amont (fallback)** : l'indexeur parse la prose `tag corrigé : [X] → [Y]` de la couche lisible et compare X,Y. Couple l'indexeur au format de prose — à éviter dès que `tagOrigine` existe.

---

## 5. Deux ajouts de schéma *(ADOPTÉS — annotateur v1.5 / contrat v0.5)*

R2 est **pur-indexeur** (aucun changement amont). R1 et R3 sont robustes grâce à deux champs ajoutés à la sortie de l'annotateur :

| Champ | Sur | Pour | État |
|---|---|---|---|
| `theme` | chaque sig (`null` par défaut) | R1 (dé-dup transverse) | ✅ émis (Tâche 5, registre `valeur-vers-orchestration`) |
| `tagOrigine` | sig downgradé (avec `tagCorrige`) | R3 (garde no-op) | ✅ émis + garde no-op au prompt |

Ce sont de la **classification**, pas du comptage — cohérents avec v4.3 (le LLM étiquette, le dashboard compte). Les fallbacks (keyword pour R1, parse de prose pour R3) ne sont plus nécessaires.

---

## 6. Sortie — objet décompte (par expertise + rollup)

```
décompte(sigs):                         # après groupby theme (R1)
    pour chaque sig :
        si  ∃ prov croisement ET croisementReel(prov)   → classe = "croisement"
        sinon si ∃ token propriétaire dans une prov     → classe = "propriétaire"
        sinon                                            → classe = "non corroboré"
    retourne {
        croisements   : #classe=="croisement",
        proprietaires : #classe=="propriétaire",
        nonCorrobores : #classe=="non corroboré",
        downgrades    : #sig où sév(tagOrigine) > sév(tag),   # R3
        themes        : { theme présents }                    # pour rollup corpus
    }
```

**Rollup corpus** : sommer par expertise, puis **soustraire les doublons de `theme`** (un thème présent dans k expertises ne compte qu'une fois dans le total « signaux distincts du cycle »).

Le `confidenceSummary` qualitatif de l'annotateur reste affiché tel quel (tuile de tête) ; ce décompte est la **couche chiffrée déterministe** posée à côté — et le moyen de **détecter une dérive** quand le summary et le compte divergent (ex. summary « 1 downgrade » vs compte « 0 »).

---

## 7. Impact mesuré — run `Format-B-*-2026-06`

| | brut (labels annotateur) | net (3 règles) | règle |
|---|---|---|---|
| Croisements (corpus) | 8 | **4** | R2 (−2 datapm, −2 qa) |
| Downgrades (corpus) | 6 | **5** | R3 (−1 no-op datapm) |
| Méga-signal « valeur→orchestration » | 9 occ. | **1** | R1 (pm·productai·productops·datapm) |

---

*Spec v1.1 — décompte déterministe. À folder dans `Contrat-dashboard-data` §6 + référencer dans `Fiche-Dashboard-consultation` et `SPECS §6/§11`. **v1.1** : `theme` + `tagOrigine` adoptés (annotateur v1.5, contrat v0.5) — R1/R3 en version robuste, R2 câblable immédiatement.*
