import Concurrence from "@/components/Concurrence";
import { getConcurrenceQuarters } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Concurrence — Observatoire des Expertises",
};

export default async function ConcurrencePage() {
  const quarters = await getConcurrenceQuarters();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.01em] text-marine">
          💥 Concurrence
        </h1>
        <p className="mt-2 text-gray-600">
          Ce que font les autres cabinets, suivi en continu.
        </p>
      </div>

      {quarters.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune veille concurrentielle trimestrielle pour le moment.
        </div>
      ) : (
        <Concurrence quarters={quarters} />
      )}

      <p className="mt-8 text-sm italic text-gray-500">
        Sources : Thiga, Hubvisory, Wivoo, Yield Advisory, Qestit, KP2i, Smartesting,
        Hymaïa, Converteo, Artefact, Ai Builders, Eleven Labs
      </p>
    </div>
  );
}
