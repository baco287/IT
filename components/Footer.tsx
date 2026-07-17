import Wordmark from "./Wordmark";

const GROUPS = [
  {
    title: "Leistungen",
    links: [
      { label: "Managed IT Services", href: "#leistungen" },
      { label: "Cloud-Lösungen", href: "#leistungen" },
      { label: "Cybersecurity", href: "#leistungen" },
      { label: "Server & Netzwerke", href: "#leistungen" },
    ],
  },
  {
    title: "Unternehmen",
    links: [
      { label: "Über QonteX", href: "#ueber" },
      { label: "Lösungen", href: "#loesungen" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontakt", href: "#kontakt" },
    ],
  },
  {
    title: "Rechtliches",
    links: [
      { label: "Impressum", href: "#impressum" },
      { label: "Datenschutz", href: "#datenschutz" },
      { label: "Cookie-Einstellungen", href: "#cookies" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-abyss px-6 pb-8 pt-14">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-xs">
            <Wordmark large />
            <p className="mt-4 text-sm leading-relaxed text-fog">
              Professionelle IT-Dienstleistungen für Unternehmen: Managed IT,
              Cloud, Cybersecurity und persönlicher Support aus einer Hand.
            </p>
          </div>
          <div className="flex flex-wrap gap-14">
            {GROUPS.map((g) => (
              <nav key={g.title} aria-label={g.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fog">
                  {g.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {g.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-mist/80 transition-colors hover:text-cyan"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-6 text-xs text-fog">
          <p>© {new Date().getFullYear()} QonteX. Alle Rechte vorbehalten.</p>
          <p>IT-Dienstleistungen · Made in Germany</p>
        </div>
      </div>
    </footer>
  );
}
