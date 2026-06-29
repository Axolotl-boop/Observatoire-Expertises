# Fiche module — `Pré-draft Snapshot emploi` (agent)

> **Type** : agent **Copilot Studio** (matière-injectée + **grounding PDF**), invoqué par flux  ·  **Couche** : 3
> **État** : 🟢 validé 6/6 · **Version** : v3.2 (squelette puce littéral + 3 clauses d'attribution + clause D)
> **Schéma agent** : `cr1c3_PrdraftSnapshotemploi` · invoqué via `ExecuteCopilotAsyncV2` (`shared_microsoftcopilotstudio`)
> **Invoqué par** : `Assembleur Snapshot emploi` (dans le `Do until` de la `Boucle_expertise`)

## Rôle
Assembler la matière emploi d'un **trimestre** pour **UNE** expertise → un **snapshot par dimension** : la **photographie datée** de la demande, niveau marché. **Brique pure** : ne croise rien (→ Format B). Pré-draft, Axel tranche.

## Place dans la chaîne
- **Reçoit de** : l'assembleur — `body/message` = `variables('matiere')` (fiches de captation Cowork du trimestre, concaténées) **+ grounding** : baromètres `Rapports-Emploi/` (PDF).
- **Produit pour** : `snapshotText` (`body/lastResponse`), gardé par `## Points de décision` (+ `Condition` de l'assembleur) → `Snapshot-emploi-<slug>-T#-AAAA.md`.

---

## Cœur technique — *AGENT / PROMPT*

### Plateforme & E/S
- **Copilot Studio**, **hybride** : matière `.md` **injectée** dans le `message` + **grounding PDF** des baromètres. *(C'est le **seul** agent du système avec du grounding actif — possible car ce sont des **PDF**, indexables par M365 contrairement au `.md`.)*
- **Entrée** : `message` = en-tête (Expertise · Trimestre · Boards · Note ligne-de-base/delta) + concat des mini-fiches. **Grounding** : baromètres de `Rapports-Emploi/` (TPC, Seyos, Noé, APEC, LPC).
- **Sortie** : snapshot v3 complet, clos par **`## Points de décision pour Axel`** (= gate de complétude).

### Deux sources, deux usages
- **Mini-fiches de captation** (offres, couche recherche WTTJ/Indeed/APEC/board spé) → l'**état du marché** par dimension.
- **Baromètres / études** (groundés) → la **structuration** (pyramide des rôles, volume, géo, santé du marché, pénurie) — **jamais le salaire**.

### ⚠️ Hors périmètre — salaire
**Aucune grille, fourchette, TJM ni montant.** L'objet est « comment le métier se structure », pas « combien il gagne ». D'un baromètre salarial on ne tire que le **signal de structuration** (« compétence X en tension » = pénurie), jamais le chiffre.

### Principe v3 — photographie / état daté
- **La photographie complète EST le livrable.** Par dimension : l'état daté (présent / dominant / émergent / marginal / absent). Le **delta vs T-1** se lit en plus dès T+1, **jamais** comme colonne vertébrale.
- **Convergence = force du signal** (1 board = prudent ; multi-boards → `[tendance]`). Le **chiffré et le `[structurel]` viennent des baromètres**, pas des offres.
- La **structuration transverse émerge** de la matière (jamais plaquée).

### Discipline d'attribution (clauses)
- **Provenance obligatoire** : toute structuration tirée d'un baromètre le **nomme** (« pyramide APM→PM→Lead — Noé + Seyos 2026 »).
- **Triangulation** : populations différentes (auto-déclaratif TPC/Noé vs recruteur Seyos) → jamais un constat sur source unique posé en vérité ; pour un `[structurel]`, privilégier le **grand-N** (TPC, APEC).
- **Échelle graduée = position, jamais un cran** (curseur Seyos « commun·recherché·perle rare » → rendre « entre recherché et perle rare »).
- **Grand-N ≠ directionnel** (chiffre d'enquête large = autorité ; chiffre de billet/talk = directionnel).
- **Ne jamais fusionner des métriques distinctes d'une même source** (APEC : offres ≠ recrutements réalisés ≠ services VA).

### Tags (prudents)
`[mode]` (buzz isolé) · `[tendance]` (convergent multi-boards ; **plafond des offres seules**) · `[structurel]` (faits durs de **baromètre uniquement** : volume chiffré, séniorisation confirmée, intitulé devenu catégorie standard = **candidat**). **1er passage** : pas de `[structurel]`-par-transition ; une **taxonomie établie** (pyramide, « AI Product Manager ») = ligne de base, **pas un événement** → ne pas tagger candidat à la 1re photo.

### Format de sortie *(fait foi : `Format-veille-emploi` v2.1)*
`# Snapshot emploi — [EXP] — T# AAAA` → en-tête → `## Seuil de matière` → `## Photographie par dimension` (Intitulés · Compétences · Outils · Séniorité/volume/structure) → `## Lecture transverse` → `## Tableau de synthèse` → **`## Points de décision pour Axel`**.
- **Impératif : émettre TOUJOURS le snapshot complet**, même sur matière mince (remplir `⬜`/`❌`, « Seuil insuffisant ») — jamais de réponse vide.
- ⚠️ **Tableau de synthèse = liste à puces LITTÉRALE** (champs séparés par `|` *dans* la puce, ordre `Dimension — item | état | tag | date`). **PAS un tableau markdown** (jamais d'en-tête, jamais de `|---|`). États : `✅` présent / `❌` absent-marginal / `⬜` pas de matière. *(C'est le correctif racine « squelette littéral vs décrit » — un LLM rend en table ce qu'on lui décrit comme table ; on impose donc la puce.)*

---

## Dépendances & renvois
- **Amont** : `Fiche-Captation-emploi-Cowork` + corpus `Rapports-Emploi/` (grounding).
- **Invoqué par / aval** : `Fiche-Assembleur-Snapshot-emploi`.
- **Docs fait-foi** : **invite Copilot `cr1c3_PrdraftSnapshotemploi`** · **`Format-veille-emploi` v2.1** · **SPECS §6/§9**.

## Points d'attention / dette
- **Rendu en table markdown au 1er run** (au lieu des puces littérales) = le défaut historique corrigé par v3.2/v2.1 → **surveiller la « table-ification » au 1er run T3** ; fallback = swapper le délimiteur (`|` → middot).
- **`[structurel]` sur-taggé** sur taxonomie établie au 1er passage = écart historique → la règle « taxonomie = ligne de base » la couvre, vérifier à la validation.
- **Set T2 verrouillé** : ne pas re-run l'assembleur sur T2 sans re-spot-check (sortie déjà validée).
- **Pas de double collecte concurrence** : le recrutement des cabinets suivis se lit au snapshot **concurrentiel** ; ici = **marché** (les deux briques emploi restent distinctes).

## Statut — *vérifié export + invite, 24 juin*
✓ schéma `cr1c3_PrdraftSnapshotemploi` · ✓ invocation `ExecuteCopilotAsyncV2` (message = matiere) · ✓ grounding PDF `Rapports-Emploi/` (seul agent grounded) · ✓ salaire hors périmètre · ✓ tableau en **puces littérales** (pas markdown) · ✓ gate `## Points de décision`.
