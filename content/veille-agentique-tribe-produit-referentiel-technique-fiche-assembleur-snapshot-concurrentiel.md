# Fiche module — `Assembleur Snapshot concurrentiel` (trimestriel)

> **Type** : flux Power Automate  ·  **Couche** : 3 (brique pure)
> **État** : 🟢 validé (run réel 4 fiches juin) · **AUTONOME (v4.5)** : Récurrence + dates dynamiques + garde INCOMPLET posée *(détail → SPECS §6, §9)*
> **Responsable** : Axel  ·  **Cadence / déclencheur** : trimestriel — **`Recurrence`** (Month/3, time zone Paris, Start time `2026-10-01T03:00:00Z` → 1er run autonome = **T3**, 3h avant le Format B) ; trimestre **calculé** (plus de pin)
> **GUID** : `daf95d47-5472-43d3-ad2b-49b0311acbf5` · bibliothèque `c4e3ad56…` (`/Documents partages`, site TribeExpertises)
> *Source : export verbatim 24 juin.*

## Rôle
Agréger les fiches concurrentielles d'un **trimestre** et les passer à l'agent `Pré-draft Snapshot concurrentiel` → produire **un snapshot concurrentiel** (brique **pure** : croise les canaux concurrentiels entre eux, par axe ; **ne croise pas** avec les données internes — ça, c'est le Format B).

## Place dans la chaîne
- **Reçoit de** : `Veille-concurrentielle/AAAA-MM/` (fiches RSS + e-mail des 3 mois du trimestre).
- **Produit pour** : `Veille-concurrentielle/AAAA-T#/Snapshot-concurrentiel-T#-AAAA.md` → consommé par le Block C de l'`Assembleur Format B`.

---

## Cœur technique — *FLUX*

### Déclencheur & variables
- **Déclencheur** : `Recurrence` — **Frequency = Month · Interval = 3** · Time zone Paris · **Start time `2026-10-01T03:00:00Z`**. La version PA n'expose ni « on day of month » ni « at these hours » → Start time futur = seule ancre (Month/3 préserve le jour 01). 1er run = 2026-10-01 → produit **T3** (le Format B lit le T2 existant de juil. à sept., ne réclame un T3 frais qu'au 1er octobre).
- **Variables (init, dates DYNAMIQUES — trimestre clos auto-calculé)** : helper **`moisQ1`** (Integer, 1er mois du trimestre clos) = `add(mul(div(sub(int(formatDateTime(addToTime(utcNow(),-1,'Month'),'MM')),1),3),3),1)` · `annee` = `formatDateTime(addToTime(utcNow(),-1,'Month'),'yyyy')` · `libelleTrim` = `concat('T',string(div(add(variables('moisQ1'),2),3)))` · `moisA/B/C` = `concat(variables('annee'),'-',pad2(moisQ1[+0/+1/+2]))` où pad2(n) = `if(less(n,10),concat('0',string(n)),string(n))` · `matiere=null` · `snapshotText=null`. Ancre = `utcNow() − 1 mois` (retombe dans le dernier mois du trimestre clos ; gère le passage d'année — sur un run du 1er janvier, `annee` reste l'année précédente). **Plus aucun pin à éditer.**

### Étapes *(ordre runAfter)*
1. `Get_files_(properties_only)` (SP `GetFileItems` ; **toute la bibliothèque** ; `viewScopeOption=RecursiveAll`).
2. `Filter_array` : `and(contains({Path},'Veille-concurrentielle'), contains({FilenameWithExtension},'_'), or(startsWith(name,moisA), startsWith(name,moisB), startsWith(name,moisC)))`.
3. `Apply_to_each` (degree 1) { `Get_file_content` (id=`items('Apply_to_each')?['{Identifier}']`) → `Append_to_string_variable` `matiere` += `===== @{…['{FilenameWithExtension}']} =====\n@{body('Get_file_content')}` }.
4. **`Do_until`** { `Execute_Agent_and_wait` → `Set_variable` `snapshotText`=`outputs('Execute_Agent_and_wait')?['body/lastResponse']` } **until** `contains(variables('snapshotText'),'## Points de décision')` · Count 8 · PT30M.
5. `Create_new_folder` (path **relatif lib** `/Général/…/Veille-concurrentielle/@{annee}-@{libelleTrim}`) — **inconditionnel** (le dossier doit exister sur les deux branches).
6. **`Condition`** `contains(variables('snapshotText'),'## Points de décision')` — **même prédicat que le `Do until`** (filet aligné sur le pattern emploi, v4.5) :
   - **True** → `Create_file` (folderPath via sélecteur 📁 ; name `Snapshot-concurrentiel-@{libelleTrim}-@{annee}.md` ; body `@variables('snapshotText')`) **+** `Post_a_message_to_myself` (Teams DM succès — **dans la branche True**, ne part donc plus sur un dépôt tronqué).
   - **False** → `Create_file_1` (**même name**, body = `⚠️ INCOMPLET après 8 essais` + 2 sauts de ligne + `snapshotText`) **+** `Post_a_message_to_myself_1` (cri Teams interpolé `@{variables('libelleTrim')} @{variables('annee')}`).

