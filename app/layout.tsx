import type { Metadata } from "next";
import localFont from "next/font/local";
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
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
