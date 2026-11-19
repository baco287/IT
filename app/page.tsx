import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import MarketingTeam from "@/components/MarketingTeam";
import Savings from "@/components/Savings";
import Steps from "@/components/Steps";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <Hero />
        <Services />
        <MarketingTeam />
        <Savings />
        <Steps />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
