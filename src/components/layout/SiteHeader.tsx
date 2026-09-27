"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { mainNav, primaryCta } from "@/content/navigation";
import { site } from "@/content/site";
import { Logo } from "@/components/ui/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { ArrowRight, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { EmailLink, PhoneLink } from "@/components/ui/ContactValue";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // On the home page the header sits on the dark hero until the page scrolls.
  const isHome = pathname === "/";
  const dark = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock scroll, trap focus, close on Escape or when resized to desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const panel = document.getElementById("mobile-menu");
    const firstLink = panel?.querySelector<HTMLElement>("a");
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key !== "Tab" || !headerRef.current) return;
      const focusables = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && close();

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  return (
    <header
      ref={headerRef}
      data-theme={dark ? "dark" : "light"}
      className={`sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        dark
          ? "border-b border-transparent bg-navy text-on-navy"
          : `border-b border-line bg-paper/95 text-ink backdrop-blur-md supports-[backdrop-filter]:bg-paper/92 ${
              scrolled ? "shadow-[0_1px_0_rgb(20_26_34/0.04),0_8px_24px_-12px_rgb(20_26_34/0.12)]" : ""
            }`
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        <Logo tone={dark ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {mainNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.9375rem] font-medium transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:origin-left after:transition-transform after:duration-300 ${
                      active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                    } ${
                      dark
                        ? "text-on-navy/85 after:bg-accent-light hover:text-on-navy"
                        : "text-ink-2 after:bg-accent hover:text-ink"
                    } ${active ? (dark ? "text-on-navy!" : "text-ink!") : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={primaryCta.href}
            className={`hidden sm:inline-flex ${buttonClasses(dark ? "inverse" : "primary", "sm")}`}
          >
            {primaryCta.label}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className={`-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-[2px] transition-colors lg:hidden ${
              dark ? "hover:bg-on-navy/10" : "hover:bg-ink/5"
            }`}
          >
            {open ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto border-t border-line bg-paper motion-safe:animate-[menu-in_0.25s_ease-out] lg:hidden"
        >
          <nav aria-label="Mobile" className="container-site flex-1 py-6">
            <ul className="divide-y divide-line border-y border-line">
              {mainNav.map((item, i) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => close()}
                      aria-current={active ? "page" : undefined}
                      className="group flex items-center justify-between py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-display text-2xl font-semibold tracking-tight ${
                            active ? "text-accent" : "text-ink"
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowRight
                        size={20}
                        className="text-muted transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={primaryCta.href}
              onClick={() => close()}
              className={`mt-8 w-full ${buttonClasses("primary", "lg")}`}
            >
              {primaryCta.label}
              <ArrowRight size={18} />
            </Link>
          </nav>
          <div className="container-site border-t border-line py-6 text-sm text-ink-2">
            <p className="eyebrow text-muted">Contact</p>
            <p className="mt-3">
              <EmailLink className="hover:text-accent" />
            </p>
            <p className="mt-1">
              <PhoneLink className="hover:text-accent" />
            </p>
            <p className="mt-1 text-muted">Serving {site.serviceArea.summary}</p>
          </div>
        </div>
      )}
    </header>
  );
}
