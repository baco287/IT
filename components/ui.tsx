import type { ReactNode } from "react";
import Link from "next/link";
import { Check, Minus } from "lucide-react";

/* Gemeinsame UI-Bausteine – ein Design-System für alle Seiten.
   Grundsatz: Flächen in Weiß, Türkis und Dunkelblau, Listen mit Linien statt Karten,
   keine Schatten, keine Icon-Kacheln. */

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";

/* Innenabstand einer Spalte, die bis zum Bildschirmrand reicht, deren Inhalt aber
   bündig mit dem Seitenraster (max-w-7xl) abschließt – links bzw. rechts. */
export const bleedLeft = "lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]";
export const bleedRight = "lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]";

/* Buttons: eine Form für die ganze Seite – eckig mit kleinem Radius, keine Pillen. */
const btnShape =
  "inline-flex items-center justify-center gap-2 rounded-md text-center font-semibold leading-snug transition-colors duration-200";
const btnMd = "min-h-12 px-6 py-3 text-[15px]";
const btnLg = "min-h-14 px-8 py-3 text-[17px]";
const primaryColors = "bg-ink text-white hover:bg-[#163152]";
const secondaryColors = "border-2 border-ink text-ink hover:bg-ink hover:text-white";

/* Hauptaktion auf hellem Grund und auf Türkis: Deep Navy mit weißer Schrift */
export const btnPrimary = `${btnShape} ${btnMd} ${primaryColors}`;
export const btnPrimaryLg = `${btnShape} ${btnLg} ${primaryColors}`;

/* Zweitaktion auf hellem Grund: nur Rahmen */
export const btnSecondary = `${btnShape} ${btnMd} ${secondaryColors}`;
export const btnSecondaryLg = `${btnShape} ${btnLg} ${secondaryColors}`;

/* Hauptaktion auf dunkelblauem Grund: Electric Teal mit dunkelblauer Schrift (Kontrast ≈ 9,6 : 1) */
export const btnOnDark = `${btnShape} ${btnMd} bg-teal text-ink hover:bg-[#5ce3df]`;

/* Textlink mit türkiser Unterstreichung */
export const textLink =
  "font-semibold text-ink underline decoration-teal-dark decoration-2 underline-offset-[6px]";

/* Ganze Zeile anklickbar: Der Link selbst trägt nur den Titel (kurzer Name für
   Screenreader), seine Klickfläche und der Fokusrahmen liegen über der Zeile.
   Die Zeile braucht dafür „relative". */
export const rowLink =
  "after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-teal-text";

/* Gedankenstrich bleibt am Zeilenende: geschütztes Leerzeichen davor,
   damit keine Zeile mit „–" beginnt. */
export const keepDash = (s: string) => s.replace(/ – /g, " – ");

/* Einheitliche Größen für Abschnittsüberschriften */
export const h2Class =
  "text-[2rem] font-bold leading-[1.1] tracking-[-0.008em] sm:text-[2.6rem] lg:text-[3.1rem]";
/* etwas kleiner für die schmale linke Spalte von SplitSection */
export const h2Split =
  "text-[1.9rem] font-bold leading-[1.1] tracking-[-0.008em] sm:text-[2.3rem] lg:text-[2.6rem]";

/* Feine Linie über einem Abschnitt (in Rasterbreite) */
const sectionRule = "border-t border-ink/15";

/* Abschnittskopf: große Überschrift, optionaler Einleitungstext – bewusst ohne Mini-Label darüber */
export function SectionHead({
  title,
  text,
  onDark = false,
  className = "",
}: {
  title: ReactNode;
  text?: ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      <h2 className={`${h2Class} ${onDark ? "text-white" : ""}`}>
        {typeof title === "string" ? keepDash(title) : title}
      </h2>
      {text && (
        <p className={`mt-5 text-lg leading-relaxed ${onDark ? "text-white/70" : "text-muted"}`}>{text}</p>
      )}
    </div>
  );
}

/* Weißer Abschnitt in Rasterbreite, auf Wunsch mit feiner Linie darüber.
   Ohne Linie (rule={false}) direkt unter einem Seitenkopf oder einer farbigen Fläche. */
export function PlainSection({
  id,
  headingId,
  rule = true,
  children,
}: {
  id?: string;
  headingId?: string;
  rule?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="bg-white">
      <div className={container}>
        <div className={`py-16 lg:py-20 ${rule ? sectionRule : ""}`}>{children}</div>
      </div>
    </section>
  );
}

