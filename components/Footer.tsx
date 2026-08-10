import Link from "next/link";

const GROUPS = [
  {
    title: "Leistungen",
    links: [
      { label: "Managed IT Services", href: "/leistungen/managed-it" },
      { label: "IT-Support", href: "/leistungen/it-support" },
      { label: "Cloud-Lösungen", href: "/leistungen/cloud-loesungen" },
      { label: "Cybersecurity", href: "/leistungen/cybersecurity" },
      { label: "Server & Netzwerke", href: "/leistungen/server-netzwerke" },
      { label: "KI-Agenten & Automatisierung", href: "/leistungen/ki-agenten" },
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
    <footer className="section-dark px-6 pb-8 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight text-white">
              Qonte<span className="text-[#8fb6ec]">X</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-[#a9bbd4]">
              Professionelle IT-Dienstleistungen für Unternehmen: Managed IT,
              Cloud, Cybersecurity und persönlicher Support aus einer Hand.
            </p>
            <p className="mt-4 flex items-center gap-2 text-xs font-medium text-[#8fb6ec]">
              <span className="status-dot" aria-hidden />
              Systeme betriebsbereit
            </p>
          </div>
          <div className="flex flex-wrap gap-x-14 gap-y-8">
            {GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7f93b0]">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-[#c3d0e4] transition-colors hover:text-white"
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-[#8b9cb6]">
          <p>© {new Date().getFullYear()} QonteX · ein Angebot der Volt Gas UG (haftungsbeschränkt)</p>
          <p>IT-Dienstleistungen · Made in Germany</p>
        </div>
      </div>
    </footer>
  );
}
