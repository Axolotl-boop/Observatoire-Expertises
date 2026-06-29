# Format — Veille emploi (v2.1)

*Brique `01-Matière-brute/Veille-emploi`. **Source pure (couche 3)** : le snapshot emploi lit la **structuration du métier** (intitulés, compétences, outils, séniorité/volume) au niveau **marché** — tous employeurs, jamais un candidat nommé. Cadence du snapshot : **trimestrielle** ; captation : **continue** ; rendu : **mensuel** au Format B. Sources **publiques uniquement, CGU-safe** (abonnement, pas de scraping).*

> **Ce qui change en v2 — séparation brique / croisement.** v1 croisait *à l'intérieur* du snapshot (newsletters / PAD / concurrence) et posait un « so what offre ». v2 **sort ces lignes du snapshot**, exactement comme la concurrentielle est passée en v3 : la brique redevient **pure** — `deltas par dimension · tags · tableau de suivi · lecture transverse`, et **rien d'autre**. Le **croisement et le positionnement migrent au Format B (couche 4)** : delta emploi × newsletters × PAD × concurrence → **Bloc 3 (skills/outils)** surtout, **Bloc 2 (tags)**, **Bloc 1 (positionnement)**.
>
> **Conséquence sur « la brique qui arbitre les tags ».** Le rôle de *test de réalité du discours* (une tendance vue en newsletter mais absente des annonces reste `[mode]` ; confirmée par le recrutement, elle monte) est un **croisement** → il s'exerce désormais **au Format B (Bloc 2)**. La brique ne pose plus ce verdict ; elle **fournit le fait dur** (« X apparaît / n'apparaît pas / monte dans les annonces »), que le Format B confronte au discours. Dans la brique, le tag se règle par la **convergence emploi-interne** (plusieurs boards + une étude qui pointent pareil), pas par le croisement externe.

---

## 1. Le principe — le delta dans le temps est le signal, pas la photo

Un relevé isolé d'annonces ne dit rien. **C'est l'évolution trimestre après trimestre qui est le signal** : quel intitulé apparaît ou grossit, quelle compétence devient exigée, quel outil se nomme, comment bouge la séniorité et le volume. D'où deux exigences :

- **Reproductibilité.** On **gèle un jeu de requêtes par expertise** (intitulés + variantes) et on le **rejoue à l'identique** chaque trimestre. On ne l'enrichit qu'en **signalant le changement** (sinon les deltas deviennent illisibles). Premier passage = **ligne de base** ; les vrais deltas se lisent à T+1.
- **Comportemental, niveau marché.** On lit ce que le marché **recrute réellement** (tous employeurs), pas ce que les éditeurs annoncent. C'est la surface la plus honnête de structuration d'un métier. *Le recrutement des **cabinets suivis** est, lui, déjà lu en surface ① du **snapshot concurrentiel** — pas de double collecte ici. La brique emploi est de niveau **marché**.*

**La force du signal vient de la convergence emploi-interne.** Un intitulé vu sur un seul board reste prudent (`[mode]`/`[tendance]`) ; le même confirmé sur plusieurs boards **et** corroboré par une étude marché = direction réelle, peut monter. Toute autre corroboration (newsletters, PAD, concurrence) se fait au Format B.

---

## 2. Les dimensions suivies — l'unité de delta

Le snapshot s'organise par **dimension** (stables, contrairement aux axes mouvants de la concurrentielle) :

