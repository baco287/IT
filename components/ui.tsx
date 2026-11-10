import type { ReactNode } from "react";

/* Gemeinsame UI-Bausteine des hellen Designs. */

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_6px_18px_rgba(8,23,43,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-ink-soft";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-ink/40";

export const btnTeal =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3.5 text-[15px] font-semibold text-ink shadow-[0_6px_20px_rgba(25,213,217,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105";

/* Kleines Abschnitts-Label mit Linie, wie in der Designvorlage */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 font-[family-name:var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.18em] ${
        onDark ? "text-white/80" : "text-ink/75"
      }`}
    >
      <span className="h-0.5 w-9 rounded-full bg-teal" aria-hidden />
      {children}
    </p>
  );
}

/* Einheitliche Icon-Kachel */
export function IconTile({ children, size = "md" }: { children: ReactNode; size?: "md" | "lg" }) {
  return (
    <span
      className={`grid flex-none place-items-center rounded-xl bg-teal-tint text-teal-dark ${
        size === "lg" ? "h-14 w-14" : "h-12 w-12"
      }`}
    >
      {children}
    </span>
  );
}
