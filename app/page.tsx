import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import ServiceGrid from "@/components/home/ServiceGrid";
import UseCases from "@/components/home/UseCases";
import Process from "@/components/Process";
import Technology from "@/components/home/Technology";
import Industries from "@/components/home/Industries";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import { HOME_FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: { absolute: "QonteX – IT-Lösungen und KI-Automatisierung für Unternehmen" },
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <Hero />
        <ServiceGrid />
        <UseCases />
        <Process />
        <Technology />
        <Industries />
        <Faq
          items={HOME_FAQS}
          title="Was Unternehmen uns vorab fragen"
          text="Kosten, Datenschutz, Mitarbeiter: die Antworten auf die häufigsten Fragen vor einem ersten Gespräch."
          showAllLink
        />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
