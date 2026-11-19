import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Steps from "@/components/Steps";
import Cta from "@/components/Cta";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import { Compare, PlainSection, SectionHead, container } from "@/components/ui";
import { MEDIA } from "@/lib/media";

export const metadata: Metadata = {
  title: "Über QonteX | Digitalisierung und Automatisierung mit Verantwortung",
  description:
    "Lernen Sie QonteX kennen: Wir digitalisieren und automatisieren Abläufe in Unternehmen – persönlich betreut, verständlich erklärt und mit einem klaren Vorgehen von der Analyse bis zur laufenden Optimierung.",
  alternates: { canonical: "/ueber/" },
};

const TYPICAL = [
  "Einzelne Werkzeuge, die nicht miteinander sprechen",
  "Daten werden mehrfach von Hand übertragen",
  "Automatisierung ohne klare Freigaben",
  "Technische Antworten ohne Einordnung",
];

const QONTEX = [
  "Erst die Abläufe verstehen, dann die Technik wählen",
  "Systeme verbinden statt weitere Insellösungen bauen",
  "Menschen behalten Kontrolle und Freigaben",
  "Verständliche Sprache statt Fachchinesisch",
  "Ergebnisse messen und offen berichten",
  "Langfristige Zusammenarbeit mit festem Ansprechpartner",
];

const FACTS = [
  {
    title: "Persönlicher Ansprechpartner",
    text: "Ein fester Kontakt, der Ihre Abläufe und Systeme kennt.",
  },
  {
    title: "Hosting in Deutschland",
    text: "Unsere Server stehen in deutschen Rechenzentren.",
  },
  {
    title: "Datenschutzbewusste Umsetzung",
    text: "Datensparsam geplant und mit den nötigen Einwilligungen.",
  },
  {
    title: "Transparente Angebote",
    text: "Sie wissen vorher, was umgesetzt wird und was es kostet.",
  },
];

export default function UeberPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Digitalisierung mit Verantwortung."
          intro="QonteX digitalisiert und automatisiert Abläufe in Unternehmen – von der Website über Marketing und Vertrieb bis zur technischen Infrastruktur. Unser Ziel: weniger Routinearbeit für Ihr Team und mehr Zeit für Ihr Geschäft."
          crumbs={[{ label: "Über QonteX" }]}
          aside={
            <>
              <h2 className="sr-only">Worauf Sie sich verlassen können</h2>
              <ul className="border-t-2 border-ink">
                {FACTS.map((f) => (
                  <li key={f.title} className="border-b border-ink/25 py-4">
                    <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold leading-snug">
                      {f.title}
                    </p>
                    <p className="mt-1 text-[16px] leading-relaxed">{f.text}</p>
                  </li>
                ))}
              </ul>
            </>
          }
        />

        {/* Platz für ECHTES Team-Material – nur sichtbar, wenn in lib/media.ts aktiviert */}
        {MEDIA.about.team.enabled && (
          <div className={`${container} pt-12`}>
            <SmartAmbientVideo asset={MEDIA.about.team} className="overflow-hidden" />
          </div>
        )}

        {/* Anspruch & Vergleich */}
        <PlainSection rule={false}>
          <SectionHead
            title="Abläufe, die zusammenpassen – statt weiterer Insellösungen."
            text="Jede Empfehlung muss zwei Fragen bestehen: Spart sie Ihrem Team im Alltag wirklich Arbeit – und würden wir sie auch für unser eigenes Unternehmen einsetzen?"
          />
          <div className="mt-12">
            <Compare
              leftTitle="Was wir häufig vorfinden"
              left={TYPICAL}
              rightTitle="So arbeitet QonteX"
              right={QONTEX}
            />
          </div>
        </PlainSection>

        <Steps rule id="ablauf" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
