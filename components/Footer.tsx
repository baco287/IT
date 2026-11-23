import Link from "next/link";
import Wordmark from "./Wordmark";
import { container } from "./ui";
import { NAV_GROUPS } from "@/lib/navigation";
import { ADDRESS_LINE, COMPANY, EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/company";

const COMPANY_LINKS = [
  { label: "Über QonteX", href: "/ueber" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "IT-Betreuung", href: "/leistungen#it-betreuung" },
  { label: "Buchungs-Demo", href: "/demo" },
];

const linkCls = "inline-flex min-h-10 items-center text-[15px] text-haze transition-colors hover:text-white";

export default function Footer() {
  const groups = [
    { title: "Leistungen", links: NAV_GROUPS.leistungen.items },
    { title: "Lösungen", links: NAV_GROUPS.loesungen.items },
    { title: "Unternehmen", links: COMPANY_LINKS },
  ];

  return (
    <footer className="on-dark border-t border-edge bg-night text-haze">
      <div className={`${container} pb-10 pt-16 lg:pt-20`}>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="QonteX – zur Startseite" className="inline-flex min-h-11 items-center">
              <Wordmark />
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed">
              IT, KI und Automatisierung für Unternehmen aller Branchen. Wir entwickeln Software,
              verbinden Systeme und automatisieren wiederkehrende Abläufe.
            </p>
            <ul className="mt-6 text-[15px]">
              <li>
                <a href={PHONE_HREF} className="inline-flex min-h-10 items-center font-medium text-white hover:text-signal">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center font-medium text-white hover:text-signal"
                >
                  Per WhatsApp schreiben
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-10 items-center font-medium text-white hover:text-signal">
                  {EMAIL}
                </a>
              </li>
              <li className="pt-2">{ADDRESS_LINE}</li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {groups.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className="text-[15px] font-semibold text-white">{g.title}</p>
                <ul className="mt-3">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={linkCls}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-8 gap-y-2 border-t border-edge pt-6 text-[14px]">
          <p>
            © {new Date().getFullYear()} {COMPANY.brand}, ein Angebot der {COMPANY.legalName}
          </p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="inline-flex min-h-11 items-center hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="inline-flex min-h-11 items-center hover:text-white">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
