Briefing d'expertise — matériau sourcé à exploiter au point d'usage ; les [structurel] sont des candidats à corroborer.

| Expertise      | Période couverte | Cadence | Date de publication | Mode                  |
|----------------|------------------|---------|---------------------|-----------------------|
| QA             | 2026-06          | Mensuelle | 28/06/2026          | Briefing informatif   |

Matière mobilisée ce cycle :
☑ Newsletters
☑ Synthèse PAD
☑ Snapshot concurrentiel
☑ Snapshot emploi
☑ State of X
☐ REX (non présent)
Toutes les briques attendues sont présentes ; pas de trou de source signalé.

---

Bloc 1 — Problématiques clients récurrentes & positionnement offre.

- Problématiques clients récurrentes (PAD / REX) :
  1. **Demande QA en régie, centrée delivery et plateforme, peu de missions conseil dédiées QA**  
     · Ce que l'externe ajoute : Les newsletters et le snapshot concurrentiel ne relèvent pas de mouvement marché vers une QA spécialisée autonome ce mois ; la QA reste intégrée aux missions delivery, sans émergence d’offres conseil QA pures.  
     · Question pour creuser : « Dans vos projets actuels, la qualité logicielle est-elle traitée comme une responsabilité transverse ou attendez-vous une expertise QA dédiée ? »
  2. **Montée de la séniorité dans les profils demandés (Head/Directeur, Lead)**  
     · Ce que l'externe ajoute : Les benchmarks emploi et State of X confirment la structuration du marché autour de profils management (QA Manager, Head of QA), avec une densité notable pour un marché de taille modérée.  
     · Question pour creuser : « Quels enjeux de pilotage ou de transformation attendez-vous d’un profil QA senior ou manager dans votre organisation ? »
  3. **Automatisation des tests et outillage structurant (Jira/Confluence, analytics/KPI)**  
     · Ce que l'externe ajoute : Les newsletters et le snapshot emploi convergent sur l’automatisation comme compétence structurante, mais soulignent que l’automatisation sans cadre stratégique crée de la dette future.  
     · Question pour creuser : « Quels sont vos objectifs en matière d’automatisation des tests et comment arbitrez-vous entre automatisation et couverture manuelle ? »
  4. **Premiers signaux QA-for-AI (test de modèles ML/IA products)**  
     · Ce que l'externe ajoute : Les newsletters et le snapshot emploi identifient ce segment comme émergent mais encore étroit, avec une pression qualitative sur la compétence IA en QA.  
     · Question pour creuser : « Avez-vous des besoins spécifiques de test sur des produits ou modèles IA, et comment les adressez-vous aujourd’hui ? »

- Ce qu’en disent le marché & les concurrents :
  - Le snapshot concurrentiel montre que l’axe agentique (orchestration, gouvernance, test de systèmes IA) est investi par des cabinets Data/IA (Converteo, AI Builders), mais aucun cabinet QA ne se positionne explicitement sur la QA des systèmes agentiques ou la gouvernance QA de l’IA. Les newsletters confirment la montée de l’IA dans les pratiques produit, mais la QA reste cantonnée à l’exécution et à l’automatisation, sans offre conseil différenciante visible ce mois.

- Notre position, par axe concurrentiel pertinent :
  - [Axe Agentique] → on est en retard → « Aucun positionnement explicite sur la QA des systèmes agentiques ou la gouvernance QA de l’IA, alors que des cabinets Data/IA (Converteo, AI Builders) investissent ce terrain. [hypothèse — à valider] »
  - [Axe Gouvernance IA/conformité] → angle propre possible → « Aucun cabinet PM ou QA ne revendique la gouvernance IA appliquée à la QA ; un positionnement sur la conformité et la traçabilité QA en environnement IA pourrait constituer un différenciateur. [hypothèse — à valider] »
  - [Axe Verticalisation sectorielle] → alignés → « Les cabinets QA (Smartesting, KP2i) se positionnent sur des secteurs régulés (industrie, retail), mais sans offre QA-for-AI structurée ; nous sommes alignés sur la QA classique, mais l’angle IA reste à investir. [hypothèse — à valider] »

- So what offre :
  - Rien de neuf ce cycle sur l’offre QA pure : la demande reste intégrée à la delivery, sans émergence d’une offre conseil QA autonome. L’absence de positionnement QA sur l’agentique et la gouvernance IA constitue un espace d’offre candidat, à explorer si la demande se confirme.

---

Bloc 2 — Signaux qui challengent nos convictions.

1. Le volume de code généré par IA fait exploser la demande de test QA, mais l’impact réel des outils de test IA reste faible (seuls 17 % constatent un impact significatif ; l’essentiel des gains est incrémental). Source : State of Test Automation 2026 (Ranorex) [tendance].  
   - Croisement : Le snapshot emploi montre une émergence de QA-for-AI, mais le segment reste étroit ; les newsletters confirment la montée de l’IA dans les pratiques produit, sans bascule massive sur l’outillage QA.  
   - Conviction touchée : qa-06 — sens : challenge ↓ → piste : Challenger

