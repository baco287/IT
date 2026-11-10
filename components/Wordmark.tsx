/** QonteX-Wortmarke: „Qonte" in Dunkelblau (bzw. Weiß auf dunklem Grund), „X" in Türkis. */
export default function Wordmark({ onDark = false, large = false }: { onDark?: boolean; large?: boolean }) {
  return (
    <span
      className={`font-[family-name:var(--font-display)] font-extrabold tracking-tight ${
        large ? "text-3xl" : "text-[1.55rem]"
      } ${onDark ? "text-white" : "text-ink"}`}
    >
      Qonte<span className={onDark ? "text-teal" : "text-teal-dark"}>X</span>
    </span>
  );
}
