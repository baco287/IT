"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Check } from "lucide-react";
import heroImg from "@/public/images/server.jpg";

const TRUST = [
  "Persönlicher Ansprechpartner",
  "Reaktion innerhalb von 24 Stunden",
  "Hosting in Deutschland, DSGVO-konform",
];

const STATUS = [
  "Server & Netzwerke",
  "Backups",
  "Monitoring",
  "Sicherheitsupdates",
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
    <section id="start" className="relative overflow-hidden px-6 pb-20 pt-36">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[linear-gradient(180deg,#eaf1fb_0%,transparent_100%)]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.p
            {...rise(0.02)}
            className="inline-flex items-center gap-2 rounded-full border border-[#d7e2f2] bg-white px-4 py-1.5 text-sm font-medium text-fog"
          >
            <ShieldCheck size={15} className="text-cyan" aria-hidden />
            IT-Dienstleistungen für Unternehmen
          </motion.p>
          <motion.h1
            {...rise(0.1)}
            className="mt-6 text-[2.6rem] font-bold leading-[1.08] text-mist sm:text-5xl lg:text-[3.4rem]"
          >
            Ihre IT in{" "}
            <span className="text-cyan">verlässlichen Händen.</span>
          </motion.h1>
          <motion.p {...rise(0.2)} className="mt-5 max-w-xl text-lg leading-relaxed text-fog">
            QonteX plant, betreibt und schützt die IT von Unternehmen –
            persönlich betreut, sicher und ohne Ausfallzeiten. Damit Sie sich
            auf Ihr Kerngeschäft konzentrieren können.
          </motion.p>
          <motion.div {...rise(0.3)} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-white shadow-[0_6px_20px_rgba(24,87,184,0.25)] transition-all hover:-translate-y-0.5 hover:bg-[#134a9e] hover:shadow-[0_10px_26px_rgba(24,87,184,0.32)]"
            >
              Kostenlose Erstberatung
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 rounded-lg border border-[#cfdaea] bg-white px-7 py-3.5 font-semibold text-mist transition-colors hover:border-cyan hover:text-cyan"
            >
              Leistungen entdecken
            </Link>
          </motion.div>
          <motion.ul {...rise(0.4)} className="mt-8 grid gap-2.5">
            {TRUST.map((t) => (
              <li key={t} className="flex items-center gap-2.5 text-sm font-medium text-fog">
                <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-cyan/10 text-cyan">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.97 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.25, 1] as const },
              })}
          className="relative"
        >
          <div className="overflow-hidden rounded-2xl border border-[#dbe4f0] shadow-[0_24px_60px_rgba(15,36,64,0.14)]">
            <Image
              src={heroImg}
              alt="Server-Racks in einem Rechenzentrum"
              className="aspect-[4/3] w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 46vw"
              priority
              placeholder="blur"
            />
          </div>
          {/* Live-Status-Widget: signalisiert zuverlässigen Betrieb */}
          <div className="absolute -bottom-6 -left-4 w-[15rem] rounded-xl border border-[#e0e7f1] bg-white/95 p-4 shadow-[0_16px_40px_rgba(15,36,64,0.16)] backdrop-blur sm:-left-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-fog">
                Systemstatus
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#1f9a5c]">
                <span className="status-dot" aria-hidden />
                Betriebsbereit
              </span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {STATUS.map((s) => (
                <li key={s} className="flex items-center justify-between text-[13px] text-mist">
                  {s}
                  <Check size={13} strokeWidth={3} className="text-[#1f9a5c]" aria-hidden />
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
