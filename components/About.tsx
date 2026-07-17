import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="ueber" className="relative overflow-hidden px-6 py-28">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(167,139,250,0.06),transparent_65%)]"
        aria-hidden
      />
      <Reveal className="relative mx-auto max-w-3xl text-center">
        <p className="glass mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
          Über QonteX
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Technologie mit Verantwortung
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-fog">
          QonteX steht für moderne IT-Lösungen, persönliche Betreuung und
          nachhaltige technische Entscheidungen. Wir verbinden fundiertes
          Fachwissen mit einem klaren Verständnis für die betrieblichen
          Anforderungen unserer Kunden.
        </p>
        <p className="mt-4 leading-relaxed text-fog">
          Jede Empfehlung, die wir aussprechen, muss zwei Fragen bestehen: Macht
          sie Ihr Unternehmen sicherer oder leistungsfähiger – und würden wir sie
          auch für unsere eigene IT treffen?
        </p>
      </Reveal>
    </section>
  );
}
