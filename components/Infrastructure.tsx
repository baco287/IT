import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import serverImg from "@/public/images/server.jpg";
import networkImg from "@/public/images/network.jpg";
import fiberImg from "@/public/images/fiber.jpg";

type Card = {
  img: StaticImageData;
  alt: string;
  kicker: string;
  title: string;
  text: string;
};

const CARDS: Card[] = [
  {
    img: serverImg,
    alt: "Server-Racks in einem Rechenzentrum",
    kicker: "Server & Rechenzentrum",
    title: "Leistung, die stabil bleibt",
    text: "Sorgfältig dimensionierte Server in deutschen Rechenzentren – überwacht, gesichert und skalierbar.",
  },
  {
    img: networkImg,
    alt: "Netzwerk-Switch mit angeschlossenem blauem Netzwerkkabel",
    kicker: "Netzwerke",
    title: "Verbindungen, die halten",
    text: "Strukturierte Netzwerke und WLAN, sauber dokumentiert und segmentiert – im Büro wie zwischen Standorten.",
  },
  {
    img: fiberImg,
    alt: "Leuchtende blaue Glasfaser-Verbindungen",
    kicker: "Konnektivität",
    title: "Standorte sicher verbunden",
    text: "Schnelle, verschlüsselte Anbindung von Homeoffice, Filialen und Cloud – zentral verwaltet.",
  },
];

export default function Infrastructure() {
  return (
    <section
      id="loesungen"
      className="relative overflow-hidden px-6 py-24"
      style={{
        background:
          "radial-gradient(ellipse 90% 70% at 80% 0%, #1a4a8f 0%, transparent 55%), linear-gradient(180deg, #123a72 0%, #0e2c58 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#bcd6f5]">
            Infrastruktur
          </p>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Das Fundament Ihrer IT – von uns aufgebaut und betreut.
          </h2>
          <p className="mt-4 leading-relaxed text-[#c3d6f0]">
            Server, Netzwerke und Anbindungen greifen ineinander. Wir planen sie
            als Gesamtsystem, betreiben sie zuverlässig und lassen sie mit Ihrem
            Unternehmen wachsen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.kicker} delay={0.08 * i}>
              <div className="group h-full overflow-hidden rounded-2xl border border-white/12 bg-white/[0.06] shadow-[0_20px_50px_rgba(6,20,44,0.35)] transition-transform duration-300 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <Image
                    src={c.img}
                    alt={c.alt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#8fbaf0]">
                    {c.kicker}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#c3d6f0]">{c.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <Link
            href="/leistungen/server-netzwerke"
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-[#123a72] transition-transform hover:-translate-y-0.5"
          >
            Mehr zu Server &amp; Netzwerken
            <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
