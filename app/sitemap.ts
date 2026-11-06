import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [["", 1], ["comprar/", 0.9], ["alugar/", 0.8], ["contactos/", 0.7]];
  return pages.map(([path, priority]) => ({ url: `${site.url}/${path}`, changeFrequency: "weekly", priority }));
}
