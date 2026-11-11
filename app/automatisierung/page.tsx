import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageSquareText,
  FileText,
  CalendarCheck,
  Handshake,
  Megaphone,
  Search,
  UserCheck,
  ShieldCheck,
  Footprints,
  Scale,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import AutomationFlow from "@/components/AutomationFlow";
import MarketingTeam from "@/components/MarketingTeam";
import Savings from "@/components/Savings";
import Steps from "@/components/Steps";
import Cta from "@/components/Cta";
import { IconTile, SectionHead, btnPrimary, btnSecondary, container } from "@/components/ui";
import { CTA_LABEL } from "@/lib/company";

export const metadata: Metadata = {
  title: "Automatisierung für Unternehmen | QonteX – Prozesse, Marketing & Vertrieb",
  description:
    "Automatisierung von QonteX: Kundenanfragen, Angebote, Termine, CRM, Marketing und SEO – Schritt für Schritt automatisiert, nachvollziehbar und mit klaren Freigaben durch Ihr Team.",
  alternates: { canonical: "/automatisierung/" },
};

const AREAS: Array<{ icon: LucideIcon; title: string; text: string; href: string }> = [
  {
    icon: MessageSquareText,
    title: "Kundenanfragen",
    text: "Eingehende Anfragen automatisch erfassen, einordnen und zeitnah beantworten.",
    href: "/leistungen/ki-agenten",
  },
  {
    icon: FileText,
    title: "Angebote & Aufträge",
    text: "Anfrage- und Angebotsprozesse digital abbilden, statt Daten mehrfach abzutippen.",
    href: "/leistungen/prozessautomatisierung",
  },
  {
    icon: CalendarCheck,
    title: "Termine",
    text: "Online-Terminbuchung mit Bestätigungen und Erinnerungen – ohne Telefonpingpong.",
    href: "/leistungen/prozessautomatisierung",
  },
  {
    icon: Handshake,
    title: "Vertrieb & CRM",
    text: "Anfragen strukturiert ins CRM übergeben und zuverlässig nachverfolgen.",
    href: "/leistungen/crm-vertrieb",
  },
  {
    icon: Megaphone,
    title: "Marketing",
    text: "Inhalte, Kampagnen und Auswertungen von KI-Agenten vorbereiten lassen.",
    href: "/leistungen/marketing-automatisierung",
  },
  {
    icon: Search,
    title: "SEO",
    text: "Technische Prüfungen, Keyword-Recherche und Monitoring laufend im Blick behalten.",
    href: "/leistungen/seo-ki-agenten",
  },
];

const PRINCIPLES: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: UserCheck,
    title: "Menschen behalten die Kontrolle",
    text: "Agenten bereiten vor, Menschen geben frei. Veröffentlichungen, Werbeaussendungen und Kampagnenstarts erfolgen nur mit Ihrer Freigabe.",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutz von Anfang an",
    text: "Formulare, CRM, Tracking und Marketing-Automatisierung setzen wir datensparsam und mit den erforderlichen Einwilligungen um.",
  },
  {
    icon: Footprints,
    title: "Schritt für Schritt",
    text: "Wir beginnen mit einem klar umrissenen Ablauf, testen ihn im Alltag und erweitern erst dann.",
  },
  {
    icon: Scale,
    title: "Ehrliche Einschätzung",
    text: "Nicht alles lohnt sich zu automatisieren. Wir sagen Ihnen offen, wo der Aufwand den Nutzen übersteigt.",
  },
];

export default function AutomatisierungPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Automatisierung"
          title="Automatisierung, die Ihrem Team Arbeit abnimmt."
          intro="Wir automatisieren die Abläufe, die Ihr Unternehmen täglich Zeit kosten – von der ersten Kundenanfrage bis zur Auswertung. Schritt für Schritt, nachvollziehbar und mit klaren Freigaben."
          crumbs={[{ label: "Automatisierung" }]}
        >
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className={btnPrimary}>
              {CTA_LABEL}
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <Link href="#bereiche" className={btnSecondary}>
              Was sich automatisieren lässt
            </Link>
          </div>
        </PageHeader>

        {/* Bereiche */}
        <section id="bereiche" className="bg-white py-20 lg:py-28">
          <div className={container}>
            <SectionHead
              eyebrow="Einsatzbereiche"
              title="Was sich in Unternehmen automatisieren lässt."
              text="Typisch sind wiederkehrende Aufgaben mit klaren Regeln. Welche davon sich bei Ihnen lohnen, klären wir gemeinsam in der Analyse."
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {AREAS.map((a) => (
                <li key={a.title}>
                  <Link
                    href={a.href}
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-teal-dark/70 hover:shadow-[var(--shadow-card)] sm:p-7"
                  >
                    <IconTile>
                      <a.icon size={22} strokeWidth={1.8} aria-hidden />
                    </IconTile>
                    <h3 className="mt-5 text-[1.25rem] font-bold">{a.title}</h3>
                    <p className="mt-2 flex-1 text-[16px] leading-relaxed text-muted">{a.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
                      Zur Leistung
                      <ArrowRight
                        size={17}
                        strokeWidth={2.2}
                        className="text-teal-dark transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <AutomationFlow tone="soft" />
        <MarketingTeam />

        {/* Grundsätze */}
        <section className="bg-white py-20 lg:py-28">
          <div className={container}>
            <SectionHead
              eyebrow="Unsere Grundsätze"
              title="Automatisierung mit Augenmaß."
              text="Technik soll Ihrem Unternehmen dienen – nicht umgekehrt. Diese vier Regeln gelten in jedem Projekt."
            />
            <ul className="mt-12 grid gap-x-10 gap-y-10 md:grid-cols-2">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="flex items-start gap-5">
                  <IconTile>
                    <p.icon size={23} strokeWidth={1.8} aria-hidden />
                  </IconTile>
                  <div>
                    <h3 className="text-[1.25rem] font-bold">{p.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Savings tone="soft" />
        <Steps id="ablauf" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
