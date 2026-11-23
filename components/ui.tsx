import type { ReactNode } from "react";
import { Check } from "lucide-react";

/* Gemeinsame UI-Bausteine – ein Designsystem für alle Seiten.
   Dunkle Flächen (night) für Kopf, Leistungen und Kontakt, helle Flächen (fog/weiß)
   zum Lesen. Radien nach Ebene: Flächen 18px, Bedienelemente 10px, Marken 6px. */

export const container = "mx-auto w-full max-w-[78rem] px-5 sm:px-8";

/* ---------------------------------------------------------------- Buttons */
const btnBase =
  "inline-flex items-center justify-center gap-2 rounded-[10px] text-center font-semibold leading-snug transition-colors duration-200 motion-reduce:transition-none";
const sizeMd = "min-h-12 px-6 py-3 text-[15.5px]";
const sizeLg = "min-h-14 px-7 py-3.5 text-[16.5px]";

/* Auf dunklem Grund: Cyan mit dunkler Schrift (≈ 9 : 1) bzw. heller Rahmen */
const signal = "bg-signal text-night hover:bg-signal-hover";
const ghostDark = "border border-white/25 text-white hover:border-white/60 hover:bg-white/5";
/* Auf hellem Grund: Navy mit weißer Schrift bzw. dunkler Rahmen */
const solid = "bg-night text-white hover:bg-night-3";
const ghostLight = "border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.03]";

export const btnSignal = `${btnBase} ${sizeMd} ${signal}`;
export const btnSignalLg = `${btnBase} ${sizeLg} ${signal}`;
export const btnGhostDark = `${btnBase} ${sizeMd} ${ghostDark}`;
export const btnGhostDarkLg = `${btnBase} ${sizeLg} ${ghostDark}`;
export const btnSolid = `${btnBase} ${sizeMd} ${solid}`;
export const btnSolidLg = `${btnBase} ${sizeLg} ${solid}`;
export const btnGhostLight = `${btnBase} ${sizeMd} ${ghostLight}`;

/* Ältere Namen (Demo, Formular, 404) */
export const btnPrimary = btnSolid;
export const btnPrimaryLg = btnSolidLg;
export const btnSecondary = btnGhostLight;
export const btnOnDark = btnSignal;

/* Textlinks */
export const textLink =
  "font-semibold text-signal-ink underline decoration-signal-ink/35 decoration-2 underline-offset-[5px] transition-colors hover:decoration-signal-ink";
export const textLinkDark =
  "font-semibold text-signal underline decoration-signal/40 decoration-2 underline-offset-[5px] transition-colors hover:decoration-signal";

/* Ganze Fläche anklickbar: Der Link trägt nur den Titel, seine Klickfläche liegt über
   dem Element (das dafür „relative" braucht). */
export const rowLink =
  "after:absolute after:inset-0 after:rounded-[inherit] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-[var(--focus-ring)]";

/* Gedankenstrich bleibt am Zeilenende */
export const keepDash = (s: string) => s.replace(/ – /g, " – ");

/* ------------------------------------------------------------ Typografie */
/* Skala nach Quarte (1,333): 17 · 22,7 · 30 · 40 · 53 */
export const h1Class =
  "text-[clamp(2rem,8.4vw,2.6rem)] leading-[1.06] tracking-[-0.022em] sm:text-[clamp(2.6rem,5.2vw,3.35rem)]";
export const h2Class = "text-[clamp(1.85rem,6vw,2.25rem)] leading-[1.1] sm:text-[2.5rem]";
export const h3Class = "text-[1.4rem] leading-[1.2]";
export const leadClass = "text-[1.125rem] leading-[1.65] sm:text-[1.2rem]";

/* --------------------------------------------------------------- Abschnitte */
type Tone = "night" | "fog" | "white";
const toneClass: Record<Tone, string> = {
  night: "on-dark bg-night text-haze",
  fog: "bg-fog",
  white: "bg-white",
};

