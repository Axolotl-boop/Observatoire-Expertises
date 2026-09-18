## Digest de contenu — Nikhyl Singhal / The Skip (cross-post Lenny's Newsletter), « Inside Gemini: How Google Runs Product for Its Model » (17/09/2026)

---

### 1. VERDICT

Entretien dense et concret avec Tulsee Doshi, head of product Gemini chez Google — l'une des rares personnes à avoir articulé publiquement ce que signifie concrètement être PM sur un modèle frontier. La matière est exploitable sur deux niveaux : repositionnement du métier PM à l'ère IA, et pratiques transférables immédiatement (evals, prototype-first, conviction-based shipping). À signaler : le podcast est sponsorisé par Chargebee (billing SaaS, sans lien avec le fond) et Nikhyl Singhal promeut sa communauté payante Skip Coach ainsi que son service Nikhyl.AI — ces plugs n'altèrent pas la substance de l'interview, mais rappellent que la mise en scène sert aussi un business personnel. Le contenu lui-même tient la distance.

---

### 2. CE QU'IL FAUT RETENIR

- **Pas de requirements doc client** : le PM d'un modèle frontier décide lui-même ce que « capable » signifie, pour quels usages, pour quels clients. Il arbitre ensuite entre demandes entrantes et direction de la recherche — un rôle de plateforme sans précédent, qui n'existait pas dans les playbooks PM classiques.
- **La compétence rare n'est pas technique au sens CS** : c'est la capacité à dire précisément ce que « bon » ressemble — avec 20 exemples reproductibles, un win et un loss évidents. Les chercheurs peuvent hill-climber vers n'importe quelle cible mesurable ; définir la cible est le travail du PM.
- **Un modèle a une personnalité** que les benchmarks ne capturent pas. Quelqu'un doit en être propriétaire, avec un set de prompts stables joués contre chaque nouvelle version et contre les modèles concurrents. C'est du consumer PM transposé : du goût avant les données.
- **Prototyper délibérément des features que le modèle ne sait pas encore faire** (règle approximative : 60 % opérationnel, 20 % passable, 20 % reach) permet d'être premier à tirer parti du prochain saut de capacité — et génère un feedback upstream assez précis pour orienter la recherche.
- **Shipper sur conviction, pas sur checklist** : deux questions suffisent — quelque chose est-il fondamentalement cassé ? Y a-t-il des signaux de changement de comportement (conversations plus longues, tâches plus complexes) ? Chaque release est un zéro-à-un ; aucun feu vert exhaustif ne peut tenir ce rythme.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- Le métier PM se bifurque : un archétype « research PM » émerge dans les labs, distinct du consumer PM et de l'enterprise PM, centré sur la définition de la qualité et la traduction research ↔ produit · **[tendance]**
- L'eval devient une compétence PM à part entière — non plus cantonnée à l'ingénierie ou à la data science — premier signal d'une requalification du métier en profondeur · **[tendance]**
- La personnalité du modèle comme vecteur de différenciation produit (au-delà des benchmarks) s'installe comme pratique managée, pas seulement comme discours marketing · **[tendance]**
- Le prototype-first supplante progressivement le cycle requirements → maquette → build dans les équipes qui construisent sur des modèles — la preuve par l'exemple remplace la preuve par le spec · **[tendance]**
- La conviction-based shipping comme réponse organisationnelle à la vélocité IA : signe d'une gouvernance du lancement qui se réinvente sous contrainte de rythme · **[tendance]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product Management (central)** : le cadrage « le PM définit ce que bon veut dire » est directement réutilisable dans nos offres de discovery et de priorisation. Le glissement vers une compétence de définition de la qualité (evals, 20 prompts, win/loss explicites) peut nourrir un axe de montée en compétence à proposer à nos clients — à confronter à nos PAD/REX : nos missions PM intègrent-elles déjà cette pratique ou reste-t-elle systématiquement absente ?

- **Product AI (central)** : le modèle de collaboration PM-researcher (obtenir un seat, calibrer à la motivation du chercheur, traduire une vision en evals actionnables) est une mécanique inédite pour les équipes qui construisent des produits IA internes ou intègrent des LLMs dans leur surface. Nos accompagnements couvrent-ils ce mode opératoire ? — à confronter à nos REX : ce gap est-il déjà identifié chez nos clients ?

- **QA (secondaire)** : la pratique des evals (20 prompts, win/loss explicites, construction itérative sur plusieurs jours/semaines) est une extension naturelle du métier QA vers l'ère LLM — signal à intégrer dans nos offres QA IA — à confronter à nos REX QA : avons-nous des missions où ce type d'eval est déjà demandé ou manifestement manquant ?

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : la valeur du PM se déplace vers la définition de la qualité et la gouvernance de la preuve — « savoir ce que bon veut dire » est plus rare et plus précieux que la maîtrise du delivery. Cette conviction mérite d'être challengée par le KR Owner sur nos offres de cadrage.

- **[Renforce]** : le prototype-first n'est pas une méthode agile recyclée — appliqué aux modèles IA, il devient un outil de veille capacitaire proactive (backlog de features sur modèles futurs). C'est une posture que nos clients n'adoptent pas encore spontanément.

- **[Challenge]** : la pratique des « vibes » comme compétence PM est réelle mais difficile à industrialiser et à transmettre. À ne pas romantiser dans nos offres sans méthode associée : comment structurer un set de prompts de référence ? Comment l'entretenir dans le temps ? L'idée de fond est solide, l'opérationnalisation reste à construire.

- **[Nouvelle — à valider]** : un nouveau profil PM hybride (product + eval design + taste) émerge dans les labs et va probablement diffuser vers les entreprises déployant des LLMs. Recommandation au KR Owner : anticiper une demande de formation ou d'accompagnement sur cette compétence — hypothèse à vérifier côté PAD/Boond.