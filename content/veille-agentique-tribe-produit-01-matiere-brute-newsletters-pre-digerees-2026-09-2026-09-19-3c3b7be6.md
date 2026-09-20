## Digest de contenu — ByteByteGo, « EP226: API Concepts Every Software Engineer Should Know » (19/09/2026)

---

### 1. VERDICT

Roundup à double valeur inégale. La section sur le **prompt injection** est la seule qui apporte une matière stratégique réelle : une taxonomie structurée et opérationnelle des défenses, avec des patterns architecturaux directement utilisables en missions et en avant-vente Product AI. La section **API design** est du contenu pédagogique solide pour des software engineers, sans angle nouveau pour un cabinet produit — utile pour la culture interne, insuffisant pour faire évoluer des convictions. Le reste du numéro (cours "Rebuild YouTube with AI", load balancers, monolith vs microservices) n'a pas de valeur décisionnelle pour la Tribe. Un encart sponsor **Blitzy** (agent de développement autonome) est clairement identifié et sans lien avec les sujets éditoriaux — ignoré.

---

### 2. CE QU'IL FAUT RETENIR

- Le **prompt injection** reste en tête de l'OWASP LLM Top 10 et n'a pas de correctif unique : la défense s'organise en couches complémentaires, chacune rattrapant ce que les autres laissent passer.
- La taxonomie **model-level vs system-level** est structurante : "Spotlighting" (baliser le contenu non fiable comme donnée, pas comme instruction) et "Instruction Hierarchy" (fine-tuning pour hiérarchiser les prompts) agissent dans le modèle ; "Least-Privilege", "Human-in-the-Loop" et "Planner/Executor Split" agissent dans l'architecture du système.
- Le pattern **Planner/Executor** — deux LLM séparés, l'un avec accès aux outils mais sans exposition au contenu non fiable, l'autre exposé au contenu mais sans outils — émerge comme la réponse architecturale la plus robuste pour les agents en production.
- Sur les API : la **dette de conception** (nommage, versioning, backward compatibility, idempotency) est systématiquement sous-estimée au lancement. Les choix différés coûtent structurellement plus cher que les choix explicites en phase de cadrage.
- Le **contrat d'API** (documentation, specs formelles, contract testing, observabilité) est présenté comme ce qui permet aux équipes de "faire confiance à l'API sans deviner comment elle fonctionne" — signal sur la valeur des interfaces explicites dans les organisations à plusieurs équipes.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- Le prompt injection passe de problème théorique à **contrainte d'architecture en production**, avec des patterns nommés, documentés, et référencés dans des frameworks sectoriels (OWASP) · **[tendance]**
- Le pattern **Planner/Executor** comme séparation de responsabilité dans les systèmes agentiques se normalise en production (référence explicite à Gmail) · **[tendance]**
- L'outillage de sécurité LLM (Spotlighting, Instruction Hierarchy via RLHF) migre des labs vers les specs produit — la sécurité des agents devient un critère de design, pas un correctif a posteriori · **[tendance]**
- La **sobriété architecturale** regagne du terrain : "monolith-first" est réhabilité comme stratégie valide, les microservices réservés aux besoins de scaling réellement indépendants · **[tendance]** (signal récurrent, pas isolé)

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : La taxonomie prompt injection est une grille de lecture immédiatement mobilisable en avant-vente et en missions — elle permet de structurer un audit des défenses en place sur un système agentique et de challenger les équipes sur leurs angles morts (souvent : défenses model-level uniquement, architecture système non pensée). Le pattern Planner/Executor peut alimenter nos recommandations d'architecture pour les agents · **— à confronter à nos REX sur les déploiements d'agents : ce niveau de structuration est-il déjà attendu par nos clients, ou encore perçu comme avancé ?**

- **QA (secondaire)** : Le pattern Planner/Executor et la mention du contract testing comme enabler de confiance sur les API ouvrent une piste pour intégrer la sécurité LLM dans les stratégies de test — notamment tester l'isolation entre planner et executor, et les comportements sous injection · **— à confronter à nos REX QA sur des projets IA : nos approches de test intègrent-elles déjà des scénarios d'injection ?**

- **Data PM (secondaire)** : La section API design — versioning, backward compatibility, contrats explicites, observabilité — résonne directement avec les enjeux de **data contracts** et de gouvernance des interfaces en data-as-a-product. La posture "une API que les gens peuvent utiliser sans deviner" est exactement celle que les data contracts cherchent à garantir · **— à confronter à nos PAD Data : ce lien API design ↔ data contracts est-il déjà un angle de nos offres ?**

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : Sécuriser un agent IA n'est pas un problème de prompt engineering mais un problème d'architecture défensive en couches — ce qui conforte la conviction que la sécurité doit entrer dans les critères de design dès la phase de discovery, pas en fin de delivery.

- **[Challenge]** : Le pattern Planner/Executor est présenté comme la solution robuste, mais il double la complexité opérationnelle et le coût d'inférence — recommandation au KR Owner de vérifier si nos missions intègrent explicitement ce trade-off dans leurs recommandations, ou si on vend de la robustesse sans en chiffrer le coût.

- **[Nouvelle — à valider]** : Le contrat d'API (documentation formelle, contract testing, observabilité exposée aux équipes consommatrices) pourrait devenir un **livrable attendu** dans nos missions de cadrage produit-tech, notamment sur les contextes multi-équipes ou data — hypothèse à confronter côté PAD/Boond pour voir si des clients ont exprimé ce besoin.

- **[Challenge]** : La réhabilitation du monolithe comme architecture de départ valide contraste avec un discours marché qui valorise encore souvent les microservices comme signe de maturité — à challenger dans nos recommandations d'architecture : prônons-nous assez explicitement la sobriété architecturale là où c'est justifié ?