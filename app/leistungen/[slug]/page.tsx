import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Check,
  Users,
  Target,
  MessageCircle,
  Phone,
  Mail,
  CalendarCheck,
  ClipboardList,
  Rocket,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import Cta from "@/components/Cta";
import SmartAmbientVideo from "@/components/SmartAmbientVideo";
import { Eyebrow, IconTile, btnPrimary, btnSecondary, container } from "@/components/ui";
import { SERVICES, getService } from "@/lib/services";
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
  return {
    title: `${service.title} | QonteX`,
    description: service.metaDescription,
  };
}

const STEPS = [
  {
    icon: CalendarCheck,
    title: "Kostenloses Erstgespräch",
    text: "Sie schildern uns Ihre Situation – telefonisch oder per Video, unverbindlich.",
  },
  {
    icon: ClipboardList,
    title: "Analyse & Angebot",
    text: "Wir prüfen Ihre Anforderungen und machen Ihnen ein klares, verständliches Angebot.",
  },
  {
    icon: Rocket,
    title: "Umsetzung & Betreuung",
    text: "Wir setzen um und bleiben danach Ihr fester Ansprechpartner.",
  },
];

const CHANNEL_ICONS = { whatsapp: MessageCircle, telefon: Phone, mail: Mail } as const;

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const heroMedia = MEDIA.services[slug];

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
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/kontakt" className={btnPrimary}>
              Kostenloses Erstgespräch
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
            <SmartAmbientVideo
              asset={heroMedia}
              className="overflow-hidden rounded-2xl border border-line shadow-[var(--shadow-card)]"
            />
          </div>
        )}

        {/* 2. Für wen? / 3. Welches Problem? */}
        <section className="bg-white py-16 lg:py-20">
          <div className={`${container} grid gap-6 md:grid-cols-2`}>
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                <IconTile>
                  <Users size={24} strokeWidth={1.8} aria-hidden />
                </IconTile>
                <h2 className="mt-5 text-xl font-bold">Für wen eignet sich das?</h2>
                <p className="mt-2.5 text-[16px] leading-relaxed text-muted">{service.audience}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                <IconTile>
                  <Target size={24} strokeWidth={1.8} aria-hidden />
                </IconTile>
                <h2 className="mt-5 text-xl font-bold">Welches Problem lösen wir?</h2>
                <p className="mt-2.5 text-[16px] leading-relaxed text-muted">{service.problem}</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* 4. Was übernimmt QonteX konkret? */}
        <section id="umfang" className="bg-soft py-16 lg:py-20">
          <div className={container}>
            <Eyebrow>Leistungsumfang</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold">{service.scopeTitle}</h2>
            <ul className="mt-8 grid gap-3 md:grid-cols-2">
              {service.scope.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white px-5 py-4"
                >
                  <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-tint text-teal-dark">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  <span className="text-[15px] leading-relaxed text-text">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Kanäle (nur KI-Agenten) */}
        {service.channels && (
          <section className="bg-white py-16 lg:py-20" aria-labelledby="channels-heading">
            <div className={container}>
              <h2 id="channels-heading" className="text-3xl font-bold">
                {service.channelsTitle}
              </h2>
              {service.channelsIntro && (
                <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{service.channelsIntro}</p>
              )}
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {service.channels.map((c, i) => {
                  const Icon = CHANNEL_ICONS[c.key];
                  return (
                    <Reveal key={c.key} delay={i * 0.06} className="h-full">
                      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                        <IconTile>
                          <Icon size={22} strokeWidth={1.8} aria-hidden />
                        </IconTile>
                        <h3 className="mt-5 text-lg font-bold">{c.title}</h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.text}</p>
                        <ul className="mt-5 space-y-2 border-t border-line pt-5">
                          {c.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-sm leading-relaxed text-text">
                              <Check size={15} strokeWidth={2.6} className="mt-0.5 flex-none text-teal-dark" aria-hidden />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Vorteile */}
        <section className={service.channels ? "bg-soft py-16 lg:py-20" : "bg-white py-16 lg:py-20"}>
          <div className={container}>
            <Eyebrow>Ihr Vorteil</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold">Was Sie davon haben</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {service.benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.05} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-[var(--shadow-card)]">
                    <h3 className="text-lg font-bold">{b.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Wie kann der Kunde starten? */}
        <section className={service.channels ? "bg-white py-16 lg:py-20" : "bg-soft py-16 lg:py-20"}>
          <div className={container}>
            <Eyebrow>So starten Sie</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold">In drei Schritten zur Lösung</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative rounded-2xl border border-line bg-white p-7">
                  <span className="absolute right-6 top-6 text-sm font-bold text-teal-dark">0{i + 1}</span>
                  <IconTile>
                    <s.icon size={22} strokeWidth={1.8} aria-hidden />
                  </IconTile>
                  <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text">{service.ctaText}</p>
          </div>
        </section>

        <Cta />

        {/* Weitere Leistungen */}
        <section className="bg-white pb-20">
          <div className={container}>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Weitere Leistungen</h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/leistungen/${o.slug}`}
                    className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-teal hover:bg-teal-tint"
                  >
                    {o.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
