# Index — Référentiel technique du Système de Veille

> **Ce qu'est ce document.** Le point d'entrée du **référentiel technico-fonctionnel** : la cartographie de tous les modules (flux, agents, scripts, corpus) et la table de renvoi vers leur fiche détaillée. Objectif : permettre à un tiers technique de **comprendre et reprendre** le système sans son auteur, et à un nouveau contributeur de **s'orienter**.
>
> **Ce qu'il n'est pas.** Ce n'est ni le journal de reprise (`SPECS-Systeme-Veille.md`, qui porte l'état vivant, les décisions et la dette), ni les specs fonctionnelles (`Format-…`, `Template-…`, `Prompt-…`). Le référentiel **décrit la mécanique stable** et **renvoie** au reste.
>
> **Emplacement proposé** *(à confirmer côté SharePoint)* : dossier `Référentiel-technique/`, voisin de `00-Comment-ça-marche`. Une fiche par module : `Fiche-<module>.md`. Cet index : `Index-Référentiel-technique.md`.
>
> **Maintenance.** Quand la **mécanique** d'un module change → on édite **sa fiche**. Quand l'**état / une décision / la dette** change → ça reste dans le **SPECS** ; la fiche n'en porte qu'un badge grossier + un renvoi. C'est ce qui empêche le référentiel de dériver.
>
> **État (24 juin) : référentiel COMPLET — 17 fiches + cet index.** Tous les modules sont documentés verbatim (exports `.zip`, prompts, Office Script), **y compris la couche 6 consultation** (dashboard : prototype livré + indexeur à câbler). Reliquats `⟦À COMPLÉTER⟧` mineurs listés en §6.

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
        │
        ▼  COUCHE 6 — CONSULTATION
 [Indexeur deux passes] → dashboard-data.json → [Dashboard HTML]
   ├─ passe 1 : digests .md (contenu des blocs, via [[DASH_JSON]])
   └─ passe 2 : dossiers de captation (statut ok/si des sources)
```

**Principe d'or rappelé** : le croisement n'a lieu qu'au **Format B** (couche 4). Les snapshots (couche 3) sont des **briques pures** — ils ne croisent pas avec les données internes. Détail → SPECS §1, §2, §6.

---

## 2. Légende des badges d'état

`✅ prod` en production · `🟢 validé` (bout-en-bout, pas encore en récurrence) · `🔵 inactif/gabarit` · `⬜ pas démarré` · `⛔ n'existe pas`

> L'état fin et la dette font foi dans le SPECS (§4 briques, §11 avancement). Ici = badge indicatif. **Toutes les fiches ci-dessous sont produites** (sauf mention `⟦À COMPLÉTER⟧`).

---

## 3. Inventaire des modules — chaque ligne = une fiche

