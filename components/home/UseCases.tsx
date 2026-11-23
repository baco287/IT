"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import FlowDiagram from "../viz/FlowDiagram";
import { SectionHead, btnGhostLight, container, textLinkDark } from "../ui";
import { EXAMPLES, HOME_EXAMPLES } from "@/lib/examples";

/* Anwendungsbeispiele als Register: links die Auswahl, rechts der Ablauf */
export default function UseCases() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const items = HOME_EXAMPLES.map((id) => EXAMPLES[id]);
  const current = items[active];

  // Pfeiltasten wechseln das Beispiel (Register-Muster)
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | null = null;
    if (e.key in keys) next = (active + keys[e.key] + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="anwendungsbeispiele" aria-labelledby="beispiele-heading" className="bg-fog">
      <div className={`${container} py-20 lg:py-28`}>
        <SectionHead
          id="beispiele-heading"
          title="Anwendungsbeispiele aus dem Unternehmensalltag"
          text="Typische Abläufe, die wir mit KI, Automatisierung und Software umsetzen. Die Beispiele zeigen das Prinzip, es sind keine Kundenprojekte."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8">
          <div
            role="tablist"
            aria-label="Anwendungsbeispiele"
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col lg:gap-0 lg:border-t lg:border-ink/80"
          >
            {items.map((ex, i) => {
              const selected = i === active;
              return (
                <button
                  key={ex.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${ex.id}`}
                  aria-selected={selected}
                  aria-controls="beispiel-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={onKeyDown}
                  className={`min-h-12 min-w-0 rounded-[10px] border px-3 py-2 text-left text-[14.5px] font-semibold leading-snug [hyphens:auto] [overflow-wrap:anywhere] transition-colors lg:[hyphens:manual] lg:flex lg:min-h-14 lg:items-center lg:justify-between lg:rounded-none lg:border-0 lg:border-b lg:border-rule lg:px-1 lg:py-3 lg:text-[16.5px] ${
                    selected
                      ? "border-night bg-night text-white lg:bg-transparent lg:text-ink"
                      : "border-rule bg-white text-muted hover:text-ink lg:bg-transparent"
                  }`}
                >
                  <span>{ex.title}</span>
                  <span
                    aria-hidden
                    className={`hidden h-2 w-2 flex-none rounded-full lg:block ${selected ? "bg-signal-ink" : "bg-transparent"}`}
                  />
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id="beispiel-panel"
            aria-labelledby={`tab-${current.id}`}
            className="on-dark rounded-[20px] bg-night p-6 sm:p-9"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
              <h3 className="max-w-[30rem] text-[1.6rem] leading-[1.15] text-white">{current.title}</h3>
              <span className="rounded-[6px] border border-edge px-2.5 py-1 text-[13px] text-haze">
                Anwendungsbeispiel
              </span>
            </div>
            <p className="mt-3 max-w-[38rem] text-[16.5px] leading-relaxed text-haze">{current.text}</p>
            <div className="mt-9">
              <FlowDiagram steps={current.steps} animateKey={current.id} />
            </div>
            <p className="mt-9 border-t border-edge pt-6">
              <Link href={current.href} className={`inline-flex min-h-11 items-center text-[15.5px] ${textLinkDark}`}>
                {current.hrefLabel}
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-5 rounded-[20px] border border-rule bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-[40rem]">
            <h3 className="text-[1.3rem]">Selbst ausprobieren: Online-Buchung mit KI-Assistent</h3>
            <p className="mt-2 text-[16px] leading-relaxed text-muted">
              In unserer Live-Demo reservieren Sie einen Tisch im Restaurant oder buchen einen
              Werkstatttermin, per Formular oder im Gespräch mit dem Assistenten. Beide Betriebe sind
              erfunden, es wird nichts gespeichert.
            </p>
          </div>
          <Link href="/demo" className={`${btnGhostLight} flex-none`}>
            Demo öffnen
          </Link>
        </div>
      </div>
    </section>
  );
}
