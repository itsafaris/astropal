import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
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
const headline = "Navigate Success With Personalized Astrology Insights";

export default function IndexPage() {
  return (
    <Box minHeight={"100vh"} color="bg.900" bgGradient={"linear(to-b, bg.50, bg.100)"}>
      <Container>
        <TopNavigation />
      </Container>

      <Container>
        <Flex flexDirection={"column"} gap={8}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              overflow={"hidden"}
              height={"160px"}
              width={"160px"}
              boxShadow={"inset 0 0 50px 0 #ffc9001f, 0 0 50px 0 #ffc9002b"}
              position={"relative"}
            >
              <StaticImage
                src={`../images/partner-3.png`}
                alt="Option - in relationship"
                placeholder="none"
                width={150}
                height={150}
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
            lineHeight={1.3}
            textAlign="center"
            color="white"
            maxWidth={400}
            mx="auto"
          >
            Navigate Success <br /> With{" "}
            <Text as="span" color="brand.600">
              Personalized
            </Text>
            <br /> Astrology{" "}
            <Text as="span" color="brand.600">
              Insights
            </Text>
          </Heading>

          <Flex flexDirection={"column"} fontWeight={"thin"} color="brand.800">
            <Text fontSize="lg" textAlign="center">
              - Never Miss an{" "}
              <Text as="span" fontWeight={"bold"}>
                Opportunity
              </Text>
            </Text>

            <Text fontSize="lg" textAlign="center">
              - Make{" "}
              <Text as="span" fontWeight={"bold"}>
                Decisions
              </Text>{" "}
              with Confidence
            </Text>

            <Text fontSize="lg" textAlign="center">
              - Tailored Uniquely for{" "}
              <Text as="span" fontWeight={"bold"}>
                You
              </Text>
            </Text>
          </Flex>

          {/* <Text fontSize="md" textAlign="center" color="bg.700">
            Complete a 1-minute quiz <br /> to get a first insight
          </Text> */}

          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Link to="/onboarding">
              <Button
                backgroundColor={"brand.500"}
                py={6}
                px={8}
                color="brand.50"
                fontSize={"lg"}
                _hover={{
                  backgroundColor: "brand.400",
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
