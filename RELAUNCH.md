# Relaunch qontex.de – November 2026

Neue Positionierung: **QonteX – IT. KI. Automatisierung.** Branchenübergreifender IT- und
KI-Dienstleister statt Spezialist für Gastronomie oder Kfz. Live seit 23.11.2026.

## Seitenstruktur

| Adresse | Inhalt |
|---|---|
| `/` | Startseite: Seitenkopf mit Systemkarte, fünf Leistungsbereiche, Anwendungsbeispiele mit Demo-Hinweis, So arbeiten wir, Technik, Für wen wir arbeiten und Zusagen, vier häufige Fragen, Kontakt |
| `/leistungen/` | Übersicht der fünf Leistungen, Querverweis auf Lösungen, ergänzend IT-Betreuung |
| `/leistungen/ki-entwicklung/` | KI-Entwicklung |
| `/leistungen/prozessautomatisierung/` | Prozessautomatisierung |
| `/leistungen/webentwicklung/` | Webentwicklung |
| `/leistungen/softwareentwicklung/` | Softwareentwicklung |
| `/leistungen/seo-marketingautomatisierung/` | SEO & Marketingautomatisierung |
| `/loesungen/` | Übersicht der fünf Lösungen |
| `/loesungen/ki-chatbots/`, `/telefon-ki/`, `/crm-automatisierung/`, `/termin-buchungssysteme/`, `/business-tools/` | Lösungsseiten |
| `/leistungen/managed-it/` u. a. (6 Seiten) | IT-Betreuung, unverändert im Inhalt, nur auf `/leistungen` und im Footer verlinkt |
| `/ueber/`, `/kontakt/`, `/impressum/`, `/datenschutz/`, `/demo/` | wie bisher, neu gestaltet |

**Weiterleitungen** (statischer Export, daher per `meta refresh`, `noindex`, `canonical` auf das Ziel):
`/automatisierung/` → Prozessautomatisierung · `/leistungen/webseiten/` → Webentwicklung ·
`seo-ki-agenten`, `marketing-automatisierung`, `online-marketing`, `social-media` → SEO & Marketingautomatisierung ·
`crm-vertrieb` → CRM-Automatisierung · `ki-agenten` → KI-Chatbots · `dashboards` → Business-Tools.
Liste in `lib/offers.ts` (`LEGACY_LEISTUNGEN`).

## Wo was gepflegt wird

- `lib/offers.ts` – alle Texte der Leistungs- und Lösungsseiten (eine Quelle für Menü, Übersichten, Detailseiten, Sitemap)
- `lib/examples.ts` – Anwendungsbeispiele (Startseite und Seitenköpfe), als Beispiele gekennzeichnet
- `lib/it-services.ts` – die sechs IT-Betreuungsseiten
- `lib/navigation.ts` – Hauptmenü
- `lib/company.ts` – Kontaktdaten, `CTA_LABEL` („Projekt besprechen“), Kurzbeschreibung
- `lib/faqs.ts` – häufige Fragen (Kontaktseite + strukturierte Daten), `HOME_FAQS` = Auswahl für die Startseite
- `lib/seo.ts` – `pageMeta()` (Titel, Beschreibung, canonical, Open Graph je Seite) und das Vorschaubild
- `components/OfferPage.tsx` – eine Vorlage für alle Detailseiten

## Designsystem

- **Farben** (`app/globals.css`, `@theme`): `night` #0a1220 (Grundton), `night-2/3`, `edge` (Linien auf Dunkel), `haze` (Text auf Dunkel), `dim`/`mist`/`edge-strong`/`core` (Grafiken), `fog` #eef2f6 (helle Abschnitte), `ink`/`text`/`muted` (Text auf Hell), `signal` #4cc9f0 (Cyan, Akzent auf Dunkel), `signal-ink` #0b63c4 (Links auf Hell). Alte Namen (`teal`, `soft`, `line` …) zeigen auf die neuen Werte, damit Demo und Formular weiter passen.
- **Fokusrahmen:** Variable `--focus-ring`, auf Hell Blau, in `.on-dark`-Bereichen Cyan. Dunkle Abschnitte tragen deshalb die Klasse `on-dark`.
- **Schrift:** nur Archivo (lokal eingebunden), Überschriften etwas breiter (`wdth` 106), Wortmarke ganz breit (`.wide`). Inter, Plus Jakarta Sans und Fira Sans sind entfernt.
- **Radien nach Ebene:** Flächen 18–20px, Bedienelemente 10px, kleine Marken 6px.
- **Bausteine** in `components/ui.tsx`: Buttons (`btnSignal`, `btnGhostDark`, `btnSolid`, `btnGhostLight`), `Section`, `SectionHead`, `SplitSection`, `CheckList`, `Note`.
- **Bewusst vermieden:** Mini-Labels über Überschriften, farbig hervorgehobenes Einzelwort, Pfeile in Buttons, lila Verläufe, Reihen gleicher Icon-Karten, Roboterbilder.

## Animationen

