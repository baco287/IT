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
}
