"use client";

import { CtaLink } from "@/components/CtaLink";
import { cta, links, nav, site } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

type HeaderProps = {
  stuckInitially?: boolean;
};

export function Header({ stuckInitially = false }: HeaderProps) {
  const [stuck, setStuck] = useState(stuckInitially);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        stuck || open
          ? "border-b border-line/80 bg-cream/95 shadow-none backdrop-blur-md"
          : "border-b border-transparent bg-cream",
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-[1400px] items-center justify-between gap-3 px-4 py-2 sm:min-h-[4.5rem] sm:gap-4 sm:px-6 lg:px-10">
        <Link href="/" className="min-w-0 leading-tight">
          <span className="block font-serif text-[1.05rem] tracking-wide text-ink min-[375px]:text-[1.15rem] sm:text-xl">
            {site.name}
          </span>
          <span className="block text-[11px] text-muted min-[375px]:text-xs sm:text-[13px]">
            {site.roleLine}
          </span>
        </Link>

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Основная навигация"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[15px] text-ink/80 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <CtaLink
            href={links.dikidi}
            outbound="dikidi"
            variant="nav"
            className="px-3.5 sm:px-5"
            goal="dikidi_click"
            placement="header"
          >
            {cta.book}
          </CtaLink>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">Меню</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-ink transition-transform duration-200",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-px w-full bg-ink transition-opacity duration-200",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-px w-full bg-ink transition-transform duration-200",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden",
          open
            ? "max-h-[calc(100svh-4rem)] overflow-y-auto border-t border-line"
            : "hidden",
        )}
      >
        <nav
          className="flex flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Мобильная навигация"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-2 py-3 text-lg text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
