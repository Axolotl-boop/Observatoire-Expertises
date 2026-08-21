## Digest de contenu — Nikhyl Singhal / The Skip (cross-post Lenny's Newsletter), « To Invent Waymo, They Had to Reinvent PM » (20 août 2026)

---

### 1. VERDICT

Contenu substantiel et dense, l'un des meilleurs du genre sur le PM à haute complexité. Nikhyl Singhal restitue une heure de conversation avec le CPO de Waymo en idées directement transférables — pas de paraphrase éditoriale, des observations ancrées dans dix ans de terrain. **À signaler : l'épisode est sponsorisé par Firecrawl et Jira** (mentions explicites dans le corps du mail) et fait la promotion de la communauté payante Skip Coach — filtrer toute conclusion qui orienterait vers un outil ou un abonnement. L'essentiel du contenu résiste au biais commercial. Valeur réelle pour la Tribe : matière de conviction sur le PM IA, l'évaluation comme discipline produit, et le leadership dans l'ambiguïté de long terme.

---

### 2. CE QU'IL FAUT RETENIR

- **L'évaluation de la qualité est elle-même un problème produit.** Quand le comportement "correct" ne peut pas être entièrement spécifié à l'avance (tout produit IA non trivial), la mesure de la qualité ne tombe pas du ciel : elle doit être conçue, maintenue, challengée. Waymo a créé des rôles PM dédiés uniquement à augmenter la fidélité des métriques — pas à améliorer le produit, à s'assurer que les tests eux-mêmes restent valides.

- **Vision et checkpoints sont deux muscles distincts, pas deux niveaux de zoom.** Une mission "semi-spirituelle" (40 000 morts par an sur les routes US) maintient l'énergie sur dix ans. Mais sans jalons hebdomadaires ultra-concrets et vérifiables, l'énergie produit du "mouvement brownien". La règle est contre-intuitive : plus la vision est grande, plus les checkpoints doivent être courts et précis.

- **La followership ne s'achète pas avec un titre dans un environnement de haute expertise.** Saswat passe ses journées devant des spécialistes plus qualifiés que lui dans leur domaine. Ce qui crée l'autorité : compétence (les experts sont *surpris* que vous connaissiez leur domaine), courage (arrêter une release après des mois de travail parce que la sécurité n'est pas là), compassion (tuer un pari en célébrant publiquement les héros de l'échec, pas en clôturant un ticket).

- **La curiosité vorace est un capital qui se compose.** 1,01 à la puissance 365 = ×37 en un an. Le différenciateur entre "20 ans d'expérience" et "1 an répété 20 fois" n'est pas le CV, c'est la capacité à combiner des champs étrangers les uns aux autres. Chez Waymo, c'est une valeur culturelle publique, pas une vertu privée — une fois par semaine, un leader présente en 10 minutes ce qu'il a appris, sans préparation.

- **L'équipe comme unité de compétence, pas l'individu.** Des PMs avec un doctorat en photonique "qui ont choisi d'être PM" plutôt que d'y être tombés, des cultures NASA et startups internet en collision délibérée. Personne ne couvre tout le problème seul — la range collective compense l'incomplétude de chacun, à condition que les rituels d'apprentissage entretiennent la membrane entre les sous-cultures.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- **L'évaluation de la qualité des systèmes IA devient une discipline PM structurée, pas une tâche de QA annexe.** Le pattern "eval PM" — quelqu'un dont le seul job est de maintenir l'honnêteté et la difficulté du banc de test — est en train de quitter le monde autonomy/safety pour toucher tous les produits IA complexes · **[structurel] (à valider)**

- **Les feedback loops longs (mois, années) redeviennent la norme pour les produits IA à enjeux élevés**, remettant sous pression les cadres de delivery issus du web (sprint, OKR trimestriel, A/B test) · **[tendance]**

- **La figure de l'"executive builder"** — compétence technique de fond + capacité de leadership dans l'ambiguïté — s'impose comme référence pour les profils PM senior, dix ans après que Waymo l'a sélectionnée sans le nommer · **[tendance]**

