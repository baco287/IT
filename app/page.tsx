import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServiceCards from "@/components/ServiceCards";
import StabilitySection from "@/components/StabilitySection";
import ServicePanel from "@/components/ServicePanel";
import MonitoringStat from "@/components/MonitoringStat";
import KiTrio from "@/components/KiTrio";
import AgentHub from "@/components/AgentHub";
import FeatureGrid from "@/components/FeatureGrid";
import References from "@/components/References";
import DigitalTrio from "@/components/DigitalTrio";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServiceCards />
        <StabilitySection />
        <ServicePanel />
        <MonitoringStat />
        <KiTrio />
        <AgentHub />
        <References />
        <DigitalTrio />
        <FeatureGrid />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
