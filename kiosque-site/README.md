# Le kiosque à journaux

Site public dédié aux **newsletters produit pré-digérées** : pour chaque édition
reçue, un digest et un verdict — *ce qui se dit, ce qu'on en retient*.

Extrait de la rubrique « Kiosque à journaux » de l'**Observatoire des
Expertises**, dont il ne reprend que cette partie. Le contenu est produit par
les agents IA, déposé sur SharePoint, puis synchronisé ici toutes les heures.

## Architecture

```
SharePoint (.md)  ──►  GitHub Action (sync horaire)  ──►  content/  ──►  Vercel (Next.js)
```

- **Next.js (App Router)** — site entièrement statique, aucune base de données.
- **`content/`** — les `.md` synchronisés, source unique du site.
- **GitHub Action** — télécharge les `.md` via Microsoft Graph et les committe.
- **Vercel** — redéploie à chaque push.

Le site n'a **pas d'authentification** : il est public. Il ne lit aucune
variable d'environnement au runtime.

## Développement local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000.

```bash
npm run typecheck   # types
npm run lint        # eslint
npm run build       # build de production (génère toutes les pages)
```

## Structure

| Chemin                        | Rôle                                                     |
| ----------------------------- | -------------------------------------------------------- |
| `app/page.tsx`                | Le kiosque : l'étagère des dossiers par source            |
| `app/journaux/[slug]/page.tsx`| La lecture d'une édition                                  |
| `app/a-propos/page.tsx`       | Ce qu'est le kiosque, les sources, l'attribution          |
| `components/Kiosque.tsx`      | Étagère + filtre mensuel + ouverture d'un dossier         |
| `lib/content.ts`              | Lecture des `.md`, extraction source/titre/verdict        |
| `lib/sources.ts`              | Ligne éditoriale de chaque source connue                  |
| `scripts/sync-sharepoint.mjs` | Synchronisation SharePoint                                |

## Le contenu

Un fichier `.md` = une édition. La source et le titre sont extraits de la 1re
ligne du digest :

```markdown
Digest de contenu — Le Ticket, « Le titre de l'édition » (2026-06-14)
```

Les libellés d'une même source varient d'une édition à l'autre (nom de
l'auteur, de la publication, co-signatures). `lib/content.ts` les ramène à un
libellé canonique via `SOURCE_ALIASES` ; `lib/sources.ts` y attache une
description. **Une source non reconnue s'affiche sous son libellé brut, sans
description** — pour l'adopter, ajouter une règle dans `SOURCE_ALIASES` puis une
entrée dans `SOURCE_INFO`.

Seuls les fichiers du dossier SharePoint `Newsletters-pré-digérées/` sont
publiés. Ce filtre est appliqué deux fois, volontairement : à la synchro
(`SHAREPOINT_FILTER`) et à la lecture (`NEWSLETTER_FOLDER` dans
`lib/content.ts`).

## Synchronisation SharePoint

Utilise une **app registration Entra ID** (flux client credentials) avec la
permission applicative **`Sites.Read.All`** (consentement administrateur
requis). Secrets à définir dans *Settings › Secrets and variables › Actions* :

| Secret              | Exemple                  | Description                           |
| ------------------- | ------------------------ | ------------------------------------- |
| `TENANT_ID`         | `xxxx-xxxx-…`            | ID du tenant Entra ID                 |
| `CLIENT_ID`         | `xxxx-xxxx-…`            | ID de l'application                   |
| `CLIENT_SECRET`     | `••••••`                 | Secret client                         |
| `SHAREPOINT_HOST`   | `contoso.sharepoint.com` | Hôte SharePoint                       |
| `SHAREPOINT_SITE`   | `/sites/MonSite`         | Chemin du site                        |
| `SHAREPOINT_DRIVE`  | `Documents`              | (optionnel) bibliothèque de documents |
| `SHAREPOINT_FOLDER` | `Agents IA`              | (optionnel) sous-dossier à parcourir  |

La GitHub Action `.github/workflows/sync-sharepoint.yml` s'exécute toutes les
heures, et manuellement via *Run workflow*. En local : renseigner un `.env`
d'après `.env.example`, puis `npm run sync`.

La synchro **échoue volontairement** si le filtre ne remonte aucun fichier —
sans quoi un dossier renommé côté SharePoint viderait le site en silence.

## Déploiement sur Vercel

1. Importer le dépôt dans Vercel (framework détecté : **Next.js**).
2. Déployer. Aucune variable d'environnement n'est requise.
3. Chaque push — y compris ceux de la synchro — redéploie.

### Indexation par les moteurs de recherche

**Bloquée par défaut** (`app/robots.ts` sert un `Disallow: /`). Le site publie
des digests de newsletters tierces : l'ouverture au référencement est une
décision éditoriale, pas un défaut technique.

Pour l'ouvrir : définir `NEXT_PUBLIC_ALLOW_INDEXING=true` dans les variables
d'environnement Vercel, puis redéployer.

## Rapport avec l'Observatoire des Expertises

Les deux sites lisent la même bibliothèque SharePoint mais sont indépendants :
dépôts séparés, déploiements séparés, aucune dépendance de code. L'Observatoire
reste interne (SSO Entra ID) et conserve sa propre rubrique kiosque ; ce site
en est la version publique et autonome.
