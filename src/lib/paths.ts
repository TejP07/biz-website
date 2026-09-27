/**
 * Base path the site is served from, e.g. "/biz-website" on GitHub Pages
 * (https://<user>.github.io/<repo>/). Empty when served from a domain root.
 * Set NEXT_PUBLIC_BASE_PATH at build time; next.config.ts uses the same value.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefixes a root-relative asset path with the base path. `next/link` does this
 * automatically, but `next/image` sources and other raw URLs do not.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return `${basePath}${path}`;
}
