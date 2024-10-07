import * as React from "react";
import { GatsbySSR } from "gatsby";
import { RootWrapper } from "./src/components/wrappers/RootWrapper";
import { PageWrapper } from "./src/components/wrappers/PageWrapper";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};

export const wrapPageElement: GatsbySSR["wrapPageElement"] = ({ element }) => {
  return <PageWrapper>{element}</PageWrapper>;
};
