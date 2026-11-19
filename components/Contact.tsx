"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Loader2 } from "lucide-react";
import { PHONE_DISPLAY } from "@/lib/company";
import { SplitSection, btnPrimaryLg } from "./ui";
import { sendForm } from "@/lib/form";

const SERVICES = [
  "Prozessautomatisierung",
  "Webseite oder Landingpage",
  "SEO & KI-Agenten",
  "Marketing-Automatisierung",
  "CRM & Vertrieb",
  "KI-Agenten für Kundenanfragen",
  "IT & Infrastruktur",
  "Noch unklar – allgemeine Beratung",
];

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-md border border-ink/30 bg-white px-4 py-3 text-[16px] text-text placeholder:text-muted transition-colors focus:border-ink";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errCls = "mt-1.5 text-sm text-red-600";

export default function Contact() {
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
    if (!String(data.get("leistung") ?? "")) next.leistung = "Bitte wählen Sie eine Leistung aus.";
    if (!data.get("datenschutz"))
      next.datenschutz = "Bitte stimmen Sie der Verarbeitung Ihrer Daten zu.";
    if (String(data.get("_honey") ?? "")) return; // Spam-Schutz

    setErrors(next);
    const firstInvalid = ["name", "email", "leistung", "datenschutz"].find((k) => next[k]);
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
      await sendForm("Neue QonteX-Anfrage: " + data.get("leistung"), {
        Name: String(data.get("name") ?? ""),
        Unternehmen: String(data.get("unternehmen") || "—"),
        "E-Mail": email,
        Telefon: String(data.get("telefon") || "—"),
        Leistung: String(data.get("leistung") ?? ""),
        Nachricht: String(data.get("nachricht") || "—"),
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <SplitSection
      id="kontakt"
      headingId="kontakt-heading"
      title="Kostenloses Potenzialgespräch anfragen"
      text="Schildern Sie uns kurz, welche Abläufe Sie heute Zeit kosten – wir melden uns mit einem Terminvorschlag zurück."
      rule={false}
    >
      {status === "success" ? (
        <div ref={successRef} tabIndex={-1} className="border-t-2 border-ink pt-7 outline-none" role="status">
          <Check size={30} strokeWidth={2.6} className="text-teal-dark" aria-hidden />
          <h3 className="mt-4 text-[1.6rem] leading-tight">Vielen Dank für Ihre Anfrage!</h3>
          <p className="mt-2 text-[17px] text-muted">Wir melden uns zeitnah bei Ihnen.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="c-name" className={labelCls}>
                Name *
              </label>
              <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Max Mustermann" className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
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
              <input id="c-mail" name="email" type="email" autoComplete="email" placeholder="max@firma.de" className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-mail" : undefined} />
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
              Worum geht es? *
            </label>
            <select id="c-service" name="leistung" defaultValue="" className={inputCls} aria-invalid={!!errors.leistung} aria-describedby={errors.leistung ? "e-service" : undefined}>
              <option value="" disabled>
                Bitte auswählen …
              </option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            {errors.leistung && <p id="e-service" className={errCls}>{errors.leistung}</p>}
          </div>
          <div className="mt-4">
            <label htmlFor="c-msg" className={labelCls}>
              Nachricht
            </label>
            <textarea id="c-msg" name="nachricht" rows={4} placeholder="Welche Aufgaben kosten Sie heute am meisten Zeit?" className={`${inputCls} resize-y`} />
          </div>
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 opacity-0" aria-hidden />
          <div className="mt-4">
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
              <input type="checkbox" name="datenschutz" className="mt-0.5 h-5 w-5 flex-none accent-[#007d75]" aria-invalid={!!errors.datenschutz} aria-describedby={errors.datenschutz ? "e-datenschutz" : undefined} />
              <span>
                Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet
                werden. Details in der{" "}
                <Link href="/datenschutz" target="_blank" rel="noopener" className="font-medium text-teal-text underline">
                  Datenschutzerklärung
                </Link>
                . *
              </span>
            </label>
            {errors.datenschutz && <p id="e-datenschutz" className={errCls}>{errors.datenschutz}</p>}
          </div>
          {status === "error" && (
            <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              Das Senden hat leider nicht geklappt. Bitte versuchen Sie es in einem Moment erneut
              oder rufen Sie uns an: {PHONE_DISPLAY}.
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
              "Potenzialgespräch anfragen"
            )}
          </button>
        </form>
      )}
    </SplitSection>
  );
}
