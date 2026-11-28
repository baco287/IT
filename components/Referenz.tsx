import Image from "next/image";
import bild from "@/public/images/referenz-reifencenter.webp";
import { btnSolid, container, h2Class, leadClass } from "./ui";

/* Echte Referenz: Website für die Reifencenter Bremen GmbH, seit 27.11.2026 online.
   Dort steht im Footer umgekehrt „Website von QonteX“. Nur Tatsachen nennen, die auf
   der Live-Seite zu sehen sind (Online-Terminbuchung ist dort noch abgeschaltet). */

const URL = "https://www.reifencenterbremen.de/";

const PUNKTE = [
  {
    title: "Im Stil der Marke",
    text: "Rot, Schwarz und Silber, breite kursive Schrift und schräge Flächen.",
  },
  {
    title: "Preise mit Preisrechner",
    text: "Die ganze Preisliste online, dazu ein Rechner für die Reifenmontage inklusive Wuchten.",
  },
  {
    title: "Zwei Standorte, ein Weg zum Termin",
    text: "Überseestadt und Gröpelingen mit Zeiten und Kontakt. Terminanfragen gehen per WhatsApp direkt an den passenden Standort.",
  },
  {
    title: "Fürs Handy gebaut",
    text: "„Anrufen“ und „Termin“ bleiben auf dem Smartphone immer unten im Daumenbereich.",
  },
];

export default function Referenz({ tone = "white" }: { tone?: "white" | "fog" }) {
  return (
    <section
      id="referenz"
      aria-labelledby="referenz-heading"
      className={tone === "fog" ? "bg-fog" : "bg-white"}
    >
      <div className={`${container} py-20 lg:py-28`}>
        <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <h2 id="referenz-heading" className={h2Class}>
              Gebaut von QonteX: die Website des Reifencenters Bremen
            </h2>
            <p className={`mt-5 ${leadClass} text-muted`}>
              Für die Reifencenter Bremen GmbH haben wir die neue Website entworfen und programmiert.
              Seit November 2026 ist sie online.
            </p>

            <ul className="mt-10 border-t border-ink/80">
              {PUNKTE.map((p) => (
                <li key={p.title} className="border-b border-rule py-4">
                  <h3 className="text-[1.1rem] leading-snug">{p.title}</h3>
                  <p className="mt-1 text-[16px] leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>

            <a href={URL} target="_blank" rel="noopener" className={`${btnSolid} mt-8`}>
              reifencenterbremen.de ansehen
              <span className="sr-only"> (öffnet in neuem Tab)</span>
            </a>
          </div>

          {/* Bildschirmfoto der Live-Seite im schlichten Browserrahmen. Das Bild ist ein
              zusätzlicher Klickbereich; für Tastatur und Screenreader zählt der Button. */}
          <a
            href={URL}
            target="_blank"
            rel="noopener"
            tabIndex={-1}
            aria-hidden
            className="group block overflow-hidden rounded-[14px] border border-rule bg-white shadow-[0_30px_60px_-32px_rgba(10,18,32,0.45)] lg:sticky lg:top-28 lg:mt-2"
          >
            <div className="flex items-center gap-3 border-b border-rule bg-fog px-4 py-2.5">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
              </span>
              <span className="truncate rounded-md bg-white px-3 py-1 text-[13px] text-muted">
                reifencenterbremen.de
              </span>
            </div>
            <Image
              src={bild}
              alt=""
              sizes="(min-width: 1024px) 720px, 100vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.015] motion-reduce:transition-none"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
