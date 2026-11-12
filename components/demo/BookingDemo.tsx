"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MessageCircle, UtensilsCrossed, Wrench } from "lucide-react";
import BookingWidget from "./BookingWidget";
import ChatAgent from "./ChatAgent";
import OwnerPanel from "./OwnerPanel";
import { demoFontVars } from "./fonts";
import { nowTime, seedBookings, type Booking, type ScenarioId } from "./data";

type ScenarioConfig = {
  id: ScenarioId;
  tabLabel: string;
  businessName: string;
  monogram: string;
  codePrefix: string;
  url: string;
  nav: string[];
  chatLabel: string;
  /* Farben, Radien und Schriften des Beispielbetriebs – Widget und Chat lesen sie als CSS-Variablen */
  vars: Record<string, string>;
  background: string;
};

const SCENARIOS: ScenarioConfig[] = [
  {
    id: "restaurant",
    tabLabel: "Restaurant",
    businessName: "Trattoria Bella Vista",
    monogram: "BV",
    codePrefix: "BV",
    url: "trattoria-bellavista-beispiel.de",
    nav: ["Speisekarte", "Weine", "Kontakt"],
    chatLabel: "Per Chat reservieren",
    vars: {
      "--d-page": "#1b1410",
      "--d-page-ink": "#f6efe3",
      "--d-page-muted": "rgba(246, 239, 227, 0.7)",
      "--d-accent": "#c9a45c",
      "--d-launch": "#c9a45c",
      "--d-launch-ink": "#1b1410",
      "--w-bg": "#fbf7ef",
      "--w-chip": "#fffdf9",
      "--w-soft": "#f2e9da",
      "--w-ink": "#2a1b14",
      "--w-muted": "#7b6657",
      "--w-line": "#e2d5bf",
      "--w-accent": "#8e2f21",
      "--w-accent-ink": "#fbf7ef",
      "--w-select": "#8e2f21",
      "--w-select-ink": "#fbf7ef",
      "--w-radius": "14px",
      "--w-radius-sm": "9px",
      "--w-font-head": "var(--font-playfair)",
      "--w-font-num": "var(--font-playfair)",
      "--w-font-body": "var(--font-karla)",
    },
    background:
      "radial-gradient(120% 80% at 88% 0%, rgba(201, 164, 92, 0.22), transparent 55%), radial-gradient(90% 70% at 0% 100%, rgba(142, 47, 33, 0.3), transparent 60%), repeating-linear-gradient(45deg, rgba(246, 239, 227, 0.022) 0 14px, transparent 14px 28px), repeating-linear-gradient(-45deg, rgba(246, 239, 227, 0.022) 0 14px, transparent 14px 28px), #1b1410",
  },
  {
    id: "werkstatt",
    tabLabel: "Kfz-Werkstatt",
    businessName: "Autoservice Weser",
    monogram: "AW",
    codePrefix: "AW",
    url: "autoservice-weser-beispiel.de",
    nav: ["Leistungen", "Über uns", "Kontakt"],
    chatLabel: "Per Chat buchen",
    vars: {
      "--d-page": "#0b1220",
      "--d-page-ink": "#f1f5f9",
      "--d-page-muted": "rgba(226, 232, 240, 0.72)",
      "--d-accent": "#f04438",
      "--d-launch": "#d92d20",
      "--d-launch-ink": "#ffffff",
      "--w-bg": "#ffffff",
      "--w-chip": "#ffffff",
      "--w-soft": "#f1f5f9",
      "--w-ink": "#0f172a",
      "--w-muted": "#55637a",
      "--w-line": "#d8e0ea",
      "--w-accent": "#d92d20",
      "--w-accent-ink": "#ffffff",
      "--w-select": "#0f172a",
      "--w-select-ink": "#ffffff",
      "--w-radius": "8px",
      "--w-radius-sm": "5px",
      "--w-font-head": "var(--font-barlow)",
      "--w-font-num": "var(--font-jbmono)",
      "--w-font-body": "var(--font-inter)",
    },
    background:
      "radial-gradient(70% 60% at 0% 100%, rgba(217, 45, 32, 0.22), transparent 60%), linear-gradient(rgba(148, 163, 184, 0.07) 1px, transparent 1px) 0 0 / 28px 28px, linear-gradient(90deg, rgba(148, 163, 184, 0.07) 1px, transparent 1px) 0 0 / 28px 28px, #0b1220",
  },
];

const exampleTag =
  "inline-flex rounded-full border border-white/15 px-2.5 py-1 text-[11px] text-[var(--d-page-muted)]";

