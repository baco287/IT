export type ServiceChannel = {
  key: "whatsapp" | "telefon" | "mail";
  title: string;
  text: string;
  points: string[];
};

/** kern = Kernleistungen, ergaenzend = passende Zusatzleistungen, it = IT & Infrastruktur */
export type ServiceGroup = "kern" | "ergaenzend" | "it";

export type Service = {
  slug: string;
  group: ServiceGroup;
  name: string;
  /** Ein Satz für Karten und Übersichten */
  teaser: string;
  title: string;
  metaDescription: string;
  intro: string;
  /** Für wen eignet sich die Leistung? – 1 Satz */
  audience: string;
  /** Welches Problem wird gelöst? – 1–2 Sätze aus Kundensicht */
  problem: string;
  scopeTitle: string;
  scope: string[];
  /** Hinweis-Kasten, z. B. zur Qualitätssicherung bei KI-Inhalten */
  note?: { title: string; text: string };
  /** Zusammenhang als Kette, z. B. von der Sichtbarkeit bis zur Messung */
  chainTitle?: string;
  chainIntro?: string;
  chain?: { title: string; text: string }[];
  /** Konzeptioneller Vorher-Nachher-Vergleich (als Beispiel gekennzeichnet) */
  compare?: { before: string[]; after: string[] };
  channelsTitle?: string;
  channelsIntro?: string;
  channels?: ServiceChannel[];
  benefits: { title: string; text: string }[];
  ctaText: string;
};

