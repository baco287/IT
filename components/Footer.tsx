import Image from "next/image";
import Link from "next/link";
import Wordmark from "./Wordmark";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./Cta";
import { container } from "./ui";
import agentHead from "@/public/images/qontex-agent-head.png";

const GROUPS = [
  {
    title: "IT-Betreuung",
    links: [
      { label: "IT-Betreuung (Managed IT)", href: "/leistungen/managed-it" },
      { label: "IT-Support", href: "/leistungen/it-support" },
      { label: "Cloud & Microsoft 365", href: "/leistungen/cloud-loesungen" },
      { label: "IT-Sicherheit", href: "/leistungen/cybersecurity" },
      { label: "Server & Netzwerke", href: "/leistungen/server-netzwerke" },
      { label: "Backup & Wiederherstellung", href: "/leistungen/backup-recovery" },
    ],
  },
  {
    title: "Digital & Automatisierung",
    links: [
      { label: "KI-Agenten", href: "/leistungen/ki-agenten" },
      { label: "Webseiten & Online-Shops", href: "/leistungen/webseiten" },
      { label: "Online-Marketing", href: "/leistungen/online-marketing" },
      { label: "Social Media", href: "/leistungen/social-media" },
      { label: "Dashboards & Reporting", href: "/leistungen/dashboards" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über QonteX", href: "/ueber" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Technik & Lösungen", href: "/loesungen" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-soft">
      <div className={`${container} py-14`}>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <Link href="/" aria-label="QonteX – zur Startseite" className="inline-flex items-center gap-2.5">
              <Image src={agentHead} alt="" className="h-10 w-10 rounded-full" />
              <Wordmark />
            </Link>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Ihr IT-Partner für Betreuung, Sicherheit und Automatisierung – persönlich
              und aus einer Hand.
            </p>
            <ul className="mt-5 space-y-2 text-[15px]">
              <li>
                <a href={PHONE_HREF} className="font-medium text-ink hover:text-teal-dark">
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="font-medium text-ink hover:text-teal-dark">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
          <div className="grid gap-8 sm:grid-cols-3">
            {GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className="text-sm font-semibold text-ink">{g.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[15px] text-muted transition-colors hover:text-ink">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-muted">
          <p>© {new Date().getFullYear()} QonteX · ein Angebot der Volt Gas UG (haftungsbeschränkt)</p>
          <nav aria-label="Rechtliches" className="flex gap-6">
            <Link href="/impressum" className="hover:text-ink">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-ink">
              Datenschutz
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
