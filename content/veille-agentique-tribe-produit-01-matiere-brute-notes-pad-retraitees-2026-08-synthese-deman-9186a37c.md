# Synthèse de la demande — août 2026

*Brique propriétaire `Notes-PAD-retraitées` — la demande réelle, dérivée du pipe commercial Boond.*

| | |
|---|---|
| **Source** | Pipe commercial Boond (delta mensuel) |
| **Période** | détections du mois : août 2026 |
| **Volume** | 30 opportunités · 22 clients distincts |
| **Méthode** | filtre par date de détection · agrégats par script · lecture du sous-ensemble conseil |
| **Garde-fous** | Anonymisé. Classification par expertise **approximative**. **Brouillon à relire** avant validation. |

> **À relire avant diffusion.** Synthèse générée automatiquement à partir du pipe. Elle rapporte la demande, elle ne décide pas de l'offre — le croisement et le jugement se font au Format B.

---

## 1. Vue d'ensemble

Le mois compte **30 nouvelles opportunités**, réparties sur **22 clients distincts** — soit en moyenne un peu plus d'une opportunité par client, sans concentration apparente.

**La régie domine très largement** : 27 opportunités sur 30. Le conseil représente 3 opportunités, ce qui est cohérent avec son positionnement minoritaire dans le pipe.

**Répartition d'état :**

- *Régie* : 2 gagnées · 3 perdues/abandonnées · **22 actives** (soit ~81 % en cours)
- *Conseil* : 1 gagnée · 1 perdue/abandonnée · 1 active

La quasi-totalité des opportunités est en statut **« actif »**, ce qui est parfaitement normal pour des détections fraîches : elles viennent d'entrer dans le pipe et n'ont pas eu le temps d'être résolues. **Le taux de transformation mensuel n'a donc aucune signification statistique ici** — il sera traité dans la re-synthèse trimestrielle, qui intègre l'historique des conversions et pertes sur durée suffisante.

---

## 2. La demande de régie

### Mix par expertise *(mentions, non exclusives)*

| Expertise | Mentions |
|---|---|
| Product Management | 20 |
| QA | 12 |
| Product AI | 11 |
| PMM | 4 |
| Product Ops | 4 |
| Data PM | 1 |

**Product Management reste l'expertise la plus citée**, de loin. **Product AI** est solidement ancré en deuxième position (11 mentions), ce qui confirme la présence croissante de l'IA dans les demandes de régie.

> ⚠️ **Nuance QA** : les 12 mentions QA sont vraisemblablement surévaluées — le terme « recette » apparaît fréquemment dans les contextes delivery sans signifier une demande de spécialiste QA. Aucune des descriptions conseil de ce mois ne porte explicitement sur une mission QA autonome. À traiter comme une composante transverse, pas comme un signal de demande spécialisée.

**PMM et Product Ops** sont présents à hauteur de 4 mentions chacun — ordre de grandeur faible sur 27 opportunités régie, à ne pas surpondérer.

### Profils et séniorité demandés

| Niveau | Mentions |
|---|---|
| Senior | 6 |
| Head / Dir | 6 |
| Lead | 5 |
| Confirmé | 4 |
| Coach | 2 |
| Junior | 2 |
| Principal | 1 |

Le marché tire clairement vers **les profils expérimentés** : Senior, Lead et Head/Dir totalisent 17 des 26 mentions de séniorité. Les profils junior restent anecdotiques (2 mentions). La présence de 6 mentions Head/Dir signale une demande non négligeable pour des profils de direction ou d'encadrement.

### Compétences et contexte *(vocabulaire dominant)*

Les termes les plus fréquents dans les descriptions :

- **Analytics/KPI** et **Delivery** (8 mentions chacun) — le delivery et la mesure de la performance dominent le contexte des missions
- **Roadmap** (7) — structuration du backlog et de la vision produit
- **UX/Design** (6) — présence notable mais secondaire
- **Agile/Scrum, Jira/Confluence, OKR, Discovery, Plateforme** (5 chacun) — socle standard du PM
- **B2C** (2), **B2B** (1), **SaaS** (1) — dimensions contextuelles peu citées, pas de lecture sectorielle fiable

---

## 3. La demande de conseil

