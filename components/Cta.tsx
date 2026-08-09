import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="glass rounded-2xl px-8 py-14 text-center sm:px-14">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Bereit für eine IT, die einfach funktioniert?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-fog">
            Lassen Sie uns gemeinsam herausfinden, wie QonteX Ihre IT sicherer,
            leistungsfähiger und zukunftsfähiger machen kann.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#174F92]"
            >
              Kostenlose Erstberatung
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link
              href="/kontakt"
              className="glass inline-flex items-center rounded-lg px-7 py-3.5 font-semibold text-mist transition-colors hover:border-cyan/50"
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
