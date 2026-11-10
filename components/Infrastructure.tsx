import Image from "next/image";
import Reveal from "./Reveal";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { Eyebrow, container } from "./ui";
import { MEDIA } from "@/lib/media";
import serverImg from "@/public/images/server.jpg";
import cpuImg from "@/public/images/cpu.jpg";
import ramImg from "@/public/images/ram.jpg";

const ITEMS = [
  {
    media: MEDIA.solutions.server,
    img: serverImg,
    alt: "Server-Racks in einem Rechenzentrum",
    title: "Server & Infrastruktur",
    text: "Stabile, gut dokumentierte Systeme als Grundlage Ihres Unternehmens – geplant, eingerichtet und laufend betreut.",
  },
  {
    media: MEDIA.solutions.processor,
    img: cpuImg,
    alt: "Prozessor auf einem Server-Mainboard",
    title: "Passende Hardware",
    text: "Rechenleistung, die zu Ihren Anwendungen passt – sorgfältig dimensioniert statt überdimensioniert.",
  },
  {
    media: MEDIA.solutions.memory,
    img: ramImg,
    alt: "Arbeitsspeicher-Module",
    title: "Leistung, die mitwächst",
    text: "Systeme, die auch bei mehr Mitarbeitern und Daten zuverlässig schnell bleiben.",
  },
];

export default function Infrastructure() {
  return (
    <section id="loesungen" className="bg-white py-16 lg:py-20">
      <div className={container}>
        <div className="max-w-3xl">
          <Eyebrow>Infrastruktur</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
            Technik, auf die Verlass ist.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Von der einzelnen Komponente bis zum kompletten Serverraum: Wir wählen Ihre
            Systeme so aus, dass sie zuverlässig laufen und zu Ihrem Bedarf passen.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
                {/* Cinemagraph ersetzt das Bild erst, wenn in lib/media.ts aktiviert */}
                <SmartAmbientVideo asset={it.media}>
                  <Image
                    src={it.img}
                    alt={it.alt}
                    className="aspect-[16/10] w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    placeholder="blur"
                  />
                </SmartAmbientVideo>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{it.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{it.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
