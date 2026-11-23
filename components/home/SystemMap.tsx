"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bot,
  CalendarDays,
  Database,
  Globe,
  Mail,
  Pause,
  Phone,
  Play,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useInView } from "@/lib/hooks";

/* ------------------------------------------------------------------ Daten */
type NodeId = "website" | "email" | "telefon" | "agent" | "auto" | "crm" | "kalender" | "db";

const NODES: Record<NodeId, { label: string; idle: string; icon: LucideIcon }> = {
  website: { label: "Website", idle: "Formular", icon: Globe },
  email: { label: "E-Mail", idle: "Postfach", icon: Mail },
  telefon: { label: "Telefon", idle: "Anrufe", icon: Phone },
  agent: { label: "KI-Agent", idle: "versteht Anliegen", icon: Bot },
  auto: { label: "Automatisierung", idle: "führt Schritte aus", icon: Workflow },
  crm: { label: "CRM", idle: "Kontakte", icon: Users },
  kalender: { label: "Kalender", idle: "Termine", icon: CalendarDays },
  db: { label: "Datenbank", idle: "Kunden, Aufträge", icon: Database },
};

type Scenario = {
  id: string;
  label: string;
  /** kurzer Name für schmale Bildschirme */
  short: string;
  /** Eingang → KI-Agent → Automatisierung → zwei Ziele */
  path: [NodeId, "agent", "auto", NodeId, NodeId];
  status: Partial<Record<NodeId, string>>;
  log: Array<{ time: string; system: string; text: string }>;
};

const SCENARIOS: Scenario[] = [
  {
    id: "anfrage",
    label: "Website-Anfrage",
    short: "Anfrage",
    path: ["website", "agent", "auto", "crm", "kalender"],
    status: {
      website: "Neue Anfrage",
      agent: "Angebotsanfrage erkannt",
      auto: "Ablauf gestartet",
      crm: "Kontakt angelegt",
      kalender: "Rückruf geplant",
    },
    log: [
      { time: "09:14:02", system: "Website", text: "Anfrage über das Kontaktformular eingegangen" },
      { time: "09:14:03", system: "KI-Agent", text: "Anliegen erkannt: Angebot für einen Wartungsvertrag" },
      { time: "09:14:03", system: "Automatisierung", text: "Ablauf „Neue Anfrage“ gestartet" },
      { time: "09:14:04", system: "CRM", text: "Kontakt angelegt und dem Vertrieb zugewiesen" },
      { time: "09:14:04", system: "Kalender", text: "Rückruf für morgen, 10:00 Uhr vorgeschlagen" },
    ],
  },
  {
    id: "auftrag",
    label: "Auftrag per E-Mail",
    short: "Auftrag",
    path: ["email", "agent", "auto", "db", "crm"],
    status: {
      email: "Neue Bestellung",
      agent: "3 Positionen ausgelesen",
      auto: "Auftrag angelegt",
      db: "Auftrag erfasst",
      crm: "Historie ergänzt",
    },
    log: [
      { time: "11:02:17", system: "E-Mail", text: "Bestellung mit PDF-Anhang eingegangen" },
      { time: "11:02:19", system: "KI-Agent", text: "Drei Positionen und Liefertermin ausgelesen" },
      { time: "11:02:19", system: "Automatisierung", text: "Auftrag angelegt, Bestätigung an den Kunden versendet" },
      { time: "11:02:20", system: "Datenbank", text: "Auftrag mit allen Positionen gespeichert" },
      { time: "11:02:20", system: "CRM", text: "Kundenhistorie ergänzt" },
    ],
  },
  {
    id: "anruf",
    label: "Anruf am Abend",
    short: "Anruf",
    path: ["telefon", "agent", "auto", "kalender", "crm"],
    status: {
      telefon: "Anruf um 18:47",
      agent: "Terminwunsch erkannt",
      auto: "Freie Zeiten geprüft",
      kalender: "Termin gebucht",
      crm: "Notiz gespeichert",
    },
    log: [
      { time: "18:47:05", system: "Telefon", text: "Anruf außerhalb der Geschäftszeit angenommen" },
      { time: "18:47:41", system: "KI-Agent", text: "Terminwunsch erkannt: Beratung in der nächsten Woche" },
      { time: "18:47:42", system: "Automatisierung", text: "Freie Zeiten im Kalender abgefragt" },
      { time: "18:48:10", system: "Kalender", text: "Termin am Dienstag, 14:30 Uhr gebucht" },
      { time: "18:48:11", system: "CRM", text: "Gesprächsnotiz beim Kontakt gespeichert" },
    ],
  },
];

