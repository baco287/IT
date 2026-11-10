import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Eyebrow, btnTeal, container } from "./ui";

export const PHONE_DISPLAY = "+49 176 25041651";
export const PHONE_HREF = "tel:+4917625041651";
export const EMAIL = "info@qontex.de";

/* Dunkelblauer Kontaktbereich am Seitenende */
export default function Cta() {
  return (
    <section className="bg-white pb-20 pt-4 lg:pb-24">
      <div className={container}>
        <div className="grid items-center gap-10 rounded-3xl bg-ink px-7 py-12 sm:px-12 lg:grid-cols-[1.2fr_auto_1fr] lg:gap-12 lg:px-14 lg:py-14">
          <div>
            <Eyebrow onDark>Kontakt</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-[2.3rem]">
              Lassen Sie uns über Ihre IT sprechen.
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/75">
              In einem kostenlosen Erstgespräch besprechen wir Ihre Anforderungen und
              finden gemeinsam die passende Lösung.
            </p>
          </div>

          <span className="hidden h-40 w-px bg-white/15 lg:block" aria-hidden />

          <div>
            <Link href="/kontakt" className={`${btnTeal} w-full sm:w-auto`}>
              Kostenloses Erstgespräch vereinbaren
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <ul className="mt-6 space-y-1">
              <li>
                <a
                  href={PHONE_HREF}
                  className="inline-flex min-h-11 items-center gap-3 text-[17px] font-medium text-white transition-colors hover:text-teal"
                >
                  <Phone size={20} strokeWidth={1.9} className="text-teal" aria-hidden />
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex min-h-11 items-center gap-3 text-[17px] font-medium text-white transition-colors hover:text-teal"
                >
                  <Mail size={20} strokeWidth={1.9} className="text-teal" aria-hidden />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
