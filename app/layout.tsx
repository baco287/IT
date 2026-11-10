import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qontex.de"),
  title: "QonteX – Ein Ansprechpartner für Ihre gesamte IT | IT-Betreuung, Cloud, IT-Sicherheit & KI",
  description:
    "QonteX betreut die IT von Unternehmen: IT-Betreuung, Cloud & Microsoft 365, IT-Sicherheit und KI-Agenten – persönlich, zuverlässig und aus einer Hand. Jetzt kostenloses Erstgespräch vereinbaren.",
  openGraph: {
    title: "QonteX – Ein Ansprechpartner für Ihre gesamte IT",
    description:
      "Wir betreuen Ihre Systeme, schützen Ihre Daten und automatisieren wiederkehrende Aufgaben. Persönlich, zuverlässig und aus einer Hand.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
