import Link from "next/link";
import { getNewsletters } from "@/lib/content";
import { SOURCE_INFO } from "@/lib/sources";

export const dynamic = "force-static";

export const metadata = {
  title: "À propos",
  description: "Ce qu'est le kiosque à journaux, et d'où vient ce qu'on y lit.",
};

export default function AProposPage() {
  const newsletters = getNewsletters();
  // Sources réellement présentes, de la mieux fournie à la moins fournie.
  const counts = new Map<string, number>();
  for (const n of newsletters) counts.set(n.source, (counts.get(n.source) ?? 0) + 1);
  const sources = Array.from(counts.entries()).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );

  return (
    <div className="max-w-3xl">
      <Link href="/" className="text-sm text-electrique hover:underline">
        ← Retour au kiosque
      </Link>

      <h1 className="mt-4 font-display text-2xl font-semibold tracking-[-0.01em] text-marine">
        À propos
      </h1>

      <div className="prose prose-slate mt-6 max-w-none prose-headings:font-title prose-a:text-electrique">
        <p>
          Le kiosque à journaux rassemble les <strong>newsletters produit</strong> suivies
          par la Tribe Produit, sous forme de <strong>digests</strong> : pour chaque
          édition, ce qui est dit, ce qui est nouveau, et un <em>verdict</em> — ce qu&apos;on
          en retient.
        </p>
        <p>
          Chaque digest est produit automatiquement à la réception de la newsletter, puis
          déposé sur SharePoint. Le site se resynchronise toutes les heures : ce que vous
          lisez ici reflète l&apos;état de la bibliothèque à la dernière synchro (indiquée
          en bas de page).
        </p>

        <h2>Comment lire une fiche</h2>
        <ul>
          <li>
            <strong>Le dossier</strong> — une source, ses éditions du mois sélectionné.
          </li>
          <li>
            <strong>Le verdict</strong> — la synthèse de l&apos;édition, visible dès la
            liste, pour trier sans ouvrir.
          </li>
          <li>
            <strong>L&apos;édition</strong> — le digest complet, en 5 sections.
          </li>
        </ul>

        <h2>Les sources</h2>
      </div>

      <ul className="mt-4 space-y-4">
        {sources.map(([source, count]) => {
          const info = SOURCE_INFO[source];
          return (
            <li key={source} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-title text-base font-semibold text-marine">
                {info?.name ?? source}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  {count} édition{count > 1 ? "s" : ""}
                </span>
              </h3>
              {info?.description && (
                <p className="mt-2 text-sm text-gray-600">{info.description}</p>
              )}
            </li>
          );
        })}
      </ul>

      <div className="prose prose-slate mt-8 max-w-none prose-headings:font-title prose-a:text-electrique">
        <h2>Droits et attribution</h2>
        <p>
          Les fiches publiées ici sont des <strong>digests</strong> — des synthèses
          rédigées à partir des newsletters citées, et non leur reproduction. Les
          contenus d&apos;origine restent la propriété de leurs auteurs, dont le nom est
          indiqué sur chaque fiche. Pour lire une édition dans son intégralité, il faut
          s&apos;abonner directement à la newsletter concernée.
        </p>
        <p>
          Une source souhaite un retrait ou une correction ? Le nécessaire sera fait à
          réception de la demande.
        </p>
      </div>
    </div>
  );
}
