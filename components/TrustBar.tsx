import { ShieldCheck, Activity, Lock, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

const ITEMS = [
  {
    icon: ShieldCheck,
    title: "Zuverlässiger IT-Partner",
    text: "Feste Ansprechpartner statt anonymer Ticketsysteme.",
  },
  {
    icon: Activity,
    title: "Proaktive Überwachung",
    text: "Probleme erkennen, bevor sie den Betrieb stören.",
  },
  {
    icon: Lock,
    title: "Moderne Sicherheitskonzepte",
    text: "Schutz für Systeme, Daten und Arbeitsplätze.",
  },
  {
    icon: TrendingUp,
    title: "Skalierbare Lösungen",
    text: "IT, die mit Ihrem Unternehmen mitwächst.",
  },
];

export default function TrustBar() {
  return (
    <section aria-label="Vorteile" className="relative z-10 -mt-10 px-6">
      <Reveal className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-1 gap-6 rounded-2xl p-7 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it) => (
            <div key={it.title} className="flex items-start gap-3.5">
              <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-cyan/10 text-cyan">
                <it.icon size={19} strokeWidth={2} aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">{it.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-fog">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
