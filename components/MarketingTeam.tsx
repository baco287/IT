"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, RotateCcw, Check } from "lucide-react";
import { container, h2Class } from "./ui";
import { useAutoplay, useInView } from "@/lib/hooks";

type Member = {
  name: string;
  text: string;
  /* Statustexte im Beispielprozess. Ohne diese Angaben kommt das Mitglied im Beispiel nicht vor. */
  running?: string;
  done?: string;
};

/* Reihenfolge = Ablauf des Beispielprozesses. Der CRM-Agent gehört zum Team,
   ist am Beispiel aber nicht beteiligt und steht deshalb ohne Nummer am Ende. */
const TEAM: Member[] = [
  {
    name: "SEO-Agent",
    text: "Analysiert Suchanfragen, Keywords, technische Probleme und Optimierungspotenziale.",
    running: "Analyse läuft",
    done: "Analyse abgeschlossen",
  },
  {
    name: "Content-Agent",
    text: "Bereitet Contentideen, Briefings und Textentwürfe vor.",
    running: "Entwurf in Arbeit",
    done: "Entwurf erstellt",
  },
  {
    name: "Ihr Team",
    text: "Prüft und genehmigt die Inhalte. Strategie und Freigaben bleiben bei Ihnen.",
    running: "Freigabe erforderlich",
    done: "Freigegeben",
  },
  {
    name: "Campaign-Agent",
    text: "Unterstützt bei Kampagnenplanung, Anzeigenentwürfen und der Analyse von Werbemaßnahmen.",
    running: "In Vorbereitung",
    done: "Kampagne vorbereitet",
  },
  {
    name: "Analytics-Agent",
    text: "Fasst Ergebnisse zusammen und erkennt Optimierungspotenziale.",
    running: "Auswertung läuft",
    done: "Bericht aktualisiert",
  },
  {
    name: "CRM-Agent",
    text: "Unterstützt bei der strukturierten Bearbeitung und Nachverfolgung von Kundenanfragen.",
  },
];

const STEP_MS = 3000;
const HOLD_MS = 4200;
const END = TEAM.filter((m) => m.running).length;

const controlBtn =
  "grid h-11 w-11 place-items-center rounded-md border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10";

/**
 * „Ihr digitales Marketing-Team": eine Liste statt eines Schaubilds. Jede Zeile nennt ein
 * Teammitglied, seine Aufgabe und den Stand im Beispielprozess. Der Prozess läuft Zeile
 * für Zeile durch, lässt sich anhalten und neu starten und ist als Beispiel gekennzeichnet.
 */
export default function MarketingTeam() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, 0.2);
  const [playing, setPlaying] = useAutoplay();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!playing || !inView) return;
    const t = window.setTimeout(
      () => setStep(step >= END ? 0 : step + 1),
      step >= END ? HOLD_MS : STEP_MS,
    );
    return () => window.clearTimeout(t);
  }, [playing, inView, step]);

  const toggle = () => {
    if (!playing && step >= END) setStep(0);
    setPlaying(!playing);
  };
  const restart = () => {
    setStep(0);
    setPlaying(true);
  };

  return (
    <section ref={ref} aria-labelledby="team-heading" className="bg-ink py-20 lg:py-28">
      <div className={container}>
        <div className="max-w-3xl">
          <h2 id="team-heading" className={`${h2Class} text-white`}>
            Ihr digitales Marketing-Team. Intelligent automatisiert.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Spezialisierte KI-Agenten unterstützen Ihre Marketingprozesse – von der Recherche bis
            zur Auswertung. Ihr Team behält die Kontrolle über Strategie und Freigaben.
          </p>
        </div>

        <div className="mt-12 flex items-end justify-between gap-6 pb-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold leading-tight text-white">
              Beispielprozess
            </p>
            <p className="mt-1 text-[15px] text-white/65">So kann die Zusammenarbeit ablaufen</p>
          </div>
          <div className="flex flex-none items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? "Beispielprozess anhalten" : "Beispielprozess abspielen"}
              className={controlBtn}
            >
              {playing ? (
                <Pause size={17} strokeWidth={2.2} aria-hidden />
              ) : (
                <Play size={17} strokeWidth={2.2} aria-hidden />
              )}
            </button>
            <button type="button" onClick={restart} aria-label="Beispielprozess neu starten" className={controlBtn}>
              <RotateCcw size={17} strokeWidth={2.2} aria-hidden />
            </button>
          </div>
        </div>

        <ul className="border-t-2 border-white">
          {TEAM.map((m, i) => {
            const inProcess = Boolean(m.running);
            const state = !inProcess ? "none" : i < step ? "done" : i === step ? "active" : "idle";
            return (
              <li
                key={m.name}
                aria-current={state === "active" ? "step" : undefined}
                className="border-b border-white/15"
              >
                <div
                  className={`-mx-3 grid grid-cols-[2.5rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-1.5 px-3 py-6 transition-colors duration-500 lg:grid-cols-[3.5rem_minmax(0,0.75fr)_minmax(0,1.25fr)_14rem] lg:gap-x-8 ${
                    state === "active" ? "bg-white/[0.07]" : ""
                  }`}
                >
                  <span
                    aria-hidden={!inProcess}
                    className="font-[family-name:var(--font-display)] text-[1.25rem] font-bold tabular-nums text-white/45 lg:text-[1.5rem]"
                  >
                    {inProcess ? `0${i + 1}` : ""}
                  </span>
                  <h3 className="text-[1.5rem] leading-[1.1] text-white lg:text-[1.9rem]">{m.name}</h3>
                  <p className="col-start-2 text-[16px] leading-relaxed text-white/70 lg:col-start-auto">
                    {m.text}
                  </p>
                  <p
                    className={`col-start-2 flex items-center gap-2 text-[15px] font-semibold lg:col-start-auto ${
                      state === "active" || state === "done" ? "text-teal" : "text-white/55"
                    }`}
                  >
                    {state === "active" && (
                      <span className="status-pulse h-2 w-2 flex-none rounded-full bg-teal" aria-hidden />
                    )}
                    {state === "done" && <Check size={16} strokeWidth={3} className="flex-none" aria-hidden />}
                    {state === "done"
                      ? m.done
                      : state === "active"
                        ? m.running
                        : state === "idle"
                          ? "Ausstehend"
                          : "Nicht Teil dieses Beispiels"}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 max-w-3xl text-[14px] leading-relaxed text-white/65">
          Beispielprozess zur Veranschaulichung – keine Live-Daten, keine tatsächlich
          ausgeführten Aktionen. Veröffentlichungen und Kampagnenstarts erfolgen nur nach
          Freigabe durch Ihr Team.
        </p>
      </div>
    </section>
  );
}
