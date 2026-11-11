"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  PenLine,
  Megaphone,
  Handshake,
  BarChart3,
  UserCheck,
  Play,
  Pause,
  RotateCcw,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, container, h2Class } from "./ui";
import { useAutoplay, useInView } from "@/lib/hooks";

type NodeKey = "seo" | "content" | "team" | "campaign" | "crm" | "analytics";

const AGENTS: Array<{ key: NodeKey; icon: LucideIcon; name: string; text: string }> = [
  {
    key: "seo",
    icon: Search,
    name: "SEO-Agent",
    text: "Analysiert Suchanfragen, Keywords, technische Probleme und Optimierungspotenziale.",
  },
  {
    key: "content",
    icon: PenLine,
    name: "Content-Agent",
    text: "Bereitet Contentideen, Briefings und Textentwürfe vor.",
  },
  {
    key: "campaign",
    icon: Megaphone,
    name: "Campaign-Agent",
    text: "Unterstützt bei Kampagnenplanung, Anzeigenentwürfen und der Analyse von Werbemaßnahmen.",
  },
  {
    key: "crm",
    icon: Handshake,
    name: "CRM-Agent",
    text: "Unterstützt bei der strukturierten Bearbeitung und Nachverfolgung von Kundenanfragen.",
  },
  {
    key: "analytics",
    icon: BarChart3,
    name: "Analytics-Agent",
    text: "Fasst Ergebnisse zusammen und erkennt Optimierungspotenziale.",
  },
];

/* Beispielprozess – veranschaulicht das Zusammenspiel, bildet keine Live-Daten ab */
const PROCESS: Array<{ node: NodeKey; text: string; running: string; done: string }> = [
  { node: "seo", text: "SEO-Agent analysiert Keywords", running: "Analyse läuft", done: "Analyse abgeschlossen" },
  {
    node: "content",
    text: "Content-Agent erstellt einen Entwurf",
    running: "Entwurf in Arbeit",
    done: "Entwurf erstellt",
  },
  {
    node: "team",
    text: "Ein Mitarbeiter prüft und genehmigt den Inhalt",
    running: "Freigabe erforderlich",
    done: "Freigegeben",
  },
  {
    node: "campaign",
    text: "Campaign-Agent bereitet eine Kampagne vor",
    running: "In Vorbereitung",
    done: "Kampagne vorbereitet",
  },
  {
    node: "analytics",
    text: "Analytics-Agent wertet die Ergebnisse aus",
    running: "Auswertung läuft",
    done: "Bericht aktualisiert",
  },
];

/* Anordnung im Schaubild (Prozent der Fläche), Zentrum bei 50 / 50 */
const NODES: Array<{ key: NodeKey; icon: LucideIcon; name: string; idle: string; x: number; y: number }> = [
  { key: "team", icon: UserCheck, name: "Ihr Team", idle: "Strategie & Freigaben", x: 50, y: 12 },
  { key: "content", icon: PenLine, name: "Content-Agent", idle: "Bereit", x: 83, y: 31 },
  { key: "campaign", icon: Megaphone, name: "Campaign-Agent", idle: "Bereit", x: 83, y: 69 },
  { key: "analytics", icon: BarChart3, name: "Analytics-Agent", idle: "Bereit", x: 50, y: 88 },
  { key: "crm", icon: Handshake, name: "CRM-Agent", idle: "Bereit", x: 17, y: 69 },
  { key: "seo", icon: Search, name: "SEO-Agent", idle: "Bereit", x: 17, y: 31 },
];

const STEP_MS = 3000;
const HOLD_MS = 4200;
const END = PROCESS.length;

type State = "idle" | "active" | "done";

function nodeState(key: NodeKey, step: number): { state: State; label: string | null } {
  const idx = PROCESS.findIndex((p) => p.node === key);
  if (idx === -1 || idx > step) return { state: "idle", label: null };
  if (idx === step) return { state: "active", label: PROCESS[idx].running };
  return { state: "done", label: PROCESS[idx].done };
}

