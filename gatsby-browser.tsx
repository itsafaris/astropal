import * as React from "react";
import { GatsbyBrowser } from "gatsby";

import mixpanel from "mixpanel-browser";
import { initMixpanel } from "./src/utils/tracking";
import { RootWrapper } from "./src/components/root/RootWrapper";

import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";

// @ts-ignore
import pkgjson from "./package.json";

const GA_TRACKING_ID = "";
const GATSBY_MIXPANEL_TOKEN = "";

// export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
//   (function setupGA4() {
//     (window as any).dataLayer = (window as any).dataLayer || [];
//     function gtag() {
//       (window as any).dataLayer.push(arguments);
//     }

//     (window as any).gtag = gtag;
//     // @ts-expect-error
//     gtag("js", new Date());
//     // @ts-expect-error
//     gtag("config", GA_TRACKING_ID);
//   })();

//   if (GATSBY_MIXPANEL_TOKEN) {
//     initMixpanel(GATSBY_MIXPANEL_TOKEN, pkgjson.version);
//   }
// };

// export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = () => {
//   mixpanel.track_pageview();
// };

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({
  element,
}) => {
  return <RootWrapper>{element}</RootWrapper>;
};
