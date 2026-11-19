import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { btnPrimary, btnSecondary, container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | QonteX",
  robots: { index: false },
};

/* Deutsche 404-Seite mit Menü und Footer statt der englischen Standardseite */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="inhalt" className="bg-white">
        <div className={`${container} py-24 lg:py-32`}>
          <h1 className="max-w-3xl text-[2.3rem] font-bold leading-[1.06] sm:text-[3.1rem]">
            Diese Seite gibt es nicht.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Der Link ist veraltet oder enthält einen Tippfehler. Über die Startseite oder die
            Leistungsübersicht finden Sie, was Sie suchen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/" className={btnPrimary}>
              Zur Startseite
            </Link>
            <Link href="/leistungen" className={btnSecondary}>
              Leistungen ansehen
            </Link>
            <Link href="/kontakt" className={btnSecondary}>
              Kontakt aufnehmen
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
