"use client";

import { useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import {
  MonitorCog,
  Headset,
  CloudCog,
  ShieldHalf,
  Network,
  DatabaseBackup,
  ArrowRight,
  Bot,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const SERVICES = [
  {
    icon: MonitorCog,
    slug: "managed-it",
    title: "Managed IT Services",
    text: "Wir betreiben und pflegen Ihre komplette IT-Umgebung – Updates, Wartung und Optimierung inklusive.",
    tint: "from-cyan/14 to-transparent",
  },
  {
    icon: Headset,
    slug: "it-support",
    title: "IT-Support",
    text: "Schnelle, verständliche Hilfe bei allen IT-Fragen – per Fernwartung oder direkt vor Ort.",
    tint: "from-violet/14 to-transparent",
  },
  {
    icon: CloudCog,
    slug: "cloud-loesungen",
    title: "Cloud-Lösungen",
    text: "Sichere Cloud-Umgebungen und Microsoft 365 – flexibel, ortsunabhängig und zentral verwaltet.",
    tint: "from-cyan/14 to-transparent",
  },
  {
    icon: ShieldHalf,
    slug: "cybersecurity",
    title: "Cybersecurity",
    text: "Mehrstufige Sicherheitskonzepte, die Ihre Systeme, Daten und Mitarbeiter wirksam schützen.",
    tint: "from-violet/14 to-transparent",
  },
  {
    icon: Network,
    slug: "server-netzwerke",
    title: "Server & Netzwerke",
    text: "Stabile Server- und Netzwerkinfrastrukturen – geplant, aufgebaut und kontinuierlich überwacht.",
    tint: "from-cyan/14 to-transparent",
  },
  {
    icon: DatabaseBackup,
    slug: "backup-recovery",
    title: "Backup & Recovery",
    text: "Durchdachte Datensicherung und klare Wiederherstellungspläne für den Fall der Fälle.",
    tint: "from-violet/14 to-transparent",
  },
];

/** Glas-Karte mit dezentem 3D-Tilt und Lichtschein beim Hover. */
function ServiceCard({
  s,
  index,
}: {
  s: (typeof SERVICES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4}deg) rotateY(${
      (x - 0.5) * 4
    }deg) translateY(-4px)`;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <Reveal delay={(index % 3) * 0.08}>
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-[transform,border-color] duration-300 will-change-transform hover:border-cyan/30"
      >
        <div
          className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${s.tint} opacity-70`}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(45,212,234,0.09), transparent 45%)",
          }}
          aria-hidden
        />
        <div className="relative">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 text-cyan ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
            <s.icon size={22} strokeWidth={1.9} aria-hidden />
          </span>
          <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            {s.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-fog">{s.text}</p>
          <Link
            href={`/leistungen/${s.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan opacity-90 transition-opacity hover:opacity-100"
          >
            Mehr zu {s.title}
            <ArrowRight
              size={14}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  return (
    <section id="leistungen" className="relative overflow-hidden px-6 py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_0%,rgba(45,212,234,0.06),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHead
          label="Leistungen"
          title="Ganzheitliche IT-Lösungen aus einer Hand"
          text="Sechs Kernbereiche, ein verantwortlicher Partner – abgestimmt aufeinander statt zusammengestückelt."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>

        {/* Hervorgehobene Leistung: KI-Agenten */}
        <Reveal delay={0.1}>
          <Link
            href="/leistungen/ki-agenten"
            className="glass group relative mt-5 flex flex-col items-start gap-6 overflow-hidden rounded-2xl border-cyan/25 p-7 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan/45 sm:flex-row sm:items-center sm:p-8"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan/10 via-transparent to-violet/10"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan/60 to-transparent"
              aria-hidden
            />
            <span className="relative grid h-14 w-14 flex-none place-items-center rounded-2xl bg-gradient-to-br from-cyan/20 to-violet/20 text-cyan ring-1 ring-cyan/30 transition-transform duration-300 group-hover:scale-105">
              <Bot size={26} strokeWidth={1.9} aria-hidden />
            </span>
            <span className="relative flex-1">
              <span className="mb-1.5 flex flex-wrap items-center gap-2.5">
                <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  KI-Agenten & Automatisierung
                </span>
                <span className="rounded-full bg-cyan/12 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cyan">
                  Neu
                </span>
              </span>
              <span className="block max-w-2xl text-sm leading-relaxed text-fog">
                Wir entwickeln KI-Agenten, die wiederkehrende Aufgaben übernehmen –
                von der E-Mail-Vorsortierung bis zum internen Wissensassistenten.
                Integriert in Ihre Systeme, mit Kontrolle bei Ihnen.
              </span>
            </span>
            <span className="relative inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
              Mehr zu KI-Agenten
              <ArrowRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
