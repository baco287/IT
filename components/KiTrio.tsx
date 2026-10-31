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

/* Karten-Trio der drei KI-Assistenten (WhatsApp, Telefon, E-Mail). */
export default function KiTrio() {
  return (
    <section className="relative px-6 py-24 text-mist">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="max-w-3xl text-[1.9rem] font-bold leading-[1.15] tracking-tight text-white sm:text-[2.4rem]">
            KI-Agenten.{" "}
            <span className="text-fog">
              Kundenanfragen automatisch beantworten – rund um die Uhr, auf allen
              Kanälen.
            </span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.title}>
              <article className="h-full overflow-hidden rounded-xl border border-white/10 bg-slate-glass/80 transition-colors duration-300 hover:border-cyan/40">
                <div className="border-b border-white/8 bg-night/50">
                  {/* Video ersetzt nur den Illustrationsbereich – erst wenn
                      die Dateien vorliegen und in lib/media.ts aktiviert sind */}
                  <SmartAmbientVideo asset={c.media} delayMs={i * 400}>
                    {c.visual}
                  </SmartAmbientVideo>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-white">{c.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-fog">
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
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan hover:underline"
          >
            Mehr zu KI-Agenten
            <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
