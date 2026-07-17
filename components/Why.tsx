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
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Warum QonteX"
          title="IT-Partnerschaft statt anonymer Hotline"
          text="Der Unterschied liegt nicht in der Technik allein, sondern darin, wie sie betreut wird."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="glass h-full rounded-2xl p-8 opacity-80">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fog">
                Typische Standardbetreuung
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-mist">
                Reaktiv
              </h3>
              <ul className="mt-6 space-y-3.5">
                {REACTIVE.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-fog">
                    <Minus size={16} strokeWidth={2.5} className="mt-0.5 flex-none opacity-60" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass relative h-full overflow-hidden rounded-2xl border-cyan/25 p-8">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent"
                aria-hidden
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                  QonteX-Betreuung
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  Proaktiv
                </h3>
                <ul className="mt-6 space-y-3.5">
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
