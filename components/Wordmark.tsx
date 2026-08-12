/** QonteX-Wortmarke im Logo-Stil: Q und X im Cyan-Teal-Verlauf, „onte" weiß. */
export default function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-extrabold tracking-tight text-white ${
        large ? "text-4xl" : "text-[1.7rem]"
      }`}
    >
      <span className="grad drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">Q</span>
      onte
      <span className="grad drop-shadow-[0_0_12px_rgba(34,211,238,0.45)]">X</span>
    </span>
  );
}
