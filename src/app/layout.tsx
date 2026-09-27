import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono, Inter } from "next/font/google";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { RevealObserver } from "@/components/layout/RevealObserver";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { absoluteUrl, defaultOgImage, organizationSchema } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

// Used only for small labels, so it isn't preloaded.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
});

const defaultTitle = `${site.name} | Design Documentation & Engineering Coordination`;

export const metadata: Metadata = {
  // Trailing slash so relative metadata URLs keep any sub-folder in site.url.
  metadataBase: new URL(`${site.url.replace(/\/+$/, "")}/`),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
    url: absoluteUrl("/"),
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
    images: [defaultOgImage.url],
  },
  robots: site.allowIndexing
    ? { index: true, follow: true }
    : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#0e1a2b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} ${plexMono.variable} antialiased`}
    >
      <head>
        {/* Enables scroll-reveal styles only when JavaScript is running. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[60] bg-ink px-4 py-3 text-sm font-medium text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <SiteFooter />
        <RevealObserver />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
