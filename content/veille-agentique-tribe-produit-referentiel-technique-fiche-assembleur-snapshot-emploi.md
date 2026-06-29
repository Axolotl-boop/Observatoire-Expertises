# Fiche module — `Assembleur Snapshot emploi` (trimestriel)

> **Type** : flux Power Automate  ·  **Couche** : 3 (brique pure)
> **État** : 🟢 validé 6/6 sur réel T2 · **AUTONOME (v4.5)** : Récurrence + dates dynamiques *(garde INCOMPLET déjà native ; détail → SPECS §6, §9)*
> **Responsable** : Axel  ·  **Cadence / déclencheur** : trimestriel — **`Recurrence`** (Month/3, time zone Paris, Start time `2026-10-01T03:00:00Z` → 1er run autonome = **T3**) ; trimestre **calculé** (plus de pin)
> **GUID** : `9c99a865-8037-4cce-9d96-09a809548a59` · bibliothèque `c4e3ad56…` (`/Documents partages`, site TribeExpertises)
> *Source : export verbatim 24 juin. Jumeau de l'assembleur concurrentiel + un **fan-out par expertise**.*

## Rôle
Agréger, **par expertise**, les fiches de captation emploi d'un trimestre et les passer à l'agent `Pré-draft Snapshot emploi` → produire **6 snapshots emploi** (un par expertise). Brique **pure** (aucun croisement).

## Place dans la chaîne
- **Reçoit de** : `Veille-emploi/AAAA-MM/` (fiches Cowork des 3 mois — cf. `Fiche-Captation-emploi-Cowork`).
- **Produit pour** : `Veille-emploi/AAAA-T#/Snapshot-emploi-<slug>-T#-AAAA.md` → consommé par le Block D de l'`Assembleur Format B`.

---

## Cœur technique — *FLUX*

### Déclencheur & variables
- **Déclencheur** : `Recurrence` — **Frequency = Month · Interval = 3** · Time zone Paris · **Start time `2026-10-01T03:00:00Z`** (Month/3 préserve le jour 01 ; 1er run = T3, 3h avant le Format B).
- **Variables (init, dates DYNAMIQUES — trimestre clos auto)** : helper **`moisQ1`** (Integer) = `add(mul(div(sub(int(formatDateTime(addToTime(utcNow(),-1,'Month'),'MM')),1),3),3),1)` · `annee` = `formatDateTime(addToTime(utcNow(),-1,'Month'),'yyyy')` · `libelleTrim` = `concat('T',string(div(add(variables('moisQ1'),2),3)))` · `moisA/B/C` = `concat(variables('annee'),'-',pad2(moisQ1[+0/+1/+2]))`, pad2(n)=`if(less(n,10),concat('0',string(n)),string(n))` · `expertises=["pm","productai","productops","pmm","qa","datapm"]` (inchangé) · `matiere=null` · `snapshotText=null`. Ancre `utcNow()−1 mois`. **Plus aucun pin à éditer.**

### Étapes *(ordre runAfter)*
1. `Get_files_(properties_only)` (SP `GetFileItems` ; toute la bibliothèque ; `RecursiveAll`).
2. `Create_new_folder` **hors boucle, une fois** (path lib-relative `/Général/…/Veille-emploi/@{annee}-@{libelleTrim}`).
3. **`Boucle_expertise`** (`Foreach` sur `expertises`, **degree 1**) :
   - `Set_variable` `matiere=""` (reset).
   - `Filter_array` : `and(contains({Path},'Veille-emploi'), contains({FilenameWithExtension}, concat('_', items('Boucle_expertise'), '_')), or(startsWith(name,moisA|B|C)))`.
   - `Apply_to_each` (interne) { `Get_file_content_1` (id=`items('Apply_to_each')?['{Identifier}']`) → `Append_to_string_variable_1` `matiere` += `===== {Filename} =====\n{content}` }.
   - `Set_variable_1` `snapshotText=""`.
   - **`Do_until`** { `Execute_Agent_and_wait` → `Set_variable_2` `snapshotText`=`outputs('Execute_Agent_and_wait')?['body/lastResponse']` } **until** `equals(contains(snapshotText,'## Points de décision'),true)` · Count 8 · PT30M.
   - **`Condition`** `contains(snapshotText,'## Points de décision')` :
     - **True** → `Create_file` (name `Snapshot-emploi-<slug>-@{libelleTrim}-@{annee}.md` ; body `snapshotText`).
     - **False** → `Create_file_1` (même nom ; body `⚠️ INCOMPLET après 8 essais\n\n` + `snapshotText`) **+** `Post_a_message_to_myself_1` (Teams DM).
