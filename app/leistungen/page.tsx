import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ServiceList } from "@/components/Services";
import Cta from "@/components/Cta";
import { SplitSection, btnPrimary, textLink } from "@/components/ui";
import { CTA_LABEL } from "@/lib/company";

export const metadata: Metadata = {
  title: "Leistungen | QonteX – Automatisierung, Webseiten, SEO, Marketing & CRM",
  description:
    "Alle Leistungen von QonteX: Prozessautomatisierung, Webseiten & Landingpages, SEO & KI-Agenten, Marketing-Automatisierung, CRM & Vertrieb – ergänzt um IT-Betreuung und Infrastruktur.",
  alternates: { canonical: "/leistungen/" },
};

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Digitalisieren, automatisieren, wachsen – aus einer Hand."
          intro="Von der Website über Marketing und Vertrieb bis zur technischen Infrastruktur: Wählen Sie einen Bereich und erfahren Sie, was wir konkret für Sie übernehmen."
          crumbs={[{ label: "Leistungen" }]}
          aside={
            <>
              <h2 className="text-[1.9rem] leading-[1.1] sm:text-[2.2rem]">
                Noch unsicher, womit Sie anfangen sollen?
              </h2>
              <p className="mt-4 text-[17px] leading-relaxed">
                Im kostenlosen Potenzialgespräch finden wir gemeinsam heraus, wo Automatisierung
                bei Ihnen am meisten bringt.
              </p>
              <Link href="/kontakt" className={`${btnPrimary} mt-7`}>
                {CTA_LABEL}
              </Link>
            </>
          }
        />

        <SplitSection
          headingId="kern-heading"
          title="Digitalisierung und Automatisierung."
          text="Die fünf Bereiche, mit denen wir Routinearbeit reduzieren und Ihr Wachstum unterstützen."
          rule={false}
        >
          <ServiceList group="kern" />
        </SplitSection>

        <SplitSection
          headingId="erg-heading"
          title="Passende Bausteine für Marketing und Auswertung."
          text="Einzeln buchbar oder als Teil eines automatisierten Gesamtablaufs."
        >
          <ServiceList group="ergaenzend" />
        </SplitSection>

        <SplitSection
          headingId="it-heading"
          title="Das technische Fundament."
          text="Automatisierung braucht eine stabile Grundlage. Auf Wunsch betreuen wir deshalb auch Ihre IT – als ergänzendes Angebot."
          extra={
            <Link href="/loesungen" className={`inline-flex min-h-11 items-center text-[15px] ${textLink} hover:decoration-ink`}>
              IT & Infrastruktur im Überblick
            </Link>
          }
        >
          <ServiceList group="it" />
        </SplitSection>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
