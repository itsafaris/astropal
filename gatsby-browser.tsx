import * as React from "react";
import { GatsbyBrowser } from "gatsby";
import { posthog } from "posthog-js";

import { initPosthog, trackPixelEvent } from "./src/utils/tracking";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

// @ts-ignore
import pkgjson from "./package.json";

const POSTHOG_KEY = "phc_zq8o1MJETg7eWOWcLI224iei1EhnhIbX0AM0EVLerdt";
const POSTHOG_HOST = "https://us.i.posthog.com";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  initPosthog(POSTHOG_KEY, POSTHOG_HOST, pkgjson.version);
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
