import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { PropsWithChildren } from "react";
import { Origin, Horoscope } from "circular-natal-horoscope-js";
import { createNatalChartData } from "@utils/natalChart";

const HEADING_TITLE = "Your own hyper personalized astrologer";

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
            45-second
          </Text>{" "}
          quiz to get a first insight
        </Text>

        <Text textAlign={"center"} fontSize={"xl"} fontWeight={"bold"}>
          What is your relationship status?
        </Text>

        <button
          onClick={() => {
            const origin = new Origin({
              year: 1990,
              month: 5, // 0 = January, 11 = December!
              date: 11,
              hour: 9,
              minute: 30,
              latitude: 55.0,
              longitude: 22.0,
            });

            const horoscope = new Horoscope({
              origin: origin,
              houseSystem: "whole-sign",
              zodiac: "tropical",
              aspectPoints: ["bodies", "points", "angles"],
              aspectWithPoints: ["bodies", "points", "angles"],
              aspectTypes: ["major", "minor"],
              customOrbs: {},
              language: "en",
            });

            const chart = createNatalChartData(horoscope);
            console.log(chart);
            console.log(horoscope);
          }}
        >
          Try
        </button>

        <Flex justifyContent="center" mt={8} gap={4}>
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
