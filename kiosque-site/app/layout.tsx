import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import SyncFreshness from "@/components/SyncFreshness";
import { getLastSync } from "@/lib/content";
import "./globals.css";

// Inter variable : police de travail (corps, titres de cartes, UI).
const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", style: "normal", weight: "100 900" },
    { path: "./fonts/InterVariable-Italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// Publica : accent de marque, réservé aux moments d'affichage (wordmark, accroche).
const publica = localFont({
  src: "./fonts/Publica.otf",
  variable: "--font-publica",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Le kiosque à journaux",
    template: "%s — Le kiosque à journaux",
  },
  description:
    "Les newsletters produit pré-digérées : ce qui se dit, ce qu'on en retient.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lastSync = getLastSync();
  return (
    <html lang="fr" className={`${inter.variable} ${publica.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-3xl">🗞️</span>
              <span className="font-display text-xl font-bold text-marine sm:text-2xl">
                Le kiosque à journaux
              </span>
            </Link>
            <Link
              href="/a-propos"
              className="text-sm font-medium text-gray-500 hover:text-electrique"
            >
              À propos
            </Link>
          </div>
        </header>

        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">{children}</main>

        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm text-gray-500">
            <SyncFreshness syncedAt={lastSync} />
            <Link href="/a-propos" className="hover:text-electrique">
              À propos &amp; sources
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
