"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Magnetic from "./Magnetic";

const TRUST = [
  "Persönlicher Ansprechpartner",
  "Schnelle Reaktionszeiten",
  "Individuelle Lösungen",
];

/** Schwebendes Glas-Panel mit Netzwerklinien. */
function GlassPanel({
  className,
  lines,
  delay = 0,
}: {
  className: string;
  lines: { points: string; color: string }[];
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`glass absolute rounded-2xl ${className}`}
      animate={reduce ? {} : { y: [0, -14, 0] }}
      transition={{ duration: 9, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 200 260" className="h-full w-full">
        {lines.map((l, i) => (
          <g key={i}>
            <polyline
              points={l.points}
              fill="none"
              stroke={l.color}
              strokeWidth="1.5"
              opacity=".85"
            />
            {l.points.split(" ").map((p, j) => {
              const [x, y] = p.split(",");
              return (
                <circle key={j} cx={x} cy={y} r="3.4" fill={l.color} opacity=".95" />
              );
            })}
          </g>
        ))}
      </svg>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Leichte Parallaxe beim Scrollen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);

  // Subtile Mausreaktion der Glaselemente
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 14 });
  const sy = useSpring(my, { stiffness: 40, damping: 14 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * -18);
    my.set(((e.clientY - r.top) / r.height - 0.5) * -12);
  };

  return (
    <section
      id="start"
      ref={ref}
      onPointerMove={onMove}
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      {/* Hintergrund: Tiefe, Lichter, Raster */}
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_8%,#10263f_0%,#081524_45%,var(--color-night)_100%)]" />
        <motion.div
          className="absolute left-[8%] top-[12%] h-[430px] w-[430px] rounded-full bg-cyan/12 blur-[110px]"
          animate={reduce ? {} : { x: [0, 50, 0], y: [0, 26, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[6%] top-[30%] h-[360px] w-[360px] rounded-full bg-violet/12 blur-[110px]"
          animate={reduce ? {} : { x: [0, -44, 0], y: [0, -22, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="tech-grid absolute inset-0 [mask-image:radial-gradient(ellipse_72%_58%_at_50%_36%,#000_25%,transparent_74%)]" />
      </motion.div>

      {/* Schwebende Glas-Panels */}
      <motion.div style={{ x: sx, y: sy }} className="absolute inset-0" aria-hidden>
        <GlassPanel
          className="left-[3%] top-[20%] hidden h-72 w-52 -rotate-6 xl:block"
          lines={[
            { points: "38,52 112,84 88,158 156,204", color: "#4ee0d2" },
            { points: "158,58 104,124 132,222", color: "#b9a3f7" },
          ]}
        />
        <GlassPanel
          className="left-[13%] top-[58%] hidden h-44 w-32 rotate-4 xl:block"
          delay={1.2}
          lines={[{ points: "34,44 118,84 76,190", color: "#4ee0d2" }]}
        />
        <GlassPanel
          className="right-[3%] top-[16%] hidden h-80 w-56 rotate-6 xl:block"
          delay={0.6}
          lines={[
            { points: "44,48 138,80 104,168 168,224", color: "#4ee0d2" },
            { points: "162,52 86,130 52,226", color: "#b9a3f7" },
          ]}
        />
        <GlassPanel
          className="right-[14%] top-[60%] hidden h-44 w-32 -rotate-4 xl:block"
          delay={1.8}
          lines={[{ points: "36,46 122,88 82,188", color: "#b9a3f7" }]}
        />
      </motion.div>

      {/* Lesbarkeits-Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-night"
        aria-hidden
      />

      {/* Inhalt */}
      <motion.div
        style={{ y: fgY }}
        className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-10 text-center"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="glass mx-auto mb-7 w-fit rounded-full px-5 py-2 text-sm font-medium text-fog"
        >
          IT-Dienstleistungen für Unternehmen
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="mx-auto max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          IT, die Ihr Unternehmen{" "}
          <span className="bg-gradient-to-r from-cyan-soft to-violet bg-clip-text text-transparent">
            voranbringt.
          </span>
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.28 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-fog"
        >
          QonteX entwickelt sichere, leistungsfähige und zuverlässige IT-Lösungen
          für Unternehmen – persönlich betreut und optimal auf Ihre Anforderungen
          abgestimmt.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Magnetic>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-7 py-3.5 font-semibold text-[#04222b] shadow-[0_10px_30px_rgba(45,212,234,0.28)] transition-shadow hover:shadow-[0_14px_36px_rgba(45,212,234,0.4)]"
            >
              Kostenlose Erstberatung
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </a>
          </Magnetic>
          <a
            href="#leistungen"
            className="glass inline-flex items-center gap-2 rounded-xl px-7 py-3.5 font-semibold text-mist transition-colors hover:border-cyan/40 hover:text-white"
          >
            Leistungen entdecken
          </a>
        </motion.div>

        <motion.ul
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.52 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-7 gap-y-2"
        >
          {TRUST.map((t) => (
            <li key={t} className="flex items-center gap-2 text-sm font-medium text-fog">
              <Check size={15} strokeWidth={3} className="text-cyan" aria-hidden />
              {t}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
