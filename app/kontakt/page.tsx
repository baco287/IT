import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";

export const metadata: Metadata = {
  title: "Kontakt | QonteX – Kostenloses IT-Erstgespräch vereinbaren",
  description:
    "Nehmen Sie Kontakt zu QonteX auf: kostenloses Erstgespräch, schnelle Rückmeldung und ehrliche Empfehlungen für Ihre IT. Telefon +49 176 25041651, info@qontex.de.",
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Kontakt"
          title="Lassen Sie uns über Ihre IT sprechen."
          intro="In einem kostenlosen Erstgespräch besprechen wir Ihre Anforderungen und finden gemeinsam die passende Lösung."
          crumbs={[{ label: "Kontakt" }]}
        />
        <Contact />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
