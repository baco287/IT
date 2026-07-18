import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum | QonteX",
  description: "Impressum und Anbieterkennzeichnung von QonteX, einer Marke der Volt Gas UG (haftungsbeschränkt).",
  robots: { index: false },
};

const h2 = "mt-10 mb-3 font-[family-name:var(--font-display)] text-xl font-semibold text-white";
const p = "text-sm leading-relaxed text-fog";

export default function Impressum() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white">
          Impressum
        </h1>

        <h2 className={h2}>Angaben gemäß § 5 DDG</h2>
        <p className={p}>
          QonteX ist ein Angebot der
          <br />
          <strong className="text-mist">Volt Gas UG (haftungsbeschränkt)</strong>
          <br />
          Pappelallee 64
          <br />
          10437 Berlin
          <br />
          Deutschland
        </p>

        <h2 className={h2}>Vertreten durch</h2>
        <p className={p}>Geschäftsführer: Ahmet Kerim Akan</p>

        <h2 className={h2}>Kontakt</h2>
        <p className={p}>
          Telefon: +49 176 25041651
          <br />
          E-Mail: info@volt-gas.de
        </p>

        <h2 className={h2}>Registereintrag</h2>
        <p className={p}>
          Eintragung im Handelsregister
          <br />
          Registergericht: Amtsgericht Charlottenburg (Berlin)
          <br />
          Registernummer: HRB 289458 B
        </p>

        <h2 className={h2}>Umsatzsteuer-ID</h2>
        <p className={p}>
          Die Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG ist beim
          zuständigen Finanzamt beantragt und wird nach Erteilung an dieser
          Stelle nachgetragen.
        </p>

        <h2 className={h2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p className={p}>
          Ahmet Kerim Akan
          <br />
          Pappelallee 64, 10437 Berlin
        </p>

        <h2 className={h2}>EU-Streitschlichtung</h2>
        <p className={p}>
          Die Europäische Kommission stellt eine Plattform zur
          Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            className="text-cyan underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Unsere E-Mail-Adresse finden Sie oben im Impressum.
        </p>

        <h2 className={h2}>Verbraucherstreitbeilegung</h2>
        <p className={p}>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

        <h2 className={h2}>Haftung für Inhalte</h2>
        <p className={p}>
          Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach
          den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht
          verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
          überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
          Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der
          Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
          unberührt.
        </p>

        <h2 className={h2}>Haftung für Links</h2>
        <p className={p}>
          Unser Angebot enthält Links zu externen Websites Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten
          Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
          Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
          Rechtsverstöße überprüft.
        </p>

        <h2 className={h2}>Urheberrecht</h2>
        <p className={p}>
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers.
        </p>
      </main>
      <Footer />
    </>
  );
}
