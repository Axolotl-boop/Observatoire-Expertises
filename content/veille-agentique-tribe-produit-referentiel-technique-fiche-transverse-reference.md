# Fiche transverse — Référence (arborescence · conventions · corpus)

> **Type** : référence transverse (pas un module)  ·  **Rôle** : la carte « où vivent les choses et comment on les nomme ».
> **Fait foi** : **SPECS §5** (arborescence) · **§7** (conventions). Cette fiche en est le rendu lisible ; en cas de changement, on édite le SPECS, puis on aligne ici.

## 1. Arborescence SharePoint *(état réel)*
- **Site** : `https://wefiitcom.sharepoint.com/sites/TribeExpertises`
- **Bibliothèque** : `Documents partagés` (GUID `c4e3ad56-4f0b-463c-a819-6c334cd86db2`, racine server-relative `/Documents partages` — **sans accent**)
- **Racine fonctionnelle** : `…/Documents partages/Général/2 - OBSERVATOIRE DES EXPERTISES/Veille Agentique Tribe Produit/`

```
/Veille Agentique Tribe Produit
  /00-Comment-ça-marche             ✅  doc d'usage (comment contribuer)
  /01-Matière-brute                 ✅
     /Newsletters-pré-digérées      ✅ (auto)        — sous-dossiers /AAAA-MM/
     /Pipe-Boond                    ✅ (restreint)
     /Notes-PAD-retraitées          ✅ (anonymisée)  — sous-dossiers /AAAA-MM/
     /REX-et-learning-expeditions   🔄 (PDF)
     /Veille-concurrentielle        ✅  captation /AAAA-MM/ · snapshot /AAAA-T#/ (brique pure)
     /Veille-emploi                 ✅  captation /AAAA-MM/ (Cowork) · snapshot /AAAA-T#/
     /Rapports-Emploi               ✅  PDF (APEC, Seyos, Noé, LPC) — grounding du SEUL agent snapshot emploi
     /Rapports-State-of-X           ✅  PDF (+ Eleven Research Lab, Baromètre Produit Wivoo)
  /02-Digests-par-expertise         ✅  ← lieu du croisement (Format B) ; dossiers lisibles par expertise
  /03-Synthèse-Tribe                ⬜  vide
  /04-Convictions-et-offre          ⛔  n'existe pas encore (priorité n°1)
```

## 2. Nommage des fichiers
| Artefact | Nom | Emplacement |
|---|---|---|
| Fiche Format A (newsletter) | `AAAA-MM-JJ_source_hash.md` | `Newsletters-pré-digérées/AAAA-MM/` |
| Fiche concurrentielle (RSS) | `AAAA-MM-JJ_cabinet_slug.md` | `Veille-concurrentielle/AAAA-MM/` |
| Fiche concurrentielle (e-mail) | `AAAA-MM-JJ_slug_HHMMSS.md` | `Veille-concurrentielle/AAAA-MM/` |
| Fiche captation emploi (Cowork) | `AAAA-MM-JJ_slug_HHMMSS.md` *(slug = expertise)* | `Veille-emploi/AAAA-MM/` |
| Synthèse PAD | `Synthese-demande-AAAA-MM.md` | `Notes-PAD-retraitées/AAAA-MM/` |
| Snapshot concurrentiel | `Snapshot-concurrentiel-T#-AAAA.md` | `Veille-concurrentielle/AAAA-T#/` |
| Snapshot emploi | `Snapshot-emploi-[EXP]-T#-AAAA.md` | `Veille-emploi/AAAA-T#/` |
| Digest Format B | `Format-B-[EXP]-AAAA-MM.md` | `02-Digests-par-expertise/<NomLisible>/AAAA-MM/` |
| Gabarits / Index / Specs / Prompts | `Format-…` · `Index-…` · `Spec-…` · `Prompt-…` | — |

- **L'underscore fait foi** pour distinguer une fiche : `AAAA-MM-JJ_source_hash` (fiche) vs `AAAA-MM-JJ - Titre` (post Teams).
- **Sous-dossiers** : mensuels `AAAA-MM/` (Format A, PAD, captation emploi) ; trimestriels `AAAA-T#/` (snapshots). ⚠️ Le sous-dossier trimestriel n'est **pas auto-créé** par `Create file` → `Create new folder` en amont (cf. `Fiche-Transverse-Patterns-Power-Automate`).
- **Inversion dossier/fichier (snapshots)** : dossier `2026-T2`, fichier `…-T2-2026.md` (ordre inverse — d'où les variables `trimestreCourant` vs `trimLabel`).

## 3. Slugs
- **Expertises** : `pm` · `productai` · `productops` · `pmm` · `qa` · `datapm`.
- **Cabinet → expertise (watch-list 12)** : PM `thiga`·`hubvisory`·`wivoo`·`yield` · QA `qestit`·`kp2i`·`smartesting` · Data PM `hymaia`·`converteo`·`artefact` · Product AI `aibuilders`·`eleven`. Statut « source d'axe à confirmer concurrent » : `artefact`·`aibuilders`·`eleven`.

## 4. Sentinelles (jetons de contrôle)
- `[[PAS_DE_FICHE]]` — jeton **seul** : captation (Format A, RSS, e-mail concurrence, captation emploi) = « rien à produire ». **Ne jamais réutiliser ailleurs.**
- `[[FIN_DIGEST]]` — fin d'un digest Format B complet.
- `[[REPORT_TRIMESTRIEL]]` — report Format B (seuil de matière non atteint).
- Gate de complétude d'un snapshot (assembleurs) : présence de la section `## Points de décision`.

## 5. Tags & notation
- **Tags** : `[mode]` (ancrage faible / défaut) · `[tendance]` (mouvement réel + ≥1 corroboration) · `[structurel]` (plusieurs sources indépendantes convergent — **toujours « candidat, validation humaine requise »**). En cas de doute, descendre d'un cran.
  - **Plafond par source emploi** : `alerte d'offres` → `[tendance]` max (1 board → `[mode]`) ; `étude/baromètre` → `[structurel]` candidat permis. **Jamais `[structurel]` sur annonces seules.**
- **Notation de suivi (snapshots, 3 états)** : `✅` mouvement capté (tag + date) · `❌` silence confirmé (cabinet suivi, rien ce trimestre) · `⬜` pas de matière captée. **⬜ ≠ ❌** : `⬜` = défaut agent (rien injecté) ; `❌` = upgrade humain (silence réel).

## 6. Corpus de grounding (PDF)
- **`Rapports-Emploi/`** (APEC, Seyos, Noé, LPC) : grounding passif du **SEUL** agent `Pré-draft Snapshot emploi` (lu en **structuration** ; montants salariaux écartés).
- **`Rapports-State-of-X/`** : prévu pour le Format B — **abandonné pour la V1** (le prompt signale leur absence ; réintroduction possible par injection-texte).
- **`REX-et-learning-expeditions/`** : appui Bloc 1 du Format B (même statut V1).
- ⚠️ **M365 Copilot grounding n'indexe pas le `.md`** — uniquement les PDF. C'est pourquoi toute la matière `.md` est **injectée** par les flux, et seuls les PDF sont en grounding passif.

---

## Renvois
Fait foi : **SPECS §5, §7**. Détail des pièges de dépôt/filtre : `Fiche-Transverse-Patterns-Power-Automate`. Usage / contribution : `00-Comment-ça-marche`.
