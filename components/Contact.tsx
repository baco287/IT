"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/company";
import { btnPrimaryLg, container } from "./ui";
import { sendForm } from "@/lib/form";

/* Freiwillige Angabe – sieben grobe Richtungen statt Selbstdiagnose aus zehn Leistungen */
const TOPICS = [
  "KI-Agent, Chatbot oder Telefon-KI",
  "Abläufe automatisieren",
  "Website oder Webanwendung",
  "Individuelle Software",
  "SEO und Marketing",
  "IT-Betreuung",
  "Noch offen, ich möchte mich beraten lassen",
];

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-[10px] border border-ink/55 bg-white px-4 py-3 text-[16px] text-text placeholder:text-muted transition-colors hover:border-ink focus:border-signal-ink aria-[invalid=true]:border-red-700";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errCls = "mt-1.5 text-sm text-red-700";

/**
 * Anfrageformular. Am Desktop links Überschrift und `aside` (z. B. Kontaktdaten), rechts das
 * Formular; am Handy steht das Formular direkt unter der Überschrift, `aside` folgt danach.
 */
export default function Contact({ aside }: { aside?: ReactNode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const successRef = useRef<HTMLDivElement>(null);

  // Nach dem Absenden den Fokus auf die Bestätigung setzen, damit sie vorgelesen wird
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = "Bitte geben Sie Ihren Namen an.";
    const email = String(data.get("email") ?? "").trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (!data.get("datenschutz"))
      next.datenschutz = "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.";
    if (String(data.get("_honey") ?? "")) return; // Spam-Schutz

    setErrors(next);
    const firstInvalid = ["name", "email", "datenschutz"].find((k) => next[k]);
    if (firstInvalid) {
      // Erstes fehlerhaftes Feld ansteuern und in die Bildmitte holen –
      // sonst wirkt der Button auf dem Handy wie tot. Erst nach dem Einblenden
      // der Fehlermeldungen, damit die Position stimmt.
      const field = form.elements.namedItem(firstInvalid) as HTMLElement | null;
      window.setTimeout(() => {
        field?.focus({ preventScroll: true });
        field?.scrollIntoView({ block: "center" });
      }, 0);
      return;
    }

    setStatus("sending");
    try {
      const topic = String(data.get("leistung") || "nicht angegeben");
      await sendForm("Neue QonteX-Anfrage: " + topic, {
        Name: String(data.get("name") ?? ""),
        Unternehmen: String(data.get("unternehmen") || "—"),
        "E-Mail": email,
        Telefon: String(data.get("telefon") || "—"),
        Thema: topic,
        Nachricht: String(data.get("nachricht") || "—"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" aria-labelledby="kontakt-heading" className="bg-white">
      <div
        className={`${container} grid gap-x-16 gap-y-10 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:grid-rows-[auto_1fr] lg:py-24`}
      >
        <div className="lg:col-start-1 lg:row-start-1">
          <h2 id="kontakt-heading" className="text-[clamp(1.7rem,5.6vw,2rem)] leading-[1.12] sm:text-[2.15rem]">
            Projekt anfragen
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
            Beschreiben Sie kurz Ihr Vorhaben oder den Ablauf, der Sie heute Zeit kostet. Wir melden
            uns mit einem Terminvorschlag für ein erstes Gespräch.
          </p>
        </div>
        {aside && <div className="lg:col-start-1 lg:row-start-2">{aside}</div>}
        <div className="row-start-2 min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
      {status === "success" ? (
        <div ref={successRef} tabIndex={-1} className="border-t border-ink/80 pt-7 outline-none" role="status">
          <Check size={30} strokeWidth={2.4} className="text-signal-ink" aria-hidden />
          <h3 className="mt-4 text-[1.6rem] leading-tight">Vielen Dank für Ihre Anfrage!</h3>
          <p className="mt-2 text-[17px] text-muted">Ihre Anfrage ist bei uns angekommen. Wir melden uns zeitnah bei Ihnen.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <p className="mb-4 text-sm text-muted">Felder mit * sind Pflichtfelder.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelCls}>
                Name *
              </label>
              <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Max Mustermann" className={inputCls} aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
              {errors.name && <p id="e-name" className={errCls}>{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="c-firma" className={labelCls}>
                Unternehmen
              </label>
              <input id="c-firma" name="unternehmen" type="text" autoComplete="organization" placeholder="Mustermann GmbH" className={inputCls} />
            </div>
            <div>
              <label htmlFor="c-mail" className={labelCls}>
                E-Mail *
              </label>
              <input id="c-mail" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="max@firma.de" className={inputCls} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-mail" : undefined} />
              {errors.email && <p id="e-mail" className={errCls}>{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="c-tel" className={labelCls}>
                Telefonnummer
              </label>
              <input id="c-tel" name="telefon" type="tel" autoComplete="tel" placeholder="0170 1234567" className={inputCls} />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="c-service" className={labelCls}>
              Worum geht es?
            </label>
            <select id="c-service" name="leistung" defaultValue="" className={inputCls}>
              <option value="">Bitte auswählen (freiwillig)</option>
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label htmlFor="c-msg" className={labelCls}>
              Nachricht
            </label>
            <textarea id="c-msg" name="nachricht" rows={4} placeholder="Was möchten Sie umsetzen? Welche Programme nutzen Sie heute?" className={`${inputCls} resize-y`} />
          </div>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 opacity-0" aria-hidden />
          <div className="mt-4">
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input type="checkbox" name="datenschutz" className="mt-0.5 h-5 w-5 flex-none accent-signal-ink" aria-required="true" aria-invalid={!!errors.datenschutz} aria-describedby={errors.datenschutz ? "e-datenschutz" : undefined} />
              <span>
                Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet
                werden. Details in der{" "}
                <Link href="/datenschutz" target="_blank" rel="noopener" className="font-medium text-signal-ink underline underline-offset-2">
                  Datenschutzerklärung
                </Link>
                . *
              </span>
            </label>
            {errors.datenschutz && <p id="e-datenschutz" className={errCls}>{errors.datenschutz}</p>}
          </div>
          {status === "error" && (
            <p className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              Die Nachricht wurde nicht übermittelt. Bitte senden Sie sie in einem Moment erneut
              oder erreichen Sie uns direkt unter {PHONE_DISPLAY} (Telefon und WhatsApp).
            </p>
          )}
          <button
            type="submit"
            disabled={status === "sending"}
            className={`${btnPrimaryLg} mt-6 w-full disabled:opacity-70 sm:w-auto`}
          >
            {status === "sending" ? (
              <>
                <Loader2 size={18} className="animate-spin" aria-hidden />
                Wird gesendet …
              </>
            ) : (
              "Anfrage senden"
            )}
          </button>
        </form>
      )}
        </div>
      </div>
    </section>
  );
}
