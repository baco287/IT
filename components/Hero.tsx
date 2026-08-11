"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Terminal } from "lucide-react";

const TRUST = [
  "Persönlicher Ansprechpartner",
  "Reaktion in 24 h",
  "Hosting in Deutschland",
];

const STATUS = [
  { label: "Server & Netzwerke", value: "Betriebsbereit" },
  { label: "Backups", value: "Heute 02:00" },
  { label: "Monitoring", value: "Aktiv" },
  { label: "Sicherheitsupdates", value: "Aktuell" },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.25, 1] as const },
        };

  return (
    <section id="start" className="relative overflow-hidden px-6 pb-24 pt-36">
      {/* Hintergrund: Glow + Punktraster */}
      <div className="glow left-1/2 top-[-6rem] h-[34rem] w-[46rem] -translate-x-1/2 bg-[#1f7a4d]/25" aria-hidden />
      <div className="glow right-[-6rem] top-[10rem] h-[24rem] w-[24rem] bg-[#2660b4]/20" aria-hidden />
      <div
        className="dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_20%,transparent_75%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div {...rise(0.02)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-fog">
              <span className="status-dot" aria-hidden />
              IT-Dienstleistungen aus einer Hand
            </span>
          </motion.div>
          <motion.h1
            {...rise(0.1)}
            className="mt-6 text-[2.7rem] font-bold leading-[1.05] text-mist sm:text-6xl"
          >
            Die IT-Basis für{" "}
            <span className="grad">Unternehmen, die laufen.</span>
          </motion.h1>
          <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
            QonteX plant, betreibt und schützt Ihre IT – Server, Cloud,
            Sicherheit und Support aus einer Hand. Persönlich betreut,
            überwacht rund um die Uhr, ohne Ausfallzeiten.
          </motion.p>
          <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-[#04210f] shadow-[0_0_0_1px_rgba(41,209,126,0.4),0_10px_30px_rgba(41,209,126,0.25)] transition-all hover:-translate-y-0.5 hover:bg-cyan-soft"
            >
              Kostenlose Erstberatung
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.03] px-7 py-3.5 font-semibold text-mist transition-colors hover:border-white/25 hover:bg-white/[0.06]"
            >
              Leistungen ansehen
            </Link>
          </motion.div>
          <motion.ul {...rise(0.4)} className="mt-8 flex flex-wrap gap-x-7 gap-y-2">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2 text-sm font-medium text-fog">
                <Check size={15} strokeWidth={3} className="text-cyan" aria-hidden />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Konsolen-Visual */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 26 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, delay: 0.2, ease: [0.2, 0.7, 0.25, 1] as const },
              })}
          className="glass rounded-2xl p-1.5"
          aria-hidden
        >
          <div className="terminal overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-white/12" />
              <span className="h-3 w-3 rounded-full bg-white/12" />
              <span className="h-3 w-3 rounded-full bg-white/12" />
              <span className="ml-2 flex items-center gap-1.5 text-xs text-fog">
                <Terminal size={13} /> qontex — operations
              </span>
              <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-cyan">
                <span className="status-dot" />
                live
              </span>
            </div>
            <div className="px-5 py-4 text-[13px] leading-relaxed">
              <p className="text-fog">
                <span className="text-cyan">$</span> qontex status
              </p>
              <p className="mt-1 text-mist">
                Alle Systeme <span className="text-cyan">betriebsbereit</span> ·
                Verfügbarkeit 99,98 %
              </p>
              <div className="mt-4 grid gap-2">
                {STATUS.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-md border border-white/6 bg-white/[0.02] px-3 py-2"
                  >
                    <span className="flex items-center gap-2 text-mist">
                      <Check size={13} strokeWidth={3} className="text-cyan" />
                      {s.label}
                    </span>
                    <span className="text-xs text-fog">{s.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-end gap-1.5">
                {[34, 48, 40, 62, 55, 74, 68, 88, 96].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-sm bg-gradient-to-t from-cyan/30 to-cyan"
                    style={{ height: `${h * 0.5}px` }}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-fog">Anfragen über Kundensysteme · 12 Monate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
