import Image from "next/image";
import { Headset, Cloud, ShieldCheck } from "lucide-react";
import Wordmark from "./Wordmark";
import agentHead from "@/public/images/qontex-agent-head.png";

/* Ruhige Hero-Illustration nach Designvorlage: Laptop mit QonteX-Logo,
   verbunden mit den Bereichen Support, Cloud und Sicherheit. */

const CHIPS = [
  { icon: Headset, label: "Support", pos: "left-0 top-[52%] -translate-y-1/2" },
  { icon: Cloud, label: "Cloud", pos: "left-1/2 top-0 -translate-x-1/2" },
  { icon: ShieldCheck, label: "Sicherheit", pos: "right-0 top-[52%] -translate-y-1/2" },
];

export default function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-[16/11] w-full max-w-[540px]" aria-hidden>
      {/* sanfter Hintergrund */}
      <div className="absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_55%,rgba(25,213,217,0.16),transparent_65%)]" />

      {/* Umlaufbahn und Verbindungslinien */}
      <svg viewBox="0 0 500 344" className="absolute inset-0 h-full w-full">
        <ellipse cx="250" cy="180" rx="205" ry="80" fill="none" stroke="#19d5d9" strokeOpacity="0.55" strokeWidth="1.5" />
        <line x1="250" y1="42" x2="250" y2="124" stroke="#19d5d9" strokeOpacity="0.6" strokeWidth="1.5" />
        <circle cx="250" cy="124" r="3.5" fill="#19d5d9" />
        <circle cx="45" cy="180" r="3.5" fill="#19d5d9" />
        <circle cx="455" cy="180" r="3.5" fill="#19d5d9" />
      </svg>

      {/* Laptop */}
      <div className="absolute left-1/2 top-[36%] w-[56%] -translate-x-1/2">
        <div className="rounded-t-xl border-[7px] border-b-[9px] border-[#1c2533] bg-[linear-gradient(150deg,#0f2a44,#08172b)] shadow-[0_20px_40px_rgba(8,23,43,0.25)]">
          <div className="flex aspect-[16/10] items-center justify-center gap-2.5">
            <Image src={agentHead} alt="" className="h-9 w-9 rounded-full sm:h-10 sm:w-10" />
            <Wordmark onDark />
          </div>
        </div>
        <div className="relative mx-[-9%] h-3 rounded-b-xl bg-[linear-gradient(180deg,#e5e9ef,#b9c1cc)] shadow-[0_10px_18px_rgba(8,23,43,0.18)]">
          <span className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#a4adb9]" />
        </div>
      </div>

      {/* Bereichs-Kacheln */}
      {CHIPS.map((c) => (
        <div
          key={c.label}
          className={`absolute ${c.pos} flex items-center gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-card)] sm:px-4 sm:py-3`}
        >
          <c.icon size={22} strokeWidth={1.9} className="text-teal-dark" />
          <span className="text-sm font-semibold text-ink">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