- **Systemkarte** (`components/home/SystemMap.tsx`): drei Beispielabläufe (Website-Anfrage, Auftrag per E-Mail, Anruf am Abend). Läuft nur, solange sie sichtbar ist; Pause-Knopf; Abläufe per Knopf wählbar – ein selbst gewählter Ablauf bleibt danach stehen. Bei „Bewegung reduzieren“ (auch wenn die Einstellung während des Besuchs wechselt) steht der fertige Zustand ohne Animation.
- **Anwendungsbeispiele** (`components/home/UseCases.tsx`): Register mit Tastatursteuerung (Pfeiltasten), Ablauf baut sich beim Wechsel auf.
- **So arbeiten wir** (`components/Process.tsx`): Linie füllt sich einmal beim Erscheinen.
- Leistungsfelder: eigene Strichgrafiken (`components/viz/ServiceViz.tsx`), Akzent wird beim Überfahren kräftiger.

## Entfernt

Alte Startseiten-Bausteine (Hero mit Beispielchat, Services-Liste, Marketing-Team, Einsparrechner, Automatisierungs-Ablauf, Steps), IT-Übersichtsbausteine mit Stockfotos (Infrastructure, Security, Cloud), `SmartAmbientVideo`/`lib/media.ts`, ungenutzte Bilder inkl. Roboter-Maskottchen. Alles bleibt in der Git-Historie (`main`, Stand `b497e93`).

## Bausteine (shadcn, Magic UI, Motion, React Bits)

Aus einer Nachbarsitzung übernommen (Zweig `bausteine`, Commit `04b52fa`):
`components.json`, `lib/utils.ts`, `app/bausteine.css`, `BAUSTEINE.md`, Pakete `motion`, `clsx`,
`tailwind-merge`, `tw-animate-css`. Die Farbnamen der Bausteine zeigen jetzt auf die neuen Tokens,
dazu ein `.dark`-Block für dunkle Abschnitte. Eingesetzt ist noch kein Baustein: Die Seite zeigt
mit eigenen Animationen, was QonteX verkauft. Leitlinie und passende Stellen in `BAUSTEINE.md`.
Achtung: Durch `app/bausteine.css` ist `bg-muted` jetzt die helle Fläche (`fog`), nicht mehr Grau.
Für graue Punkte oder Flächen `bg-ink/45` o. Ä. verwenden (`text-muted` bleibt grau).

## Prüfung nach dem Webseiten-Ablauf (23.11.2026)

1. `frontend-design` vor dem Bauen: Designplan (Farben, Archivo, Systemkarte als einziger Blickfang).
2. `impeccable`: Gestaltungskritik **27/40** und Technik-Audit **15/20** durch zwei unabhängige Prüfer
   (ohne Prüfprogramm, wie vereinbart). Danach behoben:
   - Fokusrahmen auf Hell zu blass (1,9 : 1) → kontextabhängig, jetzt ≈ 5,6 : 1
   - Open Graph je Seite statt geerbter Startseiten-Daten, Vorschaubild `public/images/og-qontex.png`
     (Kopie: `/Volumes/Medien/Bilder-Grafiken/Social-Media/2026-11-23_QonteX_Link-Vorschaubild.png`,
     Vorlage `docs/og-bild-vorlage.html`)
   - Schrift nur noch `latin` (86 KB weniger beim ersten Laden)
   - Menü: Klick nach dem Überfahren schließt nicht mehr sofort; Touch öffnet nur per Tippen
   - Systemkarte: Farben über Tokens, Knöpfe am Handy 44 px mit kurzen Namen, ausstehende
     Protokollzeilen als Platzhalter statt blasser Schrift, versteckte Variante animiert nicht mit
   - Kontaktformular: Rahmen deutlicher, Pflichtfelder für Vorlesehilfen markiert, Hinweis
     „Felder mit * sind Pflichtfelder“, Themenwahl freiwillig und auf 7 Punkte gekürzt;
     auf `/kontakt` steht das Formular direkt unter dem Seitenkopf
   - Wachstumsgrafik ohne steigende Balken (wirkte wie ein Erfolgsversprechen), Beispiel-Begriffe
     ohne klickbar wirkende Rahmen, Grafiken am Handy einheitlich oben
   - Anwendungsbeispiele am Handy als Raster statt seitlich verschobener Leiste;
     Buchungs-Demo als eigener Kasten statt Nebensatz
   - Startseite: vier häufige Fragen (Kosten, Mitarbeiter, Garantie, Datenschutz) vor dem Kontakt
   - Kleinere Texte („Unsere Grundsätze“ statt doppeltem „So arbeiten wir“), Sitemap mit festem Datum,
     Weiterleitungsseiten nur noch mit canonical
3. `web-design-guidelines` (Vercel): Markenname `translate="no"`, E-Mail-Feld ohne Rechtschreibprüfung,
   toter CSS-Code entfernt. Übrige Regeln erfüllt.


## SEO und Technik

- Eindeutige Titel (Vorlage `%s | QonteX`) und Beschreibungen je Seite (alle unter 160 Zeichen), `canonical`, Open Graph mit Vorschaubild
- JSON-LD: `ProfessionalService` (nur echte Firmendaten), je Detailseite `Service` + `BreadcrumbList`, Kontaktseite `FAQPage`
- `sitemap.xml` nur mit indexierbaren Seiten, `robots.txt`
- `theme-color`, deutsche 404-Seite, Sprunglink „Zum Inhalt springen“
