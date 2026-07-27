import Link from "next/link";
import Kiosque from "@/components/Kiosque";
import { getNewsletters } from "@/lib/content";

export const dynamic = "force-static";

export default function HomePage() {
  const newsletters = getNewsletters();

  return (
    <div>
      {/* Le wordmark de l'en-tête porte déjà le nom du site : le titre de page
          reste accessible aux lecteurs d'écran sans être affiché deux fois. */}
      <h1 className="sr-only">Le kiosque à journaux</h1>
      <div className="mb-8">
        <p className="font-display text-2xl font-semibold tracking-[-0.01em] text-marine">
          Ce qui se dit. Ce qu&apos;on en retient.
        </p>
        <p className="mt-2 text-gray-600">
          Chaque fiche résume une édition et se termine par un verdict.{" "}
          <Link href="/a-propos" className="text-electrique hover:underline">
            En savoir plus
          </Link>
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
