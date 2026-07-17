"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Magnetic from "./Magnetic";
import heroImg from "@/public/images/server.jpg";

const TRUST = [
  "Persönlicher Ansprechpartner",
  "Schnelle Reaktionszeiten",
  "Individuelle Lösungen",
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Leichte Parallaxe des Hintergrundbilds beim Scrollen
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  return (
    <section
      id="start"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pt-24"
    >
      {/* Hintergrund: Server-Render mit Overlays für Lesbarkeit */}
      <motion.div style={{ y: reduce ? 0 : bgY }} className="absolute inset-0" aria-hidden>
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          placeholder="blur"
          className="object-cover object-[72%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-transparent to-night" />
      </motion.div>

      {/* Ruhige Lichtakzente über dem Bild */}
      <motion.div
        className="absolute left-[4%] top-[16%] h-[380px] w-[380px] rounded-full bg-cyan/9 blur-[110px]"
        animate={reduce ? {} : { x: [0, 44, 0], y: [0, 24, 0] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />
      <div
        className="tech-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_55%_at_28%_45%,#000_20%,transparent_72%)]"
        aria-hidden
      />

      {/* Inhalt auf der freien Bildfläche links */}
      <motion.div
        style={{ y: reduce ? 0 : fgY }}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-28 pt-10"
      >
        <div className="max-w-2xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="glass mb-7 inline-flex w-fit rounded-full px-5 py-2 text-sm font-medium text-fog"
          >
            IT-Dienstleistungen für Unternehmen
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15 }}
            className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
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
            className="mt-6 max-w-xl text-lg text-fog"
          >
            QonteX entwickelt sichere, leistungsfähige und zuverlässige
            IT-Lösungen für Unternehmen – persönlich betreut und optimal auf Ihre
            Anforderungen abgestimmt.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
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
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2"
          >
            {TRUST.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-sm font-medium text-fog"
              >
                <Check size={15} strokeWidth={3} className="text-cyan" aria-hidden />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
