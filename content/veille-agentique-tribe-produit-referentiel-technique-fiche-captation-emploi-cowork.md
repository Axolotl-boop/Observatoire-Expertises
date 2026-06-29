# Fiche module — `Captation emploi` (passe Cowork, couche recherche)

> **Type** : passe manuelle exécutée dans **Cowork** (pas un flux Power Automate)  ·  **Couche** : 1→2 (capte et pré-structure)
> **État** : 🟢 validé (run complet 6 expertises, 19 juin) *(détail → SPECS §6 « pivot Cowork », §11)*
> **Responsable** : Axel  ·  **Cadence** : **mensuelle, manuelle** (1 passe = les 6 expertises)
> **Prompt (fait foi)** : `Prompt-captation-emploi-Cowork` **v1.4**

## Rôle
Produire **une fiche de captation `.md` par expertise et par mois** : la photographie brute, datée, de ce que le marché de l'emploi demande pour chaque expertise. Matière de couche 2 (pré-structurée, **aucun croisement**) qui alimentera le snapshot emploi trimestriel.

## Place dans la chaîne
- **Reçoit de** : la **couche recherche** des boards d'emploi (titres + snippets indexés).
- **Produit pour** : `Veille-emploi/AAAA-MM/` → agrégé trimestriellement par `Fiche-Assembleur-Snapshot-emploi` → `Pré-draft Snapshot emploi`.

## Pourquoi Cowork (≠ pipeline Power Automate + API HTTP)
(a) **Contourne le bloquant clé API / Azure Key Vault** (plus de clé à planquer, plus de connecteur custom) ; (b) **humain dans la boucle** → réduit le risque de fabrication d'un LLM+recherche qui s'auto-validerait ; (c) une passe lancée et relue par un humain est plus proche d'une « passe humaine » côté CGU. *(Le Canal A push — alertes APEC/WTTJ routées e-mail — a été **abandonné** : il ne livrait que des intitulés, objet générique → mapping `inconnu`, zéro granularité.)*

---

## Cœur technique — *PASSE MANUELLE*

### Surface & périmètre
- **Couche recherche UNIQUEMENT** : ce que le moteur expose déjà (titres, snippets, extraits indexés). **Jamais de fetch d'une page verrouillée** (login, mur, captcha). Pas d'allowlist, pas de connexion.
- **Boards** : généralistes **WTTJ · Indeed · APEC** + board(s) spécialisé(s) par expertise (Lenny's, Mind the Product, PMA Jobs, Ministry of Testing…). **LinkedIn EXCLU** (lecture humaine trimestrielle, CGU — **ne pas réintroduire**).
- **Géographie** : France, focus Île-de-France.
- **Annonce individuelle vs page d'agrégation** : l'annonce individuelle porte le **signal de récurrence** (intitulés/compétences/outils) ; les comptes Indeed / pages SEO-recherche (WTTJ `/pages/emploi-*`, APEC `recherche-emploi?…`) ne valent que comme **volume indicatif** — jamais récurrence, jamais provenance, jamais en tête de gondole.

### Jeux de requêtes figés
Par expertise, un **jeu de requêtes figé** rejoué **à l'identique chaque mois** (c'est la grille de lecture qui rend la fiche comparable dans le temps). Détail par slug → prompt §4.

### Garde-fous anti-hallucination (obligatoires)
- **Provenance d'URL** : un item n'est retenu que si son **URL apparaît textuellement** dans les résultats — **jamais reconstruire une URL** par déduction.
- **Re-lecture & recompte** avant de figer ; toute mention de volume étayée par des résultats réels.
- **Synthèse depuis les résultats seuls** (aucune connaissance « de mémoire »).
- **Fraîcheur / datation** : la couche recherche remonte du vivant **et** de l'archivé (ex. « Head of QA » datée 2021) → relever la date ou marquer « date non vérifiée » ; formuler les comptes en **« N annonces indexées (courant + archivé) »**, jamais « N postes ce mois » ; **ne jamais faire monter un tag** sur un volume non daté.
- **Cohérence post-écriture** : rouvrir le fichier et vérifier le **nom exact** (cf. Sorties), la présence des URL, l'exactitude des comptes.

