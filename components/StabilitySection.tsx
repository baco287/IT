import {
  LayoutDashboard,
  Server,
  Monitor,
  Cloud,
  Shield,
  FileBarChart,
  Database,
  Bot,
} from "lucide-react";
import Reveal from "./Reveal";

/* ============================================================
   Stabilitäts-Sektion nach Referenz 2:
   links Erzählung + räumliche Server-Visualisierung mit
   schwebenden Modul-Chips, rechts ein Status-Dashboard (Demo).
   ============================================================ */

/* Isometrische Server-Landschaft als SVG (eigene Grafik, kein Bild) */
function ServerScene() {
  // drei isometrische Racks: Deckflächen, linke/rechte Seiten, Leuchtkanten
  const racks = [
    { x: 150, y: 96, glow: 1 },
    { x: 86, y: 132, glow: 0.7 },
    { x: 214, y: 132, glow: 0.7 },
  ];
  return (
    <svg viewBox="0 0 360 330" className="w-full" aria-hidden>
      <defs>
        <filter id="qx-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="qx-floor" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(25,216,242,0.22)" />
          <stop offset="100%" stopColor="rgba(25,216,242,0)" />
        </radialGradient>
      </defs>
      {/* Leuchtende Bodenplatte mit Raster */}
      <ellipse cx="180" cy="250" rx="170" ry="80" fill="url(#qx-floor)" />
      <polygon
        points="180,180 320,250 180,320 40,250"
        fill="rgba(25,216,242,0.05)"
        stroke="rgba(25,216,242,0.5)"
        strokeWidth="1.2"
        filter="url(#qx-glow)"
      />
      {[0.25, 0.5, 0.75].map((t) => (
        <g key={t} stroke="rgba(25,216,242,0.16)" strokeWidth="0.8">
          <line x1={40 + 140 * t} y1={250 - 70 * t} x2={180 + 140 * t} y2={320 - 70 * t} />
          <line x1={180 - 140 * t} y1={180 + 70 * t} x2={320 - 140 * t} y2={250 + 70 * t} />
        </g>
      ))}
      <polygon
        points="180,196 290,250 180,304 70,250"
        fill="none"
        stroke="rgba(34,230,181,0.3)"
        strokeWidth="1"
        strokeDasharray="4 6"
        className="linkflow"
      />
      {/* Racks */}
      {racks.map((r, idx) => (
        <g key={idx} opacity={0.75 + r.glow * 0.25}>
          {[0, 1, 2, 3].map((i) => {
            const y = r.y + i * 26;
            return (
              <g key={i}>
                {/* linke Seite */}
                <polygon
                  points={`${r.x - 34},${y + 10} ${r.x},${y + 27} ${r.x},${y + 47} ${r.x - 34},${y + 30}`}
                  fill="#0a1626"
                  stroke="rgba(25,216,242,0.25)"
                  strokeWidth="0.8"
                />
                {/* rechte Seite */}
                <polygon
                  points={`${r.x + 34},${y + 10} ${r.x},${y + 27} ${r.x},${y + 47} ${r.x + 34},${y + 30}`}
                  fill="#0d1d31"
                  stroke="rgba(25,216,242,0.25)"
                  strokeWidth="0.8"
                />
                {/* Deckfläche mit leuchtender Kante */}
                <polygon
                  points={`${r.x},${y - 7} ${r.x + 34},${y + 10} ${r.x},${y + 27} ${r.x - 34},${y + 10}`}
                  fill="#11263d"
                  stroke="rgba(25,216,242,0.85)"
                  strokeWidth="1"
                  filter="url(#qx-glow)"
                />
                {/* LED-Lichtleisten auf beiden Seiten */}
                <line
                  x1={r.x - 30} y1={y + 19} x2={r.x - 6} y2={y + 31}
                  stroke="#19d8f2" strokeWidth="1.2" opacity="0.75" filter="url(#qx-glow)"
                />
                <line
                  x1={r.x + 6} y1={y + 31} x2={r.x + 30} y2={y + 19}
                  stroke="#19d8f2" strokeWidth="1.2" opacity="0.5"
                />
                {/* Status-LEDs */}
                <circle cx={r.x - 24} cy={y + 26} r="1.7" fill="#22e6b5" className="nodepulse" filter="url(#qx-glow)" />
                <circle cx={r.x - 17} cy={y + 29.5} r="1.3" fill="#19d8f2" />
              </g>
            );
          })}
          {/* Leuchtsockel */}
          <ellipse
            cx={r.x}
            cy={r.y + 118}
            rx="46"
            ry="13"
            fill="rgba(25,216,242,0.18)"
            className="nodepulse"
            filter="url(#qx-glow)"
          />
        </g>
      ))}
      {/* Datenverbindungen zwischen den Racks */}
      <path d="M116 220 C 150 200, 210 200, 244 220" fill="none" stroke="rgba(34,230,181,0.5)" strokeWidth="1.2" className="linkflow" />
      <path d="M150 120 C 120 100, 100 110, 92 136" fill="none" stroke="rgba(25,216,242,0.45)" strokeWidth="1.2" className="linkflow" />
      <path d="M186 120 C 216 100, 236 110, 212 140" fill="none" stroke="rgba(25,216,242,0.45)" strokeWidth="1.2" className="linkflow" />
      {/* Aufsteigende Cloud-Verbindung */}
      <path d="M180 92 L180 34" stroke="rgba(25,216,242,0.5)" strokeWidth="1.2" strokeDasharray="3 5" className="linkflow" />
      <path d="M166 34a9 9 0 0 1 2-17.6A11 11 0 0 1 189 13a9.5 9.5 0 0 1 9.5 9.5A8 8 0 0 1 197 38h-28z" fill="rgba(25,216,242,0.16)" stroke="#19d8f2" strokeWidth="1.4" filter="url(#qx-glow)" />
    </svg>
  );
}

