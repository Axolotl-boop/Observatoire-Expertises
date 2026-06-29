# Format — Veille concurrentielle (v3.1)

*Brique `01-Matière-brute/Veille-concurrentielle`. **Source pure (couche 3)** : le snapshot concurrentiel croise les **canaux concurrentiels entre eux** (RSS × newsletters cabinets × alertes), organisé **par axe de mouvement de marché**. Cadence du snapshot : **trimestrielle** ; captation : **continue**. Sources **publiques uniquement**.*

> **Ce qui change en v3 — séparation brique / croisement.** v2 faisait croiser le snapshot avec nos données internes (PAD, emploi, State of X) en **ligne ③** et y posait « notre position » en **ligne ④**. v3 **sort ces deux lignes du snapshot** : le snapshot redevient une **brique pure** — `① qui bouge · ② convergence & trou · lecture transverse · tableau de suivi`, et **rien d'autre**. Le **croisement avec nos données et le positionnement migrent au Format B (couche 4)** : ③ → croisement du Bloc 1 / Bloc 2 ; ④ → **Bloc 1 « positionnement offre »**.
>
> **Pourquoi** : (1) **un seul point de croisement** — on supprime le double-croisement du PAD (snapshot *et* Format B) ; (2) **« notre position » trouve sa maison** au Format B Bloc 1, à côté des problématiques clients PAD, au lieu d'être orpheline en mode dégradé dans une brique brute ; (3) **snapshot réutilisable multi-expertises** — chaque Format B y puise ses axes et fait *son* croisement. v3 **supersede** v2 une fois promu dans SharePoint.

---

## 1. Le principe — la convergence est la colonne vertébrale, pas la conclusion

Le signal n'est jamais un concurrent isolé : c'est **le mouvement**, et surtout **la convergence**. Un cabinet qui bouge = peut-être un coup. **Deux ou trois qui bougent dans le même sens = une direction de marché.** D'où le choix d'organiser le snapshot **par axe de mouvement** (un thème où plusieurs cabinets se positionnent), et non par fiche concurrent — la fiche concurrent était la cause n°1 de la légèreté de v1 : elle reléguait la convergence à une synthèse de fin.

**Le snapshot décrit le mouvement du marché concurrent ; il ne nous y situe pas.** Se situer (« où sommes-nous, quel argument avant-vente »), c'est le **Format B**. La brique reste factuelle et réutilisable.

