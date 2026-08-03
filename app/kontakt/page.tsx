import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "Kontakt | QonteX – Kostenlose IT-Erstberatung anfragen",
  description:
    "Nehmen Sie Kontakt zu QonteX auf: kostenlose Erstberatung, Antwort innerhalb kurzer Zeit und ehrliche Empfehlungen für Ihre IT.",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
