import { Box, Container, Flex, Text, Button, useTheme } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { TopNavigation } from "@components/topnavigation";
import { CheckIcon } from "@chakra-ui/icons";
import { Headline, InvertedHighlight } from "@components/summary/components";
import { useEffect } from "react";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`Experience the Most Accurate Personalized Astrology - ${brandName}`}
      description="Begin your AstroPal journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

// const headline = "Unlock Your Full Potential Through a Personalized Astrology Insights"
// const headline = "Personalized Astrology Insights To Unlock Your Full Potential"
// const headline = "Never Miss an Oportunity With a Personalized Astrology Insights"
// const headline = "Never Miss an Oportunity With a Personalized Astrology Insights";
// const headline = "A Cosmic Compass: Personalized Astrological Guidance";
// const headline = "Navigate Life's Choices With Personalized Astrology Insights";
// const headline = "Navigate Success With Personalized Astrology Insights";

export default function IndexPage() {
  useEffect(() => {
    navigate("/onboarding", { replace: true });
  }, []);

  return null;
}
