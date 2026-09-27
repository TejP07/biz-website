import { inquiryEmailSubject, inquiryEmailTemplate } from "@/content/contact";
import { isPlaceholder, site } from "@/content/site";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight, FileIcon, InfoIcon, MailIcon } from "@/components/ui/icons";

/**
 * Email-based project inquiry. Opens the visitor's email app with a
 * pre-filled template; the same template is shown for copying into webmail.
 * Needs no server, so it works on static hosting such as GitHub Pages.
 */
export function EmailInquiry() {
  const email = site.contact.email;
  const ready = !isPlaceholder(email);
  const mailto = `mailto:${email}?subject=${encodeURIComponent(inquiryEmailSubject)}&body=${encodeURIComponent(inquiryEmailTemplate)}`;

  return (
    <div className="space-y-10">
      <section aria-labelledby="email-inquiry-heading" className="border border-line bg-surface p-7 sm:p-10">
        <span className="flex h-12 w-12 items-center justify-center bg-accent-soft text-accent">
          <MailIcon size={24} />
        </span>
        <h2 id="email-inquiry-heading" className="heading-2 mt-8 text-ink">
          Email us your project details.
        </h2>
        <p className="lead mt-4 max-w-xl text-ink-2">
          The button opens your email app with a short template already filled in. Answer what you
          can, attach any drawings or photos, and send it to <strong className="font-medium text-ink">{email}</strong>.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          {ready ? (
            <a href={mailto} className={buttonClasses("primary", "lg", "w-full sm:w-auto")}>
              Email your project details
              <ArrowRight size={18} />
            </a>
          ) : (
            <span
              aria-disabled="true"
              className={buttonClasses("primary", "lg", "w-full cursor-not-allowed opacity-60 sm:w-auto")}
            >
              Email your project details
            </span>
          )}
        </div>

        {!ready && (
          <p className="mt-5 flex gap-3 border-l-2 border-notice bg-notice-soft px-4 py-3 text-sm leading-relaxed text-ink">
            <InfoIcon size={18} className="mt-0.5 shrink-0 text-notice" />
            <span>
              Site owner: set <code className="font-mono text-[0.8125rem]">contact.email</code> in{" "}
              <code className="font-mono text-[0.8125rem]">src/content/site.ts</code> to activate this button.
            </span>
          </p>
        )}

        <ul className="mt-8 grid gap-3 border-t border-line pt-6 text-sm text-ink-2 sm:grid-cols-2">
          <li className="flex gap-3">
            <FileIcon size={18} className="shrink-0 text-accent" />
            Attach plans, surveys, photos, or prior permit sets.
          </li>
          <li className="flex gap-3">
            <FileIcon size={18} className="shrink-0 text-accent" />
            Large files? Include a download link instead.
          </li>
        </ul>
      </section>

      <section aria-labelledby="template-heading">
        <h2 id="template-heading" className="eyebrow text-muted">
          Using webmail? Copy this template
        </h2>
        <pre
          tabIndex={0}
          aria-label="Project inquiry email template"
          className="mt-4 max-h-[28rem] overflow-auto whitespace-pre-wrap border border-line bg-paper-2 p-5 font-mono text-[0.8125rem] leading-relaxed text-ink-2 select-all"
        >
          {inquiryEmailTemplate}
        </pre>
        <p className="mt-3 text-xs text-muted">
          Subject: <span className="font-mono">{inquiryEmailSubject}</span>
        </p>
      </section>
    </div>
  );
}
