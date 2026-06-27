# Suivi d'usage (analytics maison)

Le portail journalise les **pages vues** et les **clics** dans une base
PostgreSQL, en associant chaque événement à l'**email SSO** de l'utilisateur
(côté serveur, non falsifiable). Un tableau de bord est disponible sur
**`/admin/stats`** (réservé aux administrateurs).

## Ce qui est mesuré

- **Visiteurs uniques** et **pages vues** (total, par jour sur 30 jours, par mois)
- **Actifs récents** : DAU (jour), WAU (7 j), MAU (30 j)
- **Parcours d'usage** (funnel) : connexion → visite d'une rubrique → action
- **Événements nommés** : `download`, `filter`, `digest_expand`, `source_open`, `pageview`, `click`
- **Clics par élément** (autocapture) + nombre de personnes distinctes
- **Pages/sections les plus vues**
- **Activité par personne** (volume d'événements, dernière activité)
- **Export CSV** (bouton sur `/admin/stats`, réservé admin)

## Rétention (RGPD)

Un **cron quotidien** (`vercel.json` → `/api/cron/purge`, 03:00 UTC) supprime les
événements plus vieux que `RETENTION_MONTHS` (défaut **12 mois**).

| Variable | Rôle |
|---|---|
| `RETENTION_MONTHS` | ancienneté max des événements (défaut 12) |
| `CRON_SECRET` | protège l'endpoint de purge ; Vercel l'envoie automatiquement en `Authorization: Bearer …` quand il est défini |

> Définir `CRON_SECRET` dans les variables Vercel (valeur aléatoire) pour que la
> purge ne soit déclenchable que par le cron.

## Mise en place

### 1. Créer la base de données (Vercel)
Vercel → projet → onglet **Storage** → **Create Database** → **Postgres (Neon)**
→ connecter au projet. Vercel injecte automatiquement `DATABASE_URL`
(et variantes). La table `events` est créée automatiquement au premier événement.

### 2. Variables d'environnement
| Variable | Rôle |
|---|---|
| `DATABASE_URL` | Connexion Postgres (injectée par l'intégration Vercel) |
| `ADMIN_EMAILS` | Emails autorisés à voir `/admin/stats` (séparés par des virgules) |

> Si `DATABASE_URL` est absente, le site fonctionne normalement mais ne journalise
> rien et `/admin/stats` affiche un message de configuration.

### 3. Déployer
Redéployer après ajout des variables. C'est tout.

## Schéma

```sql
create table events (
  id bigserial primary key,
  ts timestamptz not null default now(),
  user_email text,   -- email SSO (déterminé côté serveur)
  event text,        -- 'pageview' | 'click'
  target text,       -- libellé de l'élément cliqué
  path text          -- page concernée
);
```

## Confidentialité (RGPD / RH)

Le suivi est **nominatif** (email). C'est un suivi d'usage d'un outil interne ;
à mettre en place **en transparence** (information des collaborateurs, et accord
DPO/RH selon vos règles internes). Pour un compromis, on peut passer en
**pseudonyme** (hash de l'email) — me le demander.

## Détails techniques
- `lib/db.ts` — connexion, création de schéma, insertion, requêtes d'agrégation.
- `app/api/track/route.ts` — endpoint POST qui enregistre l'événement avec l'email de session.
- `components/Analytics.tsx` — traceur client (pages vues + clics délégués).
- `app/admin/stats/page.tsx` — tableau de bord (gardé par `ADMIN_EMAILS`).
