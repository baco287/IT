import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import { FAQS } from "@/lib/faqs";
import { ADDRESS_LINE, EMAIL, PHONE_DISPLAY, PHONE_HREF, WHATSAPP_HREF } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Kontakt: Projekt besprechen",
  description:
    "Sprechen Sie mit QonteX über Ihr Projekt: KI-Agenten, Automatisierung, Websites oder Software. Telefon und WhatsApp +49 160 95257592, info@qontex.de.",
  path: "/kontakt/",
});

const CONTACT_FACTS: Array<{ label: string; value: string; href?: string; external?: boolean }> = [
  { label: "Telefon und WhatsApp", value: PHONE_DISPLAY, href: PHONE_HREF },
  { label: "WhatsApp", value: "Nachricht schreiben", href: WHATSAPP_HREF, external: true },
  { label: "E-Mail", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "Adresse", value: ADDRESS_LINE },
  { label: "Termine", value: "Nach Vereinbarung, telefonisch oder per Video" },
];

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
          title="Sprechen wir über Ihr Projekt."
          intro="Ob KI-Agent, Automatisierung, Website oder eigene Software: Im ersten Gespräch klären wir, was Sie vorhaben, was technisch sinnvoll ist und wie ein Projekt aussehen kann. Kostenlos und unverbindlich."
          crumbs={[{ label: "Kontakt" }]}
        />
        <Contact
          aside={
            <div className="rounded-[20px] bg-fog p-6 sm:p-7">
              <h3 className="text-[1.2rem]">Lieber direkt?</h3>
              <dl className="mt-3 border-t border-ink/80">
                {CONTACT_FACTS.map((f) => (
                  <div key={f.label} className="border-b border-rule py-2.5">
                    <dt className="text-[14px] text-muted">{f.label}</dt>
                    <dd className="text-[1.05rem] font-semibold text-ink [overflow-wrap:anywhere]">
                      {f.href ? (
                        <a
                          href={f.href}
                          {...(f.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="inline-flex min-h-11 items-center decoration-signal-ink decoration-2 underline-offset-4 hover:underline"
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
            </div>
          }
        />
        <Faq />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
