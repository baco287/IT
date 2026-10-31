import Link from "next/link";
import {
  MonitorCog,
  CloudCog,
  ShieldHalf,
  Bot,
  DatabaseBackup,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Reveal from "./Reveal";

/* Sechs Leistungskarten nach Referenz 1 – jede mit eigenem Akzent
   und eigener technischer Mini-Visualisierung (SVG/CSS, keine Bilder). */

type Card = {
  icon: typeof MonitorCog;
  title: string;
  text: string;
  href: string;
  accent: string; // Akzentfarbe der Karte
  visual: React.ReactNode;
};

const vis = {
  managed: (
    <svg viewBox="0 0 140 44" className="h-11 w-full" aria-hidden>
      <polyline
        points="0,32 18,28 34,31 50,22 66,26 82,16 98,21 114,12 130,16 140,10"
        fill="none" stroke="#19d8f2" strokeWidth="1.6"
      />
      {[10, 34, 58, 82, 106, 130].map((x, i) => (
        <rect key={x} x={x} y={36 - (i % 3) * 3} width="5" height={8 + (i % 3) * 3} rx="1" fill="rgba(25,216,242,0.3)" />
      ))}
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 140 44" className="h-11 w-full" aria-hidden>
      <path d="M46 30a10 10 0 0 1 2-19.8A13 13 0 0 1 73 8a11 11 0 0 1 11 11 9 9 0 0 1-2 17.8H48z" fill="none" stroke="#5ec6f2" strokeWidth="1.6" transform="translate(18,2)" />
      {[36, 70, 104].map((x) => (
        <line key={x} x1={x} y1="38" x2={x} y2="44" stroke="rgba(94,198,242,0.5)" strokeWidth="1.4" strokeDasharray="2 3" />
      ))}
    </svg>
  ),
  cyber: (
    <svg viewBox="0 0 140 44" className="h-11 w-full" aria-hidden>
      <path d="M70 4l16 6v10c0 10-6.5 17.5-16 20-9.5-2.5-16-10-16-20V10z" fill="rgba(34,230,181,0.1)" stroke="#22e6b5" strokeWidth="1.6" />
      <path d="M63 22l5 5 9-10" fill="none" stroke="#22e6b5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="22" x2="48" y2="22" stroke="rgba(34,230,181,0.3)" strokeWidth="1" strokeDasharray="3 4" />
      <line x1="92" y1="22" x2="132" y2="22" stroke="rgba(34,230,181,0.3)" strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  ),
  ki: (
    <svg viewBox="0 0 140 44" className="h-11 w-full" aria-hidden>
      <circle cx="70" cy="22" r="11" fill="rgba(139,125,242,0.12)" stroke="#8b7df2" strokeWidth="1.6" />
      <circle cx="66" cy="20" r="1.8" fill="#8b7df2" />
      <circle cx="74" cy="20" r="1.8" fill="#8b7df2" />
      <path d="M65 27c3 2.4 7 2.4 10 0" fill="none" stroke="#8b7df2" strokeWidth="1.4" strokeLinecap="round" />
      {[[16, 10], [16, 34], [124, 10], [124, 34]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.5" fill="none" stroke="rgba(139,125,242,0.55)" strokeWidth="1.2" />
          <line x1={x < 70 ? x + 4 : x - 4} y1={y} x2={x < 70 ? 58 : 82} y2="22" stroke="rgba(139,125,242,0.35)" strokeWidth="1" strokeDasharray="2 3" />
        </g>
      ))}
    </svg>
  ),
  backup: (
    <svg viewBox="0 0 140 44" className="h-11 w-full" aria-hidden>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <ellipse cx="52" cy={10 + i * 11} rx="16" ry="4.5" fill="none" stroke="#f2b544" strokeWidth="1.4" opacity={0.9 - i * 0.25} />
        </g>
      ))}
      <path d="M86 22h22m0 0-6-6m6 6-6 6" fill="none" stroke="#f2b544" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="122" cy="22" r="7" fill="rgba(242,181,68,0.12)" stroke="#f2b544" strokeWidth="1.4" />
      <path d="M119.5 22l2 2 3.5-4" fill="none" stroke="#f2b544" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  dash: (
    <svg viewBox="0 0 140 44" className="h-11 w-full" aria-hidden>
      {[
        [10, 26, 10], [28, 18, 18], [46, 30, 6], [64, 14, 22], [82, 22, 14], [100, 10, 26], [118, 18, 18],
      ].map(([x, y, h], i) => (
        <rect key={i} x={x} y={y} width="9" height={h + 8} rx="1.5" fill="rgba(25,216,242,0.55)" />
      ))}
      <polyline points="10,20 34,14 58,22 82,10 106,14 130,6" fill="none" stroke="#22e6b5" strokeWidth="1.6" />
    </svg>
  ),
};

