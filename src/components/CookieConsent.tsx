"use client";

import { YandexMetrika } from "@/components/YandexMetrika";
import { links } from "@/data/siteContent";
import {
  grantAnalyticsConsent,
  isAnalyticsConsentGranted,
} from "@/lib/consent";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CookieConsent() {
  const [consent, setConsent] = useState<boolean | null>(null);

  useEffect(() => {
    setConsent(isAnalyticsConsentGranted(window.localStorage));
  }, []);

  const accept = () => {
    grantAnalyticsConsent(window.localStorage);
    setConsent(true);
  };

  return (
    <>
      {consent === true ? <YandexMetrika /> : null}
      {consent === false ? (
        <div
          role="dialog"
          aria-describedby="cookie-consent-text"
          aria-label="Уведомление о cookie"
          className="fixed bottom-24 left-4 right-4 z-40 rounded-lg border border-line bg-cream p-4 shadow-md lg:bottom-6 lg:left-auto lg:right-6 lg:w-[21.5rem]"
        >
          <p
            id="cookie-consent-text"
            className="text-sm leading-relaxed text-muted"
          >
            Мы используем cookie и Яндекс Метрику для анализа посещаемости и
            улучшения работы сайта. Подробнее — в{" "}
            <Link
              href={links.cookies}
              className="underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
            >
              Политике cookie
            </Link>
            .
          </p>
          <button
            type="button"
            onClick={accept}
            className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-accent px-5 py-2.5 text-[15px] font-medium text-cream transition-colors duration-200 hover:bg-accent-hover"
          >
            Принять
          </button>
        </div>
      ) : null}
    </>
  );
}
