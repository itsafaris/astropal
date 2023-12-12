import mixpanel from "mixpanel-browser";

type TrackingEvent = {
  event: string;
  [prop: string]: any;
};

export function trackEvent(e: TrackingEvent) {
  if (process.env.NODE_ENV === "development") {
    console.log("[track event]", e);
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

  const { event, ...rest } = e;

  (window as any).dataLayer.push({
    event: event,
    ...rest,
  });
}

function trackMixpanel(props: TrackingEvent) {
  const { event, ...rest } = props;
  mixpanel.track(props.event, { ...rest });
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
