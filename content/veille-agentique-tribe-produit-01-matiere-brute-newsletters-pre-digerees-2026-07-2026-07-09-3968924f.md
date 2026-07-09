---

**Digest de contenu — ByteByteGo, « Streaming vs Batch: Two Philosophies of Data Processing » (09/07/2026)**

---

## 1. VERDICT

Contenu technique d'éducation, sans biais commercial identifiable — ByteByteGo est une newsletter d'ingénierie indépendante, sans sponsoring déclaré dans cet envoi. Limite majeure : seule l'introduction est accessible, l'article complet étant réservé aux abonnés payants. La matière exploitable se réduit à un cadrage conceptuel (complétude vs latence) et à une table des matières détaillée. Insuffisant pour une analyse de fond exhaustive, mais le signal architectural est réel et directement pertinent pour la pratique Data PM.

---

## 2. CE QU'IL FAUT RETENIR

- Le choix batch vs streaming n'est pas un arbitrage d'outil : c'est une réponse à une question de conception fondamentale — à quel moment la donnée est-elle suffisamment complète pour déclencher le calcul ? Poser cette question en amont change la nature du brief.
- Le batch mise sur la **complétude** (frontière naturelle : fin de fichier, clôture de journée) ; le streaming parie sur la **vitesse** en acceptant une incertitude structurelle sur la complétude des données entrantes.
- Le **micro-batch** occupe l'espace intermédiaire : il émule le streaming avec une logique batch, au prix d'une latence résiduelle incompressible — souvent présenté comme "du streaming" dans les briefs clients, alors que ce n'en est pas.
- La gestion des **données tardives** (*late data*) est le problème non trivial du streaming : les *watermarks* sont la réponse standard, mais ils introduisent une estimation probabiliste, non une garantie — implication directe sur la fiabilité des métriques temps réel.
- **Lambda** et **Kappa** sont deux architectures de réconciliation entre vitesse et exactitude : Lambda maintient deux couches (batch + stream), Kappa les fusionne. Le choix engage l'organisation autant que la technique.

---

## 3. CE QUE ÇA DIT DU MARCHÉ

- La frontière batch/streaming s'estompe progressivement : micro-batch, architecture Kappa, moteurs unifiés (Flink, Spark Structured Streaming) indiquent une convergence des paradigmes vers un modèle hybride · **[tendance]**
- *Exactly-once processing* tend à devenir un critère de maturité attendu sur les pipelines critiques, non plus un différenciateur technique · **[tendance]**
- Le streaming temps réel s'impose comme **hypothèse par défaut** dans les nouvelles architectures data, même lorsque le batch suffirait — souvent porté par des effets de mode plus que par une analyse du besoin réel · **[mode]**

---

## 4. IMPACT POUR NOS EXPERTISES

- **Data PM** *(central)* : le choix batch vs streaming est une décision produit structurante — latence acceptable, coût opérationnel, tolérance aux données tardives, garanties d'exactitude. Ces critères devraient figurer explicitement dans nos cadres de discovery data platform ; la piste à creuser est de les formaliser en questions de qualification client — à confronter à nos PAD/REX sur des missions data.
- **Product AI** *(secondaire)* : les pipelines d'inférence temps réel (recommandation, détection d'anomalie, feature stores) reposent sur du streaming ; un PM IA qui sous-spécifie les contraintes de fraîcheur des features expose le produit à des dérives silencieuses — à confronter à nos REX sur des produits IA en production.

---

## 5. CONVICTIONS À RENFORCER OU À CHALLENGER

- **[Renforce]** : la posture Data PM ne peut pas se limiter au *quoi* (indicateur, modèle, contrat de données) — elle inclut le *quand*. La latence acceptable est une décision produit, pas un détail d'implémentation ; recommandation au KR Owner : l'intégrer explicitement dans nos livrables de discovery data.
- **[Challenge]** : l'hypothèse implicite que "tout devrait être en temps réel" est souvent mal posée. La complexité opérationnelle du streaming (watermarks, late data, exactly-once, coût infra) a un prix réel que nos offres doivent savoir nommer — et challenger — avant de valider un choix d'architecture avec un client.
- **[Nouvelle — à valider]** : hypothèse que la maîtrise des arbitrages lambda/kappa devient un attendu implicite dans les briefs data platform de nos clients ; à vérifier côté PAD/Boond sur les profils demandés et les critères de choix exprimés en avant-vente.