import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/faqs";
import { ADDRESS_LINE, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/company";

export const metadata: Metadata = {
  title: "Kontakt | QonteX – Kostenloses Potenzialgespräch vereinbaren",
  description:
    "Vereinbaren Sie ein kostenloses Potenzialgespräch mit QonteX: Wir sehen uns Ihre Abläufe an und besprechen, welche Digitalisierung und Automatisierung sinnvoll ist. Telefon +49 176 25041651, info@qontex.de.",
  alternates: { canonical: "/kontakt/" },
};

const CONTACT_FACTS: Array<{ label: string; value: string; href?: string }> = [
  { label: "Telefon", value: PHONE_DISPLAY, href: PHONE_HREF },
  { label: "E-Mail", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Adresse", value: ADDRESS_LINE },
  { label: "Erreichbarkeit", value: "Termine nach Vereinbarung" },
];

const ddCls =
  "font-[family-name:var(--font-display)] text-[1.35rem] font-bold leading-snug [overflow-wrap:anywhere]";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function KontaktPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Finden wir heraus, wo Ihr Unternehmen Zeit und Geld sparen kann."
          intro="Im kostenlosen Potenzialgespräch schauen wir uns Ihre Abläufe an und besprechen, welche Digitalisierung und Automatisierung für Ihr Unternehmen sinnvoll ist."
          crumbs={[{ label: "Kontakt" }]}
          aside={
            <>
              <h2 className="text-[1.45rem] leading-tight">So erreichen Sie uns</h2>
              <dl className="mt-5 border-t-2 border-ink">
                {CONTACT_FACTS.map((f) => (
                  <div key={f.label} className="border-b border-ink/25 py-3">
                    <dt className="text-[14px]">{f.label}</dt>
                    <dd className={ddCls}>
                      {f.href ? (
                        <a
                          href={f.href}
                          className="inline-flex min-h-11 items-center decoration-2 underline-offset-4 hover:underline"
                        >
                          {f.value}
                        </a>
                      ) : (
                        <span className="inline-flex min-h-11 items-center">{f.value}</span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-[14px] leading-relaxed">
                QonteX ist ein Angebot der Volt Gas UG (haftungsbeschränkt), Berlin.
              </p>
            </>
          }
        />
        <Contact />
        <Faq />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
