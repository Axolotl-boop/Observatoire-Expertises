## Digest de contenu — ByteByteGo, « How to Make LLMs 3X Faster » (26/08/2026)

---

### 1. VERDICT

Article technique solide, pédagogique et non promotionnel sur le **speculative decoding** — une technique d'inférence LLM bien établie mais souvent mal comprise hors des équipes MLOps. La valeur pour le cabinet est limitée mais réelle : comprendre pourquoi la latence d'un LLM dépend autant du *type de tâche* que du modèle lui-même est un levier de conception produit sous-exploité. À noter : la newsletter contient une **section sponsorisée clairement étiquetée** (« Loop Engineering ») sans lien avec l'article principal — elle n'est pas traitée ici. Pas de biais commercial dans le corps de l'article.

---

### 2. CE QU'IL FAUT RETENIR

- La génération de tokens par un LLM est **bornée par la bande passante mémoire, pas par le calcul** : le GPU charge ~140 Go de poids pour chaque token d'un modèle 70B, mais n'effectue qu'une infime fraction d'arithmétique dessus. Les unités de calcul sont inactives 60 à 80 % du temps pendant la génération.
- Le speculative decoding **récupère cette capacité inutilisée** : un petit modèle « draft » propose K tokens, le grand modèle les vérifie tous en un seul passage parallèle. Le gain typique est de 2 à 3x en latence — sans dégradation de la qualité de sortie, garantie par la règle d'acceptation.
- Les **gains sont étroitement liés au type de tâche** : les sorties structurées et répétitives (code, résumé, extraction, RAG) obtiennent des taux d'acceptation élevés (80–90 % cités par DeepSeek-V3) ; les tâches ouvertes ou créatives peuvent tomber sous 50 % et annuler l'avantage.
- La technique **s'effondre sous forte concurrence** : à batch size 128, le gain mesuré passe de ~2x à ~1.2x, voire en dessous du débit baseline. C'est un paramètre d'infrastructure à piloter dynamiquement (vLLM le fait via un flag configurable).
- Il existe **quatre familles de sources de tokens draft** — modèle sibling, têtes de prédiction entraînées sur le modèle cible (DeepSeek-V3), version compressée du même modèle, recherche lexicale sur le contexte — chacune avec un profil de coût et de compatibilité différent.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- **L'optimisation de l'inférence devient une compétence produit, pas seulement MLOps** : le choix du type de tâche (structurée vs ouverte) influe directement sur le coût et la latence, indépendamment du modèle choisi · [tendance]
- **Le coût de l'inférence reste un enjeu de design, pas seulement d'infrastructure** : les équipes qui conçoivent des features LLM sans modéliser le profil de sortie (longueur, variété, température) subissent des coûts et latences imprévus · [tendance]
- **La commoditisation des techniques d'inférence avancées** (speculative decoding intégré nativement dans vLLM, DeepSeek, etc.) réduit la barrière d'adoption pour les équipes produit · [tendance]
- **Le modèle de performance LLM est fondamentalement non-linéaire** : la promesse marketing « 3x plus rapide » est conditionnelle à la charge serveur et au type de workload — signal de prudence sur les benchmarks vendeurs · [mode]

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : la dépendance entre *type de feature* et *profil de latence/coût LLM* est une donnée de conception à intégrer dès le discovery. Une feature de résumé et une feature de conversation libre n'ont pas le même coût d'inférence à modèle égal — cela change les arbitrages build/buy et la sélection de modèles. Piste : construire une grille de qualification « tâche → profil d'inférence → budget latence » réutilisable en mission — à confronter à nos REX de missions IA pour valider si ce facteur est déjà modélisé côté clients.
- **Product Management (secondaire)** : la latence perçue par l'utilisateur final est une dimension de qualité produit souvent absente des critères d'acceptance. Le fait que les outputs structurés bénéficient 2-3x plus des optimisations que les outputs ouverts peut orienter des choix de roadmap (favoriser des patterns RAG ou extraction plutôt que génération libre pour les cas sensibles à la latence) — à confronter à nos PAD pour voir si ce type d'arbitrage est posé en phase de cadrage.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : « choisir un LLM » n'est pas une décision technique isolée — le design du produit (type de sortie, longueur, température) co-détermine le coût réel et la performance perçue. Nos offres Product AI doivent intégrer cette dimension dès le discovery.
- **[Challenge]** : la promesse de gains 2-3x en latence via l'inférence optimisée pourrait conduire des clients à sous-investir dans la conception des usages. À challenger : l'optimisation infra ne compense pas un mauvais design de feature — recommandation à soumettre au KR Owner Product AI.
- **[Nouvelle — à valider]** : la grille « workload structuré vs ouvert » comme critère explicite de choix d'architecture LLM pourrait devenir un livrable de nos missions de cadrage IA — à valider côté PAD/Boond pour voir si un besoin de ce type est déjà remonté.