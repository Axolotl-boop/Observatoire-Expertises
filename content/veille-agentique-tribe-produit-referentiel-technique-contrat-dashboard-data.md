# Contrat `dashboard-data.json` — interface indexeur ↔ dashboard

**But.** L'indexeur (flux Power Automate, étape 2) produit ce fichier une fois par cycle et le dépose en SharePoint. Le dashboard le consomme : on remplace le `DASHBOARD_DATA`/`EXPS` codé en dur par `const DATA = await (await fetch('dashboard-data.json')).json();`.

**La décision structurante de ce contrat :** le statut **capté / silence** des sources **ne sort pas du digest**. Il se calcule à part, depuis les dossiers de captation. L'indexeur a donc **deux passes** : (1) le digest `.md` pour le contenu des blocs, (2) la captation pour le statut des sources.

---

## 1. Schéma cible (copiable)

```json
{
  "generatedAt": "16/06/2026",
  "expertises": [
    {
      "slug": "pm",
      "label": "Product Management",
      "date": "16 juin 2026",
      "mdName": "Format-B-PM-2026-06.md",
      "mdUrl": "https://wefiit.sharepoint.com/.../Format-B-PM-2026-06.md",
      "thinCycle": false,
      "confidenceSummary": "Ancrage propriétaire : PAD (Bloc 1) et emploi (Bloc 3) ; le reste — marché, State of X — est externe-seul, non corroboré en interne ce mois ; 2 downgrades.",
      "blocs": [
        {
          "n": "Bloc 1",
          "t": "Problématiques clients récurrentes & positionnement offre",
          "sigs": [ { "tag": "tend", "prov": ["non corroboré (newsletter)"], "vendor": "Atlassian", "theme": "valeur-vers-orchestration", "x": "texte du signal reformulé", "tagCorrige": true, "tagOrigine": "struct" } ],
          "croise": "texte de l'encart croisement",
          "conv": [ "So what offre", "texte du so-what" ],
          "srcs": [
            { "cat": "Pipe Commercial WeFiiT", "st": "ok" },
            { "cat": "Concurrence", "items": [ ["Thiga","ok"], ["Converteo","si"] ] },
            { "cat": "Newsletters", "items": [ ["Le Ticket","ok"], ["SVPG","si"] ] }
          ]
        }
      ]
    }
  ]
}
```

- `tag` ∈ `{ "mode", "tend", "struct", null }` — **après downgrade de l'agent-annotateur** (un `[structurel]` newsletter-backed a déjà été rétrogradé). **`null` hors Bloc 2** (les Blocs 1/3/4 ne portent pas de tag de maturité, v4.3).
- `tagCorrige` (v4.3) = `true` **uniquement** sur un signal dont l'annotateur a **réellement abaissé** le tag (downgrade) ; **clé absente** sinon, et **jamais sur un tag inchangé** (`[tendance]`→`[tendance]` n'est pas une correction — bug observé au run 2026-06, fermé par la garde no-op du prompt v1.5). Permet au dashboard de **badger** le downgrade.
- `tagOrigine` (v0.5) = tag **avant** correction (`"struct"`/`"tend"`/`"mode"`), présent **uniquement** quand `tagCorrige` l'est. Permet au décompte déterministe de **valider** un downgrade (sév. `tagOrigine` > sév. `tag`) et d'écarter les no-op (`Spec-decompte-deterministe` R3).
- `theme` (v0.5) = clé de **dé-duplication du signal de fond transverse**, posée par l'annotateur sur **chaque** sig depuis un **registre contrôlé** (amorcé à `"valeur-vers-orchestration"`), `null` par défaut. Le décompte déterministe groupe par `theme` pour qu'un signal traversant plusieurs expertises/blocs ne compte qu'une fois (`Spec-decompte-deterministe` R1). N'affecte pas l'affichage par expertise.
- `st` ∈ `{ "ok" (capté), "si" (silence) }` — **« non branché » n'est jamais émis**, donc jamais affiché.
- `prov` (v4.2, **revu v4.3**) = tableau d'**annotations de provenance** posées par l'agent-annotateur, **étiquettes positives** : `"propriétaire : PAD"`, `"croisement sur 1 axe"` (exige toujours un côté interne), `"non corroboré (newsletter | source unique | chiffre directionnel | convergence externe)"`, `"convergence multi-cabinets"`, etc. → alimente la couche de confiance. `[]` si aucune réserve. **Machine-comptable** : c'est sur ce champ que le dashboard calcule le décompte exact (cf. `confidenceSummary`).
- `vendor` (v4.2) = nom de l'acteur si le signal porte un flag `⚠ poussé par <acteur>`, sinon `null`. Affiché en clair (jamais blanchi).
- `thinCycle` (v4.2) = `true` si le cycle est maigre (remplace `thresholdMet`/`reportSentence` — report abandonné). La déclaration en clair vit dans le contenu du digest.
- `confidenceSummary` (v4.2.1, **revu v4.3 : QUALITATIF**) = **indice de confiance global du digest**, posé par l'agent-annotateur. **Phrase qualitative, jamais une note ni un décompte chiffré** : il **nomme** l'ancrage propriétaire, dit ce qui est externe-seul, donne le nombre de downgrades (« Ancrage propriétaire : PAD (B1), emploi (B3) ; reste externe-seul non corroboré ; 2 downgrades »). Affiché en tuile en tête de l'expertise. **Pourquoi pas de chiffres** : 3 tests ont montré qu'un LLM ne recompte pas fiablement ses propres annotations ; **le décompte exact (croisements, non-corroborés) est calculé en DÉTERMINISTE par le dashboard sur les `sigs[].prov`** — pas par l'annotateur. Il **n'atteste pas** la solidité (un croisement fabriqué reste possible — limite assumée, SPECS §6).
- `conv` = `[label, texte]`. Label libre par bloc : `So what offre` / `Conviction — à challenger` / `So what méthode` / `So what édito`.

