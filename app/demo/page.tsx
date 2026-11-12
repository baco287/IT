import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BellRing,
  Bot,
  CalendarCheck2,
  CalendarX2,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";
import BookingDemo from "@/components/demo/BookingDemo";
import { IconTile, SectionHead, btnPrimary, container } from "@/components/ui";
import { CTA_LABEL } from "@/lib/company";

export const metadata: Metadata = {
  title: "Demo: Online-Reservierung & Terminbuchung | QonteX",
  description:
    "Interaktive Demo: So funktioniert Online-Reservierung für Restaurants und Online-Terminbuchung für Werkstätten – mit KI-Chat-Assistent und Betreiberansicht.",
  robots: { index: false, follow: false },
};

const FEATURES: Array<{ icon: LucideIcon; title: string; text: string }> = [
  {
    icon: CalendarCheck2,
    title: "Buchungen rund um die Uhr",
    text: "Gäste und Kunden buchen, wann es ihnen passt – auch sonntags um 22 Uhr, wenn bei Ihnen niemand ans Telefon geht.",
  },
  {
    icon: Bot,
    title: "KI-Assistent im Chat",
    text: "Beantwortet Fragen, prüft freie Zeiten und bucht direkt im Gespräch – auf Wunsch später auch am Telefon.",
  },
  {
    icon: BellRing,
    title: "Bestätigung & Erinnerung",
    text: "Jede Buchung wird automatisch bestätigt, am Vortag erinnert das System – das senkt Ausfälle spürbar.",
  },
  {
    icon: CalendarX2,
    title: "Keine Doppelbuchungen",
    text: "Öffnungszeiten, Ruhetage und Kapazitäten pflegt das System automatisch – belegte Zeiten sind gesperrt.",
  },
];

const STEPS: Array<{ no: string; title: string; text: string }> = [
  {
    no: "01",
    title: "Kostenloses Potenzialgespräch",
    text: "Wir schauen uns an, wie Reservierungen oder Termine bei Ihnen heute laufen – und was sich lohnt.",
  },
  {
    no: "02",
    title: "Einrichtung & Anbindung",
    text: "Widget und KI-Assistent kommen in Ihrem Design auf Ihre Webseite, angebunden an Ihren Kalender.",
  },
  {
    no: "03",
    title: "Start & Betreuung",
    text: "Wir begleiten den Start, werten aus und passen Zeiten, Regeln und Texte an Ihren Alltag an.",
  },
];

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Interaktive Demo"
          title="Online-Buchung zum Ausprobieren – Restaurant und Werkstatt."
          intro="So sieht es aus, wenn Ihre Gäste oder Kunden online reservieren und Termine buchen – per Widget oder im Gespräch mit einem KI-Assistenten. Klicken Sie sich durch: Alles hier ist eine Demo mit erfundenen Betrieben, nichts wird gespeichert."
          crumbs={[{ label: "Demo" }]}
        />

        {/* Die eigentliche Demo */}
        <section className="bg-white py-14 lg:py-20" aria-label="Interaktive Buchungs-Demo">
          <div className={container}>
            <BookingDemo />
          </div>
        </section>

        {/* Was dahinter steckt */}
        <section className="bg-soft py-20 lg:py-28">
          <div className={container}>
            <SectionHead
              eyebrow="Was dahinter steckt"
              title="Mehr Buchungen, weniger Telefon."
              text="Das System übernimmt die Arbeit, die heute am Telefon und im Terminbuch hängen bleibt – und Ihr Team kümmert sich um Gäste und Autos statt um Zettel."
            />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex items-start gap-5 rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <IconTile>
                    <f.icon size={22} strokeWidth={1.8} aria-hidden />
                  </IconTile>
                  <div>
                    <h3 className="text-[1.15rem] font-bold">{f.title}</h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ablauf */}
        <section className="bg-white py-20 lg:py-28">
          <div className={container}>
            <SectionHead
              eyebrow="So kommt das in Ihren Betrieb"
              title="In drei Schritten zur eigenen Online-Buchung."
            />
            <ol className="mt-12 grid gap-5 md:grid-cols-3">
              {STEPS.map((s) => (
                <li key={s.no} className="rounded-2xl border border-line bg-white p-6 sm:p-7">
                  <span className="text-sm font-bold text-teal-text">{s.no}</span>
                  <h3 className="mt-3 text-[1.15rem] font-bold">{s.title}</h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
            <div className="mt-10">
              <Link href="/kontakt" className={btnPrimary}>
                {CTA_LABEL}
                <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
