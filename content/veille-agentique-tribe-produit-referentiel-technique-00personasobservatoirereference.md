# Personas — Observatoire des expertises
### Document de référence · à déposer dans le projet Observatoire

> **À quoi sert ce document.** Input unique et auto-portant pour le Claude du projet *Observatoire des expertises*, afin d'identifier **quoi restituer à qui** sur le dashboard. Chaque persona précise : quelles expertises × quels blocs du Format B × cadence × couche de confiance × accès × format de consommation.
>
> **Périmètre.** L'Observatoire est scopé aux **6 expertises** (Product Management · Product AI · Product Ops · PMM · QA · Data PM) et *nourrit* l'aval. Les personas décrivent donc des **consommateurs (et sources) d'intelligence expertise** — pas l'ensemble des besoins de veille de chaque profil.
>
> **Avertissement sur le périmètre des lecteurs (important).** Le set couvre les 12 personas demandés + le PAD. Or, selon la charte v1.6 :
> - **Lecteurs réels à fort levier** : Tribe Lead + KR Owner Expertises, **PAD**, Tribe Lead Business / Notoriété / Excellence.
> - **Non-lecteurs gardés pour complétude** : le **CEO** (cible de la *synthèse* Tribe, pas du dashboard) et les **4 KR Owners aval** (la consommation se fait au niveau Tribe Lead).
> - **Lecteurs réels non encore produits** : **commercial / avant-vente** et **recrutement**.
>
> **Ordre de lecture** : par **gradient de pertinence** (fort → nul). Les numéros d'origine (01-14) sont conservés pour le cross-référencement avec les fichiers individuels et la matrice.
>
> **Légende des blocs du Format B** (à aligner sur les libellés canoniques de la *Grille-validation-Format-B*) : **A1** = problèmes clients · **A2** = signaux marché / convictions · **A3** = compétences-méthodes-outils · **A4** = sujets de contenu + angle.

## Sommaire (par tier)

**Fort** — 01 Tribe Lead Expertises · 02 KR Owner Expertises · 14 PAD · 03 Tribe Lead Business · 04 Tribe Lead Notoriété
**Moyen** — 05 Tribe Lead Excellence
**Méta (vue distincte)** — 06 Lead Ops
**Faible** — 07 Tribe Lead Expérience Collaborateurs
**Indirect / nul (complétude)** — 08 CEO · 09 KR Owner Business · 10 KR Owner Excellence · 11 KR Owner Notoriété · 12 KR Owner XP Collab

**Annexe** — Matrice de restitution (synthèse transversale)

---

## 01 · Persona — Tribe Lead Expertises

> **Tier** : Producteur-clé / Sponsor — propriétaire de la boucle convictions-offre et de la synthèse Tribe.
> **Statut lecteur (charte Observatoire v1.6)** : Sponsor + lecteur complet (incl. brique Boond restreinte).
> **Altitude** : stratégique / annuelle.

### Qui
Garant de la vision et de la stratégie de la Tribe Expertises ; responsable du **KR annuel** (nb de propales Conseil/Coaching/Formation — ⚠ **35 vs 50 selon la slide du deck, à trancher**). Pilote 5 KR Owners (PM, Product AI, Product Ops, PMM, QA, Data PM — 6 expertises), tous 100 % client. KPI : 5 offres packagées.

### Relation à l'Observatoire
Sponsor du dispositif. Propriétaire de l'**objectif n°1** (faire évoluer convictions & offre) et de la **synthèse Tribe** (couches 3 et 5). Consomme le digest consolidé des 6 expertises pour arbitrer ; porte le positionnement IA transverse (« l'IA amplifie la maturité réelle »), décision retenue à son niveau.

### Besoins d'intelligence expertise
- **Synthèse cross-expertise** : ce qui bouge sur les 6 domaines, croisé, pour arbitrer convictions et priorisation d'offres.
- **Concurrence** (snapshot trimestriel, 12 cabinets) : où les concurrents accélèrent (IA notamment) → différenciation et prises de position.
- **Brique Boond** (accès restreint dont il dispose) : demande par expertise (volume, gain, TJM) → orienter les offres phares vers ce qui se vend.
- **Structurel (State of X)** + **emploi** : compétences à pousser dans l'axe 3.

### Hors périmètre pour ce persona
Production de contenu ; capacité des KR Owners ; turnover/talent RH (XP Collab) ; fraîcheur des assets.

