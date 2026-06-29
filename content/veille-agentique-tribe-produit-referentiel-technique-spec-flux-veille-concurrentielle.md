# Spec — Flux d'automatisation de la veille concurrentielle

*Opérationnalise la captation du `Format-veille-concurrentielle` **(v3)**. Brique `01-Matière-brute/Veille-concurrentielle`. Tooling : Power Automate + Copilot Studio + SharePoint, comme le reste du dispositif.*

> **Aligné v3 — le snapshot est une brique pure.** Le snapshot concurrentiel croise les **canaux concurrentiels entre eux** (RSS × newsletters cabinets × alertes), par axe, et s'arrête à `① qui bouge · ② convergence & trou · lecture transverse · tableau de suivi`. Le **croisement avec nos données internes (PAD, emploi, State of X) et le positionnement (« notre position ») se font au Format B (couche 4)**, pas ici. Le pipeline de captation (§2-§3) est inchangé ; seule la **couche 4 (§4)** évolue par rapport à v2.

> **Principe directeur — on découple deux cadences.** La **captation est continue** (au fil de l'eau, comme les newsletters) ; le **snapshot reste trimestriel** (couche de jugement : axes, convergence) ; le **rendu est mensuel** dans le Format B, qui se sert dans la captation du mois. C'est le pattern déjà acté pour le Bloc skills (*mesure trimestrielle, rendu mensuel*). On ne fabrique jamais de snapshot mensuel à vide.

> **Évolution vs décision antérieure.** Le dispositif avait acté « veille concurrentielle = prompt reproductible, pas pipeline ». Ça reste vrai **pour le snapshot et les surfaces comportementales profondes** (LinkedIn, talks). Mais la **surface publiée** (blogs, actus, newsletters concurrentes) est, elle, fréquente et mécanique → elle mérite un pipeline de captation. La présente spec ajoute ce pipeline **sans** automatiser le jugement.

---

## 1. Architecture — calage sur les 5 couches

| Couche | Ici | Auto ? |
|---|---|---|
| 1. Captation | 3 canaux → point unique → `Veille-concurrentielle/AAAA-MM/` | ✅ |
| 2. Pré-digestion / tri | gate de matérialité + mini-fiche taguée (réutilise le pattern Format A) | ✅ |
| 3. Brique propriétaire | la matière concurrentielle brute structurée | — |
| 4. Snapshot trimestriel | assemblage déterministe (matière concurrentielle **seule**) + agent de pré-draft **concurrentiel-pur** → **validation Axel** | semi |
| 5. Remontée | lecture transverse → **Bloc 1 / Bloc 2 du Format B** (où se font croisement + positionnement) + boucle convictions | humain |

**La machine capte, structure et pré-drafte la brique ; l'humain trie le bruit et juge la convergence. Le croisement et le positionnement vivent au Format B.**

---

## 2. Couche 1 — Captation (3 canaux, un seul point d'arrivée)

Tous les canaux déposent dans `01-Matière-brute/Veille-concurrentielle/AAAA-MM/`. Convention de nommage **cohérente avec le système** (l'underscore reste le séparateur qui fait foi pour le filtre `_` du fetch) :

```
AAAA-MM-JJ_cabinet_hash.md   (RSS)
AAAA-MM-JJ_slug_HHMMSS.md    (e-mail)
```
`cabinet`/`slug` permet le **filtrage par cabinet et par expertise** au snapshot. **Mapping fixe (12 cabinets)** : PM = `thiga` / `hubvisory` / `wivoo` / `yield` ; QA = `qestit` / `kp2i` / `smartesting` ; Data/IA = `hymaia` / `converteo` / `artefact` / `aibuilders` / `eleven`.

**Canal A — Newsletters concurrentes** *(le moins coûteux : zéro nouvelle brique).*
On s'abonne depuis l'adresse pro, on route via le **flux e-mail commun** vers `Veille-concurrence`. **Abonnements faits** : Thiga, Smartesting, Qestit, Converteo, Yield Advisory. ⚠️ **Newsletter LinkedIn casse le Canal A** (Artefact, Hymaïa diffusent sur LinkedIn → non routable e-mail → passe humaine). Doublon RSS×newsletter assumé, dédup au jugement.

**Canal B — Alertes nom de marque** *(presse, M&A, nominations).*
**12 Google Alerts qualifiées** (une par cabinet), routées en e-mail vers le même point. C'est le canal qui couvre la surface **structurelle** (levées, rachats, ouvertures). ⚠️ **Homonymie** : alertes qualifiées obligatoires, jamais le nom seul, et **tout désambiguïsateur quoté** (leçon : `Roder` non quoté fuzzy-matchait « order » → corrigé en `"AI Builders" "Stéphane Roder"` ; surveiller `Artefact`). Cf. SPECS §8.1 pour les termes exacts.

**Canal C — Polling RSS des blogs** *(le cœur du nouveau pipeline).*
Déclencheur Power Automate **« Lorsqu'un élément de flux RSS est publié »**, un flux par feed. **État réel** (cf. SPECS §4.1 pour la cartographie complète) :

| Cabinet | Canal | État |
|---|---|---|
| Thiga | RSS (`media.thiga.co/rss.xml`) | **ON** |
| Smartesting | RSS (`/feed/`) | **ON** *(durcir `fileName` — trailing slash)* |
| Qestit | RSS (`/fr/blog/rss.xml`) | **ON** |
| Converteo | RSS (`/blog/feed/`, HTTP GET premium) | **ON** |
| Yield Advisory | feed désactivé | RSS **Off** (gabarit) → **Canal A** (newsletter e-mail) |
| Hubvisory | SPA, pas de feed | **Canal B** + passe humaine |
| Wivoo | Webflow mort + Observatoire | **Canal B** + passe humaine |
| KP2i | actus dormantes, pas de RSS | **Canal B** + veille emploi |
| Hymaïa / Artefact | newsletter LinkedIn | **Passe humaine** + B |
| AI Builders / Eleven | feed off | **Canal B** (+ Reports pour Eleven) |

Le déclencheur RSS donne titre + lien + résumé + date. Si le résumé est tronqué, **HTTP GET sur le lien + nettoyage HTML→texte** (réutiliser l'action de nettoyage du flux Format A) avant la couche 2. Pas de dédup à câbler côté RSS (le déclencheur ne renvoie que les nouveaux items) ; la collision RSS×Alerte se règle par le **hash dans le nom** + dédup en jugement au snapshot.

> **Sources publiques uniquement, pas de scraping.** LinkedIn (CGU) et sites 100 % JS sans feed restent hors pipeline → ils relèvent de la **passe humaine trimestrielle** (cf. §6) et de la **veille emploi** pour le recrutement.

---

## 3. Couche 2 — Gate de matérialité + mini-fiche (réutilise le pattern Format A)

Les blogs concurrents sont **marketés** : du SEO (« les 10 meilleures agences », « 15 icebreakers ») se mêle au vrai signal. Sans filtre, on recrée la revue de presse v1. On réutilise donc le mécanisme du flux Format A :

L'agent de captation concurrence (Copilot Studio, **distinct** de l'agent Format A gelé — ne pas le dégeler ; **créé & publié**) pré-digère chaque item capté et :
- émet **`[[PAS_DE_FICHE]]` seul** si l'item n'a **aucune matière concurrentielle** (pur SEO, pur produit promo, RH générique) → `Condition` dans le flux → `Terminate (Succeeded)`, pas de fichier ;
- sinon produit une **mini-fiche** : `cabinet` · `surface` (recrutement / prise de parole / référence-client / M&A / offre) · 1-2 phrases reformulées (jamais de copier-coller) · `tag [mode|tendance|structurel]` · drapeau sponsoring/biais.

Calibrage **conservateur** (comme Format A) : un signal ténu → mini-fiche courte, pas un skip. Le tag **`[structurel]` reste un candidat** : aucune remontée en convictions sans validation humaine.

> Réutilise les leçons du flux Format A : sortie agent = `body/responses[0]` (`lastResponse`) ; la `Condition` doit lire **le même contenu dynamique** que le `File Content` ; opérateur **contains** (pas `is equal to`) ; `Terminate` sur **Succeeded** (sinon chaque skip marque le run en échec). **Gate validé** sur le 1er mail réel (Google Alert AI Builders → skip correct).

---

## 4. Couche 4 — Snapshot trimestriel (assemblage + pré-draft, validé)

> **Ce qui change en v3.** Le snapshot ne lit plus que la **matière concurrentielle** et l'agent est **concurrentiel-pur** : il produit **2 lignes par axe (①②)** + lecture transverse + tableau de suivi, **sans aucune ligne ③ croisement ni ④ notre position** (elles vivent au Format B). Plus d'injection des briques PAD/emploi, **plus de grounding** (l'agent n'utilise rien d'externe). Dépôt en **sous-dossier trimestriel** `AAAA-T#/`.

Flux **planifié (Recurrence)**, déclenché une fois par trimestre (ex. le 1er jour du mois suivant la clôture du trimestre). Étapes :

1. **Assembler la matière concurrentielle du trimestre.** Lire **uniquement les mini-fiches concurrentielles** des **3 sous-dossiers mensuels** `AAAA-MM/` du trimestre, via le pattern déterministe `Fetch matière` (le grounding n'indexe pas le `.md`) :
   - « Obtenir les fichiers (propriétés uniquement) » sur la bibliothèque, **pagination activée** ;
   - « Filtrer un tableau » sur **nom de fichier** `commence par AAAA-MM` (pas sur le chemin — accents URL-encodés) **et** contient `_` ;
   - un seul « Appliquer à chacun » sur le `Body` filtré (pas de For each imbriqué → évite le throttling) ; `body(...)` auto-coercé en string dans le `concat`.
   - Scope par cabinet/expertise possible via le slug.
   - *(Optionnel)* lire le **tableau de suivi du trimestre précédent** pour permettre la lecture du delta.
2. **Appeler l'agent de pré-draft snapshot** (Copilot Studio, **distinct** de l'agent Format B et de l'agent captation, **concurrentiel-pur, sans grounding**) via **« Execute Agent and wait »**, `Message` = le concat de la matière. Il produit le snapshot **au format v3** — structuré **par axe de marché**, chaque axe sur ses **2 lignes** (① qui bouge · ② convergence & trou), une **lecture transverse**, un **tableau de suivi** (concurrent × axe, 3 états ✅/❌/⬜), et une section **« Points de décision pour Axel »**. Tags conservateurs ; convergence transverse **à faire émerger**, pas à présupposer.
3. **Déposer** le pré-draft en `Veille-concurrentielle/AAAA-T#/Snapshot-concurrentiel-T#-AAAA.md` **+ poster un message Teams à Axel** pour revue.

> **Le snapshot ne fait PLUS** : ni « compléter avec les briques de croisement » (PAD/emploi/State of X), ni ligne ④ « notre position ». Tout cela a migré au Format B.

**Garde-fou cardinal.** L'agent **pré-drafte, ne finalise jamais.** Axel valide — en priorité les candidats `[structurel]` et la **lecture transverse**. La veille **recommande**, elle ne met pas à jour les decks.

**État build & leçons (17 juin) :**
- **Agent concurrentiel-pur VALIDÉ** sur la matière T2 trimée (sortie conforme : par axe, ①② seulement, tags disciplinés, convergence émergée, tableau 3-états, Points de décision).
- **⚠️ La test pane Copilot Studio se fige sur les générations longues** (~2 min). **Tester / invoquer via Power Automate `Execute Agent and wait`** (= chemin prod, sans la limite 2000 de la pane, et qui *attend* la fin). **Surveiller le timeout** de l'action en volume réel (matière d'un trimestre complet > 1568 car. du test).
- **Squelette de l'assembleur = le flux jetable validé** : Déclencheur → `Composer` (matière) → `Execute Agent and wait`. Pour l'assembleur, **remplacer le `Composer` manuel par le `Fetch matière`** sur les 3 sous-dossiers mensuels.

---

## 5. Le rendu mensuel (rappel — pas de snapshot mensuel)

Le Format B PM mensuel **n'attend pas le snapshot**. Son propre `Fetch matière` lit les **mini-fiches concurrentielles du mois en cours** (`AAAA-MM/`) = fraîcheur mensuelle, et **pointe vers le dernier snapshot trimestriel** (`AAAA-T#/`) pour les axes/convergence consolidés. **Mesure trimestrielle, rendu mensuel** — strictement le pattern du Bloc skills. **C'est au Format B que se fait le croisement** (concurrence × PAD × emploi × State of X) et que se pose le **positionnement** (Bloc 1).

---

## 6. Ce qui reste humain (la passe trimestrielle augmente, ne remplace pas)

Le pipeline couvre la surface **publiée**. La passe humaine trimestrielle (via `Prompt-relance-trimestrielle-veille`) reste nécessaire pour les surfaces **comportementales profondes** non automatisables : recrutement LinkedIn, prises de parole/threads des leads, signaux faibles. Elle tourne aussi la **boucle de recalibrage PAD→watch-list** (leçon Wefiit) — que l'agent laisse en placeholder, faute de PAD. Les deux flux (auto + humain) alimentent le même snapshot trimestriel.

---

## 7. Cadence — récapitulatif

| Élément | Cadence |
|---|---|
| Captation (RSS / newsletters / alertes) | **continue** (sous-dossiers mensuels `AAAA-MM/`) |
| Gate + mini-fiche | au fil de l'eau |
| Snapshot v3 (brique pure, jugement) | **trimestriel** (pré-draft auto + validation Axel ; dépôt `AAAA-T#/`) |
| Passe humaine comportementale + recalibrage PAD | trimestriel |
| Rendu dans le Format B PM | **mensuel** (lit la captation du mois + dernier snapshot) |

---

## 8. Garde-fous (hérités du dispositif)

- **Seuil de matière** global et par axe ; un axe sans mouvement réel s'écrit « aucun mouvement visible » (KP2i en sera souvent le cas — c'est une info, pas un trou).
- **Gate `[[PAS_DE_FICHE]]`** à la captation (anti revue de presse). Ne jamais réutiliser ce jeton ailleurs.
- **Détection sponsoring/biais** sur chaque mini-fiche.
- **`[structurel]` = validation humaine** avant remontée en convictions.
- **Le snapshot ne croise pas et ne positionne pas** — c'est le Format B (couche 4).
- **Pont emploi, pas double collecte** : le recrutement des concurrents est lu comme surface « qui bouge » ici ; le croisement avec **notre** snapshot emploi marché se fait au Format B.
- **Un responsable** : Axel (condition de survie de la brique).

---

## 9. Plan de test

1. **RSS → fichier** : publier (ou attendre) un billet sur un blog câblé → vérifier la création de `AAAA-MM-JJ_cabinet_hash.md` dans le bon sous-dossier mensuel. *(⬜ bout-en-bout live au prochain billet réel.)*
2. **Gate** : listicle SEO → attendu **skip** ; vrai mouvement → **mini-fiche taguée**. *(✅ chemin alerte validé sur Google Alert AI Builders.)*
3. **Newsletter/alerte** : déclencher → vérifier le routage. *(✅ alerte ; ⬜ chemin newsletter au 1er mail de newsletter.)*
4. **Assemblage trimestriel** : lancer le flux planifié à la main sur un trimestre rempli → vérifier que le fetch déterministe lit les 3 mois (pagination, filtre `_`, scope) et que l'agent rend un snapshot **par axes, ①② seulement, aucun ③④**, déposé en `AAAA-T#/`. *(✅ agent validé sur matière trimée ; ⬜ run complet via l'assembleur.)*
5. **Bout en bout PM** : confirmer que le Format B PM du mois lit la captation concurrentielle du mois.

---

## 10. Dette / à confirmer au build

- ✅ **Agent de captation** concurrentielle créé & publié (distinct du Format A gelé).
- ✅ **Agent de pré-draft snapshot** créé, publié, **validé** (concurrentiel-pur, sans grounding).
- ✅ **Mapping cabinet→expertise** figé (12 cabinets, slugs).
- ⬜ **Construire le flux d'assemblage trimestriel** *(LA prochaine grande pièce)* : Recurrence → `Fetch matière` (3 sous-dossiers `AAAA-MM/`) → `Execute Agent and wait` → dépôt `AAAA-T#/` → ping Teams. Squelette = le flux jetable validé.
- ⬜ **Run snapshot T2 sur matière complète** via l'assembleur.
- ⬜ **Bout-en-bout live des 4 RSS** au prochain billet ; **durcir `fileName` Smartesting**.
- ⬜ **Chemin newsletter** du flux e-mail à valider (needle de domaine) + règle Outlook (5 domaines).
- ⬜ **Conformité DLP** des flux à valider formellement.
- ⬜ **Arbitrage volume** : si le RSS génère trop de bruit malgré le gate, durcir le calibrage de l'agent de captation (jamais le gate Format A).

---
*Spec v2 — alignée `Format-veille-concurrentielle` v3 (snapshot = brique pure ; croisement + positionnement au Format B). À câbler par co-pilotage (Axel pilote l'UI, Claude navigue). À faire évoluer après le premier trimestre en régime automatisé.*
