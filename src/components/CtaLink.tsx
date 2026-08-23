"use client";

import { reachMetrikaGoal, type MetrikaGoalId } from "@/lib/metrika";
import { cn, linkAttrs } from "@/lib/utils";
import type { ReactNode } from "react";

export const outboundServices = {
  dikidi: "Dikidi",
  yandex: "Яндекс",
  instagram: "Instagram",
  vk: "VK",
  telegram: "Telegram",
  max: "MAX",
} as const;

export type OutboundService = keyof typeof outboundServices;

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "nav";
  className?: string;
  onClick?: () => void;
  outbound?: OutboundService;
  goal?: MetrikaGoalId;
  placement?: string;
};

const variants: Record<NonNullable<CtaLinkProps["variant"]>, string> = {
  primary:
    "inline-flex min-h-12 items-center justify-center rounded-md bg-accent px-7 py-3 text-base font-medium text-cream transition-colors duration-200 hover:bg-accent-hover",
  secondary:
    "inline-flex min-h-12 items-center justify-center rounded-md border border-line bg-transparent px-6 py-3 text-base font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent-hover",
  ghost:
    "inline-flex min-h-11 items-center justify-center text-base text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink hover:decoration-accent",
  nav: "inline-flex min-h-11 items-center justify-center rounded-md bg-accent px-5 py-2.5 text-[15px] font-medium text-cream transition-colors duration-200 hover:bg-accent-hover",
};

export function ExternalMark({
  service,
  visible = false,
}: {
  service: string;
  visible?: boolean;
}) {
  return (
    <>
      {visible ? (
        <span className="ml-1 text-[0.85em] font-normal opacity-70" aria-hidden>
          ↗
        </span>
      ) : null}
      <span className="sr-only"> (сторонний сервис: {service})</span>
    </>
  );
}

export function CtaLink({
  href,
  children,
  variant = "primary",
  className,
  onClick,
  outbound,
  goal,
  placement,
}: CtaLinkProps) {
  const service = outbound ? outboundServices[outbound] : undefined;
  const showMark =
    Boolean(outbound) && (variant === "secondary" || variant === "ghost");
  const label =
    service && typeof children === "string"
      ? `${children}, переход на ${service}`
      : undefined;

  return (
    <a
      href={href}
      className={cn(variants[variant], className)}
      onClick={() => {
        if (goal && placement) {
          reachMetrikaGoal(goal, { placement });
        }
        onClick?.();
      }}
      aria-label={label}
      {...linkAttrs(href)}
    >
      {children}
      {service ? <ExternalMark service={service} visible={showMark} /> : null}
    </a>
  );
}