2. La prime de carrière va à la posture stratégique/leadership plutôt qu’à l’exécution technique pure : prioriser leadership & stratégie = +10,6 % de revenu, s’appuyer sur la seule exécution technique = −13,8 %. Source : State of Testing 2026 (PractiTest) [tendance].  
   - Croisement : Le snapshot emploi confirme la densité de la couche management (QA Manager, Head of QA) et la demande de séniorisation.  
   - Conviction touchée : qa-02 — sens : renforce ↑ → piste : Renforcer

3. L’IA ne remplace pas le jugement du Quality Engineer, elle l’amplifie : les LLMs génèrent des cas de test et de la documentation, mais ne savent pas ce qui est critique pour le business ni décider d’un go/no-go. Source : newsletters 2026-06 + State of X 2026 (convergent, 2 sources) [tendance].  
   - Croisement : Les offres emploi ne demandent pas de QA autonome IA, mais la compétence IA en QA est signalée comme pénurique et à forte croissance (Seyos 2026).  
   - Conviction touchée : qa-06 — sens : renforce ↑ → piste : Renforcer

---

Bloc 3 — Skills / méthodes / outils à maîtriser.

- Ce qui monte :
  - Automatisation des tests (E2E, frameworks, scripting) — [tendance]  
    · Niveau concerné : socle (présent dans les annonces standard/junior et confirmé par Seyos 2026)
  - Encadrement d’équipe QA, management (QA Manager, Head of QA) — [tendance]  
    · Niveau concerné : séniorité (demande de profils management, visible sur 8+ entreprises WTTJ)
  - Test mobile et web (iOS/Android/Web) — [tendance]  
    · Niveau concerné : socle (présent dans les annonces standard)
  - QA-for-AI / test de modèles ML — [mode]  
    · Niveau concerné : séniorité (signal émergent, segment étroit, pression qualitative IA)

- Croisement emploi :
  - Le delta des offres va dans le sens d’une structuration bipartite (automation/fonctionnel) et d’une montée en management. Les intitulés QA Engineer, Test Automation Engineer, QA Manager sont dominants sur WTTJ et confirmés par Seyos 2026. Le segment QA-for-AI reste marginal mais identifié.

- Ce qu’on doit monter en compétence :
  - Renforcer la maîtrise des frameworks d’automatisation (formation continue, veille outils E2E).
  - Développer les compétences de management QA (leadership, pilotage d’équipe, reporting qualité).
  - Surveiller et anticiper la montée de la QA-for-AI (veille, formation IA appliquée au test).
  - Socle inchangé — prochain delta emploi au T3 2026.

---

Bloc 4 — Sujets éditoriaux & angles recommandés.

- Sujet → angle recommandé :  
  « Pourquoi la QA-for-AI reste un angle mort du marché conseil : état des lieux, signaux faibles et enjeux à venir »  
  · Sur quoi ça tient : Le snapshot concurrentiel T2 2026 montre qu’aucun cabinet QA ne se positionne sur la QA des systèmes agentiques ou la gouvernance QA de l’IA, alors que la demande de test sur code généré par IA émerge (State of Test Automation 2026, Ranorex ; snapshot emploi WTTJ/APEC). [tendance]
- Lien avant-vente :  
  Permet à un PAD d’ouvrir la discussion sur la maturité QA en environnement IA, d’identifier les besoins non couverts et de proposer un accompagnement différenciant sur la QA des systèmes IA, là où la concurrence n’est pas encore structurée.

---

Garde-fous : on ne résume jamais ; le croisement prime ; [structurel] = candidat à corroborer ; sponsoring ⚠ visible ; on fournit des pistes sans consacrer de conviction ; un signal isolé ≠ certitude.

Sources utilisées : Newsletters 2026-06, Synthèse PAD 06/2026, Snapshot concurrentiel 2026-T2, Snapshot emploi QA T2-2026, Signaux State of X 2026. Toutes les briques attendues sont présentes ; pas de trou de source signalé.



---

## Légende de confiance (compacte)

> **Tag** = ampleur du mouvement : `[mode]` surface · `[tendance]` mouvement réel · `[structurel]` changement de fond (baromètre/étude **+** donnée propriétaire). **Chip** = solidité de l'adossement : **⬤** notre data le porte (≥1 propriétaire : PAD/emploi/concurrence, croisé ou non) · **◐** convergence externe seule (marché aligné, rien en interne) · **◯** source unique. Les deux axes sont indépendants ; invariant : `[structurel] ⟹ ⬤`.

## Couche de confiance — posée par l'agent-annotateur

