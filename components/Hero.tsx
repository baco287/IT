"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import OpsDashboard from "./OpsDashboard";

const TRUST = [
  "Persönlicher Ansprechpartner",
  "Reaktion in 24 h",
  "Hosting in Deutschland",
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
    <section id="start" className="relative overflow-hidden px-6 pb-24 pt-36 text-center">
      {/* Große, wandernde Glow-Flächen */}
      <motion.div
        className="glow left-1/2 top-[-8rem] h-[40rem] w-[54rem] -translate-x-1/2 bg-[#0e7c8e]/25"
        animate={reduce ? {} : { x: [0, 60, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <motion.div
        className="glow left-[8%] top-[6rem] h-[26rem] w-[26rem] bg-[#2660b4]/18"
        animate={reduce ? {} : { x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div
        className="dotgrid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_18%,#000_20%,transparent_78%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div {...rise(0.02)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-sm font-medium text-fog">
            <span className="status-dot" aria-hidden />
            IT-Dienstleistungen aus einer Hand
          </span>
        </motion.div>
        <motion.h1
          {...rise(0.1)}
          className="mx-auto mt-7 max-w-3xl text-[2.9rem] font-bold leading-[1.03] text-mist sm:text-[4.2rem]"
        >
          Die IT-Basis für{" "}
          <span className="grad">Unternehmen, die laufen.</span>
        </motion.h1>
        <motion.p {...rise(0.2)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fog">
          QonteX plant, betreibt und schützt Ihre IT – Server, Cloud,
          Sicherheit und Support aus einer Hand. Persönlich betreut, überwacht
          rund um die Uhr, ohne Ausfallzeiten.
        </motion.p>
        <motion.div {...rise(0.3)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-[#04222b] shadow-[0_0_0_1px_rgba(34,211,238,0.4),0_10px_30px_rgba(34,211,238,0.25)] transition-all hover:-translate-y-0.5 hover:bg-cyan-soft"
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
        <motion.ul {...rise(0.4)} className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm font-medium text-fog">
              <Check size={15} strokeWidth={3} className="text-cyan" aria-hidden />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Großes Operations-Dashboard */}
      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 40 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.25, 1] as const },
            })}
        className="relative z-10 mx-auto mt-16 max-w-5xl text-left"
      >
        <OpsDashboard />
      </motion.div>
    </section>
  );
}
