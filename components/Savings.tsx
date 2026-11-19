import SavingsCalculator from "./SavingsCalculator";
import { DefRows, SectionHead, container } from "./ui";

const BENEFITS = [
  {
    title: "Zeit sparen",
    text: "Wiederkehrende Tätigkeiten und Routineanfragen automatisieren.",
  },
  {
    title: "Kosten reduzieren",
    text: "Manuelle Bearbeitungszeiten und unnötige Prozessschritte verringern.",
  },
  {
    title: "Wachstum ermöglichen",
    text: "Mehr Anfragen bearbeiten, ohne jeden zusätzlichen Vorgang manuell abwickeln zu müssen.",
  },
];

/* Einsparpotenzial: oben Aussage und drei Vorteile als Liste, darunter über die volle
   Breite der Rechner – links die eigenen Annahmen, rechts auf Türkis das Ergebnis.
   rule: feine Linie darüber, wenn der Abschnitt auf einen weißen Abschnitt folgt. */
export default function Savings({ rule = false }: { rule?: boolean }) {
  return (
    <section aria-labelledby="savings-heading" className="bg-white">
      <div className={container}>
        <div
          className={`grid gap-x-14 gap-y-10 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-28 ${
            rule ? "border-t border-ink/15" : ""
          }`}
        >
          <SectionHead
            title={
              <span id="savings-heading">
                Weniger manuelle Arbeit. <br className="hidden sm:block" />
                Mehr Zeit für Ihr Geschäft.
              </span>
            }
            text="Automatisierung lohnt sich dort, wo dieselben Handgriffe jeden Tag wiederkehren. Rechnen Sie mit Ihren eigenen Zahlen nach, was das für Ihr Unternehmen bedeuten könnte."
          />
          <div className="lg:self-start">
            <DefRows items={BENEFITS} />
          </div>
        </div>
      </div>

      <SavingsCalculator />
    </section>
  );
}
