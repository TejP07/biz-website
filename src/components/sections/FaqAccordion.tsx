import type { Faq } from "@/content/faqs";

/**
 * FAQ accordion built on native <details>/<summary>: keyboard accessible,
 * works without JavaScript, and adds no client-side code.
 */
export function FaqAccordion({ items, idPrefix = "faq" }: { items: Faq[]; idPrefix?: string }) {
  return (
    <div className="border-t border-line">
      {items.map((faq, i) => (
        <details key={faq.question} className="faq-item group border-b border-line">
          <summary
            id={`${idPrefix}-${i}`}
            className="flex items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent focus-visible:outline-offset-[-2px]"
          >
            <h3 className="font-display text-[1.0625rem] font-semibold leading-snug text-ink group-hover:text-accent sm:text-[1.125rem]">
              {faq.question}
            </h3>
            <span
              aria-hidden="true"
              className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-ink-2"
            >
              <span className="absolute h-px w-3.5 bg-current" />
              <span className="faq-icon-v absolute h-3.5 w-px bg-current" />
            </span>
          </summary>
          <div className="space-y-3 pb-7 pr-10 text-[0.9844rem] leading-relaxed text-ink-2">
            {faq.answer.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
