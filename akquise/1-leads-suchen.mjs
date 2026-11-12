/* Schritt 1: Restaurants und Kfz-Werkstätten im Zielort aus OpenStreetMap holen. */
import { join } from "node:path";
import { CONFIG } from "./config.mjs";
import { DATEN, schreibJson } from "./lib.mjs";

const SERVER = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"];

function abfrage(gebiet) {
  const filter = Object.values(CONFIG.branchen)
    .map((b) => `  nwr${b.osm}(area.a);`)
    .join("\n");
  return `[out:json][timeout:120];\n${gebiet}->.a;\n(\n${filter}\n);\nout center tags;`;
}

/* Die öffentlichen Kartenserver sind oft ausgelastet – deshalb mehrere Anläufe mit Pause. */
async function overpass(query) {
  let letzterFehler;
  for (let runde = 1; runde <= 4; runde++) {
    for (const url of SERVER) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": CONFIG.userAgent },
          body: `data=${encodeURIComponent(query)}`,
          signal: AbortSignal.timeout(170_000),
        });
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return (await res.json()).elements ?? [];
      } catch (e) {
        letzterFehler = e;
        console.warn(`  ${new URL(url).hostname}: ${e.message} (Anlauf ${runde})`);
      }
    }
    await new Promise((r) => setTimeout(r, runde * 15_000));
  }
  throw new Error(`Kartenserver nicht erreichbar: ${letzterFehler.message}`);
}

function zuLead(el) {
  const t = el.tags ?? {};
  if (!t.name) return null;
  const branche = t.amenity === "restaurant" ? "restaurant" : "werkstatt";
  return {
    id: `${el.type}/${el.id}`,
    branche,
    name: t.name.trim(),
    strasse: [t["addr:street"], t["addr:housenumber"]].filter(Boolean).join(" "),
    plz: t["addr:postcode"] ?? "",
    ort: t["addr:city"] ?? CONFIG.ort,
    telefon: t.phone ?? t["contact:phone"] ?? "",
    email: t.email ?? t["contact:email"] ?? "",
    website: t.website ?? t["contact:website"] ?? t.url ?? "",
    kueche: t.cuisine ?? "",
    kette: Boolean(t.brand || t["brand:wikidata"]),
  };
}

console.log(`Suche Betriebe in ${CONFIG.ort} …`);
let elemente = await overpass(abfrage(`area["de:amtlicher_gemeindeschluessel"="${CONFIG.ags}"]`));
if (elemente.length === 0) {
  console.log("  Kein Treffer über den Gemeindeschlüssel, versuche den Ortsnamen …");
  elemente = await overpass(abfrage(`area["name"="${CONFIG.ort}"]["admin_level"="6"]`));
}

const gesehen = new Set();
const leads = [];
for (const el of elemente) {
  const lead = zuLead(el);
  if (!lead) continue;
  const schluessel = `${lead.name.toLowerCase()}|${lead.strasse.toLowerCase()}`;
  if (gesehen.has(schluessel)) continue;
  gesehen.add(schluessel);
  leads.push(lead);
}
leads.sort((a, b) => a.name.localeCompare(b.name, "de"));

await schreibJson(join(DATEN, "leads.json"), leads);

const zaehle = (fn) => leads.filter(fn).length;
console.log(`\n${leads.length} Betriebe gespeichert in akquise/daten/leads.json`);
console.log(`  Restaurants:       ${zaehle((l) => l.branche === "restaurant")}`);
console.log(`  Kfz-Werkstätten:   ${zaehle((l) => l.branche === "werkstatt")}`);
console.log(`  mit Webseite:      ${zaehle((l) => l.website)}`);
console.log(`  mit Telefon:       ${zaehle((l) => l.telefon)}`);
console.log(`  mit Anschrift:     ${zaehle((l) => l.strasse && l.plz)}`);
console.log(`  Ketten-Filialen:   ${zaehle((l) => l.kette)}`);
