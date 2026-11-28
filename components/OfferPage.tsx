import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageHeader from "./PageHeader";
import Process from "./Process";
import Cta from "./Cta";
import Referenz from "./Referenz";
import FlowDiagram from "./viz/FlowDiagram";
import { CheckList, Note, SplitSection, btnGhostDarkLg, btnSignalLg, container, rowLink, textLinkDark } from "./ui";
import { EXAMPLES } from "@/lib/examples";
import { offerByPath, offerHref, type Offer } from "@/lib/offers";
import { COMPANY, CTA_LABEL } from "@/lib/company";

const KIND: Record<Offer["kind"], { label: string; href: string }> = {
  leistung: { label: "Leistungen", href: "/leistungen" },
  loesung: { label: "Lösungen", href: "/loesungen" },
  it: { label: "Leistungen", href: "/leistungen" },
};

/* Rechte Spalte im Seitenkopf: Anwendungsbeispiel als Ablauf, sonst „Für wen?" */
function HeaderAside({ offer }: { offer: Offer }) {
  const example = offer.example ? EXAMPLES[offer.example] : null;
  if (!example) {
    return (
      <div className="rounded-[20px] border border-edge bg-night-2 p-6 sm:p-8">
        <h2 className="text-[1.3rem] text-white">Für wen eignet sich das?</h2>
        <p className="mt-3 text-[16.5px] leading-relaxed text-haze">{offer.audience}</p>
      </div>
    );
  }
  return (
    <figure className="rounded-[20px] border border-edge bg-night-2 p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <figcaption className="text-[1.25rem] font-[620] leading-snug text-white [font-variation-settings:'wdth'_104]">
          {example.title}
        </figcaption>
        <span className="rounded-[6px] border border-edge px-2.5 py-1 text-[13px] text-haze">Anwendungsbeispiel</span>
      </div>
      <p className="mt-2 text-[15.5px] leading-relaxed text-haze">{example.text}</p>
      <div className="mt-7">
        <FlowDiagram steps={example.steps} compact />
      </div>
    </figure>
  );
}

/** Einheitliche Detailseite für Leistungen, Lösungen und IT-Betreuung */
export default function OfferPage({ offer }: { offer: Offer }) {
  const href = offerHref(offer);
  const url = `${COMPANY.url}${href}/`;
  const kind = KIND[offer.kind];
  const related = offer.related.map((p) => offerByPath(p)).filter((o): o is Offer => Boolean(o));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: offer.name,
        serviceType: offer.name,
        description: offer.metaDescription,
        url,
        provider: { "@id": `${COMPANY.url}/#organization` },
        areaServed: { "@type": "Country", name: "Deutschland" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: `${COMPANY.url}/` },
          { "@type": "ListItem", position: 2, name: kind.label, item: `${COMPANY.url}${kind.href}/` },
          { "@type": "ListItem", position: 3, name: offer.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title={offer.title}
          intro={offer.intro}
          crumbs={[{ href: kind.href, label: kind.label }, { label: offer.name }]}
          aside={<HeaderAside offer={offer} />}
        >
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kontakt" className={btnSignalLg}>
              {CTA_LABEL}
            </Link>
            <Link href="#umfang" className={btnGhostDarkLg}>
              {offer.scopeTitle}
            </Link>
          </div>
        </PageHeader>

        {/* Ausgangslage: für wen, welches Problem */}
        <SplitSection
          tone="fog"
          headingId="ausgangslage-heading"
          title="Typische Ausgangslage"
          text={offer.audience}
        >
          {offer.problems.length > 1 ? (
            <ul className="border-t border-ink/80">
              {offer.problems.map((p) => (
                <li key={p} className="flex gap-4 border-b border-rule py-4 text-[17px] leading-relaxed text-text">
                  <span aria-hidden className="mt-[0.62em] h-1.5 w-1.5 flex-none rounded-full bg-ink/45" />
                  {p}
                </li>
              ))}
            </ul>
          ) : (
            <p className="border-t border-ink/80 pt-5 text-[17px] leading-relaxed text-text">{offer.problems[0]}</p>
          )}
        </SplitSection>

        {/* Leistungsumfang */}
        <SplitSection id="umfang" headingId="umfang-heading" title={offer.scopeTitle}>
          <div className="border-t border-ink/80">
            <CheckList items={offer.scope} />
          </div>
          {offer.note && <Note title={offer.note.title}>{offer.note.text}</Note>}
        </SplitSection>

        {/* Nutzen */}
        <section aria-labelledby="nutzen-heading" className="bg-fog">
          <div className={`${container} py-20 lg:py-24`}>
            <h2 id="nutzen-heading" className="text-[clamp(1.7rem,5.6vw,2rem)] sm:text-[2.15rem]">
              Was Sie davon haben
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-8 md:grid-cols-3">
              {offer.benefits.map((b) => (
                <li key={b.title} className="border-t-2 border-signal-ink pt-5">
                  <h3 className="text-[1.25rem]">{b.title}</h3>
                  <p className="mt-2 text-[16.5px] leading-relaxed text-muted">{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Echte Referenz zwischen Nutzen (hellgrau) und Ablauf – der Ablauf wird dann
            hellgrau, damit sich die Flächen weiter abwechseln */}
        {offer.reference && <Referenz />}

        <Process id="ablauf" tone={offer.reference ? "fog" : undefined} />

        {/* Verwandte Seiten */}
        {related.length > 0 && (
          <section aria-labelledby="verwandt-heading" className="on-dark border-t border-edge bg-night">
            <div className={`${container} py-16 lg:py-20`}>
              <h2 id="verwandt-heading" className="text-[1.6rem] text-white sm:text-[1.8rem]">
                Passt dazu
              </h2>
              <ul className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((o) => (
                  <li
                    key={o.slug}
                    className="relative rounded-[18px] border border-edge bg-night-2 p-6 transition-colors hover:border-signal/45"
                  >
                    <h3 className="text-[1.25rem] text-white">
                      <Link href={offerHref(o)} className={rowLink}>
                        {o.name}
                      </Link>
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-haze">{o.short}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8">
                <Link href={kind.href} className={`inline-flex min-h-11 items-center text-[15.5px] ${textLinkDark}`}>
                  Alle {kind.label} im Überblick
                </Link>
              </p>
            </div>
          </section>
        )}

        <Cta title="Sprechen wir über Ihr Vorhaben." text={offer.ctaText} />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
