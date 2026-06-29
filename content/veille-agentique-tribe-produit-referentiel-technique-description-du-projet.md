# Espace documentaire & Intelligence Produit de la Tribe

*Charte du projet. Mise à jour : 24 juin 2026.*

---

## Intention et problème

La Tribe Produit dispose d'une matière précieuse mais dispersée : veille externe, signaux terrain, données business. Aucun endroit ne la centralise, ne la trie ni ne la transforme en intelligence utile. Ce projet crée un espace SharePoint qui centralise cette matière et, surtout, la transforme en intrants décisionnels pour faire évoluer nos convictions et notre offre.

**Principe fondateur, valable partout :** on ne se limite jamais à résumer. On lit, trie, interprète, challenge et traduit en implications concrètes pour nos métiers.

## Objectifs, par ordre de priorité

1. **Structurer et faire évoluer nos convictions et notre offre** (priorité n°1, oriente tous les arbitrages). *Recadré v4.2 : les digests sont des **briefings informatifs** ; les KR Owners (puis commerciaux, leaders) en tirent eux-mêmes la matière — decks d'expertise, articles, plans de compétences. Les convictions se forgent **au point d'usage**, pas dans un asset central (le dépôt `04` est déprécié).*
2. **Alimenter l'avant-vente** et le discours commercial.
3. **Nourrir la culture Produit interne.**

## Public

Chaque squad lit le digest de son expertise. Les digests et synthèses sont aussi partagés au management de la Tribe, aux 6 autres Tribe Leads, aux 7 PADs, et aux équipes commerciales et recrutement.

## Périmètre — 6 expertises

Product Management · Product AI · Product Ops · PMM · QA · Data Product Management.

Data PM reste autonome (non fusionné), en test : cadence mensuelle comme les autres expertises et contenu à coloration technique, à réévaluer à 3 mois.

## Démarrage

Démarré en POC sur Product Management (flux le plus dense), le pipeline est désormais **construit et validé sur les 6 expertises**, et le flux Format B tourne **en récurrence** (1er run autonome le 1er juillet). **Recadrage v4.2** : le digest est un **briefing informatif publié sans validation humaine** — un **agent-annotateur** (post-passe) qualifie la provenance des signaux et applique les downgrades de tags, puis publie vers le dashboard ; l'appropriation se fait **au point d'usage** (decks, articles, screening). Chemin critique courant : câbler l'agent-annotateur + la couche de confiance + le dashboard.

## Principes directeurs

- **Automatiser la captation, garder l'humain sur le jugement.** La machine capte et structure ; l'humain trie, classe (mode / tendance / structurel) et écrit le « so what ».
- **Le Format B est pré-drafté mensuellement par un agent, puis annoté et publié — sans gate humain (recadré v4.2).** La production est automatisée (assembleur planifié) ; un **agent-annotateur** applique ensuite la grille de validation (downgrades de tags + annotations de provenance/confiance) et **publie** le digest comme briefing informatif. L'agent **annote, il ne juge pas** : il qualifie sur quoi tient chaque signal, le lecteur juge. Un mois maigre se **déclare en clair** (pas de report muet).
- **Cadence Format B mensuelle pour les 6 expertises** : décision du 19 juin (un mois trop maigre se déclare honnêtement). Les **veilles concurrence et emploi** restent **trimestrielles** (snapshot ; captation continue).
- **Seuil de matière** : on ne meuble pas — un cycle pauvre est déclaré, pas gonflé.
- **Le croisement prime sur l'accumulation** : on n'ajoute un type de signal que si on compte réellement le croiser avec les autres.
- **Un seul point de croisement : le digest d'expertise (Format B).** Les briques (concurrence, emploi…) restent **factuelles** ; c'est le Format B qui les croise entre elles et avec le PAD, le State of X et notre offre, et qui pose **notre positionnement** face aux concurrents.
- **Boucle convictions/offre (recadrée v4.2)** : un signal « structurel » est un **candidat à corroborer** ; il ne devient une conviction que **quand un humain le forge** dans un deck/article, au point d'usage. Le dispositif **fournit du briefing sourcé** ; il ne met jamais à jour un deck ni n'émet « conviction du cabinet ». ⚠ Contrepartie assumée : sans gate humain et avec un public élargi, la **lisibilité de la confiance** (provenance visible) devient le cœur du dispositif — l'agent-annotateur fait de l'hygiène + provenance, pas une garantie de fiabilité.
- **Diffusion large par défaut**, sauf la donnée business brute.

