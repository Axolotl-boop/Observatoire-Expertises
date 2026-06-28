# Synthèse de la demande — 06/2026

*Brique propriétaire `Notes-PAD-retraitées` — la demande réelle, dérivée du pipe commercial Boond.*

| | |
|---|---|
| **Source** | Pipe commercial Boond (delta mensuel) |
| **Période** | détections du mois : 06/2026 |
| **Volume** | 83 opportunités · 33 clients distincts |
| **Méthode** | filtre par date de détection · agrégats par script · lecture du sous-ensemble conseil |
| **Garde-fous** | Anonymisé. Classification par expertise **approximative**. **Brouillon à relire** avant validation. |

> **À relire avant diffusion.** Synthèse générée automatiquement à partir du pipe. Elle rapporte la demande, elle ne décide pas de l'offre — le croisement et le jugement se font au Format B.

---

## 1. Vue d'ensemble

83 opportunités détectées ce mois, réparties sur 33 clients distincts. La demande est très majoritairement en **régie** (77 sur 83), le conseil ne représente que 6 lignes.

**Répartition d'état côté régie :** 15 gagnées, 20 perdues ou abandonnées, 42 actives. **Côté conseil :** 1 gagnée, 0 perdue/abandonnée, 5 actives. La domination du statut « actif » est normale : la quasi-totalité des opportunités vient d'être détectée, elles n'ont pas encore eu le temps d'être résolues. **Le taux de transformation mensuel n'a donc pas de sens statistique sur cette fenêtre** — les ratios gagnés/perdu ne seront interprétables qu'à l'échelle trimestrielle, lors de la re-synthèse complète.

---

## 2. La demande de régie

### Mix par expertise

| Expertise | Mentions |
|---|---|
| Product Management | 62 |
| QA | 42 |
| Product AI | 26 |
| Data PM | 7 |
| PMM | 6 |
| Product Ops | 4 |

**Product Management** domine sans surprise. **QA** (42 mentions) est à lire avec précaution : le repérage automatique compte le mot « recette », très fréquent dans les contextes delivery ; QA doit être traité comme une composante transversale des missions, non comme une demande spécialisée autonome — les descriptions conseil ne confirment pas de mission QA dédiée ce mois. **Product AI** (26) constitue le deuxième signal fort et cohérent avec le vocab. **Data PM**, **PMM** et **Product Ops** restent marginaux en volume.

### Profils et séniorité

| Séniorité | Occurrences |
|---|---|
| Head / Directeur | 18 |
| Lead | 14 |
| Junior | 11 |
| Confirmé | 10 |
| Coach | 6 |
| Senior | 3 |
| Principal | 2 |

La demande est tirée vers les **profils seniors et de pilotage** : Head/Directeur (18) et Lead (14) cumulent 32 occurrences sur 64 mentions séniorité, soit la première masse. Les profils junior et confirmé existent (11 + 10) mais restent secondaires. Les profils Coach (6) et Principal (2) représentent des segments étroits.

### Compétences et contexte (vocab)

| Signal | Occurrences |
|---|---|
| delivery | 34 |
| plateforme | 30 |
| discovery | 25 |
| jira/confluence | 19 |
| analytics/kpi | 19 |
| ux/design | 18 |
| agile/scrum | 17 |
| roadmap | 16 |
| b2c | 9 |
| okr | 6 |
| b2b | 4 |
| saas | 2 |

**Delivery** (34) et **plateforme** (30) dominent, signalant une demande centrée sur des contextes à forte complexité opérationnelle. **Discovery** (25) est significatif et indique que les clients ne cherchent pas seulement de l'exécution. **Analytics/KPI** (19) et **jira/confluence** (19) sont des marqueurs d'environnements structurés. Les signaux B2C (9) l'emportent sur B2B (4) ce mois ; SaaS reste anecdotique (2).

---

## 3. La demande de conseil

6 lignes conseil ce mois — échantillon réduit. Deux fiches n'ont pas de description renseignée et ne permettent pas d'analyse de contenu. Les 4 fiches documentées font ressortir trois motifs distincts.

### Motif 1 — IA dans le cycle de design produit *(P1 - Bouillant)*
Mission de conseil la plus avancée et la plus détaillée du lot. Le besoin couvre deux volets imbriqués : **(a)** rétro-documentation technico-fonctionnelle d'un périmètre produit, augmentée par agrégation de sources hétérogènes (code, specs, userflows, bases de connaissance) et structurée pour être requêtable par des agents IA ; **(b)** mise en place d'un **framework agentique sur la chaîne de conception produit** (structuration du discovery, rédaction des artefacts — PRD, Design Requirement Document, artefacts Data —, découpage en features, voire implémentation). L'outillage LLM n'est pas encore figé. L'environnement de travail est Atlassian (avec migration cloud prévue). L'objectif immédiat est un MVP sur un périmètre « greenfield » borné. Mission clairement hybride conseil / Product AI.

