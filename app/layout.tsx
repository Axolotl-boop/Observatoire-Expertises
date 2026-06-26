import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
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
  return (
    <html lang="fr" className={`${geomanist.variable} ${publica.variable}`}>
      <body className="min-h-screen flex flex-col">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl">🔭</span>
              <span className="font-title font-semibold text-marine">
                Observatoire des Expertises
              </span>
            </Link>
            <span className="text-sm text-gray-500">Données &amp; agents IA</span>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 text-sm text-gray-500">
            Contenu synchronisé automatiquement depuis SharePoint.
          </div>
        </footer>
      </body>
    </html>
  );
}