## Architecture en 6 couches

1. **Captation** — toutes les newsletters arrivent à un point unique (automatisable).
2. **Pré-digestion** — un agent produit une fiche brute structurée par contenu (matière, pas livrable).
3. **Briques propriétaires** — extract Boond, retraitement notes PAD, REX & learning expeditions, veille concurrentielle, veille emploi, rapports State of X. *Briques factuelles : le snapshot concurrentiel et le snapshot emploi sont des intrants, pas des livrables croisés.*
4. **Digest par expertise (Format B)** — **pré-drafté mensuellement par un assembleur automatisé** ; couche de jugement, le vrai livrable **et le seul lieu du croisement et du positionnement** : il croise les briques entre elles et avec le PAD. *Génération sur **AI Builder GPT-4.1**.*
5. **Annotation & publication (recadré v4.2)** — un **agent-annotateur** (post-passe) applique la **`Grille-validation-Format-B`** : downgrades de tags (`[structurel]` newsletter-backed → `[tendance]`) + **annotations de provenance/confiance** par signal, **puis publie sans gate humain**. Il **annote, ne juge pas** (pas de pass/fail) ; c'est un passe d'hygiène + provenance, pas une garantie de fiabilité. Synthèse Tribe portée par Axel.
6. **Consultation — SURFACE PRIMAIRE** — un dashboard restitue les digests **annotés** (4 blocs déroulables par expertise + couche de confiance lisible non-expert) + le statut des sources. *C'est l'outil de minage des KR Owners, commerciaux et leaders. Couche de lecture, n'analyse ni ne croise rien.*

## Arborescence SharePoint cible

```
/Veille-Tribe-Produit
  /00-Comment-ça-marche
  /01-Matière-brute
     /Newsletters-pré-digérées
     /Pipe-Boond                (accès restreint : Axel, Delphine, + KR Owners au besoin)
     /Notes-PAD-retraitées      (synthèse anonymisée, accès ouvert à toute la tribe)
     /REX-et-learning-expeditions
     /Veille-concurrentielle    (brique pure : qui bouge / convergence, par axe de marché)
     /Veille-emploi             (snapshots trimestriels par expertise)
     /Rapports-Emploi           (baromètres APEC/Noé/Seyos/LPC — grounding passif, agent emploi seul)
     /Rapports-State-of-X       (signal structurel)
  /02-Digests-par-expertise
     Grille-validation-Format-B (canonique à la racine — moteur de l'agent-annotateur + literacy de lecture)
     /Product-Management  /Product-AI  /Product-Ops  /PMM  /QA  /Data-PM
  /03-Synthèse-Tribe
  /04-Convictions-et-offre      (DÉPRÉCIÉ v4.2 — convictions dispersées dans les decks ; à rouvrir si besoin)
  /Référentiel-technique        (cartographie technico-fonctionnelle : 17 fiches + index — reprise par un tiers)
  /Consultation                 (dashboard de lecture des digests — prototype + indexeur à câbler)
```

## Sources

**Newsletters existantes (11) :** Lenny's, Ravi Mehta, The CPO Club, Product Builder, Product Management Today, Le Ticket (FR), Pauline Egea (FR), Teresa Torres, The Beautiful Mess, Product Ops Confidential, The Product Compass.

**Ajouts validés :**
- **PMM** : PMM Pulse (Product Marketing Alliance), The Product Marketer, Sharebird.
- **QA** : Ministry of Testing, Software Testing Weekly, Five for Friday.
- **Product AI** : Product Growth (Aakash Gupta), One Knight in Product (+ The Product Compass).
- **Data PM** : Data Products (Chad Sanderson), Data Mesh Learning, From Data to Product.
- **Structurel** : rapports annuels State of PMM / State of Testing / State of Product / State of Data.

