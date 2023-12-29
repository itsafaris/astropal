import mixpanel from "mixpanel-browser";

type TrackingEvent = {
  name: string;
  properties: {
    [prop: string]: any;
  };
};

export function trackEvent(e: TrackingEvent) {
  if (process.env.NODE_ENV === "development") {
    console.log("[track event]", e);
    return;
  }

  sendToGTM(e);
  trackMixpanel(e);
}

function sendToGTM(e: TrackingEvent) {
  if (typeof window === "undefined") {
    return;
  }

  if (!(window as any).dataLayer) {
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

function trackMixpanel(props: TrackingEvent) {
  const { name, properties } = props;
  mixpanel.track(name, { ...properties });
}

export function initMixpanel(token: string, feVersion: string) {
  mixpanel.init(token, {
    debug: true,
    persistence: "localStorage",
  });

  mixpanel.register({
    frontend_version: feVersion,
  });
}