Ce mois, **3 opportunités conseil** ont été détectées — l'échantillon est très petit. Les observations suivantes sont qualitatives et fragiles.

### Motifs identifiés

**① Formation pratique à la discovery produit** *(statut : perdu)*
Accompagnement court (1 à 2 sessions) d'un profil PO en contexte e-commerce post-migration technique. La demande porte explicitement sur une approche concrète et ancrée dans la réalité opérationnelle, en réaction à une expérience antérieure jugée trop théorique. Mission perdue avant soutenance.

**② Forfait** *(statut : gagné)*
Description non renseignée dans le pipe. Mission gagnée — nature précise non reconstituable.

**③ Refonte de la stratégie et de l'outillage de gestion des tests à l'échelle d'une DSI** *(statut : actif — P1)*
Mission de conseil fullstack pour une grande DSI internationale opérant sur un périmètre SAP. L'objectif est la refonte complète de l'approche de test (principalement UAT) : diagnostic des besoins, benchmark objectif d'outils, recommandation argumentée, PoC sur 1-2 solutions, définition d'un process cible simplifié, et accompagnement au change et à l'adoption post-migration. Les interlocuteurs couvrent simultanément l'IT, le métier (Business Process Owners, Key Users) et la gouvernance, sur un périmètre international. Démarrage envisagé début septembre 2026. Le critère différenciateur attendu dépasse le choix d'outil : il porte sur la capacité à accompagner la transformation sous-jacente.

> *Observation sectorielle ponctuelle* : la mission ③ s'inscrit dans un contexte retail/distribution internationale — observation qualitative sur une seule occurrence, sans généralisation possible.

---

## 4. Concurrents cités

| Concurrent | Occurrences dans les descriptions |
|---|---|
| Octo | 5 |
| Thiga | 1 |
| Capgemini | 1 |

Ces occurrences signifient que ces acteurs **apparaissent dans notre orbite** (cités par des clients ou dans des contextes où nous sommes également présents). Ce n'est **pas** un comptage de confrontations directes gagnées ou perdues.

---

## 5. Signaux saillants pour le croisement

1. **Product AI à 11 mentions sur 27 opportunités régie** : la demande de profils avec une composante IA produit représente plus d'un tiers des opportunités régie. Signal à confronter aux newsletters du secteur pour qualifier s'il s'agit d'une demande de profils hybrides (PM + IA) ou de spécialistes IA embarqués dans des squads produit.

2. **Polarisation haute de la séniorité** : la combinaison Senior + Lead + Head/Dir (17 mentions) face à Junior + Confirmé (6 mentions) suggère une demande orientée profils expérimentés. À croiser avec les tensions de marché observées sur ces niveaux.

3. **La mission conseil active porte sur le test management à l'échelle d'une DSI**, pas sur un sujet strictement product management. Signal d'élargissement possible du périmètre conseil vers des missions QA/testing stratégiques — à surveiller pour confirmer ou infirmer sur les prochains mois.

4. **Octo cité 5 fois** sur 30 opportunités : présence notable dans notre orbite ce mois. À confronter aux positionnements observés dans les newsletters pour qualifier leur zone d'intervention effective.

---

## 6. Garde-fous & limites

- **Classification par expertise approximative** : les mentions sont extraites par mot-clé, pas par lecture fine. Des chevauchements existent (ex. : une même opportunité peut cumuler PM + AI + QA).
- **QA surévalué** : les 12 mentions incluent très probablement des occurrences du terme « recette » en contexte delivery générique. Ne pas lire comme 12 demandes de spécialistes QA.
- **Concurrents = présence dans l'orbite**, pas un score de confrontations directes.
- **Pas de dimension secteur/taille** : absentes de la source agrégée. La seule observation sectorielle (retail, §3) repose sur une seule description et est qualifiée comme telle.
- **Conversion mensuelle non significative** : avec ~81 % d'opportunités encore actives, les taux de transformation n'ont pas de valeur analytique sur ce seul mois. Re-synthèse trimestrielle pour les conversions et pertes.
- **Échantillon mensuel petit** : 30 lignes dont 27 régie et 3 conseil. Toute observation doit être lue avec cette limite en tête.

---

*Synthèse mensuelle auto — à relire. Re-synthèse complète trimestrielle pour rattraper conversions et pertes.*