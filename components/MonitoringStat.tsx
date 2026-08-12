"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

type Mode = "idle" | "run" | "done";

/* Helle Sektion im neon-Stil: 24/7-Monitoring mit Chart.
   Die Linien zeichnen sich einmal beim ersten Viewport-Eintritt ein
   (~4,5 s); auf kleinen Displays und bei reduzierter Bewegung steht
   sofort der Endzustand. */
export default function MonitoringStat() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("idle");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 640) {
      setMode("done");
      return;
    }
    const el = chartRef.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        setMode("run");
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const drawn = mode !== "idle";
  const t = (transition: string) =>
    mode === "run" ? { transition } : undefined;

  return (
    <section className="bg-[#edf4f3] px-6 py-28 text-night">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="dotgrid-dark mb-10 h-8 w-16" aria-hidden />
          <h2 className="max-w-3xl text-[1.9rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.4rem]">
            24/7-Monitoring.{" "}
            <span className="text-[#5b6b74]">
              Störungen erkennen und beheben, bevor sie im Alltag auffallen.
            </span>
          </h2>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="rounded-full border border-night/15 px-3.5 py-1 text-xs font-semibold">
              Ausfälle vermeiden
            </span>
            <span className="rounded-full border border-night/15 px-3.5 py-1 text-xs font-semibold">
              Kosten planbar halten
            </span>
          </div>
        </Reveal>

        <div ref={chartRef} className="mt-16 grid items-end gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div
            className="will-change-[opacity,transform]"
            style={{
              opacity: drawn ? 1 : 0,
              transform: drawn ? "none" : "translateY(8px)",
              ...t("opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s"),
            }}
          >
            <p className="text-[4.5rem] font-semibold leading-none tracking-tight sm:text-[6rem]">
              24/7
            </p>
            <p className="mt-4 max-w-xs font-[family-name:var(--font-mono)] text-[11px] uppercase leading-relaxed tracking-[0.14em] text-[#5b6b74]">
              Überwachung aller betreuten Systeme – Störungen werden gemeldet,
              bevor deine Mitarbeiter sie bemerken
            </p>
          </div>

          <div>
            <svg
              viewBox="0 0 560 230"
              className="w-full"
              role="img"
              aria-label="Diagramm: Monitoring erkennt eine Lastspitze als Anomalie und reagiert, das System bleibt stabil"
            >
              {[40, 90, 140, 190].map((y) => (
                <line key={y} x1="0" x2="560" y1={y} y2={y} stroke="rgba(10,15,28,0.08)" strokeWidth="1" />
              ))}
              {/* feste Kapazität (gestrichelt) */}
              <line x1="0" x2="560" y1="95" y2="95" stroke="#b0653a" strokeWidth="1.5" strokeDasharray="6 5" />
              {/* Systemlast – zeichnet sich zuerst ein */}
              <polyline
                points="0,185 60,175 110,182 160,150 210,160 260,120 310,135 340,70 380,88 430,110 480,95 520,105 560,90"
                fill="none"
                stroke="rgba(10,15,28,0.45)"
                strokeWidth="1.5"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={drawn ? 0 : 1}
                style={t("stroke-dashoffset 1.3s ease-out 0.1s")}
              />
              {/* Monitoring-Reaktion – folgt danach */}
              <polyline
                points="0,170 60,162 110,168 160,135 210,146 260,104 310,118 340,52 380,70 430,94 480,80 520,90 560,74"
                fill="none"
                stroke="#0d9b8a"
                strokeWidth="2.5"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={drawn ? 0 : 1}
                style={t("stroke-dashoffset 1.6s ease-out 1.4s")}
              />
              {/* Anomalie-Marker an der Lastspitze */}
              <g
                opacity={drawn ? 1 : 0}
                style={t("opacity 0.5s ease 3s")}
              >
                <circle cx="340" cy="52" r="4" fill="#0d9b8a" />
                <circle cx="340" cy="52" r="8" fill="none" stroke="#b0653a" strokeWidth="1" />
                <text
                  x="340"
                  y="30"
                  textAnchor="middle"
                  fill="#b0653a"
                  style={{ font: "600 10px var(--font-mono), monospace", letterSpacing: "0.08em" }}
                >
                  ANOMALIE ERKANNT
                </text>
              </g>
              {/* Endzustand */}
              <g opacity={drawn ? 1 : 0} style={t("opacity 0.5s ease 4s")}>
                <text
                  x="556"
                  y="58"
                  textAnchor="end"
                  fill="#0d9b8a"
                  style={{ font: "600 10px var(--font-mono), monospace", letterSpacing: "0.08em" }}
                >
                  SYSTEM STABIL
                </text>
              </g>
            </svg>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-wider text-[#5b6b74]">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-[#0d9b8a]" aria-hidden /> QonteX Monitoring
              </span>
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm bg-night/45" aria-hidden /> Systemlast
              </span>
              <span className="flex items-center gap-2">
                <span className="h-0.5 w-4 bg-[#b0653a]" aria-hidden /> Ohne Betreuung: feste Grenze
              </span>
            </div>
          </div>
        </div>

        <Reveal className="mt-14 max-w-2xl">
          <p className="leading-relaxed text-[#3c4a53]">
            Wir überwachen Server, Arbeitsplätze und Dienste durchgehend. Steigt
            die Last oder fällt ein Dienst aus, reagieren wir sofort – statt zu
            warten, bis das Telefon klingelt.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