4. `Post_a_message_to_myself` (Teams DM, après la boucle).

### Agent invoqué
- `Execute_Agent_and_wait` = `OpenApiConnectionWebhook` ; Copilot Studio (`ExecuteCopilotAsyncV2`) ; `Copilot` = **`cr1c3_PrdraftSnapshotemploi`** ; `body/message` = `variables('matiere')` ; sortie `body/lastResponse`. → `Fiche-Agent-Snapshot-emploi`.

### Connecteurs
SharePoint (`GetFileItems`, `GetFileContent`, `CreateNewFolder`, `CreateFile`) · Copilot Studio (`ExecuteCopilotAsyncV2`) · Teams (`PostMessageToSelf` ×2).

### Config-clé & pièges *(détail → `Fiche-Transverse-Patterns-Power-Automate`)*
`RecursiveAll` · `degree 1` + reset `matiere`/`snapshotText` en tête d'itération (anti-bleed) · filtre **`_<slug>_`** (underscores des deux côtés) + scope `{Path}` · item courant par expression · `Create new folder` une fois hors boucle · câblage 2 variables · `Do until` + `Condition` (filet **complet** : l'échec écrit « INCOMPLET » et **crie**).

---

## Dépendances & renvois
- **Amont** : `Fiche-Captation-emploi-Cowork`.
- **Aval** : Block D de `Fiche-Assembleur-Format-B`.
- **Docs fait-foi** : `Format-veille-emploi` (v2.1, format) · agent `cr1c3_PrdraftSnapshotemploi` v3.2 · **SPECS §6/§9**.

## Points d'attention / dette
- ⚠️ **Message Teams de fin DRIFTE (promu cosmétique → bloquant avant le 1er run autonome)** : `Post_a_message_to_myself` poste « **Snapshot concurrentiel** T2 2026… » — double faute héritée du clone (le mot « concurrentiel » **et** le littéral « T2 2026 »). Avec les dates dynamiques (v4.5), le « T2 2026 » devient **faux dès T3**. À réécrire : « Snapshot emploi `@{variables('libelleTrim')} @{variables('annee')}` déposé… ».
- ⬜ **Ping d'incomplétude non interpolé** : `Post_a_message_to_myself_1` contient la chaîne **littérale** « snapshot \<slug\> incomplet ». Cosmétique → `concat('snapshot ', items('Boucle_expertise'), ' incomplet')`.
- ✅ **Pin de trimestre supprimé (v4.5)** : `moisA/B/C`, `libelleTrim`, `annee` calculés sur `utcNow() − 1 mois`. Plus d'édition manuelle.
- **Amont MANUEL (à surveiller en autonome)** : la captation emploi est une **passe Cowork manuelle** par expertise/mois → s'assurer que les fiches du trimestre sont déposées **avant** le run du 1er du mois, sinon l'assembleur tourne sur matière partielle (la garde INCOMPLET ne couvre que l'échec agent, pas l'absence de matière en amont).

## Statut — *vérifié export 24 juin · MAJ v4.5 (récurrence + dates)*
✓ GUID `9c99a865…` · ✓ trigger **`Recurrence`** Month/3 Start `2026-10-01T03:00:00Z` · ✓ variables **dynamiques** (`moisQ1` + calculées ; `expertises` inchangé) · ✓ fan-out 6 degree 1 · ✓ agent `cr1c3_PrdraftSnapshotemploi` · ✓ gate `## Points de décision` + `Condition` incomplet · ✓ sortie `Snapshot-emploi-<slug>-T#-AAAA.md`. ⬜ libellés Teams à dé-driver.
