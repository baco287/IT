"use client";

import { useEffect, useRef, useState } from "react";
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

const STEPS = [
  "Systeme erfassen",
  "Monitoring verbinden",
  "Backups einrichten",
];

/* Ablauf der Terminal-Sequenz (ms nach Viewport-Eintritt).
   Schritt-Logik: sichtbar ab 2+2i, „ok" ab 3+2i. 8 = fertig. */
const TIMELINE: Array<[number, number]> = [
  [300, 1],
  [1000, 2],
  [2100, 3],
  [2500, 4],
  [3600, 5],
  [4000, 6],
  [5100, 7],
  [5700, 8],
];
const DONE = 8;

/* Sektion im neon-Stil: Seitenleisten-Navigation + Halftone-gerahmtes
   Leitstand-Fenster. Die Terminal-Sequenz läuft einmal beim ersten
   Viewport-Eintritt; bei reduzierter Bewegung steht sofort der Endzustand. */
export default function ServicePanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [pulsing, setPulsing] = useState(false);
  const [scan, setScan] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(DONE);
      return;
    }
    const el = panelRef.current;
    if (!el) return;
    const timers: number[] = [];
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        TIMELINE.forEach(([ms, s]) => {
          timers.push(
            window.setTimeout(() => {
              setStep(s);
              if (s === 3 || s === 5 || s === 7) {
                setPulsing(true);
                timers.push(window.setTimeout(() => setPulsing(false), 400));
              }
              if (s === DONE) setScan(true);
            }, ms)
          );
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const caretAt = (threshold: number, nextThreshold: number) =>
    step >= threshold && step < nextThreshold && step < DONE;

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
            <div ref={panelRef} className="relative rounded-2xl p-3 sm:p-8">
              <div
                className={`halftone absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  pulsing ? "opacity-70" : "opacity-55"
                }`}
                aria-hidden
              />

              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#060a14] shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                {/* Einmaliger Scan nach Abschluss der Sequenz */}
                {scan && (
                  <div
                    className="scan-sweep pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-transparent via-cyan/8 to-transparent"
                    aria-hidden
                  />
                )}

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

                  {/* Alle Zeilen sind fest reserviert (nur Opazität wechselt),
                      damit nichts im Layout springt. */}
                  <div className="px-5 py-5 font-[family-name:var(--font-mono)] text-[13px] leading-7 text-mist">
                    <p
                      className={`text-fog transition-opacity duration-300 ${
                        step >= 1 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      $ qontex onboarding
                      {caretAt(1, 2) && <span className="caret" aria-hidden />}
                    </p>
                    {STEPS.map((label, i) => {
                      const visible = step >= 2 + 2 * i;
                      const ok = step >= 3 + 2 * i;
                      return (
                        <p
                          key={label}
                          className={`transition-opacity duration-300 ${
                            visible ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <span className="text-white/40">
                            Schritt {i + 1}/3:
                          </span>{" "}
                          {label}{" "}
                          {ok ? (
                            <span className="text-[#45e6be]">ok</span>
                          ) : (
                            <span className="text-white/45">läuft …</span>
                          )}
                          {caretAt(2 + 2 * i, 4 + 2 * i) && (
                            <span className="caret" aria-hidden />
                          )}
                        </p>
                      );
                    })}
                    <p
                      className={`mt-2 text-[#45e6be] transition-opacity duration-500 ${
                        step >= DONE ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      ✓ Alle Systeme unter Betreuung.
                    </p>
                    <p
                      className={`mt-4 flex items-center gap-2 text-xs text-fog transition-opacity duration-500 ${
                        step >= DONE ? "opacity-100" : "opacity-0"
                      }`}
                    >
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
