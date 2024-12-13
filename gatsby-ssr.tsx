import * as React from "react";
import { GatsbySSR } from "gatsby";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";
import { SuccessCheckoutWrapper } from "./src/components/wrappers/SuccessCheckoutWrapper";

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
