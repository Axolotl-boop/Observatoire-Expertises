## Digest de contenu — ByteByteGo, « EP230: RAG vs Agentic RAG » (24 octobre 2026)

---

### 1. VERDICT

Explainer technique grand public, correct sur le fond mais délibérément introductif : ByteByteGo s'adresse à des ingénieurs en formation, pas à des praticiens avancés. Aucune analyse des trade-offs réels (coût de la boucle, latence, surface d'erreur, observabilité), aucune nuance sur les cas où le RAG classique reste préférable. Deux blocs sponsorisés présents (Inngest, Open Source Pledge) mais sans lien avec le contenu éditorial RAG — pas de biais éditeur-logiciel sur ce sujet précis. Valeur pour le cabinet : faible en termes de convictions nouvelles, utile comme repère pédagogique de base et comme signal de la maturité du sujet dans les médias grand public.

---

### 2. CE QU'IL FAUT RETENIR

- **RAG classique = pipeline déterministe à passage unique** : une requête → un retrieval → un contexte injecté → une réponse. La qualité est entièrement dépendante de la précision du contexte récupéré dès la première passe, sans possibilité de correction en cours de route.
- **Agentic RAG = boucle de retrieval adaptative** : un agent orchestre plusieurs outils (documents, APIs, bases de données, web), évalue à chaque itération si l'évidence accumulée est suffisante, et peut reformuler ou changer d'outil avant de déclencher la génération.
- **Le critère de « suffisance de l'évidence » est le vrai pivot architectural** : c'est lui qui distingue les deux paradigmes, et il implique une logique de contrôle (qui décide ? selon quel critère ?) absente du RAG classique — question que le contenu ne traite pas.
- **L'élargissement des sources est une conséquence, pas une cause** : l'agentic RAG peut interroger web, APIs et bases de données non pas parce qu'il est « plus intelligent », mais parce que sa boucle rend le multi-outil opérable. La confusion entre les deux est fréquente dans les présentations commerciales.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- L'agentic RAG s'installe comme couche intermédiaire de facto entre le RAG simple et les architectures agents pleinement autonomes — ce spectre devient le cadre de référence par défaut pour concevoir des features IA en contexte documentaire · **[tendance]**
- La vulgarisation de ces architectures dans des médias grand public (ByteByteGo dépasse plusieurs centaines de milliers d'abonnés) signale que le sujet sort du cercle des ML engineers pour entrer dans la culture générale des équipes produit et engineering · **[tendance]**
- Le terme « agentic » est en voie de devenir un qualificatif marketing générique apposé à tout pipeline qui n'est pas purement linéaire, indépendamment de la réalité de l'autonomie de l'agent · **[mode]**
- La question de l'observabilité et de la durabilité des agents longue durée (signalée par le sponsor Inngest, qu'il faut lire comme un signal marché indépendamment de l'aspect pub) émerge comme un problème d'infrastructure non résolu · **[tendance]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : la distinction RAG / Agentic RAG est désormais un prérequis de qualification des cas d'usage clients — savoir poser la question « votre retrieval a-t-il besoin d'itérer ? » conditionne le choix d'architecture, le dimensionnement budgétaire et les attentes de fiabilité. Ce cadre binaire est encore absent de beaucoup de briefs clients. Piste : en faire une grille de lecture systématique en phase de discovery IA — à confronter à nos REX pour vérifier si des missions ont bute sur cette confusion.
- **Product Management (secondaire)** : l'itérativité de l'agentic RAG a des implications directes sur la latence perçue et le comportement produit (l'utilisateur attend une réponse dont le temps de calcul est variable et imprévisible). Un PM qui ne comprend pas ce mécanisme prend de mauvaises décisions de UX et de SLA — à confronter à nos PAD pour identifier si ce gap de compréhension est récurrent côté PO/PM clients.
- **QA (secondaire)** : les boucles de retrieval itératives sont notoirement difficiles à tester (non-déterminisme, dépendance aux sources externes, critère de sortie subjectif). La question de comment on teste un agent qui « décide lui-même quand il a assez d'information » n'est pas posée dans le contenu, mais c'est précisément le vrai problème — à confronter à nos REX QA sur des projets IA existants.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : le passage à l'agentic RAG n'est pas une simple montée en version du RAG — c'est un changement de paradigme de contrôle qui déplace la complexité vers l'orchestration, l'observabilité et la définition du critère de suffisance. Cette conviction mériterait d'être formalisée dans nos contenus Product AI à challenger par le KR Owner concerné.
- **[Challenge]** : on a tendance à présenter l'agentic RAG comme une évolution naturelle et souhaitable ; le contenu ne dit mot du coût (tokens, latence, surface d'erreur cumulée à chaque itération). La recommandation par défaut devrait peut-être être l'inverse : RAG classique sauf si le besoin d'itération est démontré — à confronter à nos REX pour voir si des projets ont sur-ingénié leur pipeline.
- **[Nouvelle — à valider]** : la notion d'« evidence sufficiency check » comme composant architectural explicite (et pas implicite dans le prompt) pourrait constituer un angle différenciant dans nos accompagnements Product AI — hypothèse à challenger par le KR Owner et à vérifier côté PAD/Boond si des clients ont exprimé ce besoin sans le nommer ainsi.