/* --------------------------------------------------------------- Geometrie */
type Box = { x: number; y: number; w: number; h: number };
type Layout = {
  width: number;
  height: number;
  boxes: Record<NodeId, Box>;
  edge: (from: NodeId, to: NodeId) => string;
  showStatus: boolean;
};

const INPUTS: NodeId[] = ["website", "email", "telefon"];
const OUTPUTS: NodeId[] = ["crm", "kalender", "db"];

/* Breit (ab Tablet): Eingänge links, KI und Automatisierung in der Mitte, Ziele rechts */
const WIDE: Layout = (() => {
  const io = { w: 172, h: 60 };
  const mid = { w: 212, h: 66 };
  const boxes = {
    website: { x: 88, y: 62, ...io },
    email: { x: 88, y: 204, ...io },
    telefon: { x: 88, y: 346, ...io },
    agent: { x: 350, y: 136, ...mid },
    auto: { x: 350, y: 272, ...mid },
    crm: { x: 612, y: 62, ...io },
    kalender: { x: 612, y: 204, ...io },
    db: { x: 612, y: 346, ...io },
  } satisfies Record<NodeId, Box>;
  const edge = (from: NodeId, to: NodeId) => {
    const a = boxes[from];
    const b = boxes[to];
    if (from === "agent" && to === "auto") return `M ${a.x} ${a.y + a.h / 2} L ${b.x} ${b.y - b.h / 2}`;
    const x1 = a.x + a.w / 2;
    const x2 = b.x - b.w / 2;
    const dx = (x2 - x1) * 0.55;
    return `M ${x1} ${a.y} C ${x1 + dx} ${a.y}, ${x2 - dx} ${b.y}, ${x2} ${b.y}`;
  };
  return { width: 700, height: 408, boxes, edge, showStatus: true };
})();

/* Schmal (Handy): Eingänge oben, Ziele unten */
const TALL: Layout = (() => {
  const io = { w: 104, h: 48 };
  const mid = { w: 196, h: 54 };
  const boxes = {
    website: { x: 60, y: 30, ...io },
    email: { x: 180, y: 30, ...io },
    telefon: { x: 300, y: 30, ...io },
    agent: { x: 180, y: 146, ...mid },
    auto: { x: 180, y: 250, ...mid },
    crm: { x: 60, y: 366, ...io },
    kalender: { x: 180, y: 366, ...io },
    db: { x: 300, y: 366, ...io },
  } satisfies Record<NodeId, Box>;
  const edge = (from: NodeId, to: NodeId) => {
    const a = boxes[from];
    const b = boxes[to];
    const y1 = a.y + a.h / 2;
    const y2 = b.y - b.h / 2;
    if (a.x === b.x) return `M ${a.x} ${y1} L ${b.x} ${y2}`;
    const dy = (y2 - y1) * 0.55;
    return `M ${a.x} ${y1} C ${a.x} ${y1 + dy}, ${b.x} ${y2 - dy}, ${b.x} ${y2}`;
  };
  return { width: 360, height: 396, boxes, edge, showStatus: false };
})();

const ALL_EDGES: Array<[NodeId, NodeId]> = [
  ...INPUTS.map((n) => [n, "agent"] as [NodeId, NodeId]),
  ["agent", "auto"],
  ...OUTPUTS.map((n) => ["auto", n] as [NodeId, NodeId]),
];

