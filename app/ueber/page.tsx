import type { Metadata } from "next";
import { Check, Minus, MapPin, UserRound, Receipt, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Steps from "@/components/Steps";
import Cta from "@/components/Cta";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import { IconTile, SectionHead, container } from "@/components/ui";
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
    icon: UserRound,
    title: "Persönlicher Ansprechpartner",
    text: "Ein fester Kontakt, der Ihre Abläufe und Systeme kennt.",
  },
  {
    icon: MapPin,
    title: "Hosting in Deutschland",
    text: "Unsere Server stehen in deutschen Rechenzentren.",
  },
  {
    icon: ShieldCheck,
    title: "Datenschutzbewusste Umsetzung",
    text: "Datensparsam geplant und mit den nötigen Einwilligungen.",
  },
  {
    icon: Receipt,
    title: "Transparente Angebote",
    text: "Sie wissen vorher, was umgesetzt wird und was es kostet.",
  },
];

export default function UeberPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Über QonteX"
          title="Digitalisierung mit Verantwortung."
          intro="QonteX digitalisiert und automatisiert Abläufe in Unternehmen – von der Website über Marketing und Vertrieb bis zur technischen Infrastruktur. Unser Ziel: weniger Routinearbeit für Ihr Team und mehr Zeit für Ihr Geschäft."
          crumbs={[{ label: "Über QonteX" }]}
        />

        {/* Platz für ECHTES Team-Material – nur sichtbar, wenn in lib/media.ts aktiviert */}
        {MEDIA.about.team.enabled && (
          <div className={`${container} pt-12`}>
            <SmartAmbientVideo
              asset={MEDIA.about.team}
              className="overflow-hidden rounded-3xl border border-line"
            />
          </div>
        )}

        {/* Fakten */}
        <section className="bg-white py-20 lg:py-24">
          <ul className={`${container} grid gap-5 sm:grid-cols-2 lg:grid-cols-4`}>
            {FACTS.map((f) => (
              <li key={f.title} className="h-full rounded-2xl border border-line bg-white p-6">
                <IconTile>
                  <f.icon size={22} strokeWidth={1.8} aria-hidden />
                </IconTile>
                <h2 className="mt-5 text-[1.15rem] font-bold leading-snug">{f.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{f.text}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Anspruch & Vergleich */}
        <section className="bg-soft py-20 lg:py-24">
          <div className={container}>
            <SectionHead
              eyebrow="Unser Anspruch"
              title="Abläufe, die zusammenpassen – statt weiterer Insellösungen."
              text="Jede Empfehlung muss zwei Fragen bestehen: Spart sie Ihrem Team im Alltag wirklich Arbeit – und würden wir sie auch für unser eigenes Unternehmen einsetzen?"
            />
            <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-3xl border border-line bg-white p-7 sm:p-9">
                <h3 className="text-[1.3rem] font-bold text-muted">Was wir häufig vorfinden</h3>
                <ul className="mt-6 space-y-4">
                  {TYPICAL.map((r) => (
                    <li key={r} className="flex items-start gap-3.5 text-[16px] leading-snug text-muted">
                      <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-soft text-muted">
                        <Minus size={14} strokeWidth={3} aria-hidden />
                      </span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border-2 border-teal-dark bg-white p-7 sm:p-9">
                <h3 className="text-[1.3rem] font-bold">So arbeitet QonteX</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {QONTEX.map((p) => (
                    <li key={p} className="flex items-start gap-3.5 text-[16px] font-medium leading-snug text-ink">
                      <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-tint text-teal-text">
                        <Check size={14} strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <Steps id="ablauf" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
