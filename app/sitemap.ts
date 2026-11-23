import type { MetadataRoute } from "next";
import { IT_OFFERS, LEISTUNGEN, LOESUNGEN, offerHref } from "@/lib/offers";
import { COMPANY } from "@/lib/company";

export const dynamic = "force-static";

/* Nur indexierbare Seiten: keine Weiterleitungen, keine Demo, kein Impressum/Datenschutz (noindex) */
export default function sitemap(): MetadataRoute.Sitemap {
  /* Stand der Inhalte – bei größeren Textänderungen anpassen, nicht bei jedem Build */
  const now = new Date("2026-11-23");
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${COMPANY.url}${path}/`.replace(/\/\/$/, "/"),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    entry("", 1),
    entry("/leistungen", 0.9),
    entry("/loesungen", 0.9),
    ...LEISTUNGEN.map((o) => entry(offerHref(o), 0.8)),
    ...LOESUNGEN.map((o) => entry(offerHref(o), 0.8)),
    entry("/ueber", 0.6),
    entry("/kontakt", 0.7),
    ...IT_OFFERS.map((o) => entry(offerHref(o), 0.4)),
  ];
}
