import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Infrastructure from "@/components/Infrastructure";
import Security from "@/components/Security";
import Cloud from "@/components/Cloud";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Technik & Lösungen | QonteX – Infrastruktur, IT-Sicherheit & Cloud",
  description:
    "Technische Lösungen von QonteX: zuverlässige Server-Infrastruktur, abgestimmte IT-Sicherheit und flexible Cloud- und Netzwerklösungen für Unternehmen.",
};

export default function LoesungenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Technik & Lösungen"
          title="Die Technik hinter zuverlässiger IT."
          intro="Ein Blick auf die Bausteine, mit denen wir arbeiten: stabile Infrastruktur, abgestimmte IT-Sicherheit und moderne Cloud-Lösungen."
          crumbs={[{ label: "Technik & Lösungen" }]}
        />
        <Infrastructure />
        <Security />
        <Cloud />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