### Motif 2 — Coaching collectif PMM / montée en posture stratégique *(P2 - Chaud)*
Une équipe PMM, historiquement positionnée sur l'opérationnel (go-to-market, support aux ventes, veille), cherche à **passer à une posture stratégique** : définition du positionnement offre, logique de pricing, leadership vis-à-vis du top management. Le besoin porte aussi sur **l'harmonisation de pratiques** au sein d'une équipe issue de deux entités fusionnées. Format exprimé : coaching collectif en présentiel, calendrier envisagé en fin d'été / début d'automne. Aucun concurrent cité sur cette opportunité.

### Motif 3 — Acculturation PM à l'éco-conception *(P2 - Chaud)*
Accompagnement de PM pour **intégrer l'éco-conception dans la stratégie et le chiffrage produit**, dans le cadre d'une démarche de labellisation numérique responsable (référentiel RGESN). Les PM sont ciblés comme porteurs du sujet en interne, en vue de présenter des résultats devant leur direction. Signal sectoriel identifiable dans la description (logistique / livraison) — observation qualitative, non généralisable.

### Motif 4 — Data PM / repositionnement de la donnée dans le cycle produit *(Détecté)*
Équipes PO très orientées delivery, donnée traitée de manière réactive (support, tickets). Le besoin exprimé est celui d'un **profil Data PM** capable de : porter un diagnostic sur l'organisation et les rôles, exploiter les KPI existants, formuler et tester des hypothèses, et **acculturer les PO à une pratique data plus amont**. Logique d'immersion souhaitée plutôt que d'intervention externe ponctuelle. Trois volets envisagés : conseil (diagnostic), formation/acculturation, contribution opérationnelle directe.

---

## 4. Concurrents cités

| Cabinet | Occurrences dans les descriptions |
|---|---|
| Thiga | 4 |
| Octo | 3 |
| Capgemini | 2 |
| Yield | 1 |
| Converteo | 1 |
| Theodo | 1 |

Ces noms apparaissent **cités dans les descriptions d'opportunités** — ils signalent que nous opérons dans la même orbite que ces acteurs sur ces dossiers, pas nécessairement que nous les avons affrontés directement en appel d'offres. Aucune conclusion win/loss ne peut être tirée de ces occurrences.

---

## 5. Signaux saillants pour le croisement

1. **La demande agentique dans le cycle de design produit émerge en conseil** : une opportunité chaude porte explicitement sur la mise en place d'un framework agentique (discovery, rédaction d'artefacts, voire implémentation). À croiser avec les newsletters traitant de l'adoption des LLM dans les pratiques Product — pour vérifier si ce besoin est un cas isolé ou un signal de diffusion.

2. **Le mot « plateforme » est le deuxième vocab le plus fréquent en régie (30 occurrences), couplé à « delivery » (34)** : cela suggère une concentration de la demande sur des contextes de produits à forte complexité technique et/ou multi-périmètres. À confronter aux signaux sectoriels des newsletters pour identifier d'éventuelles verticalités.

3. **L'éco-conception comme compétence PM attendue apparaît pour la première fois dans le conseil** : la demande de coaching PM autour du numérique responsable est un signal faible et isolé. À surveiller dans les prochains deltas pour voir s'il se répète, avant toute conclusion.

4. **La séniorité Head/Directeur domine en régie (18 occurrences, premier rang)** : la demande n'est pas cantonnée à des profils d'exécution. À confronter aux contenus newsletters sur le positionnement senior des cabinets produit pour évaluer la cohérence de l'offre.

---

## 6. Garde-fous & limites

- **Classification approximative** : les expertiseMentions sont issues d'une détection lexicale, pas d'une lecture humaine de chaque fiche.
- **QA surévalué** : 42 mentions incluent le mot « recette » courant en delivery. QA ne doit pas être lu comme une demande spécialisée ce mois — les descriptions conseil ne le confirment pas.
- **Concurrents = présence dans l'orbite**, non un score de confrontations directes gagnées ou perdues.
- **Pas de dimension secteur/taille** : absente de la source. Les seules observations sectorielles proviennent de la lecture qualitative des descriptions conseil et sont signalées comme telles.
- **Conversion mensuelle non significative** : la majorité des opportunités est « actif » car fraîchement détectée. Les tauxTransfoPct du mois sont à ignorer ; la re-synthèse trimestrielle est le bon niveau d'interprétation.
- **Échantillon mensuel petit** : 83 lignes dont 6 conseil. Les tendances observées ici restent fragiles — aucune généralisation.

---

*Synthèse mensuelle auto — à relire. Re-synthèse complète trimestrielle pour rattraper conversions et pertes.*