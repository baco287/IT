import type { CSSProperties } from "react";
import {
  Megaphone,
  PanelsTopLeft,
  MessageSquareText,
  Bot,
  Database,
  CalendarCheck,
  type LucideIcon,
} from "lucide-react";

const STEPS: Array<{ icon: LucideIcon; title: string; text: string }> = [
  { icon: Megaphone, title: "Werbung", text: "Anzeige oder Suchergebnis" },
  { icon: PanelsTopLeft, title: "Landingpage", text: "Passende Angebotsseite" },
  { icon: MessageSquareText, title: "Kundenanfrage", text: "Formular oder Nachricht" },
  { icon: Bot, title: "KI-Agent", text: "Prüft und ordnet ein" },
  { icon: Database, title: "CRM", text: "Strukturierte Übergabe" },
  { icon: CalendarCheck, title: "Termin", text: "Passender Terminvorschlag" },
];

/**
 * Vereinfachte Automatisierungs-Visualisierung für den Hero.
 * Reines HTML/CSS: Die Schritte werden nacheinander hervorgehoben, ein Lichtpunkt
 * wandert von Station zu Station. Bei „Bewegung reduzieren" steht alles still.
 */
export default function HeroFlow() {
  return (
    <figure className="relative mx-auto w-full max-w-[30rem] lg:mr-0">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink p-4 shadow-[0_30px_60px_-30px_rgba(7,24,45,0.55)] sm:p-6">
        {/* ruhiger Lichtschein, kein Neon */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-teal/15 blur-3xl"
        />

        <div className="relative flex items-center justify-between px-3 pb-4 pt-1">
          <p className="text-sm font-semibold text-white">Vom Klick zum Termin</p>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-xs font-medium text-white/70">
            Beispielablauf
          </span>
        </div>

        <div className="relative">
          {/* Verbindungslinie zwischen den Stationen */}
          <span aria-hidden className="absolute bottom-8 left-[33px] top-8 w-px bg-white/15" />
          {/* wandernder Lichtpunkt */}
          <span aria-hidden className="hero-dot absolute bottom-8 left-[33px] top-8 w-px">
            <span className="absolute -left-[4px] -top-[4px] h-[9px] w-[9px] rounded-full bg-teal shadow-[0_0_0_4px_rgba(20,212,207,0.2)]" />
          </span>

          <ol className="relative">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                style={{ "--i": i } as CSSProperties}
                className="hero-step flex h-16 items-center gap-3.5 rounded-xl px-3"
              >
                <span className="hero-step-icon relative z-10 grid h-[42px] w-[42px] flex-none place-items-center rounded-full border border-white/15 bg-ink-soft text-white">
                  <s.icon size={19} strokeWidth={1.8} aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold leading-tight text-white">{s.title}</span>
                  <span className="mt-0.5 block truncate text-[13px] text-white/65">{s.text}</span>
                </span>
                <span className="hero-step-no text-xs font-semibold tabular-nums text-white/40" aria-hidden>
                  0{i + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <figcaption className="mt-4 px-1 text-sm leading-relaxed text-muted">
        Vereinfachte Darstellung. Welche Schritte sich in Ihrem Unternehmen automatisieren
        lassen, klären wir im Potenzialgespräch.
      </figcaption>
    </figure>
  );
}
