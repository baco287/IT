import { Check, Minus } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const REACTIVE = [
  "Reaktion erst, wenn etwas ausgefallen ist",
  "Wechselnde Ansprechpartner im Ticketsystem",
  "Technische Antworten ohne Einordnung",
  "Unklare Kosten bei jedem Vorfall",
];

const PROACTIVE = [
  "Persönliche und verständliche Beratung",
  "Schnelle und direkte Kommunikation",
  "Proaktive Betreuung und Überwachung",
  "Transparente Empfehlungen",
  "Skalierbare Lösungen",
  "Langfristige Zusammenarbeit",
];

export default function Why() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_10%,rgba(167,139,250,0.07),transparent_60%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHead
          label="Warum QonteX"
          title="IT-Partnerschaft statt anonymer Hotline"
          text="Der Unterschied liegt nicht in der Technik allein, sondern darin, wie sie betreut wird."
        />
        <div className="grid items-center gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="glass rounded-xl p-6 opacity-70">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fog">
                Typische Standardbetreuung
              </p>
              <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-base font-semibold text-mist">
                Reaktiv
              </h3>
              <ul className="mt-4 space-y-2.5">
                {REACTIVE.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-fog">
                    <Minus size={14} strokeWidth={2.5} className="mt-0.5 flex-none opacity-60" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass relative overflow-hidden rounded-2xl border-cyan/40 p-9 shadow-[0_0_50px_rgba(45,212,234,0.09)]">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/12 to-transparent"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent"
                aria-hidden
              />
              <div className="relative">
                <span className="inline-flex rounded-full bg-cyan/12 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan">
                  QonteX-Betreuung
                </span>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                  Proaktiv
                </h3>
                <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
                  {PROACTIVE.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm font-medium text-mist">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-md bg-cyan/15 text-cyan">
                        <Check size={12} strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
