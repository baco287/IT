import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { ServiceList } from "@/components/Services";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Cloud from "@/components/Cloud";
import Cta from "@/components/Cta";
import { SplitSection } from "@/components/ui";

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
      <main id="inhalt">
        <PageHeader
          title="Das technische Fundament für Ihre digitalen Prozesse."
          intro="Automatisierung funktioniert nur auf einer stabilen Grundlage. Deshalb betreuen wir auf Wunsch auch Ihre IT: Systeme, Cloud, Sicherheit, Server und Backups – als ergänzendes Angebot aus einer Hand."
          crumbs={[{ href: "/leistungen", label: "Leistungen" }, { label: "IT & Infrastruktur" }]}
        />

        <SplitSection
          headingId="it-services-heading"
          title="Sechs Bereiche, ein Ansprechpartner."
          text="Jede Leistung ist einzeln buchbar – oder als laufende Betreuung Ihrer gesamten IT."
          rule={false}
        >
          <ServiceList group="it" />
        </SplitSection>

        <Infrastructure />
        <Security />
        <Cloud />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
