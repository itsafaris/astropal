import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { NextButton } from "@components/quizpage/components";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const HEADING_TITLE = "Find Your Life's Answers With a Personalized Astrologer";

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

        <Flex flexDirection={"column"} gap={6}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              overflow={"hidden"}
              height={"190px"}
              width={"190px"}
              boxShadow={"inset 0 0 50px 0 #ffc9001f, 0 0 50px 0 #ffc9002b"}
              position={"relative"}
            >
              <StaticImage
                src={`../images/partner-3.png`}
                alt="Option - in relationship"
                placeholder="none"
                width={180}
                height={180}
                layout="fixed"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />

              <StaticImage
                style={{ opacity: 1, position: "absolute", top: 0, left: 0, zIndex: 1 }}
                alt=""
                src="../images/astro-avatar.png"
                width={190}
                height={190}
              />
            </Flex>
          </Flex>

          <Heading as="h1" size="xl" textAlign="center" color="white">
            {HEADING_TITLE}
          </Heading>

          <Text fontSize="md" textAlign="center" color="bg.700">
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
