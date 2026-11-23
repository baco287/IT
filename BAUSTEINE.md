# Bausteine für die QonteX-Website

Eingerichtet am 23.11.2026 nach dem TikTok-Video „5 kostenlose Bausteine, damit deine
Website nicht nach KI aussieht“: **shadcn, Magic UI, Motion, UI UX Pro Max, React Bits**.

Grundsatz: Die Website ist QonteX' eigene Werbung. Ein Effekt kommt nur dorthin, wo er
etwas zeigt, das QonteX verkauft (ein Chat, der sich wie ein echter KI-Agent aufbaut;
eine Ersparnis, die hochzählt). Deko ohne Aussage bleibt weg.

## Was eingerichtet ist

| Baustein | Was es ist | Wo |
|---|---|---|
| **Motion** | Animations-Bibliothek (Einblenden, Scroll-Effekte, Übergänge) | npm-Paket `motion` (Version 12, passend zu React Bits), Import `motion/react` |
| **shadcn** | Grundbausteine (Akkordeon, Menüs, Dialoge, Formularfelder …) und das Werkzeug, mit dem alle anderen Bausteine geholt werden | `components.json` |
| **Magic UI** | Animierte Bausteine (hochzählende Zahlen, Laufband, Listen, die sich aufbauen) | Quelle `@magicui` in `components.json` |
| **React Bits** | Text- und Hintergrund-Effekte (Text-Einblendung, Zähler …) | Quelle `@react-bits` in `components.json` |
| **UI UX Pro Max** | Claude-Skill mit Stil-, Farb- und Schrift-Datenbank. Vorschläge gegen die QonteX-Regeln prüfen: Für QonteX schlug er z. B. Plus Jakarta Sans vor, die auf der Liste der KI-typischen Schriften steht | `~/.claude/skills/ui-ux-pro-max` (gilt für alle Projekte) |

Dazu:
- `app/bausteine.css` – Farbnamen der Bausteine (`primary`, `muted-foreground`, `border` …)
  zeigen auf die QonteX-Farben. Ein eingefügter Baustein sieht dadurch sofort nach QonteX aus.
  Wird in `app/globals.css` geladen, zusammen mit `tw-animate-css` (Ein-/Ausblenden).
- `lib/utils.ts` – Hilfsfunktion `cn()`, die Magic UI und React Bits erwarten.

## Baustein holen (für Claude)

```bash
npx shadcn@latest search @magicui -q "marquee"        # suchen
npx shadcn@latest view @magicui/marquee               # Code ansehen, bevor er eingefügt wird
npx shadcn@latest add @magicui/marquee                # einfügen
npx shadcn@latest add @react-bits/SplitText-TS-TW     # React Bits: immer die Variante -TS-TW
npx shadcn@latest add accordion                       # shadcn-Grundbaustein
```

Ablage: shadcn und Magic UI → `components/bausteine/ui/`, React Bits → `components/bausteine/`.
Das eigene Design-System bleibt `components/ui.tsx` (Buttons, Abschnitte, Listen) – nicht
verwechseln, nicht ersetzen.

## Nach dem Einfügen – Pflicht

1. **Farben:** fest eingebaute Farben (`text-black`, `bg-white`, Lila/Blau-Verläufe,
   Regenbogen) auf QonteX umstellen. Seit dem Relaunch (11/2026): `night`, `night-2`, `edge`,
   `haze` für dunkle Flächen, `fog`, `rule`, `ink`, `text`, `muted` für helle,
   `signal` (Cyan auf Dunkel) und `signal-ink` (Blau auf Hell) als Akzent. Die alten Namen
   `teal`, `soft`, `line` funktionieren noch, sollen aber nicht mehr neu verwendet werden.
2. **Zahlen und Daten deutsch:** `Intl.NumberFormat("de-DE")` – Magic UI `number-ticker`
   formatiert sonst „42,120“ statt „42.120“.
3. **Texte deutsch**, keine englischen Platzhalter.
4. **Weniger Bewegung respektieren:** `useReducedMotion()` aus `motion/react` bzw.
   `prefers-reduced-motion`; Endlos-Schleifen nur, wo sie etwas erklären.
5. `dark:`-Klassen in Bausteinen wirken nur unter `class="dark"`, nicht nach
   Systemeinstellung (sonst stünde auf Handys im Dunkelmodus weiße Schrift auf weißem Grund).
   Auf dunklen Abschnitten (`bg-night`) `class="dark"` setzen, dann greifen die dunklen Werte
   aus `app/bausteine.css`.
6. Prüfen: `npx tsc --noEmit`, `npx eslint .`, `npm run build`, im Browser Desktop und
   Handy ansehen, Konsole ohne Fehler.

Neuere shadcn-Grundbausteine importieren `cn` aus dem npm-Paket `cn` (wird automatisch
installiert), Magic UI und React Bits aus `@/lib/utils` – beides ist in Ordnung.

## Was zu QonteX passt

Seit dem Relaunch (11/2026) hat die Seite eigene Animationen, die bereits zeigen, was QonteX
verkauft: die Systemkarte im Seitenkopf (`components/home/SystemMap.tsx`), die Abläufe der
Anwendungsbeispiele (`components/viz/FlowDiagram.tsx`) und die Linie bei „So arbeiten wir“.
Bausteine kommen nur dazu, wo sie etwas Neues zeigen:

| Stelle | Baustein |
|---|---|
| Ein echter Beispiel-Chat (z. B. auf der Seite KI-Chatbots): Nachrichten erscheinen nacheinander | Magic UI `animated-list` oder Motion |
| Ein Rechner, dessen Ergebnis hochzählt (falls wieder gewünscht) | Magic UI `number-ticker` oder React Bits `CountUp-TS-TW` |
| Echte Kundenlogos oder echte Stimmen (nur wenn vorhanden) | Magic UI `marquee` |
| Häufige Fragen | shadcn `accordion` (heute eigene Lösung in `components/Faq.tsx`) |

Bewusst nicht: Überschriften oder Abschnitte einzeln beim Scrollen einblenden. Die Seite hat
einen gezielten Bewegungsmoment (Systemkarte); überall verteilte Einblendungen wirken nach Vorlage.

**Nicht verwenden** (wirkt nach KI-Vorlage, siehe `../CLAUDE.md`): Aurora- und
Verlaufs-Hintergründe (`@react-bits/Aurora…`, `@magicui/aurora-text`,
`animated-gradient-text`), Glitch-Text, Partikel- und Sternenhimmel-Hintergründe,
Schimmer-Buttons, Reihen gleich großer Karten mit Icon + Titel + Text.
