import * as React from "react";
import { GatsbySSR } from "gatsby";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";
import { SuccessCheckoutWrapper } from "./src/components/wrappers/SuccessCheckoutWrapper";

import { siteConfig } from "./src/conf";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element, props }) => {
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

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV === `production`) {
    return setHeadComponents([
      <script
        key="meta-pixel"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            // Initialize Pixel with an alias
            fbq('init', '${siteConfig.fbPixelID_1}', {}, 'fb_pixel_1');
            fbq('init', '${siteConfig.fbPixelID_2}', {}, 'fb_pixel_2');

            // Track PageView globally for all Pixels
            fbq('track', 'PageView');
          `,
        }}
      />,
    ]);
  }
};
