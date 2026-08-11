"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  MonitorCog,
  CloudCog,
  ShieldHalf,
  Bot,
  ArrowRight,
  Check,
} from "lucide-react";
import SectionHead from "./SectionHead";

const TABS = [
  {
    icon: MonitorCog,
    key: "managed",
    slug: "managed-it",
    tab: "Managed IT",
    title: "Ihre komplette IT – betrieben und gepflegt",
    text: "Wir übernehmen den laufenden Betrieb Ihrer Systeme: Updates, Monitoring, Wartung und Weiterentwicklung. Planbar zum Monatspreis.",
    points: ["Proaktives 24/7-Monitoring", "Updates & Patch-Management", "Dokumentierte Systeme"],
    cmd: "qontex monitor --all",
    out: "42 Systeme · 0 Vorfälle · Ø 14 min Reaktion",
  },
  {
    icon: CloudCog,
    key: "cloud",
    slug: "cloud-loesungen",
    tab: "Cloud",
    title: "Sicher in der Cloud arbeiten – von überall",
    text: "Cloud-Migration, Microsoft 365 und sichere Remote-Arbeitsplätze – zentral verwaltet und auf Ihr Unternehmen zugeschnitten.",
    points: ["Microsoft 365 & Migration", "Sichere Remote-Zugänge", "Standortvernetzung"],
    cmd: "qontex cloud sync",
    out: "Microsoft 365 · 38 Nutzer · verschlüsselt",
  },
  {
    icon: ShieldHalf,
    key: "security",
    slug: "cybersecurity",
    tab: "Cybersecurity",
    title: "Schutz, bevor ein Angriff passiert",
    text: "Mehrschichtige Sicherheit aus Firewall, Endpoint-Schutz, E-Mail-Sicherheit und Monitoring – abgestimmt statt zusammengewürfelt.",
    points: ["Endpoint & Firewall", "E-Mail-Sicherheit", "Getestete Backups"],
    cmd: "qontex security scan",
    out: "0 kritische Funde · Backups geprüft",
  },
  {
    icon: Bot,
    key: "ki",
    slug: "ki-agenten",
    tab: "KI-Agenten",
    title: "Anfragen automatisiert beantworten",
    text: "KI-Agenten nehmen Kundenanfragen auf WhatsApp, am Telefon und per E-Mail rund um die Uhr auf – mit Übergabe an Ihr Team.",
    points: ["WhatsApp, Telefon & E-Mail", "In Ihre Systeme integriert", "Kontrolle bleibt bei Ihnen"],
    cmd: "qontex agent status",
    out: "3 Kanäle aktiv · 128 Anfragen heute",
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const t = TABS[active];

  return (
    <section id="leistungen" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Leistungen"
          title="Alles, was Ihre IT braucht – aus einer Hand"
          text="Vier Kernbereiche, ein verantwortlicher Partner. Wählen Sie einen Bereich."
        />

        {/* Tab-Leiste */}
        <div className="flex flex-wrap justify-center gap-2">
          {TABS.map((tab, i) => (
            <button
              key={tab.key}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                i === active
                  ? "bg-cyan text-[#04222b]"
                  : "border border-white/10 bg-white/[0.03] text-fog hover:border-white/25 hover:text-mist"
              }`}
            >
              <tab.icon size={16} strokeWidth={2} aria-hidden />
              {tab.tab}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="glass mt-8 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.key}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.25, 1] }}
              className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-10"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/12 text-cyan ring-1 ring-cyan/25">
                  <t.icon size={22} strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-white">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-fog">{t.text}</p>
                <ul className="mt-5 grid gap-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-mist">
                      <span className="grid h-5 w-5 flex-none place-items-center rounded bg-cyan/12 text-cyan">
                        <Check size={12} strokeWidth={3} aria-hidden />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/leistungen/${t.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
                >
                  Mehr zu {t.tab}
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
              <div className="terminal p-5" aria-hidden>
                <p className="font-[family-name:var(--font-mono)] text-[13px] text-fog">
                  <span className="text-cyan">$</span> {t.cmd}
                </p>
                <p className="mt-2 font-[family-name:var(--font-mono)] text-[13px] text-mist">
                  {t.out}
                </p>
                <div className="mt-4 h-px w-full bg-white/8" />
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {t.points.map((p) => (
                    <div
                      key={p}
                      className="rounded-md border border-white/6 bg-white/[0.02] px-2.5 py-3 text-center"
                    >
                      <Check size={15} strokeWidth={3} className="mx-auto text-cyan" aria-hidden />
                      <span className="mt-1.5 block text-[10px] leading-tight text-fog">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
