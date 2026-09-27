"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Adds a subtle fade/slide-in to elements marked with `data-reveal` as they
 * enter the viewport. One observer for the whole page; no animation library.
 * CSS in globals.css handles the transition and respects reduced motion.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"),
    );
    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
