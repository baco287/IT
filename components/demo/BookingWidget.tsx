"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDot,
  ClipboardCheck,
  Disc3,
  Loader2,
  Minus,
  Plus,
  Snowflake,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  WORKSHOP_SERVICES,
  bookingCode,
  getDays,
  getTimes,
  type DayOption,
  type ScenarioId,
} from "./data";

/* Farben, Radien und Schriften kommen als CSS-Variablen (--w-*, --d-*) vom
   umgebenden Beispielbetrieb – das Widget selbst kennt keine festen Farben. */

const SERVICE_ICONS: Record<string, LucideIcon> = {
  hu: ClipboardCheck,
  inspektion: Wrench,
  reifen: CircleDot,
  bremsen: Disc3,
  klima: Snowflake,
};

const eyebrow = "text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[var(--w-muted)]";

function option(selected: boolean, disabled = false) {
  return `min-h-11 rounded-[var(--w-radius-sm)] border transition-colors duration-200 ${
    disabled
      ? "cursor-not-allowed border-transparent bg-[var(--w-soft)] text-[var(--w-muted)]/55 line-through"
      : selected
        ? "border-[var(--w-select)] bg-[var(--w-select)] text-[var(--w-select-ink)]"
        : "border-[var(--w-line)] bg-[var(--w-chip)] text-[var(--w-ink)] hover:border-[var(--w-ink)]"
  }`;
}

/* Kennzeichen im Stil eines deutschen Nummernschilds */
export function LicensePlate({ value }: { value: string }) {
  return (
    <span className="inline-flex h-8 items-stretch overflow-hidden rounded-[5px] border-2 border-[#111] bg-white align-middle">
      <span
        aria-hidden
        className="flex w-4.5 flex-none items-end justify-center bg-[#003399] pb-0.5 text-[8px] font-bold leading-none text-white"
      >
        D
      </span>
      <span className="demo-num flex items-center px-2 text-[13px] font-bold tracking-[0.1em] text-[#111]">
        {value}
      </span>
    </span>
  );
}

