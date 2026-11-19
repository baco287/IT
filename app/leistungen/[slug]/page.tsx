import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";
import Steps from "@/components/Steps";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import {
  CheckRows,
  Compare,
  DefRows,
  NumberedColumns,
  PlainSection,
  SectionHead,
  SplitSection,
  btnPrimary,
  btnSecondary,
  container,
} from "@/components/ui";
import { SERVICES, getService, servicesByGroup, type ServiceGroup } from "@/lib/services";
import { COMPANY, CTA_LABEL } from "@/lib/company";
import { MEDIA } from "@/lib/media";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const title = `${service.title.replace(/\.$/, "")} | QonteX`;
  return {
    title,
    description: service.metaDescription,
    alternates: { canonical: `/leistungen/${service.slug}/` },
    openGraph: { title, description: service.metaDescription, type: "website", locale: "de_DE" },
  };
}

const CHANNEL_ICONS = { whatsapp: MessageCircle, telefon: Phone, mail: Mail } as const;

const GROUP_LABELS: Array<{ group: ServiceGroup; label: string }> = [
  { group: "kern", label: "Kernleistungen" },
  { group: "ergaenzend", label: "Ergänzende Leistungen" },
  { group: "it", label: "IT & Infrastruktur" },
];

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const heroMedia = MEDIA.services[slug];
  const url = `${COMPANY.url}/leistungen/${service.slug}/`;

  /* Alle Abschnitte sind weiß und durch eine feine Linie getrennt –
     nur der erste direkt unter dem Seitenkopf bekommt keine. */
  let n = 0;
  const rule = () => n++ > 0;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        description: service.metaDescription,
        url,
        provider: { "@id": `${COMPANY.url}/#organization` },
        areaServed: { "@type": "Country", name: "Deutschland" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Startseite", item: `${COMPANY.url}/` },
          { "@type": "ListItem", position: 2, name: "Leistungen", item: `${COMPANY.url}/leistungen/` },
          { "@type": "ListItem", position: 3, name: service.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <main id="inhalt">
        {/* 1. Was ist die Leistung? – rechts auf Türkis: 2. Für wen? / 3. Welches Problem? */}
        <PageHeader
          title={service.title}
          intro={service.intro}
          crumbs={[{ href: "/leistungen", label: "Leistungen" }, { label: service.name }]}
          aside={
            <>
              <h2 className="text-[1.45rem] leading-tight">Für wen eignet sich das?</h2>
              <p className="mt-2.5 text-[17px] leading-relaxed">{service.audience}</p>
              <h2 className="mt-8 border-t border-ink/25 pt-7 text-[1.45rem] leading-tight">
                Welches Problem lösen wir?
              </h2>
              <p className="mt-2.5 text-[17px] leading-relaxed">{service.problem}</p>
            </>
          }
        >
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/kontakt" className={btnPrimary}>
              {CTA_LABEL}
            </Link>
            <Link href="#umfang" className={btnSecondary}>
              Was wir übernehmen
            </Link>
          </div>
        </PageHeader>

        {/* Optionaler Medienbereich – nur sichtbar, wenn in lib/media.ts aktiviert */}
        {heroMedia?.enabled && (
          <div className={`${container} pt-12`}>
            <SmartAmbientVideo asset={heroMedia} className="overflow-hidden" />
          </div>
        )}

        {/* Zusammenhang als Kette (z. B. Webseiten: von der Sichtbarkeit bis zur Messung) */}
        {service.chain && (
          <PlainSection headingId="chain-heading" rule={rule()}>
            <SectionHead title={<span id="chain-heading">{service.chainTitle}</span>} text={service.chainIntro} />
            <div className="mt-12">
              <NumberedColumns items={service.chain} columns={3} />
            </div>
          </PlainSection>
        )}

        {/* 4. Was übernimmt QonteX konkret? */}
        <SplitSection id="umfang" headingId="umfang-heading" title={service.scopeTitle} rule={rule()}>
          <CheckRows items={service.scope} />
          {service.note && (
            <div className="mt-6 bg-teal-tint p-6">
              <h3 className="text-[1.2rem] leading-snug">{service.note.title}</h3>
              <p className="mt-1.5 text-[16px] leading-relaxed text-text">{service.note.text}</p>
            </div>
          )}
        </SplitSection>

        {/* Konzeptioneller Vorher-Nachher-Vergleich */}
        {service.compare && (
          <PlainSection headingId="compare-heading" rule={rule()}>
            <SectionHead
              title={<span id="compare-heading">Was sich typischerweise ändert.</span>}
              text="Ein konzeptionelles Beispiel für typische Ausgangslagen und Ziele – keine Kundendaten und keine zugesagten Ergebnisse."
            />
            <div className="mt-12">
              <Compare
                leftTitle="Vorher"
                left={service.compare.before}
                rightTitle="Nachher"
                right={service.compare.after}
              />
            </div>
          </PlainSection>
        )}

        {/* Kanäle (nur KI-Agenten) */}
        {service.channels && (
          <PlainSection headingId="channels-heading" rule={rule()}>
            <SectionHead
              title={<span id="channels-heading">{service.channelsTitle}</span>}
              text={service.channelsIntro}
            />
            <div className="mt-12 grid gap-x-8 gap-y-10 lg:grid-cols-3">
              {service.channels.map((c) => {
                const Icon = CHANNEL_ICONS[c.key];
                return (
                  <div key={c.key} className="border-t-2 border-ink pt-6">
                    <h3 className="flex items-center gap-2.5 text-[1.35rem] leading-snug">
                      <Icon size={21} strokeWidth={1.9} className="flex-none text-teal-dark" aria-hidden />
                      {c.title}
                    </h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-muted">{c.text}</p>
                    <ul className="mt-5 space-y-2.5">
                      {c.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-[15.5px] leading-relaxed text-text">
                          <Check size={16} strokeWidth={2.6} className="mt-1 flex-none text-teal-dark" aria-hidden />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </PlainSection>
        )}

        {/* Vorteile */}
        <SplitSection headingId="benefits-heading" title="Was Sie davon haben" rule={rule()}>
          <DefRows items={service.benefits} />
        </SplitSection>

        {/* 5. Wie läuft die Zusammenarbeit ab? */}
        <Steps note={service.ctaText} rule id="ablauf" />

        {/* Weitere Leistungen */}
        <SplitSection headingId="more-heading" title="Weitere Leistungen">
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-3">
            {GROUP_LABELS.map(({ group, label }) => (
              <div key={group}>
                <p className="border-b-2 border-ink pb-2 text-[15px] font-semibold text-ink">{label}</p>
                <ul>
                  {servicesByGroup(group)
                    .filter((o) => o.slug !== service.slug)
                    .map((o) => (
                      <li key={o.slug} className="border-b border-ink/15">
                        <Link
                          href={`/leistungen/${o.slug}`}
                          className="flex min-h-11 items-center py-2 text-[15.5px] leading-snug text-ink decoration-teal-dark decoration-2 underline-offset-4 hover:underline"
                        >
                          {o.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </SplitSection>

        <Cta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
