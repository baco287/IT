/**
 * Anwendungsbeispiele: typische Abläufe, die QonteX umsetzt.
 * Es sind beispielhafte Szenarien, keine Kundenprojekte – auf der Website immer
 * als „Anwendungsbeispiel" gekennzeichnet.
 */
export type FlowStep = { system: string; text: string };

export type Example = {
  id: string;
  title: string;
  text: string;
  steps: FlowStep[];
  /** passende Leistungs- oder Lösungsseite */
  href: string;
  hrefLabel: string;
};

export const EXAMPLES = {
  kundenservice: {
    id: "kundenservice",
    title: "KI-Kundenservice",
    text: "Ein KI-Assistent beantwortet Anfragen und leitet komplexe Anliegen an Mitarbeiter weiter.",
    steps: [
      { system: "WhatsApp", text: "Kunde fragt nach dem Stand seines Auftrags" },
      { system: "KI-Assistent", text: "liest den Auftragsstatus aus dem System" },
      { system: "Antwort", text: "Kunde erhält sofort den aktuellen Stand" },
      { system: "Team", text: "wird nur bei Reklamationen eingebunden" },
    ],
    href: "/loesungen/ki-chatbots",
    hrefLabel: "Mehr zu KI-Chatbots",
  },
  geschaeftsprozesse: {
    id: "geschaeftsprozesse",
    title: "Automatisierte Geschäftsprozesse",
    text: "Informationen werden automatisch zwischen CRM, E-Mail, Datenbanken und anderen Systemen übertragen.",
    steps: [
      { system: "E-Mail", text: "Anfrage mit Projektbeschreibung geht ein" },
      { system: "CRM", text: "Kontakt und Vorgang werden angelegt" },
      { system: "Datenbank", text: "Kundendaten werden abgeglichen" },
      { system: "Workflow", text: "Zuständige Person erhält eine Aufgabe" },
    ],
    href: "/leistungen/prozessautomatisierung",
    hrefLabel: "Mehr zur Prozessautomatisierung",
  },
  terminplanung: {
    id: "terminplanung",
    title: "Intelligente Terminplanung",
    text: "Ein KI-System unterstützt Terminbuchungen über Website, WhatsApp oder Telefon.",
    steps: [
      { system: "Telefon", text: "Kunde möchte einen Termin vereinbaren" },
      { system: "KI-Assistent", text: "fragt Anliegen und Wunschzeit ab" },
      { system: "Kalender", text: "freier Termin wird verbindlich eingetragen" },
      { system: "Erinnerung", text: "geht am Vortag automatisch raus" },
    ],
    href: "/loesungen/termin-buchungssysteme",
    hrefLabel: "Mehr zu Termin- und Buchungssystemen",
  },
  leadmanagement: {
    id: "leadmanagement",
    title: "Automatisiertes Lead-Management",
    text: "Neue Anfragen werden strukturiert erfasst, bewertet und an zuständige Mitarbeiter übergeben.",
    steps: [
      { system: "Landingpage", text: "Interessent fordert ein Angebot an" },
      { system: "KI-Agent", text: "ordnet Anliegen und Dringlichkeit ein" },
      { system: "CRM", text: "Lead wird angelegt und zugewiesen" },
      { system: "Vertrieb", text: "erhält die Aufgabe mit allen Angaben" },
    ],
    href: "/leistungen/seo-marketingautomatisierung",
    hrefLabel: "Mehr zu SEO und Marketingautomatisierung",
  },
  verwaltung: {
    id: "verwaltung",
    title: "Individuelle Verwaltungssoftware",
    text: "Ein Unternehmen verwaltet seine Aufträge, Kunden und Prozesse zentral über eine eigene Webanwendung.",
    steps: [
      { system: "Auftrag", text: "wird einmal zentral erfasst" },
      { system: "Planung", text: "Zuständigkeit und Termin werden vergeben" },
      { system: "Status", text: "alle Beteiligten sehen den aktuellen Stand" },
      { system: "Dashboard", text: "Kennzahlen aktualisieren sich automatisch" },
    ],
    href: "/leistungen/softwareentwicklung",
    hrefLabel: "Mehr zur Softwareentwicklung",
  },
  dokumente: {
    id: "dokumente",
    title: "KI-gestützte Dokumentenverarbeitung",
    text: "Eingehende Dokumente werden analysiert und relevante Daten strukturiert zur Prüfung bereitgestellt.",
    steps: [
      { system: "E-Mail", text: "Lieferschein geht als PDF ein" },
      { system: "KI-Agent", text: "liest Lieferant, Positionen und Mengen aus" },
      { system: "Prüfung", text: "Mitarbeiter bestätigt oder korrigiert" },
      { system: "Warenwirtschaft", text: "Daten werden übernommen" },
    ],
    href: "/leistungen/ki-entwicklung",
    hrefLabel: "Mehr zur KI-Entwicklung",
  },

  /* Weitere Beispiele für einzelne Leistungsseiten */
  auftragsabwicklung: {
    id: "auftragsabwicklung",
    title: "Automatisierte Auftragsabwicklung",
    text: "Eine Bestellung wird einmal erfasst und von dort automatisch in alle beteiligten Systeme übertragen.",
    steps: [
      { system: "Webshop", text: "Bestellung geht ein" },
      { system: "Workflow", text: "prüft Daten und Lagerbestand" },
      { system: "ERP", text: "Auftrag und Rechnung werden angelegt" },
      { system: "E-Mail", text: "Kunde erhält die Bestätigung" },
    ],
    href: "/leistungen/prozessautomatisierung",
    hrefLabel: "Mehr zur Prozessautomatisierung",
  },
  websiteanfrage: {
    id: "websiteanfrage",
    title: "Website mit strukturierter Anfrageverarbeitung",
    text: "Anfragen aus dem Kontaktformular landen nicht nur im Postfach, sondern vollständig erfasst im CRM.",
    steps: [
      { system: "Website", text: "Besucher stellt eine Anfrage" },
      { system: "Formular", text: "prüft die Pflichtangaben" },
      { system: "CRM", text: "Kontakt und Anliegen werden angelegt" },
      { system: "Team", text: "erhält eine Aufgabe zur Rückmeldung" },
    ],
    href: "/leistungen/webentwicklung",
    hrefLabel: "Mehr zur Webentwicklung",
  },
  einsatzbericht: {
    id: "einsatzbericht",
    title: "Vom Einsatzbericht zur Rechnung",
    text: "Was heute auf Zetteln und in Tabellen steht, läuft über eine eigene kleine Anwendung.",
    steps: [
      { system: "Außendienst", text: "erfasst den Einsatz am Smartphone" },
      { system: "Business-Tool", text: "speichert Zeiten, Material und Fotos" },
      { system: "Büro", text: "sieht alle Einsätze in einer Übersicht" },
      { system: "Buchhaltung", text: "übernimmt die Daten für die Rechnung" },
    ],
    href: "/loesungen/business-tools",
    hrefLabel: "Mehr zu individuellen Business-Tools",
  },
  crmnachfassen: {
    id: "crmnachfassen",
    title: "Anfragen zuverlässig nachfassen",
    text: "Jede Anfrage bekommt eine zuständige Person und eine Erinnerung, solange sie offen ist.",
    steps: [
      { system: "Website", text: "Anfrage geht über das Formular ein" },
      { system: "CRM", text: "Vorgang wird angelegt und zugewiesen" },
      { system: "E-Mail", text: "Interessent erhält eine Eingangsbestätigung" },
      { system: "Erinnerung", text: "nach drei Tagen ohne Antwort" },
    ],
    href: "/loesungen/crm-automatisierung",
    hrefLabel: "Mehr zur CRM-Automatisierung",
  },
} satisfies Record<string, Example>;

export type ExampleId = keyof typeof EXAMPLES;

/** Reihenfolge der Anwendungsbeispiele auf der Startseite */
export const HOME_EXAMPLES: ExampleId[] = [
  "kundenservice",
  "geschaeftsprozesse",
  "terminplanung",
  "leadmanagement",
  "verwaltung",
  "dokumente",
];
