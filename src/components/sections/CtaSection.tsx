import type { ReactNode } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { EmailLink, PhoneLink } from "@/components/ui/ContactValue";
import { MailIcon, PhoneIcon } from "@/components/ui/icons";

type CtaSectionProps = {
  eyebrow?: string;
  title?: ReactNode;
  body?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

/** Closing call to action on a dark background. */
export function CtaSection({
  eyebrow = "Start a project",
  title = "Tell us what you're planning. We'll tell you what it takes.",
  body = "Share the address, the scope, and any drawings you have. We'll review it and reply with the disciplines involved, the approvals to expect, and a written proposal.",
  primaryLabel = "Start Your Project",
  primaryHref = "/contact",
  secondaryLabel = "How pricing works",
  secondaryHref = "/pricing",
}: CtaSectionProps) {
  return (
    <section aria-labelledby="cta-heading" className="on-dark relative isolate overflow-hidden bg-navy text-on-navy">
      <div
        aria-hidden="true"
        className="bg-drafting-grid-dark absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_bottom_right,black,transparent_70%)]"
      />
      <div className="container-site grid gap-12 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <div className="lg:col-span-8">
          <p className="eyebrow flex items-center gap-3 text-on-navy-muted">
            <span aria-hidden="true" className="h-px w-8 bg-accent-light/60" />
            {eyebrow}
          </p>
          <h2 id="cta-heading" className="display-2 mt-6 max-w-4xl">
            {title}
          </h2>
          <p className="lead mt-6 max-w-2xl text-on-navy-muted">{body}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryHref} variant="inverse" size="lg" arrow>
              {primaryLabel}
            </ButtonLink>
            {secondaryLabel && secondaryHref && (
              <ButtonLink href={secondaryHref} variant="outline-inverse" size="lg">
                {secondaryLabel}
              </ButtonLink>
            )}
          </div>
        </div>
        <div className="border-t border-line-navy pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pb-2 lg:pl-10 lg:pt-0">
          <p className="eyebrow text-on-navy-muted">Prefer to talk first?</p>
          <ul className="mt-5 space-y-4 text-[0.9375rem]">
            <li className="flex items-center gap-3">
              <MailIcon size={18} className="shrink-0 text-accent-light" />
              <EmailLink className="text-on-navy hover:text-accent-light" />
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon size={18} className="shrink-0 text-accent-light" />
              <PhoneLink className="text-on-navy hover:text-accent-light" />
            </li>
          </ul>
          <p className="mt-5 text-sm text-on-navy-muted">Serving {site.serviceArea.summary}</p>
        </div>
      </div>
    </section>
  );
}
