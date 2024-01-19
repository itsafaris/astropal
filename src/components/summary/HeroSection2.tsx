import { Box, Container, Text, Flex, Heading } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { QuizStateParsed } from "@utils/state";

import { CTALinkToPricing } from "./components";

export function HeroSection2({ quizState }: { quizState?: QuizStateParsed }) {
  return (
    <Box id="hero-section" as="section">
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"} gap={8}>
          <Text
            fontWeight="bold"
            textAlign={"center"}
            width={"full"}
            fontSize={"3xl"}
            color="white"
          >
            Lets Use Your Profile To Maximize The Harmony In Your Life.
          </Text>

          <ProgressChart />

          <Flex flexDirection={"column"} alignItems={"center"} gap={3}>
            <Text textAlign={"center"} width={"full"} fontSize={"md"} fontWeight={"bold"}>
              Scroll down to find out
            </Text>
            <ArrowDownIcon fontSize={"3xl"} />
          </Flex>

          <CTALinkToPricing />
        </Flex>
      </Container>
    </Box>
  );
}

export function ProgressChart() {
  return (
    <Box p={2} bg="teal.800" borderRadius={"xl"}>
      <Heading px={4} py={4} fontWeight={"semibold"} fontSize={{ base: "lg" }} color="brand.700">
        On average,{" "}
        <Text as="span" color="green.400">
          93%
        </Text>{" "}
        of our users report feeling less self-doubt and greater clarity in their lives within just{" "}
        <Text as="span" color="green.400">
          21 days
        </Text>{" "}
        using Astropal.
      </Heading>

      <Box mt={4} overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../images/clarity_chart.png"
        />
      </Box>
    </Box>
  );
}
