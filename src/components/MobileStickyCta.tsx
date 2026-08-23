"use client";

import { CtaLink } from "@/components/CtaLink";
import { cta, links } from "@/data/siteContent";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.12 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-cream/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <CtaLink
        href={links.dikidi}
        outbound="dikidi"
        className="w-full"
        goal="dikidi_click"
        placement="mobile_sticky"
      >
        {cta.book}
      </CtaLink>
    </div>
  );
}
