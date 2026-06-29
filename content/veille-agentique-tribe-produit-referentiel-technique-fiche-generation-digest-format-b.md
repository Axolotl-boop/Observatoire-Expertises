# Fiche module — `Pré-draft Format B` (génération du digest)

> **Type** : action AI Builder « Run a prompt » (custom prompt GPT-4.1, exécutée via le connecteur **Dataverse**)  ·  **Couche** : 4
> **État** : 🟢 validé 6/6 (3 min 06, 0 report, 0 incomplet) *(détail → SPECS §6 bloc 5, §9.A.bis)*
> **Hôte** : `shared_commondataserviceforapps` · `aibuilderpredict_customprompt` · **recordId** `488d2b6e-c9df-40d7-9973-75c893e423f6`
> **Prompt (fait foi)** : **`corps-generateur-digest-lean.txt`** *(v5.1 — passe unique lean, supersede `corps-format-B-v3.txt`)*
> **Invoqué par** : `Assembleur Format B — mensuel`, dans le `Do until` de la `Boucle_expertise` *(cf. `Fiche-Assembleur-Format-B`)*
>
> **MAJ v5.1 (28 juin) — REFONTE LEAN : GÉNÉRATEUR EN PASSE UNIQUE, plus d'aval.** Corps swappé `corps-format-B-v3.txt` → **`corps-generateur-digest-lean.txt`** (recordId `488d2b6e…` **inchangé** ; collage plein → **re-injecter le token `matiere` via Input → Text**, vérifier `promptTokens` sain ≈21k+). **La sortie n'est plus « Partie I seule » mais le DIGEST COMPLET** : en-tête (cadrage + méta + « matière mobilisée ») + **4 blocs lean** (Bloc 1 Problématiques & Offres : description / sources+tag / offre activable · Bloc 2 Convictions à challenger **conviction-first** : énoncé copié du registre / ce que disent les signaux+tag / **proposition d'action** · Bloc 3 Compétences recherchées : sources+tag / proposition catalogue · Bloc 4 Contenus de notoriété : pourquoi / sources+tag / angle+format) + **« Les signaux importants du mois »** (3-5 bullets), terminé par `[[FIN_DIGEST]]`. **Tags seuls, un par item — plus de chips, plus de cartes, plus de légende/couche de confiance** (annotateur supprimé, cf. `Fiche-Assembleur-Format-B`). **Le générateur est la SEULE passe** → conservatisme de tags durci (`[structurel]` seulement si State of X + convergence, toujours « candidat »). **Garde anti-fabrication conviction CONSERVÉE** (copie-seule du registre, zéro exemple d'ID concret, repli « Registre des convictions non renseigné… — à rattacher par le KR Owner »). **Délimiteur de squelette = TEXTE, jamais ``` ** + interdiction explicite d'envelopper la sortie (leçon : un squelette d'invite entre ``` est recopié en bloc de code — défaut `pm` corrigé). **Validé 2 runs réels pinnés 2026-06** (gate vert). Les MAJ v4.8/v4.9 ci-dessous sont SUPERSÉDÉES (conservées comme trace).

