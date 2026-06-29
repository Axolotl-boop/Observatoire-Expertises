# Fiche module — `Veille concurrence — Captation` (agent)

> **Type** : agent **Copilot Studio** (matière-injectée), invoqué par flux  ·  **Couche** : 2 (pré-digestion)
> **État** : ✅ prod (gate robuste à l'homonymie, validé 17 juin)
> **Schéma agent** : `cr1c3_VeilleconcurrenceCaptation` · invoqué via `ExecuteCopilotAsyncV2`
> **Invoqué par** : **les 4 flux RSS + le flux e-mail** (agent partagé) *(cf. `Fiche-Flux-RSS-concurrence`, `Fiche-Flux-Veille-concurrence-Email`)*

## Rôle
Transformer **un** contenu publié par un cabinet (billet, actu, newsletter, alerte) en **mini-fiche concurrentielle taguée**, ou émettre le **jeton d'écartement** `[[PAS_DE_FICHE]]` si le contenu n'a aucune matière concurrentielle. Il **trie, reformule, juge** — ne résume jamais pour meubler.

## Place dans la chaîne
- **Reçoit de** : un flux de captation — `body/message` = `Cabinet concerné: <slug>\n<texte du contenu>` (texte issu de `Html_to_text`, ou du `HTTP GET` pour Converteo).
- **Produit pour** : `body/lastResponse` = soit la mini-fiche (déposée par le flux en `Veille-concurrentielle/AAAA-MM/`), soit `[[PAS_DE_FICHE]]` (le flux `Terminate`).

---

## Cœur technique — *AGENT / PROMPT*

### Plateforme & E/S
- **Copilot Studio**, mode matière-injectée (travaille sur le seul texte du `message`, **aucun grounding**).
- **Entrée** : le cabinet (en tête) + le texte du contenu. **Sortie déterministe** : mini-fiche **ou** `[[PAS_DE_FICHE]]` (jamais les deux ; la mini-fiche ne contient jamais la chaîne du jeton).

### Règle de sortie déterministe
- **`[[PAS_DE_FICHE]]` exactement** si : listicle SEO, icebreakers, RH/RSE générique, pur promo produit sans signal stratégique, billet **pédagogique/définitionnel** (« comment faire X », « qu'est-ce que Y »).
- **Exception** : un billet qui affirme une **THÈSE** sur l'évolution du métier / de la demande / des pratiques / du positionnement **n'est pas pédagogique** → mini-fiche.

### Calibrage — conservateur
Comme la pré-digestion newsletters : un signal **ténu mais réel** → mini-fiche **courte**, pas un skip. En cas de **doute, on garde**. Le jeton n'est émis que pour le **bruit avéré**.

### Posture vs pédagogie *(le discriminant clé)*
- **Pédagogique / définitionnel** (explique une notion établie, how-to, glossaire, comparatif neutre) → `[[PAS_DE_FICHE]]`. **Le titre seul ne tranche pas** (souvent SEO) → juger **sur le corps**.
- **Posture / thèse** (affirme un **déplacement** : « ne se joue plus dans… mais dans… », « X devient central/obsolète », « le rôle de Z change ») → **mini-fiche**, surface **prise de parole**. Le champ `Signal` capture **la thèse elle-même** (le déplacement affirmé), pas un résumé.

### Format de la mini-fiche *(fixe, en français, reformulé)*
`Cabinet` · `Surface` [recrutement | prise de parole | référence-client | M&A / levée | offre & positionnement | autre] · `Signal` (1-2 phrases : le mouvement / la thèse, pas un résumé) · `Tag` · `Biais / sponsoring` (contenu vitrine auto-déclaré ; angle promo signalé).

### Tags & plafond *(règle clé)*
- `[mode]` (buzz) · `[tendance]` (mouvement réel, pas irréversible) · `[structurel]` **réservé aux faits durs évidents dans l'item** : M&A, levée, fusion, rachat, ouverture/fermeture de bureau, disparition d'un acteur — **rien d'autre**.
- **Sur un item isolé**, **pas de `[structurel]`** depuis une offre / un positionnement / un discours / une posture / un recrutement : le structurel se construit par **convergence + croisement au snapshot trimestriel, par l'humain**. Un lancement d'offre = au mieux `[tendance]`. Une posture = `[mode]` par défaut (`[tendance]` seulement si adossée à un fait concret dans l'item). **Décrire le mouvement, ne pas préjuger de sa durabilité.**

### Ce qu'il ne fait pas
Pas de croisement interne (PAD/emploi/REX) · pas d'évaluation de notre position (ligne ④ = humain) · pas de copie (reformule toujours) · pas d'invention de mouvement.

---

## Dépendances & renvois
- **Amont** : `Fiche-Flux-RSS-concurrence`, `Fiche-Flux-Veille-concurrence-Email`, `Fiche-Canal-B-Google-Alerts`.
- **Aval** : fiches déposées → `Fiche-Assembleur-Snapshot-concurrentiel`.
- **Docs fait-foi** : **invite Copilot `cr1c3_VeilleconcurrenceCaptation`** · `Format-veille-concurrentielle-v3` (format de fiche) · `Spec-flux-veille-concurrentielle` · **SPECS §6/§7**.

## Points d'attention / dette
- **Gate robuste à l'homonymie** : validé sur l'alerte AI Builders « nom commun » (6 items « AI builders » génériques → skip correct, 0 fiche parasite).
- **Calibrage conservateur** : tend à garder en cas de doute → la **rétrogradation des tags** (ex. Converteo `[tendance]` généreux → `[mode]`) se fait **au snapshot**, pas ici.

## Statut — *vérifié invite + invocation, 24 juin*
✓ schéma `cr1c3_VeilleconcurrenceCaptation` · ✓ partagé RSS (×4) + e-mail · ✓ sortie déterministe mini-fiche / `[[PAS_DE_FICHE]]` · ✓ plafond de tag (pas de `[structurel]` hors fait dur) · ✓ posture vs pédagogie tranché sur le corps.
