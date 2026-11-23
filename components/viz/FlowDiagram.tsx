import type { FlowStep } from "@/lib/examples";

/**
 * Ablauf in vier Schritten auf dunklem Grund: am Desktop nebeneinander mit
 * Verbindungslinie, am Handy untereinander. Die Nummern stehen für die Reihenfolge.
 * Wird `animateKey` geändert, bauen sich die Schritte nacheinander neu auf.
 */
export default function FlowDiagram({
  steps,
  animateKey,
  compact = false,
}: {
  steps: FlowStep[];
  animateKey?: string;
  compact?: boolean;
}) {
  const cols = compact ? "" : "md:grid-cols-4 md:gap-x-4";
  return (
    <ol key={animateKey} className={`relative grid gap-y-0 ${cols}`}>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li
            key={`${s.system}-${i}`}
            className={`row-in relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 pb-6 ${
              compact ? "" : "md:block md:pb-0"
            }`}
            style={{ animationDelay: `${i * 110}ms` }}
          >
            {/* Linie zum nächsten Schritt */}
            {!last && (
              <span
                aria-hidden
                className={`absolute left-[1.25rem] top-10 h-[calc(100%-2.5rem)] w-px bg-linear-to-b from-signal/70 to-signal/20 ${
                  compact ? "" : "md:left-12 md:right-[-1rem] md:top-5 md:h-px md:w-auto md:bg-linear-to-r"
                }`}
              />
            )}
            <span
              className={`wide relative z-10 grid h-10 w-10 place-items-center rounded-full border text-[14px] font-semibold tnum ${
                i === 0 ? "border-signal bg-signal text-night" : "border-signal/50 bg-night-2 text-signal"
              }`}
            >
              {i + 1}
            </span>
            <div className={compact ? "" : "md:mt-4 md:pr-2"}>
              <p className="font-semibold leading-snug text-white">{s.system}</p>
              <p className="mt-1 text-[15px] leading-snug text-haze">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
