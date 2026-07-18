import Image from "next/image";
import logoMark from "@/public/images/logo-mark.png";

/** QonteX-Logo: QX-Bildmarke plus typografische Wortmarke. */
export default function Wordmark({ large = false }: { large?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image
        src={logoMark}
        alt=""
        aria-hidden
        className={`w-auto ${large ? "h-11" : "h-9"}`}
      />
      <span
        className={`font-[family-name:var(--font-display)] font-semibold tracking-tight text-mist ${
          large ? "text-2xl" : "text-xl"
        }`}
      >
        <span className="text-cyan">Q</span>onte
        <span className="text-cyan">X</span>
      </span>
    </span>
  );
}
