import { Eyebrow, container } from "./ui";

const STEPS = [
  {
    title: "Kostenloses Erstgespräch",
    text: "Sie schildern uns Ihre Situation – telefonisch oder per Video, unverbindlich.",
  },
  {
    title: "Analyse & Angebot",
    text: "Wir prüfen Ihre Anforderungen und machen Ihnen ein klares, verständliches Angebot.",
  },
  {
    title: "Umsetzung & Betreuung",
    text: "Wir setzen um und bleiben danach Ihr fester Ansprechpartner.",
  },
];

/* „So starten Sie" – drei Schritte bis zur Lösung */
export default function Steps({ note, tone = "soft" }: { note?: string; tone?: "soft" | "white" }) {
  return (
    <section className={`${tone === "soft" ? "bg-soft" : "bg-white"} py-16 lg:py-20`}>
      <div className={container}>
        <Eyebrow>So starten Sie</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-3xl font-bold leading-tight sm:text-[2.4rem]">
          In drei Schritten zu einer IT, die einfach funktioniert.
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t-2 border-ink pt-5">
              <span className="text-[15px] font-bold text-teal-dark">Schritt {i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        {note && <p className="mt-10 max-w-2xl text-lg leading-relaxed text-text">{note}</p>}
      </div>
    </section>
  );
}
