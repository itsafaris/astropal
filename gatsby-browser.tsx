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
  // Regular expression to match "/face-reading/" followed by at least one character
  const isInFunnelUrl = /\/face-reading\/.+/.test(location.pathname);
  const hasPurchased = sessionCache.hasPurchased();

  if (hasPurchased && isInFunnelUrl) {
    navigate(createProductURL());
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
