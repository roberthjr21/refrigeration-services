import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site-config"

export default function robots(): MetadataRoute.Robots {
  const configured = Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim())
  return {
    rules: { userAgent: "*", allow: configured ? "/" : undefined, disallow: configured ? undefined : "/" },
    ...(configured ? { sitemap: `${siteConfig.siteUrl}/sitemap.xml` } : {}),
  }
}