/* Abschnitt der Unterseiten: Überschrift links, Inhalt rechts */
export function SplitSection({
  id,
  headingId,
  title,
  text,
  extra,
  rule = true,
  children,
}: {
  id?: string;
  headingId?: string;
  title: string;
  text?: ReactNode;
  /* z. B. ein Link unter dem Einleitungstext */
  extra?: ReactNode;
  rule?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={headingId} className="bg-white">
      <div className={container}>
        <div
          className={`grid gap-x-14 gap-y-9 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20 ${rule ? sectionRule : ""}`}
        >
          {/* bleibt bei langen Listen rechts beim Scrollen stehen */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 id={headingId} className={h2Split}>
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

/* Zeilen aus Titel und Text (Vorteile, Grundsätze, Merkmale) */
export function DefRows({ items }: { items: Array<{ title: string; text: ReactNode }> }) {
  return (
    <ul className="border-t-2 border-ink">
      {items.map((it) => (
        <li
          key={it.title}
          className="grid gap-x-8 gap-y-1 border-b border-ink/15 py-5 sm:grid-cols-[13.5rem_minmax(0,1fr)] sm:items-baseline"
        >
          <h3 className="text-[1.35rem] leading-snug">{it.title}</h3>
          <p className="text-[16px] leading-relaxed text-muted">{it.text}</p>
        </li>
      ))}
    </ul>
  );
}

/* Verlinkte Zeilen (Leistungen, Bereiche): Titel, ein Satz, rechts der Hinweis zum Weiterklicken */
export function LinkRows({
  items,
  label = "Ansehen",
}: {
  items: Array<{ title: string; text: string; href: string }>;
  label?: string;
}) {
  return (
    <ul className="border-t-2 border-ink">
      {items.map((it) => (
        <li key={it.title} className="border-b border-ink/15">
          <div className="relative -mx-3 grid gap-x-8 gap-y-2 px-3 py-5 transition-colors hover:bg-teal-tint sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
            <div>
              <h3 className="text-[1.45rem] leading-[1.15]">
                <Link href={it.href} className={rowLink}>
                  {it.title}
                </Link>
              </h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-muted">{it.text}</p>
            </div>
            <span aria-hidden className={`text-[15px] ${textLink}`}>
              {label}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* Aufzählung mit Haken und Linien (Leistungsumfang, Punkte) */
export function CheckRows({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  return (
    <ul className={`border-t-2 border-ink ${columns === 2 ? "sm:grid sm:grid-cols-2 sm:gap-x-10" : ""}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-b border-ink/15 py-3.5 text-[16px] leading-relaxed text-text"
        >
          <Check size={18} strokeWidth={2.6} className="mt-1 flex-none text-teal-dark" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  );
}

/* Nummerierte Abfolge als Spalten – nur für echte Reihenfolgen */
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
        <li key={s.title} className="relative border-t-2 border-ink pt-6">
          {/* türkiser Abschnitt der Linie als ruhiger Akzent */}
          <span className="absolute -top-0.5 left-0 h-0.5 w-12 bg-teal" aria-hidden />
          <span className="font-[family-name:var(--font-display)] text-[2.6rem] font-bold leading-none tracking-[-0.01em] text-ink tabular-nums">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-[1.3rem] font-bold">{s.title}</h3>
          <p className="mt-2 text-[16px] leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* Gegenüberstellung: links nüchtern die Ausgangslage, rechts auf Türkis das Ziel */
export function Compare({
  leftTitle,
  left,
  rightTitle,
  right,
}: {
  leftTitle: string;
  left: string[];
  rightTitle: string;
  right: string[];
}) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="border-t-2 border-ink py-7 md:pr-10">
        <h3 className="text-[1.45rem] leading-tight text-muted">{leftTitle}</h3>
        <ul className="mt-5 space-y-3.5">
          {left.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16.5px] leading-snug text-muted">
              <Minus size={18} strokeWidth={2.6} className="mt-0.5 flex-none" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-teal px-6 py-7 text-ink sm:px-9">
        <h3 className="text-[1.45rem] leading-tight">{rightTitle}</h3>
        <ul className="mt-5 space-y-3.5">
          {right.map((item) => (
            <li key={item} className="flex items-start gap-3 text-[16.5px] font-medium leading-snug">
              <Check size={18} strokeWidth={2.8} className="mt-0.5 flex-none" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
