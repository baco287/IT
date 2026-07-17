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
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0a1220"/><text x="32" y="43" font-family="Segoe UI, sans-serif" font-size="30" font-weight="700" text-anchor="middle" fill="#2dd4ea">QX</text></svg>`
          ),
        type: "image/svg+xml",
      },
    ],
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
