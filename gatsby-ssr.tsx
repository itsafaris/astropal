import * as React from "react";
import { GatsbySSR } from "gatsby";
import { RootWrapper } from "./src/components/root/RootWrapper";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <RootWrapper>{element}</RootWrapper>;
};
