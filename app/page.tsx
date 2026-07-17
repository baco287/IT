import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Cloud from "@/components/Cloud";
import ManagedIT from "@/components/ManagedIT";
import Stats from "@/components/Stats";
import Why from "@/components/Why";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Contact from "@/components/Contact";
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
        <Security />
        <Cloud />
        <ManagedIT />
        <Stats />
        <Why />
        <About />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
