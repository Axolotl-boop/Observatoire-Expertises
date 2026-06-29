# Fiche module — `Veille concurrence — Email (alertes + newsletters)`

> **Type** : flux Power Automate  ·  **Couche** : 1 (captation)
> **État** : ✅ prod — **chemin alerte validé** (17 juin) ; **chemin newsletter à valider** au 1er mail
> **Responsable** : Axel  ·  **Déclencheur** : Outlook « When a new email arrives (V3) » sur le dossier `Veille-concurrence`
> **GUID** : `de2b593c-d677-4eb0-bf4e-45d9f19d64b1` · **Agent** : `cr1c3_VeilleconcurrenceCaptation` *(partagé avec les flux RSS)*
> *Source : export verbatim 24 juin.*

## Rôle
**Point d'entrée e-mail unique pour deux canaux** : les **alertes Google** (Canal B, événementiel structurel) et les **newsletters de cabinets** (Canal A). Une règle Outlook serveur route ces e-mails dans le dossier `Veille-concurrence` ; le flux **mappe l'expéditeur/sujet → slug cabinet**, fait pré-digérer par l'agent, et dépose la mini-fiche (sauf gate).

## Place dans la chaîne
- **Reçoit de** : Canal B (`Fiche-Canal-B-Google-Alerts`) + Canal A (newsletters Thiga, Smartesting, Qestit, Converteo, Yield Advisory).
- **Produit pour** : `Veille-concurrentielle/AAAA-MM/AAAA-MM-JJ_slug_HHMMSS.md` → agrégé par `Fiche-Assembleur-Snapshot-concurrentiel`.

---

## Cœur technique — *FLUX*

### Déclencheur
- Outlook `OnNewEmailV3` (`OpenApiConnectionNotification`) ; `folderPath` = dossier **`Veille-concurrence`** (Id encodé) ; `includeAttachments=false` ; `importance=Any`.

### Étapes *(ordre runAfter)*
1. `haystack` (Compose) = `toLower(concat(coalesce(from,''), ' | ', coalesce(subject,'')))` — expéditeur + sujet, minusculés.
2. `ReglesMapping` (Compose) = tableau de **13 règles** `{needle → slug}` (cf. table).
3. `FiltreRegles` (Query) = `ReglesMapping` **where** `contains(outputs('haystack'), item()?['needle'])`.
4. `slug` (Compose) = `if(empty(body('FiltreRegles')), 'inconnu', first(body('FiltreRegles'))?['slug'])` — **garde-fou `inconnu`** si rien ne matche.
5. `monthFolder` = `formatDateTime(receivedDateTime, 'yyyy-MM')`.
6. `fileName` = `concat(formatDateTime(receivedDateTime,'yyyy-MM-dd'), '_', outputs('slug'), '_', formatDateTime(receivedDateTime,'HHmmss'), '.md')` → `AAAA-MM-JJ_slug_HHMMSS.md`.
7. `Html_to_text` : Content = `<p…>@{triggerOutputs()?['body/body']}</p>` (corps de l'e-mail).
8. `Execute_Agent_and_wait` (Copilot `cr1c3_VeilleconcurrenceCaptation`) ; `body/message` = `Cabinet concerné: @{outputs('slug')}\n@{body('Html_to_text')}`.
9. `Condition` : `contains(lastResponse, '[[PAS_DE_FICHE]]')` → **True** `Terminate` (skip) / **False** `Create_new_folder` (run-after-regardless) + `Create_file`.

### Mapping `from`/`subject` → slug *(hybride)*
| needle (dans `haystack`) | slug | Canal |
|---|---|---|
| `thiga` · `hubvisory` · `wivoo` · `qestit` · `kp2i` · `smartesting` · `hymaia` · `converteo` · `artefact` | (idem) | B (alerte, par terme d'objet) |
| `yield advisory` **·** `yieldstudio.fr` | `yield` | B + **A (newsletter, par domaine)** |
| `ai builders` | `aibuilders` | B |
| `eleven strategy` | `eleven` | B |
- **Alertes** = mappées par **terme d'objet** ; **newsletters** = par **domaine** (ex. `yieldstudio.fr`). Pas de match → `inconnu`.

### Sorties
- `Create_file` : folderPath `/Documents partages/…/Veille-concurrentielle/@{outputs('monthFolder')}` ; name `@{outputs('fileName')}` ; **body = `@{outputs('Execute_Agent_and_wait')?['body/lastResponse']}` seul** (≠ RSS, qui préfixe un en-tête de provenance).
- `Create_new_folder` : path relatif lib `Général/…/Veille-concurrentielle/@{outputs('monthFolder')}`.
- **Gate** : `[[PAS_DE_FICHE]]` → aucune fiche.

### Connecteurs
Outlook (`OnNewEmailV3`) · Content Conversion (`HtmlToText`) · Copilot Studio (`ExecuteCopilotAsyncV2`) · SharePoint (`CreateNewFolder`, `CreateFile`).

### Config-clé & pièges *(détail → `Fiche-Transverse-Patterns-Power-Automate`)*
- **Le forward casse le mapping** : transférer un e-mail réécrit l'expéditeur (devient Axel) et préfixe le sujet `TR:` → `haystack` faussé. **Pour tester, glisser-déposer l'e-mail original** dans le dossier, jamais le transférer.
- **`monthFolder`/`fileName` depuis `receivedDateTime`** (même source de date).
- **`Create_new_folder` + run-after-regardless** dans la branche False.

---

## Dépendances & renvois
- **Amont** : `Fiche-Canal-B-Google-Alerts` (alertes) + newsletters Canal A.
- **Aval** : `Fiche-Agent-captation-concurrence` · `Fiche-Assembleur-Snapshot-concurrentiel`.
- **Docs fait-foi** : export du flux · `Spec-flux-veille-concurrentielle` · **SPECS §6** (flux validé côté alerte) **/ §7**.

## Points d'attention / dette
- **Chemin newsletter non encore validé** : confirmer le match par **domaine** au 1er mail de newsletter, et **enrichir la règle Outlook** avec les 5 domaines des newsletters abonnées.
- **Gate robuste à l'homonymie** : validé sur l'alerte AI Builders « nom commun » (skip correct, 0 fiche parasite).
- **`inconnu`** : un e-mail non mappé produit une fiche `…_inconnu_…` (ou un skip si l'agent gate) → surveiller pour repérer un domaine/terme manquant.

## Statut — *vérifié export 24 juin*
✓ GUID `de2b593c…` · ✓ trigger Outlook dossier `Veille-concurrence` · ✓ mapping 13 règles + garde-fou `inconnu` · ✓ agent `cr1c3_VeilleconcurrenceCaptation` · ✓ gate `[[PAS_DE_FICHE]]` · ✓ dépôt = sortie agent seule.