Quatre partis pris :
- **Mouvements, pas statique.** L'unité de capture est le **delta** (offre lancée, profil recruté, discours qui change, rachat), pas la photo. Le statique n'est que la ligne de base contre laquelle on lit le mouvement.
- **Comportemental avant déclaratif.** On lit d'abord ce que les cabinets **font** (recrutement, prises de parole), ensuite ce qu'ils **affichent** (site vitrine, en retard d'un trimestre et marketé).
- **Ancrage PAD.** On suit les cabinets qu'on **rencontre réellement en avant-vente**. Le pipe pilote la liste.
- **La force du signal vient du nombre.** Un mouvement chez un seul cabinet reste prudent ; la convergence de plusieurs est le vrai signal de direction. C'est la seule « validation croisée » interne au snapshot — toute autre corroboration (emploi, State of X) se fait au Format B.

---

## 2. Le périmètre — ancré sur le PAD, recalibré chaque trimestre (12 cabinets)

On suit les cabinets réellement croisés en avant-vente, par expertise.

- **Core PM** : Thiga *(prioritaire)* · Hubvisory · Wivoo · Yield Advisory.
- **Core QA** : Qestit · KP2i · Smartesting.
- **Cohorte Data/IA/Stratégie** : Hymaïa · Converteo · Artefact · AI Builders · Eleven *(Artefact / AI Builders / Eleven = « source d'axe à confirmer concurrent » — indices de direction de marché, statut de concurrent réel à valider par la boucle PAD).*
- **Adjacents** : au cas par cas, si un mouvement notable surgit ou si un nom monte en PAD.

**Boucle de recalibrage — à tourner à chaque snapshot.** On confronte la watch-list aux concurrents **réellement cités en note PAD** le trimestre. Un nom qui revient monte ; un cabinet jamais croisé en 12 mois en sort. *Cette boucle est une passe humaine* (elle a besoin du PAD, que la brique n'ingère pas) — l'agent la laisse en placeholder, l'humain la renseigne.

> **Leçon Wefiit.** Au bootstrap, **Wefiit ressortait ~19 fois en note PAD, à parité avec Thiga.** Wefiit n'est pas un concurrent : **c'est nous.** On le sort du périmètre — mais sa présence prouve que l'ancrage PAD attrape bien qui est vraiment dans les deals.

---

## 3. Les surfaces observées — comportemental d'abord

Chaque mouvement = une observation **reformulée** (jamais un copier-coller) + sa source + son tag. On scanne dans cet ordre, du plus précoce/honnête au plus tardif/marketé :

1. **Recrutement** *(signal le plus précoce — pont avec la veille emploi, pas de double collecte)*. Un intitulé nouveau = une offre en préparation.
2. **Prises de parole & contenu** *(talks, posts/threads des leads, publications, formations ouvertes)*. Plus en avance que la page d'accueil.
3. **Références & clients annoncés.** Logos nouveaux, cas clients, secteurs investis.
4. **Structurel — M&A, levées, consolidation.** Rachats, fusions, ouvertures de bureau. Toile de fond.
5. **Offre & positionnement affichés** *(site vitrine — en confirmation, pas en source primaire)*. Lu en dernier, pour valider ou nuancer.

> Si une surface n'a rien produit pour un cabinet, on l'écrit franchement (« aucun mouvement visible ») plutôt que de meubler. Une case vide honnête est un signal.

---

## 4. La structure du snapshot — par axe de mouvement, **deux lignes**

Le snapshot s'organise en **3 à 5 axes de mouvement de marché**. Un axe = un thème où plusieurs cabinets se positionnent (ex. *gouvernance & cadrage IA* · *delivery augmenté par l'IA* · *Data & IA* · *montée vers le conseil de transformation*). Un axe peut être transverse ou propre à une expertise — on le tague alors `[PM]` / `[QA]` / `[transverse]`.

**Pour chaque axe, deux lignes — toutes deux obligatoires :**

- **① Qui bouge, comment.** Les mouvements reformulés, par cabinet, avec **surface · source · tag**. La matière brute de l'axe.
- **② Convergence & trou.** Combien de cabinets sur l'axe (le signal de direction) **et** qui ne le couvre pas. *Le trou compte autant que la convergence : l'angle que personne n'occupe est un espace d'offre potentiel — à exploiter au Format B.*

> **⚠️ Ce qui n'est PLUS dans le snapshot (vs v2).** La **ligne ③ croisement** (PAD / emploi / State of X) et la **ligne ④ notre position** ont **migré au Format B**. La brique s'arrête au mouvement concurrentiel et à sa convergence. On ne croise pas, on ne se positionne pas ici.

On clôt par une **lecture transverse** : parmi les axes, lequel est la direction de marché la plus nette ce trimestre — candidat à remonter au **Bloc 2 du Format B**. La convergence transverse (ex. *l'IA commoditise l'exécution → la valeur se déplace vers le jugement/cadrage/gouvernance*) doit **émerger de la matière**, jamais être présupposée ; si elle ressort, on la marque candidat `[structurel]` à valider.

---

## 5. Les tags

- `[mode]` — buzz, vocabulaire qui tourne, peu d'ancrage. À surveiller, pas à acter.
- `[tendance]` — mouvement réel et observable, pas encore irréversible.
- `[structurel]` — **faits durs seulement** (M&A, levée, fusion, ouverture/fermeture, consolidation, nouvelle sous-discipline durable). **Tout `[structurel]` est un candidat**, validé par un humain avant de remonter en convictions.

**Plafonds** : une offre lancée / un discours / un recrutement / une posture plafonne à `[tendance]`. **Force du signal = convergence** : un seul cabinet → prudent (`[mode]` ou `[tendance]`) ; deux-trois cabinets convergents → direction de marché, peut monter.

> La corroboration par la **veille emploi** et le **State of X** (qui ferait monter un signal vers `[structurel]`) se fait désormais **au Format B**, pas dans la brique.

---

## 6. Le tableau de suivi — pour lire le *delta* au trimestre suivant

Au premier passage, ce tableau est la **ligne de base**. Dès le T+1, il devient l'outil qui fait qu'on lit *ce qui a bougé* au lieu de refaire la photo. Une cellule = état succinct + tag, daté. On distingue trois états :
- **✅ tag + date** : mouvement capté.
- **❌ silence** : cabinet suivi, aucun mouvement réel ce trimestre (le silence est une information).
- **⬜ pas de matière** : aucune captation injectée — à ne pas confondre avec un silence réel (à vérifier côté sourcing).

> **Règle agent — l'agent sous-affirme.** L'agent ne voit que les fiches injectées, **jamais l'activité des canaux**. Il ne peut donc pas distinguer un ❌ d'un ⬜. Sans fiche pour un cabinet → il marque **⬜**, **jamais ❌**. Le **❌ (silence réel = canal actif, rien capté) est un upgrade humain** : Axel, qui sait quels canaux tournaient tout le trimestre, requalifie ⬜→❌ là où le silence est avéré. Marquer ❌ à la place de ⬜ fabrique un silence concurrentiel non vérifié et masque les trous de sourcing — c'est interdit côté agent.

| Cabinet | Axe A | Axe B | Axe C | Axe D |
|---|---|---|---|---|
| Thiga | | | | |
| Hubvisory | | | | |
| Wivoo | | | | |
| Yield Advisory | | | | |
| Qestit | | | | |
| KP2i | | | | |
| Smartesting | | | | |
| Hymaïa | | | | |
| Converteo | | | | |
| Artefact | | | | |
| AI Builders | | | | |
| Eleven | | | | |

Au trimestre suivant : on compare cellule à cellule, et **seules les cases qui ont changé** alimentent la section « qui bouge ». Le reste est silence, et le silence est une information.

---

## 7. Ce qui migre au Format B (couche 4)

Le snapshot est un **intrant** du Format B, pas un livrable croisé. Au Format B se font :
- **Le croisement** (ex-③) : confronter chaque axe concurrentiel au **PAD** (le rencontre-t-on en avant-vente ? sous quelle objection/demande ?), à la **veille emploi** (les annonces confirment-elles ?), au **State of X** (le benchmark corrobore-t-il ?). → Bloc 1 & Bloc 2.
- **Le positionnement** (ex-④) : où on se situe (alignés / en retard / angle propre) et l'argument ou la parade avant-vente. → **Bloc 1 « positionnement offre »**, à côté des problématiques clients PAD.

Le Format B agrège, pour une expertise × un trimestre : fiches newsletters du mois + synthèse PAD + **snapshot concurrentiel du trimestre** + **snapshot emploi du trimestre** (+ State of X en grounding).

---

## 8. Garde-fous & cadence

- **Captation à deux étages, continue** : (A) newsletters de cabinets + (B) alertes nom de marque routées en e-mail commun ; (C) polling RSS des blogs. Dépôt en sous-dossiers mensuels `Veille-concurrentielle/AAAA-MM/`. *(Détail dans `Spec-flux-veille-concurrentielle`.)*
- **Snapshot trimestriel** : assemblage de la matière des 3 mois → **agent de pré-draft** (`Prompt-agent-pré-draft-snapshot`, concurrentiel-pur, sans grounding) → **validation Axel**. Dépôt en **sous-dossier trimestriel** `Veille-concurrentielle/AAAA-T#/Snapshot-concurrentiel-T#-AAAA.md`.
- **L'agent pré-drafte, ne finalise jamais.** Axel valide — en priorité les candidats `[structurel]` et la lecture transverse.
- **Seuil de matière** global et par axe : un axe sans mouvement réel s'écrit « aucun mouvement visible ».
- **Sources publiques uniquement, pas de scraping.** Le goulot n'est pas la collecte mais le **jugement**.
- **Pont emploi, pas double collecte** : le recrutement des concurrents est lu comme surface comportementale ici ; le croisement avec **notre** snapshot emploi marché se fait au Format B.
- **Un responsable** (aujourd'hui Axel) — condition de survie de la brique.

---

## Gabarit copiable — `Snapshot-concurrentiel-T#-AAAA` (déposé dans `Veille-concurrentielle/AAAA-T#/`)

```markdown
# Snapshot concurrentiel — T# AAAA
> Rédigé par : pré-draft agent · À valider par : Axel
> Périmètre : PM (Thiga, Hubvisory, Wivoo, Yield Advisory) · QA (Qestit, KP2i, Smartesting) · Data/IA (Hymaïa, Converteo, Artefact, AI Builders, Eleven)
> Recalibrage watch-list : [renseigné par la passe humaine — hors périmètre agent]

## Axe 1 — [titre] · [PM|QA|transverse]
- **① Qui bouge** : [cabinet — mouvement reformulé · surface · source · tag] (×N)
- **② Convergence & trou** : [N cabinets ; ne couvre pas : …]

## Axe 2 — […]

## Lecture transverse
[La direction de marché la plus nette du trimestre → candidat Bloc 2 Format B. Convergence transverse marquée candidat [structurel] si la matière la porte.]

## Tableau de suivi (delta)
| Cabinet | Axe 1 | Axe 2 | … (1 colonne par axe) |
|---|---|---|---|
| Thiga | | | |
| Hubvisory | | | |
| Wivoo | | | |
| Yield Advisory | | | |
| Qestit | | | |
| KP2i | | | |
| Smartesting | | | |
| Hymaïa | | | |
| Converteo | | | |
| Artefact | | | |
| AI Builders | | | |
| Eleven | | | |
<!-- Cellule : « ✅ <mouvement reformulé> · [tag] · AAAA-MM » | « ❌ » silence réel (upgrade HUMAIN) | « ⬜ » pas de matière (défaut agent sans fiche).
     L'agent marque ⬜ par défaut quand aucune fiche n'a été injectée pour un cabinet — JAMAIS ❌. Symboles ✅/❌/⬜ littéraux, pas de « ↑ » ni « — aucun signal ». -->

## Points de décision pour Axel
- Verdicts [structurel] candidats à trancher : […]
- Axes à convergence limite (1 seul cabinet) à confirmer ou requalifier : […]
- Cabinets sans mouvement visible ce trimestre (candidat recalibrage watch-list) : […]
```

---
*Format v3.1 — supersede v2. Le croisement et le positionnement vivent au Format B. À faire évoluer après le premier trimestre en régime automatisé (assembleur trimestriel) et la première revue à 3 mois.*
*v3.1 (20 juin 2026) : règle agent ⬜-par-défaut ajoutée au §6 (l'agent sous-affirme — sans fiche = ⬜, jamais ❌ ; le ❌ est un upgrade humain) ; tableau de suivi du gabarit copiable littéralisé (fin de la fracture décrit-vs-littéral) ; symboles ✅/❌/⬜ littéraux imposés.*
