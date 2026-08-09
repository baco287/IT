import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import heroImg from "@/public/images/server.jpg";

const TRUST = [
  "Persönlicher Ansprechpartner",
  "Schnelle Reaktionszeiten",
  "Individuelle Lösungen",
];

export default function Hero() {
  return (
    <section id="start" className="px-6 pb-20 pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="glass inline-flex rounded-full px-4 py-1.5 text-sm font-medium text-fog">
            IT-Dienstleistungen für Unternehmen
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.12] tracking-tight text-white sm:text-5xl">
            IT, die Ihr Unternehmen{" "}
            <span className="text-cyan">voranbringt.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-fog">
            QonteX entwickelt sichere, leistungsfähige und zuverlässige
            IT-Lösungen für Unternehmen – persönlich betreut und optimal auf
            Ihre Anforderungen abgestimmt.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-lg bg-cyan px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#174F92]"
            >
              Kostenlose Erstberatung
              <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link
              href="/leistungen"
              className="glass inline-flex items-center gap-2 rounded-lg px-7 py-3.5 font-semibold text-mist transition-colors hover:border-cyan/50"
            >
              Leistungen entdecken
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-2">
            {TRUST.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 text-sm font-medium text-fog"
              >
                <Check size={15} strokeWidth={3} className="text-cyan" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass overflow-hidden rounded-2xl">
          <Image
            src={heroImg}
            alt="Server-Racks in einem modernen Rechenzentrum"
            className="aspect-[4/3] w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            placeholder="blur"
          />
        </div>
      </div>
    </section>
  );
}
