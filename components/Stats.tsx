import Reveal from "./Reveal";

const STATS = [
  { value: "24/7", label: "Systemüberwachung" },
  { value: "360°", label: "IT-Betreuung" },
  { value: "100 %", label: "Individuelle Lösungen" },
  { value: "1", label: "Persönlicher Ansprechpartner" },
];

export default function Stats() {
  return (
    <section aria-label="Leistungsversprechen" className="px-6 py-16">
      <Reveal className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-2 gap-y-10 rounded-2xl px-6 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6">
              <p className="text-3xl font-semibold text-white sm:text-4xl">
                {s.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-fog">{s.label}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