- **Le PM généraliste pluridisciplinaire recule devant le PM "expert par choix"** : quelqu'un qui aurait pu rester ingénieur photonique, supply chain ou chercheur, et a délibérément choisi le rôle PM · **[tendance]**

- **La qualité du feedback loop lui-même** (pas seulement la vitesse) devient un critère de conception produit à part entière, en particulier là où le terrain physique ou réglementaire interdit l'expérimentation directe · **[tendance]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product Management (central)** : trois axes directement exploitables en formation et en avant-vente — (1) "spécifier ce que good looks like" comme compétence PM fondamentale et sous-développée sur les produits IA, (2) l'architecture vision/checkpoints pour accompagner des équipes coincées entre ambition à 5 ans et sprint à 2 semaines, (3) le leadership par compétence-courage-compassion dans des orgs pluridisciplinaires sans légitimité de titre. Hypothèse : ces trois sujets pourraient correspondre à des besoins non couverts chez des clients en transformation IA — à confronter à nos PAD/REX/concurrence.

- **Product AI (central)** : le pattern "eval PM" — rôle dédié à la fidélité du système d'évaluation des modèles IA, distinct du rôle PM produit — est un signal organisationnel peu discuté publiquement mais potentiellement très pertinent pour les clients qui scalent l'IA au-delà du POC. Hypothèse : peu de nos clients ont formalisé ce rôle ou même posé la question de "qui est responsable que notre métrique d'évaluation reste valide ?" — à confronter à nos REX sur les projets IA en production.

- **Product Ops (secondaire)** : deux patterns rituels concrets réutilisables en mission — la collision culturelle délibérée (ex-NASA + internet PM) comme choix d'organisation d'équipe, et le "learning all-hands" hebdomadaire sans préparation comme mécanisme de capitalisation collective à faible coût. Hypothèse : ces patterns pourraient enrichir nos recommandations sur le scaling de la fonction produit — à confronter à nos REX d'accompagnement d'équipes.

- **QA (secondaire)** : l'analogie entre l'eval leapfrog de Waymo (rendre le test plus dur quand le système s'améliore, vérifier que le test lui-même n'est pas obsolète) et les pratiques de test continu sur les systèmes IA est directe. La question "est-ce que notre suite de tests est encore un critique crédible ?" devient une question de gouvernance QA, pas seulement d'ingénierie. Hypothèse : un angle d'offre QA IA autour de la validité des benchmarks — à confronter à nos REX QA sur les projets IA.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : notre valeur sur les missions longues ou ambiguës tient précisément à la capacité d'architecturer des jalons vérifiables sur une vision à 3-5 ans que le client ne sait pas découper — recommandation au KR Owner de vérifier si ce positionnement est assez explicite dans nos supports d'avant-vente.

- **[Renforce]** : le PM "par choix, pas par nécessité" — profil expert de domaine reconverti en PM — est une figure montante. Notre positionnement sur des profils seniors et spécialisés va dans ce sens ; reste à vérifier si nos parcours d'accompagnement le valorisent autant qu'ils valorisent le PM généraliste — à challenger par le KR Owner.

- **[Challenge]** : l'eval PM comme rôle distinct est-il applicable hors d'une organisation à 1 000+ personnes ? Dans des structures plus légères, ce rôle peut être porté par les Data PM ou les QA — la conviction ne devrait pas être "créer un eval PM" mais "quelqu'un doit posséder l'honnêteté de la mesure" — à challenger par le KR Owner avant toute restitution client.

- **[Nouvelle — à valider]** : la "conception du feedback loop" comme axe d'offre à part entière — accompagner des équipes à construire leurs propres systèmes d'évaluation pour des produits IA où A/B test et métriques classiques ne fonctionnent pas. Hypothèse à vérifier côté PAD/Boond : avons-nous des missions où ce besoin a été contourné faute d'offre disponible ?