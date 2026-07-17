/** Typografische QonteX-Wortmarke mit betontem Q und X. */
export default function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-semibold tracking-tight text-mist ${
        large ? "text-2xl" : "text-xl"
      }`}
    >
      <span className="text-cyan">Q</span>onte
      <span className="text-cyan">X</span>
    </span>
  );
}
