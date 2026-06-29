import Link from "next/link";
import Analytics from "@/components/Analytics";
import FeedbackButton from "@/components/FeedbackButton";
import NavLink from "@/components/NavLink";
import SignOutButton from "@/components/SignOutButton";
import SubscribeButton from "@/components/SubscribeButton";
import SyncFreshness from "@/components/SyncFreshness";
import { getLastSync } from "@/lib/content";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lastSync = getLastSync();
  return (
    <>
      <Analytics />
      <header className="border-b border-gray-200 bg-white">
        {/* Marque principale + feedback */}
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-3xl">🔭</span>
            <span className="font-display text-xl font-bold text-marine sm:text-2xl">
              Observatoire des Expertises
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <SubscribeButton />
            <FeedbackButton />
          </div>
        </div>
        {/* Sous-navigation */}
        <nav className="border-t border-gray-100 bg-glace/60">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-1 px-4 py-2 text-sm">
            <NavLink href="/">🔭 L&apos;Observatoire</NavLink>
            <NavLink href="/kiosque">🗞️ Le kiosque à journaux</NavLink>
            <NavLink href="/pouls">🩺 Le pouls du marché</NavLink>
            <NavLink href="/concurrence">💥 Concurrence</NavLink>
            <NavLink href="/metiers">💼 Métiers &amp; Compétences</NavLink>
          </div>
        </nav>
      </header>
      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm text-gray-500">
          <SyncFreshness syncedAt={lastSync} />
          <div className="flex items-center gap-4">
            <Link href="/admin/stats" className="text-gray-500 hover:text-electrique">
              Statistiques
            </Link>
            <SignOutButton />
          </div>
        </div>
      </footer>
    </>
  );
}
