import Image from "next/image";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { CheckRows, PlainSection, h2Split } from "./ui";
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
    <PlainSection id="cloud">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
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
        <div className="order-1 lg:order-2">
          <h2 className={h2Split}>Flexibel arbeiten. Sicher verbunden.</h2>
          <p className="mt-4 max-w-lg text-[17px] leading-relaxed text-muted">
            Wir richten Cloud- und Netzwerklösungen ein, mit denen Ihre Mitarbeiter sicher auf
            ihre Daten zugreifen – im Büro, im Homeoffice und unterwegs.
          </p>
          <div className="mt-8">
            <CheckRows items={POINTS} columns={2} />
          </div>
        </div>
      </div>
    </PlainSection>
  );
}
