import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Minus, Users, Target, MessageCircle, Phone, Mail, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Cta from "@/components/Cta";
import Steps from "@/components/Steps";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import { IconTile, SectionHead, btnPrimary, btnSecondary, container } from "@/components/ui";
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

  /* Abschnitte wechseln automatisch zwischen Weiß und Off-White */
  let n = 0;
  const tone = () => (n++ % 2 === 0 ? "bg-white" : "bg-soft");

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
      <main>
        {/* 1. Was ist die Leistung? */}
        <PageHeader
          eyebrow={service.name}
          title={service.title}
          intro={service.intro}
          crumbs={[{ href: "/leistungen", label: "Leistungen" }, { label: service.name }]}
        >
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className={btnPrimary}>
              {CTA_LABEL}
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden />
            </Link>
            <Link href="#umfang" className={btnSecondary}>
              Was wir übernehmen
            </Link>
          </div>
        </PageHeader>

        {/* Optionaler Medienbereich – nur sichtbar, wenn in lib/media.ts aktiviert */}
        {heroMedia?.enabled && (
          <div className={`${container} pt-12`}>
            <SmartAmbientVideo asset={heroMedia} className="overflow-hidden rounded-3xl border border-line" />
          </div>
        )}

        {/* 2. Für wen? / 3. Welches Problem? */}
        <section className={`${tone()} py-16 lg:py-24`}>
          <div className={`${container} grid gap-6 md:grid-cols-2`}>
            <div className="h-full rounded-3xl border border-line bg-white p-7 sm:p-9">
              <IconTile>
                <Users size={23} strokeWidth={1.8} aria-hidden />
              </IconTile>
              <h2 className="mt-6 text-[1.45rem] font-bold">Für wen eignet sich das?</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{service.audience}</p>
            </div>
            <div className="h-full rounded-3xl border border-line bg-white p-7 sm:p-9">
              <IconTile>
                <Target size={23} strokeWidth={1.8} aria-hidden />
              </IconTile>
              <h2 className="mt-6 text-[1.45rem] font-bold">Welches Problem lösen wir?</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-muted">{service.problem}</p>
            </div>
          </div>
        </section>

        {/* Zusammenhang als Kette (z. B. Webseiten: von der Sichtbarkeit bis zur Messung) */}
        {service.chain && (
          <section className={`${tone()} py-16 lg:py-24`} aria-labelledby="chain-heading">
            <div className={container}>
              <SectionHead
                eyebrow="Der Zusammenhang"
                title={<span id="chain-heading">{service.chainTitle}</span>}
                text={service.chainIntro}
              />
              <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {service.chain.map((c, i) => (
                  <li key={c.title} className="relative rounded-2xl border border-line bg-white p-6 sm:p-7">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-[family-name:var(--font-display)] text-[15px] font-bold text-white">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-[1.2rem] font-bold leading-snug">{c.title}</h3>
                    <p className="mt-2 text-[16px] leading-relaxed text-muted">{c.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {/* 4. Was übernimmt QonteX konkret? */}
        <section id="umfang" className={`${tone()} py-16 lg:py-24`}>
          <div className={container}>
            <SectionHead eyebrow="Leistungsumfang" title={service.scopeTitle} />
            <ul className="mt-10 grid gap-3 md:grid-cols-2">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3.5 rounded-2xl border border-line bg-white px-5 py-4">
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-tint text-teal-text">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[16px] leading-relaxed text-text">{item}</span>
                </li>
              ))}
            </ul>
            {service.note && (
              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-teal-dark/40 bg-teal-tint/60 p-6">
                <Info size={22} strokeWidth={1.9} className="mt-0.5 flex-none text-teal-text" aria-hidden />
                <div>
                  <h3 className="text-[1.1rem] font-bold">{service.note.title}</h3>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-text">{service.note.text}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Konzeptioneller Vorher-Nachher-Vergleich */}
        {service.compare && (
          <section className={`${tone()} py-16 lg:py-24`} aria-labelledby="compare-heading">
            <div className={container}>
              <SectionHead
                eyebrow="Vorher und nachher"
                title={<span id="compare-heading">Was sich typischerweise ändert.</span>}
                text="Ein konzeptionelles Beispiel für typische Ausgangslagen und Ziele – keine Kundendaten und keine zugesagten Ergebnisse."
              />
              <div className="mt-12 grid gap-6 md:grid-cols-2">
                <div className="rounded-3xl border border-line bg-white p-7 sm:p-9">
                  <h3 className="text-[1.3rem] font-bold text-muted">Vorher</h3>
                  <ul className="mt-6 space-y-4">
                    {service.compare.before.map((b) => (
                      <li key={b} className="flex items-start gap-3.5 text-[17px] leading-snug text-muted">
                        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-soft text-muted">
                          <Minus size={14} strokeWidth={3} aria-hidden />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-3xl border-2 border-teal-dark bg-white p-7 sm:p-9">
                  <h3 className="text-[1.3rem] font-bold">Nachher</h3>
                  <ul className="mt-6 space-y-4">
                    {service.compare.after.map((a) => (
                      <li key={a} className="flex items-start gap-3.5 text-[17px] font-medium leading-snug text-ink">
                        <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-tint text-teal-text">
                          <Check size={14} strokeWidth={3} aria-hidden />
                        </span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Kanäle (nur KI-Agenten) */}
        {service.channels && (
          <section className={`${tone()} py-16 lg:py-24`} aria-labelledby="channels-heading">
            <div className={container}>
              <SectionHead
                title={<span id="channels-heading">{service.channelsTitle}</span>}
                text={service.channelsIntro}
              />
              <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {service.channels.map((c) => {
                  const Icon = CHANNEL_ICONS[c.key];
                  return (
                    <div key={c.key} className="flex h-full flex-col rounded-3xl border border-line bg-white p-7">
                      <IconTile>
                        <Icon size={22} strokeWidth={1.8} aria-hidden />
                      </IconTile>
                      <h3 className="mt-5 text-[1.2rem] font-bold">{c.title}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.text}</p>
                      <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                        {c.points.map((p) => (
                          <li key={p} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-text">
                            <Check size={16} strokeWidth={2.6} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Vorteile */}
        <section className={`${tone()} py-16 lg:py-24`}>
          <div className={container}>
            <SectionHead eyebrow="Ihr Vorteil" title="Was Sie davon haben" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {service.benefits.map((b) => (
                <div key={b.title} className="h-full rounded-3xl border border-line bg-white p-7">
                  <h3 className="text-[1.2rem] font-bold">{b.title}</h3>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">{b.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Wie läuft die Zusammenarbeit ab? */}
        <Steps note={service.ctaText} tone={tone() === "bg-white" ? "white" : "soft"} id="ablauf" />

        {/* Weitere Leistungen */}
        <section className={`${tone()} py-14 lg:py-16`} aria-labelledby="more-heading">
          <div className={container}>
            <h2 id="more-heading" className="text-[1.35rem] font-bold">
              Weitere Leistungen
            </h2>
            <div className="mt-6 grid gap-8 lg:grid-cols-3">
              {GROUP_LABELS.map(({ group, label }) => (
                <div key={group}>
                  <p className="text-sm font-semibold text-muted">{label}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {servicesByGroup(group)
                      .filter((o) => o.slug !== service.slug)
                      .map((o) => (
                        <li key={o.slug}>
                          <Link
                            href={`/leistungen/${o.slug}`}
                            className="inline-flex min-h-10 items-center rounded-full border border-line bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-teal-dark hover:bg-teal-tint"
                          >
                            {o.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
