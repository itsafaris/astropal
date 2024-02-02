import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { SEO } from "@components/seo";
import { NextButton } from "@components/quizpage/components";
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

export default function IndexPage() {
  return (
    <Box minHeight={"100vh"} color="bg.900" bgGradient={"linear(to-b, bg.50, bg.100)"}>
      <Container>
        <TopNavigation />
      </Container>

      <Container>
        <Flex flexDirection={"column"} gap={6}>
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
              base: "28px",
              md: "32px",
            }}
            textAlign="center"
            color="white"
            maxWidth={400}
            mx="auto"
          >
            Get To Know Yourself Through a Personalized <br /> Astrology Insights
          </Heading>

          <Text fontSize="lg" textAlign="center" color="bg.700">
            Complete a{" "}
            <Text as="span" fontWeight={"bold"} color="brand.500">
              1-minute
            </Text>{" "}
            quiz <br /> to get a first insight
          </Text>

          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Link to="/onboarding">
              <NextButton>Get my first insight</NextButton>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
