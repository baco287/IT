import { container } from "../ui";

const GROUPS = [
  {
    title: "Künstliche Intelligenz",
    items: [
      "Sprachmodelle führender Anbieter und Open-Source-Modelle",
      "Spracherkennung und Sprachausgabe für Telefon-KI",
      "Texterkennung und Auslesen von Dokumenten",
    ],
  },
  {
    title: "Automatisierung",
    items: ["n8n-Workflows", "REST-APIs und Webhooks", "Individuelle Skripte in Node.js und Python"],
  },
  {
    title: "Web und Software",
    items: ["Next.js, React und TypeScript", "PostgreSQL und weitere Datenbanken", "Hosting in deutschen Rechenzentren"],
  },
  {
    title: "Kanäle und Systeme",
    items: [
      "Website, E-Mail, WhatsApp Business und Telefon",
      "CRM-, ERP- und Kalendersysteme",
      "Buchhaltungs- und Shopsysteme über Schnittstellen",
    ],
  },
];

/* Womit wir arbeiten – zeigt, welche Technik zum Einsatz kommt, ohne Logowand */
export default function Technology() {
  return (
    <section aria-labelledby="technik-heading" className="bg-fog">
      <div className={`${container} grid gap-x-16 gap-y-12 py-20 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:py-28`}>
        <div>
          <h2 id="technik-heading" className="text-[clamp(1.85rem,6vw,2.25rem)] leading-[1.1] sm:text-[2.5rem]">
            Technik, die zu Ihren Systemen passt
          </h2>
          <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
            Wir arbeiten mit bewährten Werkzeugen und verbinden sie mit der Software, die Sie bereits
            einsetzen. Welche Technik zum Einsatz kommt, entscheiden wir nach Ihren Anforderungen.
          </p>
        </div>
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <h3 className="border-b border-ink/80 pb-3 text-[1.15rem]">{g.title}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it} className="border-b border-rule py-3 text-[16px] leading-snug text-text">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
