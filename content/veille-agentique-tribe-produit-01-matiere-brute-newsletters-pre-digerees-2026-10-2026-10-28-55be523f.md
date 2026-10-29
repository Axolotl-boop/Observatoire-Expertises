---

**Digest de contenu — ByteByteGo, « How Uber Built A Gateway For AI Agents To Access Tools » (28/10/2026)**

---

## 1. VERDICT

Article technique solide, sourcé sur le blog engineering d'Uber, qui documente un cas réel de mise en production d'infrastructure agentique à grande échelle. Pas de contenu sponsorisé dans le corps de l'article (le bloc Kalshi/Redpanda est une pub clairement séparée, sans lien avec l'analyse). La valeur pour le cabinet est réelle : Uber y expose les problèmes concrets qui émergent quand des agents IA opèrent sur un SI hétérogène — et les réponses architecturales choisies. Le niveau d'abstraction est technique mais les enjeux de gouvernance, découverte et sécurité sont directement transposables à nos problématiques de conseil. Attention : article de vulgarisation, pas un whitepaper d'ingénierie ; il reste en surface sur certains choix de design.

---

## 2. CE QU'IL FAUT RETENIR

- **MCP (Model Context Protocol) s'impose comme la couche d'interopérabilité de référence** entre agents IA et outils externes. Uber en fait la colonne vertébrale de son écosystème d'agents, ce qui valide la trajectoire du protocole au-delà des projets pilotes.
- **Le vrai goulot d'étranglement des systèmes agentiques n'est pas l'IA, c'est le tissu connectif** : découverte des outils, sécurité, fiabilité, gestion des permissions — autant de couches qui n'existent pas nativement dans les SI legacy.
- **AutoCrawler illustre un principe clé** : les API existantes suffisent à alimenter un plan de contrôle agentique sans réécriture. L'IA (LLM) est utilisée pour enrichir automatiquement les descriptions d'outils à partir des IDL — le "no-code agentic onboarding" est une réalité de production chez Uber.
- **La gestion du contexte est un problème d'ingénierie de premier ordre** : avec des milliers d'outils disponibles, charger toutes les définitions en amont sature la fenêtre de contexte. Uber répond avec une découverte progressive (Omni MCP) et une projection de réponse (pattern GraphQL adapté à MCP).
- **Le contrôle d'accès au niveau de l'outil individuel**, avec PII redaction et OAuth cross-système pour les services tiers (Jira, Google), est la réponse d'Uber au problème de confiance dans les systèmes agentiques en production.

---

## 3. CE QUE ÇA DIT DU MARCHÉ

- **MCP devient le standard de facto pour l'intégration agent-outil**, au moins dans les environnements enterprise tech-forward — des équipes aussi diverses que celles d'Uber l'adoptent à grande échelle sans questionnement sur le protocole lui-même · [structurel] (à valider)
- **L'infrastructure agentique devient un domaine d'ingénierie à part entière**, distinct du développement de l'agent lui-même : discovery plane, access control, context management, protocol translation · [tendance]
- **Le "no-code agentic onboarding" via crawl d'API existantes** réduit la friction d'adoption mais crée un nouveau besoin : gouvernance des outils auto-découverts (ownership, activation, review) · [tendance]
- **La fenêtre de contexte comme contrainte architecturale** oblige à repenser la conception des agents dès le départ — ce n'est plus un détail d'implémentation mais une décision de design produit · [tendance]
- **"L'agent IA comme consommateur d'API"** recadre le rôle des équipes plateforme et API : leurs contrats de service deviennent des capacités agentiques activables · [tendance] teinté [mode] (discours aussi porté par des vendeurs d'outils d'orchestration)

---

## 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : le modèle de gateway MCP d'Uber constitue une référence de design pour tout client envisageant un déploiement agentique à l'échelle. Les patterns registry/proxy, découverte progressive, PII redaction sont des briques directement utiles pour cadrer un accompagnement "agentic platform" — à confronter à nos REX : avons-nous déjà eu des missions sur des infrastructures multi-agents ? Ce pattern recoupe-t-il des besoins exprimés par nos clients en découverte ?

- **Product Ops (secondaire)** : la gouvernance des outils IA (ownership, activation, versioning, rollback) est un nouveau chantier de Product Ops qui ne dispose pas encore de cadre établi. Le modèle "diff + approval" d'Uber pour les modifications d'outils est un pattern de gouvernance outillage transposable — à confronter à nos REX : ce besoin de gouvernance de l'outillage IA est-il remonté dans nos missions de scaling produit ?

- **Data PM (secondaire)** : la PII redaction au niveau gateway, le contrôle d'accès par politique et la gestion des tokens cross-système (Jira, Google) sont des problèmes de data governance appliqués aux agents IA. Cela prolonge la question du "data contract" vers les "tool contracts" — à confronter à nos PAD/REX sur des sujets de gouvernance data dans des contextes multi-systèmes.

---

## 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : notre conviction que le passage à l'IA agentique nécessite un accompagnement sur la couche plateforme/infrastructure, pas seulement sur l'usage — Uber le confirme par l'exemple, même si ce n'est qu'un cas parmi d'autres.

- **[Challenge]** : l'approche "les API existantes suffisent" est séduisante mais suppose un haut niveau de maturité des contrats d'API (IDL bien rédigés, documentation à jour). Dans des SI clients moins matures, cette hypothèse pourrait s'effondrer — recommandation au KR Owner Product AI : intégrer un audit de maturité API dans nos cadrages agentiques.

- **[Nouvelle — à valider]** : MCP pourrait devenir un livrable de nos missions Product AI — non pas seulement comme outil interne, mais comme artefact de design à produire pour nos clients (définition des tool schemas, politique d'ownership des outils). À évaluer côté PAD/offre.

- **[Nouvelle — à valider]** : le problème de la fenêtre de contexte comme contrainte de design produit est sous-estimé dans les projets agentiques early-stage. Un module de sensibilisation "architecture de contexte" pourrait compléter nos offres d'accompagnement IA — à challenger par le KR Owner Product AI sur la base des retours terrain.