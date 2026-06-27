import { auth } from "@/auth";
import { dbEnabled, getStats } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Statistiques — Observatoire des Expertises",
};

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "axel.alizier@wefiit.com")
  .split(",")
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

function Bar({ value, max, color = "#0042ff" }: { value: number; max: number; color?: string }) {
  return (
    <div className="h-4 w-full overflow-hidden rounded bg-glace">
      <div
        className="h-full rounded"
        style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default async function StatsPage() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();

  if (!email || !ADMIN_EMAILS.includes(email)) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
        Accès réservé aux administrateurs.
      </div>
    );
  }

  if (!dbEnabled) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-gray-600">
        La base de données n'est pas configurée (variable <code>DATABASE_URL</code> manquante).
        Voir <code>ANALYTICS.md</code>.
      </div>
    );
  }

  const stats = await getStats();
  if (!stats) {
    return <div className="text-gray-500">Aucune donnée pour le moment.</div>;
  }

  const maxDay = Math.max(...stats.visitorsByDay.map((d) => d.views), 1);
  const maxClick = Math.max(...stats.topClicks.map((c) => c.clicks), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-title text-2xl font-bold text-marine">📊 Statistiques d'usage</h1>
        <p className="mt-2 text-gray-600">Monitoring de l'utilisation du portail.</p>
      </div>

      {/* Cartes synthèse */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Visiteurs uniques (total)</div>
          <div className="font-title text-3xl font-bold text-marine">{stats.uniqueVisitors}</div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-gray-500">Pages vues (total)</div>
          <div className="font-title text-3xl font-bold text-marine">{stats.totalPageviews}</div>
        </div>
      </div>

      {/* Visiteurs par jour */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-title text-lg font-bold text-marine">
          Visiteurs par jour (30 derniers jours)
        </h2>
        {stats.visitorsByDay.length === 0 ? (
          <p className="text-sm text-gray-400">Aucune donnée.</p>
        ) : (
          <div className="space-y-1.5">
            {stats.visitorsByDay.map((d) => (
              <div key={d.d} className="flex items-center gap-3 text-sm">
                <span className="w-24 shrink-0 text-gray-500">{d.d}</span>
                <Bar value={d.views} max={maxDay} />
                <span className="w-28 shrink-0 text-right text-gray-600">
                  {d.visitors} visiteur{d.visitors > 1 ? "s" : ""} · {d.views} vues
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Visiteurs par mois */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-title text-lg font-bold text-marine">Par mois</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-500">
              <th className="py-2">Mois</th>
              <th className="py-2">Visiteurs</th>
              <th className="py-2">Pages vues</th>
            </tr>
          </thead>
          <tbody>
            {stats.visitorsByMonth.map((m) => (
              <tr key={m.m} className="border-b border-gray-100">
                <td className="py-2 text-gray-800">{m.m}</td>
                <td className="py-2 text-gray-600">{m.visitors}</td>
                <td className="py-2 text-gray-600">{m.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Clics par élément */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-title text-lg font-bold text-marine">Clics par élément</h2>
        {stats.topClicks.length === 0 ? (
          <p className="text-sm text-gray-400">Aucun clic enregistré.</p>
        ) : (
          <div className="space-y-1.5">
            {stats.topClicks.map((c) => (
              <div key={c.target} className="flex items-center gap-3 text-sm">
                <span className="w-64 shrink-0 truncate text-gray-700" title={c.target}>
                  {c.target}
                </span>
                <Bar value={c.clicks} max={maxClick} color="#6abfa3" />
                <span className="w-28 shrink-0 text-right text-gray-600">
                  {c.clicks} clic{c.clicks > 1 ? "s" : ""} · {c.users} pers.
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pages les plus vues */}
      <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-title text-lg font-bold text-marine">Pages les plus vues</h2>
        <table className="w-full text-sm">
          <tbody>
            {stats.topPaths.map((p) => (
              <tr key={p.path} className="border-b border-gray-100">
                <td className="py-2 text-gray-700">{p.path}</td>
                <td className="py-2 text-right text-gray-600">{p.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Activité par personne */}
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 font-title text-lg font-bold text-marine">Activité par personne</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs uppercase text-gray-500">
              <th className="py-2">Utilisateur</th>
              <th className="py-2">Événements</th>
              <th className="py-2">Dernière activité</th>
            </tr>
          </thead>
          <tbody>
            {stats.byUser.map((u) => (
              <tr key={u.user_email} className="border-b border-gray-100">
                <td className="py-2 text-gray-800">{u.user_email}</td>
                <td className="py-2 text-gray-600">{u.events}</td>
                <td className="py-2 text-gray-500">{u.lastSeen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
