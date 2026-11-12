/* Daten und Logik der Buchungs-Demo – alles fiktiv, nichts wird gespeichert. */

export type ScenarioId = "restaurant" | "werkstatt";

export type DayOption = {
  iso: string;
  label: string; // für Sätze: „Heute", „Morgen" oder „Sa., 14.11."
  offset: number;
  weekday: string; // „Sa"
  day: string; // „14"
  month: string; // „Nov"
  tag: string | null; // „Heute" / „Morgen"
};

export type Booking = {
  id: number;
  scenario: ScenarioId;
  source: "widget" | "chat";
  dayLabel: string;
  time: string;
  name: string;
  detail: string;
  createdAt: string;
  isNew?: boolean;
};

export type WorkshopService = { id: string; label: string; duration: string };

export const WORKSHOP_SERVICES: WorkshopService[] = [
  { id: "hu", label: "HU/AU (TÜV)", duration: "ca. 45 Min." },
  { id: "inspektion", label: "Inspektion", duration: "ca. 2 Std." },
  { id: "reifen", label: "Reifenwechsel", duration: "ca. 30 Min." },
  { id: "bremsen", label: "Bremsen-Check", duration: "ca. 1 Std." },
  { id: "klima", label: "Klimaservice", duration: "ca. 1 Std." },
];

const RESTAURANT_TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
const WORKSHOP_TIMES = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

/* Deterministischer Pseudozufall, damit belegte Zeiten stabil bleiben. */
function hashFraction(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967296;
}

export function isTaken(iso: string, time: string, scenario: ScenarioId): boolean {
  return hashFraction(`${scenario}:${iso}T${time}`) < 0.3;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function getDays(scenario: ScenarioId, count = 6): DayOption[] {
  const days: DayOption[] = [];
  const fmt = new Intl.DateTimeFormat("de-DE", { weekday: "short", day: "2-digit", month: "2-digit" });
  const weekdayFmt = new Intl.DateTimeFormat("de-DE", { weekday: "short" });
  const monthFmt = new Intl.DateTimeFormat("de-DE", { month: "short" });
  for (let offset = 0; days.length < count && offset < 21; offset++) {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    const weekday = d.getDay();
    if (scenario === "restaurant" && weekday === 1) continue; // Ruhetag Montag
    if (scenario === "werkstatt" && (weekday === 0 || weekday === 6)) continue; // Wochenende
    const iso = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const tag = offset === 0 ? "Heute" : offset === 1 ? "Morgen" : null;
    days.push({
      iso,
      label: tag ?? fmt.format(d),
      offset,
      weekday: weekdayFmt.format(d).replace(".", ""),
      day: String(d.getDate()),
      month: monthFmt.format(d).replace(".", ""),
      tag,
    });
  }
  return days;
}

export function getTimes(scenario: ScenarioId, day: DayOption): Array<{ time: string; taken: boolean }> {
  const base = scenario === "restaurant" ? RESTAURANT_TIMES : WORKSHOP_TIMES;
  const now = new Date();
  return base
    .filter((t) => {
      if (day.offset !== 0) return true;
      const [h, m] = t.split(":").map(Number);
      const slot = new Date();
      slot.setHours(h, m, 0, 0);
      return slot.getTime() > now.getTime() + 60 * 60 * 1000;
    })
    .map((time) => ({ time, taken: isTaken(day.iso, time, scenario) }));
}

/* Erfundener Buchungscode für Ticket und Auftragsbestätigung. */
export function bookingCode(prefix: string): string {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
}

export function nowTime(): string {
  return new Date().toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
}

/* Vorbelegte Beispiel-Buchungen, damit die Betreiberansicht nicht leer wirkt. */
export function seedBookings(scenario: ScenarioId): Booking[] {
  if (scenario === "restaurant") {
    return [
      {
        id: -1,
        scenario,
        source: "widget",
        dayLabel: "Heute",
        time: "19:30",
        name: "Familie Ahrens",
        detail: "4 Personen · Fensterplatz gewünscht",
        createdAt: "09:12",
      },
      {
        id: -2,
        scenario,
        source: "chat",
        dayLabel: "Morgen",
        time: "18:00",
        name: "Herr Kowalski",
        detail: "2 Personen",
        createdAt: "11:47",
      },
    ];
  }
  return [
    {
      id: -3,
      scenario,
      source: "chat",
      dayLabel: "Morgen",
      time: "08:00",
      name: "Frau Tekin",
      detail: "HU/AU (TÜV) · HB-TK 482",
      createdAt: "08:35",
    },
    {
      id: -4,
      scenario,
      source: "widget",
      dayLabel: "Heute",
      time: "14:00",
      name: "Herr Brinkmann",
      detail: "Reifenwechsel · HB-LM 77",
      createdAt: "10:20",
    },
  ];
}
