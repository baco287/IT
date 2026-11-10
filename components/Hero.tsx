import Link from "next/link";
import { ArrowRight, UserRound, ShieldCheck, Clock3 } from "lucide-react";
import CallbackForm from "./CallbackForm";
import { Eyebrow, btnPrimary, btnSecondary, container } from "./ui";

const BENEFITS = [
  {
    icon: UserRound,
    title: "Persönliche Ansprechpartner",
    text: "Ein fester Kontakt, der Ihre Systeme kennt – statt anonymer Hotline.",
  },
  {
    icon: ShieldCheck,
    title: "Sichere und zuverlässige IT",
    text: "Schutz vor Angriffen, Datenverlust und Ausfällen – vorausschauend betreut.",
  },
  {
    icon: Clock3,
    title: "Weniger Aufwand für Unternehmen",
    text: "Wir kümmern uns um die Technik. Sie gewinnen Zeit für Ihr Geschäft.",
  },
];

export default function Hero() {
  return (
    <>
      <section className="bg-soft">
        <div className={`${container} grid items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-16`}>
          <div>
            <Eyebrow>IT-Service für Unternehmen</Eyebrow>
            <h1 className="mt-4 text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-[3rem] xl:text-[3.4rem]">
              Ein Ansprechpartner für Ihre gesamte IT.
            </h1>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">
              Wir betreuen Ihre Systeme, schützen Ihre Daten und automatisieren
              wiederkehrende Aufgaben. Persönlich, zuverlässig und aus einer Hand.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/kontakt" className={btnPrimary}>
                Kostenloses Erstgespräch
                <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
              </Link>
              <Link href="#leistungen" className={btnSecondary}>
                Unsere Leistungen
              </Link>
            </div>
          </div>
          <CallbackForm />
        </div>
      </section>

      {/* Vertrauenselemente direkt unter dem Hero */}
      <section aria-label="Ihre Vorteile" className="border-b border-line bg-white">
        <ul className={`${container} grid divide-line py-5 md:grid-cols-3 md:divide-x`}>
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex items-start gap-4 py-4 md:px-8 md:py-3 md:first:pl-0 md:last:pr-0">
              <b.icon size={26} strokeWidth={1.6} className="mt-0.5 flex-none text-ink" aria-hidden />
              <div>
                <h2 className="text-[18px] font-bold">{b.title}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
