import Counter from "./Counter";
import Reveal from "./Reveal";

const STATS = [
  { value: <Counter to={24} suffix="/7" />, label: "Systemüberwachung" },
  { value: <Counter to={360} suffix="°" />, label: "IT-Betreuung" },
  { value: <Counter to={100} suffix=" %" />, label: "Individuelle Lösungen" },
  { value: <Counter to={1} />, label: "Persönlicher Ansprechpartner" },
];

export default function Stats() {
  return (
    <section aria-label="Leistungsversprechen" className="px-6 py-16">
      <Reveal className="mx-auto max-w-6xl">
        <div className="glass grid grid-cols-2 gap-y-10 rounded-2xl px-6 py-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="border-l border-white/8 pl-6 first:border-l-0 lg:[&:nth-child(3)]:border-l max-lg:[&:nth-child(3)]:border-l-0"
            >
              <p className="font-[family-name:var(--font-display)] text-3xl font-semibold text-white sm:text-4xl">
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
