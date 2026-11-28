import type { ExampleId } from "./examples";
import { IT_SERVICES } from "./it-services";

/**
 * Leistungen (fünf Schwerpunkte) und Lösungen (konkrete Lösungsarten).
 * Eine Quelle für Navigation, Übersichten, Detailseiten und Sitemap.
 * Grundsatz für alle Texte: konkret beschreiben, was umgesetzt wird – keine
 * Erfolgsversprechen, keine erfundenen Referenzen.
 */
export type OfferKind = "leistung" | "loesung" | "it";

export type Offer = {
  kind: OfferKind;
  slug: string;
  /** Name in Menü, Listen und Pfadnavigation */
  name: string;
  /** ein Satz für Menü und Übersichten */
  short: string;
  /** Hauptüberschrift der Seite */
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  /** Für wen eignet sich das? */
  audience: string;
  /** Typische Ausgangslage aus Kundensicht */
  problems: string[];
  scopeTitle: string;
  scope: string[];
  note?: { title: string; text: string };
  /** Anwendungsbeispiel im Seitenkopf */
  example?: ExampleId;
  benefits: { title: string; text: string }[];
  /** Pfade verwandter Seiten, z. B. "/loesungen/telefon-ki" */
  related: string[];
  /** Echte Referenz (Reifencenter Bremen) auf dieser Seite zeigen */
  reference?: boolean;
  ctaText: string;
};

