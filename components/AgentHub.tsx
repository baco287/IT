import Image from "next/image";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  Users,
  CalendarDays,
  Boxes,
  Check,
  ArrowRight,
  Clock3,
  Zap,
  UserRound,
} from "lucide-react";
import Reveal from "./Reveal";
import agentHead from "@/public/images/qontex-agent-head.png";

/* ============================================================
   KI-Agenten-Automatisierungszentrum nach Referenz 3:
   Kanäle → QonteX-Agent → Systeme, sichtbar verbunden, mit
   Agent-Console (Demo) und Beispielkonversation.
   ============================================================ */

const CHANNELS = [
  { icon: MessageCircle, color: "#22e6b5", title: "WhatsApp", sub: "Kundenanfragen" },
  { icon: Phone, color: "#19d8f2", title: "Telefon", sub: "Anrufe & Voicemail" },
  { icon: Mail, color: "#8b7df2", title: "E-Mail", sub: "Posteingang" },
];

const SYSTEMS = [
  { icon: Users, color: "#19d8f2", title: "CRM", sub: "Kontakte & Anfragen" },
  { icon: CalendarDays, color: "#22e6b5", title: "Kalender", sub: "Termine buchen" },
  { icon: Boxes, color: "#8b7df2", title: "Weitere Systeme", sub: "z. B. Warenwirtschaft" },
];

const AGENT_STEPS = [
  "Versteht die Anfrage",
  "Prüft deine Systeme",
  "Führt Aktionen aus",
  "Erstellt eine Antwort",
];

const CONSOLE_LINES = [
  ["12:34:01", "neue WhatsApp-Anfrage erkannt"],
  ["12:34:02", "Anliegen: Terminanfrage"],
  ["12:34:03", "verfügbare Termine geprüft"],
  ["12:34:04", "Antwort wird erstellt"],
  ["12:34:05", "Nachricht gesendet"],
];

const FACTS = [
  { icon: Clock3, title: "Rund um die Uhr", text: "erreichbar – auch nachts und am Wochenende" },
  { icon: Zap, title: "Antwort in Sekunden", text: "statt Warteschleife oder vollem Postfach" },
  { icon: UserRound, title: "Mensch im richtigen Moment", text: "Übergabe an dein Team, sobald es persönlich wird" },
];

function Chip({ icon: Icon, color, title, sub }: (typeof CHANNELS)[number]) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-glass/80 px-4 py-3 transition-colors duration-300 hover:border-cyan/40">
      <span
        className="grid h-9 w-9 flex-none place-items-center rounded-lg"
        style={{ color, background: `${color}16`, border: `1px solid ${color}30` }}
      >
        <Icon size={17} strokeWidth={2} aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-white">{title}</span>
        <span className="text-[11px] text-fog">{sub}</span>
      </span>
    </div>
  );
}

/* Animierte Verbindungslinien zwischen den Spalten (nur Desktop) */
function Connector({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 220"
      className={`hidden h-full w-full self-stretch lg:block ${flip ? "-scale-x-100" : ""}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {[36, 110, 184].map((y) => (
        <g key={y}>
          <path
            d={`M0 ${y} C 30 ${y}, 30 110, 60 110`}
            fill="none"
            stroke="rgba(25,216,242,0.18)"
            strokeWidth="3"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M0 ${y} C 30 ${y}, 30 110, 60 110`}
            fill="none"
            stroke="#22e6b5"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
            className="linkflow"
          />
        </g>
      ))}
    </svg>
  );
}

