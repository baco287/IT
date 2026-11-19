/* Versand von Formularen über FormSubmit (siehe Datenschutzerklärung, Abschnitt Kontaktformular). */
const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/" + ["karakuss", "sezer"].join(".") + "@gmail" + ".com";

export async function sendForm(subject: string, fields: Record<string, string>) {
  const res = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      _subject: subject,
      _template: "table",
      _captcha: "false",
      ...fields,
      Quelle: "qontex-website",
    }),
  });
  if (!res.ok) throw new Error("Senden fehlgeschlagen");

  /* FormSubmit antwortet auch dann mit Status 200, wenn nichts zugestellt wurde –
     etwa solange das Formular noch nicht freigeschaltet ist (success: "false").
     Als gesendet gilt die Anfrage nur, wenn die Antwort das ausdrücklich bestätigt. */
  const data: unknown = await res.json().catch(() => null);
  const confirmed =
    typeof data === "object" &&
    data !== null &&
    String((data as { success?: unknown }).success) === "true";
  if (!confirmed) throw new Error("Senden nicht bestätigt");
}