**Veille concurrentielle (12 cabinets, ancrés PAD, recalibrés chaque trimestre) :**
- **PM** : Thiga *(prioritaire)*, Hubvisory, Wivoo, Yield Advisory.
- **QA** : Qestit, KP2i, Smartesting.
- **Data/IA/Stratégie** : Hymaïa, Converteo, Artefact, AI Builders, Eleven *(Artefact / AI Builders / Eleven = « source d'axe à confirmer concurrent »).*

Wefiit est exclu (c'est notre maison). Le snapshot concurrentiel est une **brique pure** (qui bouge / convergence, par axe) ; le croisement avec le PAD et **notre positionnement** se font au Format B.

**Veille emploi :** Welcome to the Jungle, LinkedIn Jobs, APEC + boards spécialisés (Lenny's Job Board, Mind the Product Jobs, PMA Jobs, Ministry of Testing Jobs). Méthode : jeu de requêtes figé par expertise, snapshot trimestriel, suivi des deltas (intitulés, compétences, outils).

## Outillage

Full Microsoft 365. Power Automate pour router les newsletters vers un point unique et orchestrer les assembleurs. Copilot Studio pour la pré-digestion et les agents de pré-draft snapshot. **AI Builder GPT-4.1** (action « Run a prompt ») pour la génération du Format B, qui exige un grand contexte (la matière croisée d'un cycle dépasse le plafond de l'agent Copilot). Outils tiers possibles au cas par cas.

**Licences validées :** accès Copilot Studio confirmé, utilisateurs disposant de licences M365 Copilot → usage interne grounded SharePoint/Graph « zero-rated », coût négligeable.

**Connexion Power Platform :** connexion Outlook + SharePoint + Copilot Studio + RSS **confirmée et opérationnelle**. En production : flux de captation/pré-digestion (Format A), brique Boond, et **captation concurrentielle à deux étages** (4 flux RSS + 1 flux e-mail commun alertes/newsletters). Conformité DLP à valider formellement.

## Gouvernance et rôles

- **Axel** — sponsor, cadrage, propriétaire de la boucle convictions/offre et de la synthèse Tribe.
- **Delphine** — construction du dispositif, premiers cycles, puis passage de relais aux squads.
- **5 KR Owners + squads (~15 consultants)** — production récurrente du digest de leur expertise après handover.
- **Lecteurs** — management, 6 Tribe Leads, 7 PADs, commercial, recrutement.

## Indicateurs de succès (trimestriels)

1. **Convictions touchées** — convictions créées, mises à jour ou challengées grâce à la veille (indicateur n°1).
2. **Réemploi en avant-vente** — propositions / pitchs ayant puisé dans la matière.
3. **Vivacité de production** — expertises ayant tenu leur cadence (indicateur de survie).

## Risques et points de vigilance

- **Confidentialité Boond** : brut restreint (Axel, Delphine, + KR Owners au besoin), seule la synthèse anonymisée est ouverte.
- **Asymétrie des sources** : traitée par les ajouts ; Data PM reste fragile, c'est assumé.
- **Capacité des squads** : une squad de 2 ne produit que si les couches 1 à 3 lui arrivent prêtes.
- **Jugement du modèle** : faible sur le tri mode/tendance/structurel → l'**agent-annotateur** applique les downgrades mécaniques et expose la provenance, mais c'est un critique de **même famille** que le générateur : il rattrape l'hygiène de tags, **pas un croisement fabriqué énoncé avec aplomb**. **Risque accepté en V1** (gate humain supprimé, public ouvert), **mitigé** par la provenance visible + la Grille en literacy lecteur + la boucle de feedback, **pas éliminé**. Le juge de dernier ressort reste l'humain au point d'usage.
- **Mortalité du dispositif** : un responsable par brique, sinon l'espace se dégrade.

---
*Charte v1.6 — mise à jour 25 juin 2026 : **RECADRAGE DE FINALITÉ.** Le digest devient un **briefing informatif publié sans gate humain** ; la couche 5 passe de « validation KR Owner » à **agent-annotateur** (downgrades + annotations de provenance, annote sans juger) ; la couche 6 **consultation est promue surface primaire** (minage par KR Owners + commerciaux + leaders, porte la couche de confiance) ; **`04-Convictions-et-offre` déprécié** (convictions forgées au point d'usage) ; **report `[[REPORT_TRIMESTRIEL]]` abandonné** (cycle maigre déclaré en clair) ; risque accepté gravé (annotateur de même famille = hygiène + provenance, pas garantie de fiabilité). — v1.5 (24 juin) : **architecture portée à 6 couches** ; **pivot AI Builder GPT-4.1** ; **`Grille-validation-Format-B`** intégrée ; **arborescence enrichie**. — v1.4 (21 juin) : production du Format B automatisée en **assembleur mensuel**. — v1.3 (19 juin) : cadence Format B **mensuelle pour les 6 expertises**. — v1.2 (17 juin) : watch-list à 12 cabinets ; séparation brique/croisement. — v1.1 (14 juin) : Wefiit retiré ; Power Platform opérationnelle.*
