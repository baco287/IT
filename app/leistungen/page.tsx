import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Leistungen | QonteX – Managed IT, Cloud, Webseiten, Marketing & KI-Agenten",
  description:
    "Alle Leistungen von QonteX im Überblick: Managed IT, IT-Support, Cloud, Cybersecurity, Server & Netzwerke, Backup & Recovery, Webseiten, Ads & Online-Marketing, Social Media und KI-Agenten.",
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
