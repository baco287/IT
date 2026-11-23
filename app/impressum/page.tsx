import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PHONE_DISPLAY } from "@/lib/company";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung von QonteX, einer Marke der Volt Gas UG (haftungsbeschränkt).",
  robots: { index: false },
};

const h2 = "mt-10 mb-3 text-xl font-bold text-ink";
const p = "text-[15px] leading-relaxed text-muted";

export default function Impressum() {
  return (
    <>
      <Navbar />
      <main id="inhalt" className="mx-auto max-w-3xl px-5 pb-24 pt-14 [overflow-wrap:anywhere] sm:px-8 lg:pt-20">
        <h1 className="text-[2.2rem] font-bold tracking-tight">
          Impressum
        </h1>

        <h2 className={h2}>Angaben gemäß § 5 DDG</h2>
        <p className={p}>
          QonteX ist ein Angebot der
          <br />
          <strong className="text-ink">Volt Gas UG (haftungsbeschränkt)</strong>
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
          Telefon und WhatsApp: {PHONE_DISPLAY}
          <br />
          E-Mail: info@qontex.de
          <br />
          Website: https://qontex.de
        </p>

        <h2 className={h2}>Handelsregister</h2>
        <p className={p}>
          Registergericht: Amtsgericht Charlottenburg (Berlin)
          <br />
          Registernummer: HRB 289458 B
        </p>

        <h2 className={h2}>Umsatzsteuer</h2>
        <p className={p}>
          Die Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG ist beim
          zuständigen Finanzamt beantragt und wird nach Erteilung an dieser
          Stelle nachgetragen.
        </p>

        <h2 className={h2}>Tätigkeitsbereich</h2>
        <p className={p}>
          QonteX erbringt IT-Dienstleistungen für Unternehmen, insbesondere
          die Entwicklung von KI-Agenten und KI-Anwendungen,
          Prozessautomatisierung, Web- und Softwareentwicklung,
          Marketingautomatisierung sowie IT-Betreuung. Die Leistungen werden im
          Auftrag der Kunden auf Grundlage individueller Vereinbarungen
          erbracht.
        </p>

        <h2 className={h2}>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p className={p}>
          Ahmet Kerim Akan
          <br />
          Pappelallee 64, 10437 Berlin
        </p>

        <h2 className={h2}>Verbraucherstreitbeilegung</h2>
        <p className={p}>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </main>
      <Footer />
    </>
  );
}