/* Schritt k aktiviert die Verbindung zu path[k]: Eingang → Agent → Automatisierung → Ziel 1 → Ziel 2 */
function edgeOfStep(path: Scenario["path"], k: number): [NodeId, NodeId] | null {
  if (k === 1) return [path[0], "agent"];
  if (k === 2) return ["agent", "auto"];
  if (k === 3) return ["auto", path[3]];
  if (k === 4) return ["auto", path[4]];
  return null;
}

/* ----------------------------------------------------------- Datenpaket */
/* Ein heller Punkt wandert entlang der gerade aktiven Verbindung. */
function Packet({ d, duration = 760 }: { d: string; duration?: number }) {
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    // Das jeweils ausgeblendete Diagramm (Handy bzw. Desktop) bekommt keine Animation
    if (!path.ownerSVGElement || path.ownerSVGElement.getBoundingClientRect().width === 0) return;
    const length = path.getTotalLength();
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      const pt = path.getPointAtLength(eased * length);
      dot.setAttribute("cx", pt.x.toFixed(1));
      dot.setAttribute("cy", pt.y.toFixed(1));
      dot.setAttribute("opacity", p < 1 ? "1" : "0");
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [d, duration]);

  return (
    <g>
      <path ref={pathRef} d={d} fill="none" stroke="none" />
      <circle ref={dotRef} r={4.5} opacity={0} className="fill-white" />
    </g>
  );
}

