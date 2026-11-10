import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { Eyebrow, container } from "./ui";
import voltgasShot from "@/public/images/refs/volt-gas.jpg";
import zulassungShot from "@/public/images/refs/deutschezulassung.jpg";
import heizwechselShot from "@/public/images/refs/heizwechsel.jpg";
import hairvenlyShot from "@/public/images/refs/hairvenly.jpg";

type Project = {
  name: string;
  domain: string;
  url: string;
  services: string;
  text: string;
  img: StaticImageData;
  alt: string;
};

/* Echte, live laufende Projekte – keine erfundenen Ergebnisse oder Kundenstimmen */
const PROJECTS: Project[] = [
  {
    name: "Volt-Gas",
    domain: "volt-gas.de",
    url: "https://www.volt-gas.de/",
    services: "Webseite · Tarifrechner · Lead-Strecke · CRM-Anbindung",
    text: "Strom- und Gas-Wechselservice mit Tarifrechner, mehrstufiger Anfrage-Strecke und angebundenem CRM für den persönlichen Kundenservice.",
    img: voltgasShot,
    alt: "Startseite von volt-gas.de mit Tarifrechner für Strom und Gas",
  },
  {
    name: "DeutscheZulassung",
    domain: "deutschezulassung.de",
    url: "https://deutschezulassung.de/",
    services: "Serviceportal · Digitale Antragsstrecke",
    text: "Digitale Kfz-Zulassung für Privatkunden, Autohäuser und Gewerbe – vollständig online, mit klarer Antragsstrecke und transparenten Preisen.",
    img: zulassungShot,
    alt: "Startseite von deutschezulassung.de mit digitalem Zulassungsprozess",
  },
  {
    name: "Heizwechsel",
    domain: "heizwechsel.de",
    url: "https://heizwechsel.de/",
    services: "Landingpage · Ersparnis-Rechner · Anfrage-Strecke",
    text: "Kostenloser Erst-Check für Wärmepumpe, Photovoltaik und Heizungstausch – mit Online-Check, Ersparnis-Rechner und Vermittlung geprüfter Fachpartner.",
    img: heizwechselShot,
    alt: "Startseite von heizwechsel.de mit Erst-Check für Heizungsmodernisierung",
  },
  {
    name: "Hairvenly",
    domain: "hairvenly.de",
    url: "https://hairvenly.de/",
    services: "Online-Shop · Markenauftritt",
    text: "Online-Shop für salongetestete Echthaar-Extensions – Produktwelt, Markenauftritt und Verkauf an Endkundinnen und Salons.",
    img: hairvenlyShot,
    alt: "Startseite des Online-Shops hairvenly.de",
  },
];

function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="border-b border-line bg-soft">
        <div className="flex items-center gap-1.5 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-[#e2e8f0]" aria-hidden />
          <span className="ml-2 text-xs text-muted">{p.domain}</span>
        </div>
        <div className="overflow-hidden">
          <Image
            src={p.img}
            alt={p.alt}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold">{p.name}</h3>
        <p className="mt-1 text-sm font-medium text-teal-dark">{p.services}</p>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.text}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink">
          Website ansehen
          <ArrowUpRight size={16} strokeWidth={2.2} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          <span className="sr-only">(öffnet in neuem Tab)</span>
        </span>
      </div>
    </a>
  );
}

/* standalone: eigene Referenzen-Seite – dort liefert der Seitenkopf die Überschrift */
export default function References({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="referenzen" className="bg-white py-16 lg:py-20">
      <div className={container}>
        {!standalone && (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>Referenzen</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
                Ausgewählte Projekte
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">
                Webseiten und Plattformen, die wir umgesetzt haben und die heute im
                Einsatz sind.
              </p>
            </div>
            <Link
              href="/referenzen"
              className="inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-ink hover:text-teal-dark"
            >
              Alle Referenzen ansehen
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden />
            </Link>
          </div>
        )}
        <div className={`grid gap-6 md:grid-cols-2 ${standalone ? "" : "mt-10"}`}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.domain} delay={(i % 2) * 0.06} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
