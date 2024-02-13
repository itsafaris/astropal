import { Box, Container, Flex, Heading, Text, Button, useTheme } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { TopNavigation } from "@components/topnavigation";

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

          <Heading
            as="h1"
            fontSize={{
              base: "32px",
              md: "32px",
            }}
            lineHeight={1.4}
            textAlign="center"
            color="white"
            maxWidth={400}
            mx="auto"
          >
            <Text as="span" color="brand.600">
              Get All Answers. <br />
            </Text>
            The Most Accurate Personalized Astrology
          </Heading>

          <Flex
            flexDirection={"column"}
            fontWeight={"regular"}
            color="whiteAlpha.600"
            fontSize="md"
          >
            <Text textAlign="center">
              - Time your{" "}
              <Text as="span" fontWeight={"bold"} color="whiteAlpha.800">
                Opportunities
              </Text>
            </Text>

            <Text textAlign="center">
              - Make{" "}
              <Text as="span" fontWeight={"bold"} color="whiteAlpha.800">
                Decisions
              </Text>{" "}
              with confidence -
            </Text>

            <Text textAlign="center">
              - Tailored Uniquely for{" "}
              <Text as="span" fontWeight={"bold"} color="whiteAlpha.800">
                You
              </Text>{" "}
              -
            </Text>
          </Flex>

          <Flex flexDirection={"row"} justifyContent={"center"} mt={3}>
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
                Get my first insight
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
