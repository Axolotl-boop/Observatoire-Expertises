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

export interface Stats {
  totalPageviews: number;
  uniqueVisitors: number;
  visitorsByDay: { d: string; visitors: number; views: number }[];
  visitorsByMonth: { m: string; visitors: number; views: number }[];
  topClicks: { target: string; clicks: number; users: number }[];
  topPaths: { path: string; views: number }[];
  byUser: { user_email: string; events: number; lastSeen: string }[];
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
  };
}
