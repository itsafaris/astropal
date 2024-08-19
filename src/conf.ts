const coreApiHost = process.env.GATSBY_CORE_URL ?? "";
const stripePublicKey = process.env.GATSBY_STRIPE_PUBLIC_KEY ?? "";
const stripeEnv = stripePublicKey.includes("live") ? "live" : "test";
const gaTrackingID = process.env.GATSBY_GOOGLE_ADS_TAG ?? "";

export type SiteConfig = {
  stripePublicKey: string;
  stripeEnv: "live" | "test";
  coreApiHost: string;
  gaTrackingID: string;
};

export const siteConfig: SiteConfig = {
  stripePublicKey,
  stripeEnv,
  coreApiHost,
  gaTrackingID,
};
