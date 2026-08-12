import Link from "next/link";

const GROUPS = [
  {
    title: "IT-Leistungen",
    links: [
      { label: "Managed IT Services", href: "/leistungen/managed-it" },
      { label: "IT-Support", href: "/leistungen/it-support" },
      { label: "Cloud-Lösungen", href: "/leistungen/cloud-loesungen" },
      { label: "Cybersecurity", href: "/leistungen/cybersecurity" },
      { label: "Server & Netzwerke", href: "/leistungen/server-netzwerke" },
      { label: "Backup & Recovery", href: "/leistungen/backup-recovery" },
    ],
  },
  {
    title: "Digital & Marketing",
    links: [
      { label: "Webseiten & Online-Shops", href: "/leistungen/webseiten" },
      { label: "Ads & Online-Marketing", href: "/leistungen/online-marketing" },
      { label: "Social Media", href: "/leistungen/social-media" },
      { label: "KI-Agenten", href: "/leistungen/ki-agenten" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über QonteX", href: "/ueber" },
      { label: "Lösungen", href: "/loesungen" },
      { label: "Referenzen", href: "/referenzen" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "/impressum" },
      { label: "Datenschutz", href: "/datenschutz" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="section-dark border-t border-white/8 px-6 pb-8 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
              Qonte<span className="text-cyan">X</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-fog">
              Professionelle IT- und Digital-Dienstleistungen für Unternehmen:
              Managed IT, Cloud, Cybersecurity, Webseiten und Marketing aus
              einer Hand.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs font-medium text-cyan">
              <span className="status-dot" aria-hidden />
              Systeme betriebsbereit
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fog/70">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-fog transition-colors hover:text-white"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-fog">
          <p>© {new Date().getFullYear()} QonteX · ein Angebot der Volt Gas UG (haftungsbeschränkt)</p>
          <p>IT-Dienstleistungen · Made in Germany</p>
        </div>
      </div>
    </footer>
  );
}
