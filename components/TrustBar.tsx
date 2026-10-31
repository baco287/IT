import { Flame, FileCheck2, Scissors, Thermometer, CircleDot } from "lucide-react";

/* Referenzleiste im Stil von Referenz 3 – ausschließlich echte,
   live laufende QonteX-Projekte (keine fremden Herstellerlogos). */
const PROJECTS = [
  { name: "Volt-Gas", icon: Flame },
  { name: "DeutscheZulassung", icon: FileCheck2 },
  { name: "Hairvenly", icon: Scissors },
  { name: "Heizwechsel", icon: Thermometer },
  { name: "Reifencenter", icon: CircleDot },
];

const FACTS = [
  { value: "100 %", label: "Hosting in Deutschland" },
  { value: "24/7", label: "Überwachung" },
  { value: "< 24 h", label: "Reaktionszeit" },
];

export default function TrustBar() {
  return (
    <section aria-label="Referenzen" className="border-y border-white/6 bg-abyss/60 px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-10 gap-y-6">
        <p className="max-w-[11rem] font-[family-name:var(--font-mono)] text-[10px] uppercase leading-relaxed tracking-[0.18em] text-fog/70">
          Bereits im Einsatz bei Unternehmen aus Deutschland
        </p>
        <ul className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-3">
          {PROJECTS.map((p, i) => (
            <li key={p.name} className="flex items-center gap-8">
              <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-mist/80">
                <p.icon size={16} strokeWidth={2} className="text-fog" aria-hidden />
                {p.name}
              </span>
              {i < PROJECTS.length - 1 && (
                <span className="hidden h-5 w-px bg-white/10 md:block" aria-hidden />
              )}
            </li>
          ))}
        </ul>
        <ul className="flex gap-8">
          {FACTS.map((f) => (
            <li key={f.label} className="leading-tight">
              <span className="block font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {f.value}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.14em] text-fog">
                {f.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