export function Section({
  id,
  tone = "white",
  labelledBy,
  className = "",
  children,
}: {
  id?: string;
  tone?: Tone;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${toneClass[tone]} ${className}`}>
      <div className={`${container} py-20 lg:py-28`}>{children}</div>
    </section>
  );
}

/* Abschnittskopf: Überschrift und optionaler Einleitungstext – ohne Label darüber */
export function SectionHead({
  title,
  text,
  id,
  onDark = false,
  className = "",
  children,
}: {
  title: ReactNode;
  text?: ReactNode;
  id?: string;
  onDark?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`max-w-[44rem] ${className}`}>
      <h2 id={id} className={`${h2Class} ${onDark ? "text-white" : ""}`}>
        {typeof title === "string" ? keepDash(title) : title}
      </h2>
      {text && (
        <p className={`mt-5 ${leadClass} ${onDark ? "text-haze" : "text-muted"}`}>{text}</p>
      )}
      {children}
    </div>
  );
}

/* Abschnitt der Unterseiten: Überschrift links, Inhalt rechts */
export function SplitSection({
  id,
  headingId,
  title,
  text,
  extra,
  tone = "white",
  rule = false,
  children,
}: {
  id?: string;
  headingId?: string;
  title: string;
  text?: ReactNode;
  extra?: ReactNode;
  tone?: Tone;
  /** feine Linie oben, wenn zwei gleichfarbige Abschnitte aufeinanderfolgen */
  rule?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className={toneClass[tone]}>
      <div className={container}>
        <div
          className={`grid gap-x-16 gap-y-10 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-24 ${
            rule ? "border-t border-rule" : ""
          }`}
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id={headingId} className="text-[clamp(1.7rem,5.6vw,2rem)] leading-[1.12] sm:text-[2.15rem]">
              {keepDash(title)}
            </h2>
            {text && <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">{text}</p>}
            {extra && <div className="mt-6">{extra}</div>}
          </div>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  );
}

/* Abschnitt in Rasterbreite ohne Aufteilung (ältere Seiten) */
export function PlainSection({
  id,
  headingId,
  tone = "white",
  rule = true,
  children,
}: {
  id?: string;
  headingId?: string;
  tone?: Tone;
  rule?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className={toneClass[tone]}>
      <div className={container}>
        <div className={`py-20 lg:py-24 ${rule ? "border-t border-rule" : ""}`}>{children}</div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Listen */
/* Haken-Liste, auf Wunsch zweispaltig */
export function CheckList({
  items,
  columns = 1,
  onDark = false,
}: {
  items: string[];
  columns?: 1 | 2;
  onDark?: boolean;
}) {
  return (
    <ul className={`grid gap-x-10 ${columns === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`flex items-start gap-3 border-b py-3.5 text-[16.5px] leading-relaxed ${
            onDark ? "border-edge text-white/90" : "border-rule text-text"
          }`}
        >
          <Check
            size={18}
            strokeWidth={2.4}
            className={`mt-[5px] flex-none ${onDark ? "text-signal" : "text-signal-ink"}`}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
/* älterer Name */
export const CheckRows = CheckList;

/* Titel + Text untereinander, durch Linien getrennt */
export function DefRows({ items }: { items: Array<{ title: string; text: ReactNode }> }) {
  return (
    <ul className="border-t border-ink/80">
      {items.map((it) => (
        <li
          key={it.title}
          className="grid gap-x-8 gap-y-1 border-b border-rule py-5 sm:grid-cols-[14rem_minmax(0,1fr)] sm:items-baseline"
        >
          <h3 className="text-[1.2rem] leading-snug">{it.title}</h3>
          <p className="text-[16.5px] leading-relaxed text-muted">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

/* Nummerierte Abfolge – nur für echte Reihenfolgen */
export function NumberedColumns({
  items,
  columns = 4,
}: {
  items: Array<{ title: string; text: string }>;
  columns?: 3 | 4;
}) {
  return (
    <ol className={`grid gap-x-8 gap-y-10 sm:grid-cols-2 ${columns === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      {items.map((s, i) => (
        <li key={s.title} className="border-t border-ink/80 pt-6">
          <span className="wide tnum text-[1.05rem] font-semibold text-signal-ink">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-[1.25rem]">{s.title}</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* Hinweis in getönter Fläche (Datenschutz, Grenzen der KI) */
export function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-8 rounded-[18px] bg-signal-tint px-6 py-5 sm:px-7">
      <h3 className="text-[1.1rem] leading-snug">{title}</h3>
      <p className="mt-1.5 text-[16px] leading-relaxed text-text">{children}</p>
    </div>
  );
}
