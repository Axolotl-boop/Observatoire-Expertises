import { neon } from "@neondatabase/serverless";

/**
 * Journalisation maison des événements d'usage dans Postgres (Neon/Vercel).
 * Variable d'environnement : DATABASE_URL (ou POSTGRES_URL).
 */
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
export const dbEnabled = Boolean(connectionString);

const sql = connectionString ? neon(connectionString) : null;

let ensured = false;
async function ensureSchema() {
  if (!sql || ensured) return;
  await sql`
    create table if not exists events (
      id bigserial primary key,
      ts timestamptz not null default now(),
      user_email text,
      event text not null,
      target text,
      path text
    )
  `;
  await sql`create index if not exists events_ts_idx on events (ts)`;
  await sql`create index if not exists events_event_idx on events (event)`;
  await sql`
    create table if not exists subscribers (
      email text primary key,
      subscribed_at timestamptz not null default now()
    )
  `;
  await sql`
    create table if not exists feedback (
      id bigserial primary key,
      ts timestamptz not null default now(),
      user_email text,
      message text not null,
      path text
    )
  `;
  ensured = true;
}

export interface TrackEvent {
  user_email?: string | null;
  event: string;
  target?: string | null;
  path?: string | null;
}

export async function logEvent(e: TrackEvent): Promise<void> {
  if (!sql) return;
  await ensureSchema();
  await sql`
    insert into events (user_email, event, target, path)
    values (${e.user_email ?? null}, ${e.event}, ${e.target ?? null}, ${e.path ?? null})
  `;
}

/** Tous les événements (pour export CSV). */
export async function exportEvents(): Promise<
  { ts: string; user_email: string | null; event: string; target: string | null; path: string | null }[]
> {
  if (!sql) return [];
  await ensureSchema();
  return (await sql`
    select to_char(ts, 'YYYY-MM-DD"T"HH24:MI:SS') as ts, user_email, event, target, path
    from events order by ts desc
  `) as {
    ts: string;
    user_email: string | null;
    event: string;
    target: string | null;
    path: string | null;
  }[];
}

/** Purge les événements plus vieux que N mois. Renvoie le nombre supprimé. */
export async function purgeOldEvents(months: number): Promise<number> {
  if (!sql) return 0;
  await ensureSchema();
  const rows = (await sql`
    with del as (
      delete from events where ts < now() - (${months} * interval '1 month') returning 1
    )
    select count(*)::int as n from del
  `) as { n: number }[];
  return rows[0]?.n ?? 0;
}

/** Abonne un email au récap mensuel (idempotent). */
export async function addSubscriber(email: string): Promise<void> {
  if (!sql) return;
  await ensureSchema();
  await sql`
    insert into subscribers (email) values (${email.toLowerCase()})
    on conflict (email) do nothing
  `;
}

/** Désabonne un email du récap mensuel. */
export async function removeSubscriber(email: string): Promise<void> {
  if (!sql) return;
  await ensureSchema();
  await sql`delete from subscribers where email = ${email.toLowerCase()}`;
}

/** Indique si un email est abonné. */
export async function isSubscribed(email: string): Promise<boolean> {
  if (!sql) return false;
  await ensureSchema();
  const rows = (await sql`
    select 1 from subscribers where email = ${email.toLowerCase()} limit 1
  `) as { "?column?": number }[];
  return rows.length > 0;
}

/** Enregistre un feedback laissé via le formulaire intégré. */
export async function addFeedback(
  message: string,
  email?: string | null,
  path?: string | null,
): Promise<void> {
  if (!sql) return;
  await ensureSchema();
  await sql`
    insert into feedback (user_email, message, path)
    values (${email ?? null}, ${message}, ${path ?? null})
  `;
}

/** Derniers feedbacks (pour le dashboard admin). */
export async function getFeedback(): Promise<
  { ts: string; user_email: string | null; message: string; path: string | null }[]
> {
  if (!sql) return [];
  await ensureSchema();
  return (await sql`
    select to_char(ts, 'YYYY-MM-DD HH24:MI') as ts, user_email, message, path
    from feedback order by ts desc limit 200
  `) as { ts: string; user_email: string | null; message: string; path: string | null }[];
}

/** Liste des emails abonnés (pour l'envoi du récap). */
export async function getSubscribers(): Promise<string[]> {
  if (!sql) return [];
  await ensureSchema();
  const rows = (await sql`select email from subscribers order by email`) as {
    email: string;
  }[];
  return rows.map((r) => r.email);
}

