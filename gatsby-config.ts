import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

import pkgjson from "./package.json";
import { SiteMetadata } from "src/hooks/useSiteMetadata";

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    brandName: "Astropal",
    title: `Astropal`,
    siteUrl: `https://www.theastropal.com`,
    version: pkgjson.version,
    description: "Astrological Keys to Relationship Success",
  } satisfies SiteMetadata,
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-tsconfig-paths`,

    "gatsby-plugin-postcss",

    { resolve: `gatsby-plugin-emotion` },

    `gatsby-plugin-image`,

    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 75, // @mj - changed this from 50 to 90
        },
      },
    },

    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {number} [portalZIndex=undefined]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: undefined,
      },
    },

    `gatsby-transformer-sharp`,

    // {
    //   resolve: "gatsby-plugin-google-tagmanager",
    //   options: {
    //     id: "GTM-TDBF579X",
    //     includeInDevelopment: true,
    //     routeChangeEventName: "gatsby-route-change",
    //     enableWebVitalsTracking: false,
    //   },
    // },

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.png",
      },
    },
  ],
};

export default config;
