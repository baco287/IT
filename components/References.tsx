import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHead, container } from "./ui";
import voltgasShot from "@/public/images/refs/volt-gas.jpg";
import zulassungShot from "@/public/images/refs/deutschezulassung.jpg";
import heizwechselShot from "@/public/images/refs/heizwechsel.jpg";
import hairvenlyShot from "@/public/images/refs/hairvenly.jpg";

type Project = {
  name: string;
  domain: string;
  url: string;
  task: string;
  solution: string;
  tags: string[];
  img: StaticImageData;
  alt: string;
};

/* Echte, live laufende Projekte – ohne erfundene Kennzahlen oder Kundenstimmen */
const PROJECTS: Project[] = [
  {
    name: "Volt-Gas",
    domain: "volt-gas.de",
    url: "https://www.volt-gas.de/",
    task: "Ein Wechselservice für Strom und Gas, bei dem Interessenten Tarife online berechnen und direkt anfragen können.",
    solution:
      "Webseite mit Tarifrechner, mehrstufiger Anfrage-Strecke und angebundenem CRM für den persönlichen Kundenservice.",
    tags: ["Webseite", "Tarifrechner", "Lead-Strecke", "CRM-Anbindung"],
    img: voltgasShot,
    alt: "Startseite von volt-gas.de mit Tarifrechner für Strom und Gas",
  },
  {
    name: "DeutscheZulassung",
    domain: "deutschezulassung.de",
    url: "https://deutschezulassung.de/",
    task: "Kfz-Zulassung für Privatkunden, Autohäuser und Gewerbe – vollständig online beauftragbar.",
    solution: "Serviceportal mit klarer digitaler Antragsstrecke und transparenter Preisübersicht.",
    tags: ["Serviceportal", "Digitale Antragsstrecke"],
    img: zulassungShot,
    alt: "Startseite von deutschezulassung.de mit digitalem Zulassungsprozess",
  },
  {
    name: "Heizwechsel",
    domain: "heizwechsel.de",
    url: "https://heizwechsel.de/",
    task: "Ein kostenloser Erst-Check für Wärmepumpe, Photovoltaik und Heizungstausch, den Hausbesitzer online anfragen können.",
    solution:
      "Landingpage mit Online-Check, Ersparnis-Rechner und Anfrage-Strecke zur Vermittlung an geprüfte Fachpartner.",
    tags: ["Landingpage", "Ersparnis-Rechner", "Anfrage-Strecke"],
    img: heizwechselShot,
    alt: "Startseite von heizwechsel.de mit Erst-Check für Heizungsmodernisierung",
  },
  {
    name: "Hairvenly",
    domain: "hairvenly.de",
    url: "https://hairvenly.de/",
    task: "Ein Online-Shop für salongetestete Echthaar-Extensions – für Endkundinnen und Salons.",
    solution: "Online-Shop mit Produktwelt und durchgängigem Markenauftritt.",
    tags: ["Online-Shop", "Markenauftritt"],
    img: hairvenlyShot,
    alt: "Startseite des Online-Shops hairvenly.de",
  },
];

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-teal-dark/70 hover:shadow-[var(--shadow-card-hover)]">
      {/* große Projektvorschau */}
      <div className="border-b border-line bg-soft p-4 pb-0 sm:p-6 sm:pb-0">
        <div className="overflow-hidden rounded-t-xl border border-b-0 border-line bg-white">
          <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
            <span className="h-2 w-2 rounded-full bg-line" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-line" aria-hidden />
            <span className="h-2 w-2 rounded-full bg-line" aria-hidden />
            <span className="ml-2 text-xs text-muted">{p.domain}</span>
          </div>
          <Image
            src={p.img}
            alt={p.alt}
            className="aspect-[16/10] w-full object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[1.5rem] font-bold">{p.name}</h3>
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-tint px-3 py-1 text-xs font-semibold text-teal-text">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-dark" aria-hidden />
            Live im Einsatz
          </span>
        </div>

        <dl className="mt-5 flex-1 space-y-4 text-[15px] leading-relaxed">
          <div>
            <dt className="font-semibold text-ink">Aufgabe</dt>
            <dd className="mt-0.5 text-muted">{p.task}</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Umgesetzte Lösung</dt>
            <dd className="mt-0.5 text-muted">{p.solution}</dd>
          </div>
        </dl>

        <ul className="mt-5 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-[13px] font-medium text-text">
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-line pt-5">
          <a
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-ink after:absolute after:inset-0 after:rounded-3xl focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-teal-text"
          >
            Projekt ansehen
            <ArrowUpRight
              size={18}
              strokeWidth={2.2}
              className="text-teal-dark transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
            <span className="sr-only">
              : {p.name} ({p.domain}, öffnet in neuem Tab)
            </span>
          </a>
        </p>
      </div>
    </article>
  );
}

/* standalone: eigene Referenzen-Seite – dort liefert der Seitenkopf die Überschrift */
export default function References({
  standalone = false,
  tone = "soft",
}: {
  standalone?: boolean;
  tone?: "white" | "soft";
}) {
  return (
    <section id="referenzen" className={`${tone === "soft" ? "bg-soft" : "bg-white"} py-20 lg:py-28`}>
      <div className={container}>
        {!standalone && (
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              eyebrow="Referenzen"
              title="Projekte, die heute im Einsatz sind."
              text="Webseiten, Rechner und Anfrage-Strecken, die wir umgesetzt haben – jeweils mit Aufgabe und Lösung."
            />
            <Link
              href="/referenzen"
              className="inline-flex min-h-11 flex-none items-center gap-2 text-[15px] font-semibold text-ink hover:text-teal-text"
            >
              Alle Referenzen ansehen
              <ArrowRight size={17} strokeWidth={2.2} className="text-teal-dark" aria-hidden />
            </Link>
          </div>
        )}
        <div className={`grid gap-6 md:grid-cols-2 ${standalone ? "" : "mt-12"}`}>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.domain} p={p} />
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
          Wir nennen bewusst keine Umsatz- oder Einsparzahlen unserer Kunden. Was die Projekte
          leisten, sehen Sie am besten selbst – alle Seiten sind öffentlich erreichbar.
        </p>
      </div>
    </section>
  );
}
