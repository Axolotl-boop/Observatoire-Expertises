# Synthèse de la demande — Bootstrap (12 mois glissants)

*Brique propriétaire `Notes-PAD-retraitées` — la demande réelle, dérivée du pipe commercial Boond.*

| | |
|---|---|
| **Source** | Extract Boond `extractbi_16939` (pipe commercial) |
| **Période** | Détection sur 12 mois glissants : 12/06/2025 → 12/06/2026 |
| **Volume** | 479 opportunités · 106 clients distincts |
| **Méthode** | Filtre sur date de détection · split régie / conseil · classification expertise heuristique · lecture détaillée du sous-ensemble conseil |
| **Garde-fous** | Données anonymisées (ni client, ni montant, ni nom). Classification par expertise = **approximative** (mots-clés sur texte libre), à confirmer à l'œil. |

> **À quoi sert ce document.** C'est la photo de ce que le marché *nous demande réellement*, destinée à être **croisée** avec la veille externe (newsletters) dans le digest d'expertise. Il rapporte la demande ; il ne décide pas de l'offre.

---

## 1. Vue d'ensemble

- **La demande est massivement de la régie** : 424 opportunités d'immersion (Régie / AT) contre **52 de conseil** (Conseil Produit Fullstack + Coaching & formation + Forfait), soit ~88 % / 11 %. Ce sont deux signaux différents, traités séparément ci-dessous.
- **Le conseil convertit bien mieux que la régie** : taux de transformation ~**62 %** sur le conseil (20 gagnées / 32 décidées) contre ~**21 %** sur la régie (61 / 294). Le petit volume de conseil est le signal le plus qualitatif *et* le plus rentable en taux de succès.
- **Demande concentrée** : sur 106 clients, 49 portent ≥ 3 opportunités sur l'année et 24 en portent ≥ 5 ; le client le plus actif en concentre 41 à lui seul. Une poignée de comptes tire une grande part du volume — à garder en tête, le mix de demande est partiellement biaisé par ces gros comptes.

---

## 2. La demande de régie (le volume)

*Ce que les clients nous demandent de placer. Classification heuristique, à lire comme un ordre de grandeur.*

**Mix par expertise** (mentions, multi-label sur 479) :

| Expertise | Mentions | Lecture |
|---|---|---|
| Product Management | ~70 % | Le cœur de la demande : PM / PO, profils produit « généralistes ». |
| Product AI | ~26 % | Présence forte et **croissante** — l'IA est mentionnée dans environ une opportunité sur quatre (à relativiser : « mention » ≠ mission AI). |
| PMM | ~12 % | Présence modérée. |
| Data PM | ~5 % | Marginale mais réelle (cf. missions data-product en conseil). |
| Product Ops | ~5 % | Marginale. |
| QA | *(repère gonflé)* | Le mot « recette » sature le repérage ; la **demande QA spécialisée est faible** — la QA apparaît surtout comme composante des équipes delivery (PO/Dev/QA), pas comme demande autonome. |

**Profils & séniorité** : la demande tire nettement vers le **haut** — Lead (111 mentions), Head / Director (84), Senior (50), Coach (49), loin devant Junior (28). Les clients cherchent des profils produit **expérimentés et de leadership**, et du **coaching**, pas des juniors.

**Compétences & contexte dominants** : delivery (149), discovery (124), plateforme (119), UX/design (116), agile/scrum (104), analytics/KPI (83), roadmap (80), Jira/Confluence (73). Marché plutôt **B2B** (38) que B2C (30), avec une coloration SaaS / plateforme.

---

## 3. La demande de conseil (le signal stratégique)

*Lecture détaillée des 26 opportunités Conseil Produit. C'est ici que se lit ce qu'on nous achète vraiment au-delà du placement.*

Six motifs reviennent nettement :

