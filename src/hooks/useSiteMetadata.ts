import { graphql, useStaticQuery } from "gatsby";

export type SiteMetadata = {
  brandName: string;
  title: string;
  version: string;
  description: string;
  image: string;
  email: string;
  website: {
    url: string;
    title: string;
  };
  webapp: {
    url: string;
    title: string;
  };
};

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          brandName
          title
          version
          description
          image
          email
          website {
            url
            title
          }
          webapp {
            url
            title
          }
        }
      }
    }
  `);

  return data.site.siteMetadata;
};