export default function BookingWidget({
  scenario,
  businessName,
  codePrefix,
  onBook,
}: {
  scenario: ScenarioId;
  businessName: string;
  codePrefix: string;
  onBook: (b: { dayLabel: string; time: string; name: string; detail: string }) => void;
}) {
  const isRestaurant = scenario === "restaurant";
  const days = getDays(scenario);

  const [step, setStep] = useState(0);
  const [service, setService] = useState<string | null>(null);
  const [day, setDay] = useState<DayOption | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [persons, setPersons] = useState(2);
  const [name, setName] = useState("");
  const [plate, setPlate] = useState("");
  const [phase, setPhase] = useState<"form" | "sending" | "done">("form");
  const [code, setCode] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const serviceLabel = WORKSHOP_SERVICES.find((s) => s.id === service)?.label ?? "";
  const plateClean = plate.trim().toUpperCase();
  const steps = isRestaurant ? ["Datum", "Uhrzeit", "Kontakt"] : ["Service", "Termin", "Kontakt"];
  const headUpper = isRestaurant ? "" : "uppercase tracking-wide";

  const canNext =
    step === 0
      ? isRestaurant
        ? day !== null
        : service !== null
      : step === 1
        ? isRestaurant
          ? time !== null
          : day !== null && time !== null
        : name.trim().length >= 2;

  function reset() {
    setStep(0);
    setService(null);
    setDay(null);
    setTime(null);
    setPersons(2);
    setName("");
    setPlate("");
    setCode("");
    setPhase("form");
  }

  function submit() {
    if (!day || !time || phase !== "form") return;
    setPhase("sending");
    timer.current = setTimeout(() => {
      setCode(bookingCode(codePrefix));
      onBook({
        dayLabel: day.label,
        time,
        name: name.trim(),
        detail: isRestaurant
          ? `${persons} ${persons === 1 ? "Person" : "Personen"}`
          : `${serviceLabel}${plateClean ? ` · ${plateClean}` : ""}`,
      });
      setPhase("done");
    }, 800);
  }

  /* ---------------------------------------------------------------- */
  /* Bestätigung                                                       */
  /* ---------------------------------------------------------------- */
  if (phase === "done" && day && time) {
    if (isRestaurant) {
      return (
        <div className="demo-in demo-body relative rounded-[var(--w-radius)] bg-[var(--w-bg)] text-[var(--w-ink)] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.65)]">
          <div className="px-6 pb-5 pt-7 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[var(--w-accent)] text-[var(--w-accent-ink)]">
              <Check size={24} strokeWidth={2.4} aria-hidden />
            </span>
            <p className="demo-head mt-4 text-[1.55rem] leading-tight">Wir freuen uns auf Sie.</p>
            <p className="mt-1.5 text-sm text-[var(--w-muted)]">Ihre Reservierung ist bestätigt.</p>
          </div>

          {/* Perforation wie bei einem Ticket */}
          <div className="relative" aria-hidden>
            <span className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[var(--d-page)]" />
            <span className="absolute -right-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-[var(--d-page)]" />
            <div className="mx-5 border-t-2 border-dashed border-[var(--w-line)]" />
          </div>

          <dl className="grid grid-cols-3 gap-2 px-6 py-5 text-center">
            <div>
              <dt className={eyebrow}>Datum</dt>
              <dd className="demo-head mt-1 text-[1.1rem]">{day.label}</dd>
            </div>
            <div className="border-x border-[var(--w-line)]">
              <dt className={eyebrow}>Uhrzeit</dt>
              <dd className="demo-head mt-1 text-[1.1rem]">{time}</dd>
            </div>
            <div>
              <dt className={eyebrow}>Gäste</dt>
              <dd className="demo-head mt-1 text-[1.1rem]">{persons}</dd>
            </div>
          </dl>

          <div className="flex items-end justify-between gap-4 border-t border-[var(--w-line)] px-6 py-4">
            <div className="min-w-0">
              <p className={eyebrow}>Auf den Namen</p>
              <p className="mt-0.5 truncate text-[15px] font-semibold">{name.trim()}</p>
            </div>
            <div className="flex-none text-right">
              <p className={eyebrow}>Code</p>
              <p className="demo-head mt-0.5 text-[15px] font-semibold tracking-wider text-[var(--w-accent)]">{code}</p>
            </div>
          </div>

          <div className="px-6 pb-6">
            <p className="text-[12.5px] leading-relaxed text-[var(--w-muted)]">
              Die Bestätigung ist per E-Mail unterwegs. Am Vortag erinnern wir Sie automatisch.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 min-h-11 w-full rounded-full border border-[var(--w-ink)] text-sm font-semibold transition-colors duration-200 hover:bg-[var(--w-ink)] hover:text-[var(--w-bg)]"
            >
              Neue Buchung ausprobieren
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="demo-in demo-body overflow-hidden rounded-[var(--w-radius)] bg-[var(--w-bg)] text-[var(--w-ink)] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.65)]">
        <div className="flex items-center justify-between gap-3 bg-[var(--w-ink)] px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-emerald-500 text-white">
              <Check size={19} strokeWidth={2.6} aria-hidden />
            </span>
            <div>
              <p className="demo-head text-[1.15rem] font-bold uppercase leading-none tracking-wide">Termin bestätigt</p>
              <p className="mt-1 text-[12px] text-white/65">{businessName}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.16em] text-white/55">Auftrag</p>
            <p className="demo-num text-[13px] font-bold">{code}</p>
          </div>
        </div>

        <dl className="divide-y divide-[var(--w-line)] px-5">
          {[
            ["Service", serviceLabel],
            ["Termin", `${day.label}, ${time} Uhr`],
            ["Kunde", name.trim()],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 py-3">
              <dt className={eyebrow}>{label}</dt>
              <dd className="text-right text-[14px] font-semibold">{value}</dd>
            </div>
          ))}
          {plateClean && (
            <div className="flex items-center justify-between gap-4 py-3">
              <dt className={eyebrow}>Fahrzeug</dt>
              <dd>
                <LicensePlate value={plateClean} />
              </dd>
            </div>
          )}
        </dl>

        <div className="px-5 pb-5 pt-3">
          <p className="rounded-[var(--w-radius-sm)] bg-[var(--w-soft)] px-3.5 py-2.5 text-[12.5px] leading-relaxed text-[var(--w-muted)]">
            Bitte Fahrzeugschein und Schlüssel mitbringen. Bestätigung und Erinnerung kommen automatisch per E-Mail.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 min-h-11 w-full rounded-[var(--w-radius-sm)] border border-[var(--w-ink)] text-sm font-semibold transition-colors duration-200 hover:bg-[var(--w-ink)] hover:text-white"
          >
            Neue Buchung ausprobieren
          </button>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Bausteine des Formulars                                           */
  /* ---------------------------------------------------------------- */
  const dayTiles = (
    <div className="grid grid-cols-3 gap-2">
      {days.map((d) => {
        const selected = day?.iso === d.iso;
        const sub = selected ? "opacity-80" : "text-[var(--w-muted)]";
        return (
          <button
            key={d.iso}
            type="button"
            aria-pressed={selected}
            aria-label={d.label}
            onClick={() => {
              setDay(d);
              setTime(null);
            }}
            className={`${option(selected)} flex flex-col items-center px-1 py-2`}
          >
            <span className={`text-[10.5px] font-semibold uppercase tracking-wider ${sub}`}>{d.tag ?? d.weekday}</span>
            <span className="demo-num text-[1.35rem] font-semibold leading-tight">{d.day}</span>
            <span className={`text-[10.5px] ${sub}`}>{d.month}</span>
          </button>
        );
      })}
    </div>
  );

  function timeSlots(d: DayOption) {
    const all = getTimes(scenario, d);
    if (all.length === 0) {
      return (
        <p className="rounded-[var(--w-radius-sm)] bg-[var(--w-soft)] px-3.5 py-3 text-[13px] leading-relaxed text-[var(--w-muted)]">
          Für diesen Tag sind online keine Zeiten mehr frei. Bitte wählen Sie einen anderen Tag.
        </p>
      );
    }
    const split = isRestaurant ? "19:00" : "12:00";
    const groups = [
      { label: isRestaurant ? "Früher Abend" : "Vormittag", items: all.filter((t) => t.time < split) },
      { label: isRestaurant ? "Abend" : "Nachmittag", items: all.filter((t) => t.time >= split) },
    ].filter((g) => g.items.length > 0);
    return (
      <div className="space-y-3">
        {groups.map((g) => (
          <div key={g.label}>
            <p className={eyebrow}>{g.label}</p>
            <div className="mt-1.5 grid grid-cols-4 gap-1.5">
              {g.items.map((t) => (
                <button
                  key={t.time}
                  type="button"
                  disabled={t.taken}
                  aria-pressed={time === t.time}
                  aria-label={t.taken ? `${t.time} Uhr, belegt` : `${t.time} Uhr`}
                  onClick={() => setTime(t.time)}
                  className={`${option(time === t.time, t.taken)} demo-num text-[13.5px] font-medium`}
                >
                  {t.time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const summary = isRestaurant
    ? [
        { text: day?.label ?? "Datum", set: day !== null },
        { text: time ? `${time} Uhr` : "Uhrzeit", set: time !== null },
        { text: `${persons} ${persons === 1 ? "Gast" : "Gäste"}`, set: true },
      ]
    : [
        { text: serviceLabel || "Service", set: service !== null },
        { text: day?.label ?? "Datum", set: day !== null },
        { text: time ? `${time} Uhr` : "Uhrzeit", set: time !== null },
      ];

  const inputClass =
    "min-h-12 w-full rounded-[var(--w-radius-sm)] border border-[var(--w-line)] bg-[var(--w-chip)] px-3.5 text-base text-[var(--w-ink)] transition-colors duration-200 placeholder:text-[var(--w-muted)]/60 focus-visible:border-[var(--w-accent)]";

  /* ---------------------------------------------------------------- */
  /* Formular                                                          */
  /* ---------------------------------------------------------------- */
  return (
    <div className="demo-body overflow-hidden rounded-[var(--w-radius)] bg-[var(--w-bg)] text-[var(--w-ink)] shadow-[0_28px_70px_-24px_rgba(0,0,0,0.65)]">
      {!isRestaurant && <div className="h-1.5 bg-[var(--w-accent)]" aria-hidden />}
      <div
        className={
          isRestaurant ? "m-1.5 rounded-[10px] border border-[var(--w-line)] px-5 pb-5 pt-6" : "px-5 pb-5 pt-5"
        }
      >
        {/* Kopf */}
        {isRestaurant ? (
          <div className="text-center">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[var(--w-accent)]">Reservierung</p>
            <h4 className="demo-head mt-1.5 text-[1.6rem] leading-tight">Ihr Tisch bei uns</h4>
            <div className="mx-auto mt-3 flex w-28 items-center gap-2" aria-hidden>
              <span className="h-px flex-1 bg-[var(--w-line)]" />
              <span className="h-1.5 w-1.5 rotate-45 bg-[var(--w-accent)]" />
              <span className="h-px flex-1 bg-[var(--w-line)]" />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="demo-num text-[10.5px] font-bold uppercase tracking-[0.18em] text-[var(--w-accent)]">
                Online-Termin
              </p>
              <p className="inline-flex items-center gap-1.5 text-[11px] text-[var(--w-muted)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
                Kalender live
              </p>
            </div>
            <h4 className="demo-head mt-1.5 text-[1.7rem] font-bold uppercase leading-none tracking-wide">
              Termin buchen
            </h4>
          </div>
        )}

        {/* Schrittanzeige */}
        <ol className="mt-5 flex items-center" aria-label="Buchungsschritte">
          {steps.map((label, i) => (
            <li
              key={label}
              className={`flex items-center ${i < steps.length - 1 ? "flex-1" : ""}`}
              aria-current={i === step ? "step" : undefined}
            >
              <span
                className={`grid h-6 w-6 flex-none place-items-center rounded-full text-[11px] font-bold transition-colors duration-200 ${
                  i < step
                    ? "bg-[var(--w-accent)] text-[var(--w-accent-ink)]"
                    : i === step
                      ? "border-2 border-[var(--w-accent)] text-[var(--w-accent)]"
                      : "border border-[var(--w-line)] text-[var(--w-muted)]"
                }`}
              >
                {i < step ? <Check size={13} strokeWidth={3} aria-hidden /> : i + 1}
              </span>
              <span
                className={`ml-1.5 text-[12px] font-semibold ${
                  i === step ? "text-[var(--w-ink)]" : "text-[var(--w-muted)]"
                }`}
              >
                {label}
              </span>
              {i < steps.length - 1 && (
                <span
                  className={`mx-2 h-px flex-1 transition-colors duration-200 ${
                    i < step ? "bg-[var(--w-accent)]" : "bg-[var(--w-line)]"
                  }`}
                  aria-hidden
                />
              )}
            </li>
          ))}
        </ol>

        {/* Inhalt des aktuellen Schritts */}
        <div key={step} className="demo-in mt-5 min-h-[17.5rem]">
          {step === 0 && isRestaurant && (
            <div className="space-y-4">
              <div>
                <p className={`${eyebrow} mb-2`}>Wann möchten Sie kommen?</p>
                {dayTiles}
              </div>
              <div className="flex items-center justify-between gap-3 rounded-[var(--w-radius-sm)] border border-[var(--w-line)] bg-[var(--w-chip)] py-1.5 pl-4 pr-1.5">
                <div>
                  <p className="text-[14px] font-semibold">Gäste</p>
                  <p className="text-[11.5px] text-[var(--w-muted)]">
                    {persons >= 9 ? "Große Runde – wir stellen Tische zusammen" : "Montag ist Ruhetag"}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label="Ein Gast weniger"
                    disabled={persons <= 1}
                    onClick={() => setPersons(persons - 1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--w-line)] transition-colors duration-200 hover:border-[var(--w-ink)] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <Minus size={16} strokeWidth={2.2} aria-hidden />
                  </button>
                  <span className="demo-num w-9 text-center text-[1.5rem] font-semibold" aria-live="polite">
                    {persons}
                  </span>
                  <button
                    type="button"
                    aria-label="Ein Gast mehr"
                    disabled={persons >= 10}
                    onClick={() => setPersons(persons + 1)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--w-line)] transition-colors duration-200 hover:border-[var(--w-ink)] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <Plus size={16} strokeWidth={2.2} aria-hidden />
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 0 && !isRestaurant && (
            <div>
              <p className={`${eyebrow} mb-2`}>Was dürfen wir für Sie tun?</p>
              <div className="grid gap-1.5">
                {WORKSHOP_SERVICES.map((s) => {
                  const Icon = SERVICE_ICONS[s.id] ?? Wrench;
                  const selected = service === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setService(s.id)}
                      className={`${option(selected)} flex items-center gap-3 px-3 text-left`}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.9}
                        className={selected ? "" : "text-[var(--w-accent)]"}
                        aria-hidden
                      />
                      <span className="flex-1 text-[14px] font-semibold">{s.label}</span>
                      <span className={`demo-num text-[11.5px] ${selected ? "opacity-75" : "text-[var(--w-muted)]"}`}>
                        {s.duration}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 1 && isRestaurant && day && (
            <div>
              <p className="mb-3 text-[13.5px] text-[var(--w-muted)]">
                Freie Tische am <span className="font-semibold text-[var(--w-ink)]">{day.label}</span> für{" "}
                <span className="font-semibold text-[var(--w-ink)]">
                  {persons} {persons === 1 ? "Gast" : "Gäste"}
                </span>
              </p>
              {timeSlots(day)}
              <p className="mt-3 text-[11.5px] text-[var(--w-muted)]">Durchgestrichene Zeiten sind bereits vergeben.</p>
            </div>
          )}

          {step === 1 && !isRestaurant && (
            <div className="space-y-4">
              <div>
                <p className={`${eyebrow} mb-2`}>An welchem Tag?</p>
                {dayTiles}
              </div>
              {day && timeSlots(day)}
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-3.5">
              <label className="grid gap-1.5">
                <span className="text-[13px] font-semibold">Ihr Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="z. B. Petra Janssen"
                  autoComplete="off"
                  className={inputClass}
                />
              </label>
              {!isRestaurant && (
                <label className="grid gap-1.5">
                  <span className="text-[13px] font-semibold">
                    Kennzeichen <span className="font-normal text-[var(--w-muted)]">(optional)</span>
                  </span>
                  <span className="flex h-12 items-stretch overflow-hidden rounded-md border-2 border-[#111] bg-white focus-within:ring-2 focus-within:ring-[var(--w-accent)] focus-within:ring-offset-2">
                    <span
                      aria-hidden
                      className="flex w-7 flex-none items-end justify-center bg-[#003399] pb-1 text-[10px] font-bold leading-none text-white"
                    >
                      D
                    </span>
                    <input
                      type="text"
                      value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                      placeholder="HB AB 123"
                      autoComplete="off"
                      maxLength={11}
                      className="demo-num w-full min-w-0 bg-transparent px-3 text-lg font-bold uppercase tracking-[0.12em] text-[#111] placeholder:font-normal placeholder:text-black/25 focus-visible:outline-none"
                    />
                  </span>
                </label>
              )}
              <p className="text-[12px] leading-relaxed text-[var(--w-muted)]">
                Sie erhalten sofort eine Bestätigung und am Vortag eine Erinnerung.
              </p>
            </div>
          )}
        </div>

        {/* Ihre Auswahl */}
        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-dashed border-[var(--w-line)] pt-3 text-[12.5px]">
          {summary.map((s, i) => (
            <span key={i} className="inline-flex items-center gap-2">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-[var(--w-line)]" aria-hidden />}
              <span className={s.set ? "font-semibold text-[var(--w-ink)]" : "text-[var(--w-muted)]/70"}>{s.text}</span>
            </span>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-4 flex items-center gap-2">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={phase === "sending"}
              aria-label="Zurück"
              className={`grid h-12 w-12 flex-none place-items-center border border-[var(--w-line)] transition-colors duration-200 hover:border-[var(--w-ink)] ${
                isRestaurant ? "rounded-full" : "rounded-[var(--w-radius-sm)]"
              }`}
            >
              <ArrowLeft size={17} strokeWidth={2.2} aria-hidden />
            </button>
          )}
          <button
            type="button"
            disabled={!canNext || phase === "sending"}
            onClick={() => (step < 2 ? setStep(step + 1) : submit())}
            className={`inline-flex min-h-12 flex-1 items-center justify-center gap-2 bg-[var(--w-accent)] px-5 text-[15px] font-semibold text-[var(--w-accent-ink)] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${
              isRestaurant ? "rounded-full" : `rounded-[var(--w-radius-sm)] ${headUpper}`
            }`}
          >
            {phase === "sending" ? (
              <>
                <Loader2 size={17} strokeWidth={2.4} className="animate-spin" aria-hidden />
                Wird gebucht …
              </>
            ) : (
              <>
                {step < 2 ? "Weiter" : isRestaurant ? "Verbindlich reservieren" : "Termin buchen"}
                <ArrowRight size={17} strokeWidth={2.2} aria-hidden />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
