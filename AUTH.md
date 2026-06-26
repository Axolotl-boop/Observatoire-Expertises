# Accès restreint — SSO Microsoft Entra

Le site est protégé par **authentification Microsoft Entra (SSO)** : seuls les
comptes du tenant **WeFiiT** peuvent y accéder. Tout le site est derrière le
login (middleware Auth.js), sauf les routes `/api/auth/*` et les assets.

> ⚠️ **Important** : après le déploiement de cette version, le site **exige une
> connexion**. Il faut donc créer l'app registration et renseigner les variables
> d'environnement ci-dessous **avant/au moment** du déploiement, sinon le site
> sera inaccessible (erreur d'authentification).

## 1. Créer l'app registration (type **Web**)

Portail **Entra** → *Inscriptions d'applications* → **Nouvelle inscription** :

1. Nom : `observatoire-expertises-web` (différente de l'app de synchro).
2. **Types de comptes** : *Comptes dans cet annuaire d'organisation uniquement*
   (mono-tenant) → c'est ce qui **limite l'accès à WeFiiT**.
3. **URI de redirection** : plateforme **Web** →
   - `https://<VOTRE-DOMAINE-VERCEL>/api/auth/callback/microsoft-entra-id`
   - (pour le dev local) `http://localhost:3000/api/auth/callback/microsoft-entra-id`
4. **Inscrire**, puis noter l'**ID d'application (client)** et l'**ID de l'annuaire (locataire)**.
5. *Certificats & secrets* → **Nouveau secret client** → copier la **Valeur**.

Aucune permission API spéciale ni consentement admin n'est requis (les scopes
`openid profile email` suffisent).

## 2. Variables d'environnement

| Variable | Valeur |
|---|---|
| `AUTH_SECRET` | secret aléatoire — générer avec `npx auth secret` (ou `openssl rand -base64 33`) |
| `AUTH_MICROSOFT_ENTRA_ID_ID` | ID d'application (client) |
| `AUTH_MICROSOFT_ENTRA_ID_SECRET` | Valeur du secret client |
| `AUTH_MICROSOFT_ENTRA_ID_ISSUER` | `https://login.microsoftonline.com/<TENANT_ID>/v2.0` |

### Sur Vercel
Projet → **Settings → Environment Variables** → ajouter les 4 variables
(Production + Preview), puis **redéployer**.

### En local
Créer `.env.local` (déjà ignoré par git) avec les mêmes variables, et la
redirection `http://localhost:3000/...` ajoutée à l'app registration.

## 3. Vérifier

Une fois les variables en place et le site redéployé :
- toute visite redirige vers la connexion Microsoft ;
- seuls les comptes WeFiiT peuvent se connecter ;
- le lien **« Se déconnecter »** (footer) termine la session.

## Détails techniques
- `auth.ts` — configuration Auth.js (provider Entra, `authorized` = utilisateur connecté).
- `app/api/auth/[...nextauth]/route.ts` — endpoints d'authentification.
- `middleware.ts` — protège toutes les routes hors `/api/auth` et assets.
