export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function linkAttrs(href: string) {
  if (!isExternalHref(href)) {
    return {};
  }

  return {
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
