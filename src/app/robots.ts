import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

/**
 * Crawling is disallowed until NEXT_PUBLIC_ALLOW_INDEXING=true is set, so a
 * site that still contains placeholders is never indexed by search engines.
 */
export default function robots(): MetadataRoute.Robots {
  if (!site.allowIndexing) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
