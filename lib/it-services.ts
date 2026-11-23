/**
 * IT-Betreuung und Infrastruktur – ergänzendes Angebot neben den fünf Schwerpunkten.
 * Die Seiten liegen weiter unter /leistungen/<slug>/ und sind auf /leistungen sowie
 * im Footer verlinkt, aber nicht im Hauptmenü.
 */
export type ItService = {
  slug: string;
  name: string;
  teaser: string;
  title: string;
  metaDescription: string;
  intro: string;
  audience: string;
  problem: string;
  scopeTitle: string;
  scope: string[];
  note?: { title: string; text: string };
  benefits: { title: string; text: string }[];
  ctaText: string;
};

export const IT_SERVICES: ItService[] = [
  {
    slug: "managed-it",
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
