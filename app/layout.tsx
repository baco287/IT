import type { Metadata } from "next";
import { Fira_Sans, Fira_Sans_Condensed, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/lib/company";

/* Schriften: Fira Sans (in Berlin entworfen, für Bildschirmtexte gebaut) für Fließtext,
   die schmale Fira Sans Condensed für Überschriften – lange deutsche Wörter passen so
   auch auf dem Handy in eine Zeile. Plus Jakarta Sans bleibt nur für die Wortmarke. */
const body = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-face",
  display: "swap",
});
const display = Fira_Sans_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display-face",
  display: "swap",
});
const wordmark = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-wordmark",
  display: "swap",
});

const DESCRIPTION =
  "QonteX digitalisiert Unternehmensprozesse, automatisiert Marketing und Vertrieb und erstellt Webseiten, die Anfragen bringen können. Kostenloses Potenzialgespräch.";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: "QonteX – Digitalisierung & KI-Automatisierung für Unternehmen",
  description: DESCRIPTION,
  openGraph: {
    title: "QonteX – Weniger Aufwand. Mehr Wachstum.",
    description:
      "Wir digitalisieren Ihre Unternehmensprozesse, automatisieren Marketing und Vertrieb und schaffen effiziente Abläufe, mit denen Ihr Unternehmen nachhaltig wachsen kann.",
    type: "website",
    locale: "de_DE",
    siteName: "QonteX",
    url: COMPANY.url,
  },
};

/* Strukturierte Daten – ausschließlich echte Unternehmensangaben */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${COMPANY.url}/#organization`,
  name: COMPANY.brand,
  url: `${COMPANY.url}/`,
  logo: `${COMPANY.url}/images/qontex-agent-head.png`,
  image: `${COMPANY.url}/images/qontex-agent-head.png`,
  description: DESCRIPTION,
  email: COMPANY.email,
  telephone: COMPANY.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    postalCode: COMPANY.zip,
    addressLocality: COMPANY.city,
    addressCountry: COMPANY.country,
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  parentOrganization: { "@type": "Organization", name: COMPANY.legalName },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${body.variable} ${display.variable} ${wordmark.variable}`}>
      <body>
        {/* Sprunglink für Tastatur- und Screenreader-Nutzer – erst bei Fokus sichtbar */}
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-white"
        >
          Zum Inhalt springen
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
