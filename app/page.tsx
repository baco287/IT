import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import KiAgents from "@/components/KiAgents";
import References from "@/components/References";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <KiAgents />
        <References />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
