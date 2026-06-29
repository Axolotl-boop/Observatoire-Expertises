# Fiche module — `Pipeline Boond` (demande réelle → synthèse PAD)

> **Type** : flux Power Automate + **Office Script** + agent de synthèse  ·  **Couche** : 3 (brique propriétaire)
> **État** : ✅ prod  ·  **Responsable** : Axel · notifié : Axel + Delphine
> **Déclencheur** : SharePoint « When a file is created or modified » sur `Pipe-Boond` (polling **1 min**)
> **GUID flux** : `875ed9df-561f-46fe-b9a7-bd9685abb4a5` · **Agent** : `cr1c3_SynthsedemandeBoond`
> *Source : export verbatim + code Office Script, 24 juin.*

## Rôle
Transformer l'**export CSV du pipe commercial Boond** en **synthèse de la demande réelle, anonymisée** (`Synthese-demande-AAAA-MM.md`). C'est la brique « la demande qui paie » — l'**ancre du Bloc 1 du Format B**. Architecture à **deux niveaux de données** : le brut reste restreint, seule la synthèse agrégée diffuse.

## Place dans la chaîne
- **Reçoit de** : un **CSV Boond** déposé dans `Pipe-Boond` (mensuel, manuel).
- **Produit pour** : `Notes-PAD-retraitées/AAAA-MM/Synthese-demande-AAAA-MM.md` → Block B de `Fiche-Assembleur-Format-B`. *(Le brut ne sort jamais de `Pipe-Boond`.)*

---

## Cœur technique

### Déclencheur & curseur
- Trigger `GetOnUpdatedFileItems` sur `…/Pipe-Boond` (polling 1 min).
- **Liste-curseur** (SharePoint, table `86080fcb-e1a2-4366-8893-6149e45c611f`) : champ `DerniereDetection` = la date de détection du dernier traitement → sert de **`lastCutoff`** (le delta ne reprend que les opportunités **postérieures**).

### Étapes *(ordre runAfter)*
1. `Get_file_content` (lit le CSV ; id = `triggerBody()?['{Identifier}']`).
2. `Get_items` ($top 1 sur la liste-curseur) → `DerniereDetection`.
3. **`Run_script`** (Office Script `moteur-delta-boond`, `RunScriptProd`) avec `csvText = base64ToString(Get_file_content…$content)` et `lastCutoff = first(Get_items…)?['DerniereDetection']` → renvoie un **JSON string** dans `body/result`.
4. **`Condition`** : `json(Run_script.result)?['nbNouvelles'] > 0` → **True** :
   - **`AgentInput`** (Compose) = `string(addProperty(removeProperty(json(result), 'delta'), 'periode', formatDateTime(utcNow(),'MM/yyyy')))` → **retire le bloc `delta` (lignes brutes)** et ajoute `periode`. **C'est la frontière d'anonymisation** : l'agent ne reçoit que les **agrégats**, jamais les opportunités nominatives.
   - `Execute_Agent_and_wait` (Copilot **`cr1c3_SynthsedemandeBoond`**) → synthèse markdown.
   - `Create_new_folder` (`Notes-PAD-retraitées/AAAA-MM`) → `Create_file_1` : `Synthese-demande-@{formatDateTime(utcNow(),'yyyy-MM')}.md` ; body = sortie agent. **(diffusion large)**
   - `Create_file` : `delta-boond-@{formatDateTime(utcNow(),'yyyy-MM')}.json` dans **`Pipe-Boond`** ; body = `Run_script` result complet (**avec** `delta`). **(accès restreint)**
   - `Update_item` (liste-curseur) : `DerniereDetection = json(result)?['nouveauCurseur']` → **avance le curseur**.
   - `Send_an_email_(V2)` à **axel + delphine** (« Delta demande Boond du mois »).

