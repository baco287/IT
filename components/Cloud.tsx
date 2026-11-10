import Image from "next/image";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { Eyebrow, container } from "./ui";
import { MEDIA } from "@/lib/media";
import cloudImg from "@/public/images/cloud.jpg";

const POINTS = [
  "Umzug in die Cloud",
  "Microsoft 365 einrichten und verwalten",
  "Sichere Arbeitsplätze im Homeoffice",
  "Vernetzung mehrerer Standorte",
  "Kombination aus Cloud und eigenen Servern",
  "Zentrale Verwaltung aller Zugänge",
];

export default function Cloud() {
  return (
    <section id="cloud" className="bg-white py-16 lg:py-20">
      <div className={`${container} grid items-center gap-12 lg:grid-cols-2`}>
        <Reveal className="order-2 lg:order-1">
          <div className="overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]">
            {/* Cinemagraph-Platz: aktiviert sich nur über lib/media.ts */}
            <SmartAmbientVideo asset={MEDIA.solutions.cloud}>
              <Image
                src={cloudImg}
                alt="Netzwerktechnik in einem Rechenzentrum"
                className="aspect-[4/3] w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                placeholder="blur"
              />
            </SmartAmbientVideo>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Eyebrow>Cloud & Vernetzung</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
            Flexibel arbeiten. Sicher verbunden.
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Wir richten Cloud- und Netzwerklösungen ein, mit denen Ihre Mitarbeiter
            sicher auf ihre Daten zugreifen – im Büro, im Homeoffice und unterwegs.
          </p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {POINTS.map((p) => (
              <li key={p} className="flex items-start gap-3 text-[15px] font-medium text-ink">
                <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-tint text-teal-dark">
                  <Check size={14} strokeWidth={3} aria-hidden />
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