export const SERVICES: Service[] = [
  {
    slug: "prozessautomatisierung",
    group: "kern",
    name: "Prozessautomatisierung",
    teaser:
      "Wiederkehrende Aufgaben digitalisieren und Systeme verbinden – für weniger Handarbeit im Alltag.",
    title: "Prozesse digitalisieren und automatisieren",
    metaDescription:
      "Prozessautomatisierung von QonteX: Wir digitalisieren wiederkehrende Aufgaben und verbinden Ihre Systeme – für weniger manuelle Arbeit, kürzere Bearbeitungszeiten und mehr Zeit für Ihr Geschäft.",
    intro:
      "Wir digitalisieren wiederkehrende Aufgaben und verbinden Ihre Systeme, damit Ihr Team weniger manuelle Arbeit erledigen muss. Dabei beginnen wir mit den Abläufen, die am meisten Zeit kosten – und automatisieren nur, was sich im Alltag bewährt.",
    audience:
      "Für Unternehmen, in denen Anfragen, Angebote, Termine oder Daten noch von Hand übertragen, abgetippt oder nachverfolgt werden.",
    problem:
      "Mitarbeiter verbringen viel Zeit mit Routine: Daten von einem System ins andere übertragen, Standardfragen beantworten, Terminen hinterhertelefonieren. Das kostet Arbeitszeit, führt zu Fehlern und bremst das Wachstum.",
    scopeTitle: "Das setzen wir für Sie um",
    scope: [
      "Analyse Ihrer Abläufe und der größten Zeitfresser",
      "Automatische Antworten auf wiederkehrende Kundenanfragen",
      "Digitale Angebots- und Anfrageprozesse",
      "Online-Terminbuchung mit Erinnerungen",
      "Datenerfassung und Weiterleitung an die richtige Stelle",
      "Verbindung Ihrer Systeme, z. B. Website, E-Mail, CRM und Kalender",
      "Test, Einführung und laufende Betreuung der Abläufe",
    ],
    benefits: [
      {
        title: "Zeit zurückgewinnen",
        text: "Routineaufgaben laufen automatisch – Ihr Team kümmert sich um Kunden und Kerngeschäft.",
      },
      {
        title: "Weniger Fehler",
        text: "Daten werden einmal erfasst und automatisch weitergegeben, statt mehrfach abgetippt.",
      },
      {
        title: "Wachsen ohne Mehraufwand",
        text: "Mehr Anfragen bedeuten nicht automatisch mehr Verwaltungsarbeit.",
      },
    ],
    ctaText:
      "Lassen Sie uns gemeinsam herausfinden, welche Abläufe in Ihrem Unternehmen sich sinnvoll automatisieren lassen.",
  },
  {
    slug: "webseiten",
    group: "kern",
    name: "Webseiten & Landingpages",
    teaser:
      "Webseiten und Landingpages, die schnell laden, überzeugen und Anfragen bringen können.",
    title: "Webseiten, die für Ihr Unternehmen arbeiten.",
    metaDescription:
      "Webseiten und Landingpages von QonteX: Wir erstellen und optimieren Webseiten, die schnell laden, verständlich überzeugen und Besucher in qualifizierte Kundenanfragen verwandeln können.",
    intro:
      "Wir erstellen und optimieren Webseiten, die Besucher überzeugen und in qualifizierte Kundenanfragen verwandeln können. Dafür denken wir Sichtbarkeit, Inhalte, Kontaktwege und die Verarbeitung der Anfragen von Anfang an zusammen.",
    audience:
      "Für Unternehmen, deren Website zwar existiert, aber kaum Anfragen bringt – und für alle, die für ein Angebot oder eine Kampagne eine eigene Landingpage brauchen.",
    problem:
      "Die Website lädt langsam, erklärt das Angebot nicht klar und führt Besucher nicht zum Kontakt. Anfragen, die trotzdem ankommen, werden von Hand weitergeleitet und gehen im Alltag leicht unter.",
    scopeTitle: "Das setzen wir für Sie um",
    scope: [
      "Unternehmenswebseiten – neu erstellt oder überarbeitet",
      "Landingpages für Angebote und Kampagnen",
      "Conversion-Optimierung: klare Botschaften und Kontaktwege",
      "Ladezeitoptimierung und mobile Darstellung",
      "A/B-Tests und Auswertung des Nutzerverhaltens",
      "Formular- und CRM-Anbindung",
      "Online-Shops, Hosting in Deutschland und laufende Pflege",
    ],
    chainTitle: "Vom Suchergebnis zur Kundenanfrage",
    chainIntro:
      "Eine Website bringt dann Anfragen, wenn sechs Dinge zusammenpassen. Wir kümmern uns um die ganze Kette – nicht nur um das Design.",
    chain: [
      {
        title: "Sichtbarkeit in Google",
        text: "Ihre Seite wird zu den Themen gefunden, nach denen Ihre Kunden suchen.",
      },
      {
        title: "Relevante Besucher",
        text: "Es kommen die Menschen auf die Seite, für die Ihr Angebot gedacht ist.",
      },
      {
        title: "Überzeugende Landingpages",
        text: "Besucher verstehen sofort, was Sie anbieten und was der nächste Schritt ist.",
      },
      {
        title: "Qualifizierte Kundenanfragen",
        text: "Formulare fragen das ab, was Sie für ein gutes Erstgespräch brauchen.",
      },
      {
        title: "CRM und automatisiertes Follow-up",
        text: "Anfragen landen strukturiert im System und werden zuverlässig nachverfolgt.",
      },
      {
        title: "Messung und Optimierung",
        text: "Wir messen, was funktioniert, und verbessern die Seite Schritt für Schritt.",
      },
    ],
    compare: {
      before: [
        "Langsame Website",
        "Unübersichtliche Inhalte",
        "Keine klare Handlungsaufforderung",
        "Anfragen werden manuell verwaltet",
      ],
      after: [
        "Optimierte Ladegeschwindigkeit",
        "Verständliche Angebotsseiten",
        "Klare Kontaktwege",
        "Strukturierte Lead-Verarbeitung",
        "Messbare Conversion-Ereignisse",
      ],
    },
    benefits: [
      {
        title: "Aus der Praxis",
        text: "Wir bauen Webseiten, die im Alltag funktionieren – für echte Unternehmen, nicht für Design-Wettbewerbe.",
      },
      {
        title: "Schnell und verständlich",
        text: "Kurze Ladezeiten, klare Inhalte und eine saubere mobile Darstellung ab dem ersten Tag.",
      },
      {
        title: "Betreut statt abgeliefert",
        text: "Nach dem Start bleiben wir dran – Updates, Sicherheit und Änderungen inklusive.",
      },
    ],
    ctaText:
      "Lassen Sie uns gemeinsam ansehen, wo Ihre Website heute Anfragen verliert – und wie sie für Ihr Unternehmen arbeiten kann.",
  },
  {
    slug: "seo-ki-agenten",
    group: "kern",
    name: "SEO & KI-Agenten",
    teaser:
      "Bessere Sichtbarkeit bei Google – mit KI-gestützter Analyse und menschlicher Qualitätskontrolle.",
    title: "SEO und KI-gestützte SEO-Agenten",
    metaDescription:
      "SEO von QonteX: technische Audits, Keyword-Recherche, Contentplanung und Monitoring – unterstützt durch KI-Agenten und von Menschen qualitätsgesichert. Ohne Ranking-Versprechen.",
    intro:
      "Wir verbessern Ihre Sichtbarkeit in Suchmaschinen und automatisieren geeignete SEO-Arbeitsabläufe. KI-Agenten übernehmen dabei Recherche, Analyse und Vorarbeit – Bewertung und Freigabe bleiben bei Menschen.",
    audience:
      "Für Unternehmen, die bei Google zu ihren Leistungen besser gefunden werden möchten und SEO bisher nur sporadisch oder gar nicht betreiben.",
    problem:
      "Die Website erscheint bei wichtigen Suchanfragen nicht auf den vorderen Plätzen, und niemand hat Zeit, sich regelmäßig darum zu kümmern. Technische Fehler bleiben unbemerkt, neue Inhalte entstehen ohne Plan.",
    scopeTitle: "Das übernehmen wir für Sie",
    scope: [
      "Technische SEO-Audits Ihrer Website",
      "Keyword-Recherche zu Ihren Leistungen und Ihrer Region",
      "Themen- und Contentplanung",
      "Content-Briefings für Ihre Texte",
      "Interne Verlinkung und Seitenstruktur",
      "SEO-Monitoring mit verständlichen Berichten",
      "KI-gestützte Analyse und Optimierungsvorschläge",
    ],
    note: {
      title: "Qualität vor Menge",
      text: "KI-gestützte Entwürfe werden vor einer Veröffentlichung von Menschen geprüft und überarbeitet. Wir veröffentlichen keine automatisch erzeugten Massentexte – und wir geben keine Ranking-Garantien, weil sie niemand seriös geben kann.",
    },
    benefits: [
      {
        title: "Kontinuierlich statt sporadisch",
        text: "Agenten prüfen Ihre Seite laufend – Probleme fallen auf, bevor sie Sichtbarkeit kosten.",
      },
      {
        title: "Verständliche Berichte",
        text: "Sie sehen, was getan wurde, was es gebracht hat und was als Nächstes ansteht.",
      },
      {
        title: "Menschen entscheiden",
        text: "KI liefert Vorarbeit und Vorschläge. Was veröffentlicht wird, geben Menschen frei.",
      },
    ],
    ctaText:
      "Lassen Sie uns prüfen, wie Ihre Website heute bei Google dasteht – und welche Schritte sich für Sie lohnen.",
  },
  {
    slug: "marketing-automatisierung",
    group: "kern",
    name: "Marketing-Automatisierung",
    teaser:
      "KI-Agenten und Marketing-Tools, die Inhalte, Kampagnen und Auswertungen vorbereiten.",
    title: "Ihr automatisiertes Marketing-Team",
    metaDescription:
      "Marketing-Automatisierung von QonteX: Wir verbinden Marketing-Tools und spezialisierte KI-Agenten, um Kampagnen, Inhalte und Kundenanfragen effizienter zu organisieren – mit Freigabe durch Ihr Team.",
    intro:
      "Wir verbinden Marketing-Tools und spezialisierte KI-Agenten, um Kampagnen, Inhalte und Kundenanfragen effizienter zu organisieren. Ihr Team behält die Kontrolle über Strategie und Freigaben.",
    audience:
      "Für Unternehmen, die regelmäßig Marketing betreiben möchten, aber kein eigenes Marketing-Team haben – oder deren Team in Routineaufgaben untergeht.",
    problem:
      "Marketing passiert nur, wenn gerade Zeit ist: Beiträge, Newsletter und Kampagnen entstehen unregelmäßig, Auswertungen werden von Hand zusammengetragen und Interessenten nicht konsequent nachverfolgt.",
    scopeTitle: "Das setzen wir für Sie um",
    scope: [
      "Contentplanung mit Themen und Redaktionsplan",
      "Social-Media-Workflows von der Idee bis zur Freigabe",
      "Kampagnenvorbereitung für Google und Meta",
      "E-Mail-Automatisierung, z. B. Willkommens- und Erinnerungsstrecken",
      "Lead-Nurturing: Interessenten mit passenden Informationen begleiten",
      "Performance-Reporting ohne Handarbeit",
      "Marketing-Analysen mit konkreten Empfehlungen",
    ],
    note: {
      title: "Die Freigabe bleibt bei Ihnen",
      text: "Kein Agent veröffentlicht Inhalte, versendet Werbung oder startet Kampagnen ohne Ihre Freigabe. E-Mail-Werbung erfolgt nur mit Einwilligung der Empfänger.",
    },
    benefits: [
      {
        title: "Regelmäßig statt sporadisch",
        text: "Feste Abläufe sorgen dafür, dass Marketing auch in vollen Wochen stattfindet.",
      },
      {
        title: "Weniger Handarbeit",
        text: "Recherche, Entwürfe und Auswertungen entstehen automatisch – Ihr Team prüft und entscheidet.",
      },
      {
        title: "Alles im Blick",
        text: "Ein Bericht zeigt, was Kampagnen und Inhalte tatsächlich gebracht haben.",
      },
    ],
    ctaText:
      "Lassen Sie uns besprechen, welche Marketingaufgaben sich in Ihrem Unternehmen sinnvoll automatisieren lassen.",
  },
  {
    slug: "crm-vertrieb",
    group: "kern",
    name: "CRM & Vertrieb",
    teaser:
      "Anfragen strukturiert erfassen, automatisch nachverfolgen und verständlich auswerten.",
    title: "CRM-Integration und Vertriebsautomatisierung",
    metaDescription:
      "CRM & Vertrieb von QonteX: Wir binden Website, Formulare und Kommunikationskanäle an Ihr CRM an und automatisieren Nachverfolgung, Terminbuchung und Auswertung.",
    intro:
      "Wir sorgen dafür, dass keine Anfrage verloren geht: Website, Formulare und Kommunikationskanäle werden an Ihr CRM angebunden, Rückmeldungen und Termine automatisch angestoßen und die Ergebnisse verständlich ausgewertet.",
    audience:
      "Für Unternehmen, die regelmäßig Anfragen erhalten und sie heute per E-Mail, Zettel oder Excel-Liste nachverfolgen.",
    problem:
      "Anfragen kommen über Website, Telefon und Messenger herein, aber nicht an einem Ort zusammen. Rückrufe werden vergessen, Angebote nicht nachgefasst – und niemand weiß genau, woher die besten Kunden kommen.",
    scopeTitle: "Das setzen wir für Sie um",
    scope: [
      "Einrichtung eines passenden CRM – oder Anbindung Ihres bestehenden Systems",
      "Automatische Übergabe von Anfragen aus Website, Formularen und Messengern",
      "Vorqualifizierung nach Ihren Kriterien",
      "Erinnerungen und automatisches Follow-up",
      "Online-Terminbuchung mit Kalenderanbindung",
      "Auswertungen zu Herkunft, Bearbeitungszeit und Abschlüssen",
      "Datenschutzbewusste Umsetzung mit den nötigen Einwilligungen",
    ],
    benefits: [
      {
        title: "Keine Anfrage geht verloren",
        text: "Jede Anfrage landet strukturiert an einem Ort und hat einen klaren nächsten Schritt.",
      },
      {
        title: "Schnellere Rückmeldung",
        text: "Interessenten erhalten zeitnah eine Antwort oder einen Terminvorschlag.",
      },
      {
        title: "Vertrieb mit Überblick",
        text: "Sie sehen, welche Kanäle Anfragen bringen und wo Abschlüsse entstehen.",
      },
    ],
    ctaText:
      "Lassen Sie uns ansehen, wie Anfragen heute durch Ihr Unternehmen laufen – und wo sie hängen bleiben.",
  },
  {
    slug: "ki-agenten",
    group: "ergaenzend",
    name: "KI-Agenten für Kundenanfragen",
    teaser:
      "Kundenanfragen über WhatsApp, Telefon und E-Mail automatisch aufnehmen und beantworten.",
    title: "KI-Agenten und Automatisierung",
    metaDescription:
      "KI-Agenten von QonteX: Individuelle KI-Assistenten und Automatisierungen, die wiederkehrende Aufgaben übernehmen – integriert in Ihre Systeme, mit klaren Kontrollmechanismen.",
    intro:
      "Künstliche Intelligenz ist für uns kein Buzzword, sondern ein Werkzeug: Wir entwickeln KI-Agenten, die wiederkehrende Aufgaben in Ihrem Unternehmen übernehmen – von der E-Mail-Vorsortierung über Dokumentenverarbeitung bis zum internen Wissensassistenten. Integriert in Ihre bestehenden Systeme, mit klaren Kontrollmechanismen und menschlicher Freigabe, wo sie hingehört.",
    audience:
      "Für Unternehmen, die viele gleichartige Anfragen per WhatsApp, Telefon oder E-Mail erhalten oder deren Team viel Zeit mit wiederkehrender Büroarbeit verbringt.",
    problem:
      "Anrufe gehen verloren, E-Mails bleiben liegen und Mitarbeiter beantworten jeden Tag dieselben Fragen. Für die eigentliche Arbeit mit Kunden bleibt dadurch zu wenig Zeit.",
    scopeTitle: "Das entwickeln wir für Sie",
    scope: [
      "Analyse, welche Prozesse sich sinnvoll automatisieren lassen",
      "Individuelle KI-Agenten für wiederkehrende Aufgaben",
      "Chat-Assistenten für Ihre Website oder Ihr Team",
      "Automatisierte Verarbeitung von Dokumenten und E-Mails",
      "Anbindung an Ihre Systeme (E-Mail, CRM, Microsoft 365)",
      "Kontrollmechanismen und menschliche Freigabeschritte",
      "Betrieb, Überwachung und laufende Verbesserung",
    ],
    channelsTitle: "Automatisierung dort, wo Ihre Kunden sind",
    channelsIntro:
      "Die meisten Anfragen erreichen Unternehmen über drei Kanäle: WhatsApp, Telefon und E-Mail. Genau dort setzen unsere KI-Agenten an – rund um die Uhr erreichbar, mit Übergabe an Ihr Team, sobald es persönlich werden soll.",
    channels: [
      {
        key: "whatsapp",
        title: "WhatsApp-Assistent",
        text: "Ihre Kunden schreiben, wann es ihnen passt – Ihr KI-Assistent antwortet sofort, auch abends und am Wochenende. Er beantwortet wiederkehrende Fragen, nimmt Anliegen strukturiert auf und übergibt an Ihr Team, sobald ein Mensch gefragt ist.",
        points: [
          "Sofortige Antworten auf häufige Fragen – rund um die Uhr",
          "Termin- und Rückrufanfragen strukturiert aufnehmen",
          "Vorqualifizierung: Anliegen, Kontaktdaten, Dringlichkeit",
          "Nahtlose Übergabe an Mitarbeiter im richtigen Moment",
        ],
      },
      {
        key: "telefon",
        title: "Telefon-Assistent",
        text: "Kein Anruf geht mehr verloren: Der KI-Telefonassistent nimmt Gespräche an, wenn Ihr Team belegt oder außerhalb der Zeiten ist. Er versteht das Anliegen, nimmt Rückrufwünsche auf und fasst jedes Gespräch schriftlich für Sie zusammen.",
        points: [
          "Anrufannahme bei Besetzt, Abwesenheit und nach Feierabend",
          "Anliegen und Rückrufwünsche strukturiert erfassen",
          "Schriftliche Gesprächszusammenfassung in Ihr Postfach oder CRM",
          "Weiterleitung dringender Anrufe nach Ihren Regeln",
        ],
      },
      {
        key: "mail",
        title: "E-Mail-Assistent",
        text: "Ihr Postfach sortiert sich selbst: Der E-Mail-Agent kategorisiert eingehende Nachrichten, beantwortet Standardanfragen und legt für alles andere fertige Antwortentwürfe bereit – Sie geben nur noch frei.",
        points: [
          "Automatische Kategorisierung und Priorisierung des Posteingangs",
          "Sofortantworten für Standardanfragen, Entwürfe für den Rest",
          "Zusammenfassung langer E-Mail-Verläufe auf den Punkt",
          "Übergabe an das richtige Teammitglied oder Ihr CRM",
        ],
      },
    ],
    benefits: [
      {
        title: "Zeit für das Wesentliche",
        text: "Routineaufgaben laufen automatisch – Ihr Team kümmert sich um das, was Menschen besser können.",
      },
      {
        title: "Integriert statt Insellösung",
        text: "Agenten arbeiten in Ihren bestehenden Systemen, nicht in einem weiteren Tool daneben.",
      },
      {
        title: "Verantwortungsvoll eingesetzt",
        text: "Datenschutzbewusste Umsetzung, nachvollziehbare Ergebnisse und Kontrolle bleiben bei Ihnen.",
      },
    ],
    ctaText:
      "Lassen Sie uns gemeinsam herausfinden, welche Aufgaben in Ihrem Unternehmen ein KI-Agent übernehmen kann.",
  },
  {
    slug: "online-marketing",
    group: "ergaenzend",
    name: "Online-Marketing & Werbeanzeigen",
    teaser:
      "Werbeanzeigen bei Google und Meta mit klarem Budget und verständlichem Bericht.",
    title: "Werbeanzeigen und Online-Marketing",
    metaDescription:
      "Online-Marketing von QonteX: Google Ads und Meta Ads mit klarem Budget, sauberem Tracking und ehrlichem Reporting – Kampagnen, die Anfragen bringen.",
    intro:
      "Werbebudget ist schnell ausgegeben – die Kunst ist, dass daraus Anfragen werden. Wir planen und betreiben Kampagnen auf Google und Meta mit sauberem Tracking, klaren Zielen und einem Reporting, das Sie wirklich verstehen: Was hat es gekostet, was kam dabei heraus.",
    audience:
      "Für Unternehmen, die über Google, Facebook oder Instagram gezielt neue Kunden und Anfragen gewinnen möchten – unabhängig davon, ob sie bereits werben oder neu einsteigen.",
    problem:
      "Es wird Geld für Werbung ausgegeben, aber niemand kann genau sagen, wie viele Anfragen daraus entstehen. Kampagnen laufen nebenher, ohne klares Ziel und ohne verständliche Auswertung.",
    scopeTitle: "Das übernehmen wir für Sie",
    scope: [
      "Strategie: Zielgruppen, Kanäle und realistisches Budget",
      "Google Ads: Suchkampagnen für Menschen, die aktiv suchen",
      "Meta Ads: Facebook- und Instagram-Anzeigen für Reichweite und Leads",
      "Landingpages, die aus Klicks Anfragen machen",
      "DSGVO-bewusstes Conversion-Tracking",
      "Monatliches Reporting in verständlicher Sprache",
    ],
    benefits: [
      {
        title: "Messbar statt gefühlt",
        text: "Jeder Euro ist nachvollziehbar – Sie sehen Kosten pro Anfrage, nicht nur Klickzahlen.",
      },
      {
        title: "Alles aus einer Hand",
        text: "Anzeige, Landingpage und Technik kommen vom selben Team – keine Reibungsverluste.",
      },
      {
        title: "Ehrliches Budget",
        text: "Wir sagen Ihnen auch, wenn ein Kanal für Ihr Geschäft nicht funktioniert.",
      },
    ],
    ctaText:
      "Lassen Sie uns durchrechnen, was eine Anfrage über Google oder Meta für Ihr Unternehmen kosten darf.",
  },
  {
    slug: "social-media",
    group: "ergaenzend",
    name: "Social Media",
    teaser:
      "Strategie, Inhalte und Betreuung Ihrer Kanäle – regelmäßig und planbar.",
    title: "Social-Media-Betreuung",
    metaDescription:
      "Social Media von QonteX: Strategie, Content-Erstellung und Betreuung Ihrer Kanäle auf Instagram, Facebook, LinkedIn und TikTok – konsistent und planbar.",
    intro:
      "Sichtbarkeit entsteht nicht durch einen viralen Zufallstreffer, sondern durch konstante, gute Inhalte. Wir entwickeln Ihre Social-Media-Strategie, produzieren Inhalte und betreuen Ihre Kanäle – damit Ihr Unternehmen dort präsent ist, wo Ihre Kunden täglich unterwegs sind.",
    audience:
      "Für Unternehmen, die auf Instagram, Facebook, LinkedIn oder TikTok regelmäßig sichtbar sein möchten, intern aber keine Zeit oder kein Personal dafür haben.",
    problem:
      "Die Social-Media-Kanäle werden nur sporadisch gepflegt, weil im Alltag die Zeit fehlt. Beiträge entstehen spontan und ohne Plan, und ob sie etwas bringen, weiß niemand.",
    scopeTitle: "Das machen wir für Sie",
    scope: [
      "Strategie: Kanäle, Themen und Tonalität passend zu Ihrer Marke",
      "Content-Erstellung: Grafiken, Kurzvideos und Texte",
      "Redaktionsplan und regelmäßige Veröffentlichung",
      "Betreuung von Instagram, Facebook, LinkedIn und TikTok",
      "Community-Management: Kommentare und Nachrichten im Blick",
      "Monatliche Auswertung: was funktioniert, was nicht",
    ],
    benefits: [
      {
        title: "Konstant statt sporadisch",
        text: "Ein fester Redaktionsplan sorgt für regelmäßige Präsenz – ohne dass Ihr Team daran denken muss.",
      },
      {
        title: "Zur Marke passend",
        text: "Inhalte in Ihrem Ton und Ihrem Look – nicht aus der Vorlagen-Fabrik.",
      },
      {
        title: "Verzahnt mit Ads",
        text: "Organische Inhalte und bezahlte Reichweite greifen ineinander statt nebeneinander zu laufen.",
      },
    ],
    ctaText:
      "Lassen Sie uns schauen, welche Kanäle für Ihr Unternehmen wirklich Sinn ergeben.",
  },
  {
    slug: "dashboards",
    group: "ergaenzend",
    name: "Dashboards & Reporting",
    teaser:
      "Wichtige Kennzahlen Ihres Unternehmens übersichtlich an einem Ort.",
    title: "Dashboards und Reporting",
    metaDescription:
      "Dashboards von QonteX: Individuelle Finanz-, Marketing- und IT-Dashboards, die Ihre Kennzahlen aus verschiedenen Quellen live auf einen Blick zeigen – statt Excel-Listen und manueller Reports.",
    intro:
      "Wichtige Zahlen liegen in den meisten Unternehmen verstreut in Excel-Listen, Tools und Postfächern. Wir entwickeln Dashboards, die Ihre Kennzahlen aus verschiedenen Quellen zusammenführen und live auf einen Blick zeigen – vom Umsatz über Kampagnen bis zum Zustand Ihrer IT. Damit Entscheidungen auf aktuellen Daten basieren statt auf dem Stand des letzten Monatsreports.",
    audience:
      "Für Geschäftsführer und Teams, die wichtige Kennzahlen aus Buchhaltung, Vertrieb, Marketing oder IT laufend im Blick behalten möchten, ohne dafür Listen von Hand zusammenzustellen.",
    problem:
      "Zahlen liegen verstreut in Excel-Listen, Buchhaltung und verschiedenen Programmen, und jeder aktuelle Überblick kostet viel Handarbeit. Entscheidungen werden deshalb oft auf Grundlage veralteter Zahlen getroffen.",
    scopeTitle: "Diese Dashboards bauen wir für Sie",
    scope: [
      "Finanz-Dashboards: Umsatz, Kosten und offene Posten auf einen Blick",
      "Marketing-Dashboards: Google Ads, Meta, Website- und Social-Media-Kennzahlen in einer Ansicht",
      "IT-Dashboards: Systemstatus, Backups und Tickets Ihrer gesamten Umgebung",
      "Anbindung Ihrer Datenquellen: Buchhaltung, Shops, Werbekonten, Microsoft 365",
      "Umsetzung als individuelle Web-Anwendung oder mit Power BI",
      "Zugriffsrechte, Hosting in Deutschland und laufende Betreuung",
    ],
    benefits: [
      {
        title: "Eine Zahl, eine Wahrheit",
        text: "Alle sehen dieselben aktuellen Kennzahlen – Diskussionen über veraltete Excel-Stände entfallen.",
      },
      {
        title: "Zeit zurückgewonnen",
        text: "Automatische Aktualisierung ersetzt das manuelle Zusammenkopieren von Monatsreports.",
      },
      {
        title: "Entscheidungen mit Grundlage",
        text: "Trends und Ausreißer werden sichtbar, wenn sie passieren – nicht Wochen später.",
      },
    ],
    ctaText:
      "Lassen Sie uns besprechen, welche Kennzahlen Ihr Unternehmen wirklich steuern – und wie ein Dashboard dafür aussehen kann.",
  },
  {
    slug: "managed-it",
    group: "it",
    name: "IT-Betreuung (Managed IT)",
    teaser:
      "Betrieb, Wartung, Updates und Support Ihrer gesamten IT aus einer Hand.",
    title: "Managed IT Services für Unternehmen",
    metaDescription:
      "Managed IT Services von QonteX: Wir betreiben, überwachen und pflegen Ihre komplette IT-Umgebung – planbar, dokumentiert und persönlich betreut.",
    intro:
      "Mit Managed IT Services übernimmt QonteX die kontinuierliche Verantwortung für Ihre IT-Umgebung – von Updates über Monitoring bis zur Weiterentwicklung. Sie erhalten planbare Kosten, dokumentierte Systeme und einen Ansprechpartner, der Ihre Umgebung wirklich kennt.",
    audience:
      "Für Unternehmen mit 5 bis 100 Arbeitsplätzen, die keine eigene IT-Abteilung haben oder ihre IT entlasten möchten.",
    problem:
      "Updates bleiben liegen, niemand fühlt sich zuständig und bei Störungen steht der Betrieb still. Die IT wird nebenbei erledigt – oft von jemandem, der eigentlich ganz andere Aufgaben hat.",
    scopeTitle: "Das übernehmen wir für Sie",
    scope: [
      "Laufender Betrieb und Pflege Ihrer Server, Clients und Dienste",
      "Regelmäßige Updates und Patch-Management",
      "Proaktives Monitoring mit definierten Reaktionswegen",
      "Verwaltung von Benutzerkonten und Berechtigungen",
      "Saubere Dokumentation aller Systeme und Zugänge",
      "Regelmäßige Empfehlungen zur Weiterentwicklung Ihrer IT",
    ],
    benefits: [
      {
        title: "Planbare Kosten",
        text: "Ein fester monatlicher Rahmen statt unkalkulierbarer Einzelrechnungen.",
      },
      {
        title: "Weniger Ausfälle",
        text: "Probleme werden erkannt und behoben, bevor sie den Betrieb stören.",
      },
      {
        title: "Klare Verantwortung",
        text: "Ein Partner, der Ihre Umgebung kennt – statt wechselnder Zuständigkeiten.",
      },
    ],
    ctaText: "Lassen Sie uns besprechen, wie eine Managed-IT-Betreuung für Ihr Unternehmen aussehen kann.",
  },
  {
    slug: "it-support",
    group: "it",
    name: "IT-Support",
    teaser:
      "Schnelle, verständliche Hilfe bei IT-Fragen – per Fernwartung oder vor Ort.",
    title: "IT-Support und Helpdesk",
    metaDescription:
      "IT-Support von QonteX: Schnelle, verständliche Hilfe bei allen IT-Fragen – per Fernwartung oder vor Ort, mit festen Ansprechpartnern.",
    intro:
      "Wenn etwas klemmt, brauchen Sie keine Warteschleife, sondern Hilfe. Unser Support erklärt verständlich, löst strukturiert und dokumentiert sauber – per Fernwartung oder direkt bei Ihnen vor Ort.",
    audience:
      "Für kleine und mittelständische Unternehmen, deren Mitarbeiter bei IT-Problemen im Arbeitsalltag schnell einen festen Ansprechpartner brauchen.",
    problem:
      "Bei IT-Problemen wissen Mitarbeiter nicht, wen sie fragen sollen, und verlieren Zeit mit Fehlersuche oder Warteschleifen. Kleine Störungen bremsen so jeden Tag die eigentliche Arbeit.",
    scopeTitle: "So unterstützen wir Sie",
    scope: [
      "Direkter Support per Telefon, E-Mail und Fernwartung",
      "Vor-Ort-Einsätze, wenn es die Situation erfordert",
      "Unterstützung für Arbeitsplätze, Drucker, Software und Zubehör",
      "Einrichtung neuer Geräte und Arbeitsplätze",
      "Hilfe bei Microsoft 365, E-Mail und Standardanwendungen",
      "Verständliche Rückmeldung statt Fachchinesisch",
    ],
    benefits: [
      {
        title: "Feste Ansprechpartner",
        text: "Sie sprechen mit Menschen, die Ihre Systeme kennen – kein anonymes Ticketsystem.",
      },
      {
        title: "Schnelle Reaktion",
        text: "Kritische Störungen behandeln wir mit Priorität, Reaktionszeiten vereinbaren wir verbindlich.",
      },
      {
        title: "Nachvollziehbar",
        text: "Jede Anfrage wird dokumentiert – Sie sehen, was wann gelöst wurde.",
      },
    ],
    ctaText: "Erzählen Sie uns, wo es bei Ihnen aktuell hakt – wir sagen Ihnen ehrlich, wie wir helfen können.",
  },
  {
    slug: "cloud-loesungen",
    group: "it",
    name: "Cloud & Microsoft 365",
    teaser:
      "Moderne Arbeitsplätze, sichere Daten und zuverlässige Zusammenarbeit.",
    title: "Cloud-Lösungen und Microsoft 365",
    metaDescription:
      "Cloud-Lösungen von QonteX: Migration, Microsoft 365, sichere Remote-Arbeitsplätze und hybride Infrastrukturen – zentral verwaltet und DSGVO-bewusst.",
    intro:
      "Die Cloud ist kein Selbstzweck: Richtig geplant senkt sie Aufwand, verbessert die Zusammenarbeit und macht ortsunabhängiges Arbeiten sicher. Wir begleiten Sie von der Entscheidung über die Migration bis zum laufenden Betrieb.",
    audience:
      "Für Unternehmen, die Microsoft 365 einführen, ihre bestehende Cloud-Umgebung ordnen oder ihren Mitarbeitern sicheres Arbeiten im Homeoffice und unterwegs ermöglichen möchten.",
    problem:
      "Dateien liegen verstreut auf einzelnen Rechnern, USB-Sticks und privaten Cloud-Konten, und von unterwegs kommt man nur umständlich an wichtige Unterlagen. Gleichzeitig ist unklar, wer worauf Zugriff hat.",
    scopeTitle: "Unsere Cloud-Leistungen",
    scope: [
      "Analyse, welche Workloads in die Cloud gehören – und welche nicht",
      "Migration von E-Mail, Daten und Anwendungen",
      "Einrichtung und Verwaltung von Microsoft 365",
      "Sichere Remote-Arbeitsplätze und Standortvernetzung",
      "Hybride Szenarien aus lokaler Infrastruktur und Cloud",
      "Zentrale Verwaltung, Berechtigungen und Datensicherung",
    ],
    benefits: [
      {
        title: "Ortsunabhängig arbeiten",
        text: "Ihr Team arbeitet sicher von überall – im Büro, im Homeoffice, unterwegs.",
      },
      {
        title: "Skaliert mit Ihnen",
        text: "Neue Mitarbeiter und Standorte sind in Minuten angebunden statt in Wochen.",
      },
      {
        title: "Durchdacht statt dogmatisch",
        text: "Wir empfehlen Cloud, wo sie nützt – und lokale Systeme, wo sie besser passen.",
      },
    ],
    ctaText: "Lassen Sie uns prüfen, welche Cloud-Strategie zu Ihrem Unternehmen passt.",
  },
  {
    slug: "cybersecurity",
    group: "it",
    name: "IT-Sicherheit",
    teaser:
      "Schutz für Systeme, Daten und Mitarbeiter vor digitalen Risiken.",
    title: "Cybersecurity für den Mittelstand",
    metaDescription:
      "Cybersecurity von QonteX: Endpoint Protection, Firewall, E-Mail-Sicherheit, Monitoring und Backup-Strategien – mehrschichtiger Schutz für Ihr Unternehmen.",
    intro:
      "Sicherheit beginnt, bevor ein Angriff passiert. Wir schützen Ihre Systeme, Daten und digitalen Arbeitsplätze mit einem mehrschichtigen Konzept aus Technik, Prozessen und geschulten Mitarbeitern.",
    audience:
      "Für Unternehmen, die mit Kunden-, Personal- oder Finanzdaten arbeiten und ihren Schutz vor Angriffen, Datenverlust und Betrugsversuchen systematisch aufbauen möchten.",
    problem:
      "Ein falscher Klick auf eine gefälschte E-Mail kann Daten verschlüsseln und den ganzen Betrieb lahmlegen. Viele Unternehmen wissen nicht genau, wie gut sie tatsächlich geschützt sind.",
    scopeTitle: "Unsere Schutzmaßnahmen",
    scope: [
      "Endpoint Protection für alle Arbeitsplätze und Server",
      "Firewall- und Netzwerksicherheit",
      "E-Mail-Sicherheit gegen Phishing und Schadsoftware",
      "Konsequentes Update- und Patch-Management",
      "Monitoring mit klaren Eskalationswegen",
      "Backup-Strategien mit getesteter Wiederherstellung",
      "Sensibilisierung Ihrer Mitarbeiter für digitale Risiken",
    ],
    benefits: [
      {
        title: "Mehrschichtiger Schutz",
        text: "Kein einzelnes Produkt, sondern ein abgestimmtes Konzept auf allen Ebenen.",
      },
      {
        title: "Realistisch priorisiert",
        text: "Wir sichern zuerst, was Ihr Unternehmen wirklich gefährdet – ohne Angstverkauf.",
      },
      {
        title: "Vorbereitet auf den Ernstfall",
        text: "Klare Abläufe und getestete Backups, falls doch etwas passiert.",
      },
    ],
    ctaText: "Lassen Sie uns den aktuellen Sicherheitsstand Ihrer IT ehrlich einschätzen.",
  },
  {
    slug: "server-netzwerke",
    group: "it",
    name: "Server & Netzwerke",
    teaser:
      "Stabile Server und Netzwerke – geplant, eingerichtet und überwacht.",
    title: "Server- und Netzwerkmanagement",
    metaDescription:
      "Server und Netzwerke von QonteX: Planung, Aufbau und Betrieb stabiler Infrastrukturen – dokumentiert, überwacht und skalierbar.",
    intro:
      "Server und Netzwerk sind das Fundament Ihrer IT. Wir planen, bauen und betreiben Infrastrukturen, die stabil laufen, sauber dokumentiert sind und mit Ihrem Unternehmen wachsen.",
    audience:
      "Für Unternehmen mit eigenem Büro, Lager oder mehreren Standorten, deren Server, Netzwerk oder WLAN erneuert, erweitert oder zuverlässig betrieben werden soll.",
    problem:
      "Das Netzwerk ist über Jahre gewachsen, das WLAN bricht immer wieder ab und der Server ist in die Jahre gekommen. Wie alles zusammenhängt, weiß oft nur eine einzelne Person – oder niemand mehr.",
    scopeTitle: "Das leisten wir",
    scope: [
      "Planung und Dimensionierung von Server-Umgebungen",
      "Aufbau und Modernisierung von Netzwerken und WLAN",
      "Virtualisierung und effiziente Ressourcen-Nutzung",
      "Kontinuierliche Überwachung von Verfügbarkeit und Auslastung",
      "Strukturierte Verkabelung und Netzwerksegmentierung",
      "Vollständige Dokumentation aller Komponenten",
    ],
    benefits: [
      {
        title: "Stabil im Alltag",
        text: "Systeme, die einfach laufen – dimensioniert nach Bedarf statt überdimensioniert.",
      },
      {
        title: "Transparent dokumentiert",
        text: "Alle Zugänge und Konfigurationen gehören Ihnen und sind nachvollziehbar abgelegt.",
      },
      {
        title: "Wachstum eingeplant",
        text: "Neue Standorte, mehr Mitarbeiter, mehr Last – die Basis ist darauf vorbereitet.",
      },
    ],
    ctaText: "Lassen Sie uns über den Zustand und die Zukunft Ihrer Infrastruktur sprechen.",
  },
  {
    slug: "backup-recovery",
    group: "it",
    name: "Backup & Wiederherstellung",
    teaser:
      "Regelmäßige Datensicherung mit getesteter Wiederherstellung für den Ernstfall.",
    title: "Backup und Disaster Recovery",
    metaDescription:
      "Backup und Disaster Recovery von QonteX: Durchdachte Datensicherung mit getesteter Wiederherstellung – damit ein Zwischenfall kein Stillstand wird.",
    intro:
      "Eine Datensicherung ist nur so gut wie ihre Wiederherstellung. Wir entwickeln Backup-Strategien, die zu Ihrem Betrieb passen – und testen regelmäßig, dass im Ernstfall wirklich alles zurückkommt.",
    audience:
      "Für Unternehmen, deren tägliche Arbeit von Daten abhängt – etwa von Buchhaltung, Kundendaten, Projektunterlagen oder E-Mails.",
    problem:
      "Ob die Datensicherung im Ernstfall wirklich funktioniert, hat oft noch niemand geprüft. Fällt ein Server aus oder werden Daten verschlüsselt, ist unklar, was sich wiederherstellen lässt und wie lange das dauert.",
    scopeTitle: "Unsere Backup-Leistungen",
    scope: [
      "Analyse, welche Daten und Systeme wie oft gesichert werden müssen",
      "Mehrstufige Backup-Konzepte (lokal und ausgelagert)",
      "Automatisierte Sicherungen mit Überwachung",
      "Regelmäßige Wiederherstellungs-Tests",
      "Klare Notfallpläne mit definierten Wiederanlaufzeiten",
      "Schutz der Sicherungen vor Verschlüsselungsangriffen",
    ],
    benefits: [
      {
        title: "Getestet statt gehofft",
        text: "Wir verlassen uns nicht auf grüne Häkchen – wir stellen regelmäßig testweise wieder her.",
      },
      {
        title: "Ernstfall durchdacht",
        text: "Sie wissen vorab, wie lange eine Wiederherstellung dauert und was zuerst zurückkommt.",
      },
      {
        title: "Ransomware eingeplant",
        text: "Sicherungskopien, an die ein Angreifer nicht herankommt.",
      },
    ],
    ctaText: "Lassen Sie uns prüfen, ob Ihre aktuelle Datensicherung im Ernstfall wirklich trägt.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return SERVICES.filter((s) => s.group === group);
}
