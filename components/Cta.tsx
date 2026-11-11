import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { Eyebrow, btnPrimary, container, h2Class } from "./ui";
import { ADDRESS_LINE, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

/* Kontaktdaten weiterhin von hier beziehbar (bestehende Importe) */
export { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

/* Dunkelblauer Kontaktbereich am Seitenende */
export default function Cta() {
  return (
    <section aria-labelledby="cta-heading" className="bg-ink">
      <div className={`${container} grid gap-12 py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16 lg:py-28`}>
        <div>
          <Eyebrow onDark>Kostenloses Potenzialgespräch</Eyebrow>
          <h2 id="cta-heading" className={`mt-4 ${h2Class} text-white`}>
            Finden wir heraus, wo Ihr Unternehmen Zeit und Geld sparen kann.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            Im kostenlosen Potenzialgespräch schauen wir uns Ihre Abläufe an und besprechen,
            welche Digitalisierung und Automatisierung für Ihr Unternehmen sinnvoll ist.
          </p>
          <Link href="/kontakt" className={`${btnPrimary} mt-9 w-full sm:w-auto`}>
            Kostenloses Potenzialgespräch vereinbaren
            <ArrowRight size={18} strokeWidth={2.2} className="flex-none" aria-hidden />
          </Link>
        </div>

        <div className="rounded-3xl border border-white/12 bg-ink-soft p-7 sm:p-8">
          <p className="text-[15px] font-semibold text-white">Oder direkt Kontakt aufnehmen</p>
          <ul className="mt-4 divide-y divide-white/10">
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
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Termine nach Vereinbarung – telefonisch oder per Video.
          </p>
        </div>
      </div>
    </section>
  );
}
