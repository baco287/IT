import Link from "next/link";
import { Check } from "lucide-react";
import { btnPrimaryLg, btnSecondaryLg } from "./ui";
import { CTA_LABEL } from "@/lib/company";

/* Sprechblasen des Beispielgesprächs. Für Screenreader steht davor, wer spricht. */
const guest = "ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-ink px-4 py-2.5 text-white";
const agent = "w-fit max-w-[85%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-ink";

/**
 * Seitenkopf der Startseite: links die Aussage, rechts auf Türkis ein Beispielgespräch.
 * Statt eines Schaubilds zeigt es, was ein KI-Agent konkret tut – eine Reservierung,
 * die nachts von allein zustande kommt. Der Betrieb ist erfunden (derselbe wie in /demo)
 * und als Beispiel gekennzeichnet.
 */
export default function Hero() {
  return (
    <section className="grid bg-white lg:grid-cols-2">
      {/* Linke Spalte schließt links bündig mit dem Seitenraster (max-w-7xl) ab */}
      <div className="px-5 pb-14 pt-12 sm:px-8 lg:py-24 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-14">
        <h1 className="text-[clamp(2.4rem,11.2vw,4.2rem)] font-bold leading-[0.98] tracking-[-0.012em] lg:text-[clamp(2.9rem,5vw,4.6rem)]">
          Weniger Aufwand.
          <br />
          Mehr Wachstum.
        </h1>
        <p className="mt-8 max-w-[34rem] text-[1.2rem] leading-relaxed text-muted">
          Wir digitalisieren Ihre Unternehmensprozesse, automatisieren Marketing und Vertrieb
          und schaffen effiziente Abläufe, mit denen Ihr Unternehmen nachhaltig wachsen kann.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/kontakt" className={btnPrimaryLg}>
            {CTA_LABEL}
          </Link>
          <Link href="/demo" className={btnSecondaryLg}>
            Demo selbst ausprobieren
          </Link>
        </div>
        <p className="mt-9 max-w-[34rem] border-l-2 border-teal-dark pl-4 text-[15px] leading-relaxed text-ink">
          Im Beispiel nimmt ein KI-Agent eine Reservierung an, während das Restaurant
          geschlossen ist. Ohne Anrufbeantworter, ohne Rückruf am nächsten Tag.
        </p>
      </div>

      <div className="flex items-center justify-center bg-teal px-5 py-12 sm:px-8 lg:py-16">
        <figure className="w-full max-w-[27rem]">
          <div className="overflow-hidden rounded-2xl bg-white">
            <div className="flex items-center gap-3 bg-ink px-5 py-4">
              <span
                aria-hidden
                className="grid h-10 w-10 flex-none place-items-center rounded-full bg-white/10 text-sm font-bold text-white"
              >
                BV
              </span>
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-white">Trattoria Bella Vista</p>
                <p className="truncate text-[13px] text-white/65">KI-Assistent · antwortet sofort</p>
              </div>
            </div>

            <div className="space-y-3 bg-soft px-4 py-5 text-[15px] leading-snug">
              <p className="mx-auto w-fit rounded-md bg-white px-3 py-1 text-center text-xs font-medium text-muted">
                Freitag, 22:47 Uhr · Restaurant geschlossen
              </p>
              <p className={guest}>
                <span className="sr-only">Gast: </span>
                Hallo, haben Sie morgen Abend noch einen Tisch für 4?
              </p>
              <p className={agent}>
                <span className="sr-only">KI-Assistent: </span>
                Guten Abend! Morgen, Samstag, ist um 18:30 Uhr und um 20:15 Uhr noch ein Tisch
                für 4 frei. Welche Uhrzeit passt Ihnen?
              </p>
              <p className={guest}>
                <span className="sr-only">Gast: </span>
                20:15 Uhr, auf den Namen Schneider.
              </p>
              <div className={`${agent} py-3`}>
                <p>
                  <span className="sr-only">KI-Assistent: </span>
                  Ist reserviert. Wir freuen uns auf Sie!
                </p>
                <p className="mt-2.5 flex items-start gap-2 border-t border-line pt-2.5 font-semibold">
                  <Check size={17} strokeWidth={2.6} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
                  Sa., 20:15 Uhr · 4 Personen · Schneider
                </p>
              </div>
            </div>
          </div>
          <figcaption className="mt-4 text-[14px] leading-relaxed text-ink">
            Beispielgespräch mit einem erfundenen Betrieb. Die Reservierung steht danach
            automatisch im Terminbuch.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
