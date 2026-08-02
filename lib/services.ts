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
      "Managed IT Services von QonteX: Wir betreiben, überwachen und pflegen Ihre komplette IT-Umgebung – planbar, dokumentiert und persönlich betreut.",
    intro:
      "Mit Managed IT Services übernimmt QonteX die kontinuierliche Verantwortung für Ihre IT-Umgebung – von Updates über Monitoring bis zur Weiterentwicklung. Sie erhalten planbare Kosten, dokumentierte Systeme und einen Ansprechpartner, der Ihre Umgebung wirklich kennt.",
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
    name: "IT-Support",
    title: "IT-Support und Helpdesk",
    metaDescription:
      "IT-Support von QonteX: Schnelle, verständliche Hilfe bei allen IT-Fragen – per Fernwartung oder vor Ort, mit festen Ansprechpartnern.",
    intro:
      "Wenn etwas klemmt, brauchen Sie keine Warteschleife, sondern Hilfe. Unser Support erklärt verständlich, löst strukturiert und dokumentiert sauber – per Fernwartung oder direkt bei Ihnen vor Ort.",
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
    name: "Cloud-Lösungen",
    title: "Cloud-Lösungen und Microsoft 365",
    metaDescription:
      "Cloud-Lösungen von QonteX: Migration, Microsoft 365, sichere Remote-Arbeitsplätze und hybride Infrastrukturen – zentral verwaltet und DSGVO-bewusst.",
    intro:
      "Die Cloud ist kein Selbstzweck: Richtig geplant senkt sie Aufwand, verbessert die Zusammenarbeit und macht ortsunabhängiges Arbeiten sicher. Wir begleiten Sie von der Entscheidung über die Migration bis zum laufenden Betrieb.",
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
    name: "Cybersecurity",
    title: "Cybersecurity für den Mittelstand",
    metaDescription:
      "Cybersecurity von QonteX: Endpoint Protection, Firewall, E-Mail-Sicherheit, Monitoring und Backup-Strategien – mehrschichtiger Schutz für Ihr Unternehmen.",
    intro:
      "Sicherheit beginnt, bevor ein Angriff passiert. Wir schützen Ihre Systeme, Daten und digitalen Arbeitsplätze mit einem mehrschichtigen Konzept aus Technik, Prozessen und geschulten Mitarbeitern.",
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
    name: "Server & Netzwerke",
    title: "Server- und Netzwerkmanagement",
    metaDescription:
      "Server und Netzwerke von QonteX: Planung, Aufbau und Betrieb stabiler Infrastrukturen – dokumentiert, überwacht und skalierbar.",
    intro:
      "Server und Netzwerk sind das Fundament Ihrer IT. Wir planen, bauen und betreiben Infrastrukturen, die stabil laufen, sauber dokumentiert sind und mit Ihrem Unternehmen wachsen.",
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
    name: "Backup & Recovery",
    title: "Backup und Disaster Recovery",
    metaDescription:
      "Backup und Disaster Recovery von QonteX: Durchdachte Datensicherung mit getesteter Wiederherstellung – damit ein Zwischenfall kein Stillstand wird.",
    intro:
      "Eine Datensicherung ist nur so gut wie ihre Wiederherstellung. Wir entwickeln Backup-Strategien, die zu Ihrem Betrieb passen – und testen regelmäßig, dass im Ernstfall wirklich alles zurückkommt.",
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
  {
    slug: "ki-agenten",
    name: "KI-Agenten & Automatisierung",
    title: "KI-Agenten und Automatisierung",
    metaDescription:
      "KI-Agenten von QonteX: Individuelle KI-Assistenten und Automatisierungen, die wiederkehrende Aufgaben übernehmen – integriert in Ihre Systeme, mit klaren Kontrollmechanismen.",
    intro:
      "Künstliche Intelligenz ist für uns kein Buzzword, sondern ein Werkzeug: Wir entwickeln KI-Agenten, die wiederkehrende Aufgaben in Ihrem Unternehmen übernehmen – von der E-Mail-Vorsortierung über Dokumentenverarbeitung bis zum internen Wissensassistenten. Integriert in Ihre bestehenden Systeme, mit klaren Kontrollmechanismen und menschlicher Freigabe, wo sie hingehört.",
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
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
