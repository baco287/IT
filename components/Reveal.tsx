import type { ReactNode } from "react";

/** Layout-Wrapper für Inhaltsblöcke. Bewusst ohne Scroll-Animation:
    Inhalte sind sofort sichtbar – auch ohne JavaScript. */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
