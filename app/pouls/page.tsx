import Pouls from "@/components/Pouls";
import { getPadNotes } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Le pouls du marché — Observatoire des Expertises",
};

export default function PoulsPage() {
  const notes = getPadNotes();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-title text-2xl font-bold text-marine">
          🩺 Le pouls du marché
        </h1>
        <p className="mt-2 text-gray-600">
          La demande réelle, dérivée du pipe commercial (Notes PAD retraitées).
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune note pour le moment.
        </div>
      ) : (
        <Pouls notes={notes} />
      )}
    </div>
  );
}
