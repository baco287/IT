import { container } from "../ui";

const INDUSTRIES = [
  "Kleine und mittelständische Unternehmen",
  "Dienstleistungsunternehmen",
  "Handwerksbetriebe",
  "Industrie und Produktion",
  "Immobilienunternehmen",
  "Agenturen",
  "E-Commerce",
  "Gesundheit und Praxen",
  "Gastronomie und Hotellerie",
  "Kfz-Unternehmen",
  "Start-ups und wachsende Unternehmen",
];

export const PROMISES = [
  {
    title: "Ein fester Ansprechpartner",
    text: "Sie sprechen mit jemandem, der Ihre Abläufe und Systeme kennt.",
  },
  {
    title: "Transparente Angebote",
    text: "Sie wissen vor dem Start, was umgesetzt wird und was es kostet.",
  },
  {
    title: "Datenschutz von Anfang an",
    text: "Datensparsam geplant, mit klaren Absprachen zu Anbietern und Speicherorten.",
  },
  {
    title: "Ehrliche Einschätzung",
    text: "Nicht alles lohnt sich zu automatisieren. Das sagen wir Ihnen offen.",
  },
];

/* Branchenübergreifend: Branchen bewusst als ruhige Liste, darunter die Zusagen */
export default function Industries() {
  return (
    <section aria-labelledby="branchen-heading" className="bg-white">
      <div className={`${container} py-20 lg:py-28`}>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <h2 id="branchen-heading" className="text-[clamp(1.85rem,6vw,2.25rem)] leading-[1.1] sm:text-[2.5rem]">
              Für wen wir arbeiten
            </h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-muted">
              Unsere Lösungen setzen bei Abläufen an, nicht bei Branchen. Wo täglich Anfragen, Termine,
              Dokumente und Daten bearbeitet werden, lässt sich Handarbeit reduzieren.
            </p>
          </div>
          <ul className="grid content-start border-t border-ink/80 sm:grid-cols-2 sm:gap-x-10">
            {INDUSTRIES.map((name) => (
              <li key={name} className="border-b border-rule py-3 text-[16.5px] text-text">
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 lg:mt-24">
          <h2 className="text-[1.6rem] sm:text-[1.8rem]">Worauf Sie sich verlassen können</h2>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {PROMISES.map((p) => (
              <li key={p.title} className="border-t-2 border-signal-ink pt-5">
                <h3 className="text-[1.2rem]">{p.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
