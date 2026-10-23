import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function sitemap(): MetadataRoute.Sitemap {
  if (!process.env.NEXT_PUBLIC_SITE_URL) return []
  return [{ url: siteConfig.siteUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }]
}
