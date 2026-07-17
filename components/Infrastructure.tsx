import Image from "next/image";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import serverImg from "@/public/images/server.jpg";
import cpuImg from "@/public/images/cpu.jpg";
import ramImg from "@/public/images/ram.jpg";

const ROWS = [
  {
    img: serverImg,
    alt: "Gestapelte Server-Systeme mit leuchtenden Statusanzeigen und Netzwerkverbindungen",
    kicker: "Server & Infrastruktur",
    title: "Das stabile Fundament Ihres Unternehmens",
    text: "Leistungsfähige, stabile und skalierbare Systeme als zuverlässige Grundlage Ihres Unternehmens – geplant, aufgebaut und kontinuierlich betreut.",
  },
  {
    img: cpuImg,
    alt: "Hochleistungs-Prozessor auf gläsernem Sockel mit leuchtenden Schaltkreisen",
    kicker: "Prozessorleistung",
    title: "Hardware, die zu Ihren Anforderungen passt",
    text: "Optimal abgestimmte Hardware für anspruchsvolle Anwendungen, virtuelle Umgebungen und moderne Arbeitsprozesse.",
  },
  {
    img: ramImg,
    alt: "Arbeitsspeicher-Module mit transparenten Kühlkörpern auf gläsernen Stufen",
    kicker: "Arbeitsspeicher",
    title: "Leistung, die nicht nachlässt",
    text: "Schnelle und zuverlässige Systeme, die auch bei steigenden Anforderungen leistungsfähig bleiben.",
  },
];

export default function Infrastructure() {
  return (
    <section id="loesungen" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Infrastruktur"
          title="Technologie, auf die Verlass ist"
          text="Von der einzelnen Komponente bis zum kompletten Serverraum – wir dimensionieren Ihre Systeme sorgfältig statt überdimensioniert."
        />
        <div className="space-y-16">
          {ROWS.map((r, i) => (
            <div
              key={r.kicker}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div className="glass group relative overflow-hidden rounded-2xl">
                  <Image
                    src={r.img}
                    alt={r.alt}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-night/55 via-transparent to-transparent"
                    aria-hidden
                  />
                </div>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan">
                  {r.kicker}
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-white sm:text-3xl">
                  {r.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-fog">{r.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
