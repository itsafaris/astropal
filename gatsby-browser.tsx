import * as React from "react";
import { GatsbyBrowser, navigate } from "gatsby";
import { posthog } from "posthog-js";

import { initPosthog, trackPixelEvent } from "./src/utils/tracking";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";
import { siteConfig } from "./src/conf";

import { sessionCache } from "./src/sessionCache";
import { createProductURL } from "./src/utils/urls";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

// @ts-ignore
import pkgjson from "./package.json";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  initPosthog(siteConfig.posthogKey, siteConfig.posthogHost, pkgjson.version);
  sessionCache.createNewCache();
};

export const onPreRouteUpdate: GatsbyBrowser["onPreRouteUpdate"] = ({ location }) => {
  const isFunnelPathname = /\/face-reading\/.+/.test(location.pathname);
  const isOnboardingPathname = location.pathname.includes("/face-reading/success-checkout");

  if (isFunnelPathname && !isOnboardingPathname && sessionCache.hasConverted()) {
    navigate(createProductURL());
    return;
  }

  if (isOnboardingPathname && sessionCache.hasFinishedOnboarding()) {
    navigate(createProductURL());
    return;
  }
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  posthog.capture("$pageview");
  trackPixelEvent("ViewContent");
};

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => {
  return <PageWrapper>{element}</PageWrapper>;
};
