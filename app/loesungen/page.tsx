import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ServiceGrid } from "@/components/Services";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Cloud from "@/components/Cloud";
import Cta from "@/components/Cta";
import { SectionHead, container } from "@/components/ui";

export const metadata: Metadata = {
  title: "IT & Infrastruktur | QonteX – IT-Betreuung, Cloud, IT-Sicherheit & Backup",
  description:
    "IT & Infrastruktur von QonteX: IT-Betreuung, IT-Support, Cloud & Microsoft 365, IT-Sicherheit, Server & Netzwerke und Backup – das technische Fundament für Ihre digitalen Prozesse.",
  alternates: { canonical: "/loesungen/" },
};

export default function LoesungenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="IT & Infrastruktur"
          title="Das technische Fundament für Ihre digitalen Prozesse."
          intro="Automatisierung funktioniert nur auf einer stabilen Grundlage. Deshalb betreuen wir auf Wunsch auch Ihre IT: Systeme, Cloud, Sicherheit, Server und Backups – als ergänzendes Angebot aus einer Hand."
          crumbs={[{ href: "/leistungen", label: "Leistungen" }, { label: "IT & Infrastruktur" }]}
        />

        <section className="bg-white py-20 lg:py-24" aria-labelledby="it-services-heading">
          <div className={container}>
            <SectionHead
              eyebrow="IT-Leistungen"
              title={<span id="it-services-heading">Sechs Bereiche, ein Ansprechpartner.</span>}
              text="Jede Leistung ist einzeln buchbar – oder als laufende Betreuung Ihrer gesamten IT."
            />
            <div className="mt-10">
              <ServiceGrid group="it" />
            </div>
          </div>
        </section>

        <Infrastructure />
        <Security />
        <Cloud />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
