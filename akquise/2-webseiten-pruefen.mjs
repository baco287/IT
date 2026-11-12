/* Schritt 2: Startseite jedes Betriebs abrufen und auf Online-Buchung,
   Handy-Tauglichkeit und Ladezeit prüfen. Ruft pro Betrieb höchstens zwei
   öffentliche Seiten ab und sendet nichts ab.

   Aufruf:  node akquise/2-webseiten-pruefen.mjs [--limit 50] [--neu]        */
import { join } from "node:path";
import { CONFIG } from "./config.mjs";
import { DATEN, arg, liesJson, parallel, schreibJson } from "./lib.mjs";

/* Bekannte Buchungssysteme: Teil der Adresse → Anzeigename */
const ANBIETER = [
  ["opentable.", "OpenTable"],
  ["quandoo.", "Quandoo"],
  ["resmio.", "resmio"],
  ["thefork.", "TheFork"],
  ["bookatable.", "Bookatable"],
  ["gastronovi.", "gastronovi"],
  ["reservation.dish.co", "DISH Reservation"],
  ["lunchgate.", "Lunchgate"],
  ["zenchef.", "Zenchef"],
  ["formitable.", "Formitable"],
  ["aleno.me", "aleno"],
  ["sevenrooms.", "SevenRooms"],
  ["teburio.", "Teburio"],
  ["tablein.com", "Tablein"],
  ["resy.com", "Resy"],
  ["calendly.com", "Calendly"],
  ["//cal.com/", "Cal.com"],
  ["timify.com", "TIMIFY"],
  ["shore.com", "Shore"],
  ["simplybook.", "SimplyBook"],
  ["etermin.net", "eTermin"],
  ["terminland.", "Terminland"],
  ["werkstars.", "Werkstars"],
  ["autoaid.", "autoaid"],
  ["repareo.", "repareo"],
  ["fairgarage.", "FairGarage"],
  ["werkstattplanung.net", "Werkstattplanung.net"],
  ["drivelog.", "Drivelog"],
];

/* Hinweise im sichtbaren Text, dass reserviert bzw. ein Termin vereinbart werden kann */
const STICHWORTE = [
  /reservier/,
  /reservation/,
  /book\s+a\s+table/,
  /tisch\s+buchen/,
  /termin\s*(online|buchen|vereinbar|anfrag)/,
  /online-?termin/,
  /terminbuchung|terminvereinbarung|terminanfrage|wunschtermin/,
];
const LINK_HINWEIS = /reserv|termin|buchen|booking|book/i;

const FEHLERTEXT = {
  ENOTFOUND: "Adresse existiert nicht mehr",
  EAI_AGAIN: "Adresse nicht auflösbar",
  UND_ERR_CONNECT_TIMEOUT: "Zeitüberschreitung",
  ECONNREFUSED: "Verbindung abgelehnt",
  ECONNRESET: "Verbindung abgebrochen",
};

const CMS = [
  [/wp-content|wp-includes/, "WordPress"],
  [/wixstatic\.com|wix\.com/, "Wix"],
  [/jimdo/, "Jimdo"],
  [/squarespace/, "Squarespace"],
  [/website-editor\.net|ionos\.de\/mywebsite/, "IONOS Baukasten"],
  [/weebly/, "Weebly"],
  [/webnode/, "Webnode"],
  [/joomla/, "Joomla"],
  [/typo3/, "TYPO3"],
];

function normalisiere(url) {
  let u = url.trim().split(/[;\s]/)[0];
  if (!/^https?:\/\//i.test(u)) u = `https://${u}`;
  try {
    return new URL(u).href;
  } catch {
    return null;
  }
}

async function hole(url) {
  const start = performance.now();
  const res = await fetch(url, {
    redirect: "follow",
    signal: AbortSignal.timeout(CONFIG.zeitlimitMs),
    headers: { "User-Agent": CONFIG.userAgent, Accept: "text/html,*/*;q=0.8", "Accept-Language": "de" },
  });
  const html = (await res.text()).slice(0, 600_000);
  return { ok: res.ok, status: res.status, url: res.url, html, ms: Math.round(performance.now() - start) };
}

/* Manche ältere Seite läuft nur ohne (oder nur mit) Verschlüsselung. */
async function holeMitAusweichen(url) {
  try {
    return await hole(url);
  } catch (ersterFehler) {
    const anders = url.startsWith("https://") ? url.replace("https://", "http://") : url.replace("http://", "https://");
    try {
      return await hole(anders);
    } catch {
      throw ersterFehler;
    }
  }
}

function sichtbarerText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .toLowerCase();
}

