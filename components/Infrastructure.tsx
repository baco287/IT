import Image from "next/image";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { PlainSection, SectionHead } from "./ui";
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

/* Drei Bilder mit Bildunterschrift – ohne Kartenrahmen */
export default function Infrastructure() {
  return (
    <PlainSection id="loesungen">
      <SectionHead
        title="Technik, auf die Verlass ist."
        text="Von der einzelnen Komponente bis zum kompletten Serverraum: Wir wählen Ihre Systeme so aus, dass sie zuverlässig laufen und zu Ihrem Bedarf passen."
      />
      <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
        {ITEMS.map((it) => (
          <article key={it.title}>
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
            <h3 className="mt-5 text-[1.35rem] leading-snug">{it.title}</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">{it.text}</p>
          </article>
        ))}
      </div>
    </PlainSection>
  );
}
