## Digest de contenu — ByteByteGo, « A Deep Dive into Salesforce's Agent Tech Stack » (26 octobre 2026)

---

### 1. VERDICT

Article technique substantiel fondé sur une démo et des interviews accordées par le CTO et le SVP Product de Salesforce lors de Dreamforce 2026. Le contenu est objectivement favorable à Salesforce — accès privilégié organisé par l'éditeur, sans sponsoring déclaré sur cette partie, mais biais de vitrine réel : tout ce qui est présenté comme problème a déjà sa solution maison. La section Datadog est, elle, explicitement marquée « SPONSORED » et distincte du corps de l'article ; ses arguments (observabilité, eval pipelines) recoupent l'article principal mais servent un produit commercial — à lire séparément. Sur le fond, l'article offre une grille d'architecture agent en production rigoureuse, étayée par des chiffres de terrain, avec une valeur réelle pour les expertises Product AI et Data PM de la Tribe.

---

### 2. CE QU'IL FAUT RETENIR

- **Le prompt seul est un anti-pattern de production.** Au-delà de \~8 instructions dans un prompt, les LLM commencent à en ignorer certaines ; le benchmark IFScale mesure que même les meilleurs modèles ne suivent que 68 % des instructions à 500 consignes. Confier la compliance comportementale au seul prompt, c'est espérer — pas garantir.
- **La réponse architecturale est la séparation stricte des responsabilités.** Code déterministe pour les règles et conditions (Agent Script compilé en Agent Graph, exécuté par Atlas Reasoning Engine) ; modèle de raisonnement uniquement pour les étapes qui l'exigent réellement. Le modèle ne voit jamais ce qu'une ligne de code peut garantir.
- **La gestion du contexte est un levier économique et de fiabilité de premier ordre.** L'Agent Context Engine réduit de 124 000 à 9 000 tokens la même requête ; l'écart s'amplifie à mesure que la conversation progresse. Le GraphRAG (triple index : exact, sémantique, entités liées) en est le moteur.
- **L'identité de l'agent doit être distincte de celle de l'utilisateur.** Un agent héritant des droits complets d'un humain peut répéter une erreur à vitesse machine. Le pattern double token (agent + user) avec intersection de permissions est la réponse — et signale l'émergence de la gouvernance des agents comme discipline à part entière.
- **MCP (Model Context Protocol) devient standard d'interopérabilité, mais le "tool flooding" est un problème réel.** Charger des centaines de définitions d'outils dans le contexte est coûteux et risqué ; le pattern index-de-4-outils + séquence discover/describe/dispatch de Salesforce est une réponse réplicable, indépendante de la plateforme.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- Le prompt engineering seul est insuffisant pour des agents d'entreprise à fort enjeu : l'industrie converge vers des architectures hybrides (code déterministe + LLM) comme standard de production fiable · **[structurel] (à valider)**
- La gestion du contexte (sélection, hiérarchisation, mémoire éphémère vs. confirmée) s'installe comme composant d'architecture à part entière, distinct du modèle · **[tendance]**
- Les permissions et l'identité propre des agents émergent comme enjeu de gouvernance enterprise, dissociés de la gestion des droits utilisateurs classique · **[tendance]**
- MCP s'impose comme couche d'interopérabilité agent ↔ systèmes tiers, avec des patterns d'implémentation qui commencent à se stabiliser · **[tendance]**
- La métrique « Agentic Work Unit » (AWU) est une tentative de Salesforce de créer sa propre unité de valeur IA — cohérence marketing plus que standard ouvert, à surveiller sans l'acter · **[mode]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : Le cadre en 4 couches (data, application, agent, surface) et le pattern déterministe/raisonnement sont directement utilisables pour diagnostiquer ou concevoir une architecture agent chez un client. La grille des 4 anti-patterns du prompt naïf (règles, identité client, contexte, permissions) est un outil de cadrage concret — à confronter à nos REX sur les projets agents en cours ou passés pour vérifier la récurrence de ces problèmes.

- **Data PM (central)** : Data 360 et l'Agent Context Engine illustrent ce que « data as a product » signifie concrètement au service d'agents : unified profiles multi-sources, identity resolution, mémoire contextuelle provisoire vs. promue en fait confirmé. Le rôle du Data PM dans la gouvernance du contexte agent reste à formaliser dans nos offres — à confronter à nos PAD/REX sur les architectures data clients.

- **QA (secondaire)** : La dégradation de l'instruction following avec la complexité du prompt est un problème de testabilité structurel, pas seulement de design. Les eval pipelines et le tracing (Enterprise AI Harness, également poussés par Datadog en sponsor) pointent vers des pratiques QA spécifiques aux systèmes non déterministes — à confronter à nos pratiques QA actuelles sur les produits IA et à nos REX.

- **Product Management (secondaire)** : La distinction mémoire provisoire / fait confirmé est une décision produit non triviale (qui valide ? selon quel critère ? avec quel impact RGPD ?) que le PM d'un agent doit spécifier explicitement — signal intéressant sur ce que nos accompagnements PM doivent couvrir dans un contexte agent — à confronter à nos PAD/REX sur des missions produit IA.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : La fiabilité des agents en production est un problème d'architecture, pas de modèle. Nos accompagnements sur les produits IA doivent intégrer ce niveau de cadrage dès la phase de design — recommandation à challenger par le KR Owner Product AI.

- **[Renforce]** : La donnée (profil unifié, gouvernance du contexte, memory management) est un actif produit aussi stratégique que le modèle dans une architecture agent. Une posture conjointe Data PM + Product AI sur ce type de mission a de la pertinence — à challenger par les KR Owners concernés.

- **[Challenge]** : Les patterns Salesforce (Agent Script, Data 360, ACE) sont impressionnants mais très couplés à leur écosystème CRM. Leur transposabilité hors Salesforce, notamment dans des contextes greenfield ou multi-stack, reste à évaluer — ne pas les présenter comme référence universelle sans ce filtre, à challenger par le KR Owner avant toute réutilisation en avant-vente.

- **[Nouvelle — à valider]** : L'émergence d'une « identité agent » avec droits propres, auditabilité et gouvernance spécifique pourrait constituer un sujet de conseil à part entière, distinct de la cybersécurité classique — hypothèse à creuser côté PAD/Boond pour vérifier si un besoin client latent existe sur ce périmètre.