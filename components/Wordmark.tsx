/** QonteX-Wortmarke im Logo-Stil: Q und X im Cyan-Teal-Verlauf, „onte" weiß. */
export default function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-bold tracking-tight text-white ${
        large ? "text-2xl" : "text-xl"
      }`}
    >
      <span className="grad">Q</span>onte<span className="grad">X</span>
    </span>
  );
}
