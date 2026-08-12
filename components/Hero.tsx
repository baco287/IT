"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* Abstrakte Lichtstreifen im Hero-Hintergrund (neon-Stil), rein CSS */
const STREAKS: Array<{
  left: string;
  height: number;
  width: number;
  opacity: number;
  blur: number;
  color: string;
}> = [
  { left: "4%", height: 150, width: 22, opacity: 0.1, blur: 18, color: "#22d3ee" },
  { left: "9%", height: 230, width: 10, opacity: 0.2, blur: 10, color: "#45e6be" },
  { left: "14%", height: 120, width: 26, opacity: 0.08, blur: 22, color: "#22d3ee" },
  { left: "21%", height: 300, width: 8, opacity: 0.22, blur: 8, color: "#22d3ee" },
  { left: "26%", height: 180, width: 16, opacity: 0.12, blur: 14, color: "#45e6be" },
  { left: "33%", height: 260, width: 12, opacity: 0.18, blur: 12, color: "#22d3ee" },
  { left: "39%", height: 140, width: 20, opacity: 0.1, blur: 18, color: "#8be9f7" },
  { left: "45%", height: 340, width: 9, opacity: 0.26, blur: 8, color: "#45e6be" },
  { left: "52%", height: 220, width: 14, opacity: 0.16, blur: 12, color: "#22d3ee" },
  { left: "58%", height: 420, width: 7, opacity: 0.5, blur: 4, color: "#eafcff" },
  { left: "61%", height: 360, width: 12, opacity: 0.3, blur: 8, color: "#d9a441" },
  { left: "66%", height: 280, width: 10, opacity: 0.22, blur: 10, color: "#22d3ee" },
  { left: "73%", height: 190, width: 18, opacity: 0.12, blur: 16, color: "#45e6be" },
  { left: "79%", height: 320, width: 9, opacity: 0.2, blur: 9, color: "#22d3ee" },
  { left: "85%", height: 160, width: 22, opacity: 0.09, blur: 20, color: "#8be9f7" },
  { left: "91%", height: 240, width: 11, opacity: 0.16, blur: 12, color: "#45e6be" },
];

