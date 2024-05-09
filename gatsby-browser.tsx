import * as React from "react";
import { GatsbyBrowser } from "gatsby";
import { posthog } from "posthog-js";

import { initPosthog } from "./src/utils/tracking";
import { RootWrapper } from "./src/components/root/RootWrapper";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

// @ts-ignore
import pkgjson from "./package.json";

const POSTHOG_KEY = "phc_zq8o1MJETg7eWOWcLI224iei1EhnhIbX0AM0EVLerdt";
const POSTHOG_HOST = "https://us.posthog.com";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  initPosthog(POSTHOG_KEY, POSTHOG_HOST, pkgjson.version);
  posthog.capture("$pageview");
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  posthog.capture("$pageview");
};

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};