### Restitution attendue (input dashboard)
- **Expertises** : les 6.
- **Blocs Format B** : les 4 (problèmes clients / signaux-convictions / compétences-méthodes-outils / contenu-angle) **+ la synthèse Tribe**.
- **Cadence** : mensuelle (Format B) + snapshots trimestriels (concurrence, emploi).
- **Couche de confiance** : **fine** — il forge des arbitrages dessus, la provenance par signal est critique.
- **Accès** : complet, y compris brique Boond restreinte.
- **Format** : synthèse Tribe (qu'il porte) + dashboard complet self-serve.

### Jobs-to-be-done
- *« Quand je prépare une révision de convictions, je veux la synthèse croisée signaux × concurrence × demande Boond par expertise, afin de réaffirmer ou réviser explicitement chaque conviction — pas l'explorer. »*
- *« Quand j'arbitre quelle offre phare prioriser, je veux croiser demande Boond et signaux marché/concurrence, afin d'investir l'effort rare des KR Owners là où le ROI est probable. »*

### Hypothèses / risques à valider
- [ ] ⚠ **Objectif n°1 sous tension structurelle** : la charte pose que les convictions se forgent « au point d'usage », jamais dans un asset central (dépôt /04 déprécié). Le dispositif *briefe*, il n'émet jamais de conviction. Donc si les KR Owners (100 % client) ne forgent pas réellement, **l'objectif n°1 échoue en silence** — et il n'y a aucun asset central vide pour le révéler. Le seul garde-fou est l'indicateur « convictions touchées ». **Question ouverte : qui le mesure concrètement, et à quelle cadence ?**
- [ ] Granularité Boond par expertise = fiable (confirmé), mais le flag « Accelerator utilisé » (enrichissement manuel) reste non fiabilisé — ne pas l'utiliser comme intrant ici.


---

## 02 · Persona — KR Owner Expertises

> **Tier** : Producteur + **Lecteur primaire** (« chaque squad lit le digest de son expertise »).
> **Statut lecteur (charte v1.6)** : Lecteur direct ; producteur récurrent du Format B de son expertise après handover.
> **Altitude** : opérationnelle / mensuelle. **À lire en miroir du 01** : même domaine, altitude basse → besoins filtrés et tactiques.

### Qui
Point d'entrée de sa squad d'expertise ; **capitaine d'offre** (anime l'offre, fournit les assets au PAD). **Staffé 100 % client** — production interne sur temps résiduel. Livrables : deck d'expertise + 1-2 offres phares + sales kit.

### Relation à l'Observatoire
Lit le digest de **son seule** expertise sur le dashboard. Après handover (Delphine → squads), en assure la **production récurrente** (couche 4 / Format B), à condition que les couches 1-3 lui arrivent prêtes.

### Besoins d'intelligence expertise
- **État de l'art de son domaine** (newsletters dédiées) → deck, convictions, contribution au Format B.
- **Concurrence sur son expertise** (snapshot trimestriel) → différenciants pour son deck/sales kit.
- **Signaux de demande** — **via le Format B** (qui croise la brique Boond), **pas** en accès brut (Boond restreint).
- **Compétences/outils recrutés** (emploi trimestriel) → axe 3 + crédibilité.

