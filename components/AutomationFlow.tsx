"use client";

import { useEffect, useRef, useState } from "react";
import {
  Megaphone,
  PanelsTopLeft,
  MessageSquareText,
  Bot,
  Database,
  CalendarCheck,
  Play,
  Pause,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, container, h2Class } from "./ui";
import { useAutoplay, useInView } from "@/lib/hooks";

type Step = { icon: LucideIcon; title: string; text: string; running: string; done: string };

const STEPS: Step[] = [
  {
    icon: Megaphone,
    title: "Marketing",
    text: "Eine Werbeanzeige oder ein SEO-Ergebnis erreicht einen Interessenten.",
    running: "Wird erreicht",
    done: "Erreicht",
  },
  {
    icon: PanelsTopLeft,
    title: "Landingpage",
    text: "Der Interessent gelangt auf eine passende, conversion-optimierte Seite.",
    running: "Wird aufgerufen",
    done: "Besucht",
  },
  {
    icon: MessageSquareText,
    title: "Kundenanfrage",
    text: "Ein Formular wird ausgefüllt oder eine Nachricht gesendet.",
    running: "Geht ein",
    done: "Eingegangen",
  },
  {
    icon: Bot,
    title: "KI-Agent",
    text: "Die Anfrage wird kategorisiert und anhand definierter Kriterien vorqualifiziert.",
    running: "Wird geprüft",
    done: "Vorqualifiziert",
  },
  {
    icon: Database,
    title: "CRM",
    text: "Die Daten werden – bei entsprechender Einwilligung und vorhandener Integration – übertragen und dem Vertrieb bereitgestellt.",
    running: "Wird übergeben",
    done: "Übergeben",
  },
  {
    icon: CalendarCheck,
    title: "Termin & Follow-up",
    text: "Der Interessent erhält passende Informationen oder kann einen Termin vereinbaren.",
    running: "Wird angeboten",
    done: "Angeboten",
  },
];

const STEP_MS = 3400; // Verweildauer je Station – bewusst langsam
const TRAVEL_MS = 1000; // Laufzeit des Lichtpunkts zur nächsten Station
const END = STEPS.length; // Zustand „alle Schritte abgeschlossen"

/**
 * Animierter Beispielablauf „Vom ersten Klick bis zum neuen Kunden".
 * Echtes HTML/CSS – kein Bild, kein Video. Alle Texte stehen dauerhaft im Dokument;
 * die Animation hebt nur hervor, wo der Ablauf gerade steht.
 */
