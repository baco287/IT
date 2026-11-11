import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import References from "@/components/References";
import Cta from "@/components/Cta";

export const metadata: Metadata = {
  title: "Referenzen | QonteX – Projekte, die im Einsatz sind",
  description:
    "Referenzen von QonteX: Volt-Gas, DeutscheZulassung, Heizwechsel und Hairvenly – Webseiten, Rechner und Anfrage-Strecken, die wir umgesetzt haben und die heute im Einsatz sind.",
  alternates: { canonical: "/referenzen/" },
};

export default function ReferenzenPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          eyebrow="Referenzen"
          title="Projekte, die heute im Einsatz sind."
          intro="Ein Auszug aus unserer Arbeit: Webseiten, Online-Shops, Rechner und digitale Anfrage-Strecken – jeweils mit Aufgabe und umgesetzter Lösung."
          crumbs={[{ label: "Referenzen" }]}
        />
        <References standalone tone="white" />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
