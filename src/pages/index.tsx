import { Box, Container, Flex, Text, Button, useTheme } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { TopNavigation } from "@components/topnavigation";
import { CheckIcon } from "@chakra-ui/icons";
import { Headline, InvertedHighlight } from "@components/summary/components";

export function Head() {
  const { brandName } = useSiteMetadata();
  return (
    <SEO
      title={`Get a personalized self-discovery guide based on astrology - ${brandName}`}
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
  const theme = useTheme();

  return (
    <Box minHeight={"100vh"} color="bg.900" bgGradient={"linear(to-b, bg.50, bg.100)"}>
      <Container>
        <TopNavigation />
      </Container>

      <Container>
        <Flex flexDirection={"column"} gap={5}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              overflow={"hidden"}
              height={"150px"}
              width={"150px"}
              boxShadow={"inset 0 0 50px 0 #ffc9001f, 0 0 50px 0 #ffc9002b"}
              position={"relative"}
            >
              <StaticImage
                src={`../images/partner-3.png`}
                alt="Option - in relationship"
                placeholder="none"
                width={140}
                height={140}
                layout="fixed"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: `1px solid #e4b382`,
                  borderRadius: "50%",
                }}
              />

              <StaticImage
                style={{ opacity: 1, position: "absolute", top: 0, left: 0, zIndex: 0 }}
                alt=""
                src="../images/astro-avatar.png"
                width={170}
                height={170}
              />
            </Flex>
          </Flex>

          <Headline fontSize={"4xl"} my={4}>
            <InvertedHighlight>
              Experience the Most Accurate Personalized Astrology Readings
            </InvertedHighlight>
          </Headline>

          <Flex
            flexDirection={"column"}
            color="white"
            fontSize="md"
            alignItems={"start"}
            mx="auto"
            gap={2}
          >
            <Text textAlign="center">
              <CheckIcon mr={3} color="green.500" />
              Time Your Opportunities
            </Text>
            <Text textAlign="center">
              <CheckIcon mr={3} color="green.500" />
              Make Decisions with Confidence
            </Text>
            <Text textAlign="center">
              <CheckIcon mr={3} color="green.500" />
              Capitalize on Your Talents
            </Text>
          </Flex>

          <Text mt={8} color={"white"} fontSize={"md"} fontWeight={"bold"} textAlign={"center"}>
            Unlock Your Future with a 1-min quiz
          </Text>

          <Flex flexDirection={"row"} justifyContent={"center"} mt={4} mb={20}>
            <Link to="/onboarding">
              <Button
                backgroundColor={"brand.600"}
                py={6}
                px={8}
                color="brand.50"
                fontSize={"lg"}
                boxShadow={`0 0 0 6px ${theme.colors.brand["800"]}`}
                _hover={{
                  backgroundColor: "brand.500",
                }}
              >
                Get Your Reading
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
