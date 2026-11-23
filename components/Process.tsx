"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHead, container } from "./ui";

const STEPS = [
  {
    title: "Analyse",
    text: "Wir verstehen bestehende Prozesse und identifizieren Verbesserungspotenziale.",
    result: "Überblick über Abläufe, Systeme und Prioritäten",
  },
  {
    title: "Konzeption",
    text: "Wir entwickeln eine passende technische Lösung.",
    result: "Lösungskonzept mit Umfang, Zeitplan und Angebot",
  },
  {
    title: "Entwicklung",
    text: "Wir setzen Software, KI und Automatisierungen um.",
    result: "Getestete Lösung, eingeführt bei Ihrem Team",
  },
  {
    title: "Optimierung",
    text: "Wir verbessern und erweitern die Systeme nach Bedarf.",
    result: "Betreuung, Auswertung und nächste Ausbaustufen",
  },
];

/* „So arbeiten wir" – vier Schritte. Die Linie füllt sich einmal, sobald der Abschnitt
   sichtbar wird; bei reduzierter Bewegung steht sie sofort. */
export default function Process({
  id = "so-arbeiten-wir",
  note,
  tone = "white",
}: {
  id?: string;
  note?: string;
  tone?: "white" | "fog";
}) {
  const ref = useRef<HTMLOListElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={tone === "fog" ? "bg-fog" : "bg-white"}>
      <div className={`${container} py-20 lg:py-28`}>
        <SectionHead
          id={`${id}-heading`}
          title="So arbeiten wir"
          text={
            note ??
            "Vom ersten Gespräch bis zum laufenden System: ein klarer Ablauf, nach jedem Schritt mit einem greifbaren Ergebnis."
          }
        />

        <ol ref={ref} className="relative mt-14 grid gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {/* Durchgehende Linie: am Desktop oben, am Handy links */}
          <span aria-hidden className="absolute left-[1.15rem] top-2 bottom-2 w-px bg-rule lg:left-0 lg:right-0 lg:top-[1.15rem] lg:bottom-auto lg:h-px lg:w-auto" />
          <span
            aria-hidden
            className={`progress-line absolute left-[1.15rem] top-2 bottom-2 w-px bg-signal-ink lg:left-0 lg:right-0 lg:top-[1.15rem] lg:bottom-auto lg:h-px lg:w-auto ${
              visible ? "is-visible" : ""
            }`}
          />
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[2.3rem_minmax(0,1fr)] gap-x-5 lg:block">
              <span className="wide tnum relative z-10 grid h-[2.3rem] w-[2.3rem] place-items-center rounded-full border border-signal-ink bg-white text-[14px] font-semibold text-signal-ink">
                {i + 1}
              </span>
              <div className="lg:mt-7">
                <h3 className="text-[1.45rem]">{s.title}</h3>
                <p className="mt-2 text-[16.5px] leading-relaxed text-muted">{s.text}</p>
                <div className="mt-5 border-t border-rule pt-3">
                  <p className="text-[14px] font-semibold text-ink">Ergebnis</p>
                  <p className="mt-0.5 text-[15px] leading-snug text-text">{s.result}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
