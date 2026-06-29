import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Inter variable : police de travail (corps, titres de cartes, UI).
// Vraies graisses 100–900 → plus de faux-gras synthétique sur les titres,
// dessin optimisé écran pour les contenus denses.
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
    <html lang="fr" className={`${inter.variable} ${publica.variable}`}>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
