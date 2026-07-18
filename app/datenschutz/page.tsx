import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | QonteX",
  description: "Datenschutzerklärung für die QonteX-Website der Volt Gas UG (haftungsbeschränkt).",
  robots: { index: false },
};

const h2 = "mt-10 mb-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white";
const h3 = "mt-6 mb-2 text-base font-semibold text-mist";
const p = "mb-3 text-sm leading-relaxed text-fog";

export default function Datenschutz() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
          Datenschutzerklärung
        </h1>
        <p className={`${p} mt-4`}>Stand: Juli 2026</p>

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

        <h2 className={h2}>3. Hosting (GitHub Pages)</h2>
        <p className={p}>
          Diese Website wird bei GitHub Pages gehostet, einem Dienst der GitHub
          Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA. Beim
          Aufruf der Website verarbeitet GitHub technisch notwendige Daten wie
          Ihre IP-Adresse, Datum und Uhrzeit des Zugriffs, die aufgerufene Seite
          und Browserinformationen (Server-Logfiles). Die Verarbeitung erfolgt
          auf Grundlage unseres berechtigten Interesses an einer sicheren und
          zuverlässigen Bereitstellung der Website (Art. 6 Abs. 1 lit. f DSGVO).
          GitHub ist unter dem EU-US Data Privacy Framework zertifiziert.
          Weitere Informationen finden Sie in der{" "}
          <a
            href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement"
            className="text-cyan underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzerklärung von GitHub
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
        <h3 className={h3}>Lokal eingebundene Schriften</h3>
        <p className={p}>
          Die Schriftarten Inter und JetBrains Mono sind lokal auf unserem
          Hosting eingebunden. Beim Laden dieser Schriften findet keine
          Verbindung zu Servern von Google statt.
        </p>
        <h3 className={h3}>Fontshare</h3>
        <p className={p}>
          Die Überschriften-Schriftart Clash Display wird über das Content
          Delivery Network von Fontshare (Indian Type Foundry) geladen. Dabei
          wird Ihre IP-Adresse an die Server von Fontshare übermittelt, um die
          Schriftdateien auszuliefern. Rechtsgrundlage ist unser berechtigtes
          Interesse an einer einheitlichen Darstellung der Website (Art. 6
          Abs. 1 lit. f DSGVO). Fontshare gibt an, keine Nutzerprofile zu
          erstellen und keine Cookies zu setzen.
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
