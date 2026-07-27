## Digest de contenu — ByteByteGo, « MCP vs A2A vs ACP: How AI Agents Actually Talk to Each Other » (18 juillet 2026)

---

### 1. VERDICT

Newsletter de vulgarisation en system design, sans biais éditorial marqué, mais avec deux encarts sponsorisés à isoler : Xweather (API météo MCP-ready, qui surfe sur la vague MCP pour vendre un produit) et Attio (CRM agentique, sans lien avec le cœur du sujet). Le contenu éditorial principal — cartographie des protocoles MCP, A2A et ACP — est court mais précis et directement exploitable pour cadrer les architectures agentiques en mission. La section sur l'évaluation des systèmes LLM/RAG/Agent est complémentaire et pertinente. Valeur réelle, surtout pour **Product AI** et **QA** ; sans intérêt pour PMM, Data PM ou Product Management au sens stratégique.

---

### 2. CE QU'IL FAUT RETENIR

- **MCP et A2A sont complémentaires, pas concurrents** : MCP gère l'accès de l'agent à ses outils, A2A orchestre la délégation entre agents distincts. La pile de production combine les deux — les présenter comme des alternatives est une erreur de cadrage fréquente.
- **L'Agent Card formalise un contrat de capacité inter-agents** : publiée à une URL connue, elle permet la découverte dynamique d'un agent pair. C'est une brique d'architecture concrète qui ouvre la voie à des systèmes multi-agents modulaires, et qui introduit une logique de découvrabilité absente des LLMs isolés.
- **ACP a été absorbé dans A2A** : ce protocole REST-first (sync ou async via SSE) disparaît en tant qu'alternative indépendante. La convergence protocolaire est en cours, mais pas stabilisée — ACP était encore présenté comme viable il y a peu.
- **Évaluer un système multi-agents est une discipline à part entière** : chaque composant ajouté (retriever, génération, coordination, adhérence au rôle) introduit un point de défaillance et une exigence d'évaluation propre. Le LLM-as-judge seul ne suffit plus ; il faut combiner tests de code, jugement LLM et revue humaine.
- **Le marché des modèles open source se fragmente par spécialisation** : long-context (Nemotron, Kimi K2.6), on-device (Qwen3.6, Gemma 4), coding (GLM-5.2), multimodal vidéo (MiniMax M3). Pas de course au modèle universel — des niches qui correspondent à des cas d'usage produit distincts.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- **MCP + A2A s'installent comme couche de communication de référence des stacks agentiques** — convergence engagée mais protocoles encore jeunes · [tendance]
- **Absorption d'ACP dans A2A : première consolidation visible du marché des protocoles agents** — à surveiller, la standardisation reste fragile et potentiellement contestée · [tendance]
- **L'évaluation des systèmes multi-agents devient une ingénierie distincte**, avec ses propres outils et métriques, éloignée de l'éval LLM classique · [tendance]
- **Fragmentation productive du marché des modèles open source par cas d'usage** : le choix de modèle devient une décision produit contextualisée, pas une décision technique universelle · [tendance]
- **Le terme "agentic" envahit le vocabulaire produit et commercial** (CRM agentique, API MCP-ready) sans définition stabilisée — risque de dilution du signal · [mode]

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : MCP / A2A / Agent Card constituent un cadre de référence directement mobilisable pour structurer nos recommandations d'architecture agentique en mission. La notion de contrat de capacité entre agents est actionnable dans nos livrables de design système. Hypothèse : nos clients les plus avancés sur l'IA commencent à se poser ces questions de coordination inter-agents — à confronter à nos REX pour vérifier si ce besoin est déjà exprimé ou latent.

- **QA (central)** : la formalisation d'une évaluation multi-couches (retriever, génération, coordination, rôle) est une piste concrète pour enrichir notre pratique de test à l'ère de l'IA. L'approche hybride (code tests + LLM-as-judge + revue humaine) mérite d'être intégrée à notre référentiel QA — à confronter à nos PAD/REX sur les missions impliquant des pipelines IA pour évaluer si nos clients ont déjà instrumenté cette problématique.

- **Product Ops (secondaire)** : la standardisation protocolaire autour de MCP/A2A implique des choix de tooling, de gouvernance des stacks agentiques et potentiellement de nouveaux rituels d'équipe. Hypothèse : un besoin d'accompagnement sur l'outillage et le cadrage des stacks agents pourrait émerger — à vérifier côté PAD/Boond.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : les architectures agentiques nécessitent une couche de gouvernance, de contrats d'interface et d'évaluation propre — elles ne se pilotent pas comme des LLMs isolés. Notre pratique Product AI doit intégrer cette dimension systémique dans ses offres et ses livrables.

- **[Challenge]** : MCP + A2A sont présentés comme la combinaison naturelle et évidente. Mais ACP vient d'être absorbé, et l'écosystème reste instable. Recommandation au KR Owner : ne pas qualifier MCP/A2A de standard stable dans nos livrables sans signaler le niveau de maturité réel — risque de décrédibilisation à moyen terme.

- **[Nouvelle — à valider]** : l'évaluation multi-agents en tant que discipline distincte (au-delà du QA classique) pourrait constituer une conviction différenciante pour notre practice QA, voire une offre à part entière — à challenger par le KR Owner QA à partir de nos missions actuelles sur des pipelines IA.

- **[Renforce]** : la spécialisation des modèles open source par tâche confirme que le choix de modèle est une décision produit contextualisée. C'est un argument que nos consultants Product AI peuvent mobiliser pour repositionner la conversation chez les clients : du « quel est le meilleur modèle ? » vers « quel modèle pour quel cas d'usage, avec quelles contraintes d'infrastructure ? »