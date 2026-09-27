import type { Metadata } from "next";
import { startChecklist } from "@/content/process";
import { formatAddress, professionalNotice, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { EmailLink, PhoneLink } from "@/components/ui/ContactValue";
import { CheckIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { ProjectInquiryForm } from "@/components/forms/ProjectInquiryForm";

export const metadata: Metadata = pageMetadata({
  title: "Start Your Project: Request a Quote",
  description:
    "Tell us about your project to request a quote for drafting, construction documentation, structural and MEP coordination, or permit support. Upload existing drawings and get a written proposal.",
  path: "/contact",
});

const nextSteps = [
  { title: "We review your project", text: "Your description, documents, and site information." },
  { title: "We talk it through", text: "A short call to confirm goals, constraints, and open questions." },
  { title: "You get a proposal", text: "Written scope, schedule, and fee before any work begins." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line bg-paper">
        <div
          aria-hidden="true"
          className="bg-drafting-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"
        />
        <div className="container-site pb-12 pt-8 lg:pb-16 lg:pt-10">
          <Breadcrumbs items={[{ name: "Start Your Project", path: "/contact" }]} />
          <div className="mt-12 max-w-4xl lg:mt-16">
            <Eyebrow>Start your project</Eyebrow>
            <h1 className="display-2 mt-6 text-ink">Tell us about your project.</h1>
            <p className="lead mt-6 max-w-2xl text-ink-2">
              Share what you&apos;re planning and any drawings you have. We&apos;ll review it and
              reply with the disciplines and approvals involved, and a written proposal for the work.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Project inquiry" className="py-12 lg:py-20">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-8">
            <ProjectInquiryForm />
          </div>

          <aside aria-label="About this form" className="lg:col-span-4">
            <div className="space-y-10 lg:sticky lg:top-28">
              <div>
                <h2 className="eyebrow text-muted">What happens next</h2>
                <ol className="mt-5 border-t border-line">
                  {nextSteps.map((s, i) => (
                    <li key={s.title} className="flex gap-4 border-b border-line py-4">
                      <span className="font-mono text-xs leading-6 text-accent">0{i + 1}</span>
                      <div>
                        <p className="text-[0.9688rem] font-medium text-ink">{s.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-ink-2">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="border border-line bg-surface p-6">
                <h2 className="eyebrow text-muted">Prefer email or phone?</h2>
                <ul className="mt-5 space-y-3.5 text-[0.9375rem] text-ink">
                  <li className="flex items-center gap-3">
                    <MailIcon size={18} className="shrink-0 text-accent" />
                    <EmailLink className="hover:text-accent" />
                  </li>
                  <li className="flex items-center gap-3">
                    <PhoneIcon size={18} className="shrink-0 text-accent" />
                    <PhoneLink className="hover:text-accent" />
                  </li>
                  <li className="flex items-start gap-3">
                    <PinIcon size={18} className="mt-0.5 shrink-0 text-accent" />
                    <span>{formatAddress()}</span>
                  </li>
                </ul>
                <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                  {site.contact.hours} · Serving {site.serviceArea.summary}
                </p>
              </div>

              <div>
                <h2 className="eyebrow text-muted">Helpful to include</h2>
                <ul className="mt-5 space-y-3">
                  {startChecklist.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-2">
                      <CheckIcon size={16} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs leading-relaxed text-muted">{professionalNotice}</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
