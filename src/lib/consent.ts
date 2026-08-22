export const ANALYTICS_CONSENT_KEY = "analytics-consent";
export const ANALYTICS_CONSENT_VALUE = "accepted";

export function isAnalyticsConsentGranted(
  storage: Pick<Storage, "getItem"> | null | undefined,
): boolean {
  if (!storage) {
    return false;
  }

  try {
    return storage.getItem(ANALYTICS_CONSENT_KEY) === ANALYTICS_CONSENT_VALUE;
  } catch {
    return false;
  }
}

export function grantAnalyticsConsent(storage: Pick<Storage, "setItem">): void {
  storage.setItem(ANALYTICS_CONSENT_KEY, ANALYTICS_CONSENT_VALUE);
}
