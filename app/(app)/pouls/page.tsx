import Pouls from "@/components/Pouls";
import { getPadMonths } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Le pouls du marché — Observatoire des Expertises",
};

export default async function PoulsPage() {
  const months = await getPadMonths();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-[-0.01em] text-marine">
          🩺 Le pouls du marché
        </h1>
        <p className="mt-2 text-gray-600">
          La demande réelle, directement de notre pipe commercial.
        </p>
      </div>

      {months.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune note pour le moment.
        </div>
      ) : (
        <Pouls months={months} />
      )}
    </div>
  );
}
