import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferPage from "@/components/OfferPage";
import { pageMeta } from "@/lib/seo";
import Redirect from "@/components/Redirect";
import { IT_OFFERS, LEGACY_LEISTUNGEN, LEISTUNGEN, offerByPath, type Offer } from "@/lib/offers";

const OFFERS: Offer[] = [...LEISTUNGEN, ...IT_OFFERS];

export function generateStaticParams() {
  return [...OFFERS.map((o) => ({ slug: o.slug })), ...Object.keys(LEGACY_LEISTUNGEN).map((slug) => ({ slug }))];
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const legacy = LEGACY_LEISTUNGEN[slug];
  if (legacy) {
    return {
      title: "Seite umgezogen",
      alternates: { canonical: legacy },
    };
  }
  const offer = OFFERS.find((o) => o.slug === slug);
  if (!offer) return {};
  return pageMeta({
    title: offer.metaTitle,
    description: offer.metaDescription,
    path: `/leistungen/${offer.slug}/`,
  });
}

export default async function LeistungPage({ params }: Props) {
  const { slug } = await params;
  const legacy = LEGACY_LEISTUNGEN[slug];
  if (legacy) {
    const target = offerByPath(legacy.replace(/\/$/, ""));
    return <Redirect to={legacy} label={target?.name ?? "Zur neuen Seite"} />;
  }
  const offer = OFFERS.find((o) => o.slug === slug);
  if (!offer) notFound();
  return <OfferPage offer={offer} />;
}
