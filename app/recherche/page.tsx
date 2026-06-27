import Search from "@/components/Search";
import { getSearchIndex } from "@/lib/content";

export const dynamic = "force-static";

export const metadata = {
  title: "Recherche — Observatoire des Expertises",
};

export default function RecherchePage() {
  const items = getSearchIndex();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-title text-2xl font-bold text-marine">🔎 Recherche</h1>
        <p className="mt-2 text-gray-600">
          Cherchez dans l'ensemble des contenus de l'Observatoire.
        </p>
      </div>
      <Search items={items} />
    </div>
  );
}
