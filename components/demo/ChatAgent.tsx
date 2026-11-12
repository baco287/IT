"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Send, X } from "lucide-react";
import {
  WORKSHOP_SERVICES,
  bookingCode,
  getDays,
  getTimes,
  type DayOption,
  type ScenarioId,
} from "./data";

type Card = {
  title: string;
  rows: Array<{ label: string; value: string }>;
  code?: string;
  confirmed?: boolean;
};
type Msg = { id: number; from: "agent" | "user"; text: string; card?: Card };
type Step = "service" | "day" | "persons" | "time" | "name" | "confirm" | "done";

/* Farben und Schriften kommen wie beim Widget als CSS-Variablen vom Beispielbetrieb. */
export default function ChatAgent({
  scenario,
  businessName,
  monogram,
  codePrefix,
  onClose,
  onBook,
}: {
  scenario: ScenarioId;
  businessName: string;
  monogram: string;
  codePrefix: string;
  onClose: () => void;
  onBook: (b: { dayLabel: string; time: string; name: string; detail: string }) => void;
}) {
  const isRestaurant = scenario === "restaurant";
  const days = getDays(scenario, 4);

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>(isRestaurant ? "day" : "service");
  const [service, setService] = useState<string | null>(null);
  const [day, setDay] = useState<DayOption | null>(null);
  const [persons, setPersons] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const nextId = useRef(1);

  function agentSay(text: string, nextStep?: Step, card?: Card) {
    setTyping(true);
    const t = setTimeout(() => {
      setMessages((m) => [...m, { id: nextId.current++, from: "agent", text, card }]);
      setTyping(false);
      if (nextStep) setStep(nextStep);
    }, 750);
    timers.current.push(t);
  }

  function userSay(text: string) {
    setMessages((m) => [...m, { id: nextId.current++, from: "user", text }]);
  }

  /* Begrüßung beim Öffnen */
  useEffect(() => {
    agentSay(
      isRestaurant
        ? `Buonasera! Ich bin der KI-Assistent der ${businessName}. Für wann darf ich Ihnen einen Tisch reservieren?`
        : `Guten Tag! Ich bin der KI-Assistent von ${businessName}. Womit können wir Ihnen helfen?`,
    );
    const saved = timers.current;
    return () => saved.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Namensfeld fokussieren, ohne dass die ganze Seite dorthin springt */
  useEffect(() => {
    if (step === "name" && !typing) nameRef.current?.focus({ preventScroll: true });
  }, [step, typing]);

  /* Immer ans Ende scrollen */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, step]);

  const serviceLabel = WORKSHOP_SERVICES.find((s) => s.id === service)?.label ?? "";
  const freeTimes = day ? getTimes(scenario, day).filter((t) => !t.taken).slice(0, 6) : [];

  function summaryRows(n: string) {
    return isRestaurant
      ? [
          { label: "Datum", value: day?.label ?? "" },
          { label: "Uhrzeit", value: `${time} Uhr` },
          { label: "Gäste", value: String(persons) },
          { label: "Name", value: n },
        ]
      : [
          { label: "Service", value: serviceLabel },
          { label: "Datum", value: day?.label ?? "" },
          { label: "Uhrzeit", value: `${time} Uhr` },
          { label: "Name", value: n },
        ];
  }

  function pickService(id: string, label: string) {
    setService(id);
    userSay(label);
    agentSay("Sehr gern. An welchem Tag passt es Ihnen?", "day");
  }

  function pickDay(d: DayOption) {
    setDay(d);
    userSay(d.label);
    if (isRestaurant) {
      agentSay("Für wie viele Personen darf ich reservieren?", "persons");
    } else if (getTimes(scenario, d).some((t) => !t.taken)) {
      agentSay(`Am ${d.label} habe ich noch diese Zeiten frei. Welche passt Ihnen?`, "time");
    } else {
      agentSay(`Am ${d.label} ist leider nichts mehr frei. Darf es ein anderer Tag sein?`, "day");
    }
  }

  function pickPersons(n: number) {
    setPersons(n);
    userSay(`${n} Personen`);
    if (day && getTimes(scenario, day).some((t) => !t.taken)) {
      agentSay(`Sehr schön. Am ${day.label} sind diese Zeiten noch frei:`, "time");
    } else {
      agentSay(`Am ${day?.label} ist leider nichts mehr frei. Darf es ein anderer Tag sein?`, "day");
    }
  }

  function pickTime(t: string) {
    setTime(t);
    userSay(`${t} Uhr`);
    agentSay("Notiert! Auf welchen Namen darf ich die Buchung eintragen?", "name");
  }

  function submitName() {
    const n = name.trim();
    if (n.length < 2) return;
    userSay(n);
    setName(n);
    agentSay(
      isRestaurant
        ? "Ich fasse kurz zusammen. Darf ich so verbindlich reservieren?"
        : "Ich fasse kurz zusammen. Darf ich den Termin so eintragen?",
      "confirm",
      { title: "Ihre Angaben", rows: summaryRows(n) },
    );
  }

  function confirm() {
    userSay("Ja, verbindlich buchen");
    if (day && time) {
      onBook({
        dayLabel: day.label,
        time,
        name: name.trim(),
        detail: isRestaurant ? `${persons} Personen` : serviceLabel,
      });
    }
    const until = day?.label === "Heute" ? "später" : day?.label === "Morgen" ? "morgen" : day?.label;
    agentSay(
      `Vielen Dank! Die Bestätigung kommt per E-Mail, am Vortag erinnere ich Sie. Bis ${until}!`,
      "done",
      {
        title: isRestaurant ? "Reservierung bestätigt" : "Termin bestätigt",
        rows: summaryRows(name.trim()),
        code: bookingCode(codePrefix),
        confirmed: true,
      },
    );
  }

  function restart() {
    setService(null);
    setDay(null);
    setPersons(null);
    setTime(null);
    setName("");
    userSay("Von vorn beginnen");
    agentSay(
      isRestaurant ? "Gern. Für wann darf ich Ihnen einen Tisch reservieren?" : "Gern. Welchen Service benötigen Sie?",
      isRestaurant ? "day" : "service",
    );
  }

  const chipClass =
    "min-h-11 rounded-full border border-[var(--w-line)] bg-[var(--w-chip)] px-4 text-[13.5px] font-medium text-[var(--w-ink)] transition-colors duration-200 hover:border-[var(--w-accent)] hover:text-[var(--w-accent)]";
  const headUpper = isRestaurant ? "" : "uppercase tracking-wide";

  const avatar = (
    <span
      aria-hidden
      className="demo-head grid h-6 w-6 flex-none place-items-center rounded-full bg-[var(--d-page)] text-[9px] font-bold text-[var(--d-accent)]"
    >
      {monogram}
    </span>
  );

  return (
    <div
      className="demo-in demo-body pointer-events-auto flex h-[31rem] w-full max-w-[23.5rem] flex-col overflow-hidden rounded-[18px] bg-[var(--w-soft)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)] ring-1 ring-white/10"
      role="dialog"
      aria-label={`Chat-Assistent von ${businessName}`}
    >
      {/* Kopfzeile */}
      <div className="flex items-center gap-3 bg-[var(--d-page)] py-3 pl-4 pr-2 text-[var(--d-page-ink)]">
        <span className="demo-head grid h-10 w-10 flex-none place-items-center rounded-full border border-[var(--d-accent)] text-[13px] font-bold text-[var(--d-accent)]">
          {monogram}
        </span>
        <div className="min-w-0 flex-1">
          <p className={`demo-head truncate text-[16px] font-semibold leading-tight ${headUpper}`}>{businessName}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-[var(--d-page-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            KI-Assistent · antwortet sofort
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Chat schließen"
          className="grid h-11 w-11 flex-none place-items-center rounded-full text-[var(--d-page-muted)] transition-colors duration-200 hover:bg-white/10 hover:text-[var(--d-page-ink)]"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      {/* Verlauf */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4" aria-live="polite">
        {messages.map((m) =>
          m.from === "user" ? (
            <div key={m.id} className="demo-in flex justify-end">
              <p className="max-w-[80%] rounded-2xl rounded-br-md bg-[var(--w-select)] px-3.5 py-2 text-[14px] leading-snug text-[var(--w-select-ink)]">
                {m.text}
              </p>
            </div>
          ) : (
            <div key={m.id} className="demo-in flex items-end gap-2">
              {avatar}
              <div className="min-w-0 max-w-[84%]">
                <p className="rounded-2xl rounded-bl-md border border-[var(--w-line)] bg-[var(--w-chip)] px-3.5 py-2 text-[14px] leading-snug text-[var(--w-ink)]">
                  {m.text}
                </p>
                {m.card && (
                  <div className="mt-2 overflow-hidden rounded-[var(--w-radius-sm)] border border-[var(--w-line)] bg-[var(--w-bg)]">
                    <div
                      className={`flex items-center justify-between gap-2 px-3.5 py-2 text-[10.5px] font-bold uppercase tracking-[0.14em] ${
                        m.card.confirmed
                          ? "bg-[var(--w-accent)] text-[var(--w-accent-ink)]"
                          : "bg-[var(--w-soft)] text-[var(--w-muted)]"
                      }`}
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {m.card.confirmed && <Check size={13} strokeWidth={3} aria-hidden />}
                        {m.card.title}
                      </span>
                      {m.card.code && <span className="demo-num tracking-wider">{m.card.code}</span>}
                    </div>
                    <dl className="grid grid-cols-2 gap-x-3 gap-y-2.5 px-3.5 py-3">
                      {m.card.rows.map((r) => (
                        <div key={r.label} className="min-w-0">
                          <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--w-muted)]">
                            {r.label}
                          </dt>
                          <dd className="demo-num mt-0.5 truncate text-[14px] font-semibold text-[var(--w-ink)]">
                            {r.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </div>
          ),
        )}
        {typing && (
          <div className="flex items-end gap-2">
            {avatar}
            <span
              className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md border border-[var(--w-line)] bg-[var(--w-chip)] px-3.5 py-3"
              role="status"
              aria-label="Assistent schreibt"
            >
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--w-muted)] [animation-delay:0ms]" aria-hidden />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--w-muted)] [animation-delay:150ms]" aria-hidden />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--w-muted)] [animation-delay:300ms]" aria-hidden />
            </span>
          </div>
        )}
      </div>

      {/* Eingabebereich */}
      <div className="border-t border-[var(--w-line)] bg-[var(--w-bg)] px-3 py-3">
        {typing ? (
          <p className="flex min-h-11 items-center px-1 text-[12.5px] text-[var(--w-muted)]">Einen Moment …</p>
        ) : step === "service" ? (
          <div className="flex flex-wrap gap-1.5">
            {WORKSHOP_SERVICES.map((s) => (
              <button key={s.id} type="button" className={chipClass} onClick={() => pickService(s.id, s.label)}>
                {s.label}
              </button>
            ))}
          </div>
        ) : step === "day" ? (
          <div className="flex flex-wrap gap-1.5">
            {days.map((d) => (
              <button key={d.iso} type="button" className={chipClass} onClick={() => pickDay(d)}>
                {d.label}
              </button>
            ))}
          </div>
        ) : step === "persons" ? (
          <div className="flex flex-wrap gap-1.5">
            {[2, 3, 4, 6].map((n) => (
              <button key={n} type="button" className={chipClass} onClick={() => pickPersons(n)}>
                {n} Personen
              </button>
            ))}
          </div>
        ) : step === "time" ? (
          <div className="flex flex-wrap gap-1.5">
            {freeTimes.map((t) => (
              <button key={t.time} type="button" className={`${chipClass} demo-num`} onClick={() => pickTime(t.time)}>
                {t.time}
              </button>
            ))}
          </div>
        ) : step === "name" ? (
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              submitName();
            }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ihr Name …"
              ref={nameRef}
              autoComplete="off"
              aria-label="Ihr Name"
              className="min-h-11 min-w-0 flex-1 rounded-full border border-[var(--w-line)] bg-[var(--w-chip)] px-4 text-base text-[var(--w-ink)] transition-colors duration-200 placeholder:text-[var(--w-muted)]/60 focus-visible:border-[var(--w-accent)]"
            />
            <button
              type="submit"
              disabled={name.trim().length < 2}
              aria-label="Name senden"
              className="grid h-11 w-11 flex-none place-items-center rounded-full bg-[var(--w-accent)] text-[var(--w-accent-ink)] transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={16} strokeWidth={2.2} aria-hidden />
            </button>
          </form>
        ) : step === "confirm" ? (
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              className="min-h-11 rounded-full bg-[var(--w-accent)] px-5 text-[13.5px] font-semibold text-[var(--w-accent-ink)] transition-opacity duration-200 hover:opacity-90"
              onClick={confirm}
            >
              Ja, verbindlich buchen
            </button>
            <button type="button" className={chipClass} onClick={restart}>
              Von vorn beginnen
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            <button type="button" className={chipClass} onClick={restart}>
              Neue Anfrage starten
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
