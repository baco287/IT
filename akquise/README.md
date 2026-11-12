# Akquise-Agent

Findet Restaurants und Kfz-Werkstätten im Zielort, prüft deren Webseiten und
entwirft passende Anschreiben. **Der Agent versendet nichts** – er liefert die
Liste, die Befunde und die Entwürfe. Verschickt wird bewusst von Hand bzw. über
einen Briefdienst.

## Ablauf

```bash
npm run akquise
```

Das führt drei Schritte nacheinander aus. Einzeln geht es auch:

| Befehl | Was passiert |
|---|---|
| `npm run akquise:suchen` | Holt alle Betriebe aus OpenStreetMap nach `daten/leads.json` |
| `npm run akquise:pruefen` | Ruft je Betrieb die Startseite ab und sucht nach Online-Buchung, Handy-Tauglichkeit und Ladezeit (`daten/checks.json`) |
| `npm run akquise:anschreiben` | Bewertet die Betriebe und erzeugt `ausgabe/uebersicht.html`, `ausgabe/leads.csv` und `ausgabe/briefe/` |

Der Webseiten-Check merkt sich, was er schon geprüft hat. Mit
`node akquise/2-webseiten-pruefen.mjs --neu` wird alles frisch geprüft, mit
`--limit 50` nur ein Teil.

## Ergebnis ansehen

`ausgabe/uebersicht.html` im Browser öffnen. Dort lassen sich die Betriebe
filtern, die Entwürfe kopieren und pro Betrieb ein Status setzen (der Status
wird nur in diesem Browser gespeichert).

## Bewertung

Jeder Betrieb bekommt 0 bis 100 Punkte. Ein Anschreiben gibt es ab
`mindestScore` (Standard 70, siehe `config.mjs`).

| Befund | Punkte |
|---|---|
| Webseite geprüft, keine Online-Buchung | 85 |
| Nur Anfrageformular, keine Sofortbuchung | 70 |
| Keine Webseite bekannt oder nicht abrufbar | 55 |
| Reservierung erwähnt, aber unklar | 45 |
| Webseite blockiert automatische Prüfung | 40 |
| Buchungssystem vorhanden | 15 |
| Filiale einer Kette | 5 |

Zuschläge: nicht handytauglich +8, langsam +5, veraltet +4, ohne https +3.

Die Prüfung ist eine Heuristik. Befunde mit der Markierung „prüfen“ – und im
Zweifel jeden Betrieb – vor dem Versand kurz auf der Webseite gegenlesen.

## Rechtliche Leitplanken

- **Brief per Post** ist für Werbung an Unternehmen der sichere Weg, solange
  der Empfänger nicht widersprochen hat.
- **E-Mail, Kontaktformular, WhatsApp und Social-Media-Nachrichten** brauchen
  nach § 7 UWG die vorherige ausdrückliche Einwilligung – auch zwischen
  Unternehmen. Die E-Mail-Entwürfe sind deshalb nur für Betriebe gedacht, die
  zugestimmt haben, zum Beispiel am Telefon.
- **Anrufe** bei Unternehmen setzen mindestens ein mutmaßliches Interesse
  voraus. Automatische Anrufmaschinen (auch KI-Stimmen) brauchen eine
  ausdrückliche Einwilligung.
- **Widerspruch:** Wer keine Post mehr möchte, kommt sofort in
  `sperrliste.txt`. Der Hinweis darauf steht in jedem Brief.

Das ist keine Rechtsberatung. Vor dem ersten größeren Versand lohnt ein kurzer
Blick eines Anwalts oder der IHK auf Anschreiben und Vorgehen.

## Daten

`daten/` und `ausgabe/` enthalten Kontaktdaten echter Betriebe und stehen in
`.gitignore` – sie gehören nicht ins Repository.
