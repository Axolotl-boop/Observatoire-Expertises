import ExpertiseDigests from "@/components/ExpertiseDigests";
import { getExpertiseDigests } from "@/lib/content";

export const dynamic = "force-static";

export default async function HomePage() {
  const digests = await getExpertiseDigests();

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

      <ExpertiseDigests digests={digests} />
    </div>
  );
}
