const NAMES = [
  "Volt-Gas",
  "DeutscheZulassung",
  "Heizwechsel",
  "Hairvenly",
  "Reifencenter",
];

export default function TrustBar() {
  const row = [...NAMES, ...NAMES];
  return (
    <section aria-label="Referenzen" className="border-y border-white/6 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-fog/70">
          Im Einsatz bei Unternehmen aus unterschiedlichen Branchen
        </p>
        <div className="marquee mt-6 overflow-hidden">
          <div className="marquee-track items-center gap-14">
            {row.map((n, i) => (
              <span
                key={i}
                className="font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight text-fog/55"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
