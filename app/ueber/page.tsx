import type { Metadata } from "next";
import { Check, Minus, Search, FileText, Wrench, Activity, MapPin, UserRound, Receipt, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import { Eyebrow, IconTile, container } from "@/components/ui";
import { MEDIA } from "@/lib/media";

export const metadata: Metadata = {
  title: "Über QonteX | IT-Partnerschaft statt anonymer Hotline",
  description:
    "Lernen Sie QonteX kennen: persönliche IT-Betreuung, proaktive Arbeitsweise und ein klarer Ablauf von der Analyse bis zum laufenden Betrieb.",
};

const REACTIVE = [
  "Reaktion erst, wenn etwas ausgefallen ist",
  "Wechselnde Ansprechpartner im Ticketsystem",
  "Technische Antworten ohne Einordnung",
  "Unklare Kosten bei jedem Vorfall",
];

const PROACTIVE = [
  "Persönliche und verständliche Beratung",
  "Schnelle und direkte Kommunikation",
  "Vorausschauende Betreuung und Überwachung",
  "Transparente Empfehlungen und Angebote",
  "Lösungen, die mit Ihrem Unternehmen wachsen",
  "Langfristige Zusammenarbeit",
];

const STEPS = [
  { icon: Search, title: "Analyse", text: "Wir verschaffen uns ein klares Bild Ihrer aktuellen IT und Ihrer Ziele." },
  { icon: FileText, title: "Klarer Plan", text: "Sie erhalten einen verständlichen Plan mit Empfehlungen und Prioritäten." },
  { icon: Wrench, title: "Umsetzung", text: "Wir setzen strukturiert um – sauber dokumentiert und mit möglichst wenig Unterbrechung." },
  { icon: Activity, title: "Laufende Betreuung", text: "Ihre Systeme werden überwacht, gepflegt und weiterentwickelt." },
];

const FACTS = [
  { icon: UserRound, title: "Persönlicher Ansprechpartner", text: "Ein fester Kontakt, der Ihre Umgebung kennt." },
  { icon: MapPin, title: "Hosting in Deutschland", text: "Unsere Server stehen in deutschen Rechenzentren." },
  { icon: ShieldCheck, title: "Datenschutz nach DSGVO", text: "Sorgfältiger Umgang mit Ihren Daten und Systemen." },
  { icon: Receipt, title: "Transparente Angebote", text: "Sie wissen vorher, was Sie erwartet." },
];

export default function UeberPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Über QonteX"
          title="Technologie mit Verantwortung."
          intro="QonteX steht für moderne IT-Lösungen, persönliche Betreuung und nachhaltige technische Entscheidungen. Wir verbinden Fachwissen mit einem klaren Verständnis für die Abläufe in Ihrem Unternehmen."
          crumbs={[{ label: "Über QonteX" }]}
        />

        {/* Platz für ECHTES Team-Material – nur sichtbar, wenn in lib/media.ts aktiviert */}
        {MEDIA.about.team.enabled && (
          <div className={`${container} pt-12`}>
            <SmartAmbientVideo
              asset={MEDIA.about.team}
              className="overflow-hidden rounded-2xl border border-line"
            />
          </div>
        )}

        {/* Fakten */}
        <section className="bg-white py-16 lg:py-20">
          <div className={`${container} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
            {FACTS.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-white p-6">
                  <IconTile>
                    <f.icon size={22} strokeWidth={1.8} aria-hidden />
                  </IconTile>
                  <h2 className="mt-4 text-lg font-bold">{f.title}</h2>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Anspruch & Vergleich */}
        <section className="bg-soft py-16 lg:py-20">
          <div className={container}>
            <div className="max-w-3xl">
              <Eyebrow>Unser Anspruch</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
                IT-Partnerschaft statt anonymer Hotline.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                Jede Empfehlung muss zwei Fragen bestehen: Macht sie Ihr Unternehmen sicherer
                oder leistungsfähiger – und würden wir sie auch für unsere eigene IT treffen?
              </p>
            </div>
            <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
              <div className="rounded-2xl border border-line bg-white p-7">
                <h3 className="text-lg font-bold text-muted">Typische Standardbetreuung</h3>
                <ul className="mt-5 space-y-3">
                  {REACTIVE.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-[15px] leading-relaxed text-muted">
                      <Minus size={18} strokeWidth={2.2} className="mt-0.5 flex-none text-muted/70" aria-hidden />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border-2 border-teal bg-white p-7">
                <h3 className="text-lg font-bold">So arbeitet QonteX</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {PROACTIVE.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[15px] font-medium leading-relaxed text-ink">
                      <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-tint text-teal-dark">
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

        {/* Ablauf */}
        <section className="bg-white py-16 lg:py-20">
          <div className={container}>
            <Eyebrow>So arbeiten wir</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
              Von der Analyse bis zur laufenden Betreuung.
            </h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border border-line bg-white p-6">
                  <span className="absolute right-5 top-5 text-sm font-bold text-teal-dark">0{i + 1}</span>
                  <IconTile>
                    <s.icon size={22} strokeWidth={1.8} aria-hidden />
                  </IconTile>
                  <h3 className="mt-4 text-lg font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
