import { posthog } from "posthog-js";
import { isProdMode } from "./isProdMode";

type TrackingEvent = {
  name: string;
  properties: {
    [prop: string]: any;
  };
};

export function trackEvent(e: TrackingEvent) {
  sendToGTM(e);
  trackPosthog(e);
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

export function trackPixel(event: string, properties: Record<string, any>) {
  if (typeof window === "undefined") {
    return;
  }
  if (!(window as any).fbq) {
    return;
  }
  (window as any).fbq("track", event, properties);
}

function trackPosthog(props: TrackingEvent) {
  posthog.capture(props.name, props.properties);
}

export function initPosthog(token: string, apiHost: string, feVersion: string) {
  posthog.init(token, {
    api_host: apiHost,
    capture_pageview: false,
    autocapture: false,
    debug: !isProdMode(),
  });

  posthog.register({
    frontend_version: feVersion,
  });

  // Do not track in dev mode
  if (!isProdMode()) {
    posthog.opt_out_capturing();
  }
}
