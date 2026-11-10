import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Services from "@/components/Services";
import Cta from "@/components/Cta";
import { container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Leistungen | QonteX – IT-Betreuung, Cloud, IT-Sicherheit & KI-Agenten",
  description:
    "Alle Leistungen von QonteX im Überblick: IT-Betreuung, IT-Support, Cloud & Microsoft 365, IT-Sicherheit, Server & Netzwerke, Backup, KI-Agenten, Webseiten, Online-Marketing, Social Media und Dashboards.",
};

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Leistungen"
          title="Alles, was Ihre IT braucht – aus einer Hand."
          intro="Von der laufenden Betreuung über IT-Sicherheit bis zur Automatisierung: Wählen Sie einen Bereich und erfahren Sie, was wir konkret für Sie übernehmen."
          crumbs={[{ label: "Leistungen" }]}
        />
        <section className="bg-white py-16 lg:py-20">
          <div className={container}>
            <Services variant="all" />
          </div>
        </section>
        <Cta />
      </main>
      <Footer />
    </>
  );
}
