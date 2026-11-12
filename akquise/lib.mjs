import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = dirname(fileURLToPath(import.meta.url));
export const DATEN = join(ROOT, "daten");
export const AUSGABE = join(ROOT, "ausgabe");

export async function liesJson(pfad, fallback) {
  try {
    return JSON.parse(await readFile(pfad, "utf8"));
  } catch {
    return fallback;
  }
}

export async function schreibText(pfad, text) {
  await mkdir(dirname(pfad), { recursive: true });
  await writeFile(pfad, text, "utf8");
}

export async function schreibJson(pfad, daten) {
  await schreibText(pfad, JSON.stringify(daten, null, 2));
}

export function slug(text) {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/* Arbeitet eine Liste mit begrenzter Gleichzeitigkeit ab. */
export async function parallel(items, anzahl, fn) {
  const ergebnis = new Array(items.length);
  let naechster = 0;
  const arbeiter = Array.from({ length: Math.min(anzahl, items.length) }, async () => {
    while (naechster < items.length) {
      const i = naechster++;
      ergebnis[i] = await fn(items[i], i);
    }
  });
  await Promise.all(arbeiter);
  return ergebnis;
}

/* Liest `--name wert` bzw. den Schalter `--name` von der Kommandozeile. */
export function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const wert = process.argv[i + 1];
  return wert === undefined || wert.startsWith("--") ? true : wert;
}

export function domain(url) {
  if (!url) return "";
  try {
    const mitSchema = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    return new URL(mitSchema.trim().split(/[;\s]/)[0]).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/* ------------------------------------------------------------------ */
/* Bewertung: Wie lohnend ist der Betrieb als Kontakt? (0–100)         */
/* ------------------------------------------------------------------ */
export function bewerte(lead, check) {
  const istRestaurant = lead.branche === "restaurant";
  const buchen = istRestaurant ? "Online-Reservierung" : "Online-Terminbuchung";
  const befunde = [];
  let score;
  let pruefen = false; // true = Befund vor dem Versand von Hand gegenprüfen

  if (lead.kette) {
    return { score: 5, befunde: ["Filiale einer Kette – Entscheidung fällt nicht vor Ort"], pruefen: false };
  }
  if (istRestaurant && /\b(mensa|kantine|cafeteria|betriebsrestaurant|imbiss)\b/i.test(lead.name)) {
    return { score: 5, befunde: ["Mensa, Kantine oder Imbiss – kein Bedarf an Tischreservierung"], pruefen: false };
  }

  /* Ohne geprüfte Webseite gibt es keinen belegbaren Befund – diese Betriebe
     bleiben unter der Anschreiben-Schwelle und sind Kandidaten für Anruf oder Besuch. */
  if (!lead.website) {
    score = 55;
    pruefen = true;
    befunde.push("Keine Webseite bei OpenStreetMap hinterlegt – von Hand nachsehen");
  } else if (!check) {
    return { score: 0, befunde: ["Webseite noch nicht geprüft"], pruefen: true };
  } else if (check.blockiert) {
    score = 40;
    pruefen = true;
    befunde.push("Webseite lässt sich nicht automatisch prüfen – von Hand ansehen");
  } else if (!check.erreichbar) {
    score = 55;
    pruefen = true;
    befunde.push(`Hinterlegte Webseite beim Test nicht abrufbar (${check.fehler ?? `Status ${check.status}`})`);
  } else if (check.passt === false) {
    score = 50;
    pruefen = true;
    befunde.push("Hinterlegte Webseite nennt weder Ort noch Anschrift des Betriebs – gehört sie noch dazu?");
  } else {
    if (check.buchung === "nein") {
      score = 85;
      befunde.push(`Keine ${buchen} auf der Webseite gefunden`);
    } else if (check.buchung === "anfrageformular") {
      score = 70;
      pruefen = true;
      befunde.push("Nur Anfrageformular gefunden, keine Sofortbuchung mit freien Zeiten");
    } else if (check.buchung === "vielleicht") {
      score = 45;
      pruefen = true;
      befunde.push(`${istRestaurant ? "Reservierung" : "Terminvereinbarung"} wird erwähnt – unklar, ob online buchbar`);
    } else {
      score = 15;
      befunde.push(`Nutzt bereits ein Buchungssystem (${check.anbieter})`);
    }
    if (!check.viewport) {
      score += 8;
      befunde.push("Webseite ist nicht für Handys eingerichtet");
    }
    if (check.ms > 3000) {
      score += 5;
      befunde.push(`Startseite lädt langsam (${(check.ms / 1000).toFixed(1).replace(".", ",")} s)`);
    }
    if (check.copyrightJahr && check.copyrightJahr <= new Date().getFullYear() - 3) {
      score += 4;
      befunde.push(`Webseite wirkt lange nicht gepflegt (Copyright ${check.copyrightJahr})`);
    }
    if (!check.https) {
      score += 3;
      befunde.push("Webseite läuft ohne Verschlüsselung (kein https)");
    }
  }

  return { score: Math.min(100, score), befunde, pruefen };
}
