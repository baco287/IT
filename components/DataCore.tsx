"use client";

import { useEffect, useRef } from "react";

/* ============================================================
   QonteX Data Core – dezentes Netzwerk im Hero-Hintergrund.
   Reines Canvas, keine Dependencies.

   Stellschrauben:
   - NODES_*        Knotenzahl je Breakpoint
   - MAX_ALPHA      Gesamt-Deckkraft der Ebene (0–1)
   - CENTER_X/Y     visuelles Zentrum (Anteil von Breite/Höhe)
   - DRIFT_PERIOD   Sekunden für einen Drift-Zyklus
   - PULSE_MIN/MAX  Sekunden zwischen zwei Lichtimpulsen
   - PARALLAX_PX    maximale Maus-Parallaxe in Pixeln
   ============================================================ */
const NODES_DESKTOP = 16;
const NODES_TABLET = 11;
const NODES_MOBILE = 7;
const MAX_ALPHA = 0.22;
const TEXT_ALPHA = 0.05; // Restdeckkraft über dem Textbereich links
const CENTER_X = 0.72;
const CENTER_Y = 0.42;
const DRIFT_PERIOD = 25; // s
const PULSE_MIN = 4; // s
const PULSE_MAX = 6; // s
const PARALLAX_PX = 6;

const CYAN = [34, 211, 238] as const;
const TEAL = [75, 227, 194] as const;

type Node = {
  bx: number;
  by: number;
  x: number;
  y: number;
  z: number; // Tiefe 0.4–1
  r: number;
  color: readonly [number, number, number];
  pulsePhase: number;
  pulseSpeed: number;
  driftPhase: number;
  driftSpeed: number;
  driftAmp: number;
};

type Link = [number, number];

