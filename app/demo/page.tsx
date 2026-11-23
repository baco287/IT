import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";
import BookingDemo from "@/components/demo/BookingDemo";
import {
  DefRows,
  NumberedColumns,
  PlainSection,
  SectionHead,
  SplitSection,
  btnPrimary,
  container,
} from "@/components/ui";
import { CTA_LABEL } from "@/lib/company";

export const metadata: Metadata = {
  title: "Demo: Online-Reservierung & Terminbuchung",
  description:
    "Interaktive Demo: So funktioniert Online-Reservierung für Restaurants und Online-Terminbuchung für Werkstätten – mit KI-Chat-Assistent und Betreiberansicht.",
  robots: { index: false, follow: false },
};

const FEATURES: Array<{ title: string; text: string }> = [
  {
    title: "Buchungen rund um die Uhr",
    text: "Gäste und Kunden buchen, wann es ihnen passt – auch sonntags um 22 Uhr, wenn bei Ihnen niemand ans Telefon geht.",
  },
  {
    title: "KI-Assistent im Chat",
    text: "Beantwortet Fragen, prüft freie Zeiten und bucht direkt im Gespräch – auf Wunsch später auch am Telefon.",
  },
  {
    title: "Bestätigung & Erinnerung",
    text: "Jede Buchung wird automatisch bestätigt, am Vortag erinnert das System. Das hilft, vergessene Termine zu vermeiden.",
  },
  {
    title: "Keine Doppelbuchungen",
    text: "Öffnungszeiten, Ruhetage und Kapazitäten pflegt das System automatisch – belegte Zeiten sind gesperrt.",
  },
];

const STEPS: Array<{ title: string; text: string }> = [
  {
    title: "Erstgespräch",
    text: "Wir schauen uns an, wie Reservierungen oder Termine bei Ihnen heute laufen – und was sich lohnt.",
  },
  {
    title: "Einrichtung & Anbindung",
    text: "Widget und KI-Assistent kommen in Ihrem Design auf Ihre Webseite, angebunden an Ihren Kalender.",
  },
  {
    title: "Start & Betreuung",
    text: "Wir begleiten den Start, werten aus und passen Zeiten, Regeln und Texte an Ihren Alltag an.",
  },
];

export default function DemoPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Online-Buchung zum Ausprobieren – Restaurant und Werkstatt."
          intro="So sieht es aus, wenn Ihre Gäste oder Kunden online reservieren und Termine buchen – per Widget oder im Gespräch mit einem KI-Assistenten. Klicken Sie sich durch: Alles hier ist eine Demo mit erfundenen Betrieben, nichts wird gespeichert."
          crumbs={[{ label: "Demo" }]}
        />

        {/* Die eigentliche Demo */}
        <section className="bg-fog py-14 lg:py-20" aria-label="Interaktive Buchungs-Demo">
          <div className={container}>
            <BookingDemo />
          </div>
        </section>

        {/* Was dahinter steckt */}
        <SplitSection
          headingId="features-heading"
          title="Buchen ohne Telefonpingpong."
          text="Das System übernimmt die Arbeit, die heute am Telefon und im Terminbuch hängen bleibt – und Ihr Team kümmert sich um Gäste und Autos statt um Zettel."
        >
          <DefRows items={FEATURES} />
        </SplitSection>

        {/* Ablauf */}
        <PlainSection>
          <SectionHead title="In drei Schritten zur eigenen Online-Buchung." />
          <div className="mt-12">
            <NumberedColumns items={STEPS} columns={3} />
          </div>
          <div className="mt-10">
            <Link href="/kontakt" className={btnPrimary}>
              {CTA_LABEL}
            </Link>
          </div>
        </PlainSection>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