---

## 2. Provenance — qui remplit quoi

| Champ | Source | Comment |
|---|---|---|
| `generatedAt`, `date`, `mdName`, `mdUrl` | **fichier digest** | nom + emplacement SharePoint du dernier `Format-B-<EXP>-AAAA-MM.md` ; `date` = champ « Date de publication » de l'en-tête |
| `slug`, `label`, `n`, `t` | **fixe** | 6 expertises × 4 blocs (constantes, pas extraites) |
| `thinCycle` | **digest** | `true` si le digest se déclare maigre (report abandonné v4.2) |
| `sigs`, `croise`, `conv` | **digest** | contenu des blocs — **voir §4 (décision à trancher)** |
| `sigs[].prov`, `sigs[].vendor`, `sigs[].theme`, `sigs[].tagCorrige`, `sigs[].tagOrigine`, `tag` après downgrade, `confidenceSummary` (qualitatif) | **agent-annotateur** | downgrades (+ `tagOrigine`) + provenance par signal + `theme` transverse + `tagCorrige` + **indice qualitatif**, posés en **une seule passe** post-génération (v4.2.1, indice revu qualitatif v4.3, `theme`/`tagOrigine` v0.5) ; c'est aussi l'annotateur qui sérialise le `[[DASH_JSON]]` |
| **décompte exact** (croisements, non-corroborés, downgrades, sources propriétaires) | **dashboard (déterministe)** | calculé sur `sigs` à l'affichage — **pas par le LLM** (v4.3) — selon les **3 règles** de `Spec-decompte-deterministe` : R1 dé-dup par `theme`, R2 validité de croisement (≥2 catégories dont ≥1 propriétaire, Emploi absorbe ses baromètres), R3 downgrade réel (sév. `tagOrigine` > sév. `tag`) |
| `srcs[].st` (capté/silence) | **captation** | calcul déterministe, §3 — **jamais le digest** |
| `srcs` (catégories par bloc) | **fixe** | mapping bloc → catégories, §3.0 |

---

## 3. Passe captation — statut des sources (déterministe, implémentable tout de suite)

### 3.0 Mapping bloc → catégories (fixe, dérivé du template Format B v2.1)

- **Bloc 1** : Pipe Commercial WeFiiT · Concurrence · Newsletters
- **Bloc 2** : Concurrence · State of X · Emploi · Newsletters
- **Bloc 3** : Newsletters · Concurrence · Emploi
- **Bloc 4** : Newsletters

> ⚠ Aligner le `srcFor()` du prototype : aujourd'hui le Bloc 3 montre State of X au lieu de Concurrence, et le Bloc 2 n'inclut pas Newsletters. À corriger pour coller au croisement décrit par bloc dans le template.

### 3.1 Règle générale

Pour chaque source de la **liste de référence** d'une catégorie : une fiche / un signal lui est-il attribué dans le dossier de captation **du cycle** ?
- **Oui → `ok` (capté).**
- **Non → `si` (silence)** — branchée, rien ce cycle.
- **Absente de la liste de référence → non affichée** (non branchée).

### 3.2 Par catégorie — liste de référence + dossier scanné

| Catégorie | Liste de référence | Dossier du cycle | Capté = |
|---|---|---|---|
| **Newsletters** | les 7 abonnements (§3.3) | `Newsletters-pré-digérées/AAAA-MM/` | ≥1 fiche taguée du slug ce mois |
| **Pipe Commercial WeFiiT** | la synthèse PAD du mois | `Notes-PAD-retraitées/AAAA-MM/` | synthèse présente |
| **Concurrence** | les 12 cabinets | `Veille-concurrentielle/AAAA-T#/` | ≥1 fiche du cabinet ce trimestre |
| **Emploi** | APEC · Noé · Seyos · LPC | `Veille-emploi/AAAA-T#/` + `Rapports-Emploi/` | source présente dans le snapshot du trimestre |
| **State of X** | rapports mobilisés | grounding / `Rapports-State-of-X/` | rapport présent |

