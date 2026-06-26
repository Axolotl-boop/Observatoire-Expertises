import Catalog from "@/components/Catalog";
import ExpertiseDigests from "@/components/ExpertiseDigests";
import { getAllEntries, getExpertiseDigests } from "@/lib/content";

export const dynamic = "force-static";

export default async function HomePage() {
  const entries = getAllEntries();
  const digests = await getExpertiseDigests();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-title text-2xl font-bold text-marine">
          Observatoire des Expertises
        </h1>
        <p className="mt-2 text-gray-600">
          Digests par expertise et catalogue des données traitées par les agents IA.
        </p>
      </div>

      <ExpertiseDigests digests={digests} />

      <div className="mb-6 border-t border-gray-200 pt-8">
        <h2 className="font-title text-xl font-bold text-marine">Catalogue complet</h2>
        <p className="mt-1 text-gray-600">
          Recherchez et explorez tous les contenus synchronisés depuis SharePoint.
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
