"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import agentHead from "@/public/images/qontex-agent-head.png";

/* ============================================================
   QonteX Operations Dashboard (Hero, Referenz 1).
   Alle Zahlen sind animierte DEMO-Daten und als solche
   gekennzeichnet – keine echten Kundem- oder Live-Werte.
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
  { time: "14:24", color: "#ff5d73", title: "Bedrohung blockiert", sub: "Malware – Firewall" },
  { time: "14:17", color: "#19d8f2", title: "System-Update", sub: "23 Clients aktualisiert" },
  { time: "14:03", color: "#22e6b5", title: "KI-Agent: Anfrage beantwortet", sub: "Kunde – E-Mail" },
];

/* Stilisierte Deutschland-Silhouette im 200x240-Raster */
const DE_PATH =
  "M92 4 L104 6 L108 22 L122 26 L136 20 L150 18 L156 30 L160 44 L166 62 L170 82 L176 98 L172 112 L178 124 L166 128 L150 134 L138 140 L130 146 L136 158 L148 170 L160 186 L152 198 L142 212 L146 226 L130 226 L116 232 L100 230 L84 236 L70 232 L56 236 L54 222 L58 206 L48 196 L38 192 L30 184 L34 170 L26 158 L30 142 L20 132 L24 116 L18 104 L22 88 L16 76 L22 66 L26 56 L42 50 L56 52 L64 46 L70 38 L80 36 L84 24 L88 12 Z";

const NODES = [
  { x: 84, y: 46, r: 3.5, name: "Hamburg" },
  { x: 150, y: 74, r: 4.5, name: "Berlin" },
  { x: 152, y: 118, r: 3, name: "Dresden" },
  { x: 38, y: 126, r: 3.5, name: "Köln" },
  { x: 70, y: 150, r: 5.5, name: "Frankfurt" },
  { x: 72, y: 198, r: 3.5, name: "Stuttgart" },
  { x: 120, y: 208, r: 4.5, name: "München" },
];

const LINKS: Array<[number, number]> = [
  [0, 1], [0, 4], [1, 2], [1, 4], [3, 4], [4, 5], [4, 6], [5, 6], [2, 6],
];

/* CPU-Sparkline + Netzwerk-Balken (Demo-Kurven) */
const CPU_POINTS = "0,34 12,30 24,33 36,26 48,29 60,22 72,26 84,18 96,23 108,16 120,20";
const NET_BARS = [14, 22, 18, 30, 24, 34, 26, 38, 30, 24, 34, 28];
const BACKUP_BARS = [26, 30, 28, 32, 30, 31, 33];