> Cette couche dit *sur quoi tient* chaque signal — elle ne valide rien. Un signal ◯ ou ◐ est une **piste à creuser**, pas un argument client. Une conviction ne naît que quand un humain la pose dans un deck/article.

**Indice de confiance du cycle** : Ancrage propriétaire : PAD (Bloc 1), snapshot concurrentiel (Blocs 1 et 4), snapshot emploi (Blocs 1, 2, 3, 4) ; le reste du cycle — newsletters et State of X — est externe-seul, non corroboré en interne ce mois ; 0 downgrade appliqué.

**Provenance par signal :**
- **[Bloc 1] ⬤ Demande QA en régie, centrée delivery, peu de missions conseil dédiées QA** — propriétaire : PAD, snapshot concurrentiel, newsletters
- **[Bloc 1] ⬤ Montée de la séniorité dans les profils demandés (Head/Directeur, Lead)** — propriétaire : snapshot emploi, benchmarks emploi, State of X
- **[Bloc 1] ⬤ Automatisation des tests et outillage structurant** — propriétaire : snapshot emploi, newsletters
- **[Bloc 1] ⬤ Premiers signaux QA-for-AI (test de modèles ML/IA products)** — propriétaire : snapshot emploi, newsletters
- **[Bloc 1] ⬤ Axe agentique/gouvernance IA : retard QA, Data/IA investissent** — propriétaire : snapshot concurrentiel, newsletters
- **[Bloc 1] ⬤ Axe gouvernance IA/conformité : différenciateur possible** — propriétaire : snapshot concurrentiel
- **[Bloc 1] ⬤ Axe verticalisation sectorielle : alignement QA classique, IA à investir** — propriétaire : snapshot concurrentiel
- **[Bloc 2] ⬤ Volume code IA : explosion demande test, impact outils IA faible** — croisement sur 1 axe (State of Test Automation 2026 [externe] × snapshot emploi [propriétaire]), newsletters
- **[Bloc 2] ⬤ Prime carrière à la posture stratégique/leadership** — croisement sur 1 axe (State of Testing 2026 [externe] × snapshot emploi [propriétaire])
- **[Bloc 2] ⬤ L’IA n’amplifie pas le jugement QA, ne le remplace pas** — croisement sur 1 axe (newsletters + State of X [externe] × offres emploi [propriétaire]), Seyos 2026 (chiffre directionnel)
- **[Bloc 3] ⬤ Automatisation des tests (E2E, frameworks, scripting)** — propriétaire : snapshot emploi, Seyos 2026 (chiffre directionnel)
- **[Bloc 3] ⬤ Encadrement d’équipe QA, management** — propriétaire : snapshot emploi, Seyos 2026 (chiffre directionnel)
- **[Bloc 3] ⬤ Test mobile et web (iOS/Android/Web)** — propriétaire : snapshot emploi
- **[Bloc 3] ⬤ QA-for-AI / test de modèles ML** — propriétaire : snapshot emploi, newsletters
- **[Bloc 4] ⬤ QA-for-AI angle mort marché conseil** — croisement sur 1 axe (snapshot concurrentiel [propriétaire] × State of Test Automation 2026 [externe] × snapshot emploi [propriétaire])

---

# PARTIE II — Cartes de restitution (surface)

### Carte — Avant-vente

**Demande QA en régie, centrée delivery, peu de missions conseil dédiées QA — cycle 2026-06**
- **On entend** : La demande QA reste intégrée à la delivery, peu de missions conseil QA pures → **ce que l'externe ajoute** : Newsletters et snapshot concurrentiel ne relèvent pas de mouvement marché vers une QA spécialisée autonome ce mois.
- **La question qui ouvre** : « Dans vos projets actuels, la qualité logicielle est-elle traitée comme une responsabilité transverse ou attendez-vous une expertise QA dédiée ? »
- **Face à Converteo, AI Builders** : bouge sur axe agentique → **notre angle** : « Aucun positionnement explicite sur la QA des systèmes agentiques ou la gouvernance QA de l’IA, alors que des cabinets Data/IA (Converteo, AI Builders) investissent ce terrain. [hypothèse — à valider] » · ⬤
- **Face à <tous cabinets PM/QA>** : bouge sur axe gouvernance IA/conformité → **notre angle** : « Aucun cabinet PM ou QA ne revendique la gouvernance IA appliquée à la QA ; un positionnement sur la conformité et la traçabilité QA en environnement IA pourrait constituer un différenciateur. [hypothèse — à valider] » · ⬤
- **Face à Smartesting, KP2i** : bouge sur axe verticalisation sectorielle → **notre angle** : « Les cabinets QA (Smartesting, KP2i) se positionnent sur des secteurs régulés (industrie, retail), mais sans offre QA-for-AI structurée ; nous sommes alignés sur la QA classique, mais l’angle IA reste à investir. [hypothèse — à valider] » · ⬤
- **Offre à déclencher** : Rien de neuf ce cycle sur l’offre QA pure : la demande reste intégrée à la delivery, sans émergence d’une offre conseil QA autonome. L’absence de positionnement QA sur l’agentique et la gouvernance IA constitue un espace d’offre candidat, à explorer si la demande se confirme.

