import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";
import ReferenceMedia from "./ReferenceMedia";
import { MEDIA } from "@/lib/media";
import voltgasShot from "@/public/images/refs/volt-gas.jpg";
import zulassungShot from "@/public/images/refs/deutschezulassung.jpg";
import heizwechselShot from "@/public/images/refs/heizwechsel.jpg";
import hairvenlyShot from "@/public/images/refs/hairvenly.jpg";

const REFERENCES = [
  {
    media: MEDIA.references["volt-gas"],
    name: "Volt-Gas",
    domain: "volt-gas.de",
    url: "https://www.volt-gas.de/",
    tags: "Vergleichsportal · Lead-Funnel · CRM",
    text: "Strom- und Gas-Wechselservice mit Tarifrechner, mehrstufiger Lead-Strecke und angebundenem CRM für den persönlichen Kundenservice.",
    img: voltgasShot,
    alt: "Startseite von volt-gas.de mit Tarifrechner für Strom und Gas",
  },
  {
    media: MEDIA.references.deutschezulassung,
    name: "DeutscheZulassung",
    domain: "deutschezulassung.de",
    url: "https://deutschezulassung.de/",
    tags: "Serviceportal · Digitale Antragsstrecke",
    text: "Digitale Kfz-Zulassung für Privatkunden, Autohäuser und Gewerbe – vollständig online, mit klarer Antragsstrecke und transparenten Preisen.",
    img: zulassungShot,
    alt: "Startseite von deutschezulassung.de mit digitalem Zulassungsprozess in vier Schritten",
  },
  {
    media: MEDIA.references.heizwechsel,
    name: "Heizwechsel",
    domain: "heizwechsel.de",
    url: "https://heizwechsel.de/",
    tags: "Landingpage · Ersparnis-Rechner · Funnel",
    text: "Kostenloser Erst-Check für Wärmepumpe, Photovoltaik und Heizungstausch – mit Online-Check, Ersparnis-Rechner und Vermittlung geprüfter Fachpartner.",
    img: heizwechselShot,
    alt: "Startseite von heizwechsel.de mit Erst-Check für Heizungsmodernisierung",
  },
  {
    media: MEDIA.references.hairvenly,
    name: "Hairvenly",
    domain: "hairvenly.de",
    url: "https://hairvenly.de/",
    tags: "E-Commerce · Shop · Branding",
    text: "Online-Shop für salongetestete Echthaar-Extensions – Produktwelt, Markenauftritt und Verkauf an Endkundinnen und Salons.",
    img: hairvenlyShot,
    alt: "Startseite des Online-Shops hairvenly.de für Echthaar-Extensions",
  },
];

export default function References() {
  return (
    <section
      id="referenzen"
      className="relative overflow-hidden border-y border-white/5 bg-abyss px-6 py-28"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_10%,rgba(45,212,234,0.05),transparent_65%)]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHead
          label="Referenzen"
          title="Projekte, die live im Einsatz sind"
          text="Vier Plattformen aus vier Branchen – konzipiert, gebaut und betrieben von QonteX. Jede Seite ist echt und jetzt gerade online."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {REFERENCES.map((r, i) => (
            <Reveal key={r.domain} delay={(i % 2) * 0.08}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-cyan/35"
              >
                <div className="border-b border-white/5 bg-black/25">
                  <div className="flex items-center gap-1.5 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
                    <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
                    <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
                    <span className="ml-2 font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-fog">
                      {r.domain}
                    </span>
                  </div>
                  <div className="overflow-hidden">
                    {/* Hover-Video erst, wenn Dateien vorliegen und in
                        lib/media.ts aktiviert – bis dahin nur Screenshot */}
                    <ReferenceMedia asset={r.media}>
                      <Image
                        src={r.img}
                        alt={r.alt}
                        className="aspect-[3/2] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                        sizes="(max-width: 640px) 100vw, 50vw"
                        placeholder="blur"
                      />
                    </ReferenceMedia>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <p className="text-xs font-medium tracking-wide text-fog">{r.tags}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                    {r.name}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-fog">{r.text}</p>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan">
                    Live ansehen
                    <ArrowUpRight
                      size={15}
                      strokeWidth={2.5}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
