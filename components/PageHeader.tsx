import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow, container } from "./ui";

/* Einheitlicher Seitenkopf für alle Unterseiten – optional mit Bild rechts */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  crumbs?: Array<{ href?: string; label: string }>;
  image?: StaticImageData;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-soft">
      <div
        className={`${container} pb-14 pt-8 lg:pb-20 lg:pt-10 ${
          image ? "grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14" : ""
        }`}
      >
        <div>
          {crumbs && (
            <nav aria-label="Pfadnavigation" className="mb-9 text-sm text-muted lg:mb-12">
              <ol className="flex flex-wrap items-center gap-x-2">
                <li>
                  <Link href="/" className="inline-flex min-h-9 items-center hover:text-ink">
                    Startseite
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    {c.href ? (
                      <Link href={c.href} className="inline-flex min-h-9 items-center hover:text-ink">
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
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 max-w-4xl text-[2.1rem] font-extrabold leading-[1.1] tracking-[-0.028em] [word-spacing:0.05em] sm:text-[2.9rem] lg:text-[3.4rem]">
            {title}
          </h1>
          {intro && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-[1.2rem]">{intro}</p>}
          {children}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[var(--shadow-card-hover)]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
