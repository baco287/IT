import Image from "next/image";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { MEDIA } from "@/lib/media";
import { Check } from "lucide-react";
import Reveal from "./Reveal";
import cloudImg from "@/public/images/cloud.jpg";
import globeImg from "@/public/images/globe.jpg";

const POINTS = [
  "Cloud-Migration",
  "Microsoft 365",
  "Sichere Remote-Arbeitsplätze",
  "Standortvernetzung",
  "Hybride Infrastrukturen",
  "Zentrale Verwaltung",
];

export default function Cloud() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass col-span-2 overflow-hidden rounded-2xl">
              {/* Cinemagraph-Platz: aktiviert sich nur über lib/media.ts */}
              <SmartAmbientVideo asset={MEDIA.solutions.cloud}>
                <Image
                  src={cloudImg}
                  alt="Blau beleuchtete Netzwerktechnik in einem Rechenzentrum"
                  className="aspect-[16/8] w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                />
              </SmartAmbientVideo>
            </div>
            <div className="glass overflow-hidden rounded-2xl">
              <Image
                src={globeImg}
                alt="Globales Netzwerk mit leuchtenden Verbindungslinien"
                className="aspect-square w-full object-cover"
                sizes="(max-width: 1024px) 50vw, 22vw"
                placeholder="blur"
              />
            </div>
            <div className="glass flex flex-col justify-center gap-3 rounded-2xl p-5">
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Microsoft 365
                </p>
                <p className="text-xs text-fog">zentral eingerichtet und verwaltet</p>
              </div>
              <div className="border-t border-white/8 pt-3">
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                  Standorte & Homeoffice
                </p>
                <p className="text-xs text-fog">sicher verbunden statt improvisiert</p>
              </div>
            </div>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="glass mb-5 inline-flex rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-cyan">
              Cloud & Vernetzung
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Flexibel arbeiten. Sicher verbunden.
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-fog">
              Wir entwickeln Cloud- und Netzwerklösungen, die Ihren Mitarbeitern
              sicheren Zugriff ermöglichen und mit Ihrem Unternehmen wachsen.
            </p>
          </Reveal>
          <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {POINTS.map((p, i) => (
              <Reveal key={p} delay={0.05 * i}>
                <li className="flex items-center gap-2.5 text-sm font-medium text-mist">
                  <span className="grid h-6 w-6 flex-none place-items-center rounded-md bg-cyan/10 text-cyan">
                    <Check size={13} strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
