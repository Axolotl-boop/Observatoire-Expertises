import Catalog from "@/components/Catalog";
import { getAllEntries } from "@/lib/content";

export const dynamic = "force-static";

export default function HomePage() {
  const entries = getAllEntries();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Catalogue des données traitées par les agents IA
        </h1>
        <p className="mt-2 text-gray-600">
          Recherchez et explorez les contenus synchronisés depuis SharePoint.
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          Aucune entrée pour le moment. Les fichiers Markdown synchronisés depuis
          SharePoint apparaîtront ici.
        </div>
      ) : (
        <Catalog entries={entries} />
      )}
    </div>
  );
}
