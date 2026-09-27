/**
 * Central company configuration.
 *
 * Every piece of company-specific information on the site comes from this file.
 * Replace the bracketed placeholders with real values before launch. Values that
 * are still placeholders (text wrapped in square brackets) are rendered as plain
 * text instead of links, so nothing on the site links to a fake email or phone.
 */

export const site = {
  /** Displayed company name. Used in the logo, page titles, footer and schema. */
  name: "[COMPANY NAME]",
  /** Registered legal name, used in the copyright line and privacy policy. */
  legalName: "[COMPANY LEGAL NAME]",
  /** Short descriptor shown beneath the text logo. */
  descriptor: "Design Documentation & Engineering Coordination",
  /** Default meta description for the site. */
  description:
    "Architectural drafting, construction documentation, structural and MEP coordination, and permit support for property owners, contractors, developers, design firms, and businesses.",

  /**
   * Production URL. Set NEXT_PUBLIC_SITE_URL in your hosting environment.
   * Used for canonical URLs, the sitemap, robots.txt and Open Graph tags.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  /**
   * Search-engine indexing is OFF until you explicitly turn it on, so a site full
   * of placeholders is never indexed. Set NEXT_PUBLIC_ALLOW_INDEXING=true at launch.
   */
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",

  /**
   * Logo. Leave `src` as null to use the built-in text logo.
   * To use a logo file, add it to /public/brand/ and set e.g.
   * { src: "/brand/logo.svg", width: 180, height: 40 }.
   * Provide `srcOnDark` if the logo needs a light version for dark backgrounds.
   */
  logo: {
    src: null as string | null,
    srcOnDark: null as string | null,
    width: 180,
    height: 40,
  },

  contact: {
    email: "[EMAIL ADDRESS]",
    phone: "[PHONE NUMBER]",
    /** Phone number in E.164 format for tel: links, e.g. "+15555550123". */
    phoneE164: "",
    address: {
      street: "[BUSINESS ADDRESS]",
      city: "[CITY]",
      region: "[STATE]",
      postalCode: "[ZIP CODE]",
      country: "[COUNTRY]",
    },
    hours: "[BUSINESS HOURS]",
    /** Shown on the inquiry confirmation, e.g. "one business day". */
    responseTime: "[RESPONSE TIME]",
  },

  serviceArea: {
    /** Short summary used in the footer and contact page. */
    summary: "[SERVICE AREA]",
    primary: "[PRIMARY SERVICE AREA]",
    region: "[STATE / REGION]",
  },

  /** Social profiles. Leave empty to hide. */
  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },

  /**
   * Credentials, licenses and affiliations. These appear on the About page and
   * in the trust section on the home page. Replace or remove each entry.
   * Only list licenses and credentials your company or team actually holds.
   */
  credentials: [
    { label: "Professional Credentials", value: "[Professional Credentials]" },
    { label: "License Information", value: "[License Information]" },
    { label: "Professional Affiliations", value: "[Professional Affiliations]" },
    { label: "Insurance", value: "[Insurance Information]" },
  ] as { label: string; value: string }[],

  /** CAD / BIM platforms and file formats you work in. */
  software: "[CAD / BIM PLATFORMS]",
};

/** True when a value is still an unreplaced "[PLACEHOLDER]". */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  return /^\[.*\]$/.test(value.trim());
}

export function formatAddress(): string {
  const { street, city, region, postalCode } = site.contact.address;
  return `${street}, ${city}, ${region} ${postalCode}`;
}

/**
 * Professional services notice. Displayed discreetly in the footer and near
 * service descriptions. Have this reviewed for your jurisdiction before launch.
 */
export const professionalNotice = `${site.name} provides drafting, design documentation, and project coordination services. Architectural and engineering services that require a license, stamp, or seal are performed or reviewed by appropriately licensed professionals, as required by the jurisdiction where the project is located.`;
