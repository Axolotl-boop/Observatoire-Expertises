## Digest de contenu — ByteByteGo, « LLM Security Basics: The Full Threat Model » (3 août 2026)

---

### 1. VERDICT

Article éditorial indépendant, sans biais commercial identifiable sur le fond — ByteByteGo est une source éducative technique qui ne pousse aucun outil. À noter : la newsletter héberge une publicité sans rapport (robot aspirateur Matic, clairement labellisée SPONSORED) — à ignorer. La valeur de l'article ne réside pas dans la nouveauté des concepts mais dans le cadre organisateur qu'il propose : le pipeline OWASP appliqué comme grille de lecture unifiée, la « trifecta létale » comme test de conception, et une hiérarchisation réaliste entre menaces spectaculaires (vol de modèle) et menaces effectives et fréquentes (agentivité excessive, injection indirecte). Le tout est ancré dans des incidents documentés récents et des références académiques vérifiables. Matière solide pour outiller nos équipes conseil IA et QA.

---

### 2. CE QU'IL FAUT RETENIR

- **La propriété racine de toutes les vulnérabilités LLM est architecturale, non corrigeable** : un modèle génère chaque token en traitant instructions et données comme une séquence unique et indistincte — contrairement à une requête SQL paramétrée qui sépare structurellement commande et entrée utilisateur. Il n'existe pas d'équivalent en langage naturel ; filtrer réduit le problème sans l'éliminer.

- **La « trifecta létale » désigne la configuration précise où une attaque cause des dommages réels** : un agent cumule (1) accès à des données privées, (2) exposition à du contenu non fiable (emails, pages web, documents), (3) un canal d'action externe. Supprimer l'une de ces trois capacités réduit l'exposition de manière significative et souvent à moindre coût qu'un filtre supplémentaire.

- **Les attaques les plus médiatisées sont les moins fréquentes en production** : vol de modèle (coût de reconstruction supérieur à un entraînement complet), extraction de données d'entraînement (behavior filtré après disclosure), empoisonnement (backdoor limité à des sorties en gibberish) — toutes réelles, toutes bornées et largement mitigées par les fournisseurs. L'ordre d'urgence perçu dans le marché est inversé par rapport à la fréquence réelle.

- **La chaîne d'approvisionnement (modèles, adaptateurs, stores vectoriels, serveurs MCP) est la surface la plus directement contrôlable par une équipe et la plus ignorée** : 352 000 modèles suspects sur 4 millions scannés sur Hugging Face ; l'attaque nullifAI a passé le scanner officiel de la plateforme en camouflant un reverse shell dans un fichier pickle compressé.

- **Aucun filtre unique ne résiste** : une étude conjointe OpenAI/Anthropic/Google DeepMind (nov. 2025) a mis en défaut douze défenses préalablement proposées contre l'injection et le jailbreaking, avec des attaques autorisées à itérer. La défense en profondeur est la posture réaliste — à coût non nul : chaque couche ajoute latence, friction et réduit l'autonomie de l'agent.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- **MCP s'impose comme standard d'agentivité et devient simultanément le principal vecteur d'injection indirecte dans les stacks agentiques** — les trois CVE d'injection sur le serveur Git MCP officiel d'Anthropic en 2025 illustrent que même les implémentations de référence arrivent en production vulnérables · [tendance]

- **La sécurité LLM se structure en discipline autonome** avec un corpus de références propres (OWASP Top 10 LLM, CVE spécifiques, chercheurs dédiés, terminologie stabilisée) — signal d'une maturité croissante qui va générer de la demande en conseil spécialisé · [tendance]

- **L'injection indirecte dans les RAG déplace le risque vers la gouvernance des sources d'ancrage** : PoisonedRAG atteint 90 % de succès sur des questions ciblées avec seulement cinq passages malveillants sur des millions — la qualité du store vectoriel est une question de sécurité avant d'être une question de pertinence · [tendance]

- **La tension autonomie / contrôle humain devient un arbitrage de conception explicite et inévitable dans tout produit agentique** : la revue humaine des actions à fort impact est la mitigation la plus robuste et aussi celle qui plafonne l'autonomie du système · [structurel] (à valider)

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : La trifecta létale est une grille de conception directement applicable lors de la définition d'architectures agentiques — elle pose la question du périmètre des permissions avant de discuter de guardrails. Le cadre OWASP pipeline est une matière de cadrage structurée pour nos livrables d'architecture IA (quels points d'entrée, quelle surface d'injection, quel channel d'action). Le point MCP mérite une attention particulière : nos recommandations d'intégration agentique incluent-elles une analyse de la surface d'injection introduite par chaque serveur MCP connecté ? — à confronter à nos REX sur les missions IA produit.

- **QA (central)** : L'article documente que les classifieurs d'injection prompt, même déployés en production par Microsoft, sont poreux (EchoLeak a passé le classifieur dédié). Le testing LLM doit systématiser les vecteurs d'injection directe, indirecte (RAG, emails, fichiers uploadés), et les scénarios supply chain (intégrité des modèles et des serveurs MCP). Nos référentiels de test QA pour les produits IA intègrent-ils déjà ces vecteurs, ou s'arrêtent-ils aux tests fonctionnels classiques ? — à confronter à nos pratiques QA actuelles sur les projets IA.

- **Data PM (secondaire)** : PoisonedRAG rend explicite que la gouvernance d'un store vectoriel est un enjeu de sécurité autant que de qualité — la provenance, l'intégrité et le contrôle d'accès en écriture des chunks d'ancrage deviennent des propriétés data product de premier rang. Cela recoupe les problématiques de data contracts et de data mesh · — à confronter à nos REX sur les missions data produit.

- **Product Management (secondaire)** : L'arbitrage autonomie/contrôle humain posé en fin d'article est un sujet de périmètre fonctionnel et de roadmap — définir quelles actions d'un agent nécessitent une validation humaine est une décision PM avant d'être une décision technique. Nos offres de discovery intègrent-elles ce cadre de décision explicitement ? — à confronter à nos PAD sur les produits IA.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : La sécurité d'un produit agentique ne se délègue pas au modèle via l'alignement ou les guardrails — elle se conçoit dans l'architecture (permissions minimales, isolation des flux de données, human-in-the-loop sur les actions à fort impact). Nos livrables de cadrage agentique devraient systématiquement inclure une revue de la trifecta.

- **[Renforce]** : La supply chain (modèles, outils, stores vectoriels) est un sujet de gouvernance produit, pas seulement de sécurité infra. Recommandation au KR Owner Product AI d'évaluer si ce point est couvert dans nos offres ou s'il constitue un angle différenciant à développer.

- **[Challenge]** : Notre positionnement Product AI traite-t-il la sécurité comme une dimension de conception dès la discovery, ou la reporte-t-il à la sécurité applicative en fin de cycle ? Si c'est le second cas, l'article fournit des arguments concrets pour repositionner — à challenger par le KR Owner sur la base des REX récents.

- **[Nouvelle — à valider]** : La montée de MCP comme couche standard d'intégration agentique pourrait justifier une offre ou un module d'audit spécifique (revue de la surface d'injection par serveur MCP, analyse des permissions, test d'injection sur les configurations) — hypothèse à vérifier côté PAD/Boond pour évaluer si une demande latente existe chez nos clients.