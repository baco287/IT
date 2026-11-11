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
        <label htmlFor={id} className="text-[15px] font-semibold leading-snug text-ink">
          {label}
        </label>
        <div className="flex flex-none items-center rounded-lg border border-line bg-white focus-within:border-teal-dark">
          <input
            id={id}
            type="number"
            inputMode="decimal"
            min={min}
            max={max}
            step={step}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              const n = Number(e.target.value);
              if (e.target.value !== "" && Number.isFinite(n)) onChange(clamp(n, min, max));
            }}
            onBlur={() => setText(String(value))}
            aria-describedby={`${id}-hint`}
            className="w-[4.5rem] rounded-lg bg-transparent py-2 pl-3 pr-1 text-right text-[16px] font-semibold tabular-nums text-ink [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
 */
export default function SavingsCalculator() {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(45);
  const [share, setShare] = useState(30);

  const savedHours = Math.round(hours * WEEKS_PER_MONTH * (share / 100));
  const monthly = savedHours * rate;
  const yearly = monthly * 12;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[var(--shadow-card)]">
      <div className="grid md:grid-cols-[1.08fr_0.92fr]">
        <div className="p-6 sm:p-8">
          <h3 className="text-[1.35rem] font-bold">Einsparrechner</h3>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
            Tragen Sie Ihre eigenen Annahmen ein – alle Werte lassen sich frei ändern.
          </p>
          <div className="mt-7 space-y-7">
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

        <div className="flex flex-col bg-ink p-6 text-white sm:p-8">
          <p className="text-sm font-semibold text-teal">Ihr Szenario</p>
          <dl className="mt-5 flex-1 space-y-6">
            <div>
              <dt className="text-[15px] text-white/75">Potenziell eingesparte Stunden pro Monat</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-none tracking-[-0.02em]">
                <output htmlFor="calc-hours calc-share">ca. {number.format(savedHours)} Std.</output>
              </dd>
            </div>
            <div>
              <dt className="text-[15px] text-white/75">Rechnerisches Einsparpotenzial pro Monat</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-[2rem] font-bold leading-none tracking-[-0.02em]">
                <output htmlFor="calc-hours calc-rate calc-share">{euro.format(monthly)}</output>
              </dd>
            </div>
            <div className="border-t border-white/15 pt-6">
              <dt className="text-[15px] text-white/75">Rechnerisches Einsparpotenzial pro Jahr</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-[2.6rem] font-bold leading-none tracking-[-0.03em] text-teal">
                <output htmlFor="calc-hours calc-rate calc-share">{euro.format(yearly)}</output>
              </dd>
            </div>
          </dl>
          <div className="mt-7 text-[13px] leading-relaxed text-white/70">
            <p className="font-semibold text-white/85">Rechenweg</p>
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
        </div>
      </div>
      <p className="border-t border-line bg-soft px-6 py-4 text-[13px] leading-relaxed text-muted sm:px-8">
        Unverbindliches Szenario auf Basis Ihrer eigenen Annahmen – keine Zusage tatsächlicher
        Einsparungen. Kosten für Einrichtung und Betrieb der Automatisierung sind nicht
        berücksichtigt.
      </p>
    </div>
  );
}