export const LEISTUNGEN: Offer[] = [
  {
    kind: "leistung",
    slug: "ki-entwicklung",
    name: "KI-Entwicklung",
    short: "KI-Agenten, Assistenten und KI-Anwendungen, eingebunden in Ihre Abläufe.",
    title: "KI-Entwicklung und KI-Agenten für Unternehmen",
    metaTitle: "KI-Entwicklung & KI-Agenten für Unternehmen",
    metaDescription:
      "QonteX entwickelt individuelle KI-Agenten, KI-Assistenten, Telefon-KI und Dokumentenverarbeitung, die mit Ihren bestehenden Systemen verbunden sind.",
    intro:
      "Wir entwickeln KI-Systeme, die in Ihre bestehenden Abläufe eingebunden sind. Sie lesen Anfragen und Dokumente, beantworten wiederkehrende Fragen, bereiten Entscheidungen vor und übergeben an Ihr Team, wo ein Mensch gefragt ist.",
    audience:
      "Für Unternehmen, die viele gleichartige Anfragen, E-Mails oder Dokumente bearbeiten und dafür heute wertvolle Arbeitszeit einsetzen.",
    problems: [
      "Kundenanfragen bleiben außerhalb der Geschäftszeiten liegen.",
      "Mitarbeiter beantworten täglich dieselben Fragen und tippen Daten aus Dokumenten ab.",
      "Informationen liegen verteilt in E-Mails, PDFs und verschiedenen Programmen.",
    ],
    scopeTitle: "Was wir entwickeln",
    scope: [
      "Individuelle KI-Agenten für klar umrissene Aufgaben",
      "KI-Assistenten und Chatbots für Website und WhatsApp",
      "Telefon-KI und Voice Agents für Anrufannahme und Terminwünsche",
      "Intelligente Dokumentenverarbeitung, z. B. für Lieferscheine, Aufträge und Formulare",
      "KI-gestützte Kundenbetreuung mit Übergabe an Ihr Team",
      "Individuelle KI-Anwendungen auf Basis Ihrer eigenen Daten",
      "Anbindung an CRM, E-Mail, Kalender und Datenbanken",
    ],
    note: {
      title: "Datenschutz und Kontrolle",
      text: "Welche Daten ein KI-System verarbeitet, welcher Anbieter eingesetzt wird und wo die Verarbeitung stattfindet, legen wir vor dem Start gemeinsam mit Ihnen fest.",
    },
    example: "dokumente",
    benefits: [
      {
        title: "Eingebunden statt isoliert",
        text: "Die KI arbeitet mit Ihren Systemen zusammen und legt Ergebnisse dort ab, wo Ihr Team sie braucht.",
      },
      {
        title: "Klare Grenzen",
        text: "Wir legen fest, was die KI selbst erledigt und wann sie an einen Menschen übergibt.",
      },
      {
        title: "Nachvollziehbar",
        text: "Jeder Schritt wird protokolliert. Sie sehen, was die KI getan hat und auf welcher Grundlage.",
      },
    ],
    related: ["/loesungen/ki-chatbots", "/loesungen/telefon-ki", "/leistungen/prozessautomatisierung"],
    ctaText:
      "Erzählen Sie uns, welche Aufgabe eine KI in Ihrem Unternehmen übernehmen soll. Wir sagen Ihnen offen, ob und wie sich das sinnvoll umsetzen lässt.",
  },
  {
    kind: "leistung",
    slug: "prozessautomatisierung",
    name: "Prozessautomatisierung",
    short: "Wiederkehrende Abläufe automatisieren und Ihre Systeme miteinander verbinden.",
    title: "Prozessautomatisierung und Systemintegration",
    metaTitle: "Prozessautomatisierung, n8n-Workflows & API-Integration",
    metaDescription:
      "Wir automatisieren wiederkehrende Geschäftsprozesse und verbinden Ihre Systeme: n8n-Workflows, API-Integrationen sowie CRM- und ERP-Anbindungen.",
    intro:
      "Wir automatisieren wiederkehrende Geschäftsprozesse und verbinden die Systeme, mit denen Ihr Unternehmen arbeitet. Daten werden einmal erfasst und automatisch weitergegeben, statt sie mehrfach abzutippen.",
    audience:
      "Für Unternehmen, in denen Anfragen, Aufträge, Termine oder Daten noch von Hand zwischen Programmen übertragen werden.",
    problems: [
      "Dieselben Daten werden in mehrere Programme eingetragen.",
      "Abläufe hängen davon ab, dass jemand an den nächsten Schritt denkt.",
      "Shop, CRM, Buchhaltung und E-Mail arbeiten nebeneinander statt miteinander.",
    ],
    scopeTitle: "Was wir umsetzen",
    scope: [
      "Analyse Ihrer Abläufe und Auswahl der Prozesse mit dem größten Nutzen",
      "Workflows mit n8n und individuellen Skripten",
      "API-Integrationen und Webhooks zwischen Ihren Systemen",
      "CRM- und ERP-Anbindungen",
      "Automatisierte Kundenkommunikation, z. B. Bestätigungen und Erinnerungen",
      "Datenverarbeitung und Synchronisierung zwischen Datenbanken",
      "Automatisierte Termin- und Buchungsprozesse",
      "Überwachung, Fehlermeldungen und Dokumentation der Abläufe",
    ],
    example: "auftragsabwicklung",
    benefits: [
      {
        title: "Weniger Handarbeit",
        text: "Routineschritte laufen automatisch. Ihr Team kümmert sich um die Fälle, die Aufmerksamkeit brauchen.",
      },
      {
        title: "Weniger Übertragungsfehler",
        text: "Daten werden einmal erfasst und unverändert weitergegeben.",
      },
      {
        title: "Stabil im Betrieb",
        text: "Fehler im Ablauf werden gemeldet, statt unbemerkt liegen zu bleiben.",
      },
    ],
    related: ["/loesungen/crm-automatisierung", "/loesungen/termin-buchungssysteme", "/leistungen/ki-entwicklung"],
    ctaText:
      "Nennen Sie uns den Ablauf, der Ihr Team am meisten Zeit kostet. Wir prüfen, wie er sich automatisieren lässt.",
  },
  {
    kind: "leistung",
    slug: "webentwicklung",
    name: "Webentwicklung",
    short: "Unternehmenswebsites, Webanwendungen und Kundenportale, technisch sauber umgesetzt.",
    title: "Webentwicklung: Websites, Webanwendungen und Portale",
    metaTitle: "Webentwicklung, Website-Relaunch & Webanwendungen",
    metaDescription:
      "QonteX entwickelt Unternehmenswebsites, Landingpages, Webanwendungen und Kundenportale: schnell, für jedes Gerät, mit technischer SEO und Schnittstellen.",
    intro:
      "Wir entwickeln Websites und Webanwendungen, die schnell laden, auf jedem Gerät funktionieren und mit Ihren übrigen Systemen verbunden sind. Vom Relaunch der Unternehmenswebsite bis zum Kundenportal mit Login.",
    audience:
      "Für Unternehmen, deren Website veraltet ist, langsam lädt oder Anfragen nicht weiterverarbeitet, und für alle, die eine eigene Webanwendung planen.",
    problems: [
      "Die Website lädt langsam und ist auf dem Smartphone schwer zu bedienen.",
      "Besucher verstehen nicht schnell genug, was Ihr Unternehmen anbietet.",
      "Anfragen aus dem Kontaktformular landen ungeordnet im Postfach.",
    ],
    scopeTitle: "Was wir umsetzen",
    scope: [
      "Professionelle Unternehmenswebsites",
      "Landingpages für Angebote und Kampagnen",
      "Website-Relaunch und Optimierung bestehender Seiten",
      "Webanwendungen und Kundenportale",
      "Performance-Optimierung und technische SEO",
      "Formulare mit Anbindung an CRM und E-Mail",
      "Schnittstellen und individuelle Funktionen",
    ],
    example: "websiteanfrage",
    benefits: [
      {
        title: "Schnell und barrierearm",
        text: "Kurze Ladezeiten, klare Struktur und gute Bedienbarkeit auf jedem Gerät.",
      },
      {
        title: "Technisch auffindbar",
        text: "Saubere Seitenstruktur, Metadaten und strukturierte Daten als Grundlage für Suchmaschinen.",
      },
      {
        title: "Verbunden",
        text: "Formulare und Funktionen übergeben Daten direkt an Ihre Systeme.",
      },
    ],
    related: ["/leistungen/softwareentwicklung", "/leistungen/seo-marketingautomatisierung", "/loesungen/ki-chatbots"],
    reference: true,
    ctaText:
      "Zeigen Sie uns Ihre aktuelle Website oder Ihre Idee für eine Webanwendung. Wir besprechen, welcher Umfang sinnvoll ist.",
  },
  {
    kind: "leistung",
    slug: "softwareentwicklung",
    name: "Softwareentwicklung",
    short: "Individuelle Anwendungen, interne Tools und SaaS-Plattformen für Ihre Prozesse.",
    title: "Individuelle Softwareentwicklung für Unternehmen",
    metaTitle: "Individuelle Softwareentwicklung, SaaS & Business-Tools",
    metaDescription:
      "Individuelle Software von QonteX: interne Unternehmenssoftware, Dashboards, Verwaltungs- und Buchungssysteme, datenbankgestützte Anwendungen und SaaS.",
    intro:
      "Wenn Standardsoftware nicht zu Ihren Abläufen passt, entwickeln wir Anwendungen, die genau das abbilden, was Ihr Unternehmen braucht. Von internen Tools über Dashboards bis zur SaaS-Plattform.",
    audience:
      "Für Unternehmen, die mit Excel-Listen, Insellösungen oder Standardsoftware arbeiten, die ihre Prozesse nur zum Teil abbildet.",
    problems: [
      "Wichtige Abläufe hängen an Tabellen, die nur eine Person wirklich versteht.",
      "Standardsoftware zwingt das Team zu Umwegen.",
      "Kennzahlen werden für jeden Bericht von Hand zusammengetragen.",
    ],
    scopeTitle: "Was wir entwickeln",
    scope: [
      "Interne Unternehmenssoftware und Business-Tools",
      "Dashboards und Administrationssysteme",
      "Buchungs- und Verwaltungssysteme",
      "Datenbankgestützte Anwendungen",
      "SaaS-Plattformen",
      "Schnittstellen zu bestehender Software",
      "Skalierbare Architektur, Hosting und Wartung",
    ],
    example: "verwaltung",
    benefits: [
      {
        title: "Passt zu Ihrem Ablauf",
        text: "Die Software bildet Ihre Prozesse ab, statt Ihr Team an fremde Vorgaben anzupassen.",
      },
      {
        title: "Schrittweise entwickelt",
        text: "Wir starten mit dem Kern, nehmen ihn in Betrieb und erweitern anhand der echten Nutzung.",
      },
      {
        title: "Wartbar aufgebaut",
        text: "Klare Architektur und Dokumentation, damit die Anwendung mit Ihrem Unternehmen wachsen kann.",
      },
    ],
    related: ["/loesungen/business-tools", "/loesungen/termin-buchungssysteme", "/leistungen/webentwicklung"],
    ctaText:
      "Beschreiben Sie uns den Ablauf, für den Sie eine eigene Anwendung brauchen. Wir skizzieren mit Ihnen den ersten sinnvollen Umfang.",
  },
  {
    kind: "leistung",
    slug: "seo-marketingautomatisierung",
    name: "SEO & Marketingautomatisierung",
    short: "SEO-Automatisierung, Lead-Management und Marketing-Workflows, die regelmäßig laufen.",
    title: "SEO, Marketingautomatisierung und digitale Kundengewinnung",
    metaTitle: "SEO-Automatisierung & Marketingautomatisierung",
    metaDescription:
      "SEO-Agenten, Lead-Management, Marketing-Workflows und Conversion-Optimierung: QonteX automatisiert Marketing und SEO. Ohne Ranking-Versprechen.",
    intro:
      "Wir automatisieren die wiederkehrenden Aufgaben in Marketing und Vertrieb: SEO-Analysen, Lead-Erfassung, Nachverfolgung und Auswertungen. Strategie und Freigaben bleiben bei Ihrem Team.",
    audience:
      "Für Unternehmen, die online gefunden werden und Anfragen strukturiert bearbeiten möchten, aber keine Zeit für regelmäßige Routinearbeit im Marketing haben.",
    problems: [
      "SEO und Marketing passieren nur, wenn gerade Zeit ist.",
      "Anfragen aus verschiedenen Kanälen werden unterschiedlich oder gar nicht nachverfolgt.",
      "Auswertungen werden von Hand aus mehreren Tools zusammengetragen.",
    ],
    scopeTitle: "Was wir umsetzen",
    scope: [
      "Technische SEO-Prüfungen und laufendes Monitoring",
      "SEO-Agenten für Recherche, Analyse und Content-Briefings",
      "Lead-Management: Erfassung, Bewertung und Übergabe an den Vertrieb",
      "Marketing-Workflows, z. B. E-Mail-Strecken mit Einwilligung",
      "Automatisierte Kampagnenprozesse von der Vorbereitung bis zur Auswertung",
      "Conversion-Optimierung von Landingpages und Formularen",
      "Berichte, die sich automatisch aktualisieren",
    ],
    note: {
      title: "Ohne Ranking-Versprechen",
      text: "Platzierungen bei Google kann niemand seriös garantieren. KI-gestützte Entwürfe prüfen Menschen vor der Veröffentlichung, Werbe-E-Mails gehen nur an Empfänger mit Einwilligung.",
    },
    example: "leadmanagement",
    benefits: [
      {
        title: "Regelmäßig statt sporadisch",
        text: "Feste Abläufe sorgen dafür, dass Marketing auch in vollen Wochen stattfindet.",
      },
      {
        title: "Anfragen im Blick",
        text: "Jede Anfrage wird erfasst und einer zuständigen Person zugeordnet.",
      },
      {
        title: "Menschen entscheiden",
        text: "KI liefert Vorarbeit und Vorschläge. Was veröffentlicht oder versendet wird, geben Sie frei.",
      },
    ],
    related: ["/loesungen/crm-automatisierung", "/leistungen/webentwicklung", "/leistungen/ki-entwicklung"],
    ctaText: "Lassen Sie uns ansehen, wo in Ihrem Marketing und Vertrieb heute Handarbeit steckt.",
  },
];

