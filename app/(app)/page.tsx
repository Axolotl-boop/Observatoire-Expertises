import ExpertiseDigests from "@/components/ExpertiseDigests";
import { getExpertiseDigests } from "@/lib/content";

export const dynamic = "force-static";

export default async function HomePage() {
  const digests = await getExpertiseDigests();

  return (
    <div>
      <div className="mb-8">
        <h1 className="sr-only">Observatoire des Expertises</h1>
        <p className="font-display text-2xl font-semibold tracking-[-0.01em] text-marine">
          Là où le discours du marché rencontre nos données.
        </p>
      </div>

      <ExpertiseDigests digests={digests} />
    </div>
  );
}
