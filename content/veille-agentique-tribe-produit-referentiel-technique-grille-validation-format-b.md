# Grille de validation — Format B (digest par expertise)

*Double emploi (recadré v4.2) : **(1) moteur de l'agent-annotateur** — la post-passe AI Builder applique ce crible sur chaque digest avant publication (downgrades mécaniques + annotations de provenance) ; **(2) literacy de lecture critique self-service** — le lecteur (KR Owner, puis commercial, leader) l'utilise pour miner honnêtement un digest publié. Langue : FR.*

> **Règle cardinale (recadrée v4.2).** Le pipeline ne **valide plus** — il **annote**. Il n'y a plus de gate humain : le digest est un **briefing informatif publié** dont l'incertitude est rendue visible. Cette grille sert à **qualifier la provenance d'un signal** (sur quoi il tient), pas à le tamponner. Et elle ne consacre **jamais** une conviction : inscrire ou infléchir une conviction reste une **pose humaine au point d'usage** (deck, article), hors pipeline. **L'agent annote, il ne juge pas** — pas de verdict pass/fail (un critique de même famille tamponnerait). Il **énumère ce qui compte positivement** : « source unique », « newsletter-backed non corroboré », « croisement sur 1 axe » → le lecteur juge sur la matière exposée, même là où l'agent ne sait pas qu'un croisement est faible.

> **Limite à garder en tête.** Cette grille est un passe d'**hygiène + provenance**, **pas une garantie de fiabilité**. L'agent-annotateur partage les angles morts du générateur : il rattrape un tag mal posé ou une source unique, **pas un croisement fabriqué énoncé avec aplomb**. D'où la literacy lecteur : c'est l'humain au point d'usage qui reste le juge de dernier ressort.

> **Attendu V1.** Le digest est produit **sans** grounding REX / State of X (décision V1 — **V1 sans REX, sans condition**, v4.2.1 : l'ancien déclencheur « si le KR Owner juge trop maigre » n'existe plus). Leur absence est **normale**, pas un défaut. Une éventuelle injection-texte ne remonte du backlog que si les **feedbacks consommateurs** en font émerger le besoin.

---

## 1. Le crible des signaux *(le cœur)*

Pour **chaque** signal du digest :

- ☐ **Tag juste ?** `[mode]` / `[tendance]` / `[structurel]`. Tout `[structurel]` est un **candidat** tant que tu ne l'as pas validé. **Rétrograde** s'il est mono-source, marketing, ou sans corroboration interne. **Maintiens `[structurel]`** seulement avec du dur : une étude à l'appui **×** une donnée interne (PAD / emploi / concurrence) qui converge. Un signal isolé n'est jamais une certitude.
- ☐ **Source du `[structurel]` : baromètre, pas newsletter.** Un `[structurel]` ne s'assoit que sur un **fait dur de baromètre / étude**, jamais sur du discours newsletter — *a fortiori* si le signal porte un flag `⚠ poussé par <acteur>` : l'intérêt commercial de l'émetteur sur le récit (ex. **Atlassian × « frameworks hérités obsolètes »**) est un motif de **prudence, pas de validation**. **Rétrograde en `[tendance]`** un structurel adossé à une newsletter, même convergente, même sponsorisée. *(À l'inverse, un `[structurel]` correctement sourcé State of X — ex. « IA défi n°1 » — est légitime ; ne le rétrograde pas par excès de zèle.)*
- ☐ **⚠ Convergence vendor-driven ?** Si le `SIGNAL DOMINANT DU CYCLE` ou un `[structurel candidat]` repose sur une convergence **multi-cabinets**, **ouvre les fiches sources** avant de l'acter. La dédup du pré-digest peut avoir effacé les flags `⚠ poussé par <nom>` : une convergence inter-sources peut être un **alignement marketing**, pas un mouvement marché. *(Limitation V1 connue — fix au backlog.)*
- ☐ **Faisceau ≠ corroborations indépendantes.** Une même demande peut réapparaître à travers plusieurs lentilles (positionnement / conviction / skills, soit §1 + Bloc 1 + Bloc 2 + Bloc 3). Ce n'est **pas** du double-comptage, mais ce n'est **pas** non plus N corroborations : la force réelle vient du **croisement sous-jacent** (ex. PAD × emploi), pas de la répétition à l'écran. Lis le nombre de **sources distinctes**, pas le nombre d'occurrences.
- ☐ **Bruit ou utile ?** Coupe ce qui meuble. Un digest dense vaut mieux qu'un digest long.
- ☐ **Croisement réel ?** Le signal croise-t-il vraiment un externe **×** un interne ? Sans croisement, c'est une observation, pas de l'intelligence — à signaler comme telle, pas à présenter comme une conviction.

