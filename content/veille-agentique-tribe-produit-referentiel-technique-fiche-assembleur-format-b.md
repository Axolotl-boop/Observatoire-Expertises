# Fiche module — `Assembleur Format B — mensuel`

> **Type** : flux Power Automate  ·  **Couche** : 4 (Format B — le croisement)
> **État** : 🟢 validé 6/6 (3 min 06) — **V1 = supervisée / `mois` pinné** *(détail & dette → SPECS §6 bloc 6, §11)*
> **Responsable** : Axel  ·  **Cadence / déclencheur** : `Recurrence` (Month, Interval 1) — *Start time + Time zone non renseignés*
> **Identifiants** : flow GUID `4715ca97-39c6-4dbe-b8e1-c1066e1b3a65` · bibliothèque GUID `c4e3ad56-4f0b-463c-a819-6c334cd86db2` (racine `/Documents partages`)
> *Source de cette fiche : export `.zip` du flux (definition.json) du 24 juin — tout est vérifié verbatim, sauf l'état ON/OFF (hors définition).*
> **MAJ v4.8 (28 juin)** : générateur passé en **v3** (recordId `488d2b6e…` inchangé, corps `corps-format-B-v3.txt`) ; **Block R — fetch registres convictions** ajouté par expertise dans `Boucle_expertise` (avant Block D). Cf. § Cœur technique (étapes B) + Config-clé, et `Fiche-Generation-digest-Format-B`. Trigger/`mois` = état v4.1 (dépiné, Récurrence `2026-07-01`).
> **MAJ v5.1 (28 juin) — REFONTE LEAN : ANNOTATEUR RETIRÉ DU FLUX.** Dans le case `digest` du Switch `Router_sortie` : **l'action `Annoter_digest` est SUPPRIMÉE** et l'étape de concat retirée. **`Ecrire_digest`** écrit désormais **directement** la sortie du générateur : body = `replace(variables('snapshotText'), '[[FIN_DIGEST]]', '')` (plus de `coalesce`/`concat`, plus de filet annotateur), runAfter = **entrée du case** (`Ecrire_digest` est seule dans le case). Le digest déposé est le **digest lean nu** (en-tête + 4 blocs + signaux du mois), **sans Légende / couche de confiance / chips / cartes**. Le générateur `Pré-draft_Format_B` (recordId `488d2b6e…`) porte le **corps lean** `corps-generateur-digest-lean.txt` (cf. `Fiche-Generation-digest-Format-B`). **INCHANGÉS** : `Do until` + sentinelle `[[FIN_DIGEST]]`, **Block R** (registres) + re-parentage Block D, **gardes source-absente B/C/D**, State of X recâblé non gardé (durcissement lot octobre). Le case `report` devient **mort** (le générateur lean n'émet plus `[[REPORT_TRIMESTRIEL]]`) → inerte, laissé ; le case `incomplet` reste (filet 8-essais). **Validé 2 runs réels pinnés 2026-06** (gate vert). La MAJ v5.0 ci-dessous est SUPERSÉDÉE sur le point « annotateur déployé » (l'annotateur n'existe plus) ; le reste (gardes B/C/D, State of X, variables/flux armé) reste valide.

> **MAJ v5.0 (28 juin) — RE-VÉRIFIÉ SUR EXPORT FRAIS (`…20260628…`).** **(1) Annotateur v1.6 DÉPLOYÉ** (`Annoter_digest`, recordId inchangé) + **Block D & Block R CONFIRMÉS EN EXÉCUTION RÉELLE** sur run pinné 2026-06 (emploi 6/6, registres pm/datapm/qa remplis / pmm/productai/productops repli propre). **(2) GARDE-FOU SOURCE-ABSENTE = CÂBLÉ B/C/D** (PAD sentinelle ; **Block C via `Condition length(body('Filtrer_snapshot_concurrentiel'))>0`** — supprime le risque `first()` null ; Block D via catch `Failed/Skipped` + reconvergence `Set_variable_1`) — **les mentions « NON câblé » ci-dessous (export 24 juin) sont PÉRIMÉES** (l'état v4.1 était déjà câblé). **(3) FAIT NEUF — State of X RECÂBLÉ dans `matiereCommune`** : `Lire_state_of_x` + `Empiler_state_of_x` (après la `Condition` concurrentiel, avant `Boucle_expertise`) — **≠ « abandonné V1 »** — **et NON GARDÉ** (`Empiler_state_of_x` runAfter `Succeeded` seul) → **SPOF avant la boucle** (404 ⇒ les 6 digests tombent). Risque 1er juillet nul (fichier présent) ; durcissement = catch `Failed/Skipped` → sentinelle (miroir Block C/D), **lot octobre**. **(4) Variables dépinées + flux ARMÉ** (Récurrence Month/1 `2026-07-01T06:00:00Z`, tz Romance Standard Time, ON). *Détail → SPECS v5.0 (note de session + §11).*

## Rôle
Industrialiser la production du Format B : une fois par cycle, assembler les 4 sources (newsletters du mois + synthèse PAD + snapshot concurrentiel + snapshot emploi), les injecter expertise par expertise dans le moteur de génération, et déposer **6 digests pré-draftés** (1 par expertise) en `02-Digests-par-expertise/`. Le flux **pilote** le moteur (il ne lui répond plus). Garde-fou cardinal intact : la sortie est un **brouillon**, validé par le KR Owner ; la machine ne met jamais à jour les decks `04`.

## Place dans la chaîne
- **Reçoit de** : fiches newsletters Format A (Block A) · `Synthese-demande-AAAA-MM` / PAD (Block B) · `Snapshot-concurrentiel` du trimestre (Block C) · `Snapshot-emploi-<slug>-T#-AAAA` (Block D) · action `Pré-digest newsletters` (compaction amont) · moteur `Pré-draft Format B` (AI Builder).
- **Produit pour** : `Format-B-<slug>-AAAA-MM.md` (pré-draft) → **KR Owner** (validation via `Grille-validation-Format-B`).

---

## Cœur technique — *FLUX*

### Déclencheur
- **Live** : `Recurrence`, Frequency `Month`, Interval `1`. **Time zone et Start time non renseignés** (la Récurrence démarre alors à l'activation et récurre mensuellement).
- **V1 supervisée** : `mois` est **pinné** au littéral `2026-06`. ⚠️ **Interaction réelle** : la sortie `Router_sortie` est en **run-after-regardless** (`Succeeded, Failed, Skipped`) → si le flux se redéclenche, `Créer_dossier_sortie` échoue (dossier déjà là) **mais le digest est tout de même réécrit**. Donc Récurrence active + `mois` figé = **régénération + écrasement des digests de juin à chaque cycle** (et re-dépense AI Builder), sans plantage. Sans danger seulement si le flux est **laissé OFF et lancé à la main**, ou tant que `mois` n'est pas dépiné.
- **Cible (dépinage, backlog « passage en autonome »)** : Start time + Time zone, `mois` → expression dynamique, **et** garde-fou source-absente — **bloc indissociable**.

### Entrées
- **Site** : `https://wefiitcom.sharepoint.com/sites/TribeExpertises` (`dataset` de toutes les actions SharePoint).
- **Bibliothèque** : GUID `c4e3ad56-4f0b-463c-a819-6c334cd86db2`, racine server-relative `/Documents partages` → bibliothèque par défaut **« Documents partagés »**.
- **Variables (racine, dans cet ordre d'init)** — valeurs **verbatim** :
  - `newslettersBrutes` (String) = `null` — brut newsletters, consommé par le pré-digest.
  - `snapshotText` (String) = `null` — réponse du moteur dans le `Do until`.
  - `expertises` (Array) = `["pm","productai","productops","pmm","qa","datapm"]` ⚠️ *(ordre réel ; le SPECS §9.A.bis listait un ordre différent)*.
  - `trimestreCourant` (String) = `concat(formatDateTime(addToTime(utcNow(), -1, 'Month'), 'yyyy'), '-T', string(add(div(sub(int(formatDateTime(addToTime(utcNow(), -1, 'Month'), 'MM')), 1), 3), 1)))` — `AAAA-T#`, **dossiers** trimestre.
  - `trimLabel` (String) = `concat('T', string(add(div(sub(int(formatDateTime(addToTime(utcNow(), -1, 'Month'), 'MM')), 1), 3), 1)), '-', formatDateTime(addToTime(utcNow(), -1, 'Month'), 'yyyy'))` — `T#-AAAA`, **nom de fichier** emploi (ordre inverse).
  - `mois` (String) = `"2026-06"` — **littéral pinné (V1)** ; cible = `formatDateTime(addToTime(utcNow(), -1, 'Month'), 'yyyy-MM')`.
  - `matiere` (String) = `null` — matière par expertise (reset en tête de boucle).
  - `matiereCommune` (String) = `null` — 3 sources globales, remplie une fois avant la boucle.
  - `mapDossier` (Object) = `{"pm":"Product-Management","productai":"Product-AI","productops":"Product-Ops","pmm":"PMM","qa":"QA","datapm":"Data-PM"}` — mapping slug → dossier lisible.

### Étapes *(ordre d'exécution réel, dérivé des `runAfter`)*

**A. Avant la boucle — construire `matiereCommune` (3 sources globales)**

1. **Block A — newsletters** :
   - `Lister_newsletters` (SP `GetFileItems` ; folderPath `…/01-Matière-brute/Newsletters-pré-digérées` ; `viewScopeOption = RecursiveAll` = nested Yes).
   - `Filtrer_newsletters_du_mois` (Query ; from `body('Lister_newsletters')?['value']` ; where `contains(item()?['{Path}'], variables('mois'))`).
   - `En-tête_newsletters` (Append `=== NEWSLETTERS @{variables('mois')} ===\n\n` → **`newslettersBrutes`**).
   - `Boucle_newsletters` (Apply to each) { `Lire_fiche_newsletter` (SP `GetFileContent` ; id `items('Boucle_newsletters')?['{Identifier}']`) → `Empiler_fiche_newsletter` (Append `concat(body('Lire_fiche_newsletter'), \n)` → **`newslettersBrutes`**) }.
   - `Pré-digest_newsletters` (AI Builder via Dataverse `aibuilderpredict_customprompt` ; recordId `1a482cf3-ebdc-40c1-87ac-eb7c2f52ff25` ; input **`fiches`** = `variables('newslettersBrutes')`).
   - `Empiler_newsletters_compactes` (Append `=== NEWSLETTERS <mois> (signaux pré-digérés) ===\n` + `outputs('Pré-digest_newsletters')?['body/responsev2/predictionOutput/text']` + `\n` → **`matiereCommune`**).
2. **Block B — PAD** : `Lire_PAD` (SP `GetFileContentByPath` ; path `concat('/Documents partages/…/Notes-PAD-retraitées/', variables('mois'), '/Synthese-demande-', variables('mois'), '.md')`) → `Empiler_PAD` (Append `=== SYNTHÈSE DEMANDE (PAD) ===` + contenu → `matiereCommune`).
3. **Block C — concurrentiel** : `Lister_snapshot_concurrentiel` (SP `GetFileItems` ; folderPath `…/Veille-concurrentielle` ; `$orderby = Modified desc` ; RecursiveAll) → `Filtrer_snapshot_concurrentiel` (where `contains(item()?['{Path}'], variables('trimestreCourant'))`) → `Lire_snapshot_concurrentiel` (SP `GetFileContent` ; id `first(body('Filtrer_snapshot_concurrentiel'))?['{Identifier}']`) → `Empiler_snapshot_concurrentiel` (Append `=== SNAPSHOT CONCURRENTIEL <trimestreCourant> ===` + contenu → `matiereCommune`).

**B. `Boucle_expertise` — `Apply to each` sur `expertises`, `concurrency.repetitions = 1`**

1. `Set_variable` : `matiere` = `variables('matiereCommune')` (reset sur la base commune).
2. **Block R — registre convictions (par expertise, v4.8)** : `Lire_registre_convictions` (SP **`GetFileContent`** ⚠️ **pas** `…ByPath` → renvoie un **objet `{$content:<base64>}`**, à décoder) ; chemin `04-Convictions-Expertises/Convictions-<slug>.md`. Puis `Empiler_registre` (Append → **`matiere`**, valeur = discriminateur **gabarit-vs-rempli insensible à la casse** : `if(contains(toLower(base64ToString(body('Lire_registre_convictions')?['$content'])), concat(items('Boucle_expertise'), '-')), <`=== REGISTRE CONVICTIONS <slug> ===` + `base64ToString(...?['$content'])`>, <sentinel `=== … INDISPONIBLE (gabarit non rempli) ===`>)` ; runAfter `Lire_registre_convictions` = `is successful`) **/** `Empiler_registre_indisponible` (sentinel fichier absent ; runAfter `Lire_registre_convictions` = `has failed`/`is skipped`). **Block D re-parenté** : `Lire_snapshot_emploi` runAfter = `is successful` **+** `is skipped` sur **les deux** `Empiler_registre`/`Empiler_registre_indisponible` (sinon Block D skippé en silence — emploi disparu).
3. **Block D — emploi (par expertise)** : `Lire_snapshot_emploi` (SP `GetFileContentByPath` ; path `concat('/Documents partages/…/Veille-emploi/', variables('trimestreCourant'), '/Snapshot-emploi-', items('Boucle_expertise'), '-', variables('trimLabel'), '.md')`) → `Empiler_snapshot_emploi` (Append `=== SNAPSHOT EMPLOI <slug> <trimLabel> ===` + contenu → **`matiere`**).
4. `Set_variable_1` : `snapshotText` = `''`.
5. **`Do_until`** { `Pré-draft_Format_B` (AI Builder via Dataverse `aibuilderpredict_customprompt` ; recordId `488d2b6e-c9df-40d7-9973-75c893e423f6` ; input **`matiere`** = `concat('EXPERTISE CIBLE : ', items('Boucle_expertise'), decodeUriComponent('%0A'), decodeUriComponent('%0A'), variables('matiere'))`) → `Set_variable_snapshotText` = `outputs('Pré-draft_Format_B')?['body/responsev2/predictionOutput/text']` } **until** `@or(contains(variables('snapshotText'), '[[FIN_DIGEST]]'), contains(variables('snapshotText'), '[[REPORT_TRIMESTRIEL]]'))` · **Count 8 · Timeout PT30M**.
6. `Créer_dossier_sortie` (SP `CreateNewFolder` ; path **relatif à la bibliothèque** `/Général/…/02-Digests-par-expertise/@{variables('mapDossier')?[items('Boucle_expertise')]}/@{variables('mois')}` — **sans** le préfixe `/Documents partages`).
7. `Router_sortie` (**Switch** ; runAfter `Créer_dossier_sortie` = **Succeeded, Failed, Skipped**) ; `on` = `if(contains(snapshotText,'[[FIN_DIGEST]]'),'digest', if(contains(snapshotText,'[[REPORT_TRIMESTRIEL]]'),'report','incomplet'))` :
   - case `digest` — **⚠️ SUPERSÉDÉ v5.1** (ce bloc à 2 actions décrit l'**export du 24 juin** ; depuis, `Annoter_digest` + le concat sont **RETIRÉS** et `Ecrire_digest` écrit la sortie générateur **directe** : body `replace(variables('snapshotText'),'[[FIN_DIGEST]]','')`, seul dans le case — cf. MAJ v5.1 en tête. Anatomie d'origine conservée comme trace, **ne pas re-câbler l'annotateur**) — *(export 24 juin, 2 actions, dans cet ordre)* :
     1. **`Annoter_digest`** (AI Builder `Run a prompt`, invite `Prompt-agent-annotateur` **v1.6**, input unique `digest` = `replace(variables('snapshotText'), '[[FIN_DIGEST]]', '')`). Émet la **Légende compacte + la couche de confiance (provenance + chips ⬤/◐/◯) + la PARTIE II (4 cartes de restitution)** — **plus de `[[DASH_JSON]]`** (le site lit le markdown direct). Il ne reproduit PAS la Partie I du digest. **RecordId inchangé vs v1.5 ; seul le corps du prompt a changé** (option B : la projection des cartes est fusionnée dans cette même action, pas de passe séparée).
     2. **`Ecrire_digest`** (`CreateFile` ; folderPath `/Documents partages/…/02-Digests-par-expertise/<mapDossier>/<mois>` ; name `Format-B-<slug>-<mois>.md` ; **runAfter `Annoter_digest` = Succeeded, Failed, TimedOut, Skipped** — run-after-regardless) ; body = **filet** : `if(empty(coalesce(outputs('Annoter_digest')?['body/responsev2/predictionOutput/text'], '')), replace(variables('snapshotText'),'[[FIN_DIGEST]]',''), concat(replace(variables('snapshotText'),'[[FIN_DIGEST]]',''), decodeUriComponent('%0A%0A'), coalesce(outputs('Annoter_digest')?['body/responsev2/predictionOutput/text'], '')))` → annotateur OK ⇒ **digest + couche** ; annotateur KO/vide ⇒ **digest brut** (publiable, jamais de perte). *Le `coalesce` dans la branche concat est obligatoire : PA évalue les deux branches du `if`, un concat sur sortie nulle planterait.* Ping de visibilité KO laissé optionnel (non posé).
   - case `report` → `Ecrire_report` (name `…-<mois>-REPORT.md` ; body = `replace(snapshotText, '[[REPORT_TRIMESTRIEL]]', '')`).
   - **défaut** `incomplet` → `Ecrire_incomplet` (name `…-<mois>-INCOMPLET.md` ; body = `snapshotText` brut) **+** `Ping_incomplet` (Teams `PostMessageToSelf` : `⚠️ Format B INCOMPLET — <slug> <mois> : aucun sentinel après 8 essais. À reprendre.`).

**C. Après la boucle** : `Post_a_message_to_myself` (Teams `PostMessageToSelf`, runAfter `Boucle_expertise` Succeeded). ⚠️ **Contenu RÉSIDUEL** hérité de l'assembleur concurrentiel : *« Snapshot concurrentiel T2 2026 pré-drafté et déposé… »* — **à corriger** (cf. dette).

### Sorties
- `…/02-Digests-par-expertise/<NomLisible>/<mois>/Format-B-<slug>-<mois>.md` — **(v5.1 lean)** le **digest complet en une passe** (sentinel `[[FIN_DIGEST]]` retiré) : en-tête (cadrage + méta + « matière mobilisée ») + **4 blocs** (Problématiques & Offres · Convictions à challenger · Compétences recherchées · Contenus de notoriété) + **« Les signaux importants du mois »**. **Tags seuls** — plus de Légende, de couche de confiance, de chips, de cartes, de `[[DASH_JSON]]`. Écrit **directement** par `Ecrire_digest` (`Annoter_digest` supprimé ; plus de filet annotateur).
- `…-REPORT.md` — report (sentinel `[[REPORT_TRIMESTRIEL]]` retiré).
- `…-INCOMPLET.md` (brut) + ping Teams (DM Axel) — échec après 8 essais.
- **(v4.8) `matiere` porte en plus** une section `=== REGISTRE CONVICTIONS <slug> ===` (contenu du registre rempli) **ou** `… INDISPONIBLE (gabarit non rempli) ===` (gabarit/absent → repli générateur sans ID).
- **Décomposition `matiere` PM mesurée** (réf.) : newsletters compactes ~7,5k · PAD ~9,2k · concurrentiel ~6,1k · emploi PM ~15,1k (≈38k).

### Connecteurs
- **SharePoint Online** (`shared_sharepointonline`) : `GetFileItems`, `GetFileContent`, `GetFileContentByPath`, `CreateNewFolder`, `CreateFile`.
- **AI Builder** via **Dataverse** (`shared_commondataserviceforapps`, `aibuilderpredict_customprompt`) **×2 (v5.1 — `Annoter_digest` retiré)** : `Pré-digest_newsletters` (recordId `1a482cf3…`) + `Pré-draft_Format_B` (recordId `488d2b6e…`, corps lean `corps-generateur-digest-lean.txt`).
- **Microsoft Teams** (`shared_teams`, `PostMessageToSelf`) ×2 : `Ping_incomplet` + `Post_a_message_to_myself`.
- Déclencheur `Recurrence`.

### Config-clé & pièges
- **`viewScopeOption = RecursiveAll`** (= Include Nested Items Yes) sur les deux `GetFileItems` (Block A, C). Sans ça → `value: []` silencieux. **Un `Save As` réinitialise ce réglage.**
- **`concurrency.repetitions = 1`** sur `Boucle_expertise` + **reset `matiere` et `snapshotText` en tête d'itération** (anti-bleed inter-expertises).
- **Câblage à deux variables** : `matiere` (constant, lu par l'input du moteur) **séparé** de `snapshotText` (porte le gate). Sinon retry-empoisonnée, invisible au 1er run.
- **Item courant par expression** `items('<Boucle>')?['{Identifier}']`, jamais le chip dynamique (sinon `For each` auto-imbriqué).
- **Deux conventions de chemin distinctes** : `CreateNewFolder` a un vrai sélecteur de bibliothèque → path **relatif à la library** (`/Général/…`, sans `/Documents partages`). `CreateFile`/`GetFileContentByPath` → path **avec** `/Documents partages/Général/…`. ⚠️ « Documents **partages** » **sans accent**.
- **`Router_sortie` en run-after-regardless** (`Succeeded, Failed, Skipped`) → le digest s'écrit même si la création de dossier échoue (dossier déjà présent). C'est ce qui rend les re-runs « tolérants » — mais aussi écrasants (cf. risque Récurrence × `mois` pinné).
- **Deux gates distincts** : le `Do until` garantit que la **génération va au bout** (`[[FIN_DIGEST]]`/`[[REPORT_TRIMESTRIEL]]`) ; il ne dit **pas** s'il y avait assez de **matière** — c'est l'invite qui émet `[[REPORT_TRIMESTRIEL]]` si < 3 signaux / 0 propriétaire / 0 croisement.
- **(v4.8) Registre = `GetFileContent` (objet base64), pas `…ByPath`** : tout `contains`/`toLower` sur `body('Lire_registre_convictions')` lève `InvalidTemplate` (« toLower expects string, provided Object ») → décoder via **`base64ToString(body(...)?['$content'])`**. Discriminateur gabarit/rempli **insensible à la casse** (`toLower(...)` + `concat(items('Boucle_expertise'),'-')`) car les KR Owners écrivent les IDs en MAJUSCULES (`PM-01`, pas `pm-01`). Re-parentage Block D après Block R = `is successful` + `is skipped` sur les deux `Empiler_registre`/`…_indisponible` (sinon emploi skippé en silence).
- ⚠️ `month()` n'existe pas en WDL → `int(formatDateTime(…, 'MM'))`.

---

## Dépendances & renvois
- **Amont** : `Fiche-Predigest-newsletters` · `Fiche-Generation-digest-Format-B` (prompt `Prompt-agent-Format-B-Copilot`, recordId AI Builder `488d2b6e…`) · `Fiche-Assembleur-Snapshot-concurrentiel` · `Fiche-Assembleur-Snapshot-emploi` · `Fiche-Pipeline-Boond` (PAD) · `Fiche-Flux-Newsletters-Format-A`.
- **Aval** : `Grille-validation-Format-B`.
- **Docs fait-foi** : **SPECS §9.A + §9.A.bis** (anatomie — à corriger : ordre `expertises`, sortie « reste à câbler » désormais câblée) · **§6** (décisions) · **§7** (nommage) · `Template-Digest-par-expertise-v2` · `Prompt-agent-Format-B-Copilot`.

## Points d'attention / dette *(détail → SPECS §6/§11)*
- **Résidu de clonage — `Post_a_message_to_myself`** poste un message sur le *snapshot concurrentiel T2 2026* à chaque run réussi de Format B. Cosmétique (DM à soi) mais trompeur → **à réécrire ou supprimer** (fix ~2 min).
- **Récurrence active × `mois` pinné — RISQUE ACTIF** : le flux est **activé** (confirmé 24 juin), donc au prochain déclenchement mensuel il réécrit/écrase les digests de juin + re-dépense AI Builder (sortie en run-after-regardless). Contredit la décision bloc 6 (« V1 = manuel supervisé »). **Correctif** : désactiver le flux dans *Mes flux* (le lancer en Test → Run), ou dépiner `mois`.
- **Garde-fou source-absente — CÂBLÉ B/C/D (corrigé v5.0 ; cette ligne d'export 24 juin était périmée).** PAD, Block C (`Condition length(...)>0`, pas de `first()` null) et Block D (catch `Failed/Skipped` + reconvergence) dégradent chacun en sentinelle `=== … INDISPONIBLE ===`. **Restant : State of X NON gardé** (recâblé dans `matiereCommune`, runAfter `Succeeded` seul) = SPOF avant la boucle → à durcir au lot octobre (cf. MAJ v5.0 en tête).
- **Fuite d'intégrité ⚠ à la dédup du pré-digest** = premier item du backlog qualité (caveat opérationnalisé dans `Grille-validation-Format-B` en attendant).
- **Grounding REX/State of X abandonné en V1** (l'invite signale leur absence). Remonte en V1 si le digest est jugé trop maigre.
- **Sous-emploi concurrentiel** : axe Data/IA non propagé vers `productai`/`datapm` (backlog qualité).

---

## Statut des points de câblage — *vérifié sur export verbatim, 24 juin*
✓ Flux `Assembleur Format B — mensuel` (GUID `4715ca97…`) · ✓ déclencheur `Recurrence` Month/1 (start/tz vides) · ⚠️ flux **ACTIVÉ** · ✓ génération `Pré-draft Format B` (AI Builder, recordId `488d2b6e…`) · ✓ pré-digest input `fiches` = `newslettersBrutes` (recordId `1a482cf3…`) · ✓ Switch `Router_sortie` câblé (digest/report/incomplet) · ✓ `mapDossier` object · ✓ degree 1 · ✓ ping = `PostMessageToSelf` (DM Axel) · ✓ site TribeExpertises + bibliothèque GUID `c4e3ad56…` (`/Documents partages`) · ✓ `mois` = `2026-06` littéral.

> **Mise à jour v4.3 (25 juin)** : + **`Annoter_digest`** câblé dans le cas `digest` (avant `Ecrire_digest`, filet run-after-regardless) — **testé 4× en volet AI Builder**, ~~run réel à confirmer~~ **→ CONFIRMÉ en run réel (v5.0, annotateur v1.6 déployé)**. *NB : le trigger/`mois` ci-dessus reflètent l'export du 24 juin ; l'état réel est celui de SPECS v4.1+ (dépiné, `Recurrence` start `2026-07-01T06:00:00Z`, flux armé). Fiche **ré-exportée le 28 juin** — cf. MAJ v5.0 en tête (gardes B/C/D câblés, State of X recâblé non gardé).*

## ⟦À COMPLÉTER⟧ — reste ouvert
- *(Hygiène, plus tard)* `Prompt-agent-Format-B-Copilot` reflète-t-il l'invite AI Builder live (recordId `488d2b6e…`) ou l'ancienne version Copilot ? → non vérifiable depuis l'export (référence un recordId, pas le texte) ; à trancher avec `Fiche-Generation-digest-Format-B`.
