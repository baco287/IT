import Link from "next/link";
import { MessageCircle, Phone, Mail, ArrowRight, UserCheck } from "lucide-react";
import SmartAmbientVideo from "./SmartAmbientVideo";
import { MEDIA } from "@/lib/media";
import { Eyebrow, btnPrimary, container } from "./ui";

const AGENTS = [
  {
    icon: MessageCircle,
    title: "WhatsApp-Assistent",
    text: "Beantwortet häufige Fragen und unterstützt bei Terminanfragen.",
  },
  {
    icon: Phone,
    title: "Telefon-Assistent",
    text: "Nimmt Anrufe entgegen und erfasst wichtige Informationen.",
  },
  {
    icon: Mail,
    title: "E-Mail-Assistent",
    text: "Bearbeitet wiederkehrende E-Mail-Anfragen und bereitet Antworten vor.",
  },
];

const CHAT: Array<{ from: "kunde" | "agent"; text: string }> = [
  { from: "kunde", text: "Guten Tag, haben Sie diese Woche noch einen Termin für eine Beratung frei?" },
  { from: "agent", text: "Guten Tag! Gern – am Donnerstag um 10:30 Uhr oder am Freitag um 14:00 Uhr. Was passt Ihnen besser?" },
  { from: "kunde", text: "Donnerstag passt gut." },
  { from: "agent", text: "Prima, ich habe Donnerstag, 10:30 Uhr für Sie eingetragen. Sie erhalten gleich eine Bestätigung." },
];

function ChatExample() {
  return (
    <div className="space-y-2.5 p-5 sm:p-6">
      {CHAT.map((m, i) => (
        <p
          key={i}
          className={`w-fit max-w-[85%] rounded-xl px-3.5 py-2.5 text-[14px] leading-relaxed text-text ${
            m.from === "kunde" ? "rounded-tl-sm bg-white" : "ml-auto rounded-tr-sm bg-[#dcf3e4]"
          }`}
        >
          {m.text}
        </p>
      ))}
    </div>
  );
}

export default function KiAgents() {
  return (
    <section id="ki-agenten" className="bg-soft py-16 lg:py-20">
      <div className={`${container} grid items-start gap-12 lg:grid-cols-2 lg:gap-16`}>
        <div>
          <Eyebrow>KI-Agenten</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-[2.4rem]">
            Kundenanfragen automatisch beantworten. Rund um die Uhr.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Unsere KI-Agenten unterstützen Ihr Unternehmen bei wiederkehrenden Anfragen
            über WhatsApp, Telefon und E-Mail.
          </p>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            {AGENTS.map((a) => (
              <li key={a.title} className="flex items-start gap-4 py-5">
                <a.icon size={24} strokeWidth={1.7} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
                <div>
                  <h3 className="text-lg font-bold">{a.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex items-start gap-3 text-[15px] leading-relaxed text-text">
            <UserCheck size={20} strokeWidth={1.8} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
            Sie behalten die Kontrolle: Wird es persönlich oder dringend, übergibt der
            KI-Agent an Ihr Team.
          </p>
          <Link href="/leistungen/ki-agenten" className={`${btnPrimary} mt-8`}>
            Mehr über KI-Agenten
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
          </Link>
        </div>

        <figure className="overflow-hidden rounded-2xl border border-line bg-[#eef2f1] lg:mt-10">
          <figcaption className="flex items-center gap-2 border-b border-line bg-white px-5 py-3.5 text-sm font-semibold text-ink">
            <MessageCircle size={18} strokeWidth={1.9} className="text-teal-dark" aria-hidden />
            Beispiel: So antwortet ein WhatsApp-Assistent
          </figcaption>
          {/* Video ersetzt später nur dieses Beispiel (siehe lib/media.ts) */}
          <SmartAmbientVideo asset={MEDIA.ai.whatsapp}>
            <ChatExample />
          </SmartAmbientVideo>
        </figure>
      </div>
    </section>
  );
}
