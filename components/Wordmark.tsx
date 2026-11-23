/** QonteX-Wortmarke in breiter Archivo, „X" im Akzent – angelehnt an das breite QX-Logo. */
export default function Wordmark({ onDark = true, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <span
      translate="no"
      className={`wide text-[1.45rem] font-bold leading-none tracking-[-0.03em] ${
        onDark ? "text-white" : "text-ink"
      } ${className}`}
    >
      Qonte<span className={onDark ? "text-signal" : "text-signal-ink"}>X</span>
    </span>
  );
}