export interface Stats {
  totalPageviews: number;
  uniqueVisitors: number;
  visitorsByDay: { d: string; visitors: number; views: number }[];
  visitorsByMonth: { m: string; visitors: number; views: number }[];
  topClicks: { target: string; clicks: number; users: number }[];
  topPaths: { path: string; views: number }[];
  byUser: { user_email: string; events: number; lastSeen: string }[];
  topEvents: { event: string; count: number; users: number }[];
  dau: number;
  wau: number;
  mau: number;
  funnel: { connected: number; section: number; action: number };
}

export async function getStats(): Promise<Stats | null> {
  if (!sql) return null;
  await ensureSchema();

  const [totals] = (await sql`
    select
      count(*) filter (where event = 'pageview') as views,
      count(distinct user_email) as visitors
    from events
  `) as { views: number; visitors: number }[];

  const visitorsByDay = (await sql`
    select to_char(date_trunc('day', ts), 'YYYY-MM-DD') as d,
           count(distinct user_email) as visitors,
           count(*) filter (where event = 'pageview') as views
    from events
    where ts > now() - interval '30 days'
    group by 1 order by 1
  `) as { d: string; visitors: number; views: number }[];

  const visitorsByMonth = (await sql`
    select to_char(date_trunc('month', ts), 'YYYY-MM') as m,
           count(distinct user_email) as visitors,
           count(*) filter (where event = 'pageview') as views
    from events
    group by 1 order by 1 desc limit 12
  `) as { m: string; visitors: number; views: number }[];

  const topClicks = (await sql`
    select coalesce(target, '(sans libellé)') as target,
           count(*) as clicks,
           count(distinct user_email) as users
    from events where event = 'click'
    group by 1 order by clicks desc limit 30
  `) as { target: string; clicks: number; users: number }[];

  const topPaths = (await sql`
    select coalesce(path, '(inconnu)') as path, count(*) as views
    from events where event = 'pageview'
    group by 1 order by views desc limit 20
  `) as { path: string; views: number }[];

  const byUser = (await sql`
    select coalesce(user_email, '(anonyme)') as user_email,
           count(*) as events,
           to_char(max(ts), 'YYYY-MM-DD HH24:MI') as "lastSeen"
    from events
    group by 1 order by events desc limit 50
  `) as { user_email: string; events: number; lastSeen: string }[];

  const topEvents = (await sql`
    select event, count(*) as count, count(distinct user_email) as users
    from events group by 1 order by count desc
  `) as { event: string; count: number; users: number }[];

  const [active] = (await sql`
    select
      count(distinct user_email) filter (where ts > now() - interval '1 day') as dau,
      count(distinct user_email) filter (where ts > now() - interval '7 days') as wau,
      count(distinct user_email) filter (where ts > now() - interval '30 days') as mau
    from events
  `) as { dau: number; wau: number; mau: number }[];

  const [funnel] = (await sql`
    with u as (
      select user_email,
        bool_or(event = 'pageview') as connected,
        bool_or(path ~ '^/(kiosque|pouls|concurrence|metiers|entries)') as section,
        bool_or(event in ('download', 'filter', 'digest_expand', 'source_open')) as action
      from events
      where ts > now() - interval '30 days' and user_email is not null
      group by user_email
    )
    select
      count(*) filter (where connected) as connected,
      count(*) filter (where section) as section,
      count(*) filter (where action) as action
    from u
  `) as { connected: number; section: number; action: number }[];

  return {
    totalPageviews: Number(totals?.views ?? 0),
    uniqueVisitors: Number(totals?.visitors ?? 0),
    visitorsByDay: visitorsByDay.map((r) => ({
      d: r.d,
      visitors: Number(r.visitors),
      views: Number(r.views),
    })),
    visitorsByMonth: visitorsByMonth.map((r) => ({
      m: r.m,
      visitors: Number(r.visitors),
      views: Number(r.views),
    })),
    topClicks: topClicks.map((r) => ({
      target: r.target,
      clicks: Number(r.clicks),
      users: Number(r.users),
    })),
    topPaths: topPaths.map((r) => ({ path: r.path, views: Number(r.views) })),
    byUser: byUser.map((r) => ({
      user_email: r.user_email,
      events: Number(r.events),
      lastSeen: r.lastSeen,
    })),
    topEvents: topEvents.map((r) => ({
      event: r.event,
      count: Number(r.count),
      users: Number(r.users),
    })),
    dau: Number(active?.dau ?? 0),
    wau: Number(active?.wau ?? 0),
    mau: Number(active?.mau ?? 0),
    funnel: {
      connected: Number(funnel?.connected ?? 0),
      section: Number(funnel?.section ?? 0),
      action: Number(funnel?.action ?? 0),
    },
  };
}
