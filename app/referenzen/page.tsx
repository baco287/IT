import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import References from "@/components/References";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Referenzen | QonteX – Live-Projekte aus vier Branchen",
  description:
    "Referenzen von QonteX: Volt-Gas, DeutscheZulassung, Heizwechsel und Hairvenly – vier Plattformen aus Energie, Mobilität, Handwerk und E-Commerce, live im Einsatz.",
};

export default function ReferenzenPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <References />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
