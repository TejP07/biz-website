import Link from "next/link";
import { companyNav, legalNav } from "@/content/navigation";
import { services } from "@/content/services";
import { formatAddress, professionalNotice, site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { EmailLink, PhoneLink } from "@/components/ui/ContactValue";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const socials = Object.entries(site.social).filter(([, url]) => Boolean(url));

  return (
    <footer className="border-t border-line bg-paper-2 text-ink" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20">
        <div className="md:col-span-12 lg:col-span-4">
          <Logo showDescriptor />
          <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-ink-2">
            Drafting, construction documentation, engineering coordination, and permit support for
            property owners, contractors, developers, design firms, and businesses.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a href={url} className="capitalize text-ink-2 hover:text-accent" rel="me noopener">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Services" className="md:col-span-5 lg:col-span-3">
          <p className="eyebrow text-muted">Services</p>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="text-ink-2 transition-colors hover:text-accent">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-3 lg:col-span-2">
          <p className="eyebrow text-muted">Company</p>
          <ul className="mt-5 space-y-3 text-[0.9375rem]">
            {companyNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-2 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4 lg:col-span-3">
          <p className="eyebrow text-muted">Contact</p>
          <address className="mt-5 space-y-3 text-[0.9375rem] not-italic text-ink-2">
            <p>
              <EmailLink className="hover:text-accent" />
            </p>
            <p>
              <PhoneLink className="hover:text-accent" />
            </p>
            <p>{formatAddress()}</p>
            <p>
              <span className="text-muted">Service area: </span>
              {site.serviceArea.summary}
            </p>
          </address>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-accent hover:text-accent-strong"
          >
            Start your project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site py-8">
          <p className="max-w-4xl text-xs leading-relaxed text-muted">
            <span className="font-medium text-ink-2">Professional services notice. </span>
            {professionalNotice}
          </p>
          <div className="mt-6 flex flex-col gap-3 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.legalName}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
