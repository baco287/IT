import Link from "next/link";
import type { ReactNode } from "react";
import { bleedLeft, bleedRight, container, keepDash } from "./ui";

type Crumb = { href?: string; label: string };

function Crumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Pfadnavigation" className="mb-8 text-sm text-muted lg:mb-12">
      <ol className="flex flex-wrap items-center gap-x-2">
        <li>
          <Link href="/" className="inline-flex min-h-11 items-center hover:text-ink">
            Startseite
          </Link>
        </li>
        {crumbs.map((c) => (
          <li key={c.label} className="flex items-center gap-2">
            <span aria-hidden>/</span>
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-ink">
                {c.label}
              </Link>
            ) : (
              <span className="font-medium text-ink" aria-current="page">
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
 * Einheitlicher Seitenkopf für alle Unterseiten.
 * Mit `aside` ist er zweigeteilt wie der Seitenkopf der Startseite: links Titel und
 * Einleitung, rechts auf Türkis das Konkrete zur Seite (z. B. Kontaktdaten).
 * Ohne `aside` steht der Titel über die ganze Breite, darunter eine feine Linie.
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
  if (aside) {
    return (
      <section className="grid bg-white lg:grid-cols-2">
        <div className={`px-5 pb-12 pt-6 sm:px-8 lg:pb-20 lg:pr-14 lg:pt-8 ${bleedLeft}`}>
          {crumbs && <Crumbs crumbs={crumbs} />}
          <h1 className="text-[clamp(2.1rem,8.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.01em] lg:text-[clamp(2.3rem,3.5vw,3.3rem)]">
            {keepDash(title)}
          </h1>
          {intro && <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-muted">{intro}</p>}
          {children}
        </div>
        <div className={`flex items-center bg-teal px-5 py-12 text-ink sm:px-8 lg:py-16 lg:pl-14 ${bleedRight}`}>
          <div className="w-full max-w-[34rem]">{aside}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-ink/15 bg-white">
      <div className={`${container} pb-14 pt-6 lg:pb-20 lg:pt-8`}>
        {crumbs && <Crumbs crumbs={crumbs} />}
        <h1 className="max-w-4xl text-[2.3rem] font-bold leading-[1.06] tracking-[-0.01em] sm:text-[3.1rem] lg:text-[3.7rem]">
          {keepDash(title)}
        </h1>
        {intro && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-[1.2rem]">{intro}</p>}
        {children}
      </div>
    </section>
  );
}
