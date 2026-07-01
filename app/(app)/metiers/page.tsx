import Metiers from "@/components/Metiers";
import { getEmploiQuarters } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Métiers & Compétences — Observatoire des Expertises",
};

export default async function MetiersPage() {
  const quarters = await getEmploiQuarters();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.01em] text-marine">
          💼 Métiers &amp; Compétences
        </h1>
        <p className="mt-2 text-gray-600">
          La structuration des métiers produit, relevée chaque trimestre.
        </p>
      </div>

      {quarters.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune veille-emploi trimestrielle pour le moment.
        </div>
      ) : (
        <Metiers quarters={quarters} />
      )}

      <p className="mt-8 text-sm italic text-gray-500">
        Sources : APEC, WTTJ, Baromètres SEYOS, TPC &amp; Noé
      </p>
    </div>
  );
}