### Hors périmètre pour ce persona
Production du deck/offre (son livrable, pas celui de l'outil) ; **pipe Boond brut** (restreint à Axel/Delphine) ; sa disponibilité.

### Restitution attendue (input dashboard)
- **Expertises** : la sienne (1 des 6).
- **Blocs Format B** : les 4, **filtrés sur son domaine**.
- **Cadence** : mensuelle + snapshots trimestriels.
- **Couche de confiance** : doit pouvoir **distinguer mode / tendance / structurel** (la Grille en literacy de lecture est ici essentielle — c'est lui qui décide in/out).
- **Accès** : digest ouvert ; Boond uniquement en **synthèse anonymisée**.
- **Format** : dashboard self-serve **consommable en < 15 min** (contrainte capacité non négociable).

### Jobs-to-be-done
- *« Quand j'actualise mon deck, je veux 3-5 signaux récents + angles concurrents sur MON domaine, afin d'ancrer mon positionnement sur du frais sans faire la veille moi-même. »*
- *« Quand je dois nourrir le Format B mensuel, je veux les signaux de mon domaine pré-collectés et annotés, afin de décider in/out en quelques minutes. »*

### Hypothèses / risques à valider
- [ ] **Volume par expertise** suffisant pour un digest mensuel utile : risque réel sur **PMM** (squad au point mort) et **Data PM** (fragile, assumé par la charte).
- [ ] Que les **couches 1-3 arrivent vraiment prêtes** : la charte le dit noir sur blanc — « une squad de 2 ne produit que si les couches 1-3 lui arrivent prêtes ». C'est *le* point de rupture du handover.
- [ ] « < 15 min » tenable côté production sans surcharger un Owner ou Axel.


---

## 14 · Persona — PAD (Product Account Developer)

> **Tier** : Lecteur aval — **fort**, et **le plus actionnable** pour l'objectif n°2 (avant-vente / Sales Enablement). Se range en priorité **juste après les personas Expertises (01-02)**.
> **Statut (charte v1.6)** : **Lecteur direct** (les 7 PADs) **ET contributeur** — ses notes de compte (retraitées/anonymisées) sont une **brique propriétaire**, et la **veille concurrentielle (12 cabinets) est ancrée PAD**.
> **Altitude** : opérationnelle / compte.

### Qui
Product Account Developer. Développe le business **sur ses comptes** : identifie, qualifie et pilote les opportunités, anime commercialement les offres (le **PAD référent** porte une offre : pricing, positionnement, résultats business), conduit les RDV, structure le foisonnement et le cross-sell. Acteur commercial de première ligne. Posture cible 2026 : passer de **réactif à proactif**.

### Relation à l'Observatoire — double
1. **Lecteur** : mine le dashboard pour **détecter un besoin par expertise sur un compte**, calibrer un pitch, sortir un angle face à un concurrent connu. C'est **la cible explicite du Sales Enablement** (kit d'offre, cheatsheet, pitch 60s, permanence expertise).
2. **Source** : ses **notes de compte** alimentent une brique propriétaire ; il **ancre la veille concurrentielle** (il sait qui il affronte sur ses comptes).

### Besoins d'intelligence expertise
- **Signaux de besoin + questions pour creuser** par expertise (axe 1) +++ → déclencher une opportunité.
- **Pitch laser 60s + différenciants** par offre → pitcher juste, pas générique.
- **Concurrence sur ses axes de marché** (snapshot trimestriel, qu'il ancre) → angle en direct face au cabinet concurrent.
- **Références & belles histoires** prêtes à partager.
- *(Connexe, à router)* : **accès ponctuel à un expert** (permanence expertise) quand le besoin dépasse sa maîtrise.

### Hors périmètre pour ce persona
Production des assets d'offre (c'est le **capitaine d'offre / KR Owner** qui les fournit) ; e-NPS / turnover ; donnée Boond brute **au-delà de ses propres comptes** (confidentialité).

### Restitution attendue (input dashboard)
- **Expertises** : les 6, idéalement **filtrées par les offres pertinentes pour ses comptes** (croisement **compte × expertise**, cf. risque).
- **Blocs Format B** : **axe 1 (problèmes / signaux de besoin)** +++, **concurrence** ++, **références/preuves** ; axe 4 marginal.
- **Cadence** : mensuelle (signaux) + trimestrielle (concurrence).
- **Couche de confiance** : **moyenne** — il pitche, il ne forge pas de convictions ; mais il doit savoir si un signal est **solide avant de l'avancer à un client**.
- **Accès** : digest en diffusion large ; Boond limité à **ses comptes** / synthèse anonymisée.
- **Format** : **kit d'offre + cheatsheet** (amont / pendant / après RDV) — **prêt à dégainer, pas un digest brut à trier**. C'est l'exigence de "prêt à l'emploi" la plus forte de tout le set.

### Jobs-to-be-done
- *« Quand je prépare un RDV sur un compte, je veux les signaux de besoin + l'angle + les preuves par expertise pertinente, afin d'arriver avec une proposition de valeur juste plutôt que générique. »*
- *« Quand un compte évoque un concurrent, je veux savoir comment il se positionne sur cette expertise, afin de différencier en direct. »*
- *« Quand je détecte un besoin que je ne maîtrise pas, je veux savoir quelle offre déclencher et quel expert solliciter, afin de transformer sans bloquer. »*

### Hypothèses / risques à valider
- [ ] ⚠ **Croisement compte × expertise** : la valeur max du PAD vient d'un filtrage par *ses* comptes, pas seulement par expertise. La charte ne le garantit pas (le Format B croise les briques + le PAD *générique*, pas le compte individuel). **Jusqu'où la restitution descend-elle au niveau compte ?**
- [ ] ⚠ **Boucle source ↔ lecteur** : le PAD *alimente* (notes) et *consomme*. Risque de **circuit fermé** (on lui re-sert ce qu'il a remonté). Le croisement avec les **autres** briques doit primer, sinon valeur ajoutée faible.
- [ ] ⚠ **Adoption = condition de l'objectif n°2** : c'est *le* persona dont l'usage réel fait vivre ou mourir le Sales Enablement. Si les PADs ne minent pas le dashboard, l'objectif n°2 échoue. → le format doit être un **kit "prêt à dégainer"**, pas un dépôt à explorer.


---

## 03 · Persona — Tribe Lead Business

> **Tier** : Lecteur aval confirmé — **fort** (sert directement l'objectif n°2 : avant-vente / discours commercial).
> **Statut lecteur (charte v1.6)** : Lecteur direct ; **ses PADs et le commercial sont aussi lecteurs** (cf. recommandation : en faire des personas dédiés).
> **Altitude** : stratégique (sa Tribe).

### Qui
Garant de la croissance, conquête, recrutement. KR : 17 M€ CA / 3,5 M€ Data/IA. Pilote Sales, Talent, Croissance, Conquête. Posture cible 2026 : passer de **réactif à proactif** sur la perception de valeur.

### Relation à l'Observatoire
Consomme l'intelligence expertise pour **armer l'avant-vente** : signaux de besoin par expertise, angles différenciants en RDV, calibrage du discours. **Boucle** : Business *alimente* la brique Boond → le Format B la croise → Business *consomme* le croisement.

### Besoins d'intelligence expertise
- **Problèmes clients à adresser par expertise** (axe 1) → détecter des opportunités d'offre.
- **Positionnement concurrence** (snapshot trimestriel) +++ → différencier en RDV.
- **Offres packagées prêtes** (le KPI Expertises « 5 offres » est sa matière de vente).

### Hors périmètre pour ce persona
e-NPS / turnover interne ; production de contenu Notoriété ; détail méthodo des compétences (axe 3) au-delà du pitch.

### Restitution attendue (input dashboard)
- **Expertises** : les 6, **priorité à celles qui se vendent** (PM, Data/IA, Product Ops).
- **Blocs Format B** : **axe 1 (problèmes clients)** + **concurrence** ; axes 3-4 secondaires.
- **Cadence** : mensuelle (signaux) + trimestrielle (concurrence).
- **Couche de confiance** : **moyenne** — il pitche, il ne forge pas de convictions.
- **Accès** : diffusion large (pas de Boond brut côté lecture).
- **Format** : dashboard + une extraction **actionnable pour les PADs** (« ce qu'on résout / signaux / angle 60s »).

### Jobs-to-be-done
- *« Quand je prépare un RDV, je veux l'angle différenciant et les preuves par expertise, afin de pitcher fort et juste. »*
- *« Quand un compte montre un signal de besoin, je veux savoir quelle offre d'expertise déclencher, afin de transformer en opportunité. »*

### Hypothèses / risques à valider
- [ ] **Adoption** : que les PADs minent réellement le dashboard (sinon la restitution la plus stratégique — l'avant-vente — ne sert personne).
- [ ] Que la boucle Boond (il fournit → le digest croise → il consomme) **n'apprenne pas en circuit fermé** (ne lui re-sert pas seulement ce qu'il a déjà mis).


---

## 04 · Persona — Tribe Lead Notoriété

> **Tier** : Lecteur aval confirmé — **fort**. Son modèle *est* l'expertise rendue visible (« Expertise-Led-Growth »).
> **Statut lecteur (charte v1.6)** : Lecteur direct.
> **Altitude** : stratégique (sa Tribe).

### Qui
Garant de la notoriété et de l'inbound. Modèle 2026 : **l'expertise devient le contenu, le canal et la preuve**. KR : 18 leads inbound (IA & CCF) / 15 000 requêtes marque. RACI : Notoriété diffuse, Expertises crée certains contenus.

### Relation à l'Observatoire
L'expertise **est sa matière première**. Consomme signaux et prises de position pour produire posts, talks, vidéos, articles. C'est le persona où **la couche de confiance compte le plus** : il publie à l'externe → relayer un « mode » comme un « structurel » est un risque réputationnel.

### Besoins d'intelligence expertise
- **Sujets de contenu opportuns + angle suggéré** (axe 4) +++ → matière directe de production éditoriale.
- **Signaux marché chauds** (axe 2) → prises de position à incarner.
- **Concurrence** → positionnement de marque face aux cabinets.

### Hors périmètre pour ce persona
Pipe Boond ; turnover ; détail capacité des squads.

### Restitution attendue (input dashboard)
- **Expertises** : les 6.
- **Blocs Format B** : **axe 4 (contenu/angle)** +++ et **axe 2 (signaux marché)**.
- **Cadence** : mensuelle.
- **Couche de confiance** : **élevée et très lisible** — diffusion publique, la **provenance par signal** est le garde-fou contre un faux pas de marque (cœur du dispositif côté charte).
- **Accès** : diffusion large.
- **Format** : dashboard + extraction « **contenus activables** » (sujet → angle → preuve → source).

### Jobs-to-be-done
- *« Quand je planifie un post/talk, je veux un sujet à angle frais avec sa source, afin de produire vite sans inventer la prise de position. »*
- *« Quand je m'apprête à publier une affirmation, je veux voir sur quoi elle tient (provenance), afin de ne pas relayer un signal faible comme une vérité du cabinet. »*

### Hypothèses / risques à valider
- [ ] Que le bloc angle-contenu (axe 4) est assez **mûr pour être directement activable** (sinon Notoriété doit re-travailler, ce que l'objectif n°2 visait à éviter).
- [ ] Que la couche de confiance, telle que restituée, **suffit à un non-expert** pour éviter un faux pas public (c'est exactement le risque V1 gravé dans la charte).


---

## 05 · Persona — Tribe Lead Excellence

> **Tier** : Lecteur aval confirmé — **moyen** (consomme surtout l'axe compétences).
> **Statut lecteur (charte v1.6)** : Lecteur direct.
> **Altitude** : stratégique (sa Tribe).

### Qui
Garant de l'écosystème d'apprentissage. KR : 1200 actions d'apprentissage / 500 orientées IA. Enjeux 2026 : **séniorisation**, apprentissage IA **« à deux vitesses »** (55 % seulement actifs sur l'IA).

### Relation à l'Observatoire
Consomme le bloc **compétences / méthodes / outils à maîtriser** (axe 3) pour faire évoluer le catalogue de formations 26-27 et alimenter l'**agent Compétences IA**. Lien direct avec l'enjeu séniorisation (quoi former, à quel niveau).

### Besoins d'intelligence expertise
- **Compétences/méthodes/outils émergents par expertise** (axe 3) +++ → quoi ajouter au catalogue.
- **Emploi** (snapshot trimestriel : intitulés, compétences, outils recrutés) → ce que le marché valorise = ce qu'il faut former.
- **Structurel (State of X)** → méthodes de fond qui montent.

### Hors périmètre pour ce persona
Pipe ; concurrence cabinet ; contenu Notoriété ; turnover/e-NPS.

### Restitution attendue (input dashboard)
- **Expertises** : les 6 (côté compétences).
- **Blocs Format B** : **axe 3 (compétences-méthodes-outils)** +++.
- **Cadence** : mensuelle (signaux) + trimestrielle (emploi).
- **Couche de confiance** : moyenne.
- **Accès** : diffusion large.
- **Format** : dashboard + extraction « **compétences à développer** » par expertise et par niveau de séniorité.

### Jobs-to-be-done
- *« Quand je construis le catalogue 26-27, je veux les compétences/outils qui montent par expertise, afin d'arbitrer quelles formations créer. »*
- *« Quand j'alimente l'agent Compétences IA, je veux les axes de développement sourcés du marché, afin de personnaliser les recommandations. »*

### Hypothèses / risques à valider
- [ ] ⚠ **Recouvrement avec We.skills** : l'axe 3 de l'Observatoire (compétences à développer par expertise) **recoupe le périmètre de We.skills** — chantier identifié comme à risque de non-livraison. Deux options à trancher explicitement : l'Observatoire **alimente** We.skills (et devient une forcing function pour en nommer le calendrier), ou les deux dérivent en parallèle. À ne pas laisser implicite.
- [ ] Que l'axe 3 est assez actionnable pour **piloter un catalogue**, pas seulement informer.


---

## 06 · Persona — Lead Ops

> **Tier** : Lecteur **méta** — consomme la *santé du dispositif*, pas le contenu expertise.
> **Statut lecteur (charte v1.6)** : via le management ; intérêt = vivacité de production (indicateur de succès n°3).
> **Altitude** : transverse.

### Qui
Garant du cadre, des rituels et des outils ; pilotage transverse des OKR & de la roadmap. Anime Vigie OKR, Armada, Conseil de Bord.

### Relation à l'Observatoire
Ne consomme **pas** le contenu d'intelligence expertise. Consomme la **méta** : statut des sources/flux, cadence tenue par expertise, déclarations de « cycle maigre », signaux de **mortalité du dispositif**. L'Observatoire est, pour lui, un dispositif à piloter comme les autres.

### Besoins d'intelligence expertise
*(aucun — besoins méta uniquement)*
- **Statut des sources** (flux RSS/mail up ou down).
- **Respect de la cadence** mensuelle par expertise (qui décroche).
- **Déclarations honnêtes de cycle maigre** (pas de report muet — principe de la charte).

### Hors périmètre pour ce persona
La totalité du contenu d'intelligence expertise (les 4 blocs).

### Restitution attendue (input dashboard)
- **Expertises** : aucune en contenu.
- **Blocs Format B** : aucun ; uniquement le **bloc « statut des sources »** prévu par la charte.
- **Cadence** : continue / au fil des runs.
- **Couche de confiance** : sans objet.
- **Accès** : méta.
- **Format** : vue « santé du dispositif » (sources + cadence + cycles maigres déclarés).

### Jobs-to-be-done
- *« Quand je prépare une Vigie, je veux voir quelle expertise décroche en cadence, afin d'arbitrer le soutien. »*
- *« Quand une source tombe, je veux le voir, afin d'anticiper un trou de matière. »*

### Hypothèses / risques à valider
- [ ] ⚠ **Propriété de l'infra** : le dashboard / site tourne-t-il sur l'infra du **Cercle IA, portée par Cédric seul** (dépendance mono-personne déjà identifiée comme contradiction avec la mission du Cercle) ? Si oui, l'Observatoire **hérite de la même fragilité** — à clarifier avant le passage en surface primaire.
- [ ] Que la charte « un responsable par brique » est **réellement staffée** (sinon « mortalité du dispositif » se réalise).


---

## 07 · Persona — Tribe Lead Expérience Collaborateurs

> **Tier** : Lecteur aval — **faible**. L'essentiel de ses besoins est **hors périmètre** d'un observatoire des expertises.
> **Statut lecteur (charte v1.6)** : Lecteur direct (l'un des 6 Tribe Leads), mais pertinence marginale.
> **Altitude** : stratégique (sa Tribe).

### Qui
Garant de l'expérience collaborateur de bout en bout. KR : e-NPS / 9-10 en capacité de projection. KPIs : turnover 15 %, rupture PE, ancienneté, CSAT mission interne.

### Relation à l'Observatoire
**Faible et indirecte.** L'Observatoire couvre l'**intelligence expertise**, pas ses besoins centraux (turnover, marché-talent, e-NPS, projection). Seul point de contact réel : l'**axe compétences** peut nourrir les **parcours d'expertise** (lien We.Path / We.Horizon).

### Besoins (marginaux)
- Axe 3 (compétences par expertise) → alimenter les **parcours d'évolution** par métier.

### Hors périmètre (l'essentiel de ses enjeux)
**Turnover, salaires de marché, e-NPS, projection de carrière.** ⚠ Ne pas confondre : la **veille emploi** de l'Observatoire est orientée *expertise* (intitulés / compétences / outils par métier produit), **pas** veille marché-talent RH.

### Restitution attendue (input dashboard)
- **Expertises** : les 6, **uniquement l'axe 3**, en consultation ponctuelle.
- **Cadence** : ponctuelle, pas de besoin récurrent.
- **Accès** : diffusion large.
- **Format** : extraction ponctuelle « compétences par expertise » pour les parcours.

### Note de calibrage
Persona fourni **pour complétude du set demandé**. Restitution dédiée ≈ néant à indirecte. À acter : on ne conçoit **pas** de vue dashboard dédiée pour ce profil sans signal d'usage réel.


---

## 08 · Persona — CEO

> **Tier** : **Non-lecteur de la charte** (fourni pour complétude).
> **Statut lecteur (charte v1.6)** : **non listé**. Reçoit, au mieux, *indirectement* via la synthèse Tribe portée par Axel.
> **Altitude** : stratégique WeFiiT.

### Qui
Prudent par défaut ; répond aux demandes cadrées qui lui rendent le contrôle. Pilote WeFiiT 2028 : 150 WeFiiTers, 20 M€ CA, 15 % CA Conseil/Coaching/Formation, e-NPS 60, 25 % CA Data & IA. Trois axes : monter en valeur / ancrer l'excellence / différencIAtion par l'IA.

### Relation à l'Observatoire
**Indirecte.** Son intérêt n'est pas le dashboard mais la **preuve que le cabinet construit autorité et différenciation sur ses expertises** (axe 2028 « leader d'opinion »). Il consomme, le cas échéant, une lecture *stratégique* de « ce qui bouge sur le marché de nos expertises + nos prises de position + implications ».

### Restitution attendue
- **Pas le dashboard.** La **synthèse Tribe** (Axel-owned), à **très basse fréquence**.
- Format aligné sur son pattern : **concret, risque d'abord, rendant le contrôle** — « ce qui change sur le marché de nos expertises, ce qu'on en fait, ce que je ne te demande pas de décider ».

### Note de calibrage
Non-lecteur direct. Ce persona sert à définir **ce qu'Axel remonte au CEO via la synthèse**, pas une restitution dashboard. **Décision à prendre** : le garder comme cible de la synthèse Tribe, ou le retirer du set (il n'est pas un lecteur du dispositif).


---

## 09 · Persona — KR Owner Business

> **Tier** : **Non-lecteur direct de la charte** (fourni pour complétude).
> **Statut lecteur (charte v1.6)** : à la Tribe Business, l'unité de consommation est le **Tribe Lead + les PADs + le commercial** — pas chaque KR Owner. Voir **persona 03**.
> **Altitude** : opérationnelle.

### Qui
KR Owner d'une squad Business (Sales, Talent, Croissance ou Conquête) ; responsable d'un KR trimestriel ; 100 % opérationnel sur sa squad.

### Relation à l'Observatoire
**Indirecte, via son Tribe Lead.** Sa pertinence = celle décrite au persona 03 (avant-vente, signaux de besoin par expertise), déclinée sur sa squad. Pas de canal de restitution dédié identifié dans la charte.

### Restitution attendue
À confirmer. Si un besoin direct émerge (ex. la squad Conquête veut des signaux de besoin par expertise pour cibler), c'est un **sous-cas du persona 03**, pas une vue dédiée.

### Note de calibrage
Je **recommande de ne pas concevoir de restitution dédiée** pour ce profil sans signal d'usage réel. À l'inverse, **PAD / commercial / recrutement** — eux, lecteurs réels de la charte — manquent au set et seraient prioritaires.


---

## 10 · Persona — KR Owner Excellence

> **Tier** : **Non-lecteur direct de la charte** (fourni pour complétude).
> **Statut lecteur (charte v1.6)** : à la Tribe Excellence, l'unité de consommation est le **Tribe Lead**. Voir **persona 05**.
> **Altitude** : opérationnelle.

### Qui
KR Owner d'une squad Excellence (Formation, Mentorat, Guildes PO, Guildes QA, IA…) ; responsable d'un KR trimestriel.

### Relation à l'Observatoire
**Indirecte, via son Tribe Lead.** Pertinence = celle du persona 05 (axe compétences → catalogue / agent Compétences IA), déclinée sur sa squad. Un KR Owner Formation pourrait, en pratique, vouloir l'**axe 3 par expertise** pour construire un module — c'est le seul cas d'usage direct plausible.

### Restitution attendue
À confirmer. Cas direct le plus probable : **axe 3 (compétences) par expertise**, comme sous-cas du persona 05.

### Note de calibrage
Pas de restitution dédiée sans signal d'usage réel. Priorité : **PAD / commercial / recrutement** (lecteurs réels manquants).


---

## 11 · Persona — KR Owner Notoriété

> **Tier** : **Non-lecteur direct de la charte** (fourni pour complétude).
> **Statut lecteur (charte v1.6)** : à la Tribe Notoriété, l'unité de consommation est le **Tribe Lead** (direction éditoriale). Voir **persona 04**.
> **Altitude** : opérationnelle.

### Qui
KR Owner d'une squad Notoriété (We.In, WeFiiT.com, We.Connect, We.Talk, Vidéos, Marque employeur…) ; responsable d'un KR trimestriel.

### Relation à l'Observatoire
**Indirecte, via son Tribe Lead.** Pertinence = celle du persona 04 (axe contenu/angle → production éditoriale). En pratique, un KR Owner producteur de contenu (We.Talk, Vidéos) est le **cas direct le plus crédible** des 4 KR Owners aval : il pourrait vouloir l'**axe 4 par expertise** pour alimenter un format.

### Restitution attendue
À confirmer. Cas direct le plus probable : **axe 4 (sujets/angle) par expertise**, comme sous-cas du persona 04, **avec la couche de confiance** (diffusion publique).

### Note de calibrage
Pas de restitution dédiée sans signal d'usage réel. Priorité : **PAD / commercial / recrutement**.


---

## 12 · Persona — KR Owner Expérience Collaborateurs

> **Tier** : **Non-lecteur direct de la charte** + domaine **hors périmètre** (la plus faible pertinence du set).
> **Statut lecteur (charte v1.6)** : à la Tribe XP Collab, l'unité de consommation est le **Tribe Lead**. Voir **persona 07**.
> **Altitude** : opérationnelle.

### Qui
KR Owner d'une squad XP Collaborateurs (WeFiiT News, Events, ChallengersRSE, We.Care) ; responsable d'un KR trimestriel.

### Relation à l'Observatoire
**Quasi nulle.** Cumule deux raisons de faible pertinence : non-lecteur direct (consommation au niveau Tribe Lead) **et** domaine hors périmètre (l'Observatoire couvre l'expertise produit, pas l'XP collaborateur / le marché-talent / l'événementiel).

### Restitution attendue
Aucune dédiée.

### Note de calibrage
Persona fourni **uniquement pour complétude du set demandé**. Recommandation explicite : **aucune restitution à prévoir**. C'est le candidat n°1 à retirer du set si tu veux le resserrer sur les lecteurs réels.


---

## ANNEXE — Matrice de restitution (synthèse transversale)

> **Usage** : input transversal pour le Claude du projet Observatoire, afin d'identifier *quoi restituer à qui* sur le dashboard. Les personas 01-12 + 14 détaillent ; cette matrice synthétise.
>
> **Légende des blocs du Format B** (à aligner sur les libellés canoniques de ta *Grille-validation-Format-B*) :
> **A1** = Problèmes clients à adresser · **A2** = Signaux marché / convictions à challenger · **A3** = Compétences / méthodes / outils à maîtriser · **A4** = Sujets de contenu opportuns + angle.
> Briques **trimestrielles** (snapshot) : concurrence, emploi. Brique **restreinte** : Boond (Axel/Delphine).

### Spécification de restitution par persona

| # | Persona | Statut lecteur (charte v1.6) | Expertises | Blocs Format B | Cadence | Couche de confiance | Accès | Format de consommation |
|---|---|---|---|---|---|---|---|---|
| 01 | Tribe Lead Expertises | Sponsor / lecteur complet | 6 | A1·A2·A3·A4 **+ synthèse** | Mensuel + trim. | **Fine** (forge des convictions) | Complet, **Boond restreint inclus** | Synthèse Tribe + dashboard complet |
| 02 | KR Owner Expertises | **Lecteur primaire** | La sienne | A1·A2·A3·A4 *filtrés* | Mensuel + trim. | Distinguer **mode/tendance/structurel** | Digest ouvert + Boond *synthèse* | Dashboard self-serve **< 15 min** |
| 03 | Tribe Lead Business | Lecteur (+ ses PADs, commercial) | 6 (prio PM, Data/IA, POPS) | **A1 + concurrence** | Mensuel + trim. | Moyenne | Diffusion large | Dashboard + extraction PAD (pitch 60s) |
| 04 | Tribe Lead Notoriété | Lecteur direct | 6 | **A4 + A2** | Mensuel | **Élevée + lisible** (diffusion publique) | Diffusion large | Dashboard + extraction « contenus activables » |
| 05 | Tribe Lead Excellence | Lecteur direct | 6 | **A3** | Mensuel + trim. (emploi) | Moyenne | Diffusion large | Dashboard + extraction « compétences à développer » |
| 06 | Lead Ops | Lecteur **méta** | — | **Statut sources** (méta) | Continue | s.o. | Méta | Vue « santé du dispositif » |
| 07 | Tribe Lead XP Collab | Lecteur **faible** | 6 (A3 seul) | A3 *ponctuel* | Ponctuel | s.o. | Diffusion large | Extraction ponctuelle (parcours) |
| 08 | CEO | **Non-lecteur** charte | 6 (lecture stratégique) | **Synthèse** | Très basse | s.o. | Synthèse | Synthèse Tribe — **pas le dashboard** |
| 09 | KR Owner Business | **Non-lecteur** direct | via Tribe Lead | sous-cas de 03 | — | — | — | Indirect / à confirmer |
| 10 | KR Owner Excellence | **Non-lecteur** direct | via Tribe Lead | sous-cas de 05 (A3) | — | — | — | Indirect / à confirmer |
| 11 | KR Owner Notoriété | **Non-lecteur** direct | via Tribe Lead | sous-cas de 04 (A4) | — | — | — | Indirect / à confirmer |
| 12 | KR Owner XP Collab | **Non-lecteur** + hors périmètre | via Tribe Lead | — | — | — | — | Aucune |
| 14 | **PAD** (Product Account Developer) | **Lecteur direct + source** (notes PAD, ancre concurrence) | 6 (idéal : **compte × expertise**) | **A1 + concurrence + réfs** | Mensuel + trim. | Moyenne (signal solide avant de l'avancer en RDV) | Digest large ; Boond *ses comptes* | **Kit d'offre + cheatsheet** « prêt à dégainer » |

### Gradient de pertinence (priorité de design du dashboard)

**Fort** → 01, 02, **14 (PAD)**, 03, 04   ·   **Moyen** → 05   ·   **Méta (distinct)** → 06   ·   **Faible** → 07   ·   **Indirect / nul** → 08, 09, 10, 11, 12

→ Concrètement : **toute l'énergie de design de restitution doit aller sur 01-02, le PAD (14), puis 03-04** (les producteurs + les lecteurs aval qui servent les objectifs n°1 et n°2). 05-06 sont des vues secondaires ciblées. 07-12 ne justifient **pas** de vue dédiée.

### ⚠ Écart entre le set demandé et les lecteurs réels de la charte

**Lecteurs réels du set** (servent directement l'objectif n°2) :
- **PAD** (les 7) — ✅ **persona 14 produit**. Lecteur + source ; cible de restitution la plus actionnable après les Expertises.
- **Commercial / avant-vente** — *à produire* — consommateur de la matière pour les propales.
- **Recrutement** — *à produire* — consommateur des snapshots emploi par expertise.

**Personas du set qui ne sont PAS lecteurs de la charte** (garder pour complétude, ou retirer pour resserrer) :
- **08 CEO** — non listé ; cible de la *synthèse*, pas du dashboard.
- **09-12 KR Owners aval** — consommation au niveau Tribe Lead ; au mieux des sous-cas.

**Décision à prendre** : ajouter PAD + commercial + recrutement (je peux les produire au même format), et statuer sur le maintien ou le retrait de 08-12.
