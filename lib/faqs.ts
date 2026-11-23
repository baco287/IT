/** Häufige Fragen – einmal gepflegt, genutzt für die Kontaktseite und die strukturierten Daten. */
export const FAQS: Array<{ q: string; a: string }> = [
  {
    q: "Für welche Unternehmen arbeitet QonteX?",
    a: "Für kleine und mittelständische Unternehmen aller Branchen, vom Handwerksbetrieb über Praxen, Agenturen und Händler bis zu Industrie- und Produktionsunternehmen. Entscheidend ist nicht die Branche, sondern dass wiederkehrende Abläufe heute Zeit kosten.",
  },
  {
    q: "Was passiert im ersten Gespräch?",
    a: "Wir sprechen über Ihr Vorhaben und Ihre bestehenden Abläufe: Wo entsteht Handarbeit, welche Systeme sind im Einsatz, was soll sich ändern? Danach erhalten Sie eine ehrliche Einschätzung, was technisch sinnvoll ist. Das Erstgespräch ist kostenlos und unverbindlich.",
  },
  {
    q: "Welche Abläufe lassen sich automatisieren?",
    a: "Typisch sind wiederkehrende Aufgaben mit klaren Regeln: Anfragen erfassen und beantworten, Termine vergeben, Daten zwischen Systemen übertragen, Dokumente auslesen oder Berichte erstellen. Was sich in Ihrem Unternehmen eignet, klären wir in der Analyse.",
  },
  {
    q: "Ersetzen KI-Agenten unsere Mitarbeiter?",
    a: "Nein. KI-Agenten übernehmen Vorarbeit und Routine, etwa Standardfragen, Einordnung von Anfragen oder das Auslesen von Dokumenten. Entscheidungen, Freigaben und der persönliche Kontakt zu Ihren Kunden bleiben bei Ihrem Team.",
  },
  {
    q: "Können Sie mit unserer bestehenden Software arbeiten?",
    a: "In den meisten Fällen ja. Viele CRM-, ERP-, Shop- und Kalendersysteme bieten Schnittstellen, über die wir Daten austauschen. Ob und wie das bei Ihren Programmen geht, prüfen wir vor dem Angebot.",
  },
  {
    q: "Wie geht QonteX mit Datenschutz um?",
    a: "Wir planen datensparsam und legen vor dem Start gemeinsam mit Ihnen fest, welche Daten verarbeitet werden, welche Anbieter zum Einsatz kommen und wo die Verarbeitung stattfindet.",
  },
  {
    q: "Garantieren Sie bestimmte Ergebnisse, etwa Einsparungen oder Google-Platzierungen?",
    a: "Nein, denn das lässt sich seriös nicht garantieren. Wir vereinbaren klare Ziele, messen, was erreicht wurde, und verbessern die Lösung Schritt für Schritt.",
  },
  {
    q: "Was kostet ein Projekt?",
    a: "Das hängt vom Umfang ab. Nach dem Erstgespräch und einer kurzen Analyse erhalten Sie ein Angebot mit festem Leistungsumfang, bevor wir starten.",
  },
];

/** Die vier Fragen, die vor einer Anfrage am häufigsten offen sind – für die Startseite */
export const HOME_FAQS = [
  "Was kostet ein Projekt?",
  "Ersetzen KI-Agenten unsere Mitarbeiter?",
  "Garantieren Sie bestimmte Ergebnisse, etwa Einsparungen oder Google-Platzierungen?",
  "Wie geht QonteX mit Datenschutz um?",
].map((q) => FAQS.find((f) => f.q === q)!);