export const LOESUNGEN: Offer[] = [
  {
    kind: "loesung",
    slug: "ki-chatbots",
    name: "KI-Chatbots",
    short: "Assistenten für Website und WhatsApp, die Fragen beantworten und Anliegen übergeben.",
    title: "KI-Chatbots für Website und WhatsApp",
    metaTitle: "KI-Chatbot für Website & WhatsApp entwickeln lassen",
    metaDescription:
      "KI-Chatbots für Website und WhatsApp, die auf Basis Ihrer Informationen antworten, Anliegen erfassen und komplexe Fälle an Ihr Team übergeben.",
    intro:
      "Ein KI-Chatbot beantwortet wiederkehrende Fragen auf Ihrer Website oder per WhatsApp, rund um die Uhr und auf Basis Ihrer eigenen Informationen. Was er nicht klären kann, übergibt er mit allen Angaben an Ihr Team.",
    audience: "Für Unternehmen, die viele ähnliche Kundenfragen per Telefon, E-Mail oder Chat erhalten.",
    problems: [
      "Dieselben Fragen zu Preisen, Abläufen oder Lieferzeiten kosten täglich Zeit.",
      "Anfragen am Abend oder am Wochenende bleiben bis zum nächsten Werktag liegen.",
      "Bei Rückfragen fehlen wichtige Angaben, und es braucht weitere Nachrichten.",
    ],
    scopeTitle: "Was dazugehört",
    scope: [
      "Chatbot für Ihre Website",
      "WhatsApp-Assistent über die WhatsApp-Business-Plattform",
      "Wissensbasis aus Ihren Inhalten, z. B. Leistungen, Preise und häufige Fragen",
      "Erfassung von Anliegen mit allen nötigen Angaben",
      "Übergabe an Mitarbeiter per E-Mail, CRM oder Ticketsystem",
      "Regeln, was der Chatbot beantworten darf und was nicht",
      "Auswertung häufiger Fragen zur laufenden Verbesserung",
    ],
    note: {
      title: "Gekennzeichnet und begrenzt",
      text: "Der Chatbot gibt sich als KI-Assistent zu erkennen und antwortet nur auf Grundlage der Informationen, die Sie freigeben.",
    },
    example: "kundenservice",
    benefits: [
      { title: "Sofort erreichbar", text: "Kunden erhalten auch außerhalb der Geschäftszeiten eine Antwort." },
      { title: "Vollständige Anliegen", text: "Der Chatbot fragt fehlende Angaben nach, bevor er übergibt." },
      { title: "Klare Übergabe", text: "Was der Chatbot nicht sicher beantworten kann, geht an einen Menschen." },
    ],
    related: ["/leistungen/ki-entwicklung", "/loesungen/telefon-ki", "/loesungen/crm-automatisierung"],
    ctaText: "Schicken Sie uns die zehn Fragen, die Ihr Team am häufigsten beantwortet. Wir zeigen Ihnen, wie ein Chatbot damit umgehen würde.",
  },
  {
    kind: "loesung",
    slug: "telefon-ki",
    name: "Telefon-KI",
    short: "Voice Agents, die Anrufe annehmen, Anliegen aufnehmen und Termine vereinbaren.",
    title: "Telefon-KI: Anrufe annehmen, auch wenn niemand frei ist",
    metaTitle: "Telefon-KI & Voice Agents für Unternehmen",
    metaDescription:
      "Telefon-KI von QonteX: Voice Agents nehmen Anrufe an, beantworten Standardfragen, erfassen Anliegen und vereinbaren Termine, mit Übergabe an Ihr Team.",
    intro:
      "Eine Telefon-KI nimmt Anrufe an, wenn Ihr Team im Gespräch, im Termin oder unterwegs ist. Sie beantwortet Standardfragen, nimmt Anliegen strukturiert auf und trägt Termine direkt in Ihren Kalender ein.",
    audience:
      "Für Betriebe, bei denen das Telefon oft klingelt, während niemand rangehen kann: Praxen, Werkstätten, Handwerks- und Dienstleistungsbetriebe.",
    problems: [
      "Anrufe gehen verloren, während Mitarbeiter mit Kunden beschäftigt sind.",
      "Nachrichten auf dem Anrufbeantworter sind unvollständig.",
      "Terminvereinbarungen am Telefon binden viel Arbeitszeit.",
    ],
    scopeTitle: "Was dazugehört",
    scope: [
      "Gesprächsführung auf Deutsch mit natürlicher Stimme",
      "Antworten auf häufige Fragen",
      "Aufnahme von Anliegen mit Rückrufnummer",
      "Terminvereinbarung mit Anbindung an Ihren Kalender",
      "Weiterleitung dringender Anrufe an Mitarbeiter",
      "Gesprächszusammenfassung per E-Mail oder im CRM",
      "Festgelegte Hinweise an Anrufer und Regeln zum Datenschutz",
    ],
    note: {
      title: "Offen gegenüber Anrufern",
      text: "Die Telefon-KI sagt zu Beginn, dass ein KI-System das Gespräch führt. Wie mit Gesprächsdaten umgegangen wird, legen wir gemeinsam mit Ihnen fest.",
    },
    example: "terminplanung",
    benefits: [
      { title: "Weniger verpasste Anrufe", text: "Auch wenn niemand frei ist, wird das Anliegen aufgenommen." },
      { title: "Strukturierte Notizen", text: "Sie erhalten Name, Rückrufnummer und Anliegen in einheitlicher Form." },
      { title: "Ruhigeres Arbeiten", text: "Ihr Team wird seltener aus der laufenden Arbeit gerissen." },
    ],
    related: ["/loesungen/termin-buchungssysteme", "/loesungen/ki-chatbots", "/leistungen/ki-entwicklung"],
    ctaText: "Erzählen Sie uns, welche Anrufe bei Ihnen am häufigsten eingehen. Wir zeigen Ihnen, wie eine Telefon-KI damit umgeht.",
  },
  {
    kind: "loesung",
    slug: "crm-automatisierung",
    name: "CRM-Automatisierung",
    short: "Anfragen, Kontakte und Aufgaben automatisch im CRM erfassen und nachverfolgen.",
    title: "CRM-Automatisierung: Anfragen strukturiert nachverfolgen",
    metaTitle: "CRM-Automatisierung & CRM-Integration",
    metaDescription:
      "QonteX automatisiert Ihr CRM: Anfragen aus Website, E-Mail und Telefon werden automatisch erfasst, zugeordnet und nachverfolgt.",
    intro:
      "Wir verbinden Ihr CRM mit Website, E-Mail, Telefon und weiteren Systemen. Neue Anfragen werden automatisch angelegt, der richtigen Person zugewiesen und mit Erinnerungen nachverfolgt.",
    audience:
      "Für Unternehmen, die ein CRM nutzen oder einführen möchten und deren Kontakte heute teils in Postfächern, Tabellen oder Notizen liegen.",
    problems: [
      "Anfragen kommen über mehrere Kanäle und werden unterschiedlich erfasst.",
      "Nachfassen hängt davon ab, dass jemand daran denkt.",
      "Das CRM ist unvollständig, weil Daten von Hand nachgetragen werden müssen.",
    ],
    scopeTitle: "Was dazugehört",
    scope: [
      "Auswahl oder Prüfung des passenden CRM",
      "Automatische Erfassung von Anfragen aus allen Kanälen",
      "Zuweisung nach festen Regeln, z. B. nach Region oder Thema",
      "Aufgaben und Erinnerungen zum Nachfassen",
      "Abgleich mit E-Mail, Kalender und Buchhaltung",
      "Bereinigung und Übernahme bestehender Kontakte",
      "Auswertungen zu Anfragen und Abschlüssen",
    ],
    example: "crmnachfassen",
    benefits: [
      { title: "Ein vollständiges Bild", text: "Alle Anfragen und Kontakte an einem Ort." },
      { title: "Zuverlässiges Nachfassen", text: "Aufgaben und Erinnerungen entstehen automatisch." },
      { title: "Weniger Pflegeaufwand", text: "Das CRM füllt sich aus den Kanälen, statt von Hand nachgetragen zu werden." },
    ],
    related: ["/leistungen/prozessautomatisierung", "/leistungen/seo-marketingautomatisierung", "/loesungen/ki-chatbots"],
    ctaText: "Zeigen Sie uns, wie Anfragen heute bei Ihnen ankommen. Wir skizzieren, wie sie automatisch im CRM landen.",
  },
  {
    kind: "loesung",
    slug: "termin-buchungssysteme",
    name: "Termin- und Buchungssysteme",
    short: "Online-Terminbuchung und Reservierungen über Website, WhatsApp oder Telefon.",
    title: "Termin- und Buchungssysteme für Website, WhatsApp und Telefon",
    metaTitle: "Online-Terminbuchung & Buchungssysteme",
    metaDescription:
      "Online-Terminbuchung und Reservierungen über Website, WhatsApp oder Telefon-KI, mit Kalenderanbindung, Bestätigungen und Erinnerungen. Von QonteX.",
    intro:
      "Kunden buchen Termine oder Reservierungen selbst: über Ihre Website, per WhatsApp oder am Telefon mit einer Telefon-KI. Bestätigungen und Erinnerungen laufen automatisch, Ihr Kalender bleibt die eine verlässliche Übersicht.",
    audience:
      "Für Unternehmen, die viele Termine oder Reservierungen vergeben, von der Praxis über Werkstatt und Handwerksbetrieb bis zu Gastronomie und Dienstleistern.",
    problems: [
      "Terminabsprachen per Telefon und E-Mail ziehen sich über mehrere Nachrichten.",
      "Kunden erscheinen nicht, weil eine Erinnerung fehlt.",
      "Buchungen aus verschiedenen Kanälen werden von Hand zusammengeführt.",
    ],
    scopeTitle: "Was dazugehört",
    scope: [
      "Online-Terminbuchung auf Ihrer Website",
      "Buchung per WhatsApp oder Telefon-KI",
      "Anbindung an Ihren bestehenden Kalender",
      "Bestätigungen, Erinnerungen und Umbuchungen",
      "Planung von Räumen, Plätzen oder Mitarbeitern",
      "Anbindung von Online-Zahlungen auf Wunsch",
      "Übersicht aller Buchungen für Ihr Team",
    ],
    example: "terminplanung",
    benefits: [
      { title: "Weniger Abstimmung", text: "Kunden sehen freie Zeiten und buchen direkt." },
      { title: "Weniger Ausfälle", text: "Automatische Erinnerungen helfen, vergessene Termine zu vermeiden." },
      { title: "Eine Übersicht", text: "Alle Buchungen aus allen Kanälen stehen in einem Kalender." },
    ],
    related: ["/loesungen/telefon-ki", "/loesungen/ki-chatbots", "/leistungen/softwareentwicklung"],
    ctaText: "Erzählen Sie uns, wie Termine bei Ihnen heute vergeben werden. Wir zeigen Ihnen, was sich davon automatisieren lässt.",
  },
  {
    kind: "loesung",
    slug: "business-tools",
    name: "Individuelle Business-Tools",
    short: "Passgenaue Anwendungen für Aufgaben, die heute in Tabellen und E-Mails stecken.",
    title: "Individuelle Business-Tools für Ihr Team",
    metaTitle: "Individuelle Business-Tools, Dashboards & interne Software",
    metaDescription:
      "QonteX entwickelt individuelle Business-Tools: interne Anwendungen, Dashboards und Verwaltungsoberflächen, die Excel-Listen und Insellösungen ablösen.",
    intro:
      "Viele Unternehmen organisieren wichtige Abläufe in Tabellen, E-Mails und auf Zetteln. Wir entwickeln kompakte Anwendungen, die genau diese Aufgaben übernehmen: übersichtlich, mit Rechten für Ihr Team und angebunden an Ihre Systeme.",
    audience:
      "Für Teams, die mit gewachsenen Excel-Listen arbeiten oder Informationen aus mehreren Programmen zusammensuchen.",
    problems: [
      "Mehrere Versionen derselben Tabelle sind im Umlauf.",
      "Niemand hat einen aktuellen Überblick über offene Vorgänge.",
      "Berichte entstehen durch Kopieren aus verschiedenen Quellen.",
    ],
    scopeTitle: "Was dazugehört",
    scope: [
      "Interne Web-Anwendungen mit Benutzerrechten",
      "Dashboards mit automatisch aktualisierten Kennzahlen",
      "Erfassungsformulare für Außendienst und Team",
      "Verwaltungsoberflächen für Aufträge, Kunden und Bestände",
      "Import, Export und Schnittstellen zu bestehenden Programmen",
      "Betrieb, Updates und Weiterentwicklung",
    ],
    example: "einsatzbericht",
    benefits: [
      { title: "Eine Quelle", text: "Alle arbeiten mit demselben, aktuellen Stand." },
      { title: "Auf Ihre Aufgabe zugeschnitten", text: "Nur die Felder und Schritte, die Ihr Team wirklich braucht." },
      { title: "Erweiterbar", text: "Neue Funktionen kommen dazu, wenn sich Ihre Abläufe ändern." },
    ],
    related: ["/leistungen/softwareentwicklung", "/leistungen/prozessautomatisierung", "/loesungen/crm-automatisierung"],
    ctaText: "Schicken Sie uns die Tabelle, mit der Ihr Team heute arbeitet. Wir zeigen Ihnen, wie eine eigene Anwendung dafür aussehen kann.",
  },
];

