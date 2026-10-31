"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Users, Clock3 } from "lucide-react";
import OpsDashboard from "./OpsDashboard";
import ServiceCards from "./ServiceCards";

const TRUST = [
  { icon: ShieldCheck, line1: "100 %", line2: "Deutschland" },
  { icon: Users, line1: "Persönliche", line2: "Ansprechpartner" },
  { icon: Clock3, line1: "24/7", line2: "Überwachung" },
];

/* Deterministische Lichtpunkte für den Hintergrund */
const SPARKS = Array.from({ length: 34 }, (_, i) => {
  const x = (i * 37.7) % 100;
  const y = (i * 53.3) % 100;
  return { x, y, s: 1 + (i % 3), d: (i % 9) * 0.5 };
});

/* Schaltkreis-Linien links im Hintergrund */
function Circuit() {
  const paths = [
    "M0 120 H120 L160 160 H300",
    "M0 210 H80 L120 250 H220 L250 280",
    "M0 330 H140 L180 290 H260",
    "M40 0 V70 L80 110 V180",
    "M0 430 H100 L140 470 H320",
    "M200 0 V40 L240 80 H340",
  ];
  return (
    <svg
      className="absolute left-0 top-0 hidden h-[620px] w-[520px] opacity-70 [mask-image:linear-gradient(to_right,black,transparent)] lg:block"
      viewBox="0 0 360 520"
      aria-hidden
    >
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="rgba(25,216,242,0.16)" strokeWidth="1" />
          <path d={d} fill="none" stroke="rgba(95,245,214,0.55)" strokeWidth="1" className="linkflow" style={{ animationDelay: `${i * 0.6}s` }} />
        </g>
      ))}
      {[
        [120, 120], [300, 160], [220, 250], [260, 290], [80, 110], [320, 470], [340, 80],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.4" fill="#19d8f2" className="twinkle" style={{ animationDelay: `${i * 0.7}s` }} />
      ))}
    </svg>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.2, 0.7, 0.25, 1] as const },
        };

  return (
    <section id="start" className="relative overflow-hidden pb-12 pt-20">
      {/* ---------- Hintergrund ---------- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_70%_32%,rgba(25,216,242,0.20),transparent_70%),radial-gradient(ellipse_40%_40%_at_10%_20%,rgba(25,120,242,0.10),transparent_70%),radial-gradient(ellipse_70%_30%_at_50%_100%,rgba(25,216,242,0.08),transparent_70%)]" />
        <Circuit />
        {SPARKS.map((p, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-[#7ff3ff]"
            style={{
              left: `${p.x}%`,
              top: `${p.y * 0.75}%`,
              width: p.s * 1.5,
              height: p.s * 1.5,
              boxShadow: "0 0 8px 2px rgba(25,216,242,0.6)",
              animationDelay: `${p.d}s`,
            }}
          />
        ))}
        <span className="absolute right-[1.6%] top-[18%] h-40 w-px bg-gradient-to-b from-transparent via-cyan/70 to-transparent" />
        <span className="absolute right-[2.4%] top-[32%] h-24 w-0.5 bg-gradient-to-b from-transparent via-cyan/50 to-transparent blur-[1px]" />
        <span className="absolute left-[1.5%] top-[60%] h-32 w-px bg-gradient-to-b from-transparent via-cyan/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1560px] px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,600px)_minmax(0,1fr)]">
          {/* ---------- Text ---------- */}
          <div className="pt-4 lg:pt-8">
            <motion.p
              {...rise(0.05)}
              className="mb-5 flex items-center gap-2.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-white/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan shadow-[0_0_8px_#19d8f2]" aria-hidden />
              IT-Service für den Mittelstand – aus Deutschland
            </motion.p>

            <motion.h1
              {...rise(0.12)}
              className="whitespace-nowrap text-[2.6rem] font-extrabold leading-[1.04] tracking-[-0.04em] text-white sm:text-[3.6rem] xl:text-[4.15rem]"
            >
              Deine IT.
              <br />
              Unsere Mission.
              <br />
              <span className="bg-gradient-to-r from-[#19d8f2] to-[#3fe9d0] bg-clip-text text-transparent [filter:drop-shadow(0_0_24px_rgba(25,216,242,0.35))]">
                Ohne Ausfälle.
              </span>
            </motion.h1>

            <motion.p {...rise(0.2)} className="mt-6 max-w-[34rem] text-[1.08rem] leading-relaxed text-[#dbe5ef]">
              QonteX betreibt und schützt die IT von Unternehmen – Server, Cloud,
              Sicherheit und Support aus einer Hand. Betreut von Menschen, nicht
              Hotlines. Damit du dich auf das Wesentliche konzentrieren kannst:
              dein Business.
            </motion.p>

            <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/kontakt"
                className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#19d8f2] to-[#3fe9d0] px-7 text-[15px] font-semibold text-[#03222b] shadow-[0_0_28px_rgba(25,216,242,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_38px_rgba(25,216,242,0.6)]"
              >
                Kostenlose Erstberatung
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex h-12 items-center gap-2.5 rounded-xl border border-white/35 bg-white/[0.03] px-7 text-[15px] font-semibold text-white transition-colors hover:border-cyan/70 hover:bg-cyan/[0.06]"
              >
                Leistungen ansehen
                <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
              </Link>
            </motion.div>

            <motion.ul {...rise(0.36)} className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
              {TRUST.map((t) => (
                <li key={t.line2} className="flex items-center gap-3">
                  <t.icon
                    size={30}
                    strokeWidth={1.6}
                    className="text-[#3fc4ff] [filter:drop-shadow(0_0_8px_rgba(25,216,242,0.55))]"
                    aria-hidden
                  />
                  <span className="text-[15px] leading-tight text-white/90">
                    <span className="block">{t.line1}</span>
                    {t.line2}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* ---------- Dashboard + Plattform ---------- */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 24 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.9, delay: 0.25, ease: [0.2, 0.7, 0.25, 1] as const },
                })}
            className="relative"
          >
            <div className="[perspective:2000px]">
              <div className="origin-left lg:[transform:rotateY(-9deg)_rotateX(3deg)]">
                <OpsDashboard />
              </div>
            </div>

            {/* Hologramm-Plattform */}
            <div className="relative -mt-6 hidden h-28 lg:block" aria-hidden>
              <div className="absolute inset-x-[2%] top-4 h-20 rounded-[50%] border border-cyan/45 shadow-[0_0_40px_rgba(25,216,242,0.45),inset_0_0_40px_rgba(25,216,242,0.25)]" />
              <div className="absolute inset-x-[10%] top-8 h-12 rounded-[50%] border border-[#5ff5d6]/50 shadow-[0_0_20px_rgba(95,245,214,0.35)]" />
              <div className="absolute inset-x-[20%] top-11 h-6 rounded-[50%] border border-cyan/35" />
              <div className="absolute inset-x-[25%] top-6 h-16 rounded-[50%] bg-cyan/25 blur-2xl" />
              <span className="absolute left-[18%] top-0 h-14 w-px bg-gradient-to-t from-cyan/80 to-transparent" />
              <span className="absolute right-[18%] top-0 h-14 w-px bg-gradient-to-t from-cyan/80 to-transparent" />
            </div>
            <p className="relative z-10 mx-auto -mt-[5.4rem] hidden w-fit rounded-lg border border-cyan/70 bg-[#06192a]/90 px-7 py-2 text-[15px] font-medium text-white shadow-[0_0_26px_rgba(25,216,242,0.5),inset_0_0_14px_rgba(25,216,242,0.2)] lg:block">
              IT, die mitdenkt. Und voraus ist.
            </p>
          </motion.div>
        </div>

        {/* ---------- Leistungskarten ---------- */}
        <motion.div {...rise(0.45)} className="mt-14 lg:mt-4">
          <ServiceCards />
        </motion.div>

        <p className="mt-5 text-right font-[family-name:var(--font-mono)] text-[9.5px] uppercase tracking-[0.16em] text-white/35">
          Dashboard: Demo-Ansicht des QonteX-Leitstands mit Beispielwerten
        </p>
      </div>
    </section>
  );
}
