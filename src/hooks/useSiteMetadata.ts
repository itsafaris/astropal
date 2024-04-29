import { graphql, useStaticQuery } from "gatsby";

export type SiteMetadata = {
  brandName: string;
  title: string;
  version: string;
  siteUrl: string;
  description: string;
  image: string;
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
          image
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
