import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { NextButton } from "@components/quizpage/components";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { PropsWithChildren } from "react";

const HEADING_TITLE = "Your Own Hyper Personalized Astrologer";

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
        <Box flexDirection={"row"} alignItems={"center"} display={"flex"} gap={3} mb={8}>
          <StaticImage src={`../images/favicon.png`} alt="Astropal logo" height={35} />
          <Text fontSize={"md"} fontWeight={"semibold"}>
            Astropal
          </Text>
        </Box>

        <Flex flexDirection={"column"} gap={7}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <StaticImage
              src={`../images/partner.png`}
              alt="Option - in relationship"
              placeholder="none"
              width={170}
              height={170}
            />
          </Flex>

          <Heading as="h1" size="2xl" textAlign="center" color="white">
            {HEADING_TITLE}
          </Heading>

          <Text fontSize="md" textAlign="center" color="bg.700" my={3}>
            Complete a{" "}
            <Text as="span" fontWeight={"bold"} color="brand.500">
              1-minute
            </Text>{" "}
            quiz <br /> to get a first insight
          </Text>

          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Link to="/onboarding">
              <NextButton>Let's start</NextButton>
            </Link>
          </Flex>
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
