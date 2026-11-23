import type { Metadata } from "next";

/** Vorschaubild für geteilte Links (1200×630). Vorlage: docs/og-bild-vorlage.html */
export const OG_IMAGE = {
  url: "/images/og-qontex.png",
  width: 1200,
  height: 630,
  alt: "QonteX – IT-Lösungen und KI-Automatisierung für Unternehmen",
};

/**
 * Metadaten einer Seite inkl. Open Graph. Ohne eigenes `openGraph` würde jede Unterseite
 * Titel und Adresse der Startseite erben (geteilte Links zeigten dann die Startseite).
 */
export function pageMeta({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  /** mit Schrägstrich am Ende, z. B. "/kontakt/" */
  path: string;
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: `${title} | QonteX`,
      description,
      url: path,
      siteName: "QonteX",
      locale: "de_DE",
      type: "website",
      images: [OG_IMAGE],
    },
  };
}
