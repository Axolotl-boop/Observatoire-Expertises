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
          <div className="mx-auto max-w-5xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-xl">🔭</span>
                <span className="font-title font-semibold text-marine">
                  Observatoire des Expertises
                </span>
              </Link>
              <Link href="/kiosque" className="flex items-center gap-2">
                <span className="text-xl">🗞️</span>
                <span className="font-title font-semibold text-marine hover:text-electrique">
                  Le kiosque à journaux
                </span>
              </Link>
              <Link href="/pouls" className="flex items-center gap-2">
                <span className="text-xl">🩺</span>
                <span className="font-title font-semibold text-marine hover:text-electrique">
                  Le pouls du marché
                </span>
              </Link>
              <Link href="/concurrence" className="flex items-center gap-2">
                <span className="text-xl">💥</span>
                <span className="font-title font-semibold text-marine hover:text-electrique">
                  Concurrence
                </span>
              </Link>
              <Link href="/metiers" className="flex items-center gap-2">
                <span className="text-xl">💼</span>
                <span className="font-title font-semibold text-marine hover:text-electrique">
                  Métiers &amp; Compétences
                </span>
              </Link>
            </nav>
            <a
              href="https://outlook.office.com/mail/deeplink/compose?to=axel.alizier@wefiit.com&subject=Feedback%20Observatoire%20des%20Expertises"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-orange px-4 py-2 text-sm font-medium text-white transition hover:bg-braise"
            >
              💌 Envoyez un feedback !
            </a>
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
