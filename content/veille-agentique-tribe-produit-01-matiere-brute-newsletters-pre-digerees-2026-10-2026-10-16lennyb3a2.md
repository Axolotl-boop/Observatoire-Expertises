## Digest de contenu — Elena Verna (cross-post Lenny's Newsletter), « What on earth is going on with AI pricing and packaging? » (16/10/2026)

---

### 1. VERDICT

Teardown solide et honnête sur l'état du pricing IA en 2026, avec des exemples concrets (Grok, Muse, ChatGPT, Anthropic, 11Labs, Lovable). Le niveau d'analyse dépasse le constat d'évidence : l'auteure décompose quatre mécanismes distincts qui rendent le pricing IA structurellement difficile, pas seulement mal exécuté. **À noter : Elena Verna est growth lead chez Lovable** — elle le déclare et n'en fait pas un argument de vente, ce qui préserve la crédibilité de l'analyse. SurveyMonkey est sponsor déclaré, sans influence sur le fond. L'article est faible sur les solutions (elle l'admet), mais fort sur le diagnostic — ce qui est précisément ce qui le rend utile pour notre cabinet.

---

### 2. CE QU'IL FAUT RETENIR

- **La monnaie arcade comme écran de fumée involontaire.** Crédits, tokens, compute units : ces monnaies internes ne sont pas toujours cyniques — elles résolvent un vrai problème d'hétérogénéité des coûts d'inférence. Le problème, c'est que personne n'explique à quoi elles correspondent en valeur d'usage réelle. On vend du mystère, pas de la valeur.

- **L'unité de valeur est le vrai angle mort.** Le SaaS avait des proxies compréhensibles (siège, stockage, transaction). L'IA générative, surtout agentique, n'en a pas : une même tâche peut consommer dix fois plus ou moins selon le comportement du modèle, le contexte, les erreurs et les retries. L'incertitude est double — côté client *et* côté éditeur.

- **Les early adopters absorbent l'opacité ; le mass market ne le fera pas.** Le marché actuel tolère des pages de pricing illisibles parce que les produits sont nouveaux et l'enthousiasme supplée à la clarté. Ce n'est pas un modèle durable : l'expansion vers des acheteurs moins techniques exigera de la prévisibilité.

- **L'outcome-based pricing est une aspiration, pas encore une réponse.** En théorie, aligner le revenu sur la valeur délivrée est la cible. En pratique, trois obstacles bloquent : coûts de delivery trop variables, définition du succès contestable, risque de fraude massif sur les tiers gratuits — ce dernier point étant propre à l'IA et souvent sous-estimé.

- **Première entreprise à rendre son pricing lisible = avantage concurrentiel non-négligeable.** Ce n'est pas un claim marketing : c'est la conclusion logique d'un marché où la différenciation par le modèle s'érode et où l'axe « confiance / prévisibilité » reste vierge.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- **L'effacement de l'unité de valeur SaaS** (siège, usage, transaction) au profit de monnaies abstraites sans ancrage d'usage — symptôme d'une incapacité sectorielle à modéliser la valeur délivrée par l'IA. · **[tendance]**

- **L'opacité tarifaire comme stratégie de croissance temporaire** : les éditeurs IA croissent malgré (ou grâce à) l'illisibilité de leur pricing, parce que la nouveauté du produit compense. Ce levier s'épuise à mesure que le marché mûrit. · **[tendance]**

- **Le pricing agentique comme nouveau problème de fond** : les agents multi-étapes cassent tous les modèles de consommation prévisible, créant une asymétrie d'information radicale entre éditeur et client. · **[structurel] (à valider)**

- **Le risque fraude comme contrainte de design produit** : dans l'IA, un faux compte ne pollue pas seulement les métriques — il détruit la marge. La fraude entre dans la conception même du pricing. · **[tendance]**

- **L'outcome-based pricing comme horizon déclaré mais non atteint** — repeated mantra de l'industrie, sans réalisation concrète à date. · **[mode]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **PMM (central)** : L'article est une mine pour cadrer la question du *value metric* dans les missions GTM autour de produits IA — comment choisir l'unité de facturation qui ancre la valeur dans quelque chose que le client comprend et peut prédire. La grille des quatre obstacles (hétérogénéité des coûts, définition du succès, fraude, prévisibilité) est directement mobilisable en avant-vente pour qualifier la maturité GTM d'un client éditeur IA — à confronter à nos PAD/REX : avons-nous des missions GTM IA en cours où ce diagnostic recoupe un blocage vécu ?

- **Product Management (central)** : La question « quelle est l'unité de valeur de mon produit ? » est un classique de la discovery, mais l'article démontre qu'elle devient insoluble pour les produits agentiques génériques. Cela invite à repositionner nos offres de cadrage autour du *job-to-be-done* et du *value metric* dès la phase de discovery, avant que le pricing ne soit abordé — à confronter à nos REX : dans nos missions PM, ce blocage sur l'unité de valeur a-t-il déjà été un point de friction ?

- **Product AI (secondaire)** : La variabilité des coûts d'inférence selon le comportement des agents (planification, retries, appels d'outils) est un signal opérationnel important pour tout PM travaillant sur un produit agentique. La fraude comme contrainte de design est un angle souvent ignoré — à confronter à nos REX : nos missions sur des produits IA intègrent-elles cette dimension dans le design du modèle économique ?

- **Product Ops (secondaire)** : La complexité cognitive des grilles tarifaires IA (11Labs en est l'exemple caricatural cité) touche directement la scalabilité de la fonction produit : comment documenter, communiquer et faire évoluer un pricing aussi instable en interne ? — à confronter à nos PAD : des clients en hypercroissance IA rencontrent-ils ce problème d'alignement interne sur le pricing ?

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : La valeur d'un produit IA se construit sur le *job-to-be-done*, pas sur le volume de tokens. Nos missions de discovery et de positionnement doivent systématiquement remonter à l'unité d'impact client avant toute réflexion sur le packaging — à challenger par le KR Owner Product Management.

- **[Challenge]** : L'outcome-based pricing est souvent présenté comme la réponse évidente à l'opacité tarifaire IA. L'article démontre qu'il est actuellement inapplicable pour la plupart des produits agentiques — coûts variables, succès indéfini, fraude. Notre conviction qu'il faut « aller vers les outcomes » mérite d'être nuancée par une lecture des conditions d'activation — à challenger par le KR Owner PMM.

- **[Renforce]** : Le passage early adopters → mass market est le vrai seuil de maturité produit IA. Les produits qui n'auront pas résolu la lisibilité de leur pricing avant ce passage seront en difficulté. C'est une opportunité de positionnement pour nos offres d'accompagnement GTM et de discovery — à challenger par le KR Owner PMM.

- **[Nouvelle — à valider]** : Le *value metric* (unité de facturation ancrée dans la valeur client) pourrait devenir un livrable autonome dans nos missions Product AI et PMM — une étape de diagnostic avant la définition du pricing, à l'image de ce que le *value proposition design* est au positionnement. Hypothèse à vérifier côté PAD/Boond : existe-t-il une demande latente pour ce type d'accompagnement ?