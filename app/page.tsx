import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ServicePanel from "@/components/ServicePanel";
import FeatureGrid from "@/components/FeatureGrid";
import References from "@/components/References";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <ServicePanel />
        <FeatureGrid />
        <References />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