/* Kopf und Einstieg der Trattoria: abendlich, Serifenschrift, Goldakzente */
function TrattoriaIntro() {
  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[var(--d-accent)]">
        Cucina italiana · seit 1987
      </p>
      <h3 className="demo-head mt-4 text-[2.15rem] font-medium leading-[1.08] text-[var(--d-page-ink)]">
        Ein Tisch an der Weser, <em className="text-[var(--d-accent)]">in dreißig Sekunden.</em>
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--d-page-muted)]">
        Hausgemachte Pasta, Pizza aus dem Holzofen und eine Weinkarte, die wir selbst gern trinken.
      </p>
      <div className="mt-6 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-[var(--d-accent)]/40" />
        <span className="h-1.5 w-1.5 rotate-45 bg-[var(--d-accent)]" />
        <span className="h-px flex-1 bg-[var(--d-accent)]/40" />
      </div>
      <dl className="mt-6 space-y-2.5 text-[13.5px]">
        <div className="flex items-baseline gap-3">
          <dt className="w-20 flex-none text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--d-accent)]">Adresse</dt>
          <dd className="text-[var(--d-page-muted)]">An der Schlachte, Bremen</dd>
        </div>
        <div className="flex items-baseline gap-3">
          <dt className="w-20 flex-none text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--d-accent)]">Geöffnet</dt>
          <dd className="text-[var(--d-page-muted)]">Di–So ab 17 Uhr · Montag Ruhetag</dd>
        </div>
      </dl>
      <p className={`${exampleTag} mt-6`}>Fiktiver Beispielbetrieb</p>
    </div>
  );
}

/* Kopf und Einstieg der Werkstatt: technisch, schmale Versalien, Signalrot */
function WerkstattIntro() {
  return (
    <div>
      <p className="demo-num text-[10.5px] font-bold uppercase tracking-[0.18em] text-[var(--d-accent)]">
        {"// Meisterbetrieb · alle Marken"}
      </p>
      <h3 className="demo-head mt-4 text-[2.9rem] font-bold uppercase leading-[0.94] tracking-wide text-white">
        Werkstatt-Termin. <span className="text-[var(--d-accent)]">Ohne Anruf.</span>
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--d-page-muted)]">
        Von HU/AU über Inspektion bis Reifenservice: freie Termine sehen und direkt buchen.
      </p>
      <div
        className="mt-6 h-2 w-28"
        aria-hidden
        style={{ background: "repeating-linear-gradient(-45deg, var(--d-accent) 0 8px, transparent 8px 16px)" }}
      />
      <dl className="demo-num mt-6 space-y-2 text-[12.5px]">
        <div className="flex items-baseline gap-3">
          <dt className="w-24 flex-none uppercase tracking-[0.14em] text-white/45">Standort</dt>
          <dd className="text-[var(--d-page-ink)]">Bremen-Walle</dd>
        </div>
        <div className="flex items-baseline gap-3">
          <dt className="w-24 flex-none uppercase tracking-[0.14em] text-white/45">Geöffnet</dt>
          <dd className="text-[var(--d-page-ink)]">Mo–Fr 7:30–17:00</dd>
        </div>
      </dl>
      <p className={`${exampleTag} mt-6`}>Fiktiver Beispielbetrieb</p>
    </div>
  );
}