export default function DataCore() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;
    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let raf = 0;
    let W = 0;
    let H = 0;
    let nodes: Node[] = [];
    let links: Link[] = [];
    let animate = false;
    let hidden = false;
    // aktiver Lichtimpuls entlang einer Verbindung
    let pulse: { link: Link; start: number; dur: number } | null = null;
    let nextPulseAt = 0;
    const par = { x: 0, y: 0, tx: 0, ty: 0 };

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(W * dpr));
      canvas.height = Math.max(1, Math.round(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = W < 640;
      const count = mobile ? NODES_MOBILE : W < 1024 ? NODES_TABLET : NODES_DESKTOP;
      // Mobil: statisch; sonst animiert, außer bei reduced motion
      animate = !reduceMotion && !mobile;

      const cx = W * (mobile ? 0.5 : CENTER_X);
      const cy = H * (mobile ? 0.3 : CENTER_Y);
      const radius = Math.min(W * 0.24, H * 0.42, 320);

      nodes = [];
      // zentraler, etwas hellerer Knoten
      nodes.push({
        bx: cx, by: cy, x: cx, y: cy, z: 1, r: 2.8, color: CYAN,
        pulsePhase: rand(0, Math.PI * 2), pulseSpeed: rand(0.4, 0.7),
        driftPhase: rand(0, Math.PI * 2), driftSpeed: rand(0.8, 1.1), driftAmp: 5,
      });
      for (let i = 1; i < count; i++) {
        const ang = rand(0, Math.PI * 2);
        const dist = radius * (0.3 + 0.7 * Math.sqrt(Math.random()));
        const z = rand(0.4, 1);
        nodes.push({
          bx: cx + Math.cos(ang) * dist,
          by: cy + Math.sin(ang) * dist * 0.82,
          x: 0, y: 0, z,
          r: 1 + z * 1.3,
          color: i % 2 ? TEAL : CYAN,
          pulsePhase: rand(0, Math.PI * 2),
          pulseSpeed: rand(0.35, 0.8),
          driftPhase: rand(0, Math.PI * 2),
          driftSpeed: rand(0.75, 1.25),
          driftAmp: (5 + 7 * z),
        });
      }

      // jeder Knoten verbindet sich mit seinen 2 nächsten Nachbarn
      const seen = new Set<string>();
      links = [];
      nodes.forEach((n, i) => {
        const near = nodes
          .map((m, j) => ({ j, d: (m.bx - n.bx) ** 2 + (m.by - n.by) ** 2 }))
          .filter((e) => e.j !== i)
          .sort((a, b) => a.d - b.d)
          .slice(0, 2);
        near.forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            links.push(i < j ? [i, j] : [j, i]);
          }
        });
      });
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, W, H);

      const drift = ((Math.PI * 2) / (DRIFT_PERIOD * 1000)) * t;
      nodes.forEach((n) => {
        const a = animate ? drift * n.driftSpeed + n.driftPhase : n.driftPhase;
        n.x = n.bx + Math.cos(a) * n.driftAmp * n.z + par.x * n.z;
        n.y = n.by + Math.sin(a * 0.8) * n.driftAmp * 0.7 * n.z + par.y * n.z;
      });

      // Verbindungen – extrem fein
      ctx.lineWidth = 0.6;
      links.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        const alpha = 0.12 * Math.min(na.z, nb.z);
        ctx.strokeStyle = `rgba(${CYAN[0]},${CYAN[1]},${CYAN[2]},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      });

      // Lichtimpuls entlang einer zufälligen Verbindung
      if (animate) {
        if (!pulse && t >= nextPulseAt && links.length) {
          pulse = {
            link: links[Math.floor(Math.random() * links.length)],
            start: t,
            dur: 2400,
          };
        }
        if (pulse) {
          const p = (t - pulse.start) / pulse.dur;
          if (p >= 1) {
            pulse = null;
            nextPulseAt = t + rand(PULSE_MIN, PULSE_MAX) * 1000;
          } else {
            const e = p * p * (3 - 2 * p); // ease
            const na = nodes[pulse.link[0]];
            const nb = nodes[pulse.link[1]];
            const px = na.x + (nb.x - na.x) * e;
            const py = na.y + (nb.y - na.y) * e;
            const fade = Math.sin(Math.PI * p); // ein-/ausblenden
            ctx.fillStyle = `rgba(${TEAL[0]},${TEAL[1]},${TEAL[2]},${0.14 * fade})`;
            ctx.beginPath();
            ctx.arc(px, py, 4.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = `rgba(234,252,255,${0.6 * fade})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.6, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Knoten mit weichem, sparsamem Glow
      nodes.forEach((n, i) => {
        const puls = animate
          ? 0.75 + 0.25 * Math.sin(t * 0.001 * n.pulseSpeed + n.pulsePhase)
          : 0.85;
        const [r, g, b] = n.color;
        const core = i === 0 ? 0.65 : 0.5;
        ctx.fillStyle = `rgba(${r},${g},${b},${0.07 * n.z * puls})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},${core * n.z * puls})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Links zum Text hin fast vollständig ausblenden
      ctx.globalCompositeOperation = "destination-in";
      const gx = ctx.createLinearGradient(0, 0, W, 0);
      gx.addColorStop(0, `rgba(0,0,0,${TEXT_ALPHA / MAX_ALPHA})`);
      gx.addColorStop(0.45, `rgba(0,0,0,${TEXT_ALPHA / MAX_ALPHA})`);
      gx.addColorStop(0.62, "rgba(0,0,0,1)");
      ctx.fillStyle = gx;
      ctx.fillRect(0, 0, W, H);

      // an allen Außenkanten weich auslaufen
      const cx = W * CENTER_X;
      const cy = H * CENTER_Y;
      const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W * 0.34, H * 0.6));
      gr.addColorStop(0, "rgba(0,0,0,1)");
      gr.addColorStop(0.75, "rgba(0,0,0,0.85)");
      gr.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
    }

    function frame(t: number) {
      if (hidden) return;
      par.x += (par.tx - par.x) * 0.04;
      par.y += (par.ty - par.y) * 0.04;
      draw(t);
      if (animate) raf = requestAnimationFrame(frame);
    }

    function start() {
      cancelAnimationFrame(raf);
      setup();
      if (animate) {
        raf = requestAnimationFrame(frame);
      } else {
        draw(0);
      }
    }

    const onResize = () => start();
    const onVisibility = () => {
      hidden = document.hidden;
      if (!hidden && animate) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    };
    const onMouse = (e: MouseEvent) => {
      par.tx = (e.clientX / window.innerWidth - 0.5) * 2 * PARALLAX_PX;
      par.ty = (e.clientY / window.innerHeight - 0.5) * 2 * PARALLAX_PX;
    };

    start();
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    if (finePointer && !reduceMotion) window.addEventListener("mousemove", onMouse);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (finePointer && !reduceMotion) window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
