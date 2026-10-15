"use client";

import type { ResolvedSiteContent } from "@/sanity/lib/mapLandingContent";
import { createContext, useContext, type ReactNode } from "react";

const SiteContentContext = createContext<ResolvedSiteContent | null>(null);

export function SiteContentProvider({
  value,
  children,
}: {
  value: ResolvedSiteContent;
  children: ReactNode;
}) {
  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent(): ResolvedSiteContent {
  const value = useContext(SiteContentContext);
  if (!value) {
    throw new Error("useSiteContent должен использоваться внутри SiteContentProvider");
  }
  return value;
}
