import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Mail, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { SERVICES, getService } from "@/lib/services";

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

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <Navbar />
      <main className="pb-24 pt-36">
        {/* Kopfbereich */}
        <header className="relative overflow-hidden px-6 pb-16">
          <div
            className="absolute inset-0 -top-36 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(45,212,234,0.09),transparent_65%)]"
            aria-hidden
          />
          <div className="relative mx-auto max-w-4xl">
            <nav aria-label="Pfadnavigation" className="mb-6 text-sm text-fog">
              <Link href="/leistungen" className="transition-colors hover:text-cyan">
                Leistungen
              </Link>
              <span className="mx-2" aria-hidden>
                /
              </span>
              <span className="text-mist">{service.name}</span>
            </nav>
            <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fog">
              {service.intro}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-6 py-3 font-semibold text-[#04222b] shadow-[0_10px_30px_rgba(45,212,234,0.28)] transition-shadow hover:shadow-[0_14px_36px_rgba(45,212,234,0.4)]"
              >
                Kostenlose Erstberatung
                <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
              </Link>
            </div>
          </div>
        </header>

        {/* Leistungsumfang */}
        <section className="px-6 py-14" aria-labelledby="scope-heading">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2
                id="scope-heading"
                className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white"
              >
                {service.scopeTitle}
              </h2>
            </Reveal>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {service.scope.map((item, i) => (
                <Reveal key={item} delay={0.04 * i}>
                  <li className="glass flex items-start gap-3 rounded-xl px-5 py-4">
                    <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-md bg-cyan/10 text-cyan">
                      <Check size={13} strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-sm leading-relaxed text-mist">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* Kanäle (nur wenn hinterlegt, z. B. KI-Agenten) */}
        {service.channels && (
          <section
            className="border-y border-white/5 bg-abyss px-6 py-16"
            aria-labelledby="channels-heading"
          >
            <div className="mx-auto max-w-4xl">
              <Reveal>
                <h2
                  id="channels-heading"
                  className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white"
                >
                  {service.channelsTitle}
                </h2>
                {service.channelsIntro && (
                  <p className="mt-3 max-w-2xl leading-relaxed text-fog">
                    {service.channelsIntro}
                  </p>
                )}
              </Reveal>
              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {service.channels.map((c, i) => {
                  const Icon =
                    c.key === "whatsapp" ? MessageCircle : c.key === "telefon" ? Phone : Mail;
                  return (
                    <Reveal key={c.key} delay={0.07 * i}>
                      <div className="glass flex h-full flex-col rounded-2xl p-6">
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/10 text-cyan ring-1 ring-cyan/25">
                          <Icon size={20} strokeWidth={1.9} aria-hidden />
                        </span>
                        <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
                          {c.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-fog">{c.text}</p>
                        <ul className="mt-4 space-y-2 border-t border-white/8 pt-4">
                          {c.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-mist">
                              <Check
                                size={13}
                                strokeWidth={3}
                                className="mt-1 flex-none text-cyan"
                                aria-hidden
                              />
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
        <section className="px-6 py-14" aria-labelledby="benefits-heading">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <h2
                id="benefits-heading"
                className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white"
              >
                Ihr Vorteil mit QonteX
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {service.benefits.map((b, i) => (
                <Reveal key={b.title} delay={0.06 * i}>
                  <div className="glass h-full rounded-2xl p-6">
                    <h3 className="font-semibold text-white">{b.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fog">{b.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-14">
          <Reveal className="mx-auto max-w-4xl">
            <div className="glass relative overflow-hidden rounded-2xl border-cyan/25 px-8 py-10 text-center">
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan/10 to-transparent"
                aria-hidden
              />
              <p className="relative mx-auto max-w-xl text-lg leading-relaxed text-mist">
                {service.ctaText}
              </p>
              <div className="relative mt-6">
                <Link
                  href="/kontakt"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-cyan-soft to-cyan px-7 py-3.5 font-semibold text-[#04222b] shadow-[0_10px_30px_rgba(45,212,234,0.28)]"
                >
                  IT-Beratung anfragen
                  <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Weitere Leistungen */}
        <section className="px-6 pt-10" aria-labelledby="more-heading">
          <div className="mx-auto max-w-4xl">
            <h2
              id="more-heading"
              className="text-xs font-semibold uppercase tracking-[0.14em] text-fog"
            >
              Weitere Leistungen
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={`/leistungen/${o.slug}`}
                    className="glass inline-flex rounded-full px-4 py-2 text-sm font-medium text-mist transition-colors hover:border-cyan/40 hover:text-white"
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
