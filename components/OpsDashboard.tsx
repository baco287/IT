"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import agentHead from "@/public/images/qontex-agent-head.png";

/* ============================================================
   QonteX Operations Dashboard (Hero, Referenz 1).
   Alle Zahlen sind DEMO-Werte – im Kopf als „Demo-Ansicht"
   gekennzeichnet. Uhrzeit/Datum sind echt (Client-Uhr).
   ============================================================ */

const TABS = ["Übersicht", "Systeme", "Sicherheit", "Backups", "KI-Agenten", "Berichte"];

const STATUS_ROWS = [
  { label: "Server", value: "12/12" },
  { label: "Cloud-Dienste", value: "8/8" },
  { label: "Arbeitsplätze", value: "156/160" },
  { label: "Sicherheitsdienste", value: "8/8" },
  { label: "Backups", value: "24/24" },
];

const EVENTS = [
  { time: "14:31", color: "#22e6b5", title: "Backup erfolgreich", sub: "Server-01 – 320 GB" },
  { time: "14:28", color: "#22e6b5", title: "Neue Anmeldung", sub: "M365 – Berlin" },
  { time: "14:24", color: "#ff4d6a", title: "Bedrohung blockiert", sub: "Malware – Firewall" },
  { time: "14:17", color: "#22e6b5", title: "System-Update", sub: "23 Clients aktualisiert" },
  { time: "14:03", color: "#22e6b5", title: "KI-Agent: Anfrage beantwortet", sub: "Kunde – E-Mail" },
];

/* Deutschland-Silhouette im 200x240-Raster */
const DE_PATH =
  "M92 4 L104 6 L108 22 L122 26 L136 20 L150 18 L156 30 L160 44 L166 62 L170 82 L176 98 L172 112 L178 124 L166 128 L150 134 L138 140 L130 146 L136 158 L148 170 L160 186 L152 198 L142 212 L146 226 L130 226 L116 232 L100 230 L84 236 L70 232 L56 236 L54 222 L58 206 L48 196 L38 192 L30 184 L34 170 L26 158 L30 142 L20 132 L24 116 L18 104 L22 88 L16 76 L22 66 L26 56 L42 50 L56 52 L64 46 L70 38 L80 36 L84 24 L88 12 Z";

const NODES = [
  { x: 84, y: 46 }, // Hamburg
  { x: 150, y: 74 }, // Berlin
  { x: 152, y: 120 }, // Dresden
  { x: 38, y: 124 }, // Köln
  { x: 72, y: 152 }, // Frankfurt (Zentrum)
  { x: 70, y: 198 }, // Stuttgart
  { x: 124, y: 206 }, // München
  { x: 110, y: 96 }, // Hannover/Mitte
];
const HUB = 4;

/* Bögen vom Hub zu allen Standorten + einige nach außen */
const ARCS: Array<[number, number, number, number]> = [
  ...NODES.filter((_, i) => i !== HUB).map(
    (n) => [NODES[HUB].x, NODES[HUB].y, n.x, n.y] as [number, number, number, number]
  ),
  [84, 46, 150, 74],
  [150, 74, 152, 120],
  [-30, 40, 84, 46],
  [150, 74, 236, 30],
  [124, 206, 236, 236],
  [38, 124, -30, 190],
];

const arcPath = ([x1, y1, x2, y2]: [number, number, number, number]) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.max(14, Math.abs(x2 - x1) * 0.28);
  return `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`;
};

const CPU = [22, 26, 21, 30, 27, 18, 24, 29, 23, 16, 25, 28, 20, 24, 19, 26, 22, 27, 21, 24];
const NET = [9, 14, 11, 18, 13, 22, 15, 26, 17, 12, 20, 30, 16, 24, 19, 14, 27, 18, 22, 13, 25, 17, 21, 15, 28, 19, 23, 16];
const BACKUP = [92, 95, 90, 96, 94, 93, 97];
const DAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(t);
  }, []);
  if (!now) return "";
  const d = now.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  const t = now.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
  return `${d}   ${t}`;
}