> **MAJ v4.8 (28 juin) — GÉNÉRATEUR EN v3** (`corps-format-B-v3.txt`, déployé & validé run réel 2026-06). Sortie = **Partie I (4 blocs durcis) UNIQUEMENT** : Bloc 1 + « ce que l'externe ajoute » / « question pour creuser » / cabinets-par-axe ; **Bloc 2 « conviction touchée » → ID `<slug>-NN` COPIÉ du registre injecté** ; Bloc 3 socle/séniorité ; Bloc 4 « sur quoi ça tient ». **N'émet NI chips ⬤◐◯, NI légende, NI cartes** (passes aval ; les cartes héritent le chip → projetées après l'annotateur). **§1 supprimé** (signaux distribués dans les blocs). **Nouvelle section de matière** `=== REGISTRE CONVICTIONS <slug> ===` (fournie par le **Block R** de l'assembleur). **Garde anti-fabrication** (garde-fou cardinal) : **règle copie-seule** (un ID n'apparaît QUE copié caractère-pour-caractère du registre), **zéro exemple d'ID concret dans le prompt** (sinon gabarit de fabrication → convictions inventées, régression vécue), **interdit des IDs hedgés** (`(si existante)`…) ; ID **normalisé en minuscules** (clé canonique). **Repli sans ID** : phrase de conviction en clair + `[registre absent / clé à rattacher]` (registre absent/gabarit/aucune conviction correspondante). `[[FIN_DIGEST]]` conservé ; `[[REPORT_TRIMESTRIEL]]` abandonné (v4.2).

> **MAJ v4.9 (28 juin) — AVAL = ANNOTATEUR v1.6.** La projection des 4 cartes et les chips ⬤/◐/◯ sont posés **par l'annotateur v1.6** (option B, fusionnée dans la passe d'annotation) — le générateur reste inchangé (Partie I seule). ⚠️ **FINDING À VÉRIFIER** : la **Carte Convictions** affiche l'**énoncé** de la conviction repris du **Bloc 2** (l'annotateur ne voit pas le registre). Donc le Bloc 2 v3 **doit porter l'énoncé de la conviction à côté de l'ID `<slug>-NN`** (pas seulement l'ID), sinon la carte n'a rien à projeter. Validé sur la fixture de test (l'énoncé était présent) ; **à confirmer sur un vrai digest v3 produit par le générateur** — si le générateur ne recopie que l'ID, ajout mineur : recopier l'énoncé du registre injecté à côté de l'ID (copie-seule, même garde anti-fabrication).

## Rôle
Produire le **pré-draft d'un digest d'expertise** (Format B, 4 blocs) à partir de la matière d'un cycle déjà assemblée et cadrée pour **une** expertise. C'est l'étape où le **croisement** a lieu (newsletters × PAD × concurrence × emploi). Sortie = brouillon ; le KR Owner relit et tranche (surtout les `[structurel]`).

## Place dans la chaîne
- **Reçoit de** : l'assembleur — input `matiere` = `concat('EXPERTISE CIBLE : ', <slug>, '\n\n', variables('matiere'))`, où `variables('matiere')` = `matiereCommune` (newsletters compactes + PAD + snapshot concurrentiel) + snapshot emploi de l'expertise.
- **Produit pour** : la variable `snapshotText` de l'assembleur (chip `body/responsev2/predictionOutput/text`), lue par le gate `Do until` puis routée par le `Switch`.

---

## Cœur technique — *AGENT / PROMPT*

### Plateforme & modèle
- **AI Builder custom prompt**, modèle **GPT-4.1**, appelé en headless par l'action `aibuilderpredict_customprompt` (connecteur **Dataverse**), pas un agent Copilot Studio conversationnel.
- **Pivot (décision §6 bloc 5)** : remplace l'`Execute Agent and wait` (agent Copilot), dont le plafond d'entrée réel **< 10k** rendait l'injection de la matière (~38k) impossible.

### Mode & E/S
- **Mode** : matière-injectée. L'agent ne va **rien** chercher dans SharePoint ; il lit la matière du `Message`/input. (C'est la cause des règles de config gravées : aucune connaissance `.md`, aucun Outil de fetch — sinon `lastResponse` vide.)
- **Entrée** : input prompt **`matiere`** (cf. expression ci-dessus). 1ʳᵉ ligne `EXPERTISE CIBLE : <slug>` → l'agent ne traite **que** cette expertise. Sections délimitées `=== … ===` :
  - `=== NEWSLETTERS <mois> (signaux pré-digérés) ===` → §1 + Bloc 2
  - `=== SYNTHÈSE DEMANDE (PAD) ===` → Bloc 1
  - `=== SNAPSHOT CONCURRENTIEL <trimestre> ===` → Blocs 1 et 2
  - `=== SNAPSHOT EMPLOI <slug> <trimestre> ===` → Bloc 3
- **Grounding** : ⚠️ **divergence à lever** — le prompt fichier autorise des sources groundées (REX/learning expeditions en appui Bloc 1 ; rapports State of X mappés par expertise), **mais** la décision §6 bloc 5 a **abandonné le grounding PDF pour la V1** (« le prompt signale leur absence »). À confirmer sur l'invite live (recordId `488d2b6e…`) : grounding réellement détaché, ou clause encore présente mais inopérante.
- **Sortie** : un digest complet **ou** un report — terminé par un sentinel unique (cf. ci-dessous). Lu par l'assembleur via `body/responsev2/predictionOutput/text`.

### Anatomie du prompt *(résumé ; texte intégral → `Prompt-agent-Format-B-Copilot`)*
- **Rôle** : assistant de pré-rédaction du Format B ; pré-draft jamais final ; toujours en français.
- **Ce qu'il fait** : lit la matière injectée, la **croise**, rédige selon `Template-Digest-par-expertise-v2` à la lettre.
- **Ce qu'il ne fait jamais** : pas de MAJ deck/convictions · jamais le **pipe Boond brut** (uniquement la synthèse PAD) · ne tranche jamais un `[structurel]` (= « candidat — validation humaine requise ») · n'invente pas (source absente → le dit).
- **Équilibre des sources (anti-bruit)** : la synthèse PAD (la demande qui paie) est l'ancre du Bloc 1 ; ne pas laisser le volume newsletters noyer le signal ; compresser les fiches aux 3-5 signaux de §1.
- **Règles de jugement** : on ne résume jamais (trier/croiser/traduire en action, reformuler) · le croisement prime sur l'accumulation (pas de croisement réel → ne pas l'écrire) · **tags conservateurs** (`[mode]` par défaut ; `[tendance]` si mouvement réel + ≥1 corroboration ; `[structurel]` seulement si plusieurs sources indépendantes convergent, toujours « candidat ») · convergence > signal isolé · sponsoring : séparer l'idée de fond de l'argument de vente.
- **Cas Bloc 3** : le delta emploi est trimestriel → snapshot emploi = socle stable ; sans mouvement, « Socle inchangé — prochain delta emploi au <trimestre> ».
- **Structure de sortie (Template v2)** : en-tête (tableau + phrase « Pré-draft généré pour validation… ») · §1 signaux du mois (3-5, source + tag) · Bloc 1 problématiques clients & positionnement (+ « ce qu'on ne bouge PAS, et pourquoi ») · Bloc 2 signaux qui challengent les convictions · Bloc 3 skills/méthodes/outils · Bloc 4 sujets éditoriaux & angle (POV, pas thème générique) · garde-fous systématiques · sources utilisées (+ briques absentes signalées).
- **Seuil de matière (mode non surveillé)** : ≥ 3 signaux réels, dont ≥ 1 propriétaire (PAD/concurrence/emploi), et ≥ 1 croisement possible ; sinon **ne rédige aucun digest** et émet `[[REPORT_TRIMESTRIEL]]`. Bloc sans matière → « Rien de neuf ce mois — [raison] » (jamais de remplissage).
- **Fin de réponse** : `[[FIN_DIGEST]]` (digest complet) **OU** `[[REPORT_TRIMESTRIEL]]` (report) — **jamais les deux**. Ce sont ces jetons que le `Do until` (gate) et le `Switch` de l'assembleur exploitent.

### Plafonds / limites & fiabilité
- **GPT-4.1 grand contexte** : a avalé **51 575 tokens** de newsletters brutes sans broncher → l'objection coût/volume de la « tout-AI-Builder » est caduque.
- **Non-déterminisme** : contrairement à l'agent Copilot (spectre vide ↔ tronqué ↔ complet), GPT-4.1 a produit **6/6 sans aucun retry**. Le `Do until` (Count 8 / PT30M) reste comme **filet**, pas comme nécessité observée.

### Validation
**6/6 digests complets, 0 report, 0 incomplet, 3 min 06.** Qualité tenue au spot-check : flags sponsoring inline (PM ⚠Yeita ; productai/productops ⚠Yeita/Converteo) ; QA dit honnêtement « aucun éditeur sur ce périmètre » ; croisement concurrentiel effectif là où la source a du contenu (trou PM = source muette, pas agrégation).

---

## Dépendances & renvois
- **Amont** : `Fiche-Assembleur-Format-B` (construit `matiere`) · `Fiche-Predigest-newsletters` (fournit les newsletters compactes) · briques snapshot (concurrentiel, emploi) · `Fiche-Pipeline-Boond` (PAD).
- **Aval** : `Switch` de l'assembleur → fichier digest → `Grille-validation-Format-B` (KR Owner).
- **Docs fait-foi** : **`Prompt-agent-Format-B-Copilot`** (texte du prompt) · **`Template-Digest-par-expertise-v2`** (format de sortie) · **SPECS §6** (pivot AI Builder, seuil, sentinels) · **§9.A.bis** (intégration flux).

## Points d'attention / dette
- **Hygiène du fichier prompt (à réconcilier)** : (a) titre/en-tête le présentent comme « Copilot Studio / `Execute Agent` » — c'est désormais une **invite AI Builder** ; (b) le **paragraphe grounding** (REX + State of X) référence un grounding **abandonné pour la V1** → aligner le fichier sur l'invite live, ou confirmer ce que porte l'invite live.
- **Dépend de l'amont pour la qualification vendor-driven** : la règle sponsoring/convergence du prompt **ne peut pas récupérer** un flag `⚠ poussé par <nom>` déjà **strippé** à la dédup du pré-digest (cf. fuite d'intégrité, premier item backlog). Le prompt agit sur ce qu'il reçoit.
- **Grounding abandonné V1** → digests potentiellement pauvres en benchmarks ; remonter l'injection-texte REX/State of X en V1 si le KR Owner le juge trop maigre.

---

## ⟦À COMPLÉTER⟧ — reste ouvert
- **Confronter l'invite AI Builder live (recordId `488d2b6e…`) au fichier `Prompt-agent-Format-B-Copilot`** — surtout la clause grounding (présente/retirée ?). Non visible dans l'export du flux (référence un recordId, pas le texte). À récupérer par copier-coller depuis l'écran AI Builder, ou par export de la solution AI Builder.
- *(Optionnel)* paramètres du custom prompt (max tokens / température) si on veut documenter le réglage du modèle.
