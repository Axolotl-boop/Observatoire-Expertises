# Fiche module — `Pré-draft Snapshot concurrentiel` (agent)

> **Type** : agent **Copilot Studio** (matière-injectée), invoqué par flux  ·  **Couche** : 3
> **État** : 🟢 validé · **Version** : v3.1 (compacté <8000 car., clauses A/B/C/D)
> **Schéma agent** : `cr1c3_PrdraftSnapshotconcurrentiel` · invoqué via `ExecuteCopilotAsyncV2` (connecteur `shared_microsoftcopilotstudio`)
> **Invoqué par** : `Assembleur Snapshot concurrentiel` (dans le `Do until`) *(cf. cette fiche)*

## Rôle
Transformer la matière concurrentielle d'un **trimestre** en un **snapshot structuré par axe de mouvement de marché**. Pas un résumeur : il **trie, déduplique, regroupe par axe, fait ressortir la convergence** entre cabinets (la colonne vertébrale du livrable). **Brique pure** : décrit le mouvement du marché concurrent, **ne croise pas** avec les données internes et **ne situe pas** notre position (→ Format B). Garde-fou cardinal : pré-draft, jamais finalisation ; ne tranche jamais un `[structurel]`.

## Place dans la chaîne
- **Reçoit de** : l'assembleur — `body/message` = `variables('matiere')` (mini-fiches concurrentielles du trimestre concaténées, chacune préfixée `===== <fichier> =====`).
- **Produit pour** : la variable `snapshotText` de l'assembleur (`body/lastResponse`), gardée par le gate `## Points de décision` puis déposée en `Snapshot-concurrentiel-T#-AAAA.md`.

---

## Cœur technique — *AGENT / PROMPT*

### Plateforme & E/S
- **Copilot Studio**, mode **matière-injectée** (lit la matière du `message`, ne va rien chercher). Config impérative : **aucune** connaissance `.md`, **aucun** Outil de fetch (sinon `FlowDisabled` → `lastResponse` vide).
- **Entrée** : `message` = matière concurrentielle du trimestre (+ idéalement le tableau de suivi du trimestre précédent ; **1er passage = pose la ligne de base**, dès T+1 = compare cellule à cellule).
- **Sortie** : snapshot markdown prêt à déposer, terminé par la section **`## Points de décision pour Axel`** (= le gate de complétude lu par le `Do until`).

### Périmètre (cabinet → expertise)
- **PM** : Thiga · Hubvisory · Wivoo · Yield Advisory
- **QA** : Qestit · KP2i · Smartesting
- **Data/IA** : Hymaïa · Converteo · Artefact · AI Builders · Eleven *(Artefact / AI Builders / Eleven = « source d'axe à confirmer concurrent »)*
- **WeFiiT n'est jamais une cible** (si cité → ignoré).

### Méthode (dans l'ordre)
1. **Trier & dédupliquer** : un même mouvement capté via RSS + newsletter + alerte = **un seul** signal ; écarte SEO / promo produit / RH générique ; **reformule toujours**.
2. **Regrouper par axe de mouvement** (pas par concurrent) : **3 à 5 axes**, chacun tagué `[PM]` / `[QA]` / `[transverse]`.
3. **2 lignes par axe** (obligatoires) : **① Qui bouge, comment** (mouvements reformulés par cabinet · surface · source · tag) ; **② Convergence & trou** (combien de cabinets sur l'axe + qui ne le couvre pas — *le trou = espace d'offre potentiel, exploité au Format B*). **Rien d'autre** (pas de ligne « croisement » ni « notre position » → Format B).
4. **Lecture transverse** : la direction de marché la plus nette du trimestre (candidat Bloc 2 Format B).
5. **Tableau de suivi** (concurrent × axe), symboles **littéraux** : `✅ <mouvement> · [tag] · AAAA-MM` · `❌` silence réel · `⬜` pas de matière.
- **Convergence transverse** = à **faire émerger**, pas à présupposer (candidat `[structurel]` à valider) — seulement si la matière du trimestre le démontre.

### Tags, plafonds, garde-fous
- `[mode]` (buzz) · `[tendance]` (mouvement réel non irréversible) · `[structurel]` (faits durs seuls : M&A, levée, fusion, ouverture/fermeture, consolidation, sous-discipline durable = **candidat**).
- **Plafonds** : une offre lancée / un discours / un recrutement / une posture → `[tendance]` max. Force = **convergence** (1 cabinet = prudent ; 2-3 = direction de marché).
- **Garde-fous** : jamais résumer · comportemental > déclaratif (recrutement/talks/références > vitrine) · seuil de matière par axe (« aucun mouvement visible » est un signal honnête) · **`⬜` par défaut, `❌` = upgrade humain** (l'agent ne voit que les fiches injectées, pas l'activité des canaux → ne peut pas affirmer un silence réel) · sponsoring/biais séparés de l'idée de fond · jamais un signal isolé = certitude · jamais de croisement/positionnement.

### Format de sortie *(fait foi : `Format-veille-concurrentielle-v3`)*
`# Snapshot concurrentiel — T# AAAA` → en-tête (périmètre) → `## Axe N — [titre] · [PM|QA|transverse]` (lignes ①②) → `## Lecture transverse` → `## Tableau de suivi (delta)` (table markdown, 12 cabinets en lignes, axes en colonnes) → **`## Points de décision pour Axel`** (verdicts `[structurel]` candidats · axes à convergence limite · cabinets sans mouvement = candidats recalibrage watch-list).

---

## Dépendances & renvois
- **Amont** : captation concurrentielle (RSS + e-mail).
- **Invoqué par / aval** : `Fiche-Assembleur-Snapshot-concurrentiel`.
- **Docs fait-foi** : **invite Copilot `cr1c3_PrdraftSnapshotconcurrentiel`** · **`Format-veille-concurrentielle-v3`** (format & règle `⬜≠❌` §6, gabarit littéralisé v3.1) · **SPECS §6/§9**.

## Points d'attention / dette
- **Non-déterminisme** : le gate `## Points de décision` garantit la complétude, **pas le nombre d'axes** (1 vs 2) → **check manuel** à la validation (au besoin durcir avec un 2ᵉ `contains`).
- **Dénominateur** : l'agent a déjà mal compté le périmètre (« 14 » / « 6 sur 10 » au lieu de 12) → vérifier à la validation.
- **Ligne de base T-1** : sans tableau de suivi du trimestre précédent injecté, l'axe « qui bouge » se réduit à une photo (pas de delta) — la comparaison cellule-à-cellule n'opère qu'à partir de T+1.

## Statut — *vérifié export + invite, 24 juin*
✓ schéma `cr1c3_PrdraftSnapshotconcurrentiel` · ✓ invocation `ExecuteCopilotAsyncV2` (message = matiere) · ✓ gate `## Points de décision` · ✓ table markdown 12 cabinets · ✓ `⬜≠❌` · ✓ brique pure (ni croisement ni positionnement).
