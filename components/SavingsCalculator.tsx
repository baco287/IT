"use client";

import { useEffect, useState, type CSSProperties } from "react";

const WEEKS_PER_MONTH = 4.33; // 52 Wochen / 12 Monate
const NB = "\u00a0"; // geschütztes Leerzeichen zwischen Zahl und Einheit

const number = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 });
const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function Field({
  id,
  label,
  hint,
  unit,
  value,
  min,
  max,
  step,
  onChange,
}: {
  id: string;
  label: string;
  hint: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  // Eigener Textzustand, damit das Feld beim Tippen kurz leer sein darf
  const [text, setText] = useState(String(value));
  useEffect(() => setText(String(value)), [value]);

  const fill = ((value - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <label htmlFor={id} className="min-w-0 text-[15px] font-semibold leading-snug text-ink [hyphens:auto]">
          {label}
        </label>
        <div className="flex flex-none items-center rounded-md border border-ink/30 bg-white focus-within:border-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-teal-text">
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const n = Number(e.target.value);
              // Nur Werte im erlaubten Bereich sofort übernehmen. Sonst würde z. B. die „6“
              // von „60“ auf den Mindestwert gezogen und das Feld mitten im Tippen überschrieben.
              if (e.target.value !== "" && Number.isFinite(n) && n >= min && n <= max) onChange(n);
            }}
            onBlur={() => {
              const n = Number(text);
              const next = text !== "" && Number.isFinite(n) ? clamp(n, min, max) : value;
              if (next !== value) onChange(next);
              setText(String(next));
            }}
            aria-describedby={`${id}-hint`}
            className="w-[4.5rem] rounded-md bg-transparent py-2 pl-3 pr-1 text-right text-[16px] font-semibold tabular-nums text-ink [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="pr-3 text-[15px] font-medium text-muted" aria-hidden>
            {unit}
          </span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} (Schieberegler)`}
        className="range mt-1"
        style={{ "--fill": `${fill}%` } as CSSProperties}
      />
      <p id={`${id}-hint`} className="text-[13px] leading-relaxed text-muted">
        {hint}
      </p>
    </div>
  );
}

/**
 * Einsparrechner: rechnet ausschließlich mit den Annahmen des Besuchers.
 * Rechenweg: Stunden/Woche × 4,33 Wochen × Anteil = Stunden/Monat (gerundet),
 * × Stundenkostensatz = Monat, × 12 = Jahr.
 *
 * Aufbau wie der Seitenkopf der Startseite: über die volle Breite zweigeteilt,
 * links die Eingaben (bündig mit dem Seitenraster), rechts auf Türkis das Ergebnis.
 */
export default function SavingsCalculator() {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(45);
  const [share, setShare] = useState(30);

  const savedHours = Math.round(hours * WEEKS_PER_MONTH * (share / 100));
  const monthly = savedHours * rate;
  const yearly = monthly * 12;

  const row = "flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/25 py-4";
  const figure = "font-[family-name:var(--font-display)] font-bold leading-none tracking-[-0.01em] tabular-nums";

  return (
    <div className="mt-14 grid lg:mt-20 lg:grid-cols-2">
      <div className="px-5 pb-14 sm:px-8 lg:py-16 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-14">
        <h3 className="text-[1.6rem] leading-tight">Einsparrechner</h3>
        <p className="mt-2 max-w-[34rem] text-[16px] leading-relaxed text-muted">
          Tragen Sie Ihre eigenen Annahmen ein – alle Werte lassen sich frei ändern.
        </p>
        <div className="mt-8 max-w-[34rem] space-y-7">
          <Field
            id="calc-hours"
            label="Manuelle Arbeit pro Woche"
            hint="Stunden für wiederkehrende Routineaufgaben, im gesamten Team."
            unit="Std."
            value={hours}
            min={1}
            max={200}
            step={1}
            onChange={setHours}
          />
          <Field
            id="calc-rate"
            label="Interner Stundenkostensatz"
            hint="Durchschnittliche Kosten einer Arbeitsstunde in Ihrem Unternehmen."
            unit="€"
            value={rate}
            min={10}
            max={200}
            step={1}
            onChange={setRate}
          />
          <Field
            id="calc-share"
            label="Automatisierbarer Anteil"
            hint="Ihre Schätzung, welcher Teil dieser Arbeit sich automatisieren lässt."
            unit="%"
            value={share}
            min={5}
            max={80}
            step={5}
            onChange={setShare}
          />
        </div>
      </div>

      <div className="bg-teal px-5 py-12 text-ink sm:px-8 lg:py-16 lg:pl-14 lg:pr-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <div className="max-w-[34rem]">
          <p className="font-[family-name:var(--font-display)] text-[1.6rem] font-bold leading-tight">Ihr Szenario</p>
          <dl className="mt-5 border-t-2 border-ink">
            <div className={row}>
              <dt className="text-[15px]">Potenziell eingesparte Stunden pro Monat</dt>
              <dd className={`${figure} text-[1.9rem]`}>
                <output htmlFor="calc-hours calc-share">ca. {number.format(savedHours)} Std.</output>
              </dd>
            </div>
            <div className={row}>
              <dt className="text-[15px]">Rechnerisches Einsparpotenzial pro Monat</dt>
              <dd className={`${figure} text-[1.9rem]`}>
                <output htmlFor="calc-hours calc-rate calc-share">{euro.format(monthly)}</output>
              </dd>
            </div>
            <div className="pt-5">
              <dt className="text-[15px]">Rechnerisches Einsparpotenzial pro Jahr</dt>
              <dd className={`${figure} mt-2 text-[clamp(3.2rem,15vw,5.5rem)]`}>
                <output htmlFor="calc-hours calc-rate calc-share">{euro.format(yearly)}</output>
              </dd>
            </div>
          </dl>

          <div className="mt-8 text-[14px] leading-relaxed">
            <p className="font-semibold">Rechenweg</p>
            <ul className="mt-1 space-y-0.5 tabular-nums">
              <li>
                {number.format(hours)}{NB}Std. × 4,33{NB}Wochen × {number.format(share)}{NB}% ≈{" "}
                {number.format(savedHours)}{NB}Std.
              </li>
              <li>
                {number.format(savedHours)}{NB}Std. × {number.format(rate)}{NB}€ = {euro.format(monthly)} pro
                Monat
              </li>
              <li>
                {euro.format(monthly)} × 12 = {euro.format(yearly)} pro Jahr
              </li>
            </ul>
          </div>

          <p className="mt-6 border-t border-ink/25 pt-4 text-[14px] leading-relaxed">
            Unverbindliches Szenario auf Basis Ihrer eigenen Annahmen – keine Zusage tatsächlicher
            Einsparungen. Kosten für Einrichtung und Betrieb der Automatisierung sind nicht
            berücksichtigt.
          </p>
        </div>
      </div>
    </div>
  );
}
