import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Kontakt | QonteX – Kostenloses Potenzialgespräch vereinbaren",
  description:
    "Vereinbaren Sie ein kostenloses Potenzialgespräch mit QonteX: Wir sehen uns Ihre Abläufe an und besprechen, welche Digitalisierung und Automatisierung sinnvoll ist. Telefon +49 176 25041651, info@qontex.de.",
  alternates: { canonical: "/kontakt/" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Kontakt"
          title="Finden wir heraus, wo Ihr Unternehmen Zeit und Geld sparen kann."
          intro="Im kostenlosen Potenzialgespräch schauen wir uns Ihre Abläufe an und besprechen, welche Digitalisierung und Automatisierung für Ihr Unternehmen sinnvoll ist."
          crumbs={[{ label: "Kontakt" }]}
        />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
