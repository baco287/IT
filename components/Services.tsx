import Link from "next/link";
import {
  Server,
  Cloud,
  ShieldCheck,
  Sparkles,
  Headset,
  Network,
  DatabaseBackup,
  Globe,
  Megaphone,
  Share2,
  BarChart3,
  Bot,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { Eyebrow, IconTile, container } from "./ui";

type Card = { icon: LucideIcon; title: string; text: string; href: string };

/* Die vier Kernleistungen für die Startseite */
const CORE: Card[] = [
  {
    icon: Server,
    title: "IT-Betreuung",
    text: "Wir übernehmen Betrieb, Wartung, Updates und Support Ihrer gesamten IT.",
    href: "/leistungen/managed-it",
  },
  {
    icon: Cloud,
    title: "Cloud & Microsoft 365",
    text: "Moderne Arbeitsplätze, sichere Daten und zuverlässige Zusammenarbeit.",
    href: "/leistungen/cloud-loesungen",
  },
  {
    icon: ShieldCheck,
    title: "IT-Sicherheit",
    text: "Wir schützen Ihre Systeme, Daten und Mitarbeiter vor digitalen Risiken.",
    href: "/leistungen/cybersecurity",
  },
  {
    icon: Sparkles,
    title: "KI & Automatisierung",
    text: "Wiederkehrende Aufgaben automatisieren und Kundenanfragen schneller beantworten.",
    href: "/leistungen/ki-agenten",
  },
];

/* Alle Leistungen für die Übersichtsseite */
const GROUPS: Array<{ title: string; cards: Card[] }> = [
  {
    title: "IT-Betreuung & Infrastruktur",
    cards: [
      CORE[0],
      { icon: Headset, title: "IT-Support", text: "Schnelle, verständliche Hilfe bei IT-Fragen – per Fernwartung oder vor Ort.", href: "/leistungen/it-support" },
      CORE[1],
      CORE[2],
      { icon: Network, title: "Server & Netzwerke", text: "Stabile Server und Netzwerke – geplant, eingerichtet und überwacht.", href: "/leistungen/server-netzwerke" },
      { icon: DatabaseBackup, title: "Backup & Wiederherstellung", text: "Regelmäßige Datensicherung mit getesteter Wiederherstellung für den Ernstfall.", href: "/leistungen/backup-recovery" },
    ],
  },
  {
    title: "Digital & Automatisierung",
    cards: [
      { icon: Bot, title: "KI-Agenten", text: "Kundenanfragen über WhatsApp, Telefon und E-Mail automatisch beantworten.", href: "/leistungen/ki-agenten" },
      { icon: Globe, title: "Webseiten & Online-Shops", text: "Moderne, schnelle Webseiten – erstellt und danach zuverlässig betreut.", href: "/leistungen/webseiten" },
      { icon: Megaphone, title: "Online-Marketing", text: "Werbeanzeigen bei Google und Meta mit klarem Budget und verständlichem Bericht.", href: "/leistungen/online-marketing" },
      { icon: Share2, title: "Social Media", text: "Strategie, Inhalte und Betreuung Ihrer Kanäle – regelmäßig und planbar.", href: "/leistungen/social-media" },
      { icon: BarChart3, title: "Dashboards & Reporting", text: "Wichtige Kennzahlen Ihres Unternehmens übersichtlich an einem Ort.", href: "/leistungen/dashboards" },
    ],
  },
];

function ServiceCard({ c }: { c: Card }) {
  return (
    <Link
      href={c.href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:border-teal/60 hover:shadow-[var(--shadow-card-hover)]"
    >
      <IconTile>
        <c.icon size={24} strokeWidth={1.8} aria-hidden />
      </IconTile>
      <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
      <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{c.text}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-teal-dark">
        Mehr erfahren
        <ArrowRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}

export default function Services({ variant = "home" }: { variant?: "home" | "all" }) {
  if (variant === "all") {
    return (
      <div className="space-y-14">
        {GROUPS.map((g) => (
          <section key={g.title} aria-labelledby={`g-${g.title}`}>
            <h2 id={`g-${g.title}`} className="text-2xl font-bold">
              {g.title}
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {g.cards.map((c, i) => (
                <Reveal key={c.href + c.title} delay={(i % 3) * 0.05} className="h-full">
                  <ServiceCard c={c} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <section id="leistungen" className="bg-white py-14 lg:py-16">
      <div className={container}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Unsere Leistungen</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
              IT-Lösungen, die einfach funktionieren.
            </h2>
          </div>
          <Link
            href="/leistungen"
            className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-ink hover:text-teal-dark"
          >
            Alle Leistungen ansehen
            <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CORE.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.05} className="h-full">
              <ServiceCard c={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
