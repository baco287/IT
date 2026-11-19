import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { btnOnDark, container, h2Class } from "./ui";
import { ADDRESS_LINE, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

/* Kontaktdaten weiterhin von hier beziehbar (bestehende Importe) */
export { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

/* Dunkelblauer Kontaktbereich am Seitenende */
export default function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-ink">
      <div className={`${container} grid gap-12 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16 lg:py-28`}>
        <div>
          <h2 id="cta-heading" className={`${h2Class} text-white`}>
            Finden wir heraus, wo Ihr Unternehmen Zeit und Geld sparen kann.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Im kostenlosen Potenzialgespräch schauen wir uns Ihre Abläufe an und besprechen,
            welche Digitalisierung und Automatisierung für Ihr Unternehmen sinnvoll ist.
          </p>
          <Link href="/kontakt" className={`${btnOnDark} mt-9 w-full sm:w-auto`}>
            Kostenloses Potenzialgespräch vereinbaren
          </Link>
        </div>

        <div>
          <p className="font-[family-name:var(--font-display)] text-[1.35rem] font-bold leading-tight text-white">
            Oder direkt Kontakt aufnehmen
          </p>
          <ul className="mt-4 divide-y divide-white/15 border-b border-t-2 border-white border-b-white/15">
            <li>
              <a
                href={PHONE_HREF}
                className="flex min-h-14 items-center gap-4 text-[17px] font-medium text-white transition-colors hover:text-teal"
              >
                <Phone size={20} strokeWidth={1.9} className="flex-none text-teal" aria-hidden />
                {PHONE_DISPLAY}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="flex min-h-14 items-center gap-4 text-[17px] font-medium text-white transition-colors hover:text-teal"
              >
                <Mail size={20} strokeWidth={1.9} className="flex-none text-teal" aria-hidden />
                {EMAIL}
              </a>
            </li>
            <li className="flex min-h-14 items-center gap-4 text-[16px] text-white/80">
              <MapPin size={20} strokeWidth={1.9} className="flex-none text-teal" aria-hidden />
              {ADDRESS_LINE}
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-white/65">
            Termine nach Vereinbarung – telefonisch oder per Video.
          </p>
        </div>
      </div>
    </section>
  );
}
