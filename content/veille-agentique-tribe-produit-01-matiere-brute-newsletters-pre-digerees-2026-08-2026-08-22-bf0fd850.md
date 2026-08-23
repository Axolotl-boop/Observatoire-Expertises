## Digest de contenu — ByteByteGo (EP223), « Ollama vs vLLM vs SGLang » (22/08/2026)

---

### 1. VERDICT

Roundup technique éducatif de bonne facture, sans biais commercial sur les sujets principaux — le sponsoring Datadog est clairement labellisé et sans rapport avec la matière traitée. La pièce centrale (comparaison des runtimes d'inférence) est la seule à générer des implications stratégiques réelles pour la Tribe. Les autres sujets — watermarking Claude, agent skills, Git, Kafka — sont du remplissage de qualité correcte mais trop généraliste ou trop technique pour mériter un traitement approfondi ici ; seuls les deux premiers sont retenus comme signaux secondaires. Contenu pédagogique, pas analytique : il fournit de la matière à réutiliser, pas des conclusions prêtes à l'emploi.

---

### 2. CE QU'IL FAUT RETENIR

- **Trois régimes d'inférence, trois cas d'usage distincts** : Ollama pour le prototypage local (modèles pré-quantisés GGUF, FIFO, pas de concurrence), vLLM pour la haute charge GPU (continuous batching, PagedAttention pour le cache KV), SGLang pour les agents et dialogues multi-tours (RadixAttention, réutilisation des préfixes partagés via un arbre Radix). Le choix du runtime structure les contraintes d'architecture produit, il n'est pas anodin.

- **La réutilisation de préfixe (SGLang) est un gain concret sur les cas agents** : lorsque les requêtes partagent un contexte commun (historique de conversation, prompt système fixe, tool loops), ne pas recalculer ce contexte à chaque appel est un levier coût/latence non négligeable. Ce n'est pas du marketing — c'est une optimisation mesurable.

- **L'écosystème "agent skills" se structure** : le format instructions/scripts versionnés sur GitHub (12 repos identifiés, provenant d'Anthropic, Google/Addy Osmani, Karpathy indirect, etc.) signale une tentative de standardisation des comportements d'agents au-delà du prompting ad hoc. Encore fragile, mais le mouvement est observable.

- **Le watermarking de texte IA (cas Anthropic/Claude) est probabiliste et limité** : le mécanisme introduit un biais statistique lors de la sélection des tokens ; la détection repose sur un taux de correspondance, pas une certitude. Les faux négatifs sur l'écriture technique sont reconnus par l'auteur lui-même. La valeur opérationnelle reste débattue.

---

### 3. CE QUE ÇA DIT DU MARCHÉ

- **La fragmentation des runtimes d'inférence reflète une maturation de l'outillage IA** : les équipes ne choisissent plus « un LLM » mais une stack d'inférence calibrée sur un régime d'usage (local, production haute charge, agents). Cette segmentation s'installe dans les pratiques d'ingénierie produit. · **[tendance]**

- **L'émergence du format "agent skills" comme objet versionnable et partageable** suggère une proto-standardisation des comportements d'agents — premier pas vers une gouvernance des instructions, au-delà du prompt jetable. · **[tendance]**

- **La provenance du texte IA devient un enjeu industriel** : qu'Anthropic investisse dans le watermarking natif de Claude signal que la traçabilité de la génération IA sort du domaine académique pour entrer dans les produits. Les limites techniques actuelles (faux négatifs) n'invalident pas la direction. · **[tendance]**

- **Le débat sur la détection de texte IA reste ouvert et non résolu**, notamment pour l'écriture technique et spécialisée — terrain où les modèles actuels produisent du texte indiscernable. · **[mode]**

---

### 4. IMPACT POUR NOS EXPERTISES

- **Product AI (central)** : la grille Ollama/vLLM/SGLang est une matière directement réutilisable en avant-vente et en mission pour structurer le conseil sur l'architecture d'inférence des clients. L'argument SGLang sur les cas agents multi-tours est particulièrement actionnable. Hypothèse : nos missions IA portent-elles déjà sur ce choix de runtime, ou reste-t-il dans l'angle mort de nos livrables ? — à confronter à nos REX et PAD.

- **Product AI (central)** : le format "agent skills" comme vecteur de standardisation des comportements d'agents soulève une question de conseil potentielle — gouvernance des instructions, versioning des comportements, ownership du skill set en équipe produit. Hypothèse : un besoin non formulé pourrait exister chez les clients qui déploient des agents, à vérifier côté Boond/PAD.

- **QA (secondaire)** : le watermarking et ses limites documentées (faux négatifs sur l'écriture technique) posent directement la question de la fiabilité des outils de détection IA dans les processus de relecture et d'assurance qualité des livrables. Piste à creuser : comment nos clients QA traitent-ils ce risque aujourd'hui ? — à confronter à nos REX.

---

### 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : le choix du runtime d'inférence est une décision d'architecture produit à part entière, pas un détail d'implémentation technique — recommandation au KR Owner de vérifier si nos offres Product AI intègrent explicitement cette couche de conseil ou la laissent aux ingénieurs.

- **[Challenge]** : l'hypothèse implicite que « déployer un modèle open-weight = déployer Ollama » est trop simpliste dès que le client vise des agents ou de la production — SGLang et vLLM positionnent des avantages concrets, distincts et non interchangeables. À challenger systématiquement en mission.

- **[Nouvelle — à valider]** : l'émergence des "agent skills" comme format standardisé pourrait signaler un besoin de conseil en gouvernance des comportements d'agents (ownership, versioning, cohérence entre équipes) — un angle d'offre potentiel à tester, à confronter aux signaux PAD/Boond avant toute décision.