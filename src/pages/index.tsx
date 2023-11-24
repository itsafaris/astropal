import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";

export const Head: HeadFC = () => <title>Astropal</title>;

const IndexPage: React.FC<PageProps> = () => {
  return <>Hello 2</>;
};

export default IndexPage;