### 3.3 Mapping newsletters (référence + needle d'attribution)

| Newsletter | Needle = **adresse expéditeur complète** | slug |
|---|---|---|
| The Beautiful Mess | `cutlefish@substack.com` | `beautifulmess` |
| SVPG | `info@svpg.com` | `svpg` |
| Le Ticket | `contact@le-ticket.fr` | `leticket` |
| Ravi Mehta | `ravimehta@substack.com` | `ravimehta` |
| Product Ops Confidential | `practicalproductops@substack.com` | `productops-confidential` |
| Yeita | `pauline.egea@yeita.fr` | `yeita` |
| The Setups | `thesetups@substack.com` | `thesetups` |

> ⚠ **Piège Substack** : 4 needles partagent `@substack.com` (local-parts différentes) → le matching doit porter sur l'**adresse complète**, jamais le domaine, sinon collision et attribution fausse.
> ⚠ **Yeita = double chapeau** (conseil/formation Produit, pas seulement un média). Si elle entre un jour en watch-list concurrence, prévoir un dédoublonnage pour éviter de compter son signal deux fois.

---

## 4. Décision à trancher — comment le **contenu des blocs** entre dans le JSON

Le digest `.md` (Format B v2.1) et le modèle d'affichage du dashboard **divergent** : le Bloc 2 porte un croisement + une conviction **par signal**, alors que le dashboard attend **un** `croise` + **un** `conv` par bloc ; les Blocs 1 / 3 / 4 sont des bullets thématiques fixes (PAD, marché, position, So what…). Donc `sigs` / `croise` / `conv` **ne se lisent pas 1:1** dans le markdown.

Deux voies :

- **Voie A — parser le markdown.** L'indexeur découpe par `## Bloc N`, repère `**Signal N — … · [tag]**`, `- **So what offre** :`, etc. Faisable car le squelette est littéral — mais fragile au moindre écart de l'agent, et le projet évite par principe de fiabiliser par *instruction de parsing* plutôt que par *contrainte de forme*.

- **Voie C — l'agent émet la structure (recommandé).** En plus du markdown lisible (pour le KR Owner), l'agent Format B ajoute en tête/pied un bloc **front-matter** (YAML ou JSON) que l'indexeur lit tel quel, sans parser la prose. Aligné avec le principe « on contraint la forme, on n'instruit pas ». Coût : un ajout au prompt `Pré-draft Format B`. Le markdown lisible ne change pas.

**Reco : Voie C.** C'est la prochaine micro-décision avant de câbler le flux. **Figé v4.2.1** : le bloc `[[DASH_JSON]]` est émis **par l'agent-annotateur** (passe unique post-génération) — il porte déjà les downgrades, `prov`/`vendor` et `confidenceSummary`, donc il produit le JSON dans son état final, prêt à indexer. Le générateur ne le touche pas.

---

## 5. Sortie & garde-fous

- **Une écriture par cycle** → `dashboard-data.json` déposé en SharePoint. Emplacement exact = arbitrage hébergement (lié à l'accès Pierre-Louis Auger).
- **Cycle maigre** → `thinCycle=true` ; le digest se déclare maigre en clair, le bloc reste lisible (pas de report muet — `[[REPORT_TRIMESTRIEL]]` abandonné v4.2).
- **À vérifier au 1er run câblé** (PM) : que la voie retenue (A ou C) colle au digest réellement produit **et annoté** — guetter le drift template ↔ sortie agent ↔ annotateur.

---
*Contrat v0.5 — interface indexeur ↔ dashboard. **v0.5 (ajout des champs du décompte déterministe)** : `theme` (dé-dup du signal de fond transverse, registre contrôlé) et `tagOrigine` (validation des downgrades + garde no-op) ajoutés aux `sigs` ; le décompte exact suit les **3 règles** de `Spec-decompte-deterministe` (R1 thème, R2 croisement, R3 downgrade) ; `tagCorrige` durci (jamais sur tag inchangé). **v0.4 (v4.3, au câblage de l'annotateur)** : `confidenceSummary` passe de chiffré à **qualitatif** ; **décompte exact = responsabilité déterministe du dashboard** sur `sigs[].prov` (un LLM ne recompte pas fiablement) ; `non corroboré` = label positif ; clé `tagCorrige` ajoutée ; `tag: null` hors Bloc 2. **v0.3 (v4.2.1)** : ajout `confidenceSummary` ; `[[DASH_JSON]]` figé **émis par l'annotateur** en **passe unique**. **v0.2 (v4.2)** : `prov`/`vendor` (couche de confiance), `thinCycle` remplace `thresholdMet`/`reportSentence`. Pose le schéma, la provenance à trois sources (digest / annotateur / captation), et la décision A/C. Référencé dans les SPECS.*
