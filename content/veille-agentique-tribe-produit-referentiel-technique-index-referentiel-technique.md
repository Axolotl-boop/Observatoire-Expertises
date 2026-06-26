# Index — Référentiel technique du Système de Veille

> **Ce qu'est ce document.** Le point d'entrée du **référentiel technico-fonctionnel** : la cartographie de tous les modules (flux, agents, scripts, corpus) et la table de renvoi vers leur fiche détaillée. Objectif : permettre à un tiers technique de **comprendre et reprendre** le système sans son auteur, et à un nouveau contributeur de **s'orienter**.
>
> **Ce qu'il n'est pas.** Ce n'est ni le journal de reprise (`SPECS-Systeme-Veille.md`, qui porte l'état vivant, les décisions et la dette), ni les specs fonctionnelles (`Format-…`, `Template-…`, `Prompt-…`). Le référentiel **décrit la mécanique stable** et **renvoie** au reste.
>
> **Emplacement proposé** *(à confirmer côté SharePoint)* : dossier `Référentiel-technique/`, voisin de `00-Comment-ça-marche`. Une fiche par module : `Fiche-<module>.md`. Cet index : `Index-Référentiel-technique.md`.
>
> **Maintenance.** Quand la **mécanique** d'un module change → on édite **sa fiche**. Quand l'**état / une décision / la dette** change → ça reste dans le **SPECS** ; la fiche n'en porte qu'un badge grossier + un renvoi. C'est ce qui empêche le référentiel de dériver.

---

## 1. Schéma de flux — de la source au livrable

```
SOURCES EXTERNES                                DONNÉES PROPRIÉTAIRES
newsletters · RSS cabinets · Google Alerts      Boond (pipe) · notes PAD ·
baromètres emploi · rapports State of X         REX / learning expeditions
        │                                                │
        ▼  COUCHE 1 — CAPTATION                          ▼
 [4 flux RSS] [flux e-mail concurrence]           [pipeline Boond]
 [flux Newsletters] [passe Cowork emploi]                │
        │                                                │
        ▼  COUCHE 2 — PRÉ-DIGESTION                       │
 [agent captation concurrence] [agent Format A]          │
   → mini-fiches concurrentielles / fiches Format A      │ → Synthèse-demande (PAD)
        │                                                │
        ▼  COUCHE 3 — BRIQUES PROPRIÉTAIRES              │
 [Assembleur Snapshot concurrentiel] → snapshot concurrentiel (T#)
 [Assembleur Snapshot emploi]        → snapshot emploi (T#, ×6 expertises)
        ▲ grounding passif : Rapports-Emploi (PDF, agent emploi uniquement)
        │
        ▼  COUCHE 4 — FORMAT B  (seul lieu du croisement)
 [Assembleur Format B — mensuel]
   ├─ matière 4-sources : newsletters + PAD + snapshot concurrentiel + snapshot emploi
   ├─ pré-digest newsletters (action AI Builder)
   └─ génération du digest (action AI Builder GPT-4.1)
        ▲ grounding passif : Rapports-State-of-X (PDF)
        │ → Format-B-[EXP]-AAAA-MM.md  (pré-draft, 1 par expertise)
        ▼  COUCHE 5 — VALIDATION & SYNTHÈSE
 KR Owner valide (Grille-validation-Format-B) → décision conviction/offre
                                                 (manuel ; decks 04 ; projet Claude séparé)
```

**Principe d'or rappelé** : le croisement n'a lieu qu'au **Format B** (couche 4). Les snapshots (couche 3) sont des **briques pures** — ils ne croisent pas avec les données internes. Détail → SPECS §1, §2, §6.

---

## 2. Légende des badges d'état

`✅ prod` en production · `🟢 validé` (bout-en-bout, pas encore en récurrence) · `🔵 inactif/gabarit` · `⬜ pas démarré` · `⛔ n'existe pas`

> L'état fin et la dette font foi dans le SPECS (§4 briques, §11 avancement). Ici = badge indicatif.

---

## 3. Inventaire des modules — chaque ligne = une fiche

