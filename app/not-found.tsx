import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { btnGhostDark, btnSignal, container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false },
};

/* Deutsche 404-Seite mit Menü und Footer statt der englischen Standardseite */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="inhalt" className="on-dark relative isolate overflow-hidden bg-night">
        <div className="grid-field pointer-events-none absolute inset-0 -z-10" aria-hidden />
        <div className={`${container} py-24 lg:py-36`}>
          <h1 className="max-w-3xl text-[2.3rem] leading-[1.06] text-white sm:text-[3.1rem]">
            Diese Seite gibt es nicht.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-haze">
            Der Link ist veraltet oder enthält einen Tippfehler. Über die Startseite oder die
            Übersicht der Leistungen finden Sie, was Sie suchen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/" className={btnSignal}>
              Zur Startseite
            </Link>
            <Link href="/leistungen" className={btnGhostDark}>
              Leistungen ansehen
            </Link>
            <Link href="/kontakt" className={btnGhostDark}>
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
