import Link from "next/link";
import SystemMap from "./SystemMap";
import { btnGhostDarkLg, btnSignalLg, container, h1Class } from "../ui";
import { CTA_LABEL } from "@/lib/company";

/**
 * Seitenkopf der Startseite: links die Aussage, rechts die Systemkarte –
 * isolierte Systeme werden über KI-Agent und Automatisierung zu einem Ablauf verbunden.
 */
export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="on-dark relative isolate overflow-hidden bg-night">
      <div className="grid-field pointer-events-none absolute inset-0 -z-10" aria-hidden />

      <div
        className={`${container} grid items-center gap-x-14 gap-y-14 pb-20 pt-12 sm:pt-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-12 lg:pb-28 lg:pt-20`}
      >
        <div>
          <h1 id="hero-heading" className={`${h1Class} text-white lg:text-[clamp(2.4rem,3.85vw,3.1rem)]`}>
            IT-Lösungen und <span className="whitespace-nowrap">KI-Automatisierung</span> für Unternehmen.
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.15rem] leading-[1.65] text-haze sm:text-[1.2rem]">
            Wir entwickeln intelligente Software, automatisieren Geschäftsprozesse und schaffen
            digitale Lösungen, die Unternehmen effizienter und skalierbarer machen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kontakt" className={btnSignalLg}>
              {CTA_LABEL}
            </Link>
            <Link href="#leistungen" className={btnGhostDarkLg}>
              Unsere Leistungen entdecken
            </Link>
          </div>
          <p className="mt-10 max-w-[30rem] border-l border-signal/60 pl-4 text-[15px] leading-relaxed text-haze">
            Für Unternehmen jeder Branche: vom Handwerksbetrieb über Praxis und Agentur bis zum
            Industrie- und Handelsunternehmen.
          </p>
        </div>

        <SystemMap />
      </div>
    </section>
  );
}
