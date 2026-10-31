"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Clock3 } from "lucide-react";
import DataCore from "./DataCore";
import OpsDashboard from "./OpsDashboard";

/* Abstrakte Lichtstreifen im Hero-Hintergrund, rein CSS */
const STREAKS: Array<{
  left: string;
  height: number;
  width: number;
  opacity: number;
  blur: number;
  color: string;
}> = [
  { left: "4%", height: 150, width: 22, opacity: 0.1, blur: 18, color: "#19d8f2" },
  { left: "9%", height: 230, width: 10, opacity: 0.2, blur: 10, color: "#22e6b5" },
  { left: "14%", height: 120, width: 26, opacity: 0.08, blur: 22, color: "#19d8f2" },
  { left: "21%", height: 300, width: 8, opacity: 0.22, blur: 8, color: "#19d8f2" },
  { left: "26%", height: 180, width: 16, opacity: 0.12, blur: 14, color: "#22e6b5" },
  { left: "33%", height: 260, width: 12, opacity: 0.18, blur: 12, color: "#19d8f2" },
  { left: "39%", height: 140, width: 20, opacity: 0.1, blur: 18, color: "#8be9f7" },
  { left: "45%", height: 340, width: 9, opacity: 0.26, blur: 8, color: "#22e6b5" },
  { left: "52%", height: 220, width: 14, opacity: 0.16, blur: 12, color: "#19d8f2" },
  { left: "58%", height: 420, width: 7, opacity: 0.45, blur: 4, color: "#eafcff" },
  { left: "61%", height: 360, width: 12, opacity: 0.26, blur: 8, color: "#22e6b5" },
  { left: "66%", height: 280, width: 10, opacity: 0.22, blur: 10, color: "#19d8f2" },
  { left: "73%", height: 190, width: 18, opacity: 0.12, blur: 16, color: "#22e6b5" },
  { left: "79%", height: 320, width: 9, opacity: 0.2, blur: 9, color: "#19d8f2" },
  { left: "85%", height: 160, width: 22, opacity: 0.09, blur: 20, color: "#8be9f7" },
  { left: "91%", height: 240, width: 11, opacity: 0.16, blur: 12, color: "#22e6b5" },
];

const TRUST = [
  { icon: ShieldCheck, line1: "100 %", line2: "Deutschland" },
  { icon: Users, line1: "Persönliche", line2: "Ansprechpartner" },
  { icon: Clock3, line1: "24/7", line2: "Überwachung" },
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
    <section id="start" className="relative overflow-hidden pb-16 pt-32 lg:pt-36">
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

      {/* Dezentes Data-Core-Netzwerk */}
      <DataCore />

      <div className="relative z-10 mx-auto grid max-w-[88rem] items-center gap-14 px-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-10">
        <div>
          <motion.p
            {...rise(0.05)}
            className="mb-5 flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-fog"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
            IT-Service für den Mittelstand – aus Deutschland
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="text-[2.9rem] font-bold leading-[1.02] tracking-[-0.03em] text-white sm:text-[4.1rem]"
          >
            Deine IT.
            <br />
            Unsere Mission.
            <br />
            <span className="grad">Ohne Ausfälle.</span>
          </motion.h1>

          <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-lg leading-relaxed text-fog">
            QonteX betreibt und schützt die IT von Unternehmen – Server, Cloud,
            Sicherheit und Support aus einer Hand. Betreut von Menschen, nicht
            Hotlines. Damit du dich auf das Wesentliche konzentrieren kannst:
            dein Business.
          </motion.p>

          <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-cyan-soft px-6 py-3 text-sm font-semibold text-[#03222b] shadow-[0_10px_34px_rgba(25,216,242,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(25,216,242,0.4)]"
            >
              Kostenlose Erstberatung
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-mist transition-colors hover:border-cyan/50"
            >
              Leistungen ansehen
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </Link>
          </motion.div>

          <motion.ul {...rise(0.36)} className="mt-9 flex flex-wrap gap-x-9 gap-y-4">
            {TRUST.map((t) => (
              <li key={t.line2} className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan/20 bg-cyan/8 text-cyan">
                  <t.icon size={17} strokeWidth={1.9} aria-hidden />
                </span>
                <span className="text-sm leading-tight text-fog">
                  <span className="block font-semibold text-mist">{t.line1}</span>
                  {t.line2}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Operations-Dashboard (Demo) */}
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, y: 28, scale: 0.98 },
                animate: { opacity: 1, y: 0, scale: 1 },
                transition: { duration: 0.9, delay: 0.3, ease: [0.2, 0.7, 0.25, 1] as const },
              })}
        >
          <div className="relative [perspective:1800px]">
            {/* leichte räumliche Neigung wie in der Referenz – nur Desktop */}
            <div className="lg:[transform:rotateY(-7deg)_rotateX(2deg)] lg:[transform-style:preserve-3d]">
              <OpsDashboard />
            </div>

            {/* Holografische Plattform mit Tagline */}
            <div className="relative mx-auto -mt-3 hidden h-20 w-[88%] lg:block" aria-hidden>
              <div className="absolute inset-x-0 top-4 h-10 rounded-[50%] border border-cyan/35 shadow-[0_0_40px_rgba(25,216,242,0.25),inset_0_0_30px_rgba(25,216,242,0.15)]" />
              <div className="absolute inset-x-[8%] top-7 h-6 rounded-[50%] border border-cyan-soft/25" />
              <div className="absolute inset-x-[30%] top-1 h-14 rounded-[50%] bg-cyan/15 blur-xl" />
            </div>
            <p className="relative z-10 mx-auto -mt-14 hidden w-fit rounded-full border border-cyan/40 bg-navy/90 px-5 py-1.5 text-sm font-medium text-mist shadow-[0_0_24px_rgba(25,216,242,0.25)] lg:block">
              IT, die mitdenkt. Und voraus ist.
            </p>
          </div>
          <p className="mt-5 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-white/35">
            Demo-Ansicht unseres Leitstands – so sieht Betreuung bei QonteX aus
          </p>
        </motion.div>
      </div>
    </section>
  );
}
