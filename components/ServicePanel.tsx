import Link from "next/link";
import Reveal from "./Reveal";

const AREAS = [
  { label: "Managed IT", active: true },
  { label: "Cloud" },
  { label: "Cybersecurity" },
  { label: "KI-Agenten" },
  { label: "Backup & Recovery" },
];

const TREE = [
  "server",
  "arbeitsplaetze",
  "microsoft-365",
  "firewall",
  "backups",
  "ki-agenten",
];

/* Sektion im neon-Stil: Seitenleisten-Navigation + Halftone-gerahmtes
   Leitstand-Fenster mit Onboarding-Terminal. */
export default function ServicePanel() {
  return (
    <section id="leistungen" className="relative px-6 py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">
          <ul className="sticky top-32 grid gap-4 text-[15px]">
            {AREAS.map((a) => (
              <li key={a.label} className="flex items-center gap-2.5">
                {a.active && (
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden />
                )}
                <span className={a.active ? "font-semibold text-white" : "text-fog"}>
                  {a.label}
                </span>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          <Reveal>
            <h2 className="max-w-2xl text-[1.9rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-[2.4rem]">
              Eine IT-Abteilung als Service.{" "}
              <span className="text-fog">
                Ein Ansprechpartner, ein Monatspreis – die Technik dahinter
                übernehmen wir.
              </span>
            </h2>
          </Reveal>

          <Reveal className="mt-12">
            <div className="relative rounded-2xl p-3 sm:p-8">
              <div className="halftone absolute inset-0 rounded-2xl opacity-55" aria-hidden />

              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#060a14] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                <div className="flex items-center gap-2 border-b border-white/8 px-4 py-2.5">
                  <span className="h-3 w-3 rounded-full bg-white/12" />
                  <span className="h-3 w-3 rounded-full bg-white/12" />
                  <span className="h-3 w-3 rounded-full bg-white/12" />
                  <span className="ml-3 font-[family-name:var(--font-mono)] text-xs text-fog">
                    QonteX Leitstand
                  </span>
                </div>

                <div className="grid sm:grid-cols-[190px_1fr]">
                  <div className="hidden border-r border-white/8 px-4 py-5 font-[family-name:var(--font-mono)] text-xs leading-7 text-fog sm:block">
                    {TREE.map((t, i) => (
                      <p key={t} className={i === 0 ? "text-white" : undefined}>
                        <span className="mr-2 text-white/30">▸</span>
                        {t}
                      </p>
                    ))}
                  </div>

                  <div className="px-5 py-5 font-[family-name:var(--font-mono)] text-[13px] leading-7 text-mist">
                    <p className="text-fog">$ qontex onboarding</p>
                    <p>
                      <span className="text-white/40">Schritt 1/3:</span> Systeme
                      erfassen <span className="text-[#45e6be]">ok</span>
                    </p>
                    <p>
                      <span className="text-white/40">Schritt 2/3:</span>{" "}
                      Monitoring verbinden <span className="text-[#45e6be]">ok</span>
                    </p>
                    <p>
                      <span className="text-white/40">Schritt 3/3:</span> Backups
                      einrichten <span className="text-[#45e6be]">ok</span>
                    </p>
                    <p className="mt-2 text-[#45e6be]">
                      ✓ Alle Systeme unter Betreuung.
                    </p>
                    <p className="mt-4 flex items-center gap-2 text-xs text-fog">
                      <span className="status-dot" aria-hidden /> alle systeme
                      grün · reaktion &lt; 24 h
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/8 px-5 py-4">
                  <p className="text-sm text-mist">
                    Überzeugen Sie sich selbst – im kostenlosen Erstgespräch.
                  </p>
                  <Link
                    href="/kontakt"
                    className="inline-flex items-center gap-2 rounded-md bg-[#123d43] px-4 py-2 font-[family-name:var(--font-mono)] text-sm text-[#9beee0] transition-colors hover:bg-[#175058]"
                  >
                    $ erstberatung anfragen
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
