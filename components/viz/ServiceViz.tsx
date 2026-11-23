/**
 * Kleine Strichgrafiken für die Leistungsbereiche. Gleiche Formensprache wie die
 * Systemkarte im Seitenkopf: abgerundete Kästen, feine Linien, Akzent in Cyan.
 * Rein dekorativ (aria-hidden); beim Überfahren der Karte wird der Akzent kräftiger.
 */

const base = "stroke-edge-strong";
const soft = "fill-night-3";
const label = "fill-dim text-[11px]";
const accent =
  "stroke-signal/60 transition-[stroke-opacity] duration-300 group-hover:stroke-signal motion-reduce:transition-none";
const accentFill = "fill-signal/70 transition-[fill-opacity] duration-300 group-hover:fill-signal";

type VizProps = { className?: string };

/* KI & Agenten: unstrukturierte Eingänge → KI-Kern → strukturierte Ergebnisse */
export function AgentViz({ className = "" }: VizProps) {
  return (
    <svg viewBox="0 0 440 200" className={className} aria-hidden focusable="false" fill="none" strokeWidth={1.4}>
      {/* Eingänge: Nachricht, Dokument, Anruf */}
      <rect x="14" y="22" width="96" height="40" rx="10" className={`${base} ${soft}`} />
      <path d="M30 37h52M30 47h36" className={base} strokeLinecap="round" />
      <path d="M28 62l-6 10 16-10" className={`${base} ${soft}`} strokeLinejoin="round" />

      <rect x="22" y="84" width="64" height="80" rx="8" className={`${base} ${soft}`} />
      <path d="M34 100h40M34 112h40M34 124h28M34 136h36M34 148h22" className={base} strokeLinecap="round" />

      <path d="M104 178c6-12 10-12 14 0s8 12 12 0 8-12 12 0" className={base} strokeLinecap="round" />

      {/* Verbindungen zum Kern */}
      <path d="M110 42C160 42 168 100 206 100M86 124c50 0 80-24 120-24M142 178c30 0 40-78 64-78" className={accent} strokeDasharray="2 6" strokeLinecap="round" />

      {/* KI-Kern */}
      <circle cx="240" cy="100" r="34" className={`${base} ${soft}`} />
      <circle cx="240" cy="100" r="22" className={accent} />
      <circle cx="240" cy="100" r="5" className={accentFill} stroke="none" />
      <path d="M240 66v-14M240 134v14M206 100h-0" className={base} />

      {/* Ausgänge: strukturierte Felder */}
      <path d="M274 100c40 0 40-58 78-58M274 100h78M274 100c40 0 40 58 78 58" className={accent} strokeLinecap="round" />
      {[
        { y: 42, t: "Kunde" },
        { y: 100, t: "Anliegen" },
        { y: 158, t: "Termin" },
      ].map(({ y, t }) => (
        <g key={y}>
          <rect x="352" y={y - 15} width="80" height="30" rx="8" className={`${base} ${soft}`} />
          <path d={`M362 ${y}l4 4 8-9`} className={accent} strokeLinecap="round" strokeLinejoin="round" />
          <text x="380" y={y + 4} className={label} stroke="none">
            {t}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* Automatisierung: Auslöser → Schritt → Entscheidung → zwei Wege */
export function WorkflowViz({ className = "" }: VizProps) {
  return (
    <svg viewBox="0 0 300 170" className={className} aria-hidden focusable="false" fill="none" strokeWidth={1.4}>
      <circle cx="30" cy="85" r="14" className={`${base} ${soft}`} />
      <circle cx="30" cy="85" r="4" className={accentFill} stroke="none" />
      <path d="M44 85h28" className={accent} strokeLinecap="round" />
      <rect x="72" y="66" width="62" height="38" rx="9" className={`${base} ${soft}`} />
      <path d="M86 85h34" className={base} strokeLinecap="round" />
      <path d="M134 85h22" className={accent} strokeLinecap="round" />
      <path d="M176 65l20 20-20 20-20-20z" className={`${base} ${soft}`} strokeLinejoin="round" />
      <path d="M196 85c22 0 18-44 40-44M196 85c22 0 18 44 40 44" className={accent} strokeLinecap="round" />
      <rect x="236" y="24" width="52" height="34" rx="9" className={`${base} ${soft}`} />
      <rect x="236" y="112" width="52" height="34" rx="9" className={`${base} ${soft}`} />
      <path d="M248 41l5 5 9-10M248 129h28" className={base} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Webentwicklung: Desktop-Ansicht und dieselbe Seite auf dem Handy */
export function WebViz({ className = "" }: VizProps) {
  return (
    <svg viewBox="0 0 300 170" className={className} aria-hidden focusable="false" fill="none" strokeWidth={1.4}>
      <rect x="10" y="14" width="206" height="142" rx="10" className={`${base} ${soft}`} />
      <path d="M10 36h206" className={base} />
      <circle cx="24" cy="25" r="3" className={base} />
      <circle cx="35" cy="25" r="3" className={base} />
      <rect x="26" y="52" width="94" height="10" rx="3" className={accent} />
      <path d="M26 74h120M26 84h96" className={base} strokeLinecap="round" />
      <rect x="26" y="100" width="56" height="16" rx="5" className={accentFill} stroke="none" />
      <rect x="140" y="52" width="60" height="64" rx="7" className={base} />
      <path d="M26 132h50M90 132h50M154 132h46" className={base} strokeLinecap="round" />
      {/* Handy */}
      <rect x="234" y="30" width="56" height="112" rx="10" className={`${base} ${soft}`} />
      <rect x="244" y="48" width="36" height="7" rx="2" className={accent} />
      <path d="M244 64h36M244 72h26" className={base} strokeLinecap="round" />
      <rect x="244" y="84" width="24" height="10" rx="3" className={accentFill} stroke="none" />
      <rect x="244" y="104" width="36" height="24" rx="5" className={base} />
    </svg>
  );
}

/* Individuelle Software: Anwendung mit Navigation, Tabelle und Kennzahl */
export function SoftwareViz({ className = "" }: VizProps) {
  return (
    <svg viewBox="0 0 300 170" className={className} aria-hidden focusable="false" fill="none" strokeWidth={1.4}>
      <rect x="10" y="12" width="280" height="146" rx="10" className={`${base} ${soft}`} />
      <path d="M70 12v146" className={base} />
      <path d="M24 34h32M24 50h26M24 66h30M24 82h22" className={base} strokeLinecap="round" />
      <rect x="20" y="44" width="40" height="12" rx="4" className={accent} />
      {/* Tabelle */}
      {[34, 56, 78, 100].map((y, i) => (
        <g key={y}>
          <path d={`M86 ${y}h${i === 0 ? 60 : 44}M150 ${y}h30`} className={base} strokeLinecap="round" />
          <circle cx="192" cy={y} r="3.5" className={i === 1 ? accentFill : base} stroke={i === 1 ? "none" : undefined} />
        </g>
      ))}
      <path d="M86 116h120" className={base} />
      {/* Kennzahl */}
      <rect x="216" y="26" width="60" height="118" rx="8" className={base} />
      {[56, 80, 70, 98].map((h, i) => (
        <rect key={i} x={226 + i * 12} y={134 - h * 0.9} width="6" height={h * 0.9} rx="2" className={i === 3 ? accentFill : `${soft} ${base}`} stroke={i === 3 ? "none" : undefined} />
      ))}
      <path d="M86 134h60M86 146h40" className={base} strokeLinecap="round" />
    </svg>
  );
}

/* Wachstumsprozesse: Anfragen laufen durch feste Stufen – erfasst, bewertet, übergeben.
   Bewusst keine steigenden Balken oder Kurven: die Grafik zeigt den Ablauf, kein Ergebnis. */
export function GrowthViz({ className = "" }: VizProps) {
  const columns = [
    { x: 14, t: "Neu", cards: 3 },
    { x: 154, t: "Bewertet", cards: 2 },
    { x: 294, t: "Übergeben", cards: 2 },
  ];
  return (
    <svg viewBox="0 0 440 170" className={className} aria-hidden focusable="false" fill="none" strokeWidth={1.4}>
      {columns.map((c, ci) => (
        <g key={c.t}>
          <text x={c.x + 4} y="20" className={label} stroke="none">
            {c.t}
          </text>
          <path d={`M${c.x} 30h126`} className={base} />
          {Array.from({ length: c.cards }).map((_, i) => {
            const y = 42 + i * 40;
            const highlighted = ci === 2 && i === 0;
            return (
              <g key={i}>
                <rect
                  x={c.x}
                  y={y}
                  width="126"
                  height="30"
                  rx="8"
                  className={highlighted ? `${accent} ${soft}` : `${base} ${soft}`}
                />
                <circle cx={c.x + 14} cy={y + 15} r="4" className={highlighted ? accentFill : base} stroke={highlighted ? "none" : undefined} />
                <path d={`M${c.x + 26} ${y + 15}h${46 + ((i + ci) % 2) * 22}`} className={base} strokeLinecap="round" />
              </g>
            );
          })}
        </g>
      ))}
      {/* Übergabe von Stufe zu Stufe */}
      <path d="M140 57h14M280 57h14" className={accent} strokeLinecap="round" />
    </svg>
  );
}
