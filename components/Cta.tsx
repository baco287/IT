import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { btnSignalLg, container, h2Class } from "./ui";
import { CTA_LABEL, EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/company";

/* Kontaktdaten weiterhin von hier beziehbar (bestehende Importe) */
export { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

const rowCls =
  "flex min-h-14 items-center gap-4 text-[17px] font-medium text-white transition-colors hover:text-signal";

/* Dunkler Kontaktbereich am Seitenende */
export default function Cta({
  title = "Sprechen wir über Ihr Projekt.",
  text = "Beschreiben Sie kurz, welche Abläufe Sie digitalisieren oder automatisieren möchten. Im ersten Gespräch klären wir, was technisch sinnvoll ist und wie ein Projekt aussehen kann. Kostenlos und unverbindlich.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative isolate overflow-hidden bg-night">
      <div className="glow-signal pointer-events-none absolute -right-40 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2" aria-hidden />
      <div className={`${container} grid gap-14 py-20 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-center lg:gap-20 lg:py-28`}>
        <div>
          <h2 id="cta-heading" className={`${h2Class} text-white`}>
            {title}
          </h2>
          <p className="mt-5 max-w-[38rem] text-[1.125rem] leading-relaxed text-haze">{text}</p>
          <Link href="/kontakt" className={`${btnSignalLg} mt-9 w-full sm:w-auto`}>
            {CTA_LABEL}
          </Link>
        </div>

        <div>
          <h3 className="text-[1.2rem] text-white">Oder direkt Kontakt aufnehmen</h3>
          <ul className="mt-4 divide-y divide-edge border-y border-edge">
            <li>
              <a href={PHONE_HREF} className={rowCls}>
                <Phone size={19} strokeWidth={1.9} className="flex-none text-signal" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener noreferrer" className={rowCls}>
                <MessageCircle size={19} strokeWidth={1.9} className="flex-none text-signal" aria-hidden />
                Per WhatsApp schreiben
              </a>
            </li>
            <li>
              <a href={`mailto:${EMAIL}`} className={rowCls}>
                <Mail size={19} strokeWidth={1.9} className="flex-none text-signal" aria-hidden />
                {EMAIL}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-[14.5px] leading-relaxed text-haze">
            Termine nach Vereinbarung, telefonisch oder per Video.
          </p>
        </div>
      </div>
    </section>
  );
}
