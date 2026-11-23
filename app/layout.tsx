import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { COMPANY, SITE_DESCRIPTION } from "@/lib/company";
import { OG_IMAGE } from "@/lib/seo";

/* Eine Schriftfamilie mit verstellbarer Breite: Fließtext normal, Überschriften und
   Wortmarke breiter. Wird beim Build lokal eingebunden, keine Verbindung zu Google. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a1220",
};

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: {
    default: "QonteX – IT-Lösungen und KI-Automatisierung für Unternehmen",
    template: "%s | QonteX",
  },
  description: SITE_DESCRIPTION,
  applicationName: "QonteX",
  formatDetection: { telephone: false },
  openGraph: {
    title: "QonteX – IT-Lösungen und KI-Automatisierung für Unternehmen",
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "de_DE",
    siteName: "QonteX",
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: { card: "summary_large_image" },
};

/* Strukturierte Daten – ausschließlich echte Unternehmensangaben */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${COMPANY.url}/#organization`,
  name: COMPANY.brand,
  url: `${COMPANY.url}/`,
  logo: `${COMPANY.url}/images/logo-mark.png`,
  description: SITE_DESCRIPTION,
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
  knowsAbout: [
    "Künstliche Intelligenz",
    "KI-Agenten",
    "Prozessautomatisierung",
    "Webentwicklung",
    "Softwareentwicklung",
    "Marketingautomatisierung",
  ],
  parentOrganization: { "@type": "Organization", name: COMPANY.legalName },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={archivo.variable}>
      <body>
        {/* Sprunglink für Tastatur- und Screenreader-Nutzer – erst bei Fokus sichtbar */}
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-signal focus:px-5 focus:py-3 focus:text-[15px] focus:font-semibold focus:text-night"
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