### Office Script `moteur-delta-boond` *(fait foi : le code)*
- **Entrées** : `csvText` (CSV décodé), `lastCutoff` (curseur). **Sortie** : **JSON string** (`return: string`).
- **Pourquoi une chaîne** : Power Automate ne sait pas générer le schéma d'un objet à **clés libres** (`{[k]: number}`) ; si le schéma de sortie échoue, PA **masque aussi les champs d'entrée**. Renvoyer une chaîne garde le schéma trivial (`csvText`/`lastCutoff` réapparaissent) ; on relit côté flux avec `json(...)`.
- **Delta** : lignes dont `Date détection > lastCutoff` (comparaison **par chaîne** — ISO largeur fixe → ordre lexicographique = chronologique) ; `nouveauCurseur` = max des dates de détection.
- **Agrégats calculés** : `parNature` (régie / conseil / autre) · `conversion` (taux de transfo régie & conseil) · `expertiseMentions` (**heuristique regex** multi-label sur les 6 expertises) · `vocab` · `seniorite` · `concurrentsCites` · `recurrence.clientsDistincts` · `conseilDescriptions` · `delta` (lignes brutes — **audit, retiré avant l'agent**).
- **Liste concurrents du script** : Thiga, Hubvisory, Mozza, Yield, Beager, Yeita, Converteo, Onepoint, Octo, Theodo, Ekino, Capgemini, Accenture, BCG, Bain — **plus large que la watch-list concurrentielle (12)** : ici c'est la détection de mentions dans le pipe, pas la veille concurrentielle.

### Connecteurs
SharePoint (`GetOnUpdatedFileItems`, `GetFileContent`, `GetItems`, `PatchItem`, `CreateNewFolder`, `CreateFile`) · Excel Online (`RunScriptProd`) · Copilot Studio (`ExecuteCopilotAsyncV2`) · Outlook (`SendEmailV2`).

### Diffusion (exception au « diffusion large »)
- **`Pipe-Boond`** (CSV + `delta-boond-*.json`) = **accès restreint** (données nominatives).
- **`Notes-PAD-retraitées`** (synthèse agrégée) = **diffusion large**. La frontière = le `removeProperty(…,'delta')`.

---

## Dépendances & renvois
- **Aval** : Block B de `Fiche-Assembleur-Format-B`.
- **Docs fait-foi** : export du flux · code `moteur-delta-boond` · invite `cr1c3_SynthsedemandeBoond` · **SPECS §6/§9**.

## Points d'attention / dette
- **Risque d'auto-redéclenchement** : le flux **écrit `delta-boond-*.json` dans `Pipe-Boond`**, qui est le **dossier-trigger** → re-déclenche le flux. Auto-limité (le curseur est déjà au max → `nbNouvelles = 0` → Condition false), mais **à confirmer** (et le 2ᵉ passage lit un `.json`, pas un CSV → `parseCSV` rend < 2 lignes → `empty`).
- **Fenêtre d'extraction** : `periode`/noms via `utcNow()` (mois d'**exécution**) → extraire **dans** le mois couvert, sinon décalage de libellé.
- **Nettoyage `U+2028` / `NBSP`** dans `moteur-delta-boond` (dette SPECS) + re-synthèse trimestrielle + suppression des fichiers de test `*-2026-06`.
- **Heuristique d'expertise** : le tag par regex est **indicatif** (multi-label) — à ne pas confondre avec un classement validé.

## ⟦À COMPLÉTER⟧
- **Texte de l'invite `cr1c3_SynthsedemandeBoond`** (l'agent de synthèse) — à coller pour la partie « anatomie du prompt » (l'export ne porte que le recordId/schéma).

## Statut — *vérifié export + script, 24 juin*
✓ GUID `875ed9df…` · ✓ trigger `Pipe-Boond` polling 1 min · ✓ curseur liste `86080fcb…` · ✓ Office Script `moteur-delta-boond` (JSON string) · ✓ anonymisation = `removeProperty(…,'delta')` · ✓ 2 sorties (synthèse large / JSON restreint) · ✓ avance curseur · ✓ notif axel+delphine.
