import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Leistungen | QonteX – Managed IT, Cloud, Cybersecurity & KI-Agenten",
  description:
    "Alle IT-Leistungen von QonteX im Überblick: Managed IT Services, IT-Support, Cloud-Lösungen, Cybersecurity, Server & Netzwerke, Backup & Recovery und KI-Agenten.",
};

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Services />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
