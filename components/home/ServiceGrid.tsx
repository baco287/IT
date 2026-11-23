import Link from "next/link";
import type { ComponentType } from "react";
import { AgentViz, GrowthViz, SoftwareViz, WebViz, WorkflowViz } from "../viz/ServiceViz";
import { SectionHead, container, rowLink } from "../ui";

type Card = {
  title: string;
  text: string;
  points: string[];
  href: string;
  linkLabel: string;
  Viz: ComponentType<{ className?: string }>;
  /** Anordnung im Raster (Desktop) */
  layout: "wide" | "tall" | "half" | "band";
};

const CARDS: Card[] = [
  {
    title: "KI & intelligente Agenten",
    text: "Individuelle KI-Systeme, die Informationen verarbeiten, Kundenanfragen unterstützen und Geschäftsabläufe intelligent begleiten.",
    points: ["KI-Agenten", "Chatbots", "Telefon-KI", "Dokumentenverarbeitung"],
    href: "/leistungen/ki-entwicklung",
    linkLabel: "Zur KI-Entwicklung",
    Viz: AgentViz,
    layout: "wide",
  },
  {
    title: "Automatisierung",
    text: "Wiederkehrende Prozesse automatisieren und Systeme intelligent miteinander vernetzen.",
    points: ["n8n-Workflows", "API-Integrationen", "CRM und ERP"],
    href: "/leistungen/prozessautomatisierung",
    linkLabel: "Zur Prozessautomatisierung",
    Viz: WorkflowViz,
    layout: "tall",
  },
  {
    title: "Webentwicklung",
    text: "Leistungsstarke Websites, Webanwendungen und digitale Plattformen für moderne Unternehmen.",
    points: ["Unternehmenswebsites", "Webanwendungen", "Kundenportale"],
    href: "/leistungen/webentwicklung",
    linkLabel: "Zur Webentwicklung",
    Viz: WebViz,
    layout: "half",
  },
  {
    title: "Individuelle Software",
    text: "Maßgeschneiderte Anwendungen, interne Tools und skalierbare Softwarearchitekturen.",
    points: ["Interne Tools", "Dashboards", "SaaS-Plattformen"],
    href: "/leistungen/softwareentwicklung",
    linkLabel: "Zur Softwareentwicklung",
    Viz: SoftwareViz,
    layout: "half",
  },
  {
    title: "Digitale Wachstumsprozesse",
    text: "SEO, Marketingautomatisierung, Lead-Management und digitale Vertriebsprozesse.",
    points: ["SEO-Agenten", "Lead-Management", "Marketing-Workflows"],
    href: "/leistungen/seo-marketingautomatisierung",
    linkLabel: "Zu SEO & Marketingautomatisierung",
    Viz: GrowthViz,
    layout: "band",
  },
];

const span: Record<Card["layout"], string> = {
  wide: "md:col-span-2 lg:col-span-4",
  tall: "lg:col-span-2",
  half: "lg:col-span-3",
  band: "md:col-span-2 lg:col-span-6",
};

function ServiceCard({ card }: { card: Card }) {
  const horizontal = card.layout === "wide" || card.layout === "band";
  return (
    <li
      className={`group relative flex rounded-[20px] border border-edge bg-night-2 transition-colors duration-300 hover:border-signal/45 motion-reduce:transition-none ${span[card.layout]} ${
        horizontal ? "flex-col lg:flex-row lg:items-center" : "flex-col"
      } ${card.layout === "band" ? "lg:flex-row-reverse" : ""}`}
    >
      <div className={`p-6 sm:p-8 ${horizontal ? "lg:w-[48%] lg:flex-none" : ""}`}>
        <h3 className="text-[1.5rem] leading-[1.15] text-white">
          <Link href={card.href} className={rowLink}>
            {card.title}
          </Link>
        </h3>
        <p className="mt-3 text-[16.5px] leading-relaxed text-haze">{card.text}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5" aria-label={`Beispiele: ${card.title}`}>
          {card.points.map((p) => (
            <li key={p} className="flex items-center gap-2 text-[14.5px] text-white/85">
              <span aria-hidden className="h-1 w-1 flex-none rounded-full bg-signal" />
              {p}
            </li>
          ))}
        </ul>
        <p aria-hidden className="mt-6 text-[15px] font-semibold text-signal underline decoration-signal/40 decoration-2 underline-offset-[5px] transition-colors group-hover:decoration-signal">
          {card.linkLabel}
        </p>
      </div>
      {/* Grafik am Handy immer oben und kleiner, am Desktop je nach Feldform daneben oder darüber */}
      <div
        className={`order-first flex items-center justify-center px-6 pt-6 sm:px-8 sm:pt-8 ${
          horizontal ? "lg:order-none lg:flex-1 lg:py-8" : ""
        }`}
      >
        <card.Viz
          className={`h-auto w-full max-w-[15rem] sm:max-w-[19rem] ${
            horizontal ? "lg:max-w-[30rem]" : card.layout === "tall" ? "lg:max-w-[16rem]" : ""
          }`}
        />
      </div>
    </li>
  );
}

/* Fünf Leistungsbereiche – unterschiedlich große Felder statt gleichförmiger Kartenreihe */
export default function ServiceGrid() {
  return (
    <section id="leistungen" aria-labelledby="leistungen-heading" className="on-dark bg-night">
      <div className={`${container} border-t border-edge py-20 lg:py-28`}>
        <SectionHead
          id="leistungen-heading"
          onDark
          title="Was wir entwickeln"
          text="Fünf Bereiche, die ineinandergreifen. Wir verbinden KI, Automatisierung und Software mit den Systemen, die Ihr Unternehmen bereits nutzt."
        />
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {CARDS.map((card) => (
            <ServiceCard key={card.href} card={card} />
          ))}
        </ul>
      </div>
    </section>
  );
}
