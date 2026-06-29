# Fiche module — `Veille Tribe — Digest contenu` (agent Format A)

> **Type** : agent **Copilot Studio** (matière-injectée), invoqué par flux  ·  **Couche** : 2 (pré-digestion)
> **État** : ✅ prod — **gelé** (ne pas retoucher sans raison)
> **Schéma agent** : `cr1c3_VeilleTribeDigestcontenu` · invoqué via `ExecuteCopilotAsyncV2`
> **Invoqué par** : `Captation / pré-digestion des newsletters` *(cf. `Fiche-Flux-Newsletters-Format-A`)*

## Rôle
Transformer **UNE** newsletter (article, tribune, roundup) en **fiche de digest unique (Format A)** : un digest à **5 sections**, en français, qui **ne résume jamais** — il lit, trie, interprète, challenge, traduit en implications. Pré-digestion **par contenu**, sans croisement.

## Place dans la chaîne
- **Reçoit de** : le flux Newsletters — `body/message` = consigne + `from` / `subject` / `Contenu : <texte Html_to_text>`.
- **Produit pour** : `body/lastResponse` = la fiche Format A (déposée par le flux) **ou** `[[PAS_DE_FICHE]]`.

---

## Cœur technique — *AGENT / PROMPT*

### Plateforme & E/S
- **Copilot Studio**, matière-injectée (travaille sur le seul contenu fourni, **aucun grounding**, **aucun** accès aux données internes).
- **Sortie** : fiche Format A **ou** `[[PAS_DE_FICHE]]` (jeton seul, 1ʳᵉ ligne ; la fiche ne le contient jamais).

### Mission & priorités
Matière décisionnelle pour les **6 expertises**, au service (dans l'ordre) de : (1) convictions & offre, (2) avant-vente, (3) culture produit interne.

### Règles non négociables
- **Ne résume jamais** (paraphraser = échec).
- **N'invente aucun impact** ; expertise non concernée → n'en parle pas ; contenu faible/creux/marketing → le dit dans le VERDICT.
- **Repère sponsoring / biais commercial** (éditeur de logiciel, push d'outil, surreprésentation non déclarée) → sépare l'idée de fond de l'argument de vente.
- **Prudence verdicts** : `[tendance]` par défaut ; `[structurel]` seulement si fond + durable, suivi de **« (à valider) »** ; une fiche peut n'avoir **aucun** `[structurel]`.
- **Ne traite que le contenu fourni** ; roundup → seulement les **1-2 sujets dominants**, pas chaque lien.

### Périmètre — NE CROISE PAS *(le point clé)*
Aucun accès au pipe Boond / PAD / REX / concurrence / emploi. Donc en **sections 4 et 5**, il **PROPOSE** une corroboration interne comme **hypothèse à vérifier**, ne la **CONSTATE** jamais (« à confronter à nos REX », « hypothèse à vérifier côté PAD/Boond », « recommandation à challenger par le KR Owner »). **Mais** : la règle ne vise **que** les affirmations sur la matière interne / les décisions d'offre — sur l'analyse du contenu et la lecture des signaux marché, il reste **affirmé et concret** (ne transforme pas chaque phrase en « à valider »).

### Format de sortie *(structure exacte)*
En-tête `Digest de contenu — [Source/Auteur], « [Titre] » ([date])` puis :
1. **VERDICT** (2-4 phrases : intérêt, angle, valeur ; sponsoring/biais/faiblesse signalés ici).
2. **CE QU'IL FAUT RETENIR** (3-5 idées reformulées, une par puce).
3. **CE QUE ÇA DIT DU MARCHÉ** (signaux + mutations, chacun tagué `[mode]`/`[tendance]`/`[structurel] (à valider)`).
4. **IMPACT POUR NOS EXPERTISES** (une puce par expertise **concernée**, `central`/`secondaire`, chaque impact en **piste** terminée par « — à confronter à nos PAD/REX/concurrence/emploi »).
5. **CONVICTIONS À RENFORCER OU À CHALLENGER** (2-4 puces préfixées `[Renforce]` / `[Challenge]` / `[Nouvelle — à valider]` — recommandations au KR Owner).

### Gate & cas particuliers
- **`[[PAS_DE_FICHE]]`** si sous le seuil de matière (e-mail d'agenda/événement, sondage, sollicitation admin, teaser purement promo). **Mais** un signal **ténu mais réel** → fiche **courte**, pas un skip.
- **Hors sujet** (sans lien avec les 6 expertises) → VERDICT d'une phrase, rien d'autre. **Trop faible** → le dire, sections minimales. **Promo** → le signaler, extraire l'idée, ne pas sur-vendre.

---

## Dépendances & renvois
- **Amont** : `Fiche-Flux-Newsletters-Format-A`.
- **Aval** : fiche Format A → `Fiche-Predigest-newsletters` (re-compaction couche 4) → `Fiche-Assembleur-Format-B`.
- **Docs fait-foi** : **invite Copilot `cr1c3_VeilleTribeDigestcontenu`** · **SPECS §7** (sentinelle `[[PAS_DE_FICHE]]` — origine).

## Points d'attention / dette
- **Gelé** : c'est le format A de référence, stable → ne pas modifier sans nécessité (toute la chaîne aval en dépend).
- **Deux compactions** : cette fiche Format A est **re-compactée** ensuite par le pré-digest (couche 4) avant injection au Format B — ne pas confondre les deux étapes.

## Statut — *vérifié invite + invocation, 24 juin*
✓ schéma `cr1c3_VeilleTribeDigestcontenu` · ✓ 5 sections + tags · ✓ « ne croise pas » (sections 4-5 = hypothèses) · ✓ gate `[[PAS_DE_FICHE]]` · ✓ prudence `[structurel] (à valider)`.
