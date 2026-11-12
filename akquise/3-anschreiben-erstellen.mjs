/* Schritt 3: Betriebe bewerten, Anschreiben entwerfen und die Übersicht erzeugen.
   Dieser Schritt VERSENDET NICHTS – er legt nur Entwürfe und Listen ab.

   Aufruf:  node akquise/3-anschreiben-erstellen.mjs [--min 70]               */
import { readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { CONFIG } from "./config.mjs";
import { AUSGABE, DATEN, ROOT, arg, bewerte, domain, liesJson, schreibText, slug } from "./lib.mjs";

const a = CONFIG.absender;
const mindestScore = Number(arg("min", CONFIG.mindestScore));
const datum = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });

async function liesSperrliste() {
  try {
    const text = await readFile(join(ROOT, "sperrliste.txt"), "utf8");
    return text
      .split(/\r?\n/)
      .map((z) => z.trim().toLowerCase())
      .filter((z) => z && !z.startsWith("#"));
  } catch {
    return [];
  }
}

function texte(lead, check) {
  const r = lead.branche === "restaurant";
  const seite = domain(check?.endUrl ?? lead.website);
  const leute = r ? "Gäste" : "Kunden";
  const sache = r ? "einen Tisch zu reservieren" : "einen Werkstatt-Termin zu buchen";
  const betreff = `${r ? "Online-Reservierung" : "Online-Terminbuchung"} für ${lead.name}`;

  let einstieg = "";
  if (check?.erreichbar && check.buchung === "nein") {
    einstieg = `auf Ihrer Webseite ${seite} habe ich keine Möglichkeit gefunden, online ${sache}. `;
  } else if (check?.erreichbar && check.buchung === "anfrageformular") {
    einstieg = `auf Ihrer Webseite ${seite} lässt sich ${r ? "ein Tisch" : "ein Termin"} anfragen – eine sofortige Buchung mit freien Zeiten habe ich dort aber nicht gefunden. `;
  }
  const alltag = r
    ? "Viele Gäste entscheiden abends auf dem Handy, wo sie essen gehen – und reservieren dort, wo es mit zwei Klicks erledigt ist."
    : "Viele Kunden möchten ihren Termin abends oder am Wochenende festmachen – also genau dann, wenn in der Werkstatt niemand ans Telefon gehen kann.";
  const anfang = einstieg ? einstieg + alltag : alltag.charAt(0).toLowerCase() + alltag.slice(1);

  const zusatz = [];
  if (check?.erreichbar && !check.viewport) {
    zusatz.push("Außerdem ist die Seite nicht für Handys eingerichtet, obwohl die meisten Besucher heute mit dem Smartphone kommen.");
  }
  if (check?.erreichbar && check.ms > 3000) {
    zusatz.push(`Die Startseite brauchte bei meinem Test rund ${Math.round(check.ms / 1000)} Sekunden zum Laden.`);
  }

  const punkte = [
    `– ${r ? "Online-Reservierung" : "Online-Terminbuchung"} direkt auf Ihrer Webseite, rund um die Uhr`,
    `– automatische Bestätigung und Erinnerung für Ihre ${leute}`,
    `– auf Wunsch ein KI-Assistent, der ${r ? "Reservierungen" : "Termine"} im Chat annimmt`,
  ];
  if (zusatz.length > 0) punkte.push("– auf Wunsch eine Überarbeitung Ihrer Webseite, damit sie auf dem Handy schnell und übersichtlich ist");

  const anschrift = [lead.name, lead.strasse, `${lead.plz} ${lead.ort}`.trim()].filter(Boolean).join("\n");
  const fuss = [
    `${a.marke} ist eine Marke der ${a.firma}, ${a.strasse}, ${a.plzOrt}.`,
    `Ihre Anschrift stammt aus öffentlich zugänglichen Quellen (OpenStreetMap). Wenn Sie keine weitere Post von uns wünschen, genügt eine kurze Nachricht an ${a.email}.`,
  ].join("\n");

  const brief = [
    anschrift,
    "",
    `${a.plzOrt.replace(/^\d+\s*/, "")}, ${datum}`,
    "",
    betreff,
    "",
    "Guten Tag,",
    "",
    anfang,
    ...(zusatz.length > 0 ? ["", zusatz.join(" ")] : []),
    "",
    `Genau dafür richten wir für ${r ? "Restaurants" : "Werkstätten"} in ${CONFIG.ort} ein:`,
    ...punkte,
    "",
    `Wie das für Ihre ${leute} aussieht, können Sie in zwei Minuten selbst ausprobieren: ${a.demoUrl}`,
    "",
    `Wenn Sie mögen, zeige ich es Ihnen auch gern persönlich. Sie erreichen mich unter ${a.telefon} oder ${a.email}.`,
    "",
    "Mit freundlichen Grüßen",
    "",
    a.ansprechpartner,
    a.marke,
    "",
    "",
    fuss,
  ].join("\n");

  const mail = [
    `Betreff: ${betreff}`,
    "",
    "Guten Tag,",
    "",
    anfang,
    "",
    `Wir richten für ${r ? "Restaurants" : "Werkstätten"} in ${CONFIG.ort} ${r ? "Online-Reservierung" : "Online-Terminbuchung"} mit automatischer Bestätigung und Erinnerung ein. Eine Demo zum Ausprobieren finden Sie hier: https://${a.demoUrl}`,
    "",
    "Darf ich Ihnen das in 15 Minuten zeigen?",
    "",
    "Mit freundlichen Grüßen",
    a.ansprechpartner,
    `${a.marke} · ${a.telefon}`,
    "",
    `${a.firma}, ${a.strasse}, ${a.plzOrt}`,
    "Wenn Sie keine weiteren Nachrichten wünschen, antworten Sie bitte kurz auf diese E-Mail.",
  ].join("\n");

  return { betreff, brief, mail };
}

