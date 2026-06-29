# Fiche module — `Veille concurrence — Flux RSS` (×4, mutualisée)

> **Type** : flux Power Automate (4 instances, même gabarit)  ·  **Couche** : 1 (captation)
> **État** : ✅ prod *(bout-en-bout live à valider au 1er billet réel)*
> **Responsable** : Axel  ·  **Déclencheur** : RSS « When a feed item is published » (un flux par cabinet)
> **Agent appelé** : `cr1c3_VeilleconcurrenceCaptation` *(partagé avec le flux e-mail — cf. `Fiche-Agent-captation-concurrence`)*
> *Source : exports verbatim Thiga (`e79b178d…`) + Converteo (`643253cf…`), 24 juin.*

## Rôle
Capter **chaque nouveau billet de blog** d'un cabinet suivi, le faire pré-digérer par l'agent captation en **mini-fiche concurrentielle**, et la déposer (sauf gate). Captation continue (la cadence snapshot/digest est découplée en aval).

## Place dans la chaîne
- **Reçoit de** : le **feed RSS** du cabinet.
- **Produit pour** : `Veille-concurrentielle/AAAA-MM/AAAA-MM-JJ_cabinet_slug.md` → agrégé par `Fiche-Assembleur-Snapshot-concurrentiel`.

## Instances
| Cabinet | `cabinet` (var) | `feedUrl` | Variante |
|---|---|---|---|
| Thiga | `thiga` | `https://www.media.thiga.co/rss.xml` | **standard** |
| Smartesting | `smartesting` | ⟦À COMPLÉTER⟧ | standard *(structure identique à Thiga, confirmé)* |
| Qestit | `qestit` | ⟦À COMPLÉTER⟧ | standard *(idem)* |
| Converteo | `converteo` | `https://converteo.com/blog/feed/` | **+ `HTTP GET`** (cf. ci-dessous) |

*(Yield Advisory n'est **pas** un flux RSS — Canal A newsletter e-mail.)*

---

## Cœur technique — *FLUX*

### Déclencheur
- RSS `OnNewFeed` (connecteur `shared_rss`) ; `feedUrl` = celui du cabinet ; `sinceProperty = PublishDate`.

### Étapes *(gabarit standard — Thiga / Smartesting / Qestit)*
1. `Initialize_variable` `cabinet` = slug (ex. `thiga`).
2. `Compose_monthFolder` = `formatDateTime(triggerOutputs()?['body/publishDate'], 'yyyy-MM')`.
3. `Compose_fileName` = `concat(formatDateTime(publishDate,'yyyy-MM-dd'), '_', variables('cabinet'), '_', last(split(if(endsWith(primaryLink,'/'), substring(primaryLink,0,sub(length(primaryLink),1)), primaryLink), '/')))` → **slug = dernier segment d'URL, trailing-slash retiré**.
4. `Html_to_text` (Content Conversion) : Content = `<p class="editor-paragraph">@{triggerOutputs()?['body/summary']}</p>`.
5. `Execute_Agent_and_wait` (Copilot `cr1c3_VeilleconcurrenceCaptation`) ; `body/message` = `Cabinet concerné: @{variables('cabinet')}\n@{body('Html_to_text')}`.
6. `Condition` : `contains(outputs('Execute_Agent_and_wait')?['body/lastResponse'], '[[PAS_DE_FICHE]]')`
   - **True** → `Terminate` (skip propre — pas de fiche, le billet n'était pas pertinent).
   - **False** → `Create_new_folder` (run-after-regardless) **puis** `Create_file`.

### Variante Converteo *(uniquement)*
Entre l'étape 3 et l'étape 4, une action **`HTTP` (method GET ; uri = `@triggerOutputs()?['body/primaryLink']`)** récupère la page complète ; le `Html_to_text` lit alors **`@{body('HTTP')}`** au lieu de `summary`. **Raison** : le feed RSS de Converteo ne livre qu'un **extrait** (boilerplate WordPress) → on va chercher le contenu réel. (Connecteur HTTP premium, validé.)

### Sorties
- `Create_file` : folderPath `/Documents partages/…/Veille-concurrentielle/@{outputs('Compose_monthFolder')}` ; name `@{outputs('Compose_fileName')}` ; **body = en-tête de provenance** (`# <title>` · `Cabinet : <cabinet> - <primaryLink>` · `Date : <publishDate>`) **+ la mini-fiche produite par l'agent** (`@{outputs('Execute_Agent_and_wait')?['body/lastResponse']}`). *(Le flux e-mail, lui, dépose la sortie agent **seule**, sans en-tête.)*
- `Create_new_folder` : path **relatif lib** `Général/…/Veille-concurrentielle/@{outputs('Compose_monthFolder')}`.
- **Gate** : `[[PAS_DE_FICHE]]` → aucune fiche déposée.

### Connecteurs
RSS (`OnNewFeed`) · *(Converteo)* HTTP premium · Content Conversion (`HtmlToText`) · Copilot Studio (`ExecuteCopilotAsyncV2`) · SharePoint (`CreateNewFolder`, `CreateFile`).

### Config-clé & pièges *(détail → `Fiche-Transverse-Patterns-Power-Automate`)*
- **Trailing-slash durci** dans `Compose_fileName` (sinon slug vide → collision de noms le même jour) — posé sur **les 4** RSS.
- **Expressions pures** (mode-mixte évité) : `formatDateTime(…)` saisi en entier, pas `@{}` autour d'un argument interne.
- **`Create_new_folder` + run-after-regardless** dans la branche **False**, avant `Create_file` (falaise du 1er du mois).
- **Cohérence dossier ↔ fichier** : `monthFolder` et `fileName` tirent de la **même** source de date (`publishDate`).

---

## Dépendances & renvois
- **Aval** : `Fiche-Agent-captation-concurrence` (l'agent qui produit la fiche) · `Fiche-Assembleur-Snapshot-concurrentiel`.
- **Docs fait-foi** : exports des flux · `Spec-flux-veille-concurrentielle` (architecture 3 canaux A/B/C) · **SPECS §7** (nommage) **/ §9** (leçons build).

## Points d'attention / dette
- **Bout-en-bout live non encore validé** sur un billet RSS réel (à faire au 1er billet de chaque feed).
- **Smartesting / Qestit** : structure confirmée identique à Thiga, mais `feedUrl` à consigner (⟦À COMPLÉTER⟧).
- **Doublon RSS × newsletter assumé** (Axel abonné aussi par e-mail) → dédup au jugement **au snapshot** (le hash ne dédup pas inter-sources).

## Statut — *vérifié export 24 juin*
✓ trigger RSS `OnNewFeed` · ✓ agent `cr1c3_VeilleconcurrenceCaptation` · ✓ gate `[[PAS_DE_FICHE]]` → `Terminate` · ✓ trailing-slash durci · ✓ variante Converteo = HTTP GET + `body('HTTP')`.
