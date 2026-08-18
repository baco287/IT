import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { MEDIA } from "@/lib/media";
import { WhatsAppVisual, PhoneVisual, EmailVisual } from "./KiVisuals";

const CARDS = [
  {
    media: MEDIA.ai.whatsapp,
    title: "WhatsApp-Assistent",
    text: "Beantwortet Kundenanfragen im Chat, vereinbart Termine und übergibt an dein Team, sobald es persönlich wird.",
    visual: <WhatsAppVisual />,
  },
  {
    media: MEDIA.ai.phone,
    title: "Telefon-Assistent",
    text: "Nimmt jeden Anruf an – auch nachts und am Wochenende. Notfälle werden sofort eskaliert, alles andere sauber notiert.",
    visual: <PhoneVisual />,
  },
  {
    media: MEDIA.ai.email,
    title: "E-Mail-Assistent",
    text: "Sortiert das Postfach, beantwortet Standardfragen automatisch und legt Entwürfe für alles Übrige bereit.",
    visual: <EmailVisual />,
  },
];

/* Helle Karten-Trio-Sektion im neon-Stil (Branching-Pendant): KI-Agenten. */
export default function KiTrio() {
  return (
    <section className="bg-[#edf4f3] px-6 pb-28 text-night">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-3xl text-[1.9rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.4rem]">
            KI-Agenten.{" "}
            <span className="text-[#5b6b74]">
              Kundenanfragen automatisch beantworten – rund um die Uhr, auf allen
              Kanälen.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title}>
              <article className="h-full overflow-hidden rounded-xl border border-night/10 bg-white">
                <div className="border-b border-night/8 bg-[#f7fafa]">
                  {/* Video ersetzt nur den Illustrationsbereich – erst wenn
                      die Dateien vorliegen und in lib/media.ts aktiviert sind */}
                  <SmartAmbientVideo asset={c.media} delayMs={i * 400}>
                    {c.visual}
                  </SmartAmbientVideo>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#3c4a53]">
                    {c.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <Link
            href="/leistungen/ki-agenten"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0d7c6e] hover:underline"
          >
            Mehr zu KI-Agenten
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
