import type { ReactNode } from "react";

/* Gemeinsame UI-Bausteine des hellen Designs – bewusst schlicht gehalten. */

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-ink-soft";

export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-white px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:border-ink/40";

export const btnTeal =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-teal px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors duration-200 hover:bg-[#3ee0e3]";

/* Kurzes Label über Überschriften – normale Schreibweise, kein Großbuchstaben-Stil */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`text-[15px] font-semibold ${onDark ? "text-teal" : "text-teal-dark"}`}>{children}</p>
  );
}

/* Schlichtes Icon ohne Kachel-Hintergrund */
export function IconTile({ children }: { children: ReactNode; size?: "md" | "lg" }) {
  return <span className="inline-flex flex-none text-teal-dark">{children}</span>;
}
