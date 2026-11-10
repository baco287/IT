import Link from "next/link";
import { MessageCircle, Phone, Mail, ArrowRight, UserCheck } from "lucide-react";
import Reveal from "./Reveal";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { MEDIA } from "@/lib/media";
import { Eyebrow, IconTile, btnPrimary, container } from "./ui";

/* Schlichte Vorschauen – zeigen den Nutzen, keine Technik */
function WhatsAppPreview() {
  return (
    <div className="flex h-36 flex-col justify-center gap-2 px-5">
      <span className="w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-white px-3 py-2 text-[13px] text-text shadow-sm">
        Haben Sie morgen noch einen Termin frei?
      </span>
      <span className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-[#dcf8c6] px-3 py-2 text-[13px] text-text shadow-sm">
        Ja, um 10:30 oder 14:00 Uhr. Was passt Ihnen?
      </span>
    </div>
  );
}

function PhonePreview() {
  return (
    <div className="flex h-36 flex-col justify-center px-5">
      <div className="rounded-xl bg-white p-3.5 text-[13px] shadow-sm">
        <p className="flex items-center justify-between font-semibold text-ink">
          Anruf angenommen <span className="font-normal text-muted">14:02</span>
        </p>
        <p className="mt-1.5 text-muted">Anliegen: Rückruf zu einem Angebot</p>
        <p className="mt-1.5 font-medium text-teal-dark">✓ An Ihr Team weitergeleitet</p>
      </div>
    </div>
  );
}

function EmailPreview() {
  const rows = [
    ["Anfrage: Angebot", "Antwort vorbereitet"],
    ["Frage zu Öffnungszeiten", "beantwortet"],
    ["Terminverschiebung", "beantwortet"],
  ];
  return (
    <div className="flex h-36 flex-col justify-center gap-1.5 px-5">
      {rows.map(([subject, status]) => (
        <p key={subject} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2 text-[13px] shadow-sm">
          <span className="truncate text-text">{subject}</span>
          <span className="flex-none text-xs font-semibold text-teal-dark">{status}</span>
        </p>
      ))}
    </div>
  );
}

const AGENTS = [
  {
    icon: MessageCircle,
    title: "WhatsApp-Assistent",
    text: "Beantwortet häufige Fragen und unterstützt bei Terminanfragen.",
    preview: <WhatsAppPreview />,
    media: MEDIA.ai.whatsapp,
  },
  {
    icon: Phone,
    title: "Telefon-Assistent",
    text: "Nimmt Anrufe entgegen und erfasst wichtige Informationen.",
    preview: <PhonePreview />,
    media: MEDIA.ai.phone,
  },
  {
    icon: Mail,
    title: "E-Mail-Assistent",
    text: "Bearbeitet wiederkehrende E-Mail-Anfragen und bereitet Antworten vor.",
    preview: <EmailPreview />,
    media: MEDIA.ai.email,
  },
];

export default function KiAgents() {
  return (
    <section id="ki-agenten" className="bg-soft py-16 lg:py-20">
      <div className={container}>
        <div className="max-w-3xl">
          <Eyebrow>KI-Agenten</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-[2.4rem]">
            Kundenanfragen automatisch beantworten. Rund um die Uhr.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Unsere KI-Agenten unterstützen Ihr Unternehmen bei wiederkehrenden
            Anfragen über WhatsApp, Telefon und E-Mail.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {AGENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card)]">
                <div className="border-b border-line bg-[linear-gradient(180deg,#eef6f7,#f4f7fa)]">
                  {/* Video ersetzt später nur diese Vorschau (siehe lib/media.ts) */}
                  <SmartAmbientVideo asset={a.media} delayMs={i * 400}>
                    {a.preview}
                  </SmartAmbientVideo>
                </div>
                <div className="flex flex-1 items-start gap-4 p-6">
                  <IconTile>
                    <a.icon size={22} strokeWidth={1.8} aria-hidden />
                  </IconTile>
                  <div>
                    <h3 className="text-lg font-bold">{a.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{a.text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-line bg-white p-6 sm:flex-row sm:items-center sm:p-7">
          <p className="flex items-start gap-3 text-[15px] leading-relaxed text-text">
            <UserCheck size={22} strokeWidth={1.8} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
            Sie behalten die Kontrolle: Wird es persönlich oder dringend, übergibt der
            KI-Agent an Ihr Team.
          </p>
          <Link href="/leistungen/ki-agenten" className={`${btnPrimary} flex-none`}>
            Mehr über KI-Agenten
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
