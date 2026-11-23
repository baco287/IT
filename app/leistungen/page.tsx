import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import OfferRows from "@/components/OfferRows";
import Cta from "@/components/Cta";
import { btnGhostDarkLg, btnSignalLg, container, textLink } from "@/components/ui";
import { IT_OFFERS, LEISTUNGEN, LOESUNGEN, offerHref } from "@/lib/offers";
import { CTA_LABEL } from "@/lib/company";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Leistungen: KI, Automatisierung, Web und Software",
  description:
    "Leistungen von QonteX: KI-Entwicklung und KI-Agenten, Prozessautomatisierung, Webentwicklung, individuelle Software sowie SEO und Marketingautomatisierung.",
  path: "/leistungen/",
});

export default function LeistungenPage() {
  return (
    <>
      <Navbar />
      <main id="inhalt">
        <PageHeader
          title="Leistungen für digitale Abläufe, die funktionieren"
          intro="Wir entwickeln KI-Systeme, automatisieren Prozesse und bauen Websites und Software. Jede Leistung lässt sich einzeln beauftragen. Oft greifen mehrere ineinander, etwa eine Website, deren Anfragen automatisch im CRM landen."
          crumbs={[{ label: "Leistungen" }]}
        >
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kontakt" className={btnSignalLg}>
              {CTA_LABEL}
            </Link>
            <Link href="/loesungen" className={btnGhostDarkLg}>
              Konkrete Lösungen ansehen
            </Link>
          </div>
        </PageHeader>

        <section aria-label="Unsere fünf Schwerpunkte" className="bg-white">
          <div className={`${container} py-16 lg:py-24`}>
            <OfferRows offers={LEISTUNGEN} linkLabel="Zur Leistung" />
          </div>
        </section>

        {/* Lösungen als Querverweis */}
        <section aria-labelledby="loesungen-heading" className="bg-fog">
          <div className={`${container} grid gap-x-16 gap-y-8 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-24`}>
            <div>
              <h2 id="loesungen-heading" className="text-[clamp(1.7rem,5.6vw,2rem)] sm:text-[2.15rem]">
                Lieber vom konkreten Anwendungsfall aus denken?
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
                Unter Lösungen finden Sie typische Aufgaben, für die wir mehrere Leistungen kombinieren.
              </p>
            </div>
            <ul className="grid border-t border-ink/80 sm:grid-cols-2 sm:gap-x-10">
              {LOESUNGEN.map((o) => (
                <li key={o.slug} className="border-b border-rule">
                  <Link
                    href={offerHref(o)}
                    className="flex min-h-14 items-center text-[17px] font-semibold text-ink decoration-signal-ink decoration-2 underline-offset-4 hover:underline"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Ergänzend: IT-Betreuung */}
        <section id="it-betreuung" aria-labelledby="it-heading" className="bg-white">
          <div className={`${container} grid gap-x-16 gap-y-8 py-20 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-24`}>
            <div>
              <h2 id="it-heading" className="text-[clamp(1.7rem,5.6vw,2rem)] sm:text-[2.15rem]">
                Ergänzend: IT-Betreuung und Infrastruktur
              </h2>
              <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">
                Software und Automatisierung brauchen eine stabile Grundlage. Auf Wunsch betreuen wir
                deshalb auch Ihre IT.
              </p>
            </div>
            <ul className="grid border-t border-ink/80 sm:grid-cols-2 sm:gap-x-10">
              {IT_OFFERS.map((o) => (
                <li key={o.slug} className="border-b border-rule py-4">
                  <Link href={offerHref(o)} className={`text-[16.5px] ${textLink}`}>
                    {o.name}
                  </Link>
                  <p className="mt-1 text-[15px] leading-snug text-muted">{o.short}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </>
  );
}
