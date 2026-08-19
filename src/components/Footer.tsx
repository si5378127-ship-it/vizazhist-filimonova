import { ExternalMark, outboundServices } from "@/components/CtaLink";
import { footer, legal, links, operator, site } from "@/data/siteContent";
import { isExternalHref, linkAttrs } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

function TextLink({
  href,
  className,
  children,
  outbound,
}: {
  href: string;
  className: string;
  children: ReactNode;
  outbound?: keyof typeof outboundServices;
}) {
  const service = outbound ? outboundServices[outbound] : undefined;
  const content = (
    <>
      {children}
      {service ? <ExternalMark service={service} visible /> : null}
    </>
  );

  if (href.startsWith("/") && !isExternalHref(href)) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...linkAttrs(href)}>
      {content}
    </a>
  );
}

const footerContactLinks = [
  {
    href: links.vkMessage,
    label: "Написать в VK",
    outbound: "vk" as const,
  },
  {
    href: links.telegram,
    label: "Написать в Telegram",
    outbound: "telegram" as const,
  },
  {
    href: links.max,
    label: "Написать в MAX",
    outbound: "max" as const,
  },
  {
    href: links.instagram,
    label: "Instagram",
    outbound: "instagram" as const,
  },
];

const legalLinkClassName =
  "underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-4 pb-24 pt-12 sm:px-6 lg:px-10 lg:pb-12">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 sm:flex-row sm:justify-between sm:gap-16">
        <div className="min-w-0 max-w-full">
          <p className="font-serif text-xl text-ink">{site.name}</p>
          <p className="mt-1 text-sm text-muted">Визажист · {site.city}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {footer.address}
          </p>
          <a
            href={`mailto:${footer.email}`}
            className="mt-3 inline-block max-w-full break-all text-sm leading-relaxed text-muted transition-colors hover:text-ink"
          >
            {footer.email}
          </a>
        </div>

        <nav aria-label={footer.contactTitle}>
          <p className="font-serif text-xl text-ink">{footer.contactTitle}</p>
          <ul className="mt-4 space-y-1">
            {footerContactLinks.map((item) => (
              <li key={item.label}>
                <TextLink
                  href={item.href}
                  outbound={item.outbound}
                  className="inline-flex min-h-11 items-center text-[15px] text-ink transition-colors hover:text-accent-hover"
                >
                  {item.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-12 max-w-[1400px] border-t border-line pt-7">
        <p className="text-sm leading-relaxed text-ink">
          © {year} {operator.fullName}
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{legal.rights}</p>

        <nav
          className="mt-4 max-w-3xl text-xs leading-relaxed text-muted"
          aria-label="Юридические документы"
        >
          {legal.links.map((item, index) => (
            <span key={item.href}>
              {index > 0 ? <span aria-hidden> · </span> : null}
              <Link href={item.href} className={legalLinkClassName}>
                {item.label}
              </Link>
            </span>
          ))}
        </nav>

        <p className="mt-4 max-w-3xl break-words text-xs leading-relaxed text-muted">
          {legal.metrikaNote}
        </p>
        <p className="mt-3 max-w-3xl break-words text-xs leading-relaxed text-muted">
          {legal.thirdPartyNote}
        </p>
      </div>
    </footer>
  );
}
