import Link from "next/link";
import { LinkRows, SectionHead, container, rowLink, textLink } from "./ui";
import { servicesByGroup, type ServiceGroup } from "@/lib/services";

type Row = { title: string; text: string; href: string };

/* Die vier Kernleistungen der Startseite. Was im Einzelnen dazugehört, steht auf den Leistungsseiten. */
const CORE: Row[] = [
  {
    title: "Prozesse automatisieren",
    text: "Wir digitalisieren wiederkehrende Aufgaben und verbinden Ihre Systeme, damit Ihr Team weniger manuelle Arbeit erledigen muss.",
    href: "/leistungen/prozessautomatisierung",
  },
  {
    title: "Webseiten & Landingpages",
    text: "Wir erstellen und optimieren Webseiten, die Besucher überzeugen und in qualifizierte Kundenanfragen verwandeln können.",
    href: "/leistungen/webseiten",
  },
  {
    title: "SEO & KI-Agenten",
    text: "Wir verbessern Ihre Sichtbarkeit in Suchmaschinen und automatisieren geeignete SEO-Arbeitsabläufe.",
    href: "/leistungen/seo-ki-agenten",
  },
  {
    title: "Automatisiertes Marketing-Team",
    text: "Wir verbinden Marketing-Tools und spezialisierte KI-Agenten, um Kampagnen, Inhalte und Kundenanfragen effizienter zu organisieren.",
    href: "/leistungen/marketing-automatisierung",
  },
];

/* Ergänzende Bereiche: kleinere Zeilen unter der Liste */
const MORE: Row[] = [
  {
    title: "CRM & Vertrieb",
    text: "CRM-Integration, Analyse und laufende Optimierung – damit keine Anfrage verloren geht.",
    href: "/leistungen/crm-vertrieb",
  },
  {
    title: "IT & Infrastruktur",
    text: "Ergänzend betreuen wir Ihre technische Infrastruktur: Systeme, Cloud, Sicherheit und Backups.",
    href: "/loesungen",
  },
];

/* Alle Leistungen einer Gruppe als verlinkte Zeilen (Übersichtsseiten) */
export function ServiceList({ group }: { group: ServiceGroup }) {
  return (
    <LinkRows
      items={servicesByGroup(group).map((s) => ({
        title: s.name,
        text: s.teaser,
        href: `/leistungen/${s.slug}`,
      }))}
    />
  );
}

/* Kernleistungen auf der Startseite: Liste mit großen Zeilen statt Karten-Raster */
export default function Services() {
  return (
    <section id="leistungen" className="bg-white py-20 lg:py-28">
      <div className={container}>
        <SectionHead
          title="Digitale Lösungen, die Ihr Unternehmen voranbringen."
          text="Vier Bereiche, die zusammenarbeiten: von der ersten Sichtbarkeit bis zum automatisierten Ablauf im Hintergrund."
        />

        <ul className="mt-12 border-t-2 border-ink">
          {CORE.map((s) => (
            <li key={s.href} className="border-b border-ink/15">
              <div className="relative -mx-3 grid gap-x-10 gap-y-2 px-3 py-7 transition-colors hover:bg-teal-tint lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)_auto] lg:items-baseline lg:py-9">
                <h3 className="text-[1.9rem] leading-[1.08] lg:text-[2.5rem]">
                  <Link href={s.href} className={rowLink}>
                    {s.title}
                  </Link>
                </h3>
                <p className="text-[17px] leading-relaxed text-muted">{s.text}</p>
                <span aria-hidden className={`text-[15px] ${textLink}`}>
                  Ansehen
                </span>
              </div>
            </li>
          ))}
        </ul>

        <ul className="grid md:grid-cols-2 md:gap-x-10">
          {MORE.map((m) => (
            <li key={m.href} className="border-b border-ink/15">
              <div className="relative -mx-3 px-3 py-6 transition-colors hover:bg-teal-tint">
                <h3 className="text-[1.35rem] leading-snug">
                  <Link href={m.href} className={rowLink}>
                    {m.title}
                  </Link>
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{m.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-8">
          <Link href="/leistungen" className={`inline-flex min-h-11 items-center text-[16px] ${textLink} hover:decoration-ink`}>
            Alle Leistungen ansehen
          </Link>
        </p>
      </div>
    </section>
  );
}
