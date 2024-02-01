import { Box, Container, Flex, Text, TextProps } from "@chakra-ui/react";
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

function Span(props: TextProps) {
  return <Text as="span" color="brand.600" fontWeight={"bold"} {...props} />;
}

export default function IndexPage() {
  return (
    <Box minHeight={"100vh"} color="bg.900" bgGradient={"linear(to-b, bg.50, bg.100)"}>
      <Container>
        <TopNavigation />
      </Container>

      <Container>
        <Flex flexDirection={"column"}>
          <Text
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            lineHeight={{ base: 1.4, md: 1.4 }}
            fontWeight={"bold"}
            textAlign="left"
            color="white"
            mb={6}
          >
            "Hello, I'm Sarah, and I got to know myself better following{" "}
            <Span>Astropal's astrological insights</Span>"
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            textAlign="left"
            color="whiteAlpha.700"
            fontWeight={"normal"}
            mb={6}
          >
            "At 43, grappling with <Span color="whiteAlpha.800">self-doubt</Span> and{" "}
            <Span color="whiteAlpha.800">seeking direction</Span>, traditional methods fell short
            until Astropal entered my life."
          </Text>

          <Flex height={{ base: 220, md: 330 }} width={"full"} mb={6} justifyContent={"center"}>
            <StaticImage src={`../images/testimonial-one.jpeg`} alt="" layout="constrained" />
          </Flex>

          <Text fontSize="md" textAlign="center" color="white" fontWeight={"semibold"} mb={3}>
            Complete a 1-minute quiz to get your first insight
          </Text>

          <Flex flexDirection={"row"} justifyContent={"center"} mb={4}>
            <Link to="/onboarding">
              <NextButton>Get your first insight now</NextButton>
            </Link>
          </Flex>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            textAlign="left"
            color="whiteAlpha.700"
            fontWeight={"normal"}
            mb={6}
          >
            "The depth of personalization provided by Astropal's personalized astrologer is
            unparalleled. It goes beyond generic horoscopes, offering a profound exploration of my
            individual strengths, weaknesses, and potential pathways.
          </Text>

          <Text
            fontSize={{ base: "md", md: "lg" }}
            textAlign="left"
            color="whiteAlpha.700"
            fontWeight={"normal"}
            mb={6}
          >
            The daily personalized insights have become my guiding light, helping me navigate life's
            twists and turns with newfound confidence."
          </Text>

          <Box height={"1px"} width={"full"} backgroundColor={"whiteAlpha.400"} />

          <Text fontSize="2xl" textAlign="center" color="white" fontWeight={"semibold"} my={6}>
            Start your self-discovery journey now
          </Text>

          <Text fontSize="md" textAlign="center" color="white" fontWeight={"semibold"} mb={3}>
            Complete a 1-minute quiz to get your first insight
          </Text>

          <Flex flexDirection={"row"} justifyContent={"center"} mb={20}>
            <Link to="/onboarding">
              <NextButton>Get your first insight now</NextButton>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
