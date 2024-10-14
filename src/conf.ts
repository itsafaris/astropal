import dotenv from "dotenv";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const coreApiHost = process.env.GATSBY_CORE_URL ?? "";
const stripePublicKey = process.env.GATSBY_STRIPE_PUBLIC_KEY ?? "";
const stripeEnv = stripePublicKey.includes("live") ? "live" : "test";
const googleAdsTag = process.env.GATSBY_GOOGLE_ADS_TAG ?? "";
const googleAnalyticsTag = process.env.GATSBY_GOOGLE_ANALYTICS_TAG ?? "";
const fbPixelID = process.env.GATSBY_FB_PIXEL_ID ?? "";
const posthogKey = process.env.GATSBY_POSTHOG_KEY ?? "";
const posthogHost = process.env.GATSBY_POSTHOG_HOST ?? "";
const sentryDSN = process.env.GATSBY_SENTRY_DSN ?? "";

export type SiteConfig = {
  stripePublicKey: string;
  stripeEnv: "live" | "test";
  coreApiHost: string;
  googleAdsTag: string;
  googleAnalyticsTag: string;
  fbPixelID: string;
  posthogKey: string;
  posthogHost: string;
  sentryDSN: string;
};

export const siteConfig: SiteConfig = {
  stripePublicKey,
  stripeEnv,
  coreApiHost,
  googleAdsTag,
  googleAnalyticsTag,
  fbPixelID,
  posthogKey,
  posthogHost,
  sentryDSN,
};