### Couche 1 — Captation

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| `RSS Thiga` · `RSS Smartesting` · `RSS Qestit` (standard) · `RSS Converteo` (variante +HTTP GET) | flux PA (×4) | ✅ prod | Capter les billets de blog cabinets via RSS → mini-fiche concurrentielle | **`Fiche-Flux-RSS-concurrence`** *(mutualisée : gabarit + table d'instances ; feedUrls Smartesting/Qestit `⟦À COMPLÉTER⟧`)* |
| `Veille concurrence — Email (alertes + newsletters)` | flux PA | ✅ prod *(chemin alerte validé ; newsletter à valider)* | Capter Google Alerts + newsletters cabinets (dont **Yield Advisory**) par e-mail → mini-fiche, via mapping from/subject → slug | **`Fiche-Flux-Veille-concurrence-Email`** |
| 12 Google Alerts (Canal B) | config (alertes) | ✅ prod | Surveillance « qui bouge » par cabinet ; alimente le flux e-mail | **`Fiche-Canal-B-Google-Alerts`** |
| Flux `Newsletters → Format A` | flux PA | ✅ prod *(Axel ; captation : Delphine)* | Capter les newsletters au point unique (pré-gate >400 + notif erreur) → agent Format A | **`Fiche-Flux-Newsletters-Format-A`** |
| Passe captation emploi (Cowork, couche-recherche) | passe manuelle | 🟢 validé | 1 fiche `.md`/expertise/mois depuis WTTJ/Indeed/APEC/boards (LinkedIn exclu) ; dépôt via synchro OneDrive | **`Fiche-Captation-emploi-Cowork`** *(prompt → `Prompt-captation-emploi-Cowork` v1.4)* |

### Couche 2 — Pré-digestion (agents)

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| Agent captation concurrence (`cr1c3_VeilleconcurrenceCaptation`) | agent Copilot | ✅ prod | Transformer un billet/alerte capté en mini-fiche concurrentielle ; posture vs pédagogie ; gate `[[PAS_DE_FICHE]]` | **`Fiche-Agent-captation-concurrence`** |
| Agent Format A (`cr1c3_VeilleTribeDigestcontenu`) | agent Copilot *(gelé)* | ✅ prod | Pré-digérer 1 newsletter en fiche Format A 5 sections (sans croisement) ; gate `[[PAS_DE_FICHE]]` | **`Fiche-Agent-Format-A`** |

### Couche 3 — Briques propriétaires

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| Pipeline Boond (`moteur-delta-boond` + flux + synthèse) | Office Script + flux PA + agent | ✅ prod | CSV mensuel Boond → delta → **anonymisation** → `Synthese-demande-AAAA-MM` (Notes-PAD) + delta JSON restreint | **`Fiche-Pipeline-Boond`** *(couvre Notes-PAD ; invite `cr1c3_SynthsedemandeBoond` `⟦À COMPLÉTER⟧`)* |
| `Assembleur Snapshot concurrentiel` | flux PA | 🟢 validé | Assembler les fiches concurrentielles d'un trimestre → invoque l'agent → snapshot (brique pure) | **`Fiche-Assembleur-Snapshot-concurrentiel`** |
| `Pré-draft Snapshot concurrentiel` (v3.1) | agent Copilot | 🟢 validé | Snapshot concurrentiel : ① qui bouge · ② convergence & trou · grid Cabinet×Axe · notation `✅/❌/⬜` | **`Fiche-Agent-Snapshot-concurrentiel`** |
| `Assembleur snapshot emploi — trimestriel` | flux PA | 🟢 validé | Fan-out 6 expertises (degree 1, `Do until` + `Condition` incomplet) → 6 snapshots emploi | **`Fiche-Assembleur-Snapshot-emploi`** |
| `Pré-draft Snapshot emploi` (v3.2, hybride grounded) | agent Copilot | 🟢 validé | Snapshot emploi par expertise : fiches injectées + baromètres groundés ; **salaire hors périmètre** ; table littérale pipe-délimitée | **`Fiche-Agent-Snapshot-emploi`** |

### Couche 4 — Format B (le croisement)

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| `Assembleur Format B — mensuel` | flux PA | 🟢 validé 6/6 *(3 min 06 ; trigger Recurrence activé, `mois` pinné pour la V1)* | Orchestrer la production mensuelle : matière 4-sources → pré-digest → génération → dépôt ×6 ; sentinels + Switch 3 voies | **`Fiche-Assembleur-Format-B`** |
| Pré-digest newsletters | action AI Builder | 🟢 validé | Compacter les newsletters du mois en liste de signaux (tags « (à valider) », flags `⚠ poussé par <nom>`, ligne `SIGNAL DOMINANT`) | **`Fiche-Predigest-newsletters`** *(texte d'invite `⟦À COMPLÉTER⟧`)* |
| Génération digest Format B (`Prompt-agent-Format-B-Copilot`) | action AI Builder GPT-4.1 | 🟢 validé | Produire le digest d'expertise (4 blocs, croisement) à partir de la matière injectée + grounding State of X | **`Fiche-Generation-digest-Format-B`** *(prompt → `Prompt-agent-Format-B-Copilot`)* |

### Couche 5 — Validation & synthèse

| Module | Type | État | Rôle | Renvoi |
|---|---|---|---|---|
| `Grille-validation-Format-B` | checklist (doc) | ✅ en place | Crible KR Owner expertise-agnostique ; intègre le caveat ⚠ vendor-driven | Doc fonctionnel — racine de `02-Digests-par-expertise/` |
| Synthèse Tribe (`03`) · Convictions & offre (`04`) | — | ⬜ / ⛔ | Pas démarré / à initialiser | SPECS §2, §5, §11 |

### Couche 6 — Consultation

| Module | Type | État | Rôle | Fiche |
|---|---|---|---|---|
| Dashboard de consultation (`dashboard-veille-tribe.html` + indexeur deux passes) | HTML autonome + flux PA | 🔵 prototype livré · indexeur non câblé | Restituer les digests Format B (4 blocs déroulables, 6 expertises) + statut des sources `ok/si` ; consomme `dashboard-data.json` produit par l'indexeur (passe digest via `[[DASH_JSON]]` + passe captation) | **`Fiche-Dashboard-consultation`** *(indexeur + fragment `[[DASH_JSON]]` `⟦À COMPLÉTER⟧` ; contrat → `Contrat-dashboard-data`)* |

### Transverse — référence (pas des modules)

| Sujet | Rôle | Fiche |
|---|---|---|
| Arborescence SharePoint · nommage · slugs · sentinelles · tags · notation · corpus de grounding | La carte « où vivent les choses et comment on les nomme » (rappel lisible de SPECS §5/§7) | **`Fiche-Transverse-Reference`** |
| Pièges & patterns Power Automate | Les pièges récurrents consolidés, réutilisables sur tout flux (consolide SPECS §9) | **`Fiche-Transverse-Patterns-Power-Automate`** |

---

## 4. Frontière fait-foi — qui possède quoi

| Sujet | Fait foi | Rôle du référentiel |
|---|---|---|
| Mécanique d'un module (déclencheur, étapes, expressions, I/O, config-clé) | **le référentiel (fiche)** | **possède** |
| État vivant · décisions & arbitrages · dette · version | `SPECS-Systeme-Veille.md` | renvoie |
| Format de sortie (snapshots, Format B) | `Format-veille-*` · `Template-Digest-par-expertise-v2` | renvoie |
| Anatomie complète d'un prompt | fichier `Prompt-*` / l'invite Copilot | résume + renvoie |
| Usage / comment contribuer | `00-Comment-ça-marche` | renvoie |
| Conventions & arborescence (slugs, sentinels, nommage, tags, arbo) | `SPECS §5/§7` | **rappelle** (`Fiche-Transverse-Reference`) |
| Pièges Power Automate (provenance des leçons) | `SPECS §9` | **consolide** (`Fiche-Transverse-Patterns-Power-Automate`) |

---

## 5. Table de renvoi — « pour telle question → … »

| Question | Où chercher |
|---|---|
| Comment une newsletter devient-elle une fiche ? | `Fiche-Flux-Newsletters-Format-A` + `Fiche-Agent-Format-A` |
| Comment ajouter un cabinet à la veille concurrentielle ? | `00-Comment-ça-marche` + `Fiche-Flux-RSS-concurrence` / `Fiche-Canal-B-Google-Alerts` / `Fiche-Flux-Veille-concurrence-Email` |
| Pourquoi le flux Converteo a-t-il un HTTP GET en plus ? | `Fiche-Flux-RSS-concurrence` (variante : feed = extrait seul) |
| Où atterrit le snapshot emploi, et comment est-il nommé ? | `Fiche-Assembleur-Snapshot-emploi` (+ nommage → `Fiche-Transverse-Reference` / SPECS §7) |
| Pourquoi la génération Format B est-elle sur AI Builder et plus sur Copilot ? | SPECS §6 (décision bloc 5) ; mécanique → `Fiche-Generation-digest-Format-B` |
| Pourquoi le salaire est-il hors périmètre du snapshot emploi ? | SPECS §6 ; application → `Fiche-Agent-Snapshot-emploi` |
| Comment les données Boond sont-elles anonymisées ? | `Fiche-Pipeline-Boond` (frontière `removeProperty(…,'delta')`) |
| Qu'est-ce que le KR Owner valide, et avec quel crible ? | `Grille-validation-Format-B` |
| Qu'est-ce qui bloque le passage en mode autonome ? | SPECS §6 / §11 (bloc « passage en autonome » au backlog) |
| Que signifie `[[PAS_DE_FICHE]]` / `⬜` vs `❌` / `[structurel]` ? | `Fiche-Transverse-Reference` §4-5 (canonique → SPECS §7) |
| Un flux « réussit » mais ne produit rien — par où commencer ? | `Fiche-Transverse-Patterns-Power-Automate` (Include Nested Items, lire la sortie) |
| Comment le snapshot concurrentiel évite-t-il de remonter newsletters/emploi ? | `Fiche-Assembleur-Snapshot-concurrentiel` (filtre par `{Path}`) |
| Comment le dashboard est-il alimenté, et pourquoi deux passes ? | `Fiche-Dashboard-consultation` + `Contrat-dashboard-data` (statut sources ≠ digest) |
| Pourquoi le statut capté/silence ne sort-il pas du digest ? | `Contrat-dashboard-data` §3 (passe captation déterministe) ; SPECS §6 |

---

## 6. État du référentiel

**Complet** : 17 fiches + cet index couvrent toute la chaîne (captation newsletters / concurrence RSS+e-mail+Canal B / emploi Cowork · pré-digestion · briques snapshot · Format B · Boond · consultation dashboard · transverse). Chaque fiche de flux/agent est **verbatim** (criblée depuis l'export `.zip`, l'invite Copilot/AI Builder, ou le code Office Script) — **sauf la couche 6 consultation**, dont l'indexeur n'est pas encore construit (prototype + contrat documentés, indexeur en `⟦À COMPLÉTER⟧`).

**Reliquats `⟦À COMPLÉTER⟧`** (non bloquants) :
- Texte de l'invite **Pré-digest newsletters** (action AI Builder).
- Texte de l'invite **`cr1c3_SynthsedemandeBoond`** (agent de synthèse Boond).
- **feedUrls** Smartesting & Qestit (RSS — structure confirmée identique à Thiga).
- Hygiène : confronter l'invite **live** `Pré-draft Format B` au fichier projet `Prompt-agent-Format-B-Copilot`.
- **Dashboard** : fragment de prompt `[[DASH_JSON]]` (à capturer après le run PM) + **anatomie de l'indexeur** Power Automate deux passes (à documenter au câblage).

**Trouvailles de la passe de documentation à reporter au SPECS/dette** :
- Message Teams résiduel « Snapshot concurrentiel… » hérité par l'assembleur **emploi** et le **Format B** (origine = assembleur concurrentiel, où il est correct).
- Assembleur **concurrentiel** sans garde « incomplet » (≠ emploi qui en a une).
- Ping d'incomplétude emploi : chaîne littérale `snapshot <slug> incomplet` (slug non interpolé).
- Format B : récurrence **activée** × `mois` pinné `2026-06` → risque de réécriture/redépense (décision désactivation côté Axel).
- Boond : `delta-boond-*.json` écrit dans le dossier-trigger `Pipe-Boond` → auto-redéclenchement à confirmer (auto-limité par le curseur).
