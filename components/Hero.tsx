"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, ArrowUpRight } from "lucide-react";
import shot from "@/public/images/refs/volt-gas.jpg";

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
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.25, 1] as const },
        };

  return (
    <section id="start" className="relative overflow-hidden px-6 pb-24 pt-36 text-center">
      {/* Ein einziger, ruhiger Glow – kein animiertes Flackern */}
      <div
        className="glow left-1/2 top-[-6rem] h-[32rem] w-[48rem] -translate-x-1/2 bg-[#0e7c8e]/18"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-3xl">
        <motion.h1
          {...rise(0.05)}
          className="text-[2.9rem] font-bold leading-[1.05] text-mist sm:text-[4rem]"
        >
          IT, die läuft. Betreut von{" "}
          <span className="grad">Menschen</span>, nicht Hotlines.
        </motion.h1>
        <motion.p {...rise(0.15)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-fog">
          QonteX plant, betreibt und schützt die IT von Unternehmen – Server,
          Cloud, Sicherheit und Support aus einer Hand. Persönlich, verlässlich
          und ohne Fachchinesisch.
        </motion.p>
        <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-[#04222b] transition-all hover:-translate-y-0.5 hover:bg-cyan-soft"
          >
            Kostenlose Erstberatung
            <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
          </Link>
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.03] px-7 py-3.5 font-semibold text-mist transition-colors hover:border-white/25"
          >
            Leistungen ansehen
          </Link>
        </motion.div>
        <motion.ul {...rise(0.35)} className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-2">
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm font-medium text-fog">
              <Check size={15} strokeWidth={3} className="text-cyan" aria-hidden />
              {t}
            </li>
          ))}
        </motion.ul>
      </div>

      {/* Echter Referenz-Screenshot statt erfundenem Dashboard */}
      <motion.div
        {...(reduce
          ? {}
          : {
              initial: { opacity: 0, y: 36 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.9, delay: 0.4, ease: [0.2, 0.7, 0.25, 1] as const },
            })}
        className="relative z-10 mx-auto mt-16 max-w-4xl"
      >
        <div className="overflow-hidden rounded-xl border border-white/10 bg-navy shadow-[0_40px_120px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
            <span className="h-3 w-3 rounded-full bg-white/12" />
            <span className="h-3 w-3 rounded-full bg-white/12" />
            <span className="h-3 w-3 rounded-full bg-white/12" />
            <span className="ml-3 font-[family-name:var(--font-mono)] text-xs text-fog">
              volt-gas.de
            </span>
          </div>
          <Image
            src={shot}
            alt="Von QonteX umgesetzt: die Website volt-gas.de"
            className="w-full"
            sizes="(max-width: 1024px) 100vw, 900px"
            placeholder="blur"
            priority
          />
        </div>
        <a
          href="/referenzen"
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-fog transition-colors hover:text-cyan"
        >
          Aus unserer Arbeit – weitere Referenzen ansehen
          <ArrowUpRight size={15} strokeWidth={2.5} aria-hidden />
        </a>
      </motion.div>
    </section>
  );
}
