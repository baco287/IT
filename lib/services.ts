export type ServiceChannel = {
  key: "whatsapp" | "telefon" | "mail";
  title: string;
  text: string;
  points: string[];
};

export type Service = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  intro: string;
  scopeTitle: string;
  scope: string[];
  channelsTitle?: string;
  channelsIntro?: string;
  channels?: ServiceChannel[];
  benefits: { title: string; text: string }[];
  ctaText: string;
};

export const SERVICES: Service[] = [
  {
    slug: "managed-it",
    name: "Managed IT Services",
    title: "Managed IT Services für Unternehmen",
    metaDescription:
      "Managed IT Services von QonteX: Wir betreiben, überwachen und pflegen deine komplette IT-Umgebung – planbar, dokumentiert und persönlich betreut.",
    intro:
      "Mit Managed IT Services übernimmt QonteX die kontinuierliche Verantwortung für deine IT-Umgebung – von Updates über Monitoring bis zur Weiterentwicklung. Du erhältst planbare Kosten, dokumentierte Systeme und einen Ansprechpartner, der deine Umgebung wirklich kennt.",
    scopeTitle: "Das übernehmen wir für dich",
    scope: [
      "Laufender Betrieb und Pflege deiner Server, Clients und Dienste",
      "Regelmäßige Updates und Patch-Management",
      "Proaktives Monitoring mit definierten Reaktionswegen",
      "Verwaltung von Benutzerkonten und Berechtigungen",
      "Saubere Dokumentation aller Systeme und Zugänge",
      "Regelmäßige Empfehlungen zur Weiterentwicklung deiner IT",
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
        text: "Ein Partner, der deine Umgebung kennt – statt wechselnder Zuständigkeiten.",
      },
    ],
    ctaText: "Lass uns besprechen, wie eine Managed-IT-Betreuung für dein Unternehmen aussehen kann.",
  },
  {
    slug: "it-support",
    name: "IT-Support",
    title: "IT-Support und Helpdesk",
    metaDescription:
      "IT-Support von QonteX: Schnelle, verständliche Hilfe bei allen IT-Fragen – per Fernwartung oder vor Ort, mit festen Ansprechpartnern.",
    intro:
      "Wenn etwas klemmt, brauchst du keine Warteschleife, sondern Hilfe. Unser Support erklärt verständlich, löst strukturiert und dokumentiert sauber – per Fernwartung oder direkt bei dir vor Ort.",
    scopeTitle: "So unterstützen wir dich",
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
        text: "Du sprichst mit Menschen, die deine Systeme kennen – kein anonymes Ticketsystem.",
      },
      {
        title: "Schnelle Reaktion",
        text: "Kritische Störungen behandeln wir mit Priorität, Reaktionszeiten vereinbaren wir verbindlich.",
      },
      {
        title: "Nachvollziehbar",
        text: "Jede Anfrage wird dokumentiert – du siehst, was wann gelöst wurde.",
      },
    ],
    ctaText: "Erzähl uns, wo es bei dir aktuell hakt – wir sagen dir ehrlich, wie wir helfen können.",
  },
  {
    slug: "cloud-loesungen",
    name: "Cloud-Lösungen",
    title: "Cloud-Lösungen und Microsoft 365",
    metaDescription:
      "Cloud-Lösungen von QonteX: Migration, Microsoft 365, sichere Remote-Arbeitsplätze und hybride Infrastrukturen – zentral verwaltet und DSGVO-bewusst.",
    intro:
      "Die Cloud ist kein Selbstzweck: Richtig geplant senkt sie Aufwand, verbessert die Zusammenarbeit und macht ortsunabhängiges Arbeiten sicher. Wir begleiten dich von der Entscheidung über die Migration bis zum laufenden Betrieb.",
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
        text: "Dein Team arbeitet sicher von überall – im Büro, im Homeoffice, unterwegs.",
      },
      {
        title: "Skaliert mit dir",
        text: "Neue Mitarbeiter und Standorte sind in Minuten angebunden statt in Wochen.",
      },
      {
        title: "Durchdacht statt dogmatisch",
        text: "Wir empfehlen Cloud, wo sie nützt – und lokale Systeme, wo sie besser passen.",
      },
    ],
    ctaText: "Lass uns prüfen, welche Cloud-Strategie zu deinem Unternehmen passt.",
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    title: "Cybersecurity für den Mittelstand",
    metaDescription:
      "Cybersecurity von QonteX: Endpoint Protection, Firewall, E-Mail-Sicherheit, Monitoring und Backup-Strategien – mehrschichtiger Schutz für dein Unternehmen.",
    intro:
      "Sicherheit beginnt, bevor ein Angriff passiert. Wir schützen deine Systeme, Daten und digitalen Arbeitsplätze mit einem mehrschichtigen Konzept aus Technik, Prozessen und geschulten Mitarbeitern.",
    scopeTitle: "Unsere Schutzmaßnahmen",
    scope: [
      "Endpoint Protection für alle Arbeitsplätze und Server",
      "Firewall- und Netzwerksicherheit",
      "E-Mail-Sicherheit gegen Phishing und Schadsoftware",
      "Konsequentes Update- und Patch-Management",
      "Monitoring mit klaren Eskalationswegen",
      "Backup-Strategien mit getesteter Wiederherstellung",
      "Sensibilisierung deiner Mitarbeiter für digitale Risiken",
    ],
    benefits: [
      {
        title: "Mehrschichtiger Schutz",
        text: "Kein einzelnes Produkt, sondern ein abgestimmtes Konzept auf allen Ebenen.",
      },
      {
        title: "Realistisch priorisiert",
        text: "Wir sichern zuerst, was dein Unternehmen wirklich gefährdet – ohne Angstverkauf.",
      },
      {
        title: "Vorbereitet auf den Ernstfall",
        text: "Klare Abläufe und getestete Backups, falls doch etwas passiert.",
      },
    ],
    ctaText: "Lass uns den aktuellen Sicherheitsstand deiner IT ehrlich einschätzen.",
  },
  {
    slug: "server-netzwerke",
    name: "Server & Netzwerke",
    title: "Server- und Netzwerkmanagement",
    metaDescription:
      "Server und Netzwerke von QonteX: Planung, Aufbau und Betrieb stabiler Infrastrukturen – dokumentiert, überwacht und skalierbar.",
    intro:
      "Server und Netzwerk sind das Fundament deiner IT. Wir planen, bauen und betreiben Infrastrukturen, die stabil laufen, sauber dokumentiert sind und mit deinem Unternehmen wachsen.",
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
        text: "Alle Zugänge und Konfigurationen gehören dir und sind nachvollziehbar abgelegt.",
      },
      {
        title: "Wachstum eingeplant",
        text: "Neue Standorte, mehr Mitarbeiter, mehr Last – die Basis ist darauf vorbereitet.",
      },
    ],
    ctaText: "Lass uns über den Zustand und die Zukunft deiner Infrastruktur sprechen.",
  },
  {
    slug: "backup-recovery",
    name: "Backup & Recovery",
    title: "Backup und Disaster Recovery",
    metaDescription:
      "Backup und Disaster Recovery von QonteX: Durchdachte Datensicherung mit getesteter Wiederherstellung – damit ein Zwischenfall kein Stillstand wird.",
    intro:
      "Eine Datensicherung ist nur so gut wie ihre Wiederherstellung. Wir entwickeln Backup-Strategien, die zu deinem Betrieb passen – und testen regelmäßig, dass im Ernstfall wirklich alles zurückkommt.",
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
        text: "Du weißt vorab, wie lange eine Wiederherstellung dauert und was zuerst zurückkommt.",
      },
      {
        title: "Ransomware eingeplant",
        text: "Sicherungskopien, an die ein Angreifer nicht herankommt.",
      },
    ],
    ctaText: "Lass uns prüfen, ob deine aktuelle Datensicherung im Ernstfall wirklich trägt.",
  },
  {
    slug: "webseiten",
    name: "Webseiten & Online-Shops",
    title: "Webseiten und Online-Shops",
    metaDescription:
      "Webdesign von QonteX: Moderne, schnelle Webseiten und Online-Shops – von der Konzeption über das Design bis zu Hosting, Wartung und DSGVO-konformem Betrieb.",
    intro:
      "Deine Website ist oft der erste Eindruck, den Kunden von dir bekommen. Wir konzipieren, gestalten und entwickeln Webseiten und Online-Shops, die schnell laden, auf jedem Gerät funktionieren und Anfragen bringen – und betreiben sie danach zuverlässig weiter. Wie das aussieht, zeigen unsere Referenzen: Jede Seite dort ist von uns gebaut und live im Einsatz.",
    scopeTitle: "Das setzen wir für dich um",
    scope: [
      "Konzeption, Design und Entwicklung deiner Website",
      "Online-Shops mit Zahlungsanbindung und Warenwirtschaft",
      "Landingpages für Kampagnen und Leadgewinnung",
      "Texte, Struktur und Suchmaschinenoptimierung (SEO)",
      "Hosting in Deutschland, SSL und DSGVO-konformer Betrieb",
      "Laufende Pflege, Updates und Weiterentwicklung",
    ],
    benefits: [
      {
        title: "Live zu sehen",
        text: "Unsere Referenzen sind keine Mockups – jede Seite ist im echten Einsatz für echte Unternehmen.",
      },
      {
        title: "Schnell und auffindbar",
        text: "Kurze Ladezeiten, sauberes SEO-Fundament und mobile Darstellung ab dem ersten Tag.",
      },
      {
        title: "Betreut statt abgeliefert",
        text: "Nach dem Launch bleiben wir dran – Updates, Sicherheit und Änderungen inklusive.",
      },
    ],
    ctaText:
      "Lass uns besprechen, wie deine neue Website aussehen kann – wir zeigen dir gern Live-Beispiele aus unserer Arbeit.",
  },
  {
    slug: "online-marketing",
    name: "Ads & Online-Marketing",
    title: "Werbeanzeigen und Online-Marketing",
    metaDescription:
      "Online-Marketing von QonteX: Google Ads und Meta Ads mit klarem Budget, sauberem Tracking und ehrlichem Reporting – Kampagnen, die Anfragen bringen.",
    intro:
      "Werbebudget ist schnell ausgegeben – die Kunst ist, dass daraus Anfragen werden. Wir planen und betreiben Kampagnen auf Google und Meta mit sauberem Tracking, klaren Zielen und einem Reporting, das du wirklich verstehst: Was hat es gekostet, was kam dabei raus.",
    scopeTitle: "Das übernehmen wir für dich",
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
        text: "Jeder Euro ist nachvollziehbar – du siehst Kosten pro Anfrage, nicht nur Klickzahlen.",
      },
      {
        title: "Alles aus einer Hand",
        text: "Anzeige, Landingpage und Technik kommen vom selben Team – keine Reibungsverluste.",
      },
      {
        title: "Ehrliches Budget",
        text: "Wir sagen dir auch, wenn ein Kanal für dein Geschäft nicht funktioniert.",
      },
    ],
    ctaText:
      "Lass uns durchrechnen, was eine Anfrage über Google oder Meta für dein Unternehmen kosten darf.",
  },
  {
    slug: "social-media",
    name: "Social Media",
    title: "Social-Media-Betreuung",
    metaDescription:
      "Social Media von QonteX: Strategie, Content-Erstellung und Betreuung deiner Kanäle auf Instagram, Facebook, LinkedIn und TikTok – konsistent und planbar.",
    intro:
      "Sichtbarkeit entsteht nicht durch einen viralen Zufallstreffer, sondern durch konstante, gute Inhalte. Wir entwickeln deine Social-Media-Strategie, produzieren Inhalte und betreuen deine Kanäle – damit dein Unternehmen dort präsent ist, wo deine Kunden täglich unterwegs sind.",
    scopeTitle: "Das machen wir für dich",
    scope: [
      "Strategie: Kanäle, Themen und Tonalität passend zu deiner Marke",
      "Content-Erstellung: Grafiken, Kurzvideos und Texte",
      "Redaktionsplan und regelmäßige Veröffentlichung",
      "Betreuung von Instagram, Facebook, LinkedIn und TikTok",
      "Community-Management: Kommentare und Nachrichten im Blick",
      "Monatliche Auswertung: was funktioniert, was nicht",
    ],
    benefits: [
      {
        title: "Konstant statt sporadisch",
        text: "Ein fester Redaktionsplan sorgt für regelmäßige Präsenz – ohne dass dein Team daran denken muss.",
      },
      {
        title: "Zur Marke passend",
        text: "Inhalte in deinem Ton und deinem Look – nicht aus der Vorlagen-Fabrik.",
      },
      {
        title: "Verzahnt mit Ads",
        text: "Organische Inhalte und bezahlte Reichweite greifen ineinander statt nebeneinander zu laufen.",
      },
    ],
    ctaText:
      "Lass uns schauen, welche Kanäle für dein Unternehmen wirklich Sinn ergeben.",
  },
  {
    slug: "dashboards",
    name: "Dashboards & Reporting",
    title: "Dashboards und Reporting",
    metaDescription:
      "Dashboards von QonteX: Individuelle Finanz-, Marketing- und IT-Dashboards, die deine Kennzahlen aus verschiedenen Quellen live auf einen Blick zeigen – statt Excel-Listen und manueller Reports.",
    intro:
      "Wichtige Zahlen liegen in den meisten Unternehmen verstreut in Excel-Listen, Tools und Postfächern. Wir entwickeln Dashboards, die deine Kennzahlen aus verschiedenen Quellen zusammenführen und live auf einen Blick zeigen – vom Umsatz über Kampagnen bis zum Zustand deiner IT. Damit Entscheidungen auf aktuellen Daten basieren statt auf dem Stand des letzten Monatsreports.",
    scopeTitle: "Diese Dashboards bauen wir für dich",
    scope: [
      "Finanz-Dashboards: Umsatz, Kosten und offene Posten auf einen Blick",
      "Marketing-Dashboards: Google Ads, Meta, Website- und Social-Media-Kennzahlen in einer Ansicht",
      "IT-Dashboards: Systemstatus, Backups und Tickets deiner gesamten Umgebung",
      "Anbindung deiner Datenquellen: Buchhaltung, Shops, Werbekonten, Microsoft 365",
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
      "Lass uns besprechen, welche Kennzahlen dein Unternehmen wirklich steuern – und wie ein Dashboard dafür aussehen kann.",
  },
  {
    slug: "ki-agenten",
    name: "KI-Agenten & Automatisierung",
    title: "KI-Agenten und Automatisierung",
    metaDescription:
      "KI-Agenten von QonteX: Individuelle KI-Assistenten und Automatisierungen, die wiederkehrende Aufgaben übernehmen – integriert in deine Systeme, mit klaren Kontrollmechanismen.",
    intro:
      "Künstliche Intelligenz ist für uns kein Buzzword, sondern ein Werkzeug: Wir entwickeln KI-Agenten, die wiederkehrende Aufgaben in deinem Unternehmen übernehmen – von der E-Mail-Vorsortierung über Dokumentenverarbeitung bis zum internen Wissensassistenten. Integriert in deine bestehenden Systeme, mit klaren Kontrollmechanismen und menschlicher Freigabe, wo sie hingehört.",
    scopeTitle: "Das entwickeln wir für dich",
    scope: [
      "Analyse, welche Prozesse sich sinnvoll automatisieren lassen",
      "Individuelle KI-Agenten für wiederkehrende Aufgaben",
      "Chat-Assistenten für deine Website oder dein Team",
      "Automatisierte Verarbeitung von Dokumenten und E-Mails",
      "Anbindung an deine Systeme (E-Mail, CRM, Microsoft 365)",
      "Kontrollmechanismen und menschliche Freigabeschritte",
      "Betrieb, Überwachung und laufende Verbesserung",
    ],
    channelsTitle: "Automatisierung dort, wo deine Kunden sind",
    channelsIntro:
      "Die meisten Anfragen erreichen Unternehmen über drei Kanäle: WhatsApp, Telefon und E-Mail. Genau dort setzen unsere KI-Agenten an – rund um die Uhr erreichbar, mit Übergabe an dein Team, sobald es persönlich werden soll.",
    channels: [
      {
        key: "whatsapp",
        title: "WhatsApp-Assistent",
        text: "Deine Kunden schreiben, wann es ihnen passt – dein KI-Assistent antwortet sofort, auch abends und am Wochenende. Er beantwortet wiederkehrende Fragen, nimmt Anliegen strukturiert auf und übergibt an dein Team, sobald ein Mensch gefragt ist.",
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
        text: "Kein Anruf geht mehr verloren: Der KI-Telefonassistent nimmt Gespräche an, wenn dein Team belegt oder außerhalb der Zeiten ist. Er versteht das Anliegen, nimmt Rückrufwünsche auf und fasst jedes Gespräch schriftlich für dich zusammen.",
        points: [
          "Anrufannahme bei Besetzt, Abwesenheit und nach Feierabend",
          "Anliegen und Rückrufwünsche strukturiert erfassen",
          "Schriftliche Gesprächszusammenfassung in dein Postfach oder CRM",
          "Weiterleitung dringender Anrufe nach deinen Regeln",
        ],
      },
      {
        key: "mail",
        title: "E-Mail-Assistent",
        text: "Dein Postfach sortiert sich selbst: Der E-Mail-Agent kategorisiert eingehende Nachrichten, beantwortet Standardanfragen und legt für alles andere fertige Antwortentwürfe bereit – du gibst nur noch frei.",
        points: [
          "Automatische Kategorisierung und Priorisierung des Posteingangs",
          "Sofortantworten für Standardanfragen, Entwürfe für den Rest",
          "Zusammenfassung langer E-Mail-Verläufe auf den Punkt",
          "Übergabe an das richtige Teammitglied oder dein CRM",
        ],
      },
    ],
    benefits: [
      {
        title: "Zeit für das Wesentliche",
        text: "Routineaufgaben laufen automatisch – dein Team kümmert sich um das, was Menschen besser können.",
      },
      {
        title: "Integriert statt Insellösung",
        text: "Agenten arbeiten in deinen bestehenden Systemen, nicht in einem weiteren Tool daneben.",
      },
      {
        title: "Verantwortungsvoll eingesetzt",
        text: "Datenschutzbewusste Umsetzung, nachvollziehbare Ergebnisse und Kontrolle bleiben bei dir.",
      },
    ],
    ctaText:
      "Lass uns gemeinsam herausfinden, welche Aufgaben in deinem Unternehmen ein KI-Agent übernehmen kann.",
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
