import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { PropsWithChildren } from "react";

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
      <Box py={16} px={8} maxWidth="md" mx="auto">
        <Heading mb={12} as="h1" size="xl" textAlign="center">
          {HEADING_TITLE}
        </Heading>
        <Text my={8} fontSize="lg" textAlign="center" color="bg.400">
          Complete a{" "}
          <Text as="span" fontWeight={"bold"} color="brand.500">
            1-minute
          </Text>{" "}
          quiz to get a personalized prediction. The result is not guaranteed and may vary from case
          to case.
        </Text>
        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          What is your relationship status?
        </Text>
        <Flex justifyContent="center" mt={8} gap={8}>
          <Link to="/quiz-single">
            <ImageButton text="Single">
              <StaticImage src={`../images/single_person.png`} alt="Option - single" />
            </ImageButton>
          </Link>
          <Link to="/quiz-inrelationship">
            <ImageButton text="In relationship">
              <StaticImage src={`../images/inrelationship.png`} alt="Option - in relationship" />
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
        border="1px solid"
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
