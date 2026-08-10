import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://qontex.de"),
  title: "QonteX – IT-Dienstleistungen für Unternehmen | Managed IT, Cloud, Cybersecurity & KI-Agenten",
  description:
    "QonteX entwickelt sichere, leistungsfähige und zuverlässige IT-Lösungen für kleine und mittelständische Unternehmen – Managed IT, Cloud, Cybersecurity, KI-Agenten und persönlicher Support aus einer Hand.",
  openGraph: {
    title: "QonteX – IT, die Ihr Unternehmen voranbringt",
    description:
      "Managed IT Services, Cloud-Lösungen und Cybersecurity für den Mittelstand – persönlich betreut, transparent und zuverlässig.",
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
      className={`${inter.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
