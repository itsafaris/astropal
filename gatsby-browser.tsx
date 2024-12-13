import * as React from "react";
import { GatsbyBrowser } from "gatsby";
import { posthog } from "posthog-js";
import { initPosthog, trackPixelEvent } from "./src/utils/tracking";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";
import { SuccessCheckoutWrapper } from "./src/components/wrappers/SuccessCheckoutWrapper";
import { siteConfig } from "./src/conf";
import { registerRedirects } from "./src/components/wrappers/successCheckoutUtils";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

// @ts-ignore
import pkgjson from "./package.json";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  initPosthog(siteConfig.posthogKey, siteConfig.posthogHost, pkgjson.version);
};

export const onPreRouteUpdate: GatsbyBrowser["onPreRouteUpdate"] = ({ location }) => {
  registerRedirects(location);
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
  posthog.capture("$pageview");
  trackPixelEvent("ViewContent");
};

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};

export const wrapPageElement: GatsbyBrowser["wrapPageElement"] = ({ element, props }) => {
  const { location } = props;

  return (
    <PageWrapper>
      {location.pathname.includes("/success-checkout") ? (
        <SuccessCheckoutWrapper>{element}</SuccessCheckoutWrapper>
      ) : (
        element
      )}
    </PageWrapper>
  );
};
