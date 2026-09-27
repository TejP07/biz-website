import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages (or any static host).
 *
 * NEXT_PUBLIC_BASE_PATH is the sub-folder the site is served from, e.g.
 * "/biz-website" for https://tejp07.github.io/biz-website/. Leave it empty when
 * the site is served from a domain root (local development, custom domain).
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Emit /about/index.html etc., which static hosts serve at /about/.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // Next's image optimizer needs a server. Images are served as-is; use
    // appropriately sized JPG/WebP files when you add photography.
    unoptimized: true,
  },
};

export default nextConfig;
