import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import OfferRows from "@/components/OfferRows";
import Cta from "@/components/Cta";
import { btnSignalLg, container, textLink } from "@/components/ui";
import { LOESUNGEN } from "@/lib/offers";
import { CTA_LABEL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Lösungen: KI-Chatbots, Telefon-KI, CRM und mehr",
  description:
    "Lösungen für typische Aufgaben im Unternehmen: KI-Chatbots, Telefon-KI, CRM-Automatisierung, Termin- und Buchungssysteme sowie individuelle Business-Tools.",
  path: "/loesungen/",
});

export default function LoesungenPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Lösungen für wiederkehrende Aufgaben im Unternehmen"
          intro="Kundenanfragen beantworten, Anrufe annehmen, Termine vergeben, Anfragen nachverfolgen, Daten zusammenführen: Für diese Aufgaben entwickeln wir Lösungen, die mit Ihren bestehenden Systemen zusammenarbeiten."
          crumbs={[{ label: "Lösungen" }]}
        >
          <div className="mt-9">
            <Link href="/kontakt" className={btnSignalLg}>
              {CTA_LABEL}
            </Link>
          </div>
        </PageHeader>

        <section aria-label="Unsere Lösungen" className="bg-white">
          <div className={`${container} py-16 lg:py-24`}>
            <OfferRows offers={LOESUNGEN} linkLabel="Zur Lösung" />
            <p className="mt-10 max-w-[44rem] text-[16.5px] leading-relaxed text-muted">
              Wie Online-Buchung und ein KI-Assistent im Alltag aussehen, zeigt unsere{" "}
              <Link href="/demo" className={textLink}>
                Buchungs-Demo
              </Link>{" "}
              mit zwei erfundenen Betrieben aus Gastronomie und Kfz-Service.
            </p>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