/* 5 Leistungsspalten mit Mini-UI-Thumbnails, wie neons Hero-Zeile */
const COLUMNS = [
  {
    name: "Managed IT.",
    text: "Betrieb, Updates und Monitoring Ihrer kompletten IT.",
    slug: "managed-it",
    thumb: (
      <svg viewBox="0 0 140 64" className="h-16 w-full" aria-hidden>
        <polyline
          points="0,44 20,40 35,46 50,30 65,34 80,20 95,26 110,14 125,18 140,10"
          fill="none"
          stroke="#45e6be"
          strokeWidth="1.5"
        />
        {[8, 28, 48, 68, 88, 108, 128].map((x, i) => (
          <rect key={x} x={x} y={54 - (i % 3) * 4} width="6" height={10 + (i % 3) * 4} fill="rgba(255,255,255,0.14)" />
        ))}
      </svg>
    ),
    caption: "Monitoring",
  },
  {
    name: "Cloud.",
    text: "Microsoft 365 und sichere Remote-Arbeit, zentral verwaltet.",
    slug: "cloud-loesungen",
    thumb: (
      <div className="flex h-16 flex-col justify-center gap-1.5 px-1 font-[family-name:var(--font-mono)] text-[9px] leading-none text-fog">
        <span className="text-[#45e6be]">✓ postfach → microsoft 365</span>
        <span>✓ dateien → sharepoint</span>
        <span>✓ zugriff → vpn / sso</span>
        <span className="text-white/40">synchronisiert · verschlüsselt</span>
      </div>
    ),
    caption: "Migration",
  },
  {
    name: "Cybersecurity.",
    text: "Firewall, Endpoint-Schutz und E-Mail-Sicherheit.",
    slug: "cybersecurity",
    thumb: (
      <div className="flex h-16 flex-col justify-center gap-1.5 px-1 font-[family-name:var(--font-mono)] text-[9px] leading-none text-fog">
        <span>12:34:01 mail-filter <span className="text-[#45e6be]">ok</span></span>
        <span>12:34:02 endpoint-scan <span className="text-[#45e6be]">ok</span></span>
        <span className="rounded-sm bg-white/8 px-1 py-0.5 text-white">12:34:09 phishing blockiert</span>
      </div>
    ),
    caption: "Abwehr",
  },
  {
    name: "KI-Agenten.",
    text: "Anfragen automatisch beantworten – WhatsApp, Telefon, E-Mail.",
    slug: "ki-agenten",
    thumb: (
      <div className="flex h-16 flex-col justify-center gap-1.5 px-1">
        <span className="w-fit rounded-md bg-white/8 px-2 py-1 text-[9px] leading-none text-mist">Habt ihr morgen einen Termin frei?</span>
        <span className="ml-auto w-fit rounded-md bg-[#123d43] px-2 py-1 text-[9px] leading-none text-[#9beee0]">Ja – 10:30 oder 14:00 Uhr?</span>
      </div>
    ),
    caption: "Rund um die Uhr",
  },
  {
    name: "Backup & Recovery.",
    text: "Getestete Sicherungen mit schneller Wiederherstellung.",
    slug: "backup-recovery",
    thumb: (
      <div className="flex h-16 flex-col justify-center gap-1.5 px-1 font-[family-name:var(--font-mono)] text-[9px] leading-none text-fog">
        <span>02:00 snapshot <span className="text-[#45e6be]">ok</span></span>
        <span>02:12 offsite-kopie <span className="text-[#45e6be]">ok</span></span>
        <span>05:00 restore-test <span className="text-[#45e6be]">bestanden</span></span>
      </div>
    ),
    caption: "Täglich geprüft",
  },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.25, 1] as const },
        };

  return (
    <section id="start" className="relative overflow-hidden pb-16 pt-64">
      {/* Lichtstreifen-Hintergrund */}
      <div
        className="absolute inset-x-0 top-0 h-[30rem] [mask-image:linear-gradient(to_bottom,black_35%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_35%,transparent)]"
        aria-hidden
      >
        {STREAKS.map((s, i) => (
          <span
            key={i}
            className="absolute top-0 rounded-b-full"
            style={{
              left: s.left,
              height: s.height,
              width: s.width,
              opacity: s.opacity,
              filter: `blur(${s.blur}px)`,
              background: `linear-gradient(to bottom, ${s.color}, transparent)`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.p
          {...rise(0.05)}
          className="mb-5 flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-fog"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
          IT-Service für den Mittelstand – aus Deutschland
        </motion.p>

        <motion.h1
          {...rise(0.12)}
          className="max-w-4xl text-[2.7rem] font-semibold leading-[1.06] tracking-tight text-white sm:text-[3.9rem]"
        >
          IT, die läuft. Betreut von Menschen, nicht Hotlines.
        </motion.h1>

        <motion.div {...rise(0.22)} className="mt-9 flex flex-wrap items-center gap-3.5">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-night transition-colors hover:bg-mist"
          >
            Kostenlose Erstberatung
          </Link>
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-white/40"
          >
            Leistungen ansehen
          </Link>
        </motion.div>

        {/* 5-spaltige Leistungszeile mit Mini-Thumbnails */}
        <motion.ul
          {...rise(0.34)}
          className="mt-20 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5"
        >
          {COLUMNS.map((c) => (
            <li key={c.slug}>
              <p className="text-sm leading-relaxed text-fog">
                <Link
                  href={`/leistungen/${c.slug}`}
                  className="font-semibold text-white hover:text-cyan"
                >
                  {c.name}
                </Link>{" "}
                {c.text}
              </p>
              <div className="mt-4 overflow-hidden rounded-lg border border-white/8 bg-white/[0.02] px-2 py-1.5">
                {c.thumb}
                <p className="mt-1 border-t border-white/6 px-1 pt-1.5 font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-wider text-white/35">
                  {c.caption}
                </p>
              </div>
            </li>
          ))}
        </motion.ul>

        <motion.div {...rise(0.42)} className="mt-14">
          <Link
            href="/referenzen"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-fog transition-colors hover:text-cyan"
          >
            Aus unserer Arbeit – Referenzen ansehen
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