export default function AgentHub() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_30%,rgba(34,230,181,0.05),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <p className="mb-4 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan">
              So funktionieren unsere KI-Agenten
            </p>
            <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.75rem]">
              Automatisierung, die mitdenkt.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
              Unsere KI-Agenten verbinden deine Kommunikationskanäle, Systeme
              und Prozesse – für einen reibungslosen Ablauf rund um die Uhr.
            </p>
            <Link
              href="/leistungen/ki-agenten"
              className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-mist transition-colors hover:border-cyan/50"
            >
              Mehr über KI-Agenten
              <ArrowRight size={15} strokeWidth={2.5} aria-hidden />
            </Link>
          </Reveal>

          {/* Agent-Console (Demo) */}
          <Reveal delay={0.1}>
            <div className="terminal overflow-hidden">
              <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5d73]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f2b544]/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-soft/60" />
                <span className="ml-2 text-xs text-fog">QonteX Agent Console</span>
                <span className="ml-auto rounded border border-white/15 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-fog">
                  Demo
                </span>
              </div>
              <div className="px-4 py-3 text-[12px] leading-6">
                {CONSOLE_LINES.map(([t, line]) => (
                  <p key={t}>
                    <span className="text-white/35">{t}</span>{" "}
                    <span className="text-mist">{line}</span>{" "}
                    <span className="text-cyan-soft">✓</span>
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Hub: Kanäle → Agent → Systeme */}
        <Reveal className="mt-14">
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_60px_1.1fr_60px_1fr]">
            <div className="flex flex-col justify-between gap-3 lg:py-6">
              {CHANNELS.map((c) => (
                <Chip key={c.title} {...c} />
              ))}
            </div>

            <Connector />

            <div className="relative rounded-2xl border border-cyan/25 bg-navy/85 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.5),0_0_40px_rgba(25,216,242,0.08)]">
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(25,216,242,0.12),transparent_70%)]"
                aria-hidden
              />
              {/* Leuchtender Agenten-Orb */}
              <div className="relative mx-auto grid h-32 w-32 place-items-center">
                <span className="nodepulse absolute inset-0 rounded-full bg-cyan/20 blur-2xl" aria-hidden />
                <span className="absolute inset-0 rounded-full border border-cyan/40 shadow-[0_0_30px_rgba(25,216,242,0.35),inset_0_0_24px_rgba(25,216,242,0.2)]" aria-hidden />
                <span className="absolute inset-3 rounded-full border border-cyan-soft/25" aria-hidden />
                <Image
                  src={agentHead}
                  alt=""
                  className="relative h-20 w-20 rounded-full ring-2 ring-cyan/50"
                />
                <span className="absolute bottom-3 right-3 h-4 w-4 rounded-full border-2 border-navy bg-cyan-soft" aria-hidden />
              </div>
              <p className="relative mt-3 text-center font-[family-name:var(--font-display)] text-lg font-bold text-white">
                QonteX KI-Agent
              </p>
              <p className="relative text-center text-xs text-fog">verarbeitet Anfragen in Sekunden</p>
              <ul className="relative mx-auto mt-5 grid w-fit gap-2.5">
                {AGENT_STEPS.map((s) => (
                  <li key={s} className="flex items-center gap-2.5 text-sm text-mist">
                    <span className="grid h-5 w-5 flex-none place-items-center rounded-md bg-cyan-soft/15 text-cyan-soft">
                      <Check size={12} strokeWidth={3} aria-hidden />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
              <div className="relative mt-5 flex flex-wrap justify-center gap-2">
                {["Sicher", "DSGVO-konform", "In deiner IT-Umgebung"].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/12 px-2.5 py-1 text-[10px] font-medium text-fog"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <Connector flip />

            <div className="flex flex-col justify-between gap-3 lg:py-6">
              {SYSTEMS.map((s) => (
                <Chip key={s.title} {...s} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Beispielkonversation + ehrliche Vorteils-Chips */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-slate-glass/80 p-5">
              <p className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider text-fog">
                Beispielkonversation
                <span className="rounded border border-white/15 px-1.5 py-0.5 text-[9px] text-fog">Demo</span>
              </p>
              <div className="mt-3 grid gap-2">
                <span className="w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-white/8 px-3.5 py-2 text-sm text-mist">
                  Habt ihr morgen einen Termin frei?
                </span>
                <span className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-gradient-to-r from-cyan/25 to-cyan-soft/25 px-3.5 py-2 text-sm text-white">
                  Ja – 10:30 oder 14:00 Uhr. Was passt dir besser?
                </span>
                <span className="w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-white/8 px-3.5 py-2 text-sm text-mist">
                  14 Uhr bitte!
                </span>
                <span className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-gradient-to-r from-cyan/25 to-cyan-soft/25 px-3.5 py-2 text-sm text-white">
                  Erledigt ✓ Der Termin steht im Kalender, du bekommst gleich eine Bestätigung.
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid h-full gap-4 sm:grid-cols-3">
              {FACTS.map((f) => (
                <div
                  key={f.title}
                  className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-glass/80 p-5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-cyan/25 bg-cyan/10 text-cyan">
                    <f.icon size={18} strokeWidth={2} aria-hidden />
                  </span>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-base font-semibold text-white">
                    {f.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-fog">{f.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
