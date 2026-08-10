import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Infrastructure from "@/components/Infrastructure";
import SecurityBand from "@/components/SecurityBand";
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
        <Services />
        <Infrastructure />
        <SecurityBand />
        <References />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