function DiagramNode({ node, step }: { node: (typeof NODES)[number]; step: number }) {
  const { state, label } = nodeState(node.key, step);
  return (
    <div
      className={`h-full w-full rounded-2xl border px-3 py-3 transition-colors duration-500 md:px-3.5 ${
        state === "active"
          ? "border-teal bg-[#123152]"
          : state === "done"
            ? "border-teal/45 bg-ink-soft"
            : "border-white/15 bg-ink-soft"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`grid h-8 w-8 flex-none place-items-center rounded-full transition-colors duration-500 ${
            state === "active" ? "bg-teal text-ink" : "bg-white/10 text-teal"
          }`}
        >
          <node.icon size={16} strokeWidth={1.9} />
        </span>
        <span className="text-[13.5px] font-semibold leading-tight text-white md:whitespace-nowrap md:text-[14px]">{node.name}</span>
      </div>
      <p
        className={`mt-2 flex min-h-4 items-center gap-1.5 text-[12px] font-medium leading-tight md:h-4 md:whitespace-nowrap ${
          state === "idle" ? "text-white/55" : "text-teal"
        }`}
      >
        {state === "active" && <span className="status-pulse h-1.5 w-1.5 flex-none rounded-full bg-teal" />}
        {state === "done" && <Check size={13} strokeWidth={3} className="flex-none" />}
        {label ?? node.idle}
      </p>
    </div>
  );
}

function Hub({ className }: { className: string }) {
  return (
    <div
      className={`grid place-items-center rounded-full border border-teal/45 bg-ink text-center shadow-[0_0_0_10px_rgba(20,212,207,0.07)] ${className}`}
    >
      <p className="px-4">
        <span className="block font-[family-name:var(--font-display)] text-[1.35rem] font-bold tracking-[-0.03em] text-white">
          Qonte<span className="text-teal">X</span>
        </span>
        <span className="mt-1 block text-[13px] font-medium leading-snug text-white/75">
          Marketing
          <br />
          Automation
        </span>
      </p>
    </div>
  );
}

/**
 * „Ihr digitales Marketing-Team": Schaubild mit zentraler Steuerung, fünf Agenten und
 * dem Team des Kunden für Freigaben. Der Beispielprozess läuft Schritt für Schritt,
 * lässt sich anhalten und neu starten und ist ausdrücklich als Beispiel gekennzeichnet.
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

  const activeKey = step < END ? PROCESS[step].node : null;

  return (
    <section ref={ref} aria-labelledby="team-heading" className="bg-ink py-20 lg:py-28">
      <div className={container}>
        <div className="max-w-3xl">
          <Eyebrow onDark>KI-Agenten im Marketing</Eyebrow>
          <h2 id="team-heading" className={`mt-4 ${h2Class} text-white`}>
            Ihr digitales Marketing-Team. <span className="text-teal">Intelligent automatisiert.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/75">
            Spezialisierte KI-Agenten unterstützen Ihre Marketingprozesse – von der Recherche bis
            zur Auswertung. Ihr Team behält die Kontrolle über Strategie und Freigaben.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          {/* Schaubild */}
          <div className="flex flex-col justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-8">
            <p className="sr-only">
              Schaubild: Im Zentrum steht QonteX Marketing Automation. Darum angeordnet sind
              SEO-Agent, Content-Agent, Campaign-Agent, CRM-Agent und Analytics-Agent sowie Ihr
              Team, das Strategie und Freigaben verantwortet.
            </p>

            {/* ab Tablet: Agenten rund um das Zentrum */}
            <div aria-hidden className="relative mx-auto hidden aspect-[10/9] w-full max-w-[680px] md:block">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                {NODES.map((n) => {
                  const { state } = nodeState(n.key, step);
                  return (
                    <line
                      key={n.key}
                      x1={50}
                      y1={50}
                      x2={n.x}
                      y2={n.y}
                      vectorEffect="non-scaling-stroke"
                      strokeLinecap="round"
                      strokeWidth={state === "active" ? 2 : 1.5}
                      stroke={
                        state === "active"
                          ? "#14d4cf"
                          : state === "done"
                            ? "rgba(20,212,207,0.5)"
                            : "rgba(255,255,255,0.18)"
                      }
                      strokeDasharray={state === "active" ? "6 6" : undefined}
                      className={state === "active" ? "line-flow" : undefined}
                    />
                  );
                })}
              </svg>
              <Hub className="absolute left-1/2 top-1/2 h-[9.5rem] w-[9.5rem] -translate-x-1/2 -translate-y-1/2" />
              {NODES.map((n) => (
                <div
                  key={n.key}
                  className="absolute w-[11.5rem] -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <DiagramNode node={n} step={step} />
                </div>
              ))}
            </div>

            {/* Smartphone: Zentrum oben, Agenten darunter */}
            <div aria-hidden className="mx-auto w-full max-w-md md:hidden">
              <Hub className="mx-auto h-36 w-36" />
              <span className="mx-auto block h-6 w-px bg-white/20" />
              <div className="grid grid-cols-2 gap-2.5">
                {NODES.map((n) => (
                  <DiagramNode key={n.key} node={n} step={step} />
                ))}
              </div>
            </div>
          </div>

          {/* Beispielprozess */}
          <div className="flex flex-col rounded-3xl border border-white/10 bg-ink-soft p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">Beispielprozess</h3>
                <p className="mt-0.5 text-sm text-white/60">So kann die Zusammenarbeit ablaufen</p>
              </div>
              <div className="flex flex-none items-center gap-2">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? "Beispielprozess anhalten" : "Beispielprozess abspielen"}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white/70"
                >
                  {playing ? <Pause size={17} strokeWidth={2.2} aria-hidden /> : <Play size={17} strokeWidth={2.2} aria-hidden />}
                </button>
                <button
                  type="button"
                  onClick={restart}
                  aria-label="Beispielprozess neu starten"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition-colors hover:border-white/70"
                >
                  <RotateCcw size={17} strokeWidth={2.2} aria-hidden />
                </button>
              </div>
            </div>

            <ol className="mt-5 flex-1 space-y-2">
              {PROCESS.map((p, i) => {
                const state: State = i < step ? "done" : i === step ? "active" : "idle";
                return (
                  <li
                    key={p.text}
                    aria-current={state === "active" ? "step" : undefined}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 transition-colors duration-500 ${
                      state === "active" ? "border-teal/60 bg-white/[0.06]" : "border-white/10"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full text-xs font-semibold ${
                        state === "done"
                          ? "bg-teal text-ink"
                          : state === "active"
                            ? "border border-teal text-teal"
                            : "border border-white/25 text-white/60"
                      }`}
                    >
                      {state === "done" ? <Check size={13} strokeWidth={3} aria-hidden /> : i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-[15px] font-medium leading-snug ${
                          state === "idle" ? "text-white/70" : "text-white"
                        }`}
                      >
                        {p.text}
                      </p>
                      <p
                        className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          state === "done"
                            ? "bg-teal/15 text-teal"
                            : state === "active"
                              ? "border border-teal/50 text-teal"
                              : "border border-white/15 text-white/55"
                        }`}
                      >
                        {state === "active" && (
                          <span className="status-pulse h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
                        )}
                        {state === "done" ? p.done : state === "active" ? p.running : "Ausstehend"}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>

            <p className="mt-5 text-[13px] leading-relaxed text-white/60">
              Beispielprozess zur Veranschaulichung – keine Live-Daten, keine tatsächlich
              ausgeführten Aktionen. Veröffentlichungen und Kampagnenstarts erfolgen nur nach
              Freigabe durch Ihr Team.
            </p>
          </div>
        </div>

        {/* Die fünf Agenten im Überblick */}
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AGENTS.map((a) => (
            <li
              key={a.key}
              className={`rounded-2xl border p-5 transition-colors duration-500 ${
                activeKey === a.key ? "border-teal/60 bg-white/[0.06]" : "border-white/10 bg-white/[0.03]"
              }`}
            >
              <a.icon size={22} strokeWidth={1.8} className="text-teal" aria-hidden />
              <h3 className="mt-4 text-[1.05rem] font-bold text-white">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{a.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
