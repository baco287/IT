import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Why from "@/components/Why";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import { MEDIA } from "@/lib/media";
import ManagedIT from "@/components/ManagedIT";
import Stats from "@/components/Stats";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Über QonteX | IT-Partnerschaft statt anonymer Hotline",
  description:
    "Lernen Sie QonteX kennen: persönliche IT-Betreuung, proaktive Arbeitsweise und ein klarer Ablauf von der Analyse bis zum laufenden Betrieb.",
};

export default function UeberPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <About />
        {/* Optionaler Platz für ECHTES Team-/Arbeitsplatz-Material –
            kein Stock, keine KI-Menschen. Aktivierung nur über lib/media.ts,
            sobald eigene Aufnahmen vorliegen. Bis dahin unverändert. */}
        {MEDIA.about.team.enabled && (
          <section className="px-6 pb-8" aria-label="Einblick in die Arbeit von QonteX">
            <div className="mx-auto max-w-6xl">
              <SmartAmbientVideo
                asset={MEDIA.about.team}
                className="overflow-hidden rounded-2xl border border-white/10"
              />
            </div>
          </section>
        )}
        <Why />
        <ManagedIT />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
