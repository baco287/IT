import Link from "next/link";
import type { ReactNode } from "react";
import { container, keepDash } from "./ui";

export type Crumb = { href?: string; label: string };

function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Pfadnavigation" className="mb-8 text-[14px] text-haze lg:mb-10">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li>
          <Link href="/" className="inline-flex min-h-11 items-center hover:text-white">
            Startseite
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden className="text-edge">
              /
            </span>
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-white">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-white" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Seitenkopf aller Unterseiten: dunkel wie der Kopf der Startseite.
 * Mit `aside` zweigeteilt (rechts z. B. ein Anwendungsbeispiel oder Kontaktdaten).
 */
export default function PageHeader({
  title,
  intro,
  crumbs,
  aside,
  children,
}: {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-night">
      <div className="grid-field pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden />
      <div className={`${container} pb-16 pt-6 lg:pb-24 lg:pt-8`}>
        {crumbs && <Crumbs crumbs={crumbs} />}
        <div className={aside ? "grid items-start gap-x-14 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" : ""}>
          <div className={aside ? "" : "max-w-[50rem]"}>
            <h1 className="text-[clamp(1.95rem,7.6vw,2.4rem)] leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.9rem] lg:text-[3.1rem]">
              {keepDash(title)}
            </h1>
            {intro && <p className="mt-6 max-w-[38rem] text-[1.125rem] leading-[1.65] text-haze sm:text-[1.2rem]">{intro}</p>}
            {children}
          </div>
          {aside && <div className="min-w-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
