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
    includes: [
      "Proaktives Monitoring Ihrer Systeme",
      "Regelmäßige Updates und Patch-Management",
      "Verwaltung von Konten und Berechtigungen",
      "Saubere Dokumentation aller Systeme",
      "Fester Ansprechpartner statt Ticketsystem",
    ],
  },
  {
    icon: CloudCog,
    key: "cloud",
    slug: "cloud-loesungen",
    tab: "Cloud",
    title: "Sicher in der Cloud arbeiten – von überall",
    text: "Cloud-Migration, Microsoft 365 und sichere Remote-Arbeitsplätze – zentral verwaltet und auf Ihr Unternehmen zugeschnitten.",
    includes: [
      "Analyse: was gehört in die Cloud, was nicht",
      "Migration von E-Mail, Daten und Anwendungen",
      "Microsoft 365 einrichten und verwalten",
      "Sichere Remote- und Standort-Zugänge",
      "Zentrale Verwaltung und Datensicherung",
    ],
  },
  {
    icon: ShieldHalf,
    key: "security",
    slug: "cybersecurity",
    tab: "Cybersecurity",
    title: "Schutz, bevor ein Angriff passiert",
    text: "Mehrschichtige Sicherheit aus Firewall, Endpoint-Schutz, E-Mail-Sicherheit und Monitoring – abgestimmt statt zusammengewürfelt.",
    includes: [
      "Endpoint-Schutz für alle Arbeitsplätze",
      "Firewall- und Netzwerksicherheit",
      "E-Mail-Sicherheit gegen Phishing",
      "Backup-Strategien mit getesteter Wiederherstellung",
      "Sensibilisierung Ihrer Mitarbeiter",
    ],
  },
  {
    icon: Bot,
    key: "ki",
    slug: "ki-agenten",
    tab: "KI-Agenten",
    title: "Anfragen automatisiert beantworten",
    text: "KI-Agenten nehmen Kundenanfragen auf WhatsApp, am Telefon und per E-Mail rund um die Uhr auf – mit Übergabe an Ihr Team.",
    includes: [
      "WhatsApp-, Telefon- und E-Mail-Assistenten",
      "Antworten rund um die Uhr",
      "Anbindung an Ihre bestehenden Systeme",
      "Übergabe an Mitarbeiter im richtigen Moment",
      "Kontrolle und Freigaben bleiben bei Ihnen",
    ],
  },
];

export default function FeatureTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const t = TABS[active];

  return (
    <section id="leistungen" className="relative px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHead
          label="Leistungen"
          title="Alles, was Ihre IT braucht – aus einer Hand"
          text="Vier Kernbereiche, ein verantwortlicher Partner. Wählen Sie einen Bereich."
        />

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

        <div className="glass mt-8 overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.key}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.2, 0.7, 0.25, 1] }}
              className="grid gap-10 p-8 md:grid-cols-2 md:p-12"
            >
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/12 text-cyan">
                  <t.icon size={22} strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-6 text-2xl font-bold text-white">{t.title}</h3>
                <p className="mt-4 leading-relaxed text-fog">{t.text}</p>
                <Link
                  href={`/leistungen/${t.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
                >
                  Mehr zu {t.tab}
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
              <div className="md:border-l md:border-white/8 md:pl-10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fog">
                  Das ist enthalten
                </p>
                <ul className="mt-5 grid gap-3.5">
                  {t.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-mist">
                      <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-cyan/12 text-cyan">
                        <Check size={12} strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
