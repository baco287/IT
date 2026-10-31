import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StabilitySection from "@/components/StabilitySection";
import ServicePanel from "@/components/ServicePanel";
import MonitoringStat from "@/components/MonitoringStat";
import AgentHub from "@/components/AgentHub";
import KiTrio from "@/components/KiTrio";
import FeatureGrid from "@/components/FeatureGrid";
import DigitalTrio from "@/components/DigitalTrio";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StabilitySection />
        <ServicePanel />
        <MonitoringStat />
        <AgentHub />
        <KiTrio />
        <DigitalTrio />
        <FeatureGrid />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
