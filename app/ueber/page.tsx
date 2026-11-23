import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Process from "@/components/Process";
import Cta from "@/components/Cta";
import { PROMISES } from "@/components/home/Industries";
import { SplitSection, btnSignalLg, container } from "@/components/ui";
import { COMPANY, CTA_LABEL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Über uns: IT, KI und Automatisierung aus Berlin",
  description:
    "QonteX entwickelt KI-Systeme, Automatisierungen, Websites und Software für Unternehmen aller Branchen. Persönlich betreut, von der Analyse bis zum Betrieb.",
  path: "/ueber/",
});

const PRINCIPLES = [
  {
    title: "Erst verstehen, dann entwickeln",
    text: "Wir sehen uns Ihre Abläufe und Systeme an, bevor wir eine Technik vorschlagen. Die Technik richtet sich nach Ihrem Ablauf, nicht umgekehrt.",
  },
  {
    title: "Verbinden statt Insellösungen bauen",
    text: "Neue Software muss mit dem zusammenarbeiten, was Sie bereits nutzen. Schnittstellen und Datenflüsse planen wir von Anfang an mit.",
  },
  {
    title: "Menschen behalten die Kontrolle",
    text: "KI bereitet vor und erledigt Routine. Entscheidungen, Freigaben und der persönliche Kontakt zu Ihren Kunden bleiben bei Ihrem Team.",
  },
  {
    title: "Klein starten, im Betrieb verbessern",
    text: "Wir beginnen mit einem klar umrissenen Ablauf, nehmen ihn in Betrieb und bauen aus, was sich im Alltag bewährt.",
  },
  {
    title: "Verständlich bleiben",
    text: "Sie erhalten Erklärungen in klarer Sprache und eine Dokumentation, mit der Ihr Team arbeiten kann.",
  },
];

export default function UeberPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Wir verbinden Software, KI und bestehende Systeme zu durchgängigen Abläufen."
          intro="QonteX ist ein IT- und KI-Dienstleister für Unternehmen aller Branchen. Wir entwickeln KI-Agenten, automatisieren Geschäftsprozesse und bauen Websites und individuelle Software. Jede Lösung messen wir daran, ob sie Ihrem Team im Alltag Arbeit abnimmt."
          crumbs={[{ label: "Über QonteX" }]}
        >
          <div className="mt-9">
            <Link href="/kontakt" className={btnSignalLg}>
              {CTA_LABEL}
            </Link>
          </div>
        </PageHeader>

        <SplitSection
          headingId="grundsaetze-heading"
          title="Unsere Grundsätze"
          text="Fünf Regeln, die in jedem Projekt gelten, ob Chatbot, Workflow oder Webanwendung."
        >
          <ol className="border-t border-ink/80">
            {PRINCIPLES.map((p) => (
              <li key={p.title} className="border-b border-rule py-6">
                <h3 className="text-[1.3rem]">{p.title}</h3>
                <p className="mt-2 max-w-[40rem] text-[16.5px] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
        </SplitSection>

        <section aria-labelledby="zusagen-heading" className="bg-fog">
          <div className={`${container} py-20 lg:py-24`}>
            <h2 id="zusagen-heading" className="text-[clamp(1.7rem,5.6vw,2rem)] sm:text-[2.15rem]">
              Worauf Sie sich verlassen können
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {PROMISES.map((p) => (
                <li key={p.title} className="border-t-2 border-signal-ink pt-5">
                  <h3 className="text-[1.2rem]">{p.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Process id="ablauf" />

        <section aria-labelledby="unternehmen-heading" className="bg-fog">
          <div className={`${container} grid gap-x-16 gap-y-6 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-20`}>
            <h2 id="unternehmen-heading" className="text-[1.6rem] sm:text-[1.8rem]">
              Das Unternehmen hinter QonteX
            </h2>
            <p className="max-w-[40rem] text-[17px] leading-relaxed text-text">
              QonteX ist ein Angebot der {COMPANY.legalName} mit Sitz in {COMPANY.street},{" "}
              {COMPANY.zip} {COMPANY.city}. Alle Angaben zum Unternehmen finden Sie im{" "}
              <Link href="/impressum" className="font-semibold text-signal-ink underline underline-offset-4">
                Impressum
              </Link>
              .
            </p>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
