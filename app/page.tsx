import Link from "next/link";
import ExpertiseDigests from "@/components/ExpertiseDigests";
import { getExpertiseDigests, getWhatsNew } from "@/lib/content";

export const dynamic = "force-static";

function formatDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

export default async function HomePage() {
  const digests = await getExpertiseDigests();
  const whatsNew = getWhatsNew();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-title text-2xl font-bold text-marine">
          Observatoire des Expertises
        </h1>
        <p className="mt-2 text-gray-600">
          Là où le discours du marché rencontre nos données.
        </p>
      </div>

      {whatsNew.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 font-title text-lg font-bold text-marine">✨ Quoi de neuf</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {whatsNew.map((item) => (
              <Link
                key={item.rubric}
                href={item.href}
                className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:border-electrique hover:shadow-sm"
              >
                <span className="text-xl">{item.emoji}</span>
                <div className="min-w-0">
                  <div className="text-xs text-gray-500">
                    {item.rubric}
                    {item.date ? ` · ${formatDate(item.date)}` : ""}
                  </div>
                  <div className="truncate font-semibold text-gray-900" title={item.title}>
                    {item.title}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <ExpertiseDigests digests={digests} />
    </div>
  );
}
