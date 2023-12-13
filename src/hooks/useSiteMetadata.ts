import { graphql, useStaticQuery } from "gatsby";

export type SiteMetadata = {
  brandName: string;
  title: string;
  version: string;
  siteUrl: string;
  description: string;
};

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          brandName
          title
          version
          siteUrl
          description
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
