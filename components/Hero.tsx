import Link from "next/link";
import { ArrowRight, Users, ShieldCheck, Clock3 } from "lucide-react";
import HeroVisual from "./HeroVisual";
import { Eyebrow, IconTile, btnPrimary, btnSecondary, container } from "./ui";

const BENEFITS = [
  {
    icon: Users,
    title: "Persönliche Ansprechpartner",
    text: "Ein fester Kontakt, der Ihre Systeme kennt – statt anonymer Hotline.",
  },
  {
    icon: ShieldCheck,
    title: "Sichere und zuverlässige IT",
    text: "Schutz vor Angriffen, Datenverlust und Ausfällen.",
  },
  {
    icon: Clock3,
    title: "Weniger Aufwand für Unternehmen",
    text: "Wir kümmern uns um die Technik – Sie um Ihr Geschäft.",
  },
];

export default function Hero() {
  return (
    <>
      <section className="bg-[linear-gradient(180deg,#f4f7fa_0%,#ffffff_100%)]">
        <div className={`${container} grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-12`}>
          <div>
            <Eyebrow>IT-Service für Unternehmen</Eyebrow>
            <h1 className="mt-6 text-[2.3rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.9rem] xl:text-[3.25rem]">
              Ein Ansprechpartner für Ihre gesamte IT.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Wir betreuen Ihre Systeme, schützen Ihre Daten und automatisieren
              wiederkehrende Aufgaben. Persönlich, zuverlässig und aus einer Hand.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/kontakt" className={btnPrimary}>
                Kostenloses Erstgespräch
                <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
              </Link>
              <Link href="#leistungen" className={btnSecondary}>
                Unsere Leistungen
              </Link>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Vertrauenselemente direkt unter dem Hero */}
      <section aria-label="Ihre Vorteile" className="border-y border-line bg-white">
        <ul className={`${container} grid divide-line py-6 md:grid-cols-3 md:divide-x`}>
          {BENEFITS.map((b) => (
            <li key={b.title} className="flex items-start gap-4 py-4 md:px-8 md:py-2 md:first:pl-0 md:last:pr-0">
              <IconTile>
                <b.icon size={24} strokeWidth={1.8} aria-hidden />
              </IconTile>
              <div>
                <h2 className="text-lg font-bold">{b.title}</h2>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
