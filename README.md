# Observatoire des Expertises

Portail web interne qui **recense les données traitées par les agents IA**.
Ces données sont produites sous forme de fichiers Markdown (`.md`) déposés sur
SharePoint, puis **synchronisés automatiquement** dans ce dépôt et publiés sous
forme de catalogue consultable par toute l'entreprise.

## Architecture

```
SharePoint (.md)  ──►  GitHub Action (sync horaire)  ──►  dossier content/  ──►  Vercel (site Next.js)
```

- **Next.js (App Router)** — génère le site statique (catalogue + lecture).
- **`content/`** — contient les `.md` synchronisés (source du catalogue).
- **GitHub Action** — télécharge les `.md` SharePoint via Microsoft Graph et les committe.
- **Vercel** — redéploie automatiquement à chaque push.

## Développement local

```bash
npm install
npm run dev
```

Le site est disponible sur http://localhost:3000. Les fichiers du dossier
`content/` apparaissent dans le catalogue.

## Format des fichiers Markdown

Chaque `.md` peut commencer par un en-tête **front-matter** (optionnel) :

```markdown
---
title: Titre affiché
agent: Agent Veille
categorie: Veille concurrentielle
date: 2026-06-20
tags: [marché, synthèse]
description: Court résumé affiché dans le catalogue.
---

# Contenu en Markdown…
```

Si le front-matter est absent, le titre est déduit du premier `#` du fichier,
et la date de la date de modification du fichier.

## Synchronisation SharePoint

La synchronisation utilise une **app registration Entra ID** (flux client
credentials) avec la permission applicative **`Sites.Read.All`** (consentement
administrateur requis).

### 1. Créer l'app registration

Dans le portail Azure → *Microsoft Entra ID* → *App registrations* :
1. Créer une application.
2. *API permissions* → ajouter **Microsoft Graph › Application › Sites.Read.All** → accorder le consentement admin.
3. *Certificates & secrets* → créer un *client secret*.

### 2. Configurer les secrets GitHub

Dans *Settings › Secrets and variables › Actions* du dépôt, ajouter :

| Secret              | Exemple                       | Description                          |
| ------------------- | ----------------------------- | ------------------------------------ |
| `TENANT_ID`         | `xxxx-xxxx-…`                 | ID du tenant Entra ID                |
| `CLIENT_ID`         | `xxxx-xxxx-…`                 | ID de l'application                  |
| `CLIENT_SECRET`     | `••••••`                      | Secret client                        |
| `SHAREPOINT_HOST`   | `contoso.sharepoint.com`      | Hôte SharePoint                      |
| `SHAREPOINT_SITE`   | `/sites/MonSite`              | Chemin du site                       |
| `SHAREPOINT_DRIVE`  | `Documents`                   | (optionnel) bibliothèque de documents |
| `SHAREPOINT_FOLDER` | `Agents IA`                   | (optionnel) sous-dossier à parcourir |

La GitHub Action `.github/workflows/sync-sharepoint.yml` s'exécute toutes les
heures (et manuellement via *Run workflow*). Elle peut aussi être lancée en
local :

```bash
# Renseigner les variables d'environnement puis :
npm run sync
```

## Déploiement sur Vercel

1. Importer le dépôt GitHub dans Vercel (framework détecté : **Next.js**).
2. Déployer — aucune variable d'environnement n'est requise côté Vercel
   (le contenu vient du dépôt).
3. À chaque push (y compris ceux de la synchro SharePoint), Vercel redéploie.

### Restreindre l'accès à l'entreprise

Pour que la page reste **privée et accessible uniquement aux collaborateurs**,
plusieurs options Vercel :

- **Vercel Authentication** (plans Pro/Enterprise) — protège l'URL derrière une
  connexion.
- **SSO d'entreprise (SAML/Entra ID)** via Vercel Enterprise.
- À défaut, un mot de passe de déploiement (*Password Protection*).

> Choisissez l'option adaptée à votre offre Vercel ; ce paramétrage se fait
> dans les réglages du projet Vercel, pas dans le code.
