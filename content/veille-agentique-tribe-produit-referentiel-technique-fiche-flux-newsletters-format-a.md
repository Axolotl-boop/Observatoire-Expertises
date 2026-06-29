# Fiche module — `Captation / pré-digestion des newsletters` (Format A)

> **Type** : flux Power Automate  ·  **Couche** : 1 (captation)
> **État** : ✅ prod *(prouvé : `2026-06/` peuplé)*
> **Responsable** : Axel (flux) · **Delphine** (flux de captation / abonnements / onboarding)
> **Déclencheur** : Outlook « When a new email arrives (V3) » sur le dossier des newsletters
> **GUID** : `e23cfb09-f05f-4cbe-9054-333004acfefb` · **Agent** : `cr1c3_VeilleTribeDigestcontenu` *(Format A)*
> *Source : export verbatim 24 juin.*

## Rôle
**Point d'entrée unique des newsletters** : capter chaque newsletter reçue, la faire pré-digérer en **fiche Format A** (le digest 5 sections) par l'agent, et la déposer (sauf gate). C'est le **flux de captation le plus durci** (pré-gate de taille + gate de contenu + notification d'erreur).

## Place dans la chaîne
- **Reçoit de** : la boîte de réception newsletters (Delphine gère abonnements + routage).
- **Produit pour** : `Newsletters-pré-digérées/AAAA-MM/AAAA-MM-JJ_source_hash.md` → re-compacté ensuite par `Fiche-Predigest-newsletters` → Block A de `Fiche-Assembleur-Format-B`.

---

## Cœur technique — *FLUX*

### Déclencheur
- Outlook `OnNewEmailV3` (`OpenApiConnectionNotification`) ; `folderPath` = dossier des newsletters (Id encodé) ; `includeAttachments=false`.

### Étapes *(ordre runAfter)*
1. `Initialize_variable` `moisDossier` = `formatDateTime(receivedDateTime, 'yyyy-MM')`.
2. `Html_to_text` (Content Conversion) sur `body/body` de l'e-mail.
3. **`Condition` (pré-gate de taille)** : `length(outputs('Html_to_text')?['body']) > 400` → **True** (sinon : rien — e-mail trop court écarté **avant** l'agent, économise un appel).
   - `Execute_Agent_and_wait` (Copilot `cr1c3_VeilleTribeDigestcontenu`) ; message = consigne « Produis la fiche Format A… » + `from` / `subject` / `Contenu : @{body('Html_to_text')}`.
   - **Si l'agent échoue** (`runAfter: Failed`) → `Send_an_email_(V2)` : notification **`[ERREUR FLUX] Échec agent Copilot`** à `axel.alizier@wefiit.com`.
   - **Si succès** → `Condition_1` (gate) : `contains(lastResponse, '[[PAS_DE_FICHE]]')` → **True** `Terminate` (skip) / sinon → `Create_new_folder` → `Create_file`.

### Sorties
- `Create_file` : folderPath `/Documents partages/…/Newsletters-pré-digérées/@{variables('moisDossier')}` ; **name** `@{formatDateTime(utcNow(),'yyyy-MM-dd')}_@{split(from,'@')[0]}_@{substring(guid(),0,4)}.md` (date de run · part locale de l'expéditeur · hash 4 car.) ; **body** = `@{outputs('Execute_Agent_and_wait')?['body/lastResponse']}` (la fiche Format A).
- `Create_new_folder` (runAfter `Condition_1` Succeeded) ; `Create_file` (run-after-regardless sur le dossier).
- **Gate** : `[[PAS_DE_FICHE]]` → aucune fiche · **pré-gate** : < 400 car. → pas d'appel agent.

### Connecteurs
Outlook (`OnNewEmailV3`, **`SendEmailV2`** pour l'alerte erreur) · Content Conversion (`HtmlToText`) · Copilot Studio (`ExecuteCopilotAsyncV2`) · SharePoint (`CreateNewFolder`, `CreateFile`).

### Config-clé & pièges
- **Pré-gate `>400` + gate `[[PAS_DE_FICHE]]`** : double filtre (taille avant l'agent, contenu après).
- **Notification d'erreur** : seul flux de captation qui **prévient en cas d'échec agent** (ne meurt pas en silence).
- `Create_new_folder` + run-after-regardless (falaise du 1er du mois) — **déjà propre** (prouvé en prod).

---

## Dépendances & renvois
- **Aval** : `Fiche-Agent-Format-A` (produit la fiche) · `Fiche-Predigest-newsletters` (re-compacte) · `Fiche-Assembleur-Format-B` (Block A).
- **Docs fait-foi** : export du flux · invite `cr1c3_VeilleTribeDigestcontenu` · **SPECS §7** (nommage `AAAA-MM-JJ_source_hash`) / **§9**.

## Points d'attention / dette
- **Source de date du nom ≠ du dossier** : le **nom** utilise `utcNow()` (date de **run**) tandis que le **dossier** utilise `receivedDateTime` → une newsletter reçue fin de mois mais traitée le 1er du suivant aurait un nom daté du nouveau mois dans le dossier du mois reçu. Décalage mineur (à uniformiser si gênant).
- **Agent Format A gelé** : ne pas retoucher sans raison (cf. fiche agent).

## Statut — *vérifié export 24 juin*
✓ GUID `e23cfb09…` · ✓ trigger Outlook dossier newsletters · ✓ pré-gate `>400` · ✓ agent `cr1c3_VeilleTribeDigestcontenu` · ✓ gate `[[PAS_DE_FICHE]]` avant dépôt · ✓ notification d'erreur · ✓ nommage `AAAA-MM-JJ_source_hash`.
