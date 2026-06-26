## Digest de contenu — Ravi Mehta (Ravi on Product / Substack), « How to Stop Tokenmaxxing and Cut AI Spend 10x » (04/06/2026)

---

### 1. VERDICT

Article solide et techniquement étayé, sans sponsoring identifiable — Anthropic et OpenAI sont cités comme exemples de pricing, non comme partenaires. L'angle est opérationnel et contre-intuitif : les meilleures pratiques affichées de l'IA (modèle le plus puissant, skills empilées, LLM pour tout) sont précisément ce qui fait exploser les coûts et dégrader la qualité. Le cadre en trois fixes est cohérent, outillé par des chiffres de pricing réels, et directement transposable en conseil. Valeur réelle pour la Tribe, notamment sur Product AI et Product Ops.

---

### 2. CE QU'IL FAUT RETENIR

- Le modèle frontier n'est pas un bon défaut : c'est une voie d'escalade. Une politique de routage délibérée (tâche → tier de modèle approprié) peut diviser les coûts par 6 à 10 à iso-qualité, les modèles mid-tier étant structurellement le frontier du trimestre précédent.
- Les "skills" (contextes prépackagés et réutilisables) ne sont pas des briques neutres : chaque skill chargée est du contexte facturé, et l'accumulation provoque un "context rot" — le modèle perd en focus à mesure que le contexte s'alourdit de règles non pertinentes.
- L'anti-pattern central du tokenmaxxing : traiter le LLM comme un ordinateur universel. Les problèmes déterministes (calcul, tri, validation, logique conditionnelle) appartiennent au code ; les problèmes de reconnaissance de pattern appartiennent au modèle. Confondre les deux alourdit le prompt sans améliorer le résultat.
- Le pattern hybride — petits outils déterministes exposés via tool use / function calling, appelés à la demande par le modèle — est l'architecture recommandée : il réduit la taille de fenêtre, améliore la fiabilité et fait sortir la charge computationnelle du LLM.
- La latence et la variance sont des arguments autant que le coût : un modèle surdimensionné répond plus lentement et de façon moins prévisible, ce qui détériore l'adoption des outils internes indépendamment du prix.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- La maturité IA des équipes produit bascule du réflexe "plus de modèle = mieux" vers une ingénierie disciplinée du coût et de la qualité — le tokenmaxxing en est le symptôme visible · **[tendance]**
- L'écart de prix entre tiers de modèles (facteur >6x chez OpenAI comme chez Anthropic) crée une nouvelle compétence métier : le model routing, qui devient un levier de compétitivité opérationnelle différenciant · **[tendance]**
- Le "context rot" comme failure mode documenté des agents LLM signale une limite réelle de l'architecture naïve par accumulation de contexte · **[tendance]**
- L'émergence d'un pattern hybride computation + LLM (tool use / function calling) comme standard d'architecture pour les systèmes IA robustes · **[structurel] (à valider)**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : les trois fixes forment un cadre d'architecture directement utilisable dans nos accompagnements IA — routage de modèles, gouvernance du contexte, pattern hybride code/LLM. Matière pour repositionner une offre "AI architecture review" ou "AI system design" au-delà du simple choix de modèle — à confronter à nos REX de projets IA et aux signaux côté PAD/Boond sur les douleurs opérationnelles clients.
- **Product Ops (secondaire)** : la gestion des skills comme coût opérationnel caché (contexte inutile, overhead de chaque requête) pointe vers un nouveau rituel de gouvernance des outils IA d'équipe : audit, scope, déclenchement conditionnel. Hypothèse : ce besoin pourrait exister chez des clients ayant outillé leurs squads sans discipline de maintenance — à confronter à nos PAD/REX.
- **Product Management (secondaire)** : la question du ROI de l'IA avant le budget annuel épuisé (anecdote Uber, $500M/mois) est un signal de gouvernance qui peut alimenter des conversations de cadrage avec des sponsors exécutifs — à confronter à nos retours d'expérience en avant-vente.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : la valeur d'un accompagnement Product AI ne réside pas dans l'activation de modèles mais dans l'architecture de leur usage — routage, gestion du contexte, hybridation code/LLM. C'est une conviction à ancrer dans notre discours d'offre, à challenger par le KR Owner sur la base de nos REX.
- **[Renforce]** : la distinction computation vs. learning (problèmes à règles / problèmes à reconnaissance de pattern) est un cadre pédagogique puissant pour l'avant-vente et la montée en compétence des équipes produit — plus rigoureux et moins galvaudé que "IA générative vs. IA prédictive".
- **[Challenge]** : l'argument "mid-tier = frontier d'hier, donc suffisant" suppose une courbe de dépréciation stable et une équivalence qualitative sur des tâches complexes — à tester sur nos propres cas d'usage avant de le transmettre en conviction client.
- **[Nouvelle — à valider]** : une offre "AI cost governance" ou "AI architecture review" pourrait adresser un besoin réel chez des clients ayant déployé de l'IA sans discipline opérationnelle — hypothèse à vérifier côté PAD/Boond avant d'en faire un axe de développement commercial.