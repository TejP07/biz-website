import type { Metadata } from "next";
import { isPlaceholder, site } from "@/content/site";
import { serviceAreas } from "@/content/service-areas";

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Optional Open Graph image path. Defaults to the generated site image. */
  image?: string;
};

/** Consistent per-page metadata: title, description, canonical URL and Open Graph. */
export function pageMetadata({ title, description, path, image }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
    },
  };
}

/** Values that are still placeholders are omitted from structured data. */
function clean<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (typeof v === "string" && isPlaceholder(v)) return false;
      return true;
    }),
  ) as Partial<T>;
}

/** Organization / ProfessionalService schema for the whole site. */
export function organizationSchema() {
  const { address } = site.contact;
  const postalAddress = clean({
    "@type": "PostalAddress",
    streetAddress: address.street,
    addressLocality: address.city,
    addressRegion: address.region,
    postalCode: address.postalCode,
    addressCountry: address.country,
  });
  const hasAddress = Object.keys(postalAddress).length > 1;

  return clean({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organization"),
    name: site.name,
    description: site.description,
    url: absoluteUrl("/"),
    email: site.contact.email,
    telephone: site.contact.phoneE164 || site.contact.phone,
    address: hasAddress ? postalAddress : undefined,
    areaServed: serviceAreas
      .filter((a) => !isPlaceholder(a.name))
      .map((a) => ({ "@type": "Place", name: a.name })),
    sameAs: Object.values(site.social).filter(Boolean),
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string[] }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string; areaServed?: string }) {
  return clean({
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": absoluteUrl("/#organization") },
    areaServed: input.areaServed,
  });
}
