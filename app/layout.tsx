import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Analytics from "@/components/Analytics";
import FeedbackButton from "@/components/FeedbackButton";
import SignOutButton from "@/components/SignOutButton";
import SubscribeButton from "@/components/SubscribeButton";
import SyncFreshness from "@/components/SyncFreshness";
import { getLastSync } from "@/lib/content";
import "./globals.css";

const geomanist = localFont({
  src: "./fonts/GeomanistBook.ttf",
  variable: "--font-geomanist",
  display: "swap",
});

const publica = localFont({
  src: "./fonts/Publica.otf",
  variable: "--font-publica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Observatoire des Expertises",
  description:
    "Portail interne recensant les données traitées par les agents IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lastSync = getLastSync();
  return (
    <html lang="fr" className={`${geomanist.variable} ${publica.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <header className="border-b border-gray-200 bg-white">
          {/* Marque principale + feedback */}
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-3xl">🔭</span>
              <span className="font-title text-xl font-bold text-marine sm:text-2xl">
                Observatoire des Expertises
              </span>
            </Link>
            <FeedbackButton />
          </div>
          {/* Sous-navigation */}
          <nav className="border-t border-gray-100 bg-glace/60">
            <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-1 px-4 py-2 text-sm">
              <Link
                href="/kiosque"
                className="font-title font-medium text-gray-600 transition hover:text-electrique"
              >
                🗞️ Le kiosque à journaux
              </Link>
              <Link
                href="/pouls"
                className="font-title font-medium text-gray-600 transition hover:text-electrique"
              >
                🩺 Le pouls du marché
              </Link>
              <Link
                href="/concurrence"
                className="font-title font-medium text-gray-600 transition hover:text-electrique"
              >
                💥 Concurrence
              </Link>
              <Link
                href="/metiers"
                className="font-title font-medium text-gray-600 transition hover:text-electrique"
              >
                💼 Métiers &amp; Compétences
              </Link>
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
              <SubscribeButton />
              <Link href="/admin/stats" className="text-gray-500 hover:text-electrique">
                Statistiques
              </Link>
              <SignOutButton />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
