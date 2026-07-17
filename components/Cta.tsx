"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function Cta() {
  const reduce = useReducedMotion();
  return (
    <section className="px-6 py-20">
      <Reveal className="mx-auto max-w-5xl">
        <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-14">
          {/* Langsam wandernde Hintergrundlichter */}
          <motion.div
            className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan/14 blur-[100px]"
            animate={reduce ? {} : { x: [0, 70, 0], y: [0, 36, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <motion.div
            className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-violet/14 blur-[100px]"
            animate={reduce ? {} : { x: [0, -60, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Bereit für eine IT, die einfach funktioniert?
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-fog">
              Lassen Sie uns gemeinsam herausfinden, wie QonteX Ihre IT sicherer,
              leistungsfähiger und zukunftsfähiger machen kann.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-7 py-3.5 font-semibold text-[#04222b] shadow-[0_10px_30px_rgba(45,212,234,0.28)]"
                >
                  Kostenlose Erstberatung
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
                </a>
              </Magnetic>
              <a
                href="#kontakt"
                className="glass inline-flex items-center rounded-xl px-7 py-3.5 font-semibold text-mist transition-colors hover:border-cyan/40 hover:text-white"
              >
                Kontakt aufnehmen
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
