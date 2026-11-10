import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/services";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://qontex.de";
  const pages = [
    "",
    "/leistungen",
    "/loesungen",
    "/referenzen",
    "/ueber",
    "/kontakt",
    ...SERVICES.map((s) => `/leistungen/${s.slug}`),
  ];
  return pages.map((p) => ({
    url: `${base}${p}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
}
