import type { Metadata } from "next";
import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      <div aria-hidden="true" className="bg-drafting-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="container-site py-24 lg:py-36">
        <p className="eyebrow text-accent">Error 404 · Sheet not found</p>
        <h1 className="display-2 mt-6 max-w-3xl text-ink">This page isn&apos;t in the drawing set.</h1>
        <p className="lead mt-6 max-w-xl text-ink-2">
          The page may have moved or the link may be incorrect. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Start Your Project
          </ButtonLink>
        </div>
        <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-8">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="text-[0.9375rem] font-medium text-ink-2 hover:text-accent">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
