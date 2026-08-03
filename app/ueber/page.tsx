import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Why from "@/components/Why";
import ManagedIT from "@/components/ManagedIT";
import Stats from "@/components/Stats";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Über QonteX | IT-Partnerschaft statt anonymer Hotline",
  description:
    "Lernen Sie QonteX kennen: persönliche IT-Betreuung, proaktive Arbeitsweise und ein klarer Ablauf von der Analyse bis zum laufenden Betrieb.",
};

export default function UeberPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <About />
        <Why />
        <ManagedIT />
        <Stats />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
