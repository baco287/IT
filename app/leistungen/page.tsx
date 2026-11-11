import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ServiceGrid } from "@/components/Services";
import Cta from "@/components/Cta";
import { SectionHead, btnPrimary, container } from "@/components/ui";
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
      <main>
        <PageHeader
          eyebrow="Leistungen"
          title="Digitalisieren, automatisieren, wachsen – aus einer Hand."
          intro="Von der Website über Marketing und Vertrieb bis zur technischen Infrastruktur: Wählen Sie einen Bereich und erfahren Sie, was wir konkret für Sie übernehmen."
          crumbs={[{ label: "Leistungen" }]}
        />

        <section className="bg-white py-20 lg:py-24" aria-labelledby="kern-heading">
          <div className={container}>
            <SectionHead
              eyebrow="Kernleistungen"
              title={<span id="kern-heading">Digitalisierung und Automatisierung.</span>}
              text="Die fünf Bereiche, mit denen wir Routinearbeit reduzieren und Ihr Wachstum unterstützen."
            />
            <div className="mt-10">
              <ServiceGrid group="kern">
                <div className="flex h-full flex-col rounded-2xl bg-ink p-6">
                  <h3 className="text-[1.2rem] font-bold leading-snug text-white">
                    Noch unsicher, womit Sie anfangen sollen?
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-white/75">
                    Im kostenlosen Potenzialgespräch finden wir gemeinsam heraus, wo
                    Automatisierung bei Ihnen am meisten bringt.
                  </p>
                  <Link href="/kontakt" className={`${btnPrimary} mt-5 self-start`}>
                    {CTA_LABEL}
                    <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
                  </Link>
                </div>
              </ServiceGrid>
            </div>
          </div>
        </section>

        <section className="bg-soft py-20 lg:py-24" aria-labelledby="erg-heading">
          <div className={container}>
            <SectionHead
              eyebrow="Ergänzende Leistungen"
              title={<span id="erg-heading">Passende Bausteine für Marketing und Auswertung.</span>}
              text="Einzeln buchbar oder als Teil eines automatisierten Gesamtablaufs."
            />
            <div className="mt-10">
              <ServiceGrid group="ergaenzend" columns={4} />
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-24" aria-labelledby="it-heading">
          <div className={container}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHead
                eyebrow="IT & Infrastruktur"
                title={<span id="it-heading">Das technische Fundament.</span>}
                text="Automatisierung braucht eine stabile Grundlage. Auf Wunsch betreuen wir deshalb auch Ihre IT – als ergänzendes Angebot."
              />
              <Link
                href="/loesungen"
                className="inline-flex min-h-11 flex-none items-center gap-2 text-[15px] font-semibold text-ink hover:text-teal-text"
              >
                IT & Infrastruktur im Überblick
                <ArrowRight size={17} strokeWidth={2.2} className="text-teal-dark" aria-hidden />
              </Link>
            </div>
            <div className="mt-10">
              <ServiceGrid group="it" />
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