function Panel({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-xl border border-[#19d8f2]/20 bg-[linear-gradient(180deg,rgba(14,38,60,0.75),rgba(8,24,40,0.75))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function OpsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const clock = useClock();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const R = 38;
  const C = 2 * Math.PI * R;
  const cpuPts = CPU.map((v, i) => `${(i / (CPU.length - 1)) * 160},${44 - v}`).join(" ");

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-[#19d8f2]/55 bg-[linear-gradient(180deg,rgba(9,28,46,0.94),rgba(5,16,28,0.96))] shadow-[0_0_0_1px_rgba(25,216,242,0.12),0_0_50px_rgba(25,216,242,0.32),0_40px_100px_rgba(0,0,0,0.6),inset_0_0_60px_rgba(25,216,242,0.06)]"
      role="img"
      aria-label="Demo-Ansicht des QonteX-Leitstands mit Systemstatus, Netzwerkkarte, Ereignissen und Kennzahlen"
    >
      {/* Lichtkante oben */}
      <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#7ff3ff] to-transparent" aria-hidden />

      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-[#19d8f2]/15 px-5 py-3">
        <span className="flex items-center gap-2">
          <Image src={agentHead} alt="" className="h-6 w-6 rounded-full ring-1 ring-cyan/50" />
          <span className="text-sm font-bold text-white">
            Qonte<span className="text-cyan">X</span>
          </span>
        </span>
        <nav aria-hidden className="hidden items-center gap-5 md:flex">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={`relative text-[11.5px] ${i === 0 ? "font-semibold text-white" : "text-white/65"}`}
            >
              {t}
              {i === 0 && (
                <span className="absolute -bottom-[13px] left-0 right-0 h-0.5 rounded-full bg-cyan shadow-[0_0_8px_#19d8f2]" />
              )}
            </span>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-4">
          <span className="hidden whitespace-pre text-[11px] text-white/75 sm:inline">{clock}</span>
          <span className="rounded border border-white/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/60">
            Demo-Ansicht
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-medium text-[#22e6b5]">
            <span className="status-dot" aria-hidden /> Alle Systeme online
          </span>
        </span>
      </div>

      {/* Hauptbereich */}
      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_1.2fr] lg:grid-cols-[0.9fr_1.9fr_1.25fr]">
        {/* Systemstatus */}
        <Panel className="p-4">
          <p className="text-[13px] font-semibold text-white">Systemstatus</p>
          <div className="relative mx-auto mt-3 grid h-[104px] w-[104px] place-items-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0" aria-hidden>
              <defs>
                <filter id="gaugeGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.5" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${C * 0.75} ${C}`}
                transform="rotate(135 50 50)"
              />
              <circle
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke="#22e6b5"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${C * 0.75 * 0.987} ${C}`}
                strokeDashoffset={live ? 0 : C * 0.75 * 0.987}
                transform="rotate(135 50 50)"
                filter="url(#gaugeGlow)"
                style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.2,0.7,0.25,1) 0.2s" }}
              />
            </svg>
            <span className="relative text-center">
              <span className="block text-[22px] font-bold leading-none text-white">98,7 %</span>
              <span className="mt-1 block text-[10px] text-white/70">Systeme online</span>
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {STATUS_ROWS.map((r) => (
              <li key={r.label} className="flex items-center justify-between text-[11.5px]">
                <span className="flex items-center gap-2 text-white/85">
                  <span className="h-2 w-2 rounded-full bg-[#22e6b5] shadow-[0_0_6px_#22e6b5]" aria-hidden />
                  {r.label}
                </span>
                <span className="font-semibold text-white">{r.value}</span>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Netzwerkkarte – offen, ohne Rahmen wie in der Referenz */}
        <div className="relative hidden min-h-[250px] sm:block">
          <svg viewBox="-30 0 266 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <defs>
              <pattern id="deDots" width="3.2" height="3.2" patternUnits="userSpaceOnUse">
                <circle cx="1.6" cy="1.6" r="0.75" fill="#19d8f2" opacity="0.45" />
              </pattern>
              <radialGradient id="deGlow" cx="50%" cy="55%" r="55%">
                <stop offset="0%" stopColor="rgba(25,216,242,0.28)" />
                <stop offset="100%" stopColor="rgba(25,216,242,0)" />
              </radialGradient>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#19d8f2" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#5ff5d6" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#19d8f2" stopOpacity="0.15" />
              </linearGradient>
              <filter id="mapGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.2" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* feines Raster */}
            {[30, 70, 110, 150, 190, 230].map((y) => (
              <line key={`h${y}`} x1="-30" x2="236" y1={y} y2={y} stroke="rgba(25,216,242,0.06)" strokeWidth="0.5" />
            ))}
            {[-10, 30, 70, 110, 150, 190, 230].map((x) => (
              <line key={`v${x}`} x1={x} x2={x} y1="0" y2="240" stroke="rgba(25,216,242,0.06)" strokeWidth="0.5" />
            ))}
            <ellipse cx="100" cy="130" rx="120" ry="110" fill="url(#deGlow)" />
            <path d={DE_PATH} fill="url(#deDots)" />
            <path d={DE_PATH} fill="rgba(25,216,242,0.06)" stroke="rgba(95,245,214,0.8)" strokeWidth="0.9" strokeLinejoin="round" filter="url(#mapGlow)" />
            {ARCS.map((a, i) => (
              <g key={i}>
                {/* durchgehender Leuchtbogen */}
                <path
                  d={arcPath(a)}
                  fill="none"
                  stroke="#3dfcc4"
                  strokeOpacity="0.75"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  filter="url(#mapGlow)"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={live ? 0 : 1}
                  style={{ transition: `stroke-dashoffset 1.2s ease-out ${0.3 + i * 0.08}s` }}
                />
                {/* wandernder Datenimpuls */}
                {live && (
                  <path
                    d={arcPath(a)}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    className="linkflow"
                    style={{ strokeDasharray: "3 37", animationDelay: `${i * 0.45}s` }}
                  />
                )}
              </g>
            ))}
            {NODES.map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r={i === HUB ? 13 : 9} fill="rgba(61,252,196,0.18)" className="nodepulse" style={{ animationDelay: `${i * 0.4}s` }} />
                <circle cx={n.x} cy={n.y} r={i === HUB ? 5.5 : 4} fill="#3dfcc4" filter="url(#mapGlow)" />
                <circle cx={n.x} cy={n.y} r={i === HUB ? 2.4 : 1.7} fill="#ffffff" />
              </g>
            ))}
          </svg>
          {/* Tooltip am Rechenzentrum */}
          <div className="absolute left-[54%] top-[44%] rounded-lg border border-cyan/50 bg-[#071a2b]/90 px-3 py-2 shadow-[0_0_18px_rgba(25,216,242,0.35)]">
            <p className="flex items-center gap-1.5 text-[10.5px] font-medium text-white">
              <span className="grid h-3 w-3 place-items-center rounded-full border border-cyan/70">
                <span className="h-1 w-1 rounded-full bg-cyan" />
              </span>
              Rechenzentrum Frankfurt
            </p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-[#22e6b5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#22e6b5] shadow-[0_0_6px_#22e6b5]" />
              Alle Systeme stabil
            </p>
          </div>
        </div>

        {/* Aktuelle Ereignisse */}
        <Panel className="p-4 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-white">Aktuelle Ereignisse</p>
            <span className="text-[10.5px] font-medium text-cyan">Alle anzeigen →</span>
          </div>
          <ul className="mt-3 space-y-2.5">
            {EVENTS.map((e, i) => (
              <li
                key={e.time}
                className="flex items-start gap-3"
                style={{
                  opacity: live ? 1 : 0,
                  transform: live ? "none" : "translateX(8px)",
                  transition: `opacity 0.5s ease ${0.35 + i * 0.12}s, transform 0.5s ease ${0.35 + i * 0.12}s`,
                }}
              >
                <span
                  className="mt-1 h-2 w-2 flex-none rounded-full"
                  style={{ background: e.color, boxShadow: `0 0 7px ${e.color}` }}
                  aria-hidden
                />
                <span className="w-9 flex-none text-[11px] text-white/70">{e.time}</span>
                <span className="leading-snug">
                  <span className="block text-[11.5px] font-medium text-white">{e.title}</span>
                  <span className="text-[10.5px] text-white/55">{e.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      {/* Kennzahlen */}
      <div className="grid grid-cols-2 gap-3 px-3 pb-3 lg:grid-cols-[1fr_1fr_1.25fr_1fr]">
        {/* CPU */}
        <Panel className="p-3.5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white">CPU-Auslastung</p>
              <p className="text-[10px] text-white/55">Gesamtinfrastruktur</p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-bold leading-none text-white">24 %</p>
              <p className="mt-1 text-[10px] font-medium text-[#22e6b5]">↓ −12 %</p>
            </div>
          </div>
          <svg viewBox="0 0 160 46" className="mt-2 h-14 w-full" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="cpuFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#19d8f2" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#19d8f2" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points={`0,46 ${cpuPts} 160,46`} fill="url(#cpuFill)" style={{ opacity: live ? 1 : 0, transition: "opacity 1s ease 1s" }} />
            <polyline
              points={cpuPts}
              fill="none"
              stroke="#3fe3ff"
              strokeWidth="1.6"
              vectorEffect="non-scaling-stroke"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={live ? 0 : 1}
              style={{ transition: "stroke-dashoffset 1.4s ease-out 0.5s" }}
            />
          </svg>
          <div className="flex justify-between text-[8.5px] text-white/40" aria-hidden>
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span>
          </div>
        </Panel>

        {/* Netzwerk */}
        <Panel className="p-3.5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white">Netzwerk</p>
              <p className="text-[10px] text-white/55">Traffic</p>
            </div>
            <div className="text-right">
              <p className="whitespace-nowrap text-[18px] font-bold leading-none text-white">1,2 Gbit/s</p>
              <p className="mt-1 text-[10px] font-medium text-[#22e6b5]">↓ −18 %</p>
            </div>
          </div>
          <div className="mt-2 flex h-14 items-end gap-[3px]" aria-hidden>
            {NET.map((h, i) => (
              <span
                key={i}
                className="netbar flex-1 rounded-t-[2px] bg-gradient-to-t from-[#0f8fb0] to-[#4feaff]"
                style={{
                  height: live ? `${h * 3}%` : "6%",
                  transition: `height 0.8s cubic-bezier(0.2,0.7,0.25,1) ${0.4 + i * 0.025}s`,
                  animationDelay: `${(i % 7) * 0.4}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[8.5px] text-white/40" aria-hidden>
            <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span>
          </div>
        </Panel>

        {/* Sicherheitslage */}
        <Panel className="p-3.5">
          <p className="text-[12px] font-semibold text-white">Sicherheitslage</p>
          <p className="text-[10px] text-white/55">Letzte 24 Stunden</p>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative grid h-[76px] w-[76px] flex-none place-items-center">
              <svg viewBox="0 0 80 80" className="absolute inset-0" aria-hidden>
                <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(34,230,181,0.15)" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="32" fill="none" stroke="#22e6b5" strokeWidth="6"
                  strokeDasharray={2 * Math.PI * 32}
                  strokeDashoffset={live ? 0 : 2 * Math.PI * 32}
                  transform="rotate(-90 40 40)"
                  filter="url(#gaugeGlow)"
                  style={{ transition: "stroke-dashoffset 1.3s ease-out 0.6s" }}
                />
              </svg>
              <span className="relative text-center leading-none">
                <span className="block text-[20px] font-bold text-white">0</span>
                <span className="mt-0.5 block text-[7px] text-white/70">Kritische<br />Vorfälle</span>
              </span>
            </div>
            <ul className="flex-1 space-y-1.5 text-[10.5px]">
              {[
                ["#ff4d6a", "Blockiert", "247"],
                ["#f5b83d", "Warnungen", "12"],
                ["#3fa8ff", "Info", "1.428"],
              ].map(([c, l, v]) => (
                <li key={l} className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-white/80">
                    <span className="h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                    {l}
                  </span>
                  <span className="font-semibold text-white">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </Panel>

        {/* Backups */}
        <Panel className="p-3.5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-semibold text-white">Backups</p>
              <p className="text-[10px] text-white/55">Letzter Status</p>
            </div>
            <div className="text-right">
              <p className="text-[18px] font-bold leading-none text-white">100 %</p>
              <p className="mt-1 text-[10px] font-medium text-[#22e6b5]">Erfolgreich</p>
            </div>
          </div>
          <div className="mt-2 flex h-14 items-end gap-2" aria-hidden>
            {BACKUP.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-[#0c9c78] to-[#3dfcc4] shadow-[0_0_10px_rgba(34,230,181,0.45)]"
                style={{
                  height: live ? `${h}%` : "6%",
                  transition: `height 0.8s cubic-bezier(0.2,0.7,0.25,1) ${0.6 + i * 0.08}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between gap-2 text-[8.5px] text-white/40" aria-hidden>
            {DAYS.map((d) => (
              <span key={d} className="flex-1 text-center">{d}</span>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
