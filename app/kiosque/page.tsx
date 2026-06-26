import Kiosque from "@/components/Kiosque";
import { getNewsletters } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Le kiosque à journaux — Observatoire des Expertises",
};

export default function KiosquePage() {
  const newsletters = getNewsletters();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-title text-2xl font-bold text-marine">
          🗞️ Le kiosque à journaux
        </h1>
        <p className="mt-2 text-gray-600">
          Les newsletters pré-digérées, filtrables par mois.
        </p>
      </div>

      {newsletters.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune newsletter pour le moment.
        </div>
      ) : (
        <Kiosque newsletters={newsletters} />
      )}
    </div>
  );
}