### Champs normalisés de la fiche
Type de source (`alerte d'offres` | `étude/baromètre` | `mixte`) · Intitulés notables (avec date) · Compétences récurrentes · Outils nommés · Séniorité/volume *(cœur quand source = étude ; sur annonces seules → « non chiffrable sans étude »)* · Tag provisoire · **Sponsoring/biais** (obligatoire : skew **ESN/conseil vs produit** + part d'annonces non datées/archivées).

### Règles de discipline
- **WeFiiT exclu de l'échantillon** (« WeFiiT = nous, pas le marché » — sa façon de cadrer un poste relève de l'*offre*, donc du Format B).
- **slug = expertise** (`pm`·`productai`·`productops`·`pmm`·`qa`·`datapm`), **jamais un cabinet**.
- **Aucun croisement** (ni PAD, ni concurrence, ni newsletters, ni State of X). Brique pure de couche 2.
- **On agrège un signal de récurrence, on ne résume pas une annonce.**

### Plafond de tag par type de source
- `alerte d'offres` → plafond **`[tendance]`** (un seul board → `[mode]`). **Jamais `[structurel]` sur annonces seules.**
- `étude/baromètre` → candidat **`[structurel]`** permis (faits chiffrés : volume, séniorisation durable, rupture). *(Les montants salariaux lus sur étude restent en structuration ; ils sont **écartés** en aval au snapshot — salaire hors périmètre.)*
- Tags **provisoires** : tranchés à l'humain au snapshot.

### Gate
Matière insuffisante pour une expertise → **n'écrire AUCUN fichier**, émettre le jeton seul `[[PAS_DE_FICHE]]`. Un trou de captation est une information.

### Discipline de session
6 expertises **en un run**, traitées l'une après l'autre, **indépendantes** (aucun bleed inter-expertises). Jusqu'à 6 fichiers, un par slug, même sous-dossier mensuel. Si la qualité décroche en fin de session longue → **couper en 2 lots de 3**.

### Sorties & dépôt
- **Nom** : `{AAAA-MM-JJ}_{slug}_{HHMMSS}.md` — **exactement ce format, aucun préfixe/suffixe** (l'`_` sépare le slug ; un préfixe parasite casse le filtre `startsWith AAAA-MM` **et** le parse `_slug_` de l'assembleur → fiche non ramassée).
- **Dépôt** (le connecteur M365 de Claude est **read-only** → pas d'écriture SharePoint directe) : écriture locale dans le dossier **OneDrive synchronisé**, remontée par la synchro :
  `…/OneDrive-WeFiiT/TRIBE EXPERTISES - Veille-emploi/{AAAA-MM}/`

---

## Dépendances & renvois
- **Aval** : `Fiche-Assembleur-Snapshot-emploi` + `Fiche-Agent-Snapshot-emploi`.
- **Docs fait-foi** : **`Prompt-captation-emploi-Cowork` v1.4** · **SPECS §6** (pivot Cowork) · **§7** (nommage, slugs).

## Points d'attention / dette
- **Fragilité du nom de fichier** : tout préfixe ajouté casse l'assembleur → la cohérence post-écriture (§3.6 du prompt) est non-négociable.
- **Fraîcheur** : risque structurel d'annonces archivées comptées comme courantes — d'où l'interdiction de tag sur volume non daté.
- **Tension LinkedIn (backlog)** : la méthode d'enrichissement LinkedIn (A. Simonian) rouvrirait un arbitrage CGU. **Ne pas réintroduire LinkedIn** dans cette passe sans ce débat.

---

## ⟦À COMPLÉTER⟧
- *(rien de bloquant)* — confirmer au 1er run T3 le board Data PM (« à confirmer » dans le prompt §4) et le rendement réel du board Ministry of Testing.