1. **Audits de maturité produit** — diagnostics courts, souvent commandés pour *convaincre un comex / une DSI* d'enclencher une transformation (passage Sales-led → Product-Led, justification d'une transfo agile). Motif le plus récurrent.
2. **Transformation de l'operating model & clarification des rôles** — désilotage, RACI, ownership produit flou, « faire monter les PM d'un cran », structuration data-produit. La demande de structuration organisationnelle est forte.
3. **Posture produit face au business** — accompagner les équipes à dialoguer avec les stakeholders, parler « data-oriented », concilier priorités business et impératifs produit. Demande de *coaching de posture*, pas seulement de méthode.
4. **Data Product / gouvernance de la donnée** — produits dont l'asset central est un référentiel/donnée complexe, enjeux d'exposition, datalake, clarification des rôles data-produit. Petit volume mais stratégique.
5. **IA dans le produit** — documentation « agent-first » requêtable, chat IA encadré dans une app, optimisation des *ways of working* sur l'IA. L'IA arrive comme objet de mission conseil, pas seulement comme outillage.
6. **QA à l'échelle** — audit de la qualité du patrimoine de tests en contexte SAFe multi-trains, structuration QA d'un SDK mobile multi-plateforme. La QA spécialisée existe en conseil, sur des enjeux de fiabilité à l'échelle.

À la marge, un septième motif : **cadrage / lancement de nouvelles offres & relais de croissance** (PLG, go-to-market, market research international).

**Secteurs (observation qualitative, non systématique)** : le conseil se concentre côté **banque / paiement, jeux & loterie, médias-presse, voyage/travel-tech, industrie-IoT, edtech**. À traiter comme une tendance d'échantillon, pas comme une mesure.

---

## 4. Concurrents cités (→ alimente la veille concurrentielle)

Fréquence de citation dans les descriptions du pipe (proxy de présence dans notre orbite, **pas** un décompte de confrontations gagnées/perdues — certaines mentions sont contextuelles) :

| Concurrent | Citations |
|---|---|
| Thiga | 24 |
| Wefiit | 19 |
| Converteo | 8 |
| Octo | 5 |
| Hubvisory | 4 |
| Theodo | 3 |
| Yield · Yeita · Capgemini · Accenture | 2 chacun |
| Mozza | 1 |

Plus 21 mentions génériques (« concurrent », « shortlist », « en lice »).

> **Constat notable :** Thiga (prioritaire dans le cadrage) est confirmé en tête — mais **Wefiit ressort presque au même niveau** sans être listé comme cible prioritaire. À reverser dans la liste de veille concurrentielle. Converteo (data/analytics) et Octo/Theodo (tech) apparaissent aussi.

---

## 5. Signaux saillants pour le croisement

*Observations à confronter aux signaux des newsletters dans le Format B — pas des conclusions.*

- **L'IA est partout dans la demande** (≈ 1 opportunité sur 4 la mentionne, présente dans le conseil) — ça recoupe directement la convergence des newsletters sur le déplacement de valeur vers la discovery/décision à l'ère de l'IA. Intersection à creuser : la demande IA est-elle de l'outillage, ou de la transformation produit ?
- **La demande tire vers le leadership et le coaching** (Lead/Head/Coach très au-dessus des profils juniors) — cohérent avec un marché qui valorise le jugement produit plus que l'exécution. À croiser avec le discours « le PM se redéfinit par le product sense ».
- **Le conseil de transformation (operating model, désilotage, posture) convertit à 62 %** — signal fort que ce positionnement est porteur, à mettre en regard de ce que disent les newsletters sur le « product operating model ».
- **La QA spécialisée est une demande de niche mais stratégique** (qualité à l'échelle, SDK, SAFe) — à surveiller plutôt qu'à sur-investir pour l'instant.

---

## 6. Garde-fous & limites

- **Classification par expertise approximative** : mots-clés sur texte libre, multi-label. Les ordres de grandeur sont fiables, pas les chiffres exacts. Le repère QA est explicitement gonflé.
- **Pas de dimension secteur/taille** : absente de l'export Boond (option 3 retenue). Les secteurs cités au §3 sont qualitatifs.
- **Citations concurrents = présence, pas score** : une mention peut être contextuelle, pas une confrontation.
- **Demande concentrée sur quelques gros comptes** : le mix reflète en partie leur activité, pas seulement une tendance de marché.
- **Le filtre par détection ne voit pas les changements d'état** d'opportunités plus anciennes ; la re-synthèse trimestrielle complète corrigera ce point.

---
*Synthèse v1 — bootstrap. Les digests mensuels suivants ne traiteront que le delta (~36 nouvelles opportunités/mois). À faire évoluer après le premier cycle.*
