import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AutomationFlow from "@/components/AutomationFlow";
import MarketingTeam from "@/components/MarketingTeam";
import Savings from "@/components/Savings";
import Steps from "@/components/Steps";
import Cta from "@/components/Cta";
import { DefRows, LinkRows, SplitSection, btnPrimary, btnSecondary } from "@/components/ui";
import { CTA_LABEL } from "@/lib/company";

export const metadata: Metadata = {
  title: "Automatisierung für Unternehmen | QonteX – Prozesse, Marketing & Vertrieb",
  description:
    "Automatisierung von QonteX: Kundenanfragen, Angebote, Termine, CRM, Marketing und SEO – Schritt für Schritt automatisiert, nachvollziehbar und mit klaren Freigaben durch Ihr Team.",
  alternates: { canonical: "/automatisierung/" },
};

const AREAS: Array<{ title: string; text: string; href: string }> = [
  {
    title: "Kundenanfragen",
    text: "Eingehende Anfragen automatisch erfassen, einordnen und zeitnah beantworten.",
    href: "/leistungen/ki-agenten",
  },
  {
    title: "Angebote & Aufträge",
    text: "Anfrage- und Angebotsprozesse digital abbilden, statt Daten mehrfach abzutippen.",
    href: "/leistungen/prozessautomatisierung",
  },
  {
    title: "Termine",
    text: "Online-Terminbuchung mit Bestätigungen und Erinnerungen – ohne Telefonpingpong.",
    href: "/leistungen/prozessautomatisierung",
  },
  {
    title: "Vertrieb & CRM",
    text: "Anfragen strukturiert ins CRM übergeben und zuverlässig nachverfolgen.",
    href: "/leistungen/crm-vertrieb",
  },
  {
    title: "Marketing",
    text: "Inhalte, Kampagnen und Auswertungen von KI-Agenten vorbereiten lassen.",
    href: "/leistungen/marketing-automatisierung",
  },
  {
    title: "SEO",
    text: "Technische Prüfungen, Keyword-Recherche und Monitoring laufend im Blick behalten.",
    href: "/leistungen/seo-ki-agenten",
  },
];

const PRINCIPLES: Array<{ title: string; text: string }> = [
  {
    title: "Menschen behalten die Kontrolle",
    text: "Agenten bereiten vor, Menschen geben frei. Veröffentlichungen, Werbeaussendungen und Kampagnenstarts erfolgen nur mit Ihrer Freigabe.",
  },
  {
    title: "Datenschutz von Anfang an",
    text: "Formulare, CRM, Tracking und Marketing-Automatisierung setzen wir datensparsam und mit den erforderlichen Einwilligungen um.",
  },
  {
    title: "Schritt für Schritt",
    text: "Wir beginnen mit einem klar umrissenen Ablauf, testen ihn im Alltag und erweitern erst dann.",
  },
  {
    title: "Ehrliche Einschätzung",
    text: "Nicht alles lohnt sich zu automatisieren. Wir sagen Ihnen offen, wo der Aufwand den Nutzen übersteigt.",
  },
];

export default function AutomatisierungPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Automatisierung, die Ihrem Team Arbeit abnimmt."
          intro="Wir automatisieren die Abläufe, die Ihr Unternehmen täglich Zeit kosten – von der ersten Kundenanfrage bis zur Auswertung. Schritt für Schritt, nachvollziehbar und mit klaren Freigaben."
          crumbs={[{ label: "Automatisierung" }]}
        >
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kontakt" className={btnPrimary}>
              {CTA_LABEL}
            </Link>
            <Link href="#bereiche" className={btnSecondary}>
              Was sich automatisieren lässt
            </Link>
          </div>
        </PageHeader>

        {/* Bereiche */}
        <SplitSection
          id="bereiche"
          headingId="bereiche-heading"
          title="Was sich in Unternehmen automatisieren lässt."
          text="Typisch sind wiederkehrende Aufgaben mit klaren Regeln. Welche davon sich bei Ihnen lohnen, klären wir gemeinsam in der Analyse."
          rule={false}
        >
          <LinkRows items={AREAS} label="Zur Leistung" />
        </SplitSection>

        <AutomationFlow />
        <MarketingTeam />

        {/* Grundsätze */}
        <SplitSection
          headingId="grundsaetze-heading"
          title="Automatisierung mit Augenmaß."
          text="Technik soll Ihrem Unternehmen dienen – nicht umgekehrt. Diese vier Regeln gelten in jedem Projekt."
          rule={false}
        >
          <DefRows items={PRINCIPLES} />
        </SplitSection>

        <Savings rule />
        <Steps id="ablauf" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
