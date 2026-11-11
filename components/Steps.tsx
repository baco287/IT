import { SectionHead, container } from "./ui";

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

/* „So arbeiten wir" – vier Schritte von der Analyse bis zur laufenden Optimierung */
export default function Steps({
  note,
  tone = "white",
  id = "so-funktionierts",
}: {
  note?: string;
  tone?: "soft" | "white";
  id?: string;
}) {
  return (
    <section id={id} className={`${tone === "soft" ? "bg-soft" : "bg-white"} py-20 lg:py-28`}>
      <div className={container}>
        <SectionHead
          eyebrow="So arbeiten wir"
          title="In vier Schritten zu Abläufen, die für Sie arbeiten."
          text={note}
        />
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative border-t-2 border-ink pt-6">
              {/* türkiser Abschnitt der Linie als ruhiger Akzent */}
              <span className="absolute -top-0.5 left-0 h-0.5 w-12 bg-teal" aria-hidden />
              <span className="font-[family-name:var(--font-display)] text-[2.6rem] font-bold leading-none tracking-[-0.04em] text-ink tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-[1.3rem] font-bold">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