const CHIPS = [
  { icon: Cloud, title: "Cloud", sub: "Skalierbar. Sicher.", pos: "left-0 top-6" },
  { icon: Monitor, title: "Monitoring", sub: "24/7 Überblick. Proaktiv.", pos: "right-0 top-2" },
  { icon: Server, title: "Managed IT", sub: "Betrieb. Updates. Support.", pos: "left-0 top-[46%]" },
  { icon: Shield, title: "Cybersecurity", sub: "Schutz vor Bedrohungen.", pos: "left-4 bottom-4" },
  { icon: Bot, title: "KI-Agenten", sub: "Automatisieren. Entlasten.", pos: "right-0 top-[52%]" },
];

const PANEL_NAV = [
  { icon: LayoutDashboard, label: "Übersicht", active: true },
  { icon: Server, label: "Server" },
  { icon: Monitor, label: "Arbeitsplätze" },
  { icon: Cloud, label: "Cloud Services" },
  { icon: Shield, label: "Sicherheit" },
  { icon: FileBarChart, label: "Berichte" },
];

const TILES = [
  { icon: Server, label: "Server", value: "12/12 online" },
  { icon: Cloud, label: "Cloud Services", value: "5/5 online" },
  { icon: Shield, label: "Sicherheitsstatus", value: "Keine Bedrohungen" },
  { icon: Database, label: "Backups", value: "Erfolgreich" },
];

const LOADS = [
  { label: "CPU", pct: 34 },
  { label: "RAM", pct: 58 },
  { label: "Netzwerk", pct: 26 },
];

export default function StabilitySection() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-abyss px-6 py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_20%_30%,rgba(25,216,242,0.06),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-2xl">
          <p className="mb-4 inline-flex rounded-full border border-cyan/25 bg-cyan/[0.07] px-3.5 py-1 font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan">
            Zuverlässig. Messbar. An deiner Seite.
          </p>
          <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[2.75rem]">
            Mehr Stabilität.
            <br />
            Weniger Ausfälle.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
            Wir überwachen deine Systeme rund um die Uhr, erkennen Probleme
            frühzeitig und lösen sie, bevor sie deinen Betrieb beeinträchtigen.
          </p>
        </Reveal>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Räumliche Server-Landschaft mit schwebenden Modulen */}
          <Reveal>
            <div className="relative mx-auto max-w-lg">
              <ServerScene />
              {CHIPS.map((c) => (
                <div
                  key={c.title}
                  className={`absolute ${c.pos} hidden items-center gap-2.5 rounded-xl border border-cyan/20 bg-navy/85 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:flex`}
                >
                  <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-cyan/12 text-cyan">
                    <c.icon size={14} strokeWidth={2} aria-hidden />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-[family-name:var(--font-mono)] text-[9px] font-bold uppercase tracking-wider text-white">
                      {c.title}
                    </span>
                    <span className="text-[9px] text-fog">{c.sub}</span>
                  </span>
                </div>
              ))}
              <p className="mt-2 text-center font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.2em] text-white/30">
                Eine stabile IT-Infrastruktur für deinen Erfolg
              </p>
            </div>
          </Reveal>

          {/* Status-Panel (Demo) */}
          <Reveal delay={0.12}>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-navy/80 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5">
                <span className="font-[family-name:var(--font-display)] text-xs font-bold text-white">
                  Qonte<span className="grad">X</span>{" "}
                  <span className="ml-1 font-normal text-fog">Systemstatus</span>
                </span>
                <span className="flex items-center gap-3">
                  <span className="rounded border border-white/15 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-fog">
                    Demo
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] text-cyan-soft">
                    <span className="status-dot" aria-hidden /> Alle Systeme online
                  </span>
                </span>
              </div>
              <div className="grid sm:grid-cols-[150px_1fr]">
                <nav aria-hidden className="hidden border-r border-white/8 p-2.5 sm:block">
                  {PANEL_NAV.map((n) => (
                    <span
                      key={n.label}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[11px] ${
                        n.active ? "bg-cyan/10 font-semibold text-white" : "text-fog"
                      }`}
                    >
                      <n.icon size={12} strokeWidth={2} aria-hidden />
                      {n.label}
                    </span>
                  ))}
                </nav>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-2.5">
                    {TILES.map((t) => (
                      <div key={t.label} className="rounded-xl border border-white/8 bg-night/60 p-3">
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan/12 text-cyan">
                          <t.icon size={14} strokeWidth={2} aria-hidden />
                        </span>
                        <p className="mt-2 text-[10px] text-fog">{t.label}</p>
                        <p className="text-xs font-semibold text-cyan-soft">{t.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 rounded-xl border border-white/8 bg-night/60 p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-fog">
                      Systemauslastung
                    </p>
                    {LOADS.map((l) => (
                      <div key={l.label} className="mt-2">
                        <div className="flex justify-between text-[10px] text-fog">
                          <span>{l.label}</span>
                          <span className="font-[family-name:var(--font-mono)] text-mist">{l.pct} %</span>
                        </div>
                        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/8">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan to-cyan-soft"
                            style={{ width: `${l.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
