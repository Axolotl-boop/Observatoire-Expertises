---

## Digest de contenu — ByteByteGo, « Best Practices for Building AI Agents That Work in Production » (22/07/2026)

---

### 1. VERDICT

Article de fond solide, orienté ingénierie, qui synthétise deux ans de retours terrain issus d'Anthropic, Cognition, Intercom et Klarna. La valeur pour le cabinet est réelle : ce contenu fournit un cadre d'analyse structuré pour qualifier la maturité d'un agent en production — utile tant en avant-vente qu'en delivery. À noter : la newsletter embarque un encart webinaire **sponsorisé** (« 8 Levels of Context Maturity », un éditeur non nommé) — à ignorer ; le corps de l'article, lui, n'est pas sponsorisé. Seul bémol : l'article reste prescriptif sans quantifier les seuils de décision (quand bascule-t-on vers du multi-agent ? à quel volume de trafic ?).

---

### 2. CE QU'IL FAUT RETENIR

- **La fiabilité d'un agent ne vient pas du modèle, mais du code qui l'entoure.** En production, la majeure partie du comportement est déterministe ; le LLM n'est sollicité qu'à quelques points de décision précis. Un agent solide ressemble davantage à du code classique avec des invocations LLM ciblées qu'à un LLM qui pilote tout.
- **L'erreur se compose de façon multiplicative.** Un taux de succès de 95 % par étape donne moins de 36 % de succès sur 20 étapes chaînées : la fiabilité perçue à l'unité est trompeuse dès que les chaînes s'allongent.
- **Le contexte est le premier levier de qualité.** « Context engineering » signifie décider activement ce que le modèle voit à chaque appel — élaguer l'historique non pertinent, versionner les prompts comme du code, et traiter les définitions d'outils comme une interface contractuelle.
- **L'état de l'agent doit vivre dans du stockage sérialisable, pas dans le contexte du modèle.** C'est ce qui permet la reprise après crash, la pause/reprise de tâches longues, et le passage à l'échelle horizontal (n'importe quelle instance peut reprendre n'importe quelle tâche).
- **Le débat single vs multi-agent s'est résolu en pattern d'orchestration ferme :** un orchestrateur unique détient le contexte global et délègue à des sous-agents isolés, à courte durée de vie, à périmètre unique. Les sous-agents qui communiquent directement entre eux produisent des conflits ; ceux qui remontent un résumé à l'orchestrateur tiennent.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- L'industrie abandonne le paradigme « LLM autonome » au profit d'une architecture hybride déterministe/LLM : le modèle est un composant, pas le chef d'orchestre. [structurel] (à valider)
- Le « context engineering » s'impose comme compétence distincte — au même titre que le prompt engineering l'a été, mais avec une dimension architecturale plus forte. [tendance]
- La gestion de la responsabilité juridique des agents (Cursor, Air Canada) commence à structurer les exigences produit autour des hallucinations : human-in-the-loop n'est plus une option, c'est une contrainte de design. [tendance]
- L'argument de la « Bitter Lesson » (Sutton) — les scaffoldings actuels seront rendus obsolètes par les modèles futurs — circule activement dans les équipes engineering. Il tempère l'over-engineering, mais ne disqualifie pas les pratiques liées à l'état, à la fenêtre de contexte et à la sécurité. [mode] à surveiller, ne pas acter.
- Le coût d'un agent multi-agent complet est 15× supérieur à un agent simple (données Anthropic citées) : la valeur délivrée doit justifier explicitement l'architecture. [tendance]

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : le framework en quatre axes (contexte, control flow, state, scope) est directement exploitable comme grille de maturité pour auditer ou concevoir des agents client. La distinction « code déterministe + LLM ciblé » recadre nos convictions sur ce que signifie « bien concevoir un agent ». À confronter à nos REX : les agents que nous avons accompagnés respectent-ils ces patterns, ou sur-délèguent-ils au LLM ?

- **QA (central)** : la démonstration mathématique de l'erreur cumulative (95 % par étape → ~36 % sur 20 étapes) est un argument concret pour justifier des stratégies de test par étape plutôt que de bout en bout. Les escape hatches (limites d'itérations, timeouts) constituent des cas de test de premier ordre. À confronter à nos PAD/REX : comment testons-nous aujourd'hui les chaînes d'agents livrées ou auditées ?

- **Product Management (secondaire)** : le human handoff comme « first-class step » conçu en amont (non comme signal d'échec) est une décision PM — elle touche la roadmap, le design de l'expérience et la gouvernance du risque produit. Le scope étroit par agent reconduit la question du découpage fonctionnel. À confronter à nos PAD : nos clients PM sont-ils équipés pour prendre ces décisions de design ?

- **Product Ops (secondaire)** : le pattern d'état sérialisable ouvre des implications sur les rituels de monitoring et d'observabilité des agents en production (logs structurés, reprise de tâche, auditabilité). À confronter à nos REX d'accompagnement sur la mise en production d'agents.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** La valeur d'un accompagnement Product AI ne se résume pas à choisir un modèle — elle réside dans l'architecture du système autour du modèle. Ce contenu étaye l'argument que le vrai travail est dans le contexte, le control flow et la gestion d'état, pas dans le fine-tuning.

- **[Challenge]** Si les scaffoldings actuels ont vocation à être partiellement rendus obsolètes par les modèles futurs, nos offres d'accompagnement à la mise en production d'agents doivent intégrer une couche de révision architecturale régulière — à challenger par le KR Owner : quelle est notre doctrine sur la durabilité de ces patterns ?

- **[Renforce]** La supervision humaine explicite (handoff conçu, non subi) est un argument fort pour légitimer un rôle de PM dans la conception d'agents : c'est une décision produit, pas une décision technique seule. Recommandation au KR Owner Product Management : tester cet angle en avant-vente.

- **[Nouvelle — à valider]** Le « context engineering » pourrait constituer une micro-offre ou une composante formalisée de nos missions Product AI — cadrage des prompts, gestion de la fenêtre de contexte, définition contractuelle des outils. Hypothèse à vérifier côté PAD/Boond : y a-t-il une demande latente ou un gap observé sur ce point dans les missions en cours ?