1. **Intitulés** — rôles qui apparaissent / montent / fusionnent / disparaissent *(ex. « AI Product Manager », « Product Builder », fusion PM/PO)*.
2. **Compétences** — compétences nouvellement exigées qui montent *(ex. littératie LLM, orchestration d'agents, gouvernance data, model-based testing)*.
3. **Outils** — outils nommés dans les annonces *(ex. outil de prototypage IA côté PM, outil de test précis côté QA)*.
4. **Séniorité & volume** *(dimension structurelle forte côté emploi)* — la demande se séniorise ? augmente ? se raréfie ? salaires ? C'est souvent **ici** que se lit le signal `[structurel]` (un décrochage de volume, une séniorisation durable, confirmés par étude).

> Si une dimension n'a rien produit ce trimestre pour une expertise, on l'écrit franchement (« RAS ce trimestre ») plutôt que de fabriquer du delta. Une case vide honnête est une information.

---

## 3. Les surfaces & canaux observés — deux étages automatisés, un humain

| Canal | Surface | Apport | Auto ? |
|---|---|---|---|
| **A — Alertes d'offres** *(recherches sauvegardées par expertise, routées e-mail)* | annonces individuelles | **granularité** : intitulés, compétences, outils | ✅ captation |
| **B — Études & baromètres marché** *(RSS/newsletter)* | WTTJ Lab, Indeed Hiring Lab, APEC, France Travail, baromètres | **colonne quantitative** : volume, séniorité, salaires | ✅ captation |
| **C — Passe humaine** | LinkedIn saved searches, scans UI des boards sans alerte propre | signaux fins non routables (CGU) | ⬜ trimestriel |

**Mapping expertise → board spécialisé + slug** *(généralistes communs à toutes : APEC + WTTJ ; LinkedIn = Canal C)* :

| Expertise | slug | Board(s) spécialisé(s) — signal avancé |
|---|---|---|
| Product Management | `pm` | Lenny's Job Board · Mind the Product Jobs |
| Product AI | `productai` | Lenny's (filtre AI) · Mind the Product |
| Product Ops | `productops` | Lenny's · communautés Product Ops |
| PMM | `pmm` | PMA Jobs (Product Marketing Alliance) |
| QA | `qa` | Ministry of Testing Jobs |
| Data PM | `datapm` | board Data *(à confirmer)* + généralistes |

---

## 4. Les tags

- `[mode]` — un intitulé/buzz vu sur **un seul** board, sans corroboration. À surveiller, pas à acter.
- `[tendance]` — mouvement réel et **convergent** (plusieurs boards), pas encore irréversible.
- `[structurel]` — **faits durs seulement** : décrochage/hausse de volume confirmé par étude, séniorisation durable, salaire en rupture, intitulé devenu **catégorie standard** d'annonce. **Tout `[structurel]` est un candidat**, validé par un humain avant de remonter en convictions.

**Plafonds** : un intitulé / une compétence / un outil vus isolément plafonnent à `[tendance]`. **Force du signal = convergence emploi-interne** (boards + étude). La corroboration externe (newsletters, PAD, concurrence, State of X) qui ferait monter un signal se fait **au Format B**, pas ici.

---

## 5. Le tableau de synthèse (état daté) — et le *delta* au trimestre suivant

Au premier passage, c'est la **ligne de base**. Dès T+1, il fait qu'on lit *ce qui a bougé* au lieu de refaire la photo. Trois états, par item suivi (groupés par dimension) :
- **✅ présent** : capté ce trimestre (tag + date).
- **❌ absent-marginal** : item suivi, ~rien ce trimestre (le silence est une information — un intitulé qui *stagne* est un signal en soi).
- **⬜ pas de matière** : aucune captation injectée — à ne pas confondre avec un absent réel (à vérifier côté sourcing).

**Rendu = liste à puces littérale** (cf. gabarit ci-dessous), **jamais un tableau markdown**. Une puce par item suivi, groupées par dimension, champs séparés par « | » dans l'ordre `Dimension — item | état | tag | date`. Dans le snapshot, la section est nommée `## Tableau de synthèse (état daté)`.

- **Intitulés — AI Product Manager** | [✅/❌/⬜] | [tag] | [date]
- **Intitulés — Product Builder** | [✅/❌/⬜] | [tag] | [date]
- **Compétences — littératie LLM / agents** | [✅/❌/⬜] | [tag] | [date]
- **Outils — [à compléter]** | [✅/❌/⬜] | [tag] | [date]
- **Séniorité/volume — décrochage offres** | [✅/❌/⬜] | [tag] | [date]

Au trimestre suivant : on compare ligne à ligne ; **seules les cases qui ont changé** alimentent les deltas. Le reste est silence, et le silence est une information.

---

## 6. La lecture transverse

On clôt par **la structuration la plus nette du trimestre** pour cette expertise — candidate à remonter au **Bloc 3 du Format B** (et **Bloc 2** si elle challenge une conviction). Elle doit **émerger de la matière**, jamais être présupposée ; si elle ressort comme fait dur, on la marque candidat `[structurel]` à valider.

*(Ex. PM T2 2026 : la séniorisation du recrutement + l'installation de l'« AI Product Manager » comme catégorie réelle.)*

---

## 7. Les jeux de requêtes figés — par expertise *(à rejouer à l'identique chaque trimestre)*

> Sur **APEC + WTTJ + le board spécialisé** de l'expertise. Pour chaque requête : intitulés récurrents, **top compétences** exigées, **outils** nommés, mix de séniorité.

- **PM** *(figé)* : « Product Manager » (FR) · « Product Owner » (FR) · « Senior / Lead Product Manager » · « Head of Product » · « CPO / Chief Product Officer » · « AI Product Manager / Product Manager IA ».
- **Product AI** : « AI Product Manager » · « GenAI Product Manager » · « AI Product Lead » · « Product Manager IA / GenAI » · « Product Manager LLM / agents ».
- **Product Ops** : « Product Operations Manager » · « Product Ops » · « Head of Product Operations » · « Product Ops Lead ».
- **PMM** : « Product Marketing Manager » · « Senior / Lead PMM » · « Head of Product Marketing » · « Product Marketing Lead ».
- **QA** : « QA Engineer » · « Test Engineer » · « QA Lead / Manager » · « Quality Engineer » · « Test Automation Engineer » · « QA for AI / ML testing ».
- **Data PM** : « Data Product Manager » · « Data Product Owner » · « Analytics Product Manager » · « ML Product Manager ».

*(Jeux à figer au premier passage de chaque expertise, puis gelés. Tout ajout ultérieur est **signalé** dans le snapshot pour ne pas fausser les deltas.)*

---

## 8. Ce qui migre au Format B (couche 4)

Le snapshot emploi est un **intrant** du Format B, pas un livrable croisé. Au Format B se font :
- **Le croisement** : delta emploi × **newsletters** (le discours se traduit-il en demande réelle ? — c'est ici qu'on **arbitre** mode/tendance/structurel), × **PAD** (les compétences demandées recoupent-elles nos besoins de staffing et ce qu'on vend ?), × **concurrence** (le recrutement marché confirme-t-il les mouvements du snapshot concurrentiel ?), × **State of X**. → **Bloc 3** surtout, **Bloc 2** pour l'arbitrage.
- **Le so-what / positionnement** : un métier qui se structure = une offre à créer/ajuster ou un staffing à anticiper… ou « rien pour l'instant ». → **Bloc 1** (positionnement) & implications staffing.

Le Format B agrège, pour une expertise × un mois : fiches newsletters + synthèse PAD + **snapshot concurrentiel du trimestre** + **snapshot emploi du trimestre** (+ State of X en grounding).

---

## 9. Garde-fous & cadence

- **Captation à deux étages, continue** : (A) alertes d'offres par e-mail + (B) études/baromètres en RSS/newsletter, routées vers le point commun. Dépôt en sous-dossiers mensuels `Veille-emploi/AAAA-MM/`. *(Détail dans `Spec-flux-veille-emploi`.)*
- **Snapshot trimestriel** : assemblage de la matière des 3 mois → **agent de pré-draft** (emploi-pur, sans grounding) → **validation Axel**. Dépôt en **sous-dossier trimestriel** `Veille-emploi/AAAA-T#/Snapshot-emploi-[EXP]-T#-AAAA.md`.
- **L'agent pré-drafte, ne finalise jamais.** Axel valide — en priorité les candidats `[structurel]` (séniorité/volume surtout) et la lecture transverse.
- **Seuil de matière** global et par dimension : une dimension sans mouvement réel s'écrit « RAS ce trimestre ».
- **Sources publiques uniquement, CGU-safe, pas de scraping.** On s'abonne aux alertes ; LinkedIn et surfaces fines = **passe humaine** (Canal C). Le goulot n'est pas la collecte mais le **jugement**.
- **Pas de double collecte concurrence** : le recrutement des 12 cabinets est lu au snapshot concurrentiel (surface ①) ; la brique emploi est niveau **marché**. Le croisement des deux se fait au Format B.
- **Données au niveau rôle**, jamais de candidat nommé.
- **Un responsable** (aujourd'hui Axel) — condition de survie de la brique.

---

## Gabarit copiable — `Snapshot-emploi-[EXP]-T#-AAAA` (déposé dans `Veille-emploi/AAAA-T#/`)

```markdown
# Snapshot emploi — [EXP] — T# AAAA
> Rédigé par : pré-draft agent · À valider par : Axel
> Expertise : [PM | Product AI | Product Ops | PMM | QA | Data PM]
> Jeu de requêtes : [référence du jeu figé] · Boards : APEC · WTTJ · [board spé]
> Note : [1er passage = ligne de base / sinon delta vs T#-1]

## Seuil de matière
[OK — signaux convergents / ou : insuffisant, RAS sur dimension X]

## Deltas par dimension
- **Intitulés** : [apparaît / monte / fusionne / disparaît] · source · `[tag]`
- **Compétences** : [ce qui monte] · source · `[tag]`
- **Outils** : [ce qui apparaît] · source · `[tag]`
- **Séniorité / volume** : [volume, séniorisation, salaires si signal] · source · `[tag]`

## Lecture transverse
[La structuration la plus nette du trimestre → candidat Bloc 3 Format B (Bloc 2 si elle challenge une conviction). Candidat [structurel] si la matière le porte.]

## Tableau de synthèse (état daté)
- **Intitulés — [item]** | [✅/❌/⬜] | [tag ou —] | [AAAA-MM-JJ ou —]
- **Compétences — [item]** | [✅/❌/⬜] | [tag ou —] | [AAAA-MM-JJ ou —]
- **Outils — [item]** | [✅/❌/⬜] | [tag ou —] | [AAAA-MM-JJ ou —]
- **Séniorité/volume — [item]** | [✅/❌/⬜] | [tag ou —] | [AAAA-MM-JJ ou —]
<!-- Une puce par item suivi, groupées par dimension. États : ✅ présent / ❌ absent-marginal / ⬜ pas de matière (jamais « non applicable »).
     FORME : liste à puces littérale, « | » = séparateur de champ DANS la puce. PAS un tableau markdown (aucune ligne d'en-tête, aucune ligne « |---|---| »).
     CONTENU : pas de croisement item × dimension — le croisement vit au Format B. -->

## Points de décision pour Axel
- Verdicts [structurel] candidats à trancher : […]
- Dimensions à convergence limite (1 seul board) à confirmer : […]
- Items sans matière ce trimestre (à vérifier côté sourcing) : […]
- Évolution du jeu de requêtes signalée ce trimestre : […]
```

---
*Format v2.1 — supersede v1. Le croisement et le positionnement vivent au Format B. À faire évoluer après le premier trimestre en régime automatisé (assembleur trimestriel) et la première revue à 3 mois.*
*v2.1 (20 juin 2026) : tableau de synthèse normalisé en **liste à puces littérale** (`Dimension — item | état | tag | date`), suppression du tableau markdown du §5, états alignés sur l'état-daté (✅ présent / ❌ absent-marginal / ⬜ pas de matière), garde-fous contenu (croisement) et forme (pas de tableau markdown) séparés.*