### Agent invoqué
- `Execute_Agent_and_wait` = `OpenApiConnectionWebhook` ; connecteur **Copilot Studio** (`shared_microsoftcopilotstudio`, `ExecuteCopilotAsyncV2`) ; paramètre `Copilot` = **`cr1c3_PrdraftSnapshotconcurrentiel`** ; `body/message` = `variables('matiere')`. Sortie lue via `body/lastResponse`. → `Fiche-Agent-Snapshot-concurrentiel`.

### Connecteurs
SharePoint (`GetFileItems`, `GetFileContent`, `CreateNewFolder`, `CreateFile`) · Copilot Studio (`ExecuteCopilotAsyncV2`) · Teams (`PostMessageToSelf`).

### Config-clé & pièges *(détail → `Fiche-Transverse-Patterns-Power-Automate`)*
`RecursiveAll` obligatoire · filtre scopé `{Path}` · item courant par expression · `Create new folder` + run-after avant `Create file` · câblage 2 variables (`matiere` ≠ `snapshotText`) · `Do until` filet anti-non-déterminisme (gate = `## Points de décision`).

---

## Dépendances & renvois
- **Amont** : captation concurrentielle (`Fiche-Flux-RSS-concurrence`, `Fiche-Flux-Veille-concurrence-Email`).
- **Aval** : Block C de `Fiche-Assembleur-Format-B`.
- **Docs fait-foi** : `Format-veille-concurrentielle-v3` (format) · agent `cr1c3_PrdraftSnapshotconcurrentiel` v3.1 · **SPECS §6/§9**.

## Points d'attention / dette
- ✅ **Garde « incomplet » POSÉE (v4.5).** `Condition` après le `Do until` (même prédicat) → branche False écrit le snapshot préfixé « ⚠️ INCOMPLET » + crie en Teams. Parité avec l'emploi atteinte (et même légèrement meilleure : le ping de **succès** est dans la branche True, donc ne part pas sur un dépôt tronqué — backport trivial possible vers l'emploi, micro-dette).
- ✅ **Pin de trimestre supprimé (v4.5)** : les 5 variables sont calculées sur `utcNow() − 1 mois`. Plus d'édition manuelle par trimestre.
- ⬜ **Vérifier le libellé du Teams de SUCCÈS** : s'il porte un littéral « T2 2026 » au lieu de `@{variables('libelleTrim')} @{variables('annee')}`, il **dérive dès T3** (run du 1er octobre) — passé cosmétique, devenu **drift** avec les dates dynamiques. À corriger avant le 1er run autonome.
- **Non-déterminisme de l'agent** : le `Do until` garantit la complétude, pas le **nombre d'axes** (1 vs 2) → check à la validation humaine (plus de regard manuel en autonome — surveiller le 1er run).
- **Amont manuel** : la captation concurrentielle est automatisée (RSS + e-mail), mais s'assurer que les fiches du trimestre sont bien déposées avant le run du 1er du mois.

## Statut — *vérifié export 24 juin · MAJ v4.5 (récurrence + dates + garde)*
✓ GUID `daf95d47…` · ✓ trigger **`Recurrence`** Month/3 Start `2026-10-01T03:00:00Z` · ✓ variables **dynamiques** (`moisQ1` + 5 calculées) · ✓ agent `cr1c3_PrdraftSnapshotconcurrentiel` · ✓ gate `## Points de décision` Count 8 · ✓ **`Condition` garde INCOMPLET (6/6 checks)** · ✓ sortie `Snapshot-concurrentiel-T#-AAAA.md`.
