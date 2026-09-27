import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { withBasePath } from "@/lib/paths";

// Generated once at build time (required for static export).
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: withBasePath("/"),
    display: "standalone",
    background_color: "#f7f6f2",
    theme_color: "#0e1a2b",
    icons: [
      { src: withBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml" },
      { src: withBasePath("/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: withBasePath("/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}
