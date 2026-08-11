import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import Reveal from "./Reveal";

export default function Cta() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="glow left-1/2 top-1/2 h-[26rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 bg-[#1f7a4d]/20" aria-hidden />
      <Reveal className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Bereit für eine IT, die{" "}
          <span className="grad">einfach funktioniert?</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-fog">
          Im kostenlosen Erstgespräch klären wir, was Ihre IT sicherer,
          leistungsfähiger und zukunftsfähiger macht. Ehrlich und unverbindlich.
        </p>
        <div className="mx-auto mt-8 flex max-w-md items-center justify-between rounded-lg border border-white/10 bg-[rgba(6,10,20,0.7)] px-4 py-3 font-[family-name:var(--font-mono)] text-sm">
          <span className="flex items-center gap-2 text-fog">
            <Terminal size={14} className="text-cyan" aria-hidden />
            <span className="text-cyan">$</span> qontex beratung --kostenlos
          </span>
          <span className="status-dot" aria-hidden />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-[#04210f] shadow-[0_0_0_1px_rgba(41,209,126,0.4),0_10px_30px_rgba(41,209,126,0.25)] transition-all hover:-translate-y-0.5 hover:bg-cyan-soft"
          >
            Kostenlose Erstberatung
            <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
          </Link>
          <Link
            href="/leistungen"
            className="inline-flex items-center rounded-lg border border-white/12 bg-white/[0.03] px-7 py-3.5 font-semibold text-mist transition-colors hover:border-white/25 hover:bg-white/[0.06]"
          >
            Leistungen ansehen
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
