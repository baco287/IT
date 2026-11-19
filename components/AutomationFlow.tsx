"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Check } from "lucide-react";
import { container, h2Class } from "./ui";
import { useAutoplay, useInView } from "@/lib/hooks";

type Step = { title: string; text: string; running: string; done: string };

const STEPS: Step[] = [
  {
    title: "Marketing",
    text: "Eine Werbeanzeige oder ein SEO-Ergebnis erreicht einen Interessenten.",
    running: "Wird erreicht",
    done: "Erreicht",
  },
  {
    title: "Landingpage",
    text: "Der Interessent gelangt auf eine passende, conversion-optimierte Seite.",
    running: "Wird aufgerufen",
    done: "Besucht",
  },
  {
    title: "Kundenanfrage",
    text: "Ein Formular wird ausgefüllt oder eine Nachricht gesendet.",
    running: "Geht ein",
    done: "Eingegangen",
  },
  {
    title: "KI-Agent",
    text: "Die Anfrage wird kategorisiert und anhand definierter Kriterien vorqualifiziert.",
    running: "Wird geprüft",
    done: "Vorqualifiziert",
  },
  {
    title: "CRM",
    text: "Die Daten werden – bei entsprechender Einwilligung und vorhandener Integration – übertragen und dem Vertrieb bereitgestellt.",
    running: "Wird übergeben",
    done: "Übergeben",
  },
  {
    title: "Termin & Follow-up",
    text: "Der Interessent erhält passende Informationen oder kann einen Termin vereinbaren.",
    running: "Wird angeboten",
    done: "Angeboten",
  },
];

const STEP_MS = 3400; // Verweildauer je Station – bewusst langsam
const END = STEPS.length; // Zustand „alle Schritte abgeschlossen"

/**
 * Beispielablauf „Vom ersten Klick bis zum neuen Kunden" als sechs Spalten.
 * Die Linie über jeder Spalte ist die Schiene: Sie füllt sich, sobald der Schritt
 * erreicht ist. Echtes HTML/CSS – alle Texte stehen dauerhaft im Dokument, die
 * Animation hebt nur hervor, wo der Ablauf gerade steht.
 */
export default function AutomationFlow() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.25);
  const [playing, setPlaying] = useAutoplay();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!playing || !inView) return;
    const t = window.setTimeout(() => setActive(active >= END ? 0 : active + 1), STEP_MS);
    return () => window.clearTimeout(t);
  }, [playing, inView, active]);

  const toggle = () => {
    if (!playing && active >= END) setActive(0);
    setPlaying(!playing);
  };

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  const shown = Math.min(active + 1, END);

  return (
    <section ref={ref} aria-labelledby="flow-heading" className="bg-white">
      <div className={container}>
        <div className="border-t border-ink/15 py-16 lg:py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 id="flow-heading" className={h2Class}>
                Vom ersten Klick bis zum neuen Kunden. Automatisiert.
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
                className="inline-flex min-h-11 items-center gap-2.5 whitespace-nowrap rounded-md border-2 border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                {playing ? (
                  <Pause size={16} strokeWidth={2.2} aria-hidden />
                ) : (
                  <Play size={16} strokeWidth={2.2} aria-hidden />
                )}
                {playing ? "Ablauf anhalten" : "Ablauf abspielen"}
              </button>
              <p className="whitespace-nowrap text-sm text-muted">
                <span className="font-semibold text-ink">Beispielablauf</span>, Schritt {shown} von {END}
              </p>
            </div>
          </div>

          <ol className="mt-12 grid gap-x-6 gap-y-9 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
            {STEPS.map((s, i) => {
              const state = i < active ? "done" : i === active ? "active" : "waiting";
              return (
                <li key={s.title} className="relative pt-5">
                  {/* Schiene: füllt sich, sobald der Schritt erreicht ist */}
                  <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-ink/15">
                    <span
                      className={`absolute inset-0 origin-left transition-transform duration-700 motion-reduce:transition-none ${
                        state === "waiting" ? "scale-x-0" : "scale-x-100"
                      } ${state === "active" ? "bg-ink" : "bg-teal-dark"}`}
                    />
                  </span>
                  <span
                    aria-hidden
                    className={`font-[family-name:var(--font-display)] text-[1.6rem] font-bold leading-none tabular-nums transition-colors duration-500 ${
                      state === "waiting" ? "text-ink/35" : "text-ink"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 text-[1.25rem] leading-snug">
                    <button
                      type="button"
                      onClick={() => select(i)}
                      aria-current={state === "active" ? "step" : undefined}
                      className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-teal-text"
                    >
                      <span className="sr-only">Schritt {i + 1}: </span>
                      {s.title}
                    </button>
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted [hyphens:auto]">{s.text}</p>
                  <p
                    className={`mt-3 flex items-center gap-2 text-[14px] font-semibold ${
                      state === "waiting" ? "text-muted" : "text-teal-text"
                    }`}
                  >
                    {state === "done" && <Check size={15} strokeWidth={2.8} aria-hidden />}
                    {state === "active" && (
                      <span className="status-pulse h-2 w-2 rounded-full bg-teal-dark" aria-hidden />
                    )}
                    {state === "done" ? s.done : state === "active" ? s.running : "Wartet"}
                  </p>
                </li>
              );
            })}
          </ol>

          <p className="mt-9 max-w-3xl text-sm leading-relaxed text-muted">
            Vereinfachter Beispielablauf zur Veranschaulichung – keine Live-Daten. Welche Systeme
            sich anbinden lassen, hängt von Ihren Werkzeugen ab. Personenbezogene Daten werden nur
            mit den erforderlichen Einwilligungen übertragen.
          </p>
        </div>
      </div>
    </section>
  );
}