export default function BookingDemo() {
  const [mounted, setMounted] = useState(false);
  const [scenarioId, setScenarioId] = useState<ScenarioId>("restaurant");
  const [chatOpen, setChatOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const nextId = useRef(1);

  useEffect(() => {
    setMounted(true);
    setBookings([...seedBookings("restaurant"), ...seedBookings("werkstatt")]);
  }, []);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const isRestaurant = scenarioId === "restaurant";
  const scenarioBookings = bookings
    .filter((b) => b.scenario === scenarioId)
    .slice()
    .reverse();

  function addBooking(source: "widget" | "chat") {
    return (b: { dayLabel: string; time: string; name: string; detail: string }) => {
      setBookings((list) => [
        ...list,
        {
          id: nextId.current++,
          scenario: scenarioId,
          source,
          createdAt: nowTime(),
          isNew: true,
          ...b,
        },
      ]);
    };
  }

  function switchScenario(id: ScenarioId) {
    setScenarioId(id);
    setChatOpen(false);
  }

  if (!mounted) {
    return (
      <div className="grid gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        <div className="h-[40rem] animate-pulse rounded-2xl border border-line bg-soft" aria-hidden />
        <div className="h-[40rem] animate-pulse rounded-2xl border border-line bg-soft" aria-hidden />
        <span className="sr-only">Demo wird geladen …</span>
      </div>
    );
  }

  return (
    <div>
      {/* Szenario-Umschalter */}
      <div className="inline-flex rounded-full border border-line bg-white p-1.5" role="tablist" aria-label="Beispielbetrieb wählen">
        {SCENARIOS.map((s) => {
          const active = s.id === scenarioId;
          const Icon = s.id === "restaurant" ? UtensilsCrossed : Wrench;
          return (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => switchScenario(s.id)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[15px] font-semibold transition-colors duration-200 ${
                active ? "bg-ink text-white" : "text-ink/70 hover:text-ink"
              }`}
            >
              <Icon size={17} strokeWidth={2} className={active ? "text-teal" : ""} aria-hidden />
              {s.tabLabel}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[1.5fr_0.8fr]">
        {/* Browser-Rahmen mit der Beispiel-Webseite */}
        <div className="min-w-0">
          <p className="mb-3 text-sm font-semibold text-muted">
            Was Ihre Gäste bzw. Kunden sehen – eingebaut in Ihre bestehende Webseite:
          </p>
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-[var(--shadow-card-hover)]">
            {/* Adresszeile */}
            <div className="flex items-center gap-3 border-b border-line bg-soft px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#f87171]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#34d399]" />
              </span>
              <span className="flex-1 truncate rounded-full border border-line bg-white px-3.5 py-1 text-[12.5px] text-muted">
                {scenario.url}
              </span>
            </div>

            {/* Beispielseite */}
            <div
              key={scenarioId}
              className={`@container demo-body relative min-h-[40rem] ${demoFontVars}`}
              style={{ ...scenario.vars, background: scenario.background } as CSSProperties}
            >
              {/* Kopfzeile der Beispielseite */}
              <div className="flex items-center justify-between gap-4 px-5 pt-5 @2xl:px-8 @2xl:pt-6">
                {isRestaurant ? (
                  <div className="leading-none">
                    <p className="text-[9.5px] font-semibold uppercase tracking-[0.34em] text-[var(--d-accent)]">Trattoria</p>
                    <p className="demo-head mt-1.5 text-[1.3rem] italic text-[var(--d-page-ink)]">Bella Vista</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5">
                    <span className="h-7 w-2 -skew-x-12 bg-[var(--d-accent)]" aria-hidden />
                    <p className="demo-head text-[1.35rem] font-bold uppercase leading-none tracking-wide text-white">
                      Autoservice <span className="text-[var(--d-accent)]">Weser</span>
                    </p>
                  </div>
                )}
                <nav aria-hidden className="hidden items-center gap-5 text-[12.5px] text-[var(--d-page-muted)] @lg:flex">
                  {scenario.nav.map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </nav>
              </div>

              <div className="grid gap-8 px-5 pb-28 pt-8 @2xl:grid-cols-[1fr_minmax(0,22rem)] @2xl:items-start @2xl:gap-9 @2xl:px-8 @2xl:pt-10">
                {isRestaurant ? <TrattoriaIntro /> : <WerkstattIntro />}
                <div className="mx-auto w-full max-w-[26rem]">
                  <BookingWidget
                    scenario={scenarioId}
                    businessName={scenario.businessName}
                    codePrefix={scenario.codePrefix}
                    onBook={addBooking("widget")}
                  />
                </div>
              </div>

              {/* KI-Chat als schwebendes Element der Beispielseite */}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 z-10 flex justify-end">
                {chatOpen ? (
                  <ChatAgent
                    scenario={scenarioId}
                    businessName={scenario.businessName}
                    monogram={scenario.monogram}
                    codePrefix={scenario.codePrefix}
                    onClose={() => setChatOpen(false)}
                    onBook={addBooking("chat")}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setChatOpen(true)}
                    className="pointer-events-auto inline-flex min-h-12 items-center gap-2.5 rounded-full bg-[var(--d-launch)] py-3 pl-4 pr-5 text-sm font-semibold text-[var(--d-launch-ink)] shadow-[0_14px_36px_-10px_rgba(0,0,0,0.7)] transition-opacity duration-200 hover:opacity-90"
                  >
                    <MessageCircle size={19} strokeWidth={2.1} aria-hidden />
                    {scenario.chatLabel}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Betreiberansicht */}
        <div className="min-w-0 lg:sticky lg:top-24">
          <p className="mb-3 text-sm font-semibold text-muted">
            Was Sie als Betrieb sehen – jede Demo-Buchung erscheint hier sofort:
          </p>
          <OwnerPanel businessName={scenario.businessName} bookings={scenarioBookings} />
        </div>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-muted">
        Alle Betriebe, Namen und Buchungen auf dieser Seite sind frei erfunden. Die Demo läuft
        vollständig in Ihrem Browser – es wird nichts gespeichert und keine echte Buchung ausgelöst.
      </p>
    </div>
  );
}
