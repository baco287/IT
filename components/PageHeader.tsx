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
    <section className="border-b border-line bg-soft">
      <div
        className={`${container} py-12 lg:py-16 ${
          image ? "grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14" : ""
        }`}
      >
        <div>
          {crumbs && (
            <nav aria-label="Pfadnavigation" className="mb-6 text-sm text-muted">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Startseite
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span aria-hidden>/</span>
                    {c.href ? (
                      <Link href={c.href} className="hover:text-ink">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-ink" aria-current="page">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 max-w-3xl text-[2.1rem] font-extrabold leading-[1.12] tracking-[-0.03em] sm:text-[2.8rem]">
            {title}
          </h1>
          {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
          {children}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-[var(--shadow-card-hover)]">
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