### Couche 1 — Captation

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| `RSS Thiga` · `RSS Smartesting` · `RSS Qestit` · `RSS Converteo` (+ pré-étape HTTP GET) · `RSS Yield Advisory` | flux PA | ✅ prod (Yield `🔵` gabarit) | Capter les billets de blog cabinets via RSS → mini-fiche concurrentielle | `Fiche-Flux-RSS-concurrence` *(mutualisée : gabarit + table d'instances)* — à venir |
| `Veille concurrence — Email (alertes + newsletters)` | flux PA | ✅ prod *(chemin alerte validé ; newsletter à valider)* | Capter Google Alerts + newsletters cabinets par e-mail → mini-fiche, via mapping from/subject | `Fiche-Flux-Veille-concurrence-Email` — à venir |
| 12 Google Alerts (Canal B) | config (alertes) | ✅ prod | Surveillance « qui bouge » par cabinet ; alimente le flux e-mail | `Fiche-Canal-B-Google-Alerts` *(termes exacts → SPECS §8.1)* — à venir |
| Flux `Newsletters → Format A` | flux PA | ✅ prod *(Delphine)* | Capter les newsletters au point unique → déclenche l'agent Format A | `Fiche-Flux-Newsletters-Format-A` — à venir |
| Passe captation emploi (Cowork, couche-recherche) | passe manuelle | 🟢 validé | 1 fiche `.md`/expertise/mois depuis WTTJ/Indeed/APEC/boards (LinkedIn exclu) ; dépôt via synchro OneDrive | `Fiche-Captation-emploi-Cowork` *(prompt → `Prompt-captation-emploi-Cowork` v1.4)* — à venir |

### Couche 2 — Pré-digestion (agents)

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| Agent captation concurrence (v2) | agent Copilot | ✅ prod | Transformer un billet capté en mini-fiche concurrentielle ; gate `[[PAS_DE_FICHE]]` | `Fiche-Agent-captation-concurrence` — à venir |
| Agent Format A | agent Copilot *(gelé)* | ✅ prod | Pré-digérer 1 newsletter en fiche Format A (sans croisement) ; gate `[[PAS_DE_FICHE]]` | `Fiche-Agent-Format-A` *(mergeable avec la fiche flux Newsletters si mince)* — à venir |

### Couche 3 — Briques propriétaires

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| Pipeline Boond (`moteur-delta-boond` + flux + synthèse) | script Office + flux PA | ✅ prod | CSV mensuel Boond → delta → synthèse anonymisée → `Synthese-demande-AAAA-MM` (Notes-PAD) | `Fiche-Pipeline-Boond` *(couvre Notes-PAD)* — à venir |
| `Assembleur Snapshot concurrentiel` | flux PA | 🟢 validé | Assembler les fiches concurrentielles d'un trimestre → invoque l'agent → snapshot (brique pure) | `Fiche-Assembleur-Snapshot-concurrentiel` — à venir |
| `Pré-draft Snapshot concurrentiel` (v3.1) | agent Copilot | 🟢 validé | Produire le snapshot concurrentiel : ① qui bouge · ② convergence & trou · grid Cabinet×Axe · notation `✅/❌/⬜` | `Fiche-Agent-Snapshot-concurrentiel` — à venir |
| `Assembleur snapshot emploi — trimestriel` | flux PA | 🟢 validé | Fan-out 6 expertises (degree 1, `Do until` retry-jusqu'à-valide) → 6 snapshots emploi | `Fiche-Assembleur-Snapshot-emploi` — à venir |
| `Pré-draft Snapshot emploi` (v3.2, hybride) | agent Copilot | 🟢 validé | Snapshot emploi par expertise : fiches injectées + baromètres groundés ; **salaire hors périmètre** ; table littérale pipe-délimitée | `Fiche-Agent-Snapshot-emploi` — à venir |
| Corpus grounding : `Rapports-Emploi/` (APEC, Seyos, Noé, LPC) · `Rapports-State-of-X/` | corpus PDF | ✅ déposés | Grounding passif : Rapports-Emploi → agent snapshot emploi **seul** ; State of X → Format B | `Fiche-Corpus-grounding` — à venir |

### Couche 4 — Format B (le croisement)

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| `Assembleur Format B — mensuel` | flux PA | 🟢 validé 6/6 *(3 min 06 ; manuel/pinné pour la V1)* | Orchestrer la production mensuelle : matière 4-sources → pré-digest → génération → dépôt ×6 ; sentinels + Switch 3 voies | `Fiche-Assembleur-Format-B` *(inclut la logique matière 4-sources, ex-`Fetch matière Format B`)* — à venir |
| Pré-digest newsletters | action AI Builder | 🟢 validé | Compacter les newsletters du mois en liste de signaux (tags « (à valider) », flags `⚠ poussé par <nom>`, ligne `SIGNAL DOMINANT`) | `Fiche-Predigest-newsletters` — à venir |
| Génération digest Format B (`Prompt-agent-Format-B-Copilot`) | action AI Builder GPT-4.1 | 🟢 validé | Produire le digest d'expertise (4 blocs, croisement) à partir de la matière injectée + grounding State of X | `Fiche-Generation-digest-Format-B` *(prompt → `Prompt-agent-Format-B-Copilot`)* — à venir |

### Couche 5 — Validation & synthèse

| Module | Type | État | Rôle | Renvoi |
|---|---|---|---|---|
| `Grille-validation-Format-B` | checklist (doc) | ✅ en place | Crible KR Owner expertise-agnostique ; intègre le caveat ⚠ vendor-driven | Doc fonctionnel — racine de `02-Digests-par-expertise/` |
| Synthèse Tribe (`03`) · Convictions & offre (`04`) | — | ⬜ / ⛔ | Pas démarré / à initialiser | SPECS §2, §5, §11 |

---

## 4. Frontière fait-foi — qui possède quoi

| Sujet | Fait foi | Rôle du référentiel |
|---|---|---|
| Mécanique d'un module (déclencheur, étapes, expressions, I/O, config-clé) | **le référentiel (fiche)** | **possède** |
| État vivant · décisions & arbitrages · dette · version | `SPECS-Systeme-Veille.md` | renvoie |
| Format de sortie (snapshots, Format B) | `Format-veille-*` · `Template-Digest-par-expertise-v2` | renvoie |
| Anatomie complète d'un prompt | fichier `Prompt-*` | résume + renvoie |
| Usage / comment contribuer | `00-Comment-ça-marche` | renvoie |
| Conventions (slugs, sentinels, nommage, tags) | `SPECS §7` | renvoie + rappelle |

---

## 5. Table de renvoi — « pour telle question → … »

| Question | Où chercher |
|---|---|
| Comment une newsletter devient-elle une fiche ? | `Fiche-Flux-Newsletters-Format-A` + `Fiche-Agent-Format-A` |
| Comment ajouter un cabinet à la veille concurrentielle ? | `00-Comment-ça-marche` + `Fiche-Flux-RSS-concurrence` / `Fiche-Canal-B-Google-Alerts` |
| Où atterrit le snapshot emploi, et comment est-il nommé ? | `Fiche-Assembleur-Snapshot-emploi` (+ nommage → SPECS §7) |
| Pourquoi la génération Format B est-elle sur AI Builder et plus sur Copilot ? | SPECS §6 (décision bloc 5) ; mécanique → `Fiche-Generation-digest-Format-B` |
| Pourquoi le salaire est-il hors périmètre du snapshot emploi ? | SPECS §6 ; application → `Fiche-Agent-Snapshot-emploi` |
| Qu'est-ce que le KR Owner valide, et avec quel crible ? | `Grille-validation-Format-B` |
| Qu'est-ce qui bloque le passage en mode autonome ? | SPECS §6 / §11 (bloc « passage en autonome » au backlog) |
| Que signifie `[[PAS_DE_FICHE]]` / `⬜` vs `❌` / `[structurel]` ? | SPECS §7 (conventions) |
| Comment le snapshot concurrentiel évite-t-il de remonter newsletters/emploi ? | `Fiche-Assembleur-Snapshot-concurrentiel` (filtre par chemin — SPECS §7) |

---

## 6. État du référentiel

Backbone posé (cet index). **Fiches à produire**, dans l'ordre : couche Format B (la plus récente / la plus à risque) → assembleurs & agents snapshot → captation → corpus & transverse. Chaque fiche : pré-remplie depuis le SPECS, complétée par les détails du câblage Power Automate (marqués `⟦À COMPLÉTER⟧` en attendant).
