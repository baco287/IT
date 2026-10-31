import Link from "next/link";
import {
  Server,
  CloudCog,
  ShieldCheck,
  BrainCircuit,
  Database,
  BarChart3,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* Leistungskarten-Reihe nach Referenz 1: jede Karte mit eigener,
   kräftiger Akzentfarbe, leuchtender Icon-Kachel und Pfeil-Kreis. */

const CARDS = [
  {
    icon: Server,
    title: "Managed IT",
    text: "Betrieb, Updates und Monitoring deiner kompletten IT – proaktiv und zuverlässig.",
    href: "/leistungen/managed-it",
    accent: "#2fb4ff",
  },
  {
    icon: CloudCog,
    title: "Cloud",
    text: "Microsoft 365 und sichere Cloud-Umgebungen – flexibel und zentral verwaltet.",
    href: "/leistungen/cloud-loesungen",
    accent: "#19d8f2",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    text: "Firewall, Endpoint-Schutz und E-Mail-Sicherheit – gegen aktuelle Bedrohungen.",
    href: "/leistungen/cybersecurity",
    accent: "#22e6b5",
  },
  {
    icon: BrainCircuit,
    title: "KI-Agenten",
    text: "Kundenanfragen automatisch beantworten – per WhatsApp, Telefon, E-Mail und mehr.",
    href: "/leistungen/ki-agenten",
    accent: "#9d7bff",
  },
  {
    icon: Database,
    title: "Backup & Recovery",
    text: "Getestete Sicherungen und schnelle Wiederherstellung – wenn es darauf ankommt.",
    href: "/leistungen/backup-recovery",
    accent: "#f5a524",
  },
  {
    icon: BarChart3,
    title: "Dashboards",
    text: "Alle Systeme, Kennzahlen und Services live auf einen Blick.",
    href: "/leistungen/dashboards",
    accent: "#3b82f6",
  },
];

export default function ServiceCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {CARDS.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className="group relative flex flex-col overflow-hidden rounded-xl border p-5 transition-all duration-300 hover:-translate-y-1"
          style={{
            borderColor: `${c.accent}66`,
            background: `linear-gradient(160deg, ${c.accent}33 0%, ${c.accent}12 38%, rgba(6,16,28,0.92) 100%)`,
            boxShadow: `inset 0 1px 0 ${c.accent}40, inset 0 0 30px ${c.accent}14, 0 10px 30px rgba(0,0,0,0.35)`,
          }}
        >
          {/* Lichtschein beim Hover */}
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ boxShadow: `inset 0 0 0 1px ${c.accent}, 0 0 28px ${c.accent}55` }}
            aria-hidden
          />
          <div className="relative flex items-start justify-between">
            <span
              className="grid h-12 w-12 place-items-center rounded-xl border"
              style={{
                color: c.accent,
                borderColor: `${c.accent}99`,
                background: `linear-gradient(145deg, ${c.accent}40, ${c.accent}14)`,
                boxShadow: `0 0 18px ${c.accent}55, inset 0 0 10px ${c.accent}33`,
              }}
            >
              <c.icon size={22} strokeWidth={2} aria-hidden />
            </span>
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 text-white/80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-white/60 group-hover:text-white">
              <ChevronRight size={15} strokeWidth={2.2} aria-hidden />
            </span>
          </div>
          <h3 className="relative mt-4 text-[19px] font-bold text-white">{c.title}</h3>
          <p className="relative mt-1.5 flex-1 text-[14px] leading-snug text-white/75">{c.text}</p>
          <span
            className="relative mt-3 inline-flex items-center gap-1.5 text-[14px] font-semibold"
            style={{ color: c.accent }}
          >
            Mehr erfahren
            <ArrowRight
              size={15}
              strokeWidth={2.4}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </Link>
      ))}
    </div>
  );
}