/* ------------------------------------------------------------ Diagramm */
function Diagram({
  layout,
  scenario,
  step,
  animate,
  className,
}: {
  layout: Layout;
  scenario: Scenario;
  step: number;
  animate: boolean;
  className: string;
}) {
  const { boxes, edge } = layout;
  const reachedNodes = new Set(scenario.path.filter((_, i) => i <= step));
  const currentNode = step >= 0 && step < scenario.path.length ? scenario.path[step] : null;
  const reachedEdges = new Map<string, number>();
  for (let k = 1; k <= Math.min(step, 4); k++) {
    const e = edgeOfStep(scenario.path, k);
    if (e) reachedEdges.set(`${e[0]}-${e[1]}`, k);
  }

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id={`qx-core-${layout.width}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--color-signal-deep)" />
          <stop offset="1" stopColor="var(--color-signal)" />
        </linearGradient>
      </defs>

      {/* Alle möglichen Verbindungen – gestrichelt, solange sie ungenutzt sind */}
      {ALL_EDGES.map(([from, to]) => (
        <path
          key={`base-${from}-${to}`}
          d={edge(from, to)}
          fill="none"
          className="stroke-edge"
          strokeWidth={1.5}
          strokeDasharray="3 6"
        />
      ))}

      {/* Genutzte Verbindungen des aktuellen Ablaufs */}
      {ALL_EDGES.map(([from, to]) => {
        const id = `${from}-${to}`;
        const k = reachedEdges.get(id);
        if (k === undefined) return null;
        const isCurrent = k === step;
        return (
          <path
            key={`${scenario.id}-${id}`}
            d={edge(from, to)}
            pathLength={1}
            fill="none"
            strokeWidth={isCurrent ? 2 : 1.6}
            strokeOpacity={isCurrent ? 1 : 0.55}
            strokeLinecap="round"
            className={`stroke-signal ${animate && isCurrent ? "edge-draw" : ""}`}
          />
        );
      })}

      {/* Datenpaket auf der aktiven Verbindung */}
      {animate &&
        (() => {
          const e = edgeOfStep(scenario.path, step);
          return e ? <Packet key={`${scenario.id}-${step}`} d={edge(e[0], e[1])} /> : null;
        })()}

      {/* Systeme */}
      {(Object.keys(boxes) as NodeId[]).map((id) => {
        const b = boxes[id];
        const node = NODES[id];
        const Icon = node.icon;
        const reached = reachedNodes.has(id);
        const isCurrent = currentNode === id;
        const isCore = id === "agent" || id === "auto";
        const status = reached ? scenario.status[id] : undefined;
        const left = b.x - b.w / 2;
        const top = b.y - b.h / 2;
        const iconSize = layout.showStatus ? 19 : 16;
        const textX = layout.showStatus ? left + 44 : b.x;

        return (
          <g key={id}>
            {isCurrent && animate && (
              <rect
                x={left - 5}
                y={top - 5}
                width={b.w + 10}
                height={b.h + 10}
                rx={15}
                fill="none"
                strokeWidth={6}
                className="node-pulse stroke-signal"
              />
            )}
            <rect
              x={left}
              y={top}
              width={b.w}
              height={b.h}
              rx={11}
              stroke={isCore && reached ? `url(#qx-core-${layout.width})` : undefined}
              strokeOpacity={reached && !isCurrent && !isCore ? 0.7 : 1}
              strokeWidth={isCore ? 1.6 : 1.3}
              className={`${isCore ? "fill-core" : "fill-night-2"} ${
                isCore && reached ? "" : reached ? "stroke-signal" : "stroke-edge-strong"
              }`}
            />
            {layout.showStatus ? (
              <>
                <Icon
                  x={left + 14}
                  y={b.y - iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                  strokeWidth={1.8}
                  className={reached ? "text-signal" : "text-dim"}
                />
                <text x={textX} y={b.y - 3} fontSize={16} fontWeight={600} className={reached ? "fill-white" : "fill-mist"}>
                  {node.label}
                </text>
                <text
                  x={textX}
                  y={b.y + 16}
                  fontSize={13.5}
                  className={`narrow ${status ? "fill-signal" : "fill-dim"}`}
                >
                  {status ?? node.idle}
                </text>
              </>
            ) : (
              <>
                <Icon
                  x={b.x - iconSize / 2}
                  y={top + 8}
                  width={iconSize}
                  height={iconSize}
                  strokeWidth={1.8}
                  className={reached ? "text-signal" : "text-dim"}
                />
                <text
                  x={b.x}
                  y={top + b.h - 9}
                  fontSize={isCore ? 13.5 : 12.5}
                  fontWeight={600}
                  textAnchor="middle"
                  className={reached ? "fill-white" : "fill-mist"}
                >
                  {node.label}
                </text>
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------- Steuerung */
const STEP_MS = 1150;
const HOLD_MS = 3000;
const DONE = 5;

export default function SystemMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.2);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);
  /* Hat jemand selbst einen Ablauf gewählt, bleibt dieser nach dem Durchlauf stehen */
  const [picked, setPicked] = useState(false);

  // Reduzierte Bewegung: fertigen Zustand zeigen, nichts läuft von selbst –
  // auch wenn die Einstellung während des Besuchs geändert wird
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(mq.matches);
      if (mq.matches) {
        setPlaying(false);
        setStep(DONE);
      } else {
        setPlaying(true);
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Taktgeber: nur, solange die Karte sichtbar ist und abgespielt wird
  useEffect(() => {
    if (!playing || !inView) return;
    if (picked && step >= DONE) return;
    const delay = step === -1 ? 700 : step >= DONE ? HOLD_MS : STEP_MS;
    const t = window.setTimeout(() => {
      if (step >= DONE) {
        setScenarioIndex((i) => (i + 1) % SCENARIOS.length);
        setStep(0);
      } else {
        setStep((s) => s + 1);
      }
    }, delay);
    return () => window.clearTimeout(t);
  }, [playing, inView, step, picked]);

  const scenario = SCENARIOS[scenarioIndex];
  const animate = playing && !reduced && inView;
  const visibleStep = Math.min(step, 4);
  const latest = visibleStep >= 0 ? scenario.log[visibleStep] : null;

  const choose = (i: number) => {
    setPicked(true);
    setScenarioIndex(i);
    setStep(playing && !reduced ? 0 : DONE);
  };

  return (
    <div ref={ref} className="relative min-w-0">
      <div className="glow-signal pointer-events-none absolute left-1/2 top-[42%] -z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2" aria-hidden />

      <figure
        aria-labelledby="systemkarte-titel"
        className="relative rounded-[20px] border border-edge bg-night-2 p-4 sm:p-6"
      >
        <figcaption id="systemkarte-titel" className="sr-only">
          Beispielablauf als Schaubild: Ein KI-Agent nimmt Anfragen aus Website, E-Mail und Telefon
          entgegen, eine Automatisierung überträgt die Ergebnisse in CRM, Kalender und Datenbank.
        </figcaption>

        {/* Kopfzeile: Ablauf wählen, anhalten */}
        <div className="flex items-start justify-between gap-3">
          <div role="group" aria-label="Beispielablauf wählen" className="grid min-w-0 flex-1 grid-cols-3 gap-1.5 sm:flex sm:flex-none sm:flex-wrap">
            {SCENARIOS.map((s, i) => {
              const active = i === scenarioIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(i)}
                  className={`min-h-11 whitespace-nowrap rounded-[8px] px-2 text-[14px] font-medium transition-colors sm:min-h-9 sm:px-3 sm:text-[13.5px] ${
                    active ? "bg-night-3 text-white ring-1 ring-signal/50" : "text-haze hover:bg-night-3 hover:text-white"
                  }`}
                >
                  <span className="sm:hidden">{s.short}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              );
            })}
          </div>
          {!reduced && (
            <button
              type="button"
              onClick={() => {
                if (!playing) {
                  // Weiter abspielen heißt: wieder alle Abläufe nacheinander zeigen
                  setPicked(false);
                  if (step >= DONE) setStep(0);
                }
                setPlaying(!playing);
              }}
              aria-label={playing ? "Animation anhalten" : "Animation abspielen"}
              className="grid h-11 w-11 flex-none place-items-center rounded-[8px] border border-edge text-haze transition-colors hover:border-haze hover:text-white sm:h-9 sm:w-9"
            >
              {playing ? <Pause size={15} aria-hidden /> : <Play size={15} aria-hidden />}
            </button>
          )}
        </div>

        <Diagram
          layout={WIDE}
          scenario={scenario}
          step={step}
          animate={animate}
          className="mt-4 hidden h-auto w-full sm:block"
        />
        <Diagram
          layout={TALL}
          scenario={scenario}
          step={step}
          animate={animate}
          className="mx-auto mt-4 block h-auto w-full max-w-[24rem] sm:hidden"
        />

        {/* Protokoll: am Handy nur der jüngste Eintrag, ab Tablet alle fünf */}
        <p aria-hidden className="mt-3 min-h-[3.2em] text-[14px] leading-snug sm:hidden">
          {latest && (
            <span key={`${scenario.id}-${visibleStep}`} className="row-in block">
              <span className="font-semibold text-white">{latest.system}: </span>
              <span className="text-haze">{latest.text}</span>
            </span>
          )}
        </p>

        <ol className="sr-only mt-4 border-t border-edge pt-3 sm:not-sr-only">
          {scenario.log.map((row, i) => {
            const shown = i <= step;
            return (
              <li
                key={`${scenario.id}-${i}`}
                className="relative grid grid-cols-[4.6rem_8.6rem_minmax(0,1fr)] items-baseline gap-x-3 py-[3px] text-[13.5px] leading-snug"
              >
                {/* Noch nicht erreichte Schritte: ruhiger Platzhalter statt blasser, schwer lesbarer Schrift */}
                {!shown && <span aria-hidden className="absolute inset-y-[7px] left-0 right-[18%] rounded-[4px] bg-night-3" />}
                <span className={`tnum text-haze ${shown ? "" : "invisible"}`}>{row.time}</span>
                <span className={`font-semibold text-white ${shown ? "" : "invisible"}`}>{row.system}</span>
                <span className={`text-haze ${shown ? "row-in" : "invisible"}`}>{row.text}</span>
              </li>
            );
          })}
        </ol>
      </figure>
      <p className="relative mt-3 text-[13.5px] text-haze/80">
        Beispielablauf mit erfundenen Daten. Welche Systeme verbunden werden, richtet sich nach Ihrem Unternehmen.
      </p>
    </div>
  );
}