function anrufnotiz(lead, bewertung) {
  const r = lead.branche === "restaurant";
  return [
    `Aufhänger: ${bewertung.befunde[0] ?? "Online-Buchung ansprechen"}`,
    `Frage: Wie nehmen Sie heute ${r ? "Reservierungen" : "Termine"} an – nur am Telefon?`,
    `Angebot: Demo zeigen (${a.demoUrl}) und 15 Minuten Termin vorschlagen.`,
    "Am Ende fragen: Darf ich Ihnen den Link per E-Mail schicken? (Einwilligung notieren)",
  ].join("\n");
}

const FREEMAIL = new Set([
  "gmail.com", "googlemail.com", "t-online.de", "web.de", "gmx.de", "gmx.net", "yahoo.de", "yahoo.com",
  "hotmail.com", "hotmail.de", "outlook.com", "outlook.de", "live.de", "aol.com", "freenet.de", "arcor.de", "icloud.com",
]);

const csvFeld = (wert) => `"${String(wert ?? "").replace(/"/g, '""')}"`;

/* ------------------------------------------------------------------ */

const leads = await liesJson(join(DATEN, "leads.json"), null);
if (!leads) {
  console.error("akquise/daten/leads.json fehlt – bitte zuerst Schritt 1 ausführen.");
  process.exit(1);
}
const checks = await liesJson(join(DATEN, "checks.json"), {});
const sperrliste = await liesSperrliste();
const gesperrt = (lead) => {
  const name = lead.name.toLowerCase();
  const seite = domain(lead.website);
  return sperrliste.some((eintrag) => name.includes(eintrag) || (seite && seite === eintrag));
};

