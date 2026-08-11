import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import FeatureTabs from "@/components/FeatureTabs";
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
        <FeatureTabs />
        <FeatureGrid />
        <References />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