export default function AutomationFlow({ tone = "white" }: { tone?: "white" | "soft" }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.25);
  const [playing, setPlaying] = useAutoplay();
  const [active, setActive] = useState(0);
  const [travel, setTravel] = useState<number | null>(null);

  useEffect(() => {
    if (!playing || !inView) return;
    let arrive: number | undefined;
    const next = window.setTimeout(() => {
      if (active >= END) {
        setActive(0);
        return;
      }
      if (active === END - 1) {
        setActive(END);
        return;
      }
      setTravel(active);
      arrive = window.setTimeout(() => {
        setTravel(null);
        setActive(active + 1);
      }, TRAVEL_MS);
    }, STEP_MS);
    return () => {
      window.clearTimeout(next);
      if (arrive) window.clearTimeout(arrive);
    };
  }, [playing, inView, active]);

  const toggle = () => {
    setTravel(null);
    if (!playing && active >= END) setActive(0);
    setPlaying(!playing);
  };

  const select = (i: number) => {
    setTravel(null);
    setActive(i);
    setPlaying(false);
  };

  const shown = Math.min(active + 1, END);

  return (
    <section
      ref={ref}
      aria-labelledby="flow-heading"
      className={`${tone === "soft" ? "bg-soft" : "bg-white"} py-20 lg:py-28`}
    >
      <div className={container}>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Eyebrow>So greift alles ineinander</Eyebrow>
            <h2 id="flow-heading" className={`mt-4 ${h2Class}`}>
              Vom ersten Klick bis zum neuen Kunden. <span className="text-teal-dark">Automatisiert.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Wir verbinden Ihre digitalen Marketing- und Vertriebsprozesse zu einem System, das
              wiederkehrende Arbeit reduziert und Kundenanfragen strukturiert verarbeitet.
            </p>
          </div>

          <div className="flex flex-none flex-wrap items-center gap-x-4 gap-y-3">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-full border border-ink/20 bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              {playing ? <Pause size={16} strokeWidth={2.2} aria-hidden /> : <Play size={16} strokeWidth={2.2} aria-hidden />}
              {playing ? "Ablauf anhalten" : "Ablauf abspielen"}
            </button>
            <p className="whitespace-nowrap text-sm text-muted">
              <span className="font-semibold text-ink">Beispielablauf</span>
              <span className="mx-1.5" aria-hidden>
                ·
              </span>
              Schritt {shown} von {END}
            </p>
          </div>
        </div>

        <ol className="mt-12 grid md:grid-cols-3 md:gap-x-5 md:gap-y-10 xl:grid-cols-6">
          {STEPS.map((s, i) => {
            const state = i < active ? "done" : i === active ? "active" : "waiting";
            const isLast = i === STEPS.length - 1;
            return (
              <li key={s.title} className="flex gap-4 md:flex-col md:gap-0">
                {/* Schiene: Station und Verbindung zur nächsten Station */}
                <div className="flex flex-col items-center md:flex-row">
                  <span
                    className={`relative z-10 grid h-12 w-12 flex-none place-items-center rounded-full border-2 transition-colors duration-500 ${
                      state === "active"
                        ? "border-teal bg-teal text-ink"
                        : state === "done"
                          ? "border-teal-dark bg-white text-teal-text"
                          : "border-line bg-white text-muted"
                    }`}
                  >
                    <s.icon size={20} strokeWidth={1.9} aria-hidden />
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className={`relative w-0.5 flex-1 bg-line md:-mr-5 md:h-0.5 md:w-auto ${
                        i === 2 ? "md:max-xl:hidden" : ""
                      }`}
                    >
                      <span
                        className={`absolute inset-0 bg-teal-dark transition-transform duration-700 max-md:origin-top md:origin-left ${
                          i < active ? "scale-100" : "max-md:scale-y-0 md:scale-x-0"
                        }`}
                      />
                      {travel === i && (
                        <span className="flow-dot absolute inset-0">
                          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal shadow-[0_0_0_5px_rgba(20,212,207,0.25)] md:left-0 md:top-1/2" />
                        </span>
                      )}
                    </span>
                  )}
                </div>

                {/* Karte */}
                <div
                  className={`relative mb-5 flex flex-1 flex-col rounded-2xl border bg-white p-5 transition-[border-color,box-shadow] duration-500 md:mb-0 md:mt-5 ${
                    state === "active"
                      ? "border-teal-dark shadow-[var(--shadow-card)]"
                      : "border-line hover:border-ink/25"
                  }`}
                >
                  <p className="text-sm font-semibold tabular-nums text-muted">Schritt {i + 1}</p>
                  <h3 className="mt-1.5 text-[1.15rem] font-bold leading-snug">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={state === "active" ? "step" : undefined}
                      className="text-left after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-teal-text"
                    >
                      {s.title}
                    </button>
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted [hyphens:auto]">{s.text}</p>
                  <p
                    className={`mt-4 flex items-center gap-2 border-t border-line pt-3 text-[13px] font-semibold ${
                      state === "waiting" ? "text-muted" : "text-teal-text"
                    }`}
                  >
                    {state === "done" && <Check size={15} strokeWidth={2.8} aria-hidden />}
                    {state === "active" && (
                      <span className="status-pulse h-2 w-2 rounded-full bg-teal-dark" aria-hidden />
                    )}
                    {state === "waiting" && <span className="h-2 w-2 rounded-full bg-line" aria-hidden />}
                    {state === "done" ? s.done : state === "active" ? s.running : "Wartet"}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Vereinfachter Beispielablauf zur Veranschaulichung – keine Live-Daten. Welche Systeme
          sich anbinden lassen, hängt von Ihren Werkzeugen ab. Personenbezogene Daten werden nur
          mit den erforderlichen Einwilligungen übertragen.
        </p>
      </div>
    </section>
  );
}
