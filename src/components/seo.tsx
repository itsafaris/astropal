import React from "react";
import { useSiteMetadata } from "@hooks/useSiteMetadata";

export type SEOProps = {
  title?: string;
  description?: string;
  pathname?: string;
  image?: string;
  children?: React.ReactNode;
};

export const SEO = ({ title, image, description, pathname, children }: SEOProps) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    website,
    image: defualtImage,
  } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    url: `${website.url}${pathname || ``}`,
    image: image ?? defualtImage,
    // twitterUsername,
  };

  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      {/* <meta name="twitter:creator" content={seo.twitterUsername} /> */}

      <meta name="facebook-domain-verification" content="f77cds66xztr7hc40tw7fkrxza3a9y" />
      <meta name="facebook-domain-verification" content="6602iv2uw2252tayo6wh7766upec7d" />
      {children}
    </>
  );
};
