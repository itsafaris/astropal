import "./load-env";
import type { GatsbyConfig } from "gatsby";
import pkgjson from "./package.json";
import { SiteMetadata } from "src/hooks/useSiteMetadata";
import { siteConfig } from "./src/conf";

const isProd = process.env.NODE_ENV === "production";

const config: GatsbyConfig = {
  siteMetadata: {
    brandName: "Intuvist",
    title: `Intuvist`,
    siteUrl: isProd ? `https://www.intuvist.com` : "https://localhost:8000",
    version: pkgjson.version,
    image: "/images/meta_img.jpg",
    description:
      "Intuvist is your personalized face reading and astrology guide, offering tailored insights based on your birth details. Dive into daily forecasts, personal guidance, and inspirational wisdom, all designed to align closely with your individual path",
  } satisfies SiteMetadata,

  flags: {
    DEV_SSR: true,
  },

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
      resolve: "@sentry/gatsby",
      options: {
        dsn: siteConfig.sentryDSN,
        enabled: isProd,
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

    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          siteConfig.googleAnalyticsTag, // Google Analytics / GA
          siteConfig.googleAdsTag, // Google Ads / Adwords / AW
        ],
      },
    },

    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: siteConfig.fbPixelID,
      },
    },

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.jpg",
      },
    },

    "gatsby-plugin-anchor-links",
  ],
};

export default config;
