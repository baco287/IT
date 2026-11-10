import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import References from "@/components/References";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Referenzen | QonteX – Projekte, die im Einsatz sind",
  description:
    "Referenzen von QonteX: Volt-Gas, DeutscheZulassung, Heizwechsel und Hairvenly – Webseiten und Plattformen, die wir umgesetzt haben und die heute im Einsatz sind.",
};

export default function ReferenzenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Referenzen"
          title="Projekte, die wir umgesetzt haben."
          intro="Ein Auszug aus unserer Arbeit: Webseiten, Online-Shops und digitale Anfrage-Strecken für Unternehmen aus unterschiedlichen Branchen."
          crumbs={[{ label: "Referenzen" }]}
        />
        <References standalone />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
