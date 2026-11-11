import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import HeroFlow from "./HeroFlow";
import { Eyebrow, btnPrimary, btnSecondary, container } from "./ui";
import { CTA_LABEL } from "@/lib/company";

const FACTS = ["Kostenlos und unverbindlich", "Feste Ansprechpartner", "Datenschutzbewusste Umsetzung"];

export default function Hero() {
  return (
    <section className="bg-soft">
      <div
        className={`${container} grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12 lg:pb-24 lg:pt-20`}
      >
        <div>
          <Eyebrow>Digitalisierung und KI-Automatisierung für Unternehmen</Eyebrow>
          <h1 className="mt-5 text-[2.2rem] font-extrabold leading-[1.06] tracking-[-0.03em] [word-spacing:0.06em] min-[400px]:text-[2.45rem] sm:text-[3.6rem] lg:text-[3.2rem] xl:text-[4rem]">
            Weniger Aufwand.
            <br />
            Mehr <span className="text-teal-dark">Wachstum.</span>
          </h1>
          <p className="mt-7 max-w-[35rem] text-lg leading-relaxed text-muted sm:text-[1.2rem]">
            Wir digitalisieren Ihre Unternehmensprozesse, automatisieren Marketing und Vertrieb
            und schaffen effiziente Abläufe, mit denen Ihr Unternehmen nachhaltig wachsen kann.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kontakt" className={btnPrimary}>
              {CTA_LABEL}
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <Link href="#leistungen" className={btnSecondary}>
              Unsere Lösungen entdecken
            </Link>
          </div>
          <ul className="mt-9 flex flex-col gap-x-7 gap-y-2.5 text-[15px] font-medium text-ink sm:flex-row sm:flex-wrap">
            {FACTS.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <Check size={17} strokeWidth={2.6} className="flex-none text-teal-dark" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <HeroFlow />
      </div>
    </section>
  );
}
