import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Cloud from "@/components/Cloud";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Lösungen | QonteX – Infrastruktur, Cybersecurity & Cloud",
  description:
    "Technische Lösungen von QonteX: leistungsfähige Server-Infrastruktur, mehrschichtige Cybersecurity und flexible Cloud- und Netzwerklösungen für Unternehmen.",
};

export default function LoesungenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Infrastructure />
        <Security />
        <Cloud />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
