import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | QonteX",
  description: "Datenschutzerklärung für die QonteX-Website der Volt Gas UG (haftungsbeschränkt).",
  robots: { index: false },
};

const h2 = "mt-10 mb-3 text-xl font-bold text-ink";
const p = "mb-3 text-[15px] leading-relaxed text-muted";
const link = "font-medium text-teal-text underline underline-offset-2";

export default function Datenschutz() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 pb-24 pt-14 [overflow-wrap:anywhere] sm:px-8 lg:pt-20">
        <h1 className="text-[2.2rem] font-bold tracking-tight">
          Datenschutzerklärung
        </h1>
        <p className={`${p} mt-4`}>Stand: November 2026</p>

        <h2 className={h2}>1. Verantwortlicher</h2>
        <p className={p}>
          Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
          <br />
          Volt Gas UG (haftungsbeschränkt)
          <br />
          Pappelallee 64, 10437 Berlin, Deutschland
          <br />
          Telefon: +49 176 25041651 · E-Mail: info@qontex.de
        </p>

        <h2 className={h2}>2. Allgemeines zur Datenverarbeitung</h2>
        <p className={p}>
          Wir verarbeiten personenbezogene Daten unserer Besucher grundsätzlich
          nur, soweit dies zur Bereitstellung einer funktionsfähigen Website
          sowie zur Bearbeitung von Anfragen erforderlich ist. Diese Website
          verwendet keine Cookies und setzt keine Analyse- oder Tracking-Dienste
          ein.
        </p>
        <p className={p}>
          Der Einsparrechner und die animierten Beispielabläufe auf dieser
          Website laufen ausschließlich in Ihrem Browser. Ihre Eingaben im
          Rechner werden weder gespeichert noch an uns oder Dritte übertragen.
        </p>

        <h2 className={h2}>3. Hosting</h2>
        <p className={p}>
          Diese Website wird auf einem eigenen Server bei der Hetzner Online GmbH,
          Industriestr. 25, 91710 Gunzenhausen, Deutschland, betrieben. Der Server
          steht in einem Rechenzentrum in Deutschland. Beim Aufruf der Website
          werden technisch notwendige Daten wie Ihre IP-Adresse, Datum und Uhrzeit
          des Zugriffs, die aufgerufene Seite und Browserinformationen in
          Server-Logfiles gespeichert. Die Verarbeitung erfolgt auf Grundlage
          unseres berechtigten Interesses an einer sicheren und zuverlässigen
          Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO). Die Logfiles
          werden nach 14 Tagen automatisch gelöscht. Weitere Informationen finden
          Sie in der{" "}
          <a
            href="https://www.hetzner.com/de/legal/privacy-policy/"
            className={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von Hetzner
          </a>
          .
        </p>

        <h2 className={h2}>4. Kontaktformular</h2>
        <p className={p}>
          Wenn Sie unser Kontaktformular nutzen, verarbeiten wir die von Ihnen
          angegebenen Daten (Name, ggf. Unternehmen, E-Mail-Adresse, ggf.
          Telefonnummer, gewünschte Leistung und Ihre Nachricht) zur Bearbeitung
          Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
          (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO
          (berechtigtes Interesse an der Beantwortung von Anfragen).
        </p>
        <p className={p}>
          Für die technische Übermittlung des Formulars nutzen wir den Dienst
          FormSubmit (formsubmit.co). Ihre Angaben werden dabei an FormSubmit
          übertragen und von dort per E-Mail an uns weitergeleitet. Wir löschen
          Anfragedaten, sobald sie für die Bearbeitung nicht mehr erforderlich
          sind und keine gesetzlichen Aufbewahrungspflichten bestehen.
        </p>

        <h2 className={h2}>5. Schriftarten</h2>
        <p className={p}>
          Die verwendeten Schriftarten (Inter und Plus Jakarta Sans)
          sind lokal auf unserem Hosting eingebunden. Beim Laden der Schriften
          findet keine Verbindung zu Servern von Google oder anderen
          Schriftanbietern statt.
        </p>

        <h2 className={h2}>6. Ihre Rechte</h2>
        <p className={p}>
          Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie
          betreffenden personenbezogenen Daten: Recht auf Auskunft (Art. 15
          DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO),
          Einschränkung der Verarbeitung (Art. 18 DSGVO), Datenübertragbarkeit
          (Art. 20 DSGVO) sowie Widerspruch gegen die Verarbeitung (Art. 21
          DSGVO). Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an
          info@qontex.de.
        </p>
        <p className={p}>
          Ihnen steht zudem ein Beschwerderecht bei einer
          Datenschutz-Aufsichtsbehörde zu, etwa bei der Berliner Beauftragten
          für Datenschutz und Informationsfreiheit.
        </p>

        <h2 className={h2}>7. Aktualität dieser Erklärung</h2>
        <p className={p}>
          Wir passen diese Datenschutzerklärung an, sobald sich der Umfang der
          Datenverarbeitung auf dieser Website ändert.
        </p>
      </main>
      <Footer />
    </>
  );
}
