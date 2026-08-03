// lib/gtag.ts
//
// Central place for firing Google Ads conversion events.
// Import `trackConversion` anywhere you want to fire an event
// (phone clicks, WhatsApp clicks, form submits, etc).

declare global {
    interface Window {
      gtag?: (...args: unknown[]) => void;
    }
  }
  
  const GOOGLE_ADS_ID = "AW-18362162987";
  
  /**
   * Fires a Google Ads conversion event.
   *
   * @param conversionLabel - the label part after the slash in your
   *   conversion action's "send_to" value, e.g. for
   *   "AW-18362162987/AbC-D3fGhIjKlMnOp" pass "AbC-D3fGhIjKlMnOp".
   *   You get this from Google Ads: Goals > Conversions > [action] > Tag setup.
   * @param extra - optional extra fields (e.g. value, currency) if you want
   *   to pass transaction-style data later.
   */
  export function trackConversion(
    conversionLabel: string,
    extra?: Record<string, unknown>
  ) {
    if (typeof window === "undefined" || typeof window.gtag !== "function") {
      return;
    }
  
    window.gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
      ...extra,
    });
  }