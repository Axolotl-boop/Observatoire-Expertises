## Digest de contenu — Hamel Husain & Shreya Shankar, via Lenny's Newsletter, « Advanced evals: How to find (and fix) hidden AI failures in your product » (22/09/2026)

---

### 1. VERDICT

Contenu substantiel, ancré dans 50+ missions terrain et une étude empirique sur 100 traces réelles. Le reframe central — « l'error discovery est aux evals ce que la product discovery est à la roadmap » — est réutilisable immédiatement. **Biais à signaler** : Husain et Shankar sont les auteurs d'un cours payant (« AI Evals for Engineers & PMs ») promu avec code promo dans l'article, et le plugin *evals-skills* qu'ils décrivent est le leur. La méthode reste solide, mais la section outillage doit être lue avec ce prisme : le workflow est conçu pour mener vers leur écosystème. Le fait que l'article soit tronqué (paywall à l'étape 3) limite partiellement la matière exploitable, mais ce qui est disponible est dense.

---

### 2. CE QU'IL FAUT RETENIR

- **La métrique sans exploration préalable est un pari risqué.** La plupart des équipes sautent l'étape de découverte des erreurs et écrivent des métriques à partir d'hypothèses implicites — elles finissent à mesurer la mauvaise chose, ou la bonne chose mal. L'article appelle ce biais structurel d'exécution "aller trop vite vers le concret".
- **Le "criteria drift" invalide l'automatisation précoce.** La définition de ce qui est "bon" évolue en regardant les données réelles — un agent qui n'a pas encore ces critères va rater des pannes entières (ex. : l'absence de rebond commercial dans un leasing assistant). Cela impose un passage humain obligatoire *avant* de déléguer à l'agent.
- **Humain + agent : complémentarité asymétrique.** Les agents détectent les erreurs évidentes internes à une trace (contradiction entre output et tool call). Ils ratent les échecs dépendants du contexte produit ou d'éléments extérieurs à la trace. Ils introduisent aussi du bruit en flaggant des réponses correctes.
- **L'active learning comme protocole.** Le processus recommandé : 10 traces annotées manuellement → l'agent propose des annotations → l'humain valide ou corrige → itérations jusqu'à convergence, viser 100 traces. Ce protocole réduit le biais d'automatisation et amortit le coût de l'exploration.
- **Les evals deviennent une compétence recrutée explicitement.** Près de la moitié des 25 offres PM partagées par Lenny la semaine précédente demandent une expérience en écriture d'evals. Ce n'est plus un nice-to-have d'équipe ML.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- La compétence "écriture d'evals" entre dans les critères de recrutement PM au même titre que la maîtrise SQL il y a dix ans · **[tendance]**
- L'incapacité des agents à exercer du jugement produit hors-trace redéfinit le rôle du PM dans les équipes IA : gardien de la définition du "bon", pas simple superviseur de pipeline · **[tendance]**
- L'analogie error discovery / product discovery est en train de s'imposer comme cadre de référence partagé dans les cercles PM-AI (Mike Krieger, Garry Tan, guests Lenny's Podcast convergent sur ce lexique) · **[tendance]** teinté **[mode]** (la formule "evals are the new PRDs" circule beaucoup ; reste à voir si elle résiste à l'épreuve du terrain)
- L'écosystème d'outillage autour des evals (LangSmith, Arize, Langfuse, Phoenix + plugins indépendants) se fragmente et se spécialise, signal d'un marché en croissance rapide mais encore sans standard dominant · **[tendance]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : le cadre en trois étapes (traces → annotation hybride → priorisation par failure modes) est directement transférable comme méthode de conseil pour les clients qui construisent des features IA. L'argument sur le criteria drift justifie à lui seul de systématiser une phase d'exploration humaine avant toute définition de métriques — piste pour une offre "AI quality discovery sprint" — à confronter à nos REX sur les missions IA en cours et aux retours PAD sur les besoins exprimés.
- **QA (central)** : les evals sont une extension naturelle du périmètre QA, mais avec une logique inversée : on part des failures du monde réel, pas d'une spec à valider. L'article pose clairement que les tests classiques (assertions déterministes) ne suffisent plus dès qu'un LLM est dans la boucle. Cela peut fonder un repositionnement de notre offre QA vers un profil "QA for AI" — à confronter à nos PAD/REX pour voir si cette demande remonte déjà chez nos clients.
- **Product Management (secondaire)** : le reframe "error discovery = product discovery" et "evals = PRDs" est un argument d'avant-vente utile pour convaincre des PMs réticents à s'impliquer dans la qualité IA. Utilisable dans nos ateliers de sensibilisation ou nos pitches — à confronter à nos retours de formations et à nos missions où des PMs co-construisent des systèmes IA.
- **Product Ops (secondaire)** : la question du "qui fait l'annotation, avec quelle cadence, dans quel rituel d'équipe" est un sujet Product Ops pur. Le protocole décrit (active learning + plugin + coding agent) suggère que l'outillage et la gouvernance du process d'eval méritent d'être inclus dans nos diagnostics de maturité opérationnelle produit — à confronter à nos grilles de maturité existantes et aux missions de scaling.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : la qualité d'un produit IA ne peut pas être déléguée entièrement à l'automatisation — le jugement métier humain reste la contrainte non compressible. Cette conviction devrait structurer notre positionnement sur les missions d'accompagnement IA.
- **[Renforce]** : la discovery (ici appliquée à l'évaluation) précède toujours utilement la définition de métriques ou de specs. Le pattern est général, et son application aux evals le confirme plutôt que le contredit.
- **[Challenge]** : « evals are the new PRDs » — la formule est séduisante mais probablement surjouée. Elle fonctionne pour des équipes AI-native ; pour des équipes produit classiques intégrant progressivement de l'IA, le PRD reste le document de coordination central et les evals s'y adjoignent. À challenger par nos KR Owners Product Management avant de la réutiliser en avant-vente.
- **[Nouvelle — à valider]** : si les evals deviennent une compétence recrutée au niveau PM, une offre de formation ou de montée en compétence ciblée "PM & evals" pourrait trouver un marché. Hypothèse à vérifier côté PAD/Boond : observe-t-on des demandes de renforcement de compétences sur ce sujet chez nos clients ou prospects ?