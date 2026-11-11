import Image from "next/image";
import Link from "next/link";
import Wordmark from "./Wordmark";
import { container } from "./ui";
import { ADDRESS_LINE, COMPANY, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";
import agentHead from "@/public/images/qontex-agent-head.png";

const GROUPS = [
  {
    title: "Leistungen",
    links: [
      { label: "Prozessautomatisierung", href: "/leistungen/prozessautomatisierung" },
      { label: "Webseiten & Landingpages", href: "/leistungen/webseiten" },
      { label: "SEO & KI-Agenten", href: "/leistungen/seo-ki-agenten" },
      { label: "Marketing-Automatisierung", href: "/leistungen/marketing-automatisierung" },
      { label: "CRM & Vertrieb", href: "/leistungen/crm-vertrieb" },
      { label: "IT & Infrastruktur", href: "/loesungen" },
    ],
  },
  {
    title: "Ergänzende Leistungen",
    links: [
      { label: "KI-Agenten für Kundenanfragen", href: "/leistungen/ki-agenten" },
      { label: "Online-Marketing & Werbeanzeigen", href: "/leistungen/online-marketing" },
      { label: "Social Media", href: "/leistungen/social-media" },
      { label: "Dashboards & Reporting", href: "/leistungen/dashboards" },
      { label: "Alle Leistungen", href: "/leistungen" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Automatisierung", href: "/automatisierung" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Über QonteX", href: "/ueber" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

const linkCls =
  "inline-flex min-h-9 items-center text-[15px] text-white/70 transition-colors hover:text-white";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white">
      <div className={`${container} py-16`}>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="QonteX – zur Startseite" className="inline-flex items-center gap-2.5">
              <Image src={agentHead} alt="" className="h-10 w-10 rounded-full" />
              <Wordmark onDark />
            </Link>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70">
              Wir digitalisieren und automatisieren Ihr Unternehmen, damit Sie weniger Zeit und
              Geld für Routineaufgaben aufwenden und effizienter wachsen können.
            </p>
            <ul className="mt-6 space-y-1 text-[15px]">
              <li>
                <a href={PHONE_HREF} className="inline-flex min-h-9 items-center font-medium text-white hover:text-teal">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="inline-flex min-h-9 items-center font-medium text-white hover:text-teal">
                  {EMAIL}
                </a>
              </li>
              <li className="pt-1 text-white/70">{ADDRESS_LINE}</li>
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className="text-sm font-semibold text-white">{g.title}</p>
                <ul className="mt-4 space-y-1">
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

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/60">
          <p>
            © {new Date().getFullYear()} {COMPANY.brand} · ein Angebot der {COMPANY.legalName}
          </p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="inline-flex min-h-9 items-center hover:text-white">
              Impressum
            </Link>
            <Link href="/datenschutz" className="inline-flex min-h-9 items-center hover:text-white">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
