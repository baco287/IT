"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Check, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import { EMAIL, PHONE_DISPLAY, PHONE_HREF } from "./Cta";
import { IconTile, container } from "./ui";

const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/" + ["karakuss", "sezer"].join(".") + "@gmail" + ".com";

const SERVICES = [
  "IT-Betreuung (Managed IT)",
  "IT-Support",
  "Cloud & Microsoft 365",
  "IT-Sicherheit",
  "Server & Netzwerke",
  "Backup & Wiederherstellung",
  "KI-Agenten & Automatisierung",
  "Webseite oder Online-Shop",
  "Online-Marketing / Social Media",
  "Allgemeine Beratung",
];

const CONTACT_FACTS = [
  { icon: Phone, label: "Telefon", value: PHONE_DISPLAY, href: PHONE_HREF },
  { icon: Mail, label: "E-Mail", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, label: "Adresse", value: "Pappelallee 64, 10437 Berlin" },
  { icon: Clock, label: "Erreichbarkeit", value: "Termine nach Vereinbarung" },
];

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-text placeholder:text-muted/60 transition-colors focus:border-teal-dark focus:outline-none focus:ring-2 focus:ring-teal/25";
const labelCls = "mb-1.5 block text-sm font-semibold text-ink";
const errCls = "mt-1.5 text-sm text-red-600";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Neue QonteX-Anfrage: " + data.get("leistung"),
          _template: "table",
          _captcha: "false",
          Name: data.get("name"),
          Unternehmen: data.get("unternehmen") || "—",
          "E-Mail": email,
          Telefon: data.get("telefon") || "—",
          Leistung: data.get("leistung"),
          Nachricht: data.get("nachricht") || "—",
          Quelle: "qontex-website",
        }),
      });
      if (!res.ok) throw new Error("Senden fehlgeschlagen");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="bg-white py-16 lg:py-20">
      <div className={`${container} grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14`}>
        <Reveal>
          <h2 className="text-2xl font-bold">So erreichen Sie uns</h2>
          <ul className="mt-6 space-y-3">
            {CONTACT_FACTS.map((f) => {
              const body = (
                <>
                  <IconTile>
                    <f.icon size={20} strokeWidth={1.9} aria-hidden />
                  </IconTile>
                  <span>
                    <span className="block text-sm text-muted">{f.label}</span>
                    <span className="block text-[16px] font-semibold text-ink">{f.value}</span>
                  </span>
                </>
              );
              return (
                <li key={f.label}>
                  {f.href ? (
                    <a
                      href={f.href}
                      className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 transition-colors hover:border-teal"
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4">
                      {body}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            QonteX ist ein Angebot der Volt Gas UG (haftungsbeschränkt), Berlin.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8">
            {status === "success" ? (
              <div className="py-10 text-center" role="status">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-teal-tint text-teal-dark">
                  <Check size={30} strokeWidth={2.5} aria-hidden />
                </span>
                <h3 className="mt-5 text-xl font-bold">Vielen Dank für Ihre Anfrage!</h3>
                <p className="mt-2 text-muted">Wir melden uns zeitnah bei Ihnen.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h2 className="text-2xl font-bold">Kostenloses Erstgespräch anfragen</h2>
                <p className="mt-2 text-[15px] text-muted">
                  Schildern Sie uns kurz Ihr Anliegen – wir melden uns mit einer ehrlichen
                  Einschätzung zurück.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
                  <textarea id="c-msg" name="nachricht" rows={4} placeholder="Beschreiben Sie kurz Ihr Anliegen …" className={`${inputCls} resize-y`} />
                </div>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 opacity-0" aria-hidden />
                <div className="mt-4">
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <input type="checkbox" name="datenschutz" className="mt-0.5 h-5 w-5 flex-none accent-[#00a99d]" aria-invalid={!!errors.datenschutz} />
                    <span>
                      Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet
                      werden. Details in der{" "}
                      <a href="/datenschutz" className="font-medium text-teal-dark underline">
                        Datenschutzerklärung
                      </a>
                      . *
                    </span>
                  </label>
                  {errors.datenschutz && <p className={errCls}>{errors.datenschutz}</p>}
                </div>
                {status === "error" && (
                  <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                    Das Senden hat leider nicht geklappt. Bitte versuchen Sie es in einem Moment erneut
                    oder rufen Sie uns an: {PHONE_DISPLAY}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-7 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-70"
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
        </Reveal>
      </div>
    </section>
  );
}
