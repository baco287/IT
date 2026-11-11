import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AutomationFlow from "@/components/AutomationFlow";
import Services from "@/components/Services";
import MarketingTeam from "@/components/MarketingTeam";
import Savings from "@/components/Savings";
import References from "@/components/References";
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
      <main>
        <Hero />
        <AutomationFlow />
        <Services />
        <MarketingTeam />
        <Savings />
        <References />
        <Steps />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