---

## 2. Les pièges de source *(garde-les en tête en lisant)*

- ☐ **Salaire = hors périmètre.** Les baromètres sont lus pour la **structuration** (rôles, séniorité, volume, géo, pénurie), jamais pour des montants / grilles / TJM. Si un € apparaît, c'est un écart.
- ☐ **Grand-N vs directionnel.** **APEC** = seule ancre grand-N (mais aucun rôle produit sauf data engineer). **LPC / Noé / Seyos** = **directionnels** (LPC = enquête communauté auto-déclarée, ~992 répondants — pas une autorité). Un chiffre LPC/Noé ne porte pas le même poids qu'un chiffre APEC.
- ☐ **Métriques APEC distinctes.** −15,5 % offres ≠ −8 % recrutements ≠ −10 % services VA. Ne pas fusionner en un seul chiffre.
- ☐ **Seyos = jauge-continuum.** La rareté d'un rôle = une **position sur le continuum** (commun · recherché · perle rare), jamais un cran catégorique tranché.
- ☐ **⬜ ≠ ❌** *(tableau concurrentiel)*. ⬜ = aucune matière captée (pas un silence réel). ❌ = silence confirmé = **ton** upgrade humain. Un ❌ posé par l'agent seul est suspect : il doit sous-affirmer en ⬜.
- ☐ **Thiga = juge et partie.** Concurrent tracké **et** éditeur du baromètre LPC. Œil sceptique à l'intersection.
- ☐ **Décompte du périmètre.** L'agent compte mal les cabinets (« 6 sur 10 », « 14 » au lieu de **12**). Corrige.

---

## 3. Le « so what » offre *(Bloc 1)*

- ☐ Le positionnement vs concurrents tient-il, ou est-il plaqué ?
- ☐ Un signal justifie-t-il une **inflexion d'offre réelle**, ou est-ce « intéressant mais pas encore » ? Ne force pas une tendance. Distingue « ça change ce qu'on vend » de « ça mérite qu'on surveille ».

---

## 4. Convictions à renforcer / challenger

- ☐ Les 2-4 formulations sont-elles **nuancées et utiles**, ou sur-affirmées ? Reformule celles qui dépassent ce que la matière soutient.

---

## 5. Sortie de l'agent-annotateur *(plus de verdict — des annotations)*

L'agent ne rend pas un pass/fail. Il **publie le digest** en y portant :

- 🏷️ **Downgrades mécaniques appliqués** : tout `[structurel]` adossé à une newsletter (a fortiori sponsorisée) → `[tendance]` ; tags mal posés corrigés.
- 🔎 **Annotations de provenance** (positives, par signal) : « repose sur une source unique », « newsletter-backed, non corroboré PAD », « croisement sur 1 seul axe », « convergence multi-cabinets — flags ⚠ possiblement effacés à la dédup », etc. → constituent la **couche de confiance** lisible au digest **et** au dashboard.
- 📊 **Indice de confiance global du digest** (`confidenceSummary`, v4.2.1) : un décompte **factuel et énumératif** en tête (« 1 source propriétaire · 4 croisements dont 3 à un seul axe · 2 non corroborés »), **jamais une note chiffrée**. Il dit la robustesse d'ensemble du cycle ; il **n'atteste pas** la solidité d'un croisement donné (il peut compter « corroboré » une fabrication confiante — trou résiduel assumé).
- ⤵️ **Mois maigre** : si la matière réelle est trop mince, l'agent **le déclare en clair dans le digest** (« cycle calme, peu de signaux nouveaux »), il ne défère plus à un report trimestriel muet (`[[REPORT_TRIMESTRIEL]]` abandonné v4.2) — la déclaration honnête a une valeur diagnostique qu'un marqueur supprimerait.

**Côté lecteur (literacy)** : un signal annoté « source unique » ou « non corroboré » n'est pas à porter tel quel devant un client — c'est une **piste à creuser**, pas une conviction. Les pistes deviennent convictions **quand un humain les forge** dans un deck/article.
