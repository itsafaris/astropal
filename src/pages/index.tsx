import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`Experience the Most Accurate Personalized Astrology - ${brandName}`}
      description="Begin your AstroPal journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

export default function IndexPage() {
  return null;
}
