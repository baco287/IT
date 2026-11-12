"use client";

import { Bot, CalendarDays, Inbox, MousePointerClick } from "lucide-react";
import type { Booking } from "./data";

/* Betreiberansicht: so sieht der Betrieb eingehende Buchungen. */
export default function OwnerPanel({
  businessName,
  bookings,
}: {
  businessName: string;
  bookings: Booking[];
}) {
  const todayCount = bookings.filter((b) => b.dayLabel === "Heute").length;

  return (
    <aside className="overflow-hidden rounded-2xl border border-white/12 bg-ink text-white shadow-[var(--shadow-card-hover)]">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-white/8 text-teal">
            <Inbox size={19} strokeWidth={1.9} aria-hidden />
          </span>
          <div>
            <p className="text-[15px] font-bold">Ihre Betreiberansicht</p>
            <p className="text-[12px] text-white/55">{businessName}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-semibold text-teal">
          <span className="status-pulse h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
          live
        </span>
      </div>

      <div className="grid grid-cols-2 divide-x divide-white/10 border-b border-white/10">
        <div className="px-5 py-3.5">
          <p className="text-[12px] text-white/55">Buchungen heute</p>
          <p className="mt-0.5 text-xl font-bold">{todayCount}</p>
        </div>
        <div className="px-5 py-3.5">
          <p className="text-[12px] text-white/55">Offen insgesamt</p>
          <p className="mt-0.5 text-xl font-bold">{bookings.length}</p>
        </div>
      </div>

      <ul className="max-h-[22rem] divide-y divide-white/8 overflow-y-auto">
        {bookings.map((b) => (
          <li
            key={b.id}
            className={`flex items-start gap-3.5 px-5 py-3.5 ${b.isNew ? "bg-teal/8" : ""}`}
          >
            <span
              className={`mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg ${
                b.source === "chat" ? "bg-teal/15 text-teal" : "bg-white/8 text-white/70"
              }`}
              title={b.source === "chat" ? "Über den KI-Chat gebucht" : "Über das Buchungs-Widget gebucht"}
            >
              {b.source === "chat" ? (
                <Bot size={16} strokeWidth={2} aria-hidden />
              ) : (
                <MousePointerClick size={16} strokeWidth={2} aria-hidden />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-baseline gap-x-2 text-[14px] font-semibold">
                {b.name}
                {b.isNew && (
                  <span className="rounded-full bg-teal px-1.5 py-px text-[10px] font-bold text-ink">neu</span>
                )}
              </p>
              <p className="mt-0.5 text-[12.5px] text-white/60">{b.detail}</p>
              <p className="mt-1 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-white/80">
                <CalendarDays size={13} strokeWidth={2} className="text-teal" aria-hidden />
                {b.dayLabel}, {b.time} Uhr
              </p>
            </div>
            <span className="flex-none text-[11px] text-white/40">{b.createdAt}</span>
          </li>
        ))}
      </ul>

      <p className="border-t border-white/10 px-5 py-3.5 text-[12.5px] leading-relaxed text-white/55">
        Jede Buchung landet automatisch in Ihrem Kalender, der Gast erhält Bestätigung und
        Erinnerung – ganz ohne Telefon.
      </p>
    </aside>
  );
}
