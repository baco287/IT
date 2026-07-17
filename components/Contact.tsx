"use client";

import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Check, Loader2 } from "lucide-react";
import Reveal from "./Reveal";
import SectionHead from "./SectionHead";

const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/" + ["karakuss", "sezer"].join(".") + "@gmail" + ".com";

const SERVICES = [
  "Managed IT Services",
  "IT-Support",
  "Cloud-Lösungen",
  "Cybersecurity",
  "Server & Netzwerke",
  "Backup & Recovery",
  "Allgemeine Beratung",
];

/* Deutlich markierte Platzhalter – hier echte Unternehmensdaten eintragen. */
const CONTACT_FACTS = [
  { icon: Phone, label: "Telefon", value: "[Telefonnummer folgt]" },
  { icon: Mail, label: "E-Mail", value: "[E-Mail-Adresse folgt]" },
  { icon: MapPin, label: "Adresse", value: "[Geschäftsadresse folgt]" },
  { icon: Clock, label: "Erreichbarkeit", value: "[Öffnungszeiten folgen]" },
];

type Status = "idle" | "sending" | "success" | "error";

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
    if (!String(data.get("leistung") ?? ""))
      next.leistung = "Bitte wählen Sie eine Leistung aus.";
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

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-fog/50 transition-colors focus:border-cyan/50 focus:bg-white/[0.06] focus:outline-none";

  return (
    <section id="kontakt" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHead
          label="Kontakt"
          title="Sprechen wir über Ihre IT"
          text="Stellen Sie Ihre Anfrage – wir melden uns zeitnah mit einer ehrlichen Einschätzung zurück."
        />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <ul className="space-y-4">
              {CONTACT_FACTS.map((f) => (
                <li key={f.label} className="glass flex items-center gap-4 rounded-xl px-5 py-4">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-lg bg-cyan/10 text-cyan">
                    <f.icon size={18} strokeWidth={2} aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-fog">
                      {f.label}
                    </p>
                    <p className="text-sm font-semibold text-mist">{f.value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-fog">
              Hinweis: Die Kontaktdaten werden nach Abschluss der Unternehmens­anmeldung
              ergänzt. Anfragen über das Formular erreichen uns bereits jetzt zuverlässig.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass rounded-2xl p-8">
              {status === "success" ? (
                <div className="py-10 text-center" role="status">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-cyan/50 bg-cyan/10 text-cyan">
                    <Check size={28} strokeWidth={2.5} aria-hidden />
                  </span>
                  <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                    Vielen Dank für Ihre Anfrage!
                  </h3>
                  <p className="mt-2 text-sm text-fog">
                    Wir melden uns zeitnah bei Ihnen zurück.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-name" className="mb-1.5 block text-xs font-semibold text-mist">
                        Name *
                      </label>
                      <input id="c-name" name="name" type="text" autoComplete="name" placeholder="Max Mustermann" className={inputCls} aria-invalid={!!errors.name} />
                      {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-firma" className="mb-1.5 block text-xs font-semibold text-mist">
                        Unternehmen
                      </label>
                      <input id="c-firma" name="unternehmen" type="text" autoComplete="organization" placeholder="Mustermann GmbH" className={inputCls} />
                    </div>
                    <div>
                      <label htmlFor="c-mail" className="mb-1.5 block text-xs font-semibold text-mist">
                        E-Mail *
                      </label>
                      <input id="c-mail" name="email" type="email" autoComplete="email" placeholder="max@firma.de" className={inputCls} aria-invalid={!!errors.email} />
                      {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="c-tel" className="mb-1.5 block text-xs font-semibold text-mist">
                        Telefonnummer
                      </label>
                      <input id="c-tel" name="telefon" type="tel" autoComplete="tel" placeholder="0170 1234567" className={inputCls} />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label htmlFor="c-service" className="mb-1.5 block text-xs font-semibold text-mist">
                      Gewünschte Leistung *
                    </label>
                    <select id="c-service" name="leistung" defaultValue="" className={`${inputCls} appearance-none bg-navy`} aria-invalid={!!errors.leistung}>
                      <option value="" disabled>
                        Bitte auswählen …
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.leistung && <p className="mt-1 text-xs text-red-400">{errors.leistung}</p>}
                  </div>
                  <div className="mt-4">
                    <label htmlFor="c-msg" className="mb-1.5 block text-xs font-semibold text-mist">
                      Nachricht
                    </label>
                    <textarea id="c-msg" name="nachricht" rows={4} placeholder="Beschreiben Sie kurz Ihr Anliegen …" className={`${inputCls} resize-y`} />
                  </div>
                  <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 opacity-0" aria-hidden />
                  <div className="mt-4">
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-fog">
                      <input type="checkbox" name="datenschutz" className="mt-0.5 h-4 w-4 flex-none accent-[#2dd4ea]" aria-invalid={!!errors.datenschutz} />
                      <span>
                        Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage
                        verarbeitet werden. Die Daten werden nicht weitergegeben. *
                      </span>
                    </label>
                    {errors.datenschutz && <p className="mt-1 text-xs text-red-400">{errors.datenschutz}</p>}
                  </div>
                  {status === "error" && (
                    <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300" role="alert">
                      Das Senden hat leider nicht geklappt. Bitte versuchen Sie es in
                      einem Moment erneut.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-7 py-3.5 font-semibold text-[#04222b] shadow-[0_10px_30px_rgba(45,212,234,0.25)] transition-opacity disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={17} className="animate-spin" aria-hidden />
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
      </div>
    </section>
  );
}
