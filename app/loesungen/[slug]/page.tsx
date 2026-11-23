import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OfferPage from "@/components/OfferPage";
import { pageMeta } from "@/lib/seo";
import { LOESUNGEN } from "@/lib/offers";

export function generateStaticParams() {
  return LOESUNGEN.map((o) => ({ slug: o.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const offer = LOESUNGEN.find((o) => o.slug === slug);
  if (!offer) return {};
  return pageMeta({
    title: offer.metaTitle,
    description: offer.metaDescription,
    path: `/loesungen/${offer.slug}/`,
  });
}

export default async function LoesungPage({ params }: Props) {
  const { slug } = await params;
  const offer = LOESUNGEN.find((o) => o.slug === slug);
  if (!offer) notFound();
  return <OfferPage offer={offer} />;
}
