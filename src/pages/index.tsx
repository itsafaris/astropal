import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link, prefetchPathname } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { PropsWithChildren, useEffect } from "react";

const HEADING_TITLE = "Personalized astrology report with powerful predictions";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`${HEADING_TITLE} - ${brandName}`}
      description="Begin your AstroPal journey and unlock cosmic secrets for love and connection. Take our quiz to reveal personalized astrological and numerological insights for your relationships."
    />
  );
}

export default function IndexPage() {
  return (
    <Box minHeight={"100vh"} color="bg.900" bgGradient={"linear(to-b, bg.50, bg.100)"}>
      <Box py={6} px={4} maxWidth="md" mx="auto">
        <Box flexDirection={"row"} alignItems={"center"} display={"flex"} gap={3} mb={5}>
          <StaticImage src={`../images/favicon.png`} alt="Astropal logo" height={50} />
          <Text fontSize={"xl"} fontWeight={"bold"}>
            Astropal
          </Text>
        </Box>
        <Heading mb={12} as="h1" size="xl" textAlign="center">
          {HEADING_TITLE}
        </Heading>
        <Text my={8} fontSize="lg" textAlign="center" color="bg.400">
          Complete a{" "}
          <Text as="span" fontWeight={"bold"} color="brand.500">
            1-minute
          </Text>{" "}
          quiz to get a personalized prediction.
        </Text>
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          What is your relationship status?
        </Text>
        <Flex justifyContent="center" mt={8} gap={4}>
          <Link to="/quiz-single">
            <ImageButton text="Single">
              <StaticImage
                src={`../images/single_person.png`}
                alt="Option - single"
                placeholder="none"
                width={200}
                height={200}
              />
            </ImageButton>
          </Link>
          <Link to="/quiz-inrelationship">
            <ImageButton text="In relationship">
              <StaticImage
                src={`../images/inrelationship.png`}
                alt="Option - in relationship"
                placeholder="none"
                width={200}
                height={200}
              />
            </ImageButton>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}

function ImageButton({ children, text }: PropsWithChildren<{ text: string }>) {
  return (
    <Box>
      <Box
        p={4}
        borderRadius={"2xl"}
        overflow={"hidden"}
        border="2px solid"
        borderColor={"brand.200"}
        boxShadow={"0 0 8px 4px rgb(40 86 99 / 20%)"}
      >
        {children}
        <Text mt={4} textAlign={"center"} color="brand.400" fontWeight={"semibold"}>
          {text}
        </Text>
      </Box>
    </Box>
  );
}