const zeilen = [];
let nr = 0;
for (const lead of leads) {
  if (gesperrt(lead)) continue;
  const check = checks[lead.id];
  const bewertung = bewerte(lead, check);
  /* Auf Webseiten steht oft auch die Adresse des Webdesigners – nur Adressen
     übernehmen, die zur eigenen Domain oder zu einem Freemail-Anbieter gehören. */
  const eigeneDomain = domain(check?.endUrl ?? lead.website);
  const email =
    lead.email ||
    check?.emails?.find((e) => {
      const d = e.split("@")[1] ?? "";
      return d === eigeneDomain || FREEMAIL.has(d);
    }) ||
    "";
  const zeile = {
    id: lead.id,
    score: bewertung.score,
    pruefen: bewertung.pruefen,
    befunde: bewertung.befunde,
    branche: CONFIG.branchen[lead.branche].label,
    name: lead.name,
    strasse: lead.strasse,
    plz: lead.plz,
    ort: lead.ort,
    telefon: lead.telefon,
    email,
    website: check?.endUrl ?? lead.website,
    buchung: check?.erreichbar ? (check.buchung === "ja" ? `ja (${check.anbieter})` : check.buchung) : "",
    wege: [lead.strasse && lead.plz ? "Brief" : null, lead.telefon ? "Telefon" : null, email ? "E-Mail" : null].filter(Boolean),
    datei: "",
  };
  if (bewertung.score >= mindestScore) {
    const t = texte(lead, check);
    zeile.brief = t.brief;
    zeile.mail = t.mail;
    zeile.anruf = anrufnotiz(lead, bewertung);
    if (lead.strasse && lead.plz) {
      zeile.datei = `briefe/${String(++nr).padStart(3, "0")}-${slug(lead.name)}.txt`;
    }
  }
  zeilen.push(zeile);
}
zeilen.sort((x, y) => y.score - x.score || x.name.localeCompare(y.name, "de"));

/* Briefe als einzelne Textdateien – alte Entwürfe des letzten Laufs vorher entfernen */
await rm(join(AUSGABE, "briefe"), { recursive: true, force: true });
for (const z of zeilen) {
  if (z.datei) await schreibText(join(AUSGABE, z.datei), z.brief);
}

/* Tabelle für Excel (Semikolon-getrennt, mit BOM für Umlaute) */
const kopf = ["Score", "Prüfen", "Branche", "Name", "Straße", "PLZ", "Ort", "Telefon", "E-Mail", "Webseite", "Online-Buchung", "Befunde", "Kontaktwege", "Brief-Datei", "Status"];
const csv = [
  kopf.map(csvFeld).join(";"),
  ...zeilen.map((z) =>
    [z.score, z.pruefen ? "ja" : "", z.branche, z.name, z.strasse, z.plz, z.ort, z.telefon, z.email, z.website, z.buchung, z.befunde.join(" | "), z.wege.join(", "), z.datei, ""]
      .map(csvFeld)
      .join(";"),
  ),
].join("\r\n");
await schreibText(join(AUSGABE, "leads.csv"), `﻿${csv}`);

/* Übersicht im Browser */
const vorlage = await readFile(join(ROOT, "vorlage-uebersicht.html"), "utf8");
const daten = JSON.stringify({ ort: CONFIG.ort, stand: datum, mindestScore, zeilen }).replace(/</g, "\\u003c");
await schreibText(join(AUSGABE, "uebersicht.html"), vorlage.replace("/*DATEN*/null", () => daten));

const mitText = zeilen.filter((z) => z.brief);
console.log(`${zeilen.length} Betriebe bewertet (${leads.length - zeilen.length} auf der Sperrliste übersprungen).`);
console.log(`  Anschreiben entworfen (Score ab ${mindestScore}):  ${mitText.length}`);
console.log(`    davon mit Postanschrift (Brief-Datei):   ${mitText.filter((z) => z.datei).length}`);
console.log(`    davon mit Telefonnummer:                 ${mitText.filter((z) => z.telefon).length}`);
console.log(`    davon vor Versand von Hand zu prüfen:    ${mitText.filter((z) => z.pruefen).length}`);
console.log("\nAbgelegt in akquise/ausgabe/: uebersicht.html, leads.csv, briefe/");
console.log("Es wurde nichts versendet.");
