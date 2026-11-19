import { NumberedColumns, SectionHead, container } from "./ui";

const STEPS = [
  {
    title: "Analysieren",
    text: "Wir verstehen Ihre Abläufe und identifizieren Optimierungspotenziale.",
  },
  {
    title: "Digitalisieren",
    text: "Wir schaffen die technischen Grundlagen und verbinden relevante Systeme.",
  },
  {
    title: "Automatisieren",
    text: "Wir automatisieren geeignete Aufgaben und testen die Prozesse.",
  },
  {
    title: "Optimieren & Skalieren",
    text: "Wir messen die Ergebnisse und verbessern die Abläufe kontinuierlich.",
  },
];

/* „So arbeiten wir" – vier Schritte von der Analyse bis zur laufenden Optimierung.
   rule: feine Linie darüber, wenn der Abschnitt auf einen weißen Abschnitt folgt. */
export default function Steps({
  note,
  rule = false,
  id = "so-funktionierts",
}: {
  note?: string;
  rule?: boolean;
  id?: string;
}) {
  return (
    <section id={id} className="bg-white">
      <div className={container}>
        <div className={`py-20 lg:py-28 ${rule ? "border-t border-ink/15" : ""}`}>
          <SectionHead title="In vier Schritten zu Abläufen, die für Sie arbeiten." text={note} />
          <div className="mt-12">
            <NumberedColumns items={STEPS} />
          </div>
        </div>
      </div>
    </section>
  );
}
