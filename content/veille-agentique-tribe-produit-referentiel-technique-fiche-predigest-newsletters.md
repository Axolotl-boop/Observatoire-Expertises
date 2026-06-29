# Fiche module — `Pré-digest newsletters` (compaction amont)

> **Type** : action AI Builder « Run a prompt » (custom prompt GPT-4.1, via connecteur **Dataverse**)  ·  **Couche** : 4 (étape amont de l'assemblage Format B)
> **État** : 🟢 validé (intégré au run 6/6) *(détail → SPECS §6 bloc 5 / décision « pré-digestion Voie 1 »)*
> **Hôte** : `shared_commondataserviceforapps` · `aibuilderpredict_customprompt` · **recordId** `1a482cf3-ebdc-40c1-87ac-eb7c2f52ff25`
> **Prompt (fait foi)** : invite AI Builder `1a482cf3…` — ⟦pas de fichier projet ; texte à récupérer⟧
> **Invoqué par** : `Assembleur Format B — mensuel`, **une fois avant la boucle** *(cf. `Fiche-Assembleur-Format-B`)*

## Rôle
Compacter **toutes les fiches newsletters Format A du mois** en une **liste de signaux dense** qui entre dans `matiereCommune` à la place des newsletters brutes. Raison d'être : les newsletters représentent ~95 % de la matière brute (mesurée jusqu'à ~243k caractères / 51 575 tokens) ; les injecter telles quelles est inutile (le Format B ne veut que 3-5 signaux par expertise) et impossible sur l'ancien agent Copilot (plafond < 10k). La compression est « ce que le Format B voulait de toute façon » — c'est la **passe Voie 1 qui a survécu** au pivot AI Builder (elle l'alimente).

## Place dans la chaîne
- **Reçoit de** : la variable **`newslettersBrutes`**, remplie par le Block A de l'assembleur = en-tête `=== NEWSLETTERS <mois> ===` + le contenu de **chaque fiche Format A** du mois (déjà pré-digérées par newsletter), concaténées.
- **Produit pour** : `matiereCommune` — la sortie compacte, précédée de l'en-tête `=== NEWSLETTERS <mois> (signaux pré-digérés) ===`, y est appendée (action `Empiler_newsletters_compactes`), puis lue par le moteur `Pré-draft Format B`.

> ⚠️ **Deux compactions distinctes** : chaque newsletter est d'abord pré-digérée à la captation (fiche Format A, couche 2) ; **cette** passe est une **seconde** compaction, inter-cycle, qui fond toutes les fiches du mois en une liste de signaux unique.

---

## Cœur technique — *AGENT / PROMPT*

### Plateforme & E/S
- **AI Builder custom prompt**, **GPT-4.1**, appelé en headless via `aibuilderpredict_customprompt` (Dataverse).
- **Entrée** : input prompt **`fiches`** = `variables('newslettersBrutes')`.
- **Sortie** : liste de signaux compacte, lue par l'assembleur via `outputs('Pré-digest_newsletters')?['body/responsev2/predictionOutput/text']`.
- **Position** : exécutée **une fois par cycle**, avant la `Boucle_expertise` (donc partagée par les 6 expertises via `matiereCommune`).

### Comportement du prompt *(d'après SPECS §6 — texte exact à récupérer)*
Invite **durcie** au pivot bloc 5 (la taille n'étant plus contrainte par GPT-4.1, on a privilégié la **fidélité** sur la brièveté) :
- **Budget relâché** : fidélité > brièveté, **40-60 signaux**, plus de plafond strict.
- **Tags reproduits à l'identique** avec la mention **« (à valider) »** (fin de la dégradation des `[structurel]` qui se produisait quand la compaction re-jugeait).
- **Flag `⚠ poussé par <nom>`** reporté depuis les fiches (traçabilité du sponsoring/vendor-driven jusque dans la liste compacte).
- Ligne **`SIGNAL DOMINANT DU CYCLE`** : pour que le méta-signal du mois ne se **dilue pas** dans la dédup.

### Pourquoi cette passe et pas « tout sur AI Builder » (Voie 2 rejetée)
Envoyer 243k bruts ×6 expertises/mois au moteur serait coûteux et bruité ; et la Voie 1 préserve l'étape de **compression** que le croisement réclame. La version **compacte** (≈7,5k pour PM) entre dans `matiereCommune`, **pas** les newsletters brutes.

---

## Dépendances & renvois
- **Amont** : Block A de `Fiche-Assembleur-Format-B` (construit `newslettersBrutes`) · `Fiche-Flux-Newsletters-Format-A` + `Fiche-Agent-Format-A` (produisent les fiches sources).
- **Aval** : `matiereCommune` → `Fiche-Generation-digest-Format-B`.
- **Docs fait-foi** : **SPECS §6** (décision pré-digestion Voie 1 + durcissement bloc 5) · **§9.A.bis** (intégration flux) · invite AI Builder `1a482cf3…`.

## Points d'attention / dette *(détail → SPECS §6/§11)*
- **Fuite d'intégrité ⚠ à la dédup — PREMIER item du backlog qualité.** Quand la passe **fusionne des signaux convergents** en un bullet unique, elle **écrase les `⚠ poussé par <nom>`** → un `[structurel candidat]` / `SIGNAL DOMINANT` porté par une convergence multi-cabinets ressort **propre**, sans qualification vendor-driven. Échec **invisible dans la sortie**, sur le signal le plus haut-enjeu ; le garde-fou aval (règle sponsoring du moteur Format B) **ne rattrape pas** (il a besoin du ⚠ déjà présent). **Correctif** = **reporter/unionner les ⚠ dans la dédup**. En attendant : caveat **opérationnalisé en ligne de checklist** dans `Grille-validation-Format-B`.

---

## ⟦À COMPLÉTER⟧ — reste ouvert
- **Texte exact de l'invite AI Builder `1a482cf3…`** (pas de fichier projet associé) — à récupérer par copier-coller depuis l'écran AI Builder, ou export de la solution. Une fois en main : envisager d'en faire un **fichier projet `Prompt-pre-digest-newsletters`** (parité avec le prompt de génération), pour que le « fait foi » soit versionné.
- *(Optionnel)* paramètres du custom prompt (max tokens / température).