function findeAnbieter(html) {
  const klein = html.toLowerCase();
  return ANBIETER.find(([muster]) => klein.includes(muster))?.[1] ?? null;
}

/* Erster interner Link, der nach Reservierung oder Terminbuchung aussieht */
function findeBuchungsLink(html, basis) {
  const host = new URL(basis).hostname;
  for (const m of html.matchAll(/<a\b[^>]*href=["']([^"'#]+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    if (!LINK_HINWEIS.test(m[1]) && !LINK_HINWEIS.test(m[2].replace(/<[^>]+>/g, " "))) continue;
    if (/^(mailto:|tel:|javascript:)/i.test(m[1])) continue;
    try {
      const ziel = new URL(m[1], basis);
      if (ziel.hostname === host && ziel.href !== basis) return ziel.href;
    } catch {
      /* kaputter Link – überspringen */
    }
  }
  return null;
}

/* Gehört die Seite wirklich zum Betrieb? Abgelaufene Adressen werden oft von
   fremden Anbietern übernommen. Als Beleg zählt: Ort, PLZ, Straße oder Telefon. */
function passtZumBetrieb(lead, titel, text) {
  const heu = `${titel} ${text}`.toLowerCase();
  if (heu.includes(CONFIG.ort.toLowerCase())) return true;
  if (lead.plz && heu.includes(lead.plz)) return true;
  const strasse = lead.strasse.replace(/\s+\d.*$/, "").toLowerCase();
  if (strasse.length >= 6 && heu.includes(strasse)) return true;
  const endziffern = lead.telefon.replace(/\D/g, "").slice(-6);
  return endziffern.length === 6 && heu.replace(/\D/g, "").includes(endziffern);
}

function neuestesCopyrightJahr(html) {
  let jahr = null;
  for (const m of html.matchAll(/(?:©|&copy;|copyright)([^<]{0,40})/gi)) {
    for (const j of m[1].matchAll(/20\d{2}/g)) {
      const zahl = Number(j[0]);
      if (zahl <= new Date().getFullYear() && (jahr === null || zahl > jahr)) jahr = zahl;
    }
  }
  return jahr;
}

async function pruefe(lead) {
  const start = normalisiere(lead.website);
  const basis = { geprueftAm: new Date().toISOString().slice(0, 10) };
  if (!start) return { ...basis, erreichbar: false, fehler: "ungültige Adresse" };

  let seite;
  try {
    seite = await holeMitAusweichen(start);
  } catch (e) {
    const code = e.cause?.code ?? "";
    const grund =
      e.name === "TimeoutError"
        ? "Zeitüberschreitung"
        : (FEHLERTEXT[code] ?? (/CERT|SSL|TLS/.test(code) ? "Zertifikatsfehler" : code || e.message));
    return { ...basis, erreichbar: false, fehler: grund };
  }

  /* Veralteter Unterseiten-Link: stattdessen die Startseite derselben Adresse nehmen */
  if ([404, 410].includes(seite.status)) {
    const wurzel = new URL("/", seite.url).href;
    if (wurzel !== seite.url) {
      try {
        const neu = await hole(wurzel);
        if (neu.ok) seite = neu;
      } catch {
        /* Startseite ebenfalls nicht abrufbar */
      }
    }
  }
  if (!seite.ok) {
    /* 401/403/429: Die Seite lehnt automatische Abrufe ab, ist für Besucher aber meist erreichbar. */
    const blockiert = [401, 403, 429].includes(seite.status);
    return { ...basis, erreichbar: false, blockiert, status: seite.status, fehler: `Status ${seite.status}` };
  }

  const { html } = seite;
  const text = sichtbarerText(html);
  let anbieter = findeAnbieter(html);
  let buchung = anbieter ? "ja" : STICHWORTE.some((re) => re.test(text)) ? "vielleicht" : "nein";

  /* Fast leere Startseite: Der Inhalt wird vermutlich erst per Skript geladen
     und ist für diesen Check unsichtbar – dann lieber „unklar" als ein falsches „nein". */
  const textLaenge = text.replace(/\s+/g, " ").trim().length;
  if (buchung === "nein" && textLaenge < 600) buchung = "vielleicht";

  /* Bei unklarem Befund eine Ebene tiefer nachsehen: echte Buchung oder nur Formular? */
  if (buchung === "vielleicht") {
    const link = findeBuchungsLink(html, seite.url);
    if (link) {
      try {
        const unterseite = await hole(link);
        anbieter = findeAnbieter(unterseite.html);
        if (anbieter) buchung = "ja";
        else if (/<form\b/i.test(unterseite.html)) buchung = "anfrageformular";
      } catch {
        /* Unterseite nicht abrufbar – Befund bleibt unklar */
      }
    }
  }

  const klein = html.toLowerCase();
  const emails = [...new Set([...html.matchAll(/mailto:([^"'?>\s]+)/gi)].map((m) => m[1].toLowerCase()))].slice(0, 3);
  const titel = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "").replace(/\s+/g, " ").trim().slice(0, 120);

  return {
    ...basis,
    erreichbar: true,
    status: seite.status,
    endUrl: seite.url,
    https: seite.url.startsWith("https://"),
    ms: seite.ms,
    titel,
    viewport: /<meta[^>]+name=["']viewport/i.test(html),
    passt: passtZumBetrieb(lead, titel, text),
    textLaenge,
    buchung,
    anbieter,
    cms: CMS.find(([re]) => re.test(klein))?.[1] ?? null,
    copyrightJahr: neuestesCopyrightJahr(html),
    emails,
    whatsapp: /wa\.me\/|api\.whatsapp\.com/.test(klein),
  };
}

const leads = await liesJson(join(DATEN, "leads.json"), null);
if (!leads) {
  console.error("akquise/daten/leads.json fehlt – bitte zuerst Schritt 1 ausführen.");
  process.exit(1);
}

const pfad = join(DATEN, "checks.json");
const checks = arg("neu", false) ? {} : await liesJson(pfad, {});
const limit = Number(arg("limit", 0)) || Infinity;
const offen = leads.filter((l) => l.website && !l.kette && !checks[l.id]).slice(0, limit);

console.log(`${offen.length} Webseiten werden geprüft (${Object.keys(checks).length} bereits erledigt) …`);
let fertig = 0;
await parallel(offen, CONFIG.gleichzeitig, async (lead) => {
  checks[lead.id] = await pruefe(lead);
  fertig++;
  if (fertig % 25 === 0 || fertig === offen.length) {
    console.log(`  ${fertig}/${offen.length}`);
    await schreibJson(pfad, checks);
  }
});
await schreibJson(pfad, checks);

const alle = Object.values(checks);
const zaehle = (fn) => alle.filter(fn).length;
console.log(`\nErgebnis über ${alle.length} geprüfte Webseiten:`);
console.log(`  nicht erreichbar:          ${zaehle((c) => !c.erreichbar)}`);
console.log(`  Buchungssystem vorhanden:  ${zaehle((c) => c.buchung === "ja")}`);
console.log(`  nur Anfrageformular:       ${zaehle((c) => c.buchung === "anfrageformular")}`);
console.log(`  unklar:                    ${zaehle((c) => c.buchung === "vielleicht")}`);
console.log(`  keine Online-Buchung:      ${zaehle((c) => c.buchung === "nein")}`);
console.log(`  nicht handytauglich:       ${zaehle((c) => c.erreichbar && !c.viewport)}`);