/** Ergänzend: IT-Betreuung und Infrastruktur (bestehende Seiten, nicht im Hauptmenü) */
export const IT_OFFERS: Offer[] = IT_SERVICES.map((s) => ({
  kind: "it",
  slug: s.slug,
  name: s.name,
  short: s.teaser,
  title: s.title,
  metaTitle: s.title,
  metaDescription: s.metaDescription,
  intro: s.intro,
  audience: s.audience,
  problems: [s.problem],
  scopeTitle: s.scopeTitle,
  scope: s.scope,
  note: s.note,
  benefits: s.benefits,
  related: ["/leistungen/prozessautomatisierung", "/leistungen/softwareentwicklung"],
  ctaText: s.ctaText,
}));

export function offerHref(o: Pick<Offer, "kind" | "slug">): string {
  return o.kind === "loesung" ? `/loesungen/${o.slug}` : `/leistungen/${o.slug}`;
}

const ALL: Offer[] = [...LEISTUNGEN, ...LOESUNGEN, ...IT_OFFERS];

export function offerByPath(path: string): Offer | undefined {
  return ALL.find((o) => offerHref(o) === path);
}

/**
 * Frühere Adressen (bis 11/2026) → neue Seite. Die alten Seiten leiten weiter,
 * damit Links in Briefen, E-Mails und Suchmaschinen nicht ins Leere führen.
 */
export const LEGACY_LEISTUNGEN: Record<string, string> = {
  webseiten: "/leistungen/webentwicklung/",
  "seo-ki-agenten": "/leistungen/seo-marketingautomatisierung/",
  "marketing-automatisierung": "/leistungen/seo-marketingautomatisierung/",
  "online-marketing": "/leistungen/seo-marketingautomatisierung/",
  "social-media": "/leistungen/seo-marketingautomatisierung/",
  "crm-vertrieb": "/loesungen/crm-automatisierung/",
  "ki-agenten": "/loesungen/ki-chatbots/",
  dashboards: "/loesungen/business-tools/",
};