export default function OpsDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLive(true); // Endzustand ohne Animationen
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
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Ring-Gauge: 98,7 % */
  const R = 30;
  const CIRC = 2 * Math.PI * R;

  return (
    <div
      ref={ref}
      className="relative rounded-2xl border border-cyan/15 bg-navy/80 shadow-[0_40px_120px_rgba(0,0,0,0.55),0_0_60px_rgba(25,216,242,0.07)] backdrop-blur-sm"
      role="img"
      aria-label="Demo-Ansicht des QonteX Operations-Dashboards mit Systemstatus, Netzwerkkarte und Ereignissen"
    >
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/8 px-4 py-2.5">
        <span className="flex items-center gap-2">
          <Image src={agentHead} alt="" className="h-5 w-5 rounded-full" />
          <span className="font-[family-name:var(--font-display)] text-xs font-bold text-white">
            Qonte<span className="grad">X</span>
          </span>
        </span>
        <nav aria-hidden className="hidden items-center gap-3 md:flex">
          {TABS.map((t, i) => (
            <span
              key={t}
              className={`text-[10px] ${
                i === 0
                  ? "border-b border-cyan pb-0.5 font-semibold text-white"
                  : "text-fog"
              }`}
            >
              {t}
            </span>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-3">
          <span className="rounded border border-white/15 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-fog">
            Demo-Ansicht
          </span>
          <span className="flex items-center gap-1.5 text-[10px] text-cyan-soft">
            <span className="status-dot" aria-hidden /> Alle Systeme online
          </span>
        </span>
      </div>

      {/* Hauptbereich: Status / Karte / Ereignisse */}
      <div className="grid gap-3 p-3 sm:grid-cols-[1fr_1.15fr] lg:grid-cols-[0.9fr_1.2fr_1fr]">
        {/* Systemstatus */}
        <div className="rounded-xl border border-white/8 bg-night/60 p-3">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-fog">
            Systemstatus
          </p>
          <div className="mt-2 flex items-center gap-3">
            <svg viewBox="0 0 72 72" className="h-16 w-16 flex-none" aria-hidden>
              <circle cx="36" cy="36" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
              <circle
                cx="36"
                cy="36"
                r={R}
                fill="none"
                stroke="#22e6b5"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={live ? CIRC * 0.013 : CIRC}
                transform="rotate(-90 36 36)"
                style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.2,0.7,0.25,1) 0.2s" }}
              />
              <text x="36" y="40" textAnchor="middle" fill="#f5f8ff" style={{ font: "700 13px var(--font-display), sans-serif" }}>
                98,7%
              </text>
            </svg>
            <p className="text-[10px] leading-snug text-fog">
              Systeme online
              <br />
              <span className="text-white/60">(Demo)</span>
            </p>
          </div>
          <ul className="mt-2.5 space-y-1.5">
            {STATUS_ROWS.map((r) => (
              <li key={r.label} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5 text-fog">
                  <span className="h-1 w-1 rounded-full bg-cyan-soft" aria-hidden />
                  {r.label}
                </span>
                <span className="font-[family-name:var(--font-mono)] text-mist">{r.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Netzwerkkarte Deutschland */}
        <div className="relative hidden rounded-xl border border-white/8 bg-night/60 p-3 sm:block">
          <svg viewBox="0 0 200 240" className="h-full max-h-60 w-full" aria-hidden>
            {/* feines Raster hinter der Karte */}
            {[40, 80, 120, 160, 200].map((y) => (
              <line key={`h${y}`} x1="0" x2="200" y1={y} y2={y} stroke="rgba(25,216,242,0.05)" strokeWidth="0.6" />
            ))}
            {[40, 80, 120, 160].map((x) => (
              <line key={`v${x}`} x1={x} x2={x} y1="0" y2="240" stroke="rgba(25,216,242,0.05)" strokeWidth="0.6" />
            ))}
            <path d={DE_PATH} fill="rgba(25,216,242,0.06)" stroke="rgba(25,216,242,0.35)" strokeWidth="1.2" strokeLinejoin="round" />
            {LINKS.map(([a, b], i) => (
              <line
                key={i}
                x1={NODES[a].x}
                y1={NODES[a].y}
                x2={NODES[b].x}
                y2={NODES[b].y}
                stroke="rgba(34,230,181,0.4)"
                strokeWidth="1"
                className={live ? "linkflow" : undefined}
              />
            ))}
            {NODES.map((n) => (
              <g key={n.name}>
                <circle cx={n.x} cy={n.y} r={n.r * 2.2} fill="rgba(34,230,181,0.12)" className={live ? "nodepulse" : undefined} />
                <circle cx={n.x} cy={n.y} r={n.r} fill="#22e6b5" />
              </g>
            ))}
          </svg>
          <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-navy/90 px-2 py-1 text-[9px] leading-tight text-mist">
            <span className="text-cyan">Rechenzentrum Frankfurt</span>
            <br />
            Alle Systeme stabil
          </span>
        </div>

        {/* Ereignis-Feed */}
        <div className="rounded-xl border border-white/8 bg-night/60 p-3 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-fog">
              Aktuelle Ereignisse
            </p>
            <span className="text-[9px] text-cyan">Demo</span>
          </div>
          <ul className="mt-2 space-y-2">
            {EVENTS.map((e, i) => (
              <li
                key={e.time}
                className="flex items-start gap-2 border-b border-white/5 pb-1.5 text-[10px] last:border-0"
                style={{
                  opacity: live ? 1 : 0,
                  transform: live ? "none" : "translateY(5px)",
                  transition: `opacity 0.5s ease ${0.3 + i * 0.12}s, transform 0.5s ease ${0.3 + i * 0.12}s`,
                }}
              >
                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full" style={{ background: e.color }} aria-hidden />
                <span className="font-[family-name:var(--font-mono)] text-fog">{e.time}</span>
                <span className="leading-snug">
                  <span className="block text-mist">{e.title}</span>
                  <span className="text-fog">{e.sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Untere Kennzahlen-Zeile */}
      <div className="grid grid-cols-2 gap-3 border-t border-white/8 p-3 lg:grid-cols-4">
        <div className="rounded-xl border border-white/8 bg-night/60 p-3">
          <p className="text-[10px] text-fog">CPU-Auslastung</p>
          <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-base font-bold text-white">24 %</p>
          <svg viewBox="0 0 120 40" className="mt-2 h-10 w-full" aria-hidden>
            <polyline
              points={CPU_POINTS}
              fill="none"
              stroke="#19d8f2"
              strokeWidth="1.6"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset={live ? 0 : 1}
              style={{ transition: "stroke-dashoffset 1.2s ease-out 0.5s" }}
            />
          </svg>
        </div>
        <div className="rounded-xl border border-white/8 bg-night/60 p-3">
          <p className="text-[10px] text-fog">Netzwerk, Traffic</p>
          <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-base font-bold text-white">1,2 Gbit/s</p>
          <div className="mt-2 flex h-10 items-end gap-1" aria-hidden>
            {NET_BARS.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-cyan/70"
                style={{
                  height: live ? `${h * 2.4}%` : "4%",
                  transition: `height 0.7s cubic-bezier(0.2,0.7,0.25,1) ${0.4 + i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-night/60 p-3">
          <p className="text-[10px] text-fog">Sicherheitslage, 24 h</p>
          <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-base font-bold text-cyan-soft">0 kritisch</p>
          <div className="mt-2 flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="h-10 w-10 flex-none" aria-hidden>
              <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4.5" />
              <circle
                cx="20" cy="20" r="15" fill="none" stroke="#22e6b5" strokeWidth="4.5"
                strokeDasharray={2 * Math.PI * 15}
                strokeDashoffset={live ? 0 : 2 * Math.PI * 15}
                transform="rotate(-90 20 20)"
                style={{ transition: "stroke-dashoffset 1.2s ease-out 0.6s" }}
              />
            </svg>
            <ul className="space-y-0.5 text-[9px] text-fog">
              <li><span className="text-[#ff5d73]">●</span> Blockiert <span className="font-[family-name:var(--font-mono)] text-mist">247</span></li>
              <li><span className="text-[#f2b544]">●</span> Warnungen <span className="font-[family-name:var(--font-mono)] text-mist">12</span></li>
              <li><span className="text-cyan">●</span> Info <span className="font-[family-name:var(--font-mono)] text-mist">1.428</span></li>
            </ul>
          </div>
        </div>
        <div className="rounded-xl border border-white/8 bg-night/60 p-3">
          <p className="text-[10px] text-fog">Backups, 7 Tage</p>
          <p className="whitespace-nowrap font-[family-name:var(--font-display)] text-base font-bold text-cyan-soft">100 % ok</p>
          <div className="mt-2 flex h-10 items-end gap-1.5" aria-hidden>
            {BACKUP_BARS.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-cyan-soft/75"
                style={{
                  height: live ? `${h * 2.6}%` : "4%",
                  transition: `height 0.7s cubic-bezier(0.2,0.7,0.25,1) ${0.5 + i * 0.07}s`,
                }}
              />
            ))}
          </div>
          <div className="mt-1 flex justify-between font-[family-name:var(--font-mono)] text-[8px] uppercase text-white/35" aria-hidden>
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