const CARDS: Card[] = [
  {
    icon: MonitorCog,
    title: "Managed IT",
    text: "Betrieb, Updates und Monitoring deiner kompletten IT – proaktiv und zuverlässig.",
    href: "/leistungen/managed-it",
    accent: "#19d8f2",
    visual: vis.managed,
  },
  {
    icon: CloudCog,
    title: "Cloud",
    text: "Moderne Cloud-Lösungen mit Microsoft 365 – sicher, flexibel und effizient.",
    href: "/leistungen/cloud-loesungen",
    accent: "#5ec6f2",
    visual: vis.cloud,
  },
  {
    icon: ShieldHalf,
    title: "Cybersecurity",
    text: "Firewall, Endpoint-Schutz und E-Mail-Sicherheit – gegen aktuelle Bedrohungen.",
    href: "/leistungen/cybersecurity",
    accent: "#22e6b5",
    visual: vis.cyber,
  },
  {
    icon: Bot,
    title: "KI-Agenten",
    text: "Kundenanfragen automatisch beantworten – per WhatsApp, Telefon, E-Mail und mehr.",
    href: "/leistungen/ki-agenten",
    accent: "#8b7df2",
    visual: vis.ki,
  },
  {
    icon: DatabaseBackup,
    title: "Backup & Recovery",
    text: "Getestete Sicherungen und schnelle Wiederherstellung – wenn es darauf ankommt.",
    href: "/leistungen/backup-recovery",
    accent: "#f2b544",
    visual: vis.backup,
  },
  {
    icon: BarChart3,
    title: "Dashboards & Monitoring",
    text: "Alle Systeme, Kennzahlen und Services live auf einen Blick.",
    href: "/loesungen",
    accent: "#19d8f2",
    visual: vis.dash,
  },
];

export default function ServiceCards() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <Reveal key={c.href + c.title} delay={(i % 3) * 0.07}>
            <Link
              href={c.href}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--acc)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.4)]"
              style={
                {
                  "--acc": c.accent,
                  borderColor: `${c.accent}38`,
                  background: `linear-gradient(155deg, ${c.accent}24 0%, rgba(13,27,43,0.92) 42%, rgba(8,15,29,0.95) 100%)`,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                } as React.CSSProperties
              }
            >
              {/* Lichtschein oben rechts, verstärkt sich beim Hover */}
              <span
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-30 blur-2xl transition-opacity duration-300 group-hover:opacity-60"
                style={{ background: c.accent }}
                aria-hidden
              />
              <div className="relative flex items-center justify-between">
                <span
                  className="grid h-11 w-11 place-items-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
                  style={{
                    color: c.accent,
                    borderColor: `${c.accent}33`,
                    background: `${c.accent}14`,
                  }}
                >
                  <c.icon size={21} strokeWidth={1.9} aria-hidden />
                </span>
                <span
                  className="grid h-8 w-8 place-items-center rounded-full border border-white/12 text-fog transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-cyan/50 group-hover:text-cyan"
                >
                  <ArrowRight size={14} strokeWidth={2.2} aria-hidden />
                </span>
              </div>
              <h3 className="relative mt-5 font-[family-name:var(--font-display)] text-xl font-bold text-white">
                {c.title}
              </h3>
              <p className="relative mt-2 flex-1 text-sm leading-relaxed text-fog">{c.text}</p>
              <div className="relative mt-5 rounded-lg border border-white/6 bg-night/50 px-3 py-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                {c.visual}
              </div>
              <span
                className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"
                style={{ color: c.accent }}
              >
                Mehr erfahren
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
