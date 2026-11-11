import type { ReactNode } from "react";

/* Gemeinsame UI-Bausteine – ein Design-System für alle Seiten. */

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-center text-[15px] font-semibold leading-snug transition-colors duration-200";

/* Hauptaktion: Electric Teal mit dunkelblauer Schrift (Kontrast ≈ 9,6 : 1) */
export const btnPrimary = `${btnBase} bg-teal text-ink hover:bg-[#5ce3df]`;

/* Zweitaktion auf hellem Grund */
export const btnSecondary = `${btnBase} border border-ink/20 bg-white text-ink hover:border-ink`;

/* Kurzes Label über Überschriften – normale Schreibweise, kein Großbuchstaben-Stil */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`text-[15px] font-semibold ${onDark ? "text-teal" : "text-teal-text"}`}>{children}</p>
  );
}

/* Einheitliche Größen für Abschnittsüberschriften */
export const h2Class =
  "text-[1.85rem] font-bold leading-[1.14] tracking-[-0.022em] [word-spacing:0.04em] sm:text-[2.4rem] lg:text-[2.8rem]";

/* Abschnittskopf: Label, große Überschrift, optionaler Einleitungstext */
export function SectionHead({
  eyebrow,
  title,
  text,
  onDark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>}
      <h2 className={`${eyebrow ? "mt-4" : ""} ${h2Class} ${onDark ? "text-white" : ""}`}>{title}</h2>
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${onDark ? "text-white/70" : "text-muted"}`}>{text}</p>
      )}
    </div>
  );
}

/* Icon in einer ruhigen, hell getönten Kachel */
export function IconTile({
  children,
  onDark = false,
}: {
  children: ReactNode;
  onDark?: boolean;
  size?: "md" | "lg";
}) {
  return (
    <span
      className={`inline-grid h-12 w-12 flex-none place-items-center rounded-xl ${
        onDark ? "bg-white/8 text-teal" : "bg-teal-tint text-teal-text"
      }`}
    >
      {children}
    </span>
  );
}
