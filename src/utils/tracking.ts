import { posthog } from "posthog-js";
import { isProdMode } from "./isProdMode";
import { siteConfig } from "src/conf";

type TrackingEvent = {
  name: string;
  properties: {
    [prop: string]: any;
  };
};

export function trackEvent(e: TrackingEvent) {
  sendToGTM(e);
  posthog.capture(e.name, e.properties);
}

function sendToGTM(e: TrackingEvent) {
  if (typeof window === "undefined") {
    return;
  }

  if (!(window as any).dataLayer) {
    return;
  }

  if (!isProdMode()) {
    return;
  }

  const { name, properties } = e;

  (window as any).dataLayer.push({
    event: name,
    ...properties,
  });
}

export function trackPixel(event: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") {
    return;
  }
  if (!(window as any).fbq) {
    return;
  }
  (window as any).fbq("track", event, properties);
}

export function initPosthog(token: string, apiHost: string, feVersion: string) {
  posthog.init(token, {
    api_host: apiHost,
    capture_pageview: false,
    autocapture: false,
    debug: !isProdMode(),
    disable_session_recording: !isProdMode(),
  });

  posthog.register({
    frontend_version: feVersion,
    frontend_app: "gatsby-marketing-webapp",
  });

  // Do not track in dev mode
  if (!isProdMode()) {
    posthog.opt_out_capturing();
  }
}

/**
 * @param value - for $5 usd pass 5
 */
export function gaTrackPaidTrialPurchaseConversion(input: { value: number; currency: string }) {
  if (!(window as any).gtag) {
    console.error("google tag not loaded before the app is loaded");
    return;
  }

  (window as any).gtag("event", "conversion", {
    send_to: `${siteConfig.gaTrackingID}/ppfXCKaJlcAZEMrCmPw9`,
    value: input.value,
    currency: input.currency.toUpperCase(),
    transaction_id: "",
  });
}
