import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "QonteX – IT-Dienstleistungen für Unternehmen | Managed IT, Cloud & Cybersecurity",
  description:
    "QonteX entwickelt sichere, leistungsfähige und zuverlässige IT-Lösungen für kleine und mittelständische Unternehmen – Managed IT, Cloud, Cybersecurity und persönlicher Support aus einer Hand.",
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
    <html lang="de" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">{children}</body>
    </html>
  );
}
