/** Primary navigation (header). */
export const mainNav = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Process", href: "/process" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Header call to action. */
export const primaryCta = { label: "Start Your Project", href: "/contact" } as const;

/** Secondary footer links. */
export const companyNav = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Projects", href: "/projects" },
  { label: "Pricing", href: "/pricing" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
] as const;

export const legalNav = [{ label: "Privacy Policy", href: "/privacy" }] as const;
