"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import teamImg from "@/public/images/team.jpg";

const STEPS = [
  {
    n: "01",
    title: "Analyse",
    text: "Wir verschaffen uns ein klares Bild Ihrer aktuellen IT-Landschaft und Ihrer Ziele.",
  },
  {
    n: "02",
    title: "Individuelles IT-Konzept",
    text: "Sie erhalten einen verständlichen Plan mit klaren Empfehlungen und Prioritäten.",
  },
  {
    n: "03",
    title: "Umsetzung",
    text: "Wir setzen strukturiert um – mit sauberer Dokumentation und minimaler Betriebsunterbrechung.",
  },
  {
    n: "04",
    title: "Monitoring & Betreuung",
    text: "Ihre Systeme werden kontinuierlich überwacht, gepflegt und weiterentwickelt.",
  },
];

export default function ManagedIT() {
  const reduce = useReducedMotion();
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="glass mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
                Managed IT & Support
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Ihre IT in zuverlässigen Händen
              </h2>
              <p className="mt-4 max-w-lg leading-relaxed text-fog">
                Wir kümmern uns kontinuierlich um Ihre Systeme, damit Sie sich auf
                Ihr Kerngeschäft konzentrieren können.
              </p>
            </Reveal>

            {/* Ablauf mit animierter Verbindungslinie */}
            <div className="relative mt-10 pl-9">
              <motion.span
                aria-hidden
                className="absolute left-[15px] top-2 w-px bg-gradient-to-b from-cyan via-cyan/40 to-transparent"
                initial={reduce ? { height: "100%" } : { height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.6, ease: "easeOut" }}
              />
              <ol className="space-y-8">
                {STEPS.map((s, i) => (
                  <Reveal key={s.n} delay={0.12 * i}>
                    <li className="relative">
                      <span
                        aria-hidden
                        className="absolute -left-9 top-1 grid h-[31px] w-[31px] place-items-center rounded-full border border-cyan/40 bg-navy text-[11px] font-semibold text-cyan"
                      >
                        {s.n}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                        {s.title}
                      </h3>
                      <p className="mt-1 max-w-md text-sm leading-relaxed text-fog">
                        {s.text}
                      </p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>

          <Reveal delay={0.15} className="lg:sticky lg:top-28">
            <div className="glass relative overflow-hidden rounded-2xl">
              <Image
                src={teamImg}
                alt="IT-Fachleute arbeiten gemeinsam an Notebooks"
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent"
                aria-hidden
              />
              <div className="glass-strong absolute bottom-4 left-4 right-4 rounded-xl px-5 py-3.5">
                <p className="text-sm font-semibold text-white">
                  Persönlich statt anonym
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-fog">
                  Sie sprechen mit Menschen, die Ihre Systeme wirklich kennen.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