**Montée de la séniorité dans les profils demandés (Head/Directeur, Lead) — cycle 2026-06**
- **On entend** : Structuration du marché autour de profils management (QA Manager, Head of QA) → **ce que l'externe ajoute** : Benchmarks emploi et State of X confirment la densité management pour un marché modéré.
- **La question qui ouvre** : « Quels enjeux de pilotage ou de transformation attendez-vous d’un profil QA senior ou manager dans votre organisation ? »

**Automatisation des tests et outillage structurant — cycle 2026-06**
- **On entend** : Automatisation comme compétence structurante, mais dette si absence de cadre stratégique → **ce que l'externe ajoute** : Newsletters et snapshot emploi convergent sur ce point.
- **La question qui ouvre** : « Quels sont vos objectifs en matière d’automatisation des tests et comment arbitrez-vous entre automatisation et couverture manuelle ? »

**Premiers signaux QA-for-AI (test de modèles ML/IA products) — cycle 2026-06**
- **On entend** : Segment émergent, pression qualitative IA → **ce que l'externe ajoute** : Newsletters et snapshot emploi identifient ce segment comme étroit mais en croissance.
- **La question qui ouvre** : « Avez-vous des besoins spécifiques de test sur des produits ou modèles IA, et comment les adressez-vous aujourd’hui ? »

### Carte — Contenus activables

**Sujet** : Pourquoi la QA-for-AI reste un angle mort du marché conseil : état des lieux, signaux faibles et enjeux à venir
- **Angle** : Aucun cabinet QA ne se positionne sur la QA des systèmes agentiques ou la gouvernance QA de l’IA, alors que la demande de test sur code généré par IA émerge.
- **Sur quoi ça tient** : Snapshot concurrentiel T2 2026 (propriétaire), State of Test Automation 2026 (Ranorex, externe), snapshot emploi WTTJ/APEC (propriétaire)
- **Verdict de publication** : publiable comme lecture/observation, pas comme vérité du cabinet — *dérivé du tag corrigé [tendance] + chip ⬤.*
- **Signal chaud à incarner** : Volume code IA : explosion demande test, impact outils IA faible ⬤

### Carte — Compétences × séniorité

**Automatisation des tests (E2E, frameworks, scripting) — QA — 2026-T2** · `[tendance]` · ⬤
- **Niveau** : **socle** — présent dans les annonces standard/junior et confirmé par Seyos 2026
- **Confirmation marché** : Annonces standard, Seyos 2026
- **Pour le catalogue** : Renforcer la maîtrise des frameworks d’automatisation (formation continue, veille outils E2E)

**Encadrement d’équipe QA, management — QA — 2026-T2** · `[tendance]` · ⬤
- **Niveau** : **séniorité** — demande de profils management, visible sur 8+ entreprises WTTJ
- **Confirmation marché** : WTTJ, Seyos 2026
- **Pour le catalogue** : Développer les compétences de management QA (leadership, pilotage d’équipe, reporting qualité)

**Test mobile et web (iOS/Android/Web) — QA — 2026-T2** · `[tendance]` · ⬤
- **Niveau** : **socle** — présent dans les annonces standard
- **Confirmation marché** : Annonces standard
- **Pour le catalogue** : Socle inchangé — prochain delta emploi au T3 2026

**QA-for-AI / test de modèles ML — QA — 2026-T2** · `[mode]` · ⬤
- **Niveau** : **séniorité** — signal émergent, segment étroit, pression qualitative IA
- **Confirmation marché** : Snapshot emploi, newsletters
- **Pour le catalogue** : Surveiller et anticiper la montée de la QA-for-AI (veille, formation IA appliquée au test)

### Carte — Convictions (à réaffirmer / réviser)

**QA — convictions · 2026-06**

▸ **`qa-06`** — « L’IA ne remplace pas le jugement du Quality Engineer, elle l’amplifie »
- **Pression(s) du cycle** :
  - ↓ Volume code IA : explosion demande test, impact outils IA faible ⬤ — convergent ↓
  - ↑ L’IA n’amplifie pas le jugement QA, ne le remplace pas ⬤ — convergent ↑
- **Décision** : ⟶ [ en attente ]

▸ **`qa-02`** — « La prime de carrière va à la posture stratégique/leadership plutôt qu’à l’exécution technique pure »
- **Pression(s) du cycle** :
  - ↑ Prime carrière à la posture stratégique/leadership ⬤ — convergent ↑
- **Décision** : ⟶ [ en attente ]