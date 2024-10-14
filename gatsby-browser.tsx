import * as React from "react";
import { GatsbyBrowser } from "gatsby";
import { posthog } from "posthog-js";

import { initPosthog, trackPixel } from "./src/utils/tracking";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";
import { siteConfig } from "./src/conf";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

// @ts-ignore
import pkgjson from "./package.json";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  initPosthog(siteConfig.posthogKey, siteConfig.posthogHost, pkgjson.version);
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  posthog.capture("$pageview");
  trackPixel("ViewContent");
};

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element }) => {
  return <PageWrapper>{element}</PageWrapper>;
};
