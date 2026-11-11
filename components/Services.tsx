import type { ReactNode } from "react";
import Link from "next/link";
import {
  Workflow,
  PanelsTopLeft,
  Search,
  Megaphone,
  Handshake,
  Server,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { IconTile, SectionHead, container } from "./ui";
import { serviceIcon } from "./serviceIcons";
import { servicesByGroup, type ServiceGroup } from "@/lib/services";

type CoreCard = {
  icon: LucideIcon;
  title: string;
  text: string;
  examples: string[];
  note?: string;
  href: string;
  link: string;
};

/* Die vier Kernleistungen der Startseite */
const CORE: CoreCard[] = [
  {
    icon: Workflow,
    title: "Prozesse automatisieren",
    text: "Wir digitalisieren wiederkehrende Aufgaben und verbinden Ihre Systeme, damit Ihr Team weniger manuelle Arbeit erledigen muss.",
    examples: [
      "Automatische Kundenantworten",
      "Angebots- und Anfrageprozesse",
      "Terminbuchungen",
      "Datenerfassung und Weiterleitung",
      "CRM-Workflows",
    ],
    href: "/leistungen/prozessautomatisierung",
    link: "Mehr zur Prozessautomatisierung",
  },
  {
    icon: PanelsTopLeft,
    title: "Webseiten & Landingpages",
    text: "Wir erstellen und optimieren Webseiten, die Besucher überzeugen und in qualifizierte Kundenanfragen verwandeln können.",
    examples: [
      "Unternehmenswebseiten",
      "Conversion-Optimierung",
      "Landingpages",
      "Ladezeitoptimierung",
      "A/B-Tests und Analyse",
      "Formular- und CRM-Anbindung",
    ],
    href: "/leistungen/webseiten",
    link: "Mehr zu Webseiten & Landingpages",
  },
  {
    icon: Search,
    title: "SEO & KI-Agenten",
    text: "Wir verbessern Ihre Sichtbarkeit in Suchmaschinen und automatisieren geeignete SEO-Arbeitsabläufe.",
    examples: [
      "Technische SEO-Audits",
      "Keyword-Recherche",
      "Themen- und Contentplanung",
      "Content-Briefings",
      "Interne Verlinkung",
      "SEO-Monitoring",
      "KI-gestützte Analyse und Optimierung",
    ],
    note: "KI-gestützte Inhalte werden von Menschen geprüft. Keine automatisierte Massenveröffentlichung, keine Ranking-Garantien.",
    href: "/leistungen/seo-ki-agenten",
    link: "Mehr zu SEO & KI-Agenten",
  },
  {
    icon: Megaphone,
    title: "Automatisiertes Marketing-Team",
    text: "Wir verbinden Marketing-Tools und spezialisierte KI-Agenten, um Kampagnen, Inhalte und Kundenanfragen effizienter zu organisieren.",
    examples: [
      "Contentplanung",
      "Social-Media-Workflows",
      "Kampagnenvorbereitung",
      "E-Mail-Automatisierung",
      "Lead-Nurturing",
      "Performance-Reporting",
      "Marketing-Analysen",
    ],
    href: "/leistungen/marketing-automatisierung",
    link: "Mehr zur Marketing-Automatisierung",
  },
];

const MORE = [
  {
    icon: Handshake,
    title: "CRM & Vertrieb",
    text: "CRM-Integration, Analyse und laufende Optimierung – damit keine Anfrage verloren geht.",
    href: "/leistungen/crm-vertrieb",
  },
  {
    icon: Server,
    title: "IT & Infrastruktur",
    text: "Ergänzend betreuen wir Ihre technische Infrastruktur: Systeme, Cloud, Sicherheit und Backups.",
    href: "/loesungen",
  },
];

function CoreServiceCard({ c }: { c: CoreCard }) {
  return (
    <article className="group relative flex h-full flex-col rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-card)] transition-[border-color,box-shadow] duration-300 hover:border-teal-dark/70 hover:shadow-[var(--shadow-card-hover)] sm:p-9">
      <IconTile>
        <c.icon size={24} strokeWidth={1.8} aria-hidden />
      </IconTile>
      <h3 className="mt-6 text-[1.5rem] font-bold leading-tight sm:text-[1.7rem]">{c.title}</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-muted">{c.text}</p>

      <ul className="mt-6 grid gap-x-6 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
        {c.examples.map((e) => (
          <li key={e} className="flex items-start gap-2.5 text-[15px] leading-snug text-text">
            <Check size={16} strokeWidth={2.6} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
            {e}
          </li>
        ))}
      </ul>

      {c.note && (
        <p className="mt-5 rounded-xl bg-soft px-4 py-3 text-sm leading-relaxed text-muted">{c.note}</p>
      )}

      <p className="mt-auto pt-7">
        <Link
          href={c.href}
          className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-teal-text"
        >
          {c.link}
          <ArrowRight
            size={18}
            strokeWidth={2.2}
            className="text-teal-dark transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </p>
    </article>
  );
}

/* Kompakte Karte für Übersichten und Querverweise */
export function ServiceLinkCard({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-teal-dark/70 hover:shadow-[var(--shadow-card)]"
    >
      <IconTile>
        <Icon size={22} strokeWidth={1.8} aria-hidden />
      </IconTile>
      <h3 className="mt-5 text-[1.2rem] font-bold leading-snug">{title}</h3>
      <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{text}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
        Mehr erfahren
        <ArrowRight
          size={17}
          strokeWidth={2.2}
          className="text-teal-dark transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden
        />
      </span>
    </Link>
  );
}

/* Alle Leistungen einer Gruppe als Kartenraster; children = optionale Zusatzkarte am Ende */
export function ServiceGrid({
  group,
  columns = 3,
  children,
}: {
  group: ServiceGroup;
  columns?: 3 | 4;
  children?: ReactNode;
}) {
  return (
    <div className={`grid gap-5 sm:grid-cols-2 ${columns === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
      {servicesByGroup(group).map((s) => (
        <ServiceLinkCard
          key={s.slug}
          icon={serviceIcon(s.slug)}
          title={s.name}
          text={s.teaser}
          href={`/leistungen/${s.slug}`}
        />
      ))}
      {children}
    </div>
  );
}

/* Kernleistungen auf der Startseite */
export default function Services() {
  return (
    <section id="leistungen" className="bg-soft py-20 lg:py-28">
      <div className={container}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHead
            eyebrow="Unsere Lösungen"
            title="Digitale Lösungen, die Ihr Unternehmen voranbringen."
            text="Vier Bereiche, die zusammenarbeiten: von der ersten Sichtbarkeit bis zum automatisierten Ablauf im Hintergrund."
          />
          <Link
            href="/leistungen"
            className="inline-flex min-h-11 flex-none items-center gap-2 text-[15px] font-semibold text-ink hover:text-teal-text"
          >
            Alle Leistungen ansehen
            <ArrowRight size={17} strokeWidth={2.2} className="text-teal-dark" aria-hidden />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {CORE.map((c) => (
            <CoreServiceCard key={c.href} c={c} />
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {MORE.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group flex items-center gap-5 rounded-2xl border border-line bg-white p-6 transition-[border-color,box-shadow] duration-300 hover:border-teal-dark/70 hover:shadow-[var(--shadow-card)]"
            >
              <IconTile>
                <m.icon size={22} strokeWidth={1.8} aria-hidden />
              </IconTile>
              <span className="flex-1">
                <span className="block font-[family-name:var(--font-display)] text-[1.15rem] font-bold text-ink">
                  {m.title}
                </span>
                <span className="mt-1 block text-[15px] leading-relaxed text-muted">{m.text}</span>
              </span>
              <ArrowRight
                size={20}
                strokeWidth={2.2}
                className="flex-none text-teal-dark transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
