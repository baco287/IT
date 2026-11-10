"use client";

import { useState } from "react";
import { Check, Loader2, Phone } from "lucide-react";
import { sendForm } from "@/lib/form";
import { PHONE_DISPLAY, PHONE_HREF } from "./Cta";

const TOPICS = ["IT-Betreuung", "Support", "Cloud", "Sicherheit", "KI-Agenten", "Sonstiges"];

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "w-full rounded-lg border border-line bg-white px-4 py-3 text-[15px] text-text placeholder:text-muted/60 focus:border-teal-dark focus:outline-none focus:ring-2 focus:ring-teal/25";

/* Rückruf-Formular im Hero – echte Funktion statt Deko-Bild */
export default function CallbackForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState("IT-Betreuung");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (String(data.get("_honey") ?? "")) return; // Spam-Schutz

    const next: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("telefon") ?? "").trim();
    if (!name) next.name = "Bitte geben Sie Ihren Namen an.";
    if (phone.replace(/\D/g, "").length < 6) next.telefon = "Bitte geben Sie eine Telefonnummer an.";
    if (!data.get("datenschutz")) next.datenschutz = "Bitte stimmen Sie der Verarbeitung zu.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      await sendForm(`Rückrufwunsch: ${topic}`, {
        Name: name,
        Telefon: phone,
        Thema: topic,
        Unternehmen: String(data.get("unternehmen") ?? "").trim() || "—",
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-line bg-white p-8 text-center shadow-[var(--shadow-card)]" role="status">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal-tint text-teal-dark">
          <Check size={28} strokeWidth={2.5} aria-hidden />
        </span>
        <h2 className="mt-4 text-xl font-bold">Danke – wir rufen Sie zurück.</h2>
        <p className="mt-2 text-[15px] text-muted">Wir melden uns so schnell wie möglich bei Ihnen.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
      aria-labelledby="callback-title"
    >
      <h2 id="callback-title" className="text-xl font-bold">
        Kostenlosen Rückruf anfordern
      </h2>
      <p className="mt-1.5 text-[15px] text-muted">Wir melden uns persönlich bei Ihnen – unverbindlich.</p>

      <fieldset className="mt-5">
        <legend className="mb-2 text-sm font-semibold text-ink">Worum geht es?</legend>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map((t) => (
            <label
              key={t}
              className={`cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-colors ${
                topic === t
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink hover:border-ink/40"
              }`}
            >
              <input
                type="radio"
                name="thema"
                value={t}
                checked={topic === t}
                onChange={() => setTopic(t)}
                className="sr-only"
              />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cb-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Name *
          </label>
          <input id="cb-name" name="name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "cb-e-name" : undefined} />
          {errors.name && <p id="cb-e-name" className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cb-tel" className="mb-1.5 block text-sm font-semibold text-ink">
            Telefon *
          </label>
          <input id="cb-tel" name="telefon" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.telefon} aria-describedby={errors.telefon ? "cb-e-tel" : undefined} />
          {errors.telefon && <p id="cb-e-tel" className="mt-1 text-sm text-red-600">{errors.telefon}</p>}
        </div>
      </div>
      <div className="mt-3">
        <label htmlFor="cb-firma" className="mb-1.5 block text-sm font-semibold text-ink">
          Unternehmen
        </label>
        <input id="cb-firma" name="unternehmen" autoComplete="organization" className={inputCls} />
      </div>

      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="absolute -left-[9999px] h-0 opacity-0" aria-hidden />

      <label className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-muted">
        <input type="checkbox" name="datenschutz" className="mt-0.5 h-5 w-5 flex-none accent-[#00a99d]" aria-invalid={!!errors.datenschutz} />
        <span>
          Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet werden (
          <a href="/datenschutz" className="font-medium text-teal-dark underline">
            Datenschutz
          </a>
          ). *
        </span>
      </label>
      {errors.datenschutz && <p className="mt-1 text-sm text-red-600">{errors.datenschutz}</p>}

      {status === "error" && (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          Das Senden hat leider nicht geklappt. Bitte rufen Sie uns direkt an: {PHONE_DISPLAY}.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden />
            Wird gesendet …
          </>
        ) : (
          "Rückruf anfordern"
        )}
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 border-t border-line pt-4 text-sm text-muted">
        <Phone size={16} strokeWidth={2} className="text-teal-dark" aria-hidden />
        Oder direkt anrufen:
        <a href={PHONE_HREF} className="font-semibold text-ink hover:text-teal-dark">
          {PHONE_DISPLAY}
        </a>
      </p>
    </form>
  );
}
