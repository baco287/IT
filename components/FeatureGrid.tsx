import Reveal from "./Reveal";

const ITEMS = [
  {
    title: "DSGVO-konform.",
    text: "Saubere Verträge, Auftragsverarbeitung und ein datenschutzbewusster Umgang mit deinen Systemen.",
  },
  {
    title: "Hosting in Deutschland.",
    text: "Deine Daten liegen in deutschen Rechenzentren – keine Grauzonen, kein Auslandstransfer.",
  },
  {
    title: "24/7-Monitoring.",
    text: "Systeme werden rund um die Uhr überwacht, mit klaren Eskalationswegen im Ernstfall.",
  },
  {
    title: "Getestete Backups.",
    text: "Datensicherung mit regelmäßiger Wiederherstellungsprobe – nicht nur ein grünes Häkchen.",
  },
  {
    title: "Persönlicher Ansprechpartner.",
    text: "Feste Kontaktperson, die deine Umgebung kennt – kein anonymes Ticketsystem.",
  },
  {
    title: "Transparente Festpreise.",
    text: "Der Preis im Angebot ist der Preis auf der Rechnung. Mehraufwand ist unser Risiko.",
  },
];

/* Kompaktes Feature-Grid im neon-Listenstil (Production-Grade-Pendant). */
export default function FeatureGrid() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.4rem]">
            Professionell aufgestellt.{" "}
            <span className="text-fog">
              Enterprise-Standards – ohne Enterprise-Preise und Kleingedrucktes.
            </span>
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={(i % 3) * 0.06}>
              <li className="group border-t border-white/12 pt-5 transition-[border-color] duration-300 hover:border-cyan/60">
                <p className="text-sm leading-relaxed text-fog transition-transform duration-300 group-hover:-translate-y-0.5">
                  <span className="font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                    {it.title}
                  </span>{" "}
                  {it.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
