import Link from "next/link";
import {
  MonitorCog,
  Headset,
  CloudCog,
  ShieldHalf,
  Network,
  DatabaseBackup,
  Globe,
  Megaphone,
  Share2,
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
    text: "Wir betreiben und pflegen deine komplette IT-Umgebung – Updates, Wartung und Optimierung inklusive.",
  },
  {
    icon: Headset,
    slug: "it-support",
    title: "IT-Support",
    text: "Schnelle, verständliche Hilfe bei allen IT-Fragen – per Fernwartung oder direkt vor Ort.",
  },
  {
    icon: CloudCog,
    slug: "cloud-loesungen",
    title: "Cloud-Lösungen",
    text: "Sichere Cloud-Umgebungen und Microsoft 365 – flexibel, ortsunabhängig und zentral verwaltet.",
  },
  {
    icon: ShieldHalf,
    slug: "cybersecurity",
    title: "Cybersecurity",
    text: "Mehrstufige Sicherheitskonzepte, die deine Systeme, Daten und Mitarbeiter wirksam schützen.",
  },
  {
    icon: Network,
    slug: "server-netzwerke",
    title: "Server & Netzwerke",
    text: "Stabile Server- und Netzwerkinfrastrukturen – geplant, aufgebaut und kontinuierlich überwacht.",
  },
  {
    icon: DatabaseBackup,
    slug: "backup-recovery",
    title: "Backup & Recovery",
    text: "Durchdachte Datensicherung und klare Wiederherstellungspläne für den Fall der Fälle.",
  },
  {
    icon: Globe,
    slug: "webseiten",
    title: "Webseiten & Online-Shops",
    text: "Moderne, schnelle Webseiten und Shops – konzipiert, gebaut und danach zuverlässig betreut.",
  },
  {
    icon: Megaphone,
    slug: "online-marketing",
    title: "Ads & Online-Marketing",
    text: "Google- und Meta-Kampagnen mit sauberem Tracking und Reporting, das du wirklich verstehst.",
  },
  {
    icon: Share2,
    slug: "social-media",
    title: "Social Media",
    text: "Strategie, Content und Betreuung deiner Kanäle – konstant sichtbar statt sporadisch aktiv.",
  },
];

export default function Services() {
  return (
    <section id="leistungen" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Leistungen"
          title="Ganzheitliche IT-Lösungen aus einer Hand"
          text="Zehn Kernbereiche, ein verantwortlicher Partner – abgestimmt aufeinander statt zusammengestückelt."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.07}>
              <div className="glass flex h-full flex-col rounded-xl p-7 transition-shadow hover:shadow-[0_4px_16px_rgba(23,37,58,0.09)]">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-cyan/8 text-cyan">
                  <s.icon size={21} strokeWidth={1.9} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{s.title}</h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fog">
                  {s.text}
                </p>
                <Link
                  href={`/leistungen/${s.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
                >
                  Mehr zu {s.title}
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Hervorgehobene Leistung: KI-Agenten */}
        <Reveal delay={0.1}>
          <Link
            href="/leistungen/ki-agenten"
            className="glass mt-5 flex flex-col items-start gap-6 rounded-xl border-cyan/35 p-7 transition-shadow hover:shadow-[0_4px_16px_rgba(23,37,58,0.09)] sm:flex-row sm:items-center sm:p-8"
          >
            <span className="grid h-13 w-13 flex-none place-items-center rounded-xl bg-cyan/8 p-3 text-cyan">
              <Bot size={26} strokeWidth={1.9} aria-hidden />
            </span>
            <span className="flex-1">
              <span className="mb-1.5 flex flex-wrap items-center gap-2.5">
                <span className="text-lg font-semibold text-white">
                  KI-Agenten & Automatisierung
                </span>
                <span className="rounded-full border border-cyan/40 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-cyan">
                  Neu
                </span>
              </span>
              <span className="block max-w-2xl text-sm leading-relaxed text-fog">
                KI-Assistenten, die deine Kundenanfragen auf WhatsApp, am Telefon und
                per E-Mail rund um die Uhr aufnehmen und beantworten – integriert in
                deine Systeme, mit Übergabe an dein Team im richtigen Moment.
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
              Mehr zu KI-Agenten
              <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
