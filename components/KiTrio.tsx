import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { MEDIA } from "@/lib/media";

const CARDS = [
  {
    media: MEDIA.ai.whatsapp,
    title: "WhatsApp-Assistent",
    text: "Beantwortet Kundenanfragen im Chat, vereinbart Termine und übergibt an dein Team, sobald es persönlich wird.",
    visual: (
      <div className="flex h-32 flex-col justify-center gap-2 px-5">
        <span className="w-fit max-w-[85%] rounded-lg bg-night/6 px-3 py-1.5 text-xs text-night">
          Habt ihr morgen noch einen Termin frei?
        </span>
        <span className="ml-auto w-fit max-w-[85%] rounded-lg bg-[#0d9b8a] px-3 py-1.5 text-xs text-white">
          Ja – 10:30 oder 14:00 Uhr. Was passt besser?
        </span>
        <span className="w-fit max-w-[85%] rounded-lg bg-night/6 px-3 py-1.5 text-xs text-night">
          14 Uhr bitte!
        </span>
      </div>
    ),
  },
  {
    media: MEDIA.ai.phone,
    title: "Telefon-Assistent",
    text: "Nimmt jeden Anruf an – auch nachts und am Wochenende. Notfälle werden sofort eskaliert, alles andere sauber notiert.",
    visual: (
      <div className="flex h-32 flex-col justify-center gap-1.5 px-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#3c4a53]">
        <p>14:02 · Anruf angenommen</p>
        <p>14:03 · Anliegen: Drucker im Büro Ost</p>
        <p>14:04 · Ticket erstellt, Rückruf zugesagt</p>
        <p className="text-[#0d9b8a]">✓ zusammengefasst an dein team</p>
      </div>
    ),
  },
  {
    media: MEDIA.ai.email,
    title: "E-Mail-Assistent",
    text: "Sortiert das Postfach, beantwortet Standardfragen automatisch und legt Entwürfe für alles Übrige bereit.",
    visual: (
      <div className="flex h-32 flex-col justify-center gap-1.5 px-5 font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[#3c4a53]">
        <p className="flex justify-between"><span>anfrage@… Angebot</span><span className="text-[#0d9b8a]">beantwortet</span></p>
        <p className="flex justify-between"><span>kunde@… Rechnung</span><span className="text-[#0d9b8a]">beantwortet</span></p>
        <p className="flex justify-between"><span>partner@… Projekt</span><span className="text-[#b0653a]">entwurf bereit</span></p>
      </div>
    ),
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
