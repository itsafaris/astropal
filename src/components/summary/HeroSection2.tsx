import { Box, Container, Text, Stack, Flex, useTheme } from "@chakra-ui/react";
import React from "react";
import { CheckIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { QuizStateParsed } from "@utils/state";
import { CTALinkToPricing, HeadlineHighlight } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { AstrologicalProfileSmall } from "./AstrologicalProfileSmall";
import { Span } from "@components/quizpage/components";
import { PricingSection } from "./PricingSection";
import { AiOutlinePlus } from "react-icons/ai";
import { Headline } from "./components";

export function HeroSection({ state }: { state: QuizStateParsed }) {
  const theme = useTheme();

  return (
    <>
      <Box id="hero-section" as="section" color="white" py={12}>
        <Text
          fontSize={"2xl"}
          textAlign={"center"}
          fontWeight={"semibold"}
          mb={5}
          fontFamily={"serif"}
        >
          Your{" "}
          <HeadlineHighlight>
            {" "}
            Astrological <br /> Self-Discovery Mentorship <br /> Program{" "}
          </HeadlineHighlight>{" "}
          Is Ready!
        </Text>

        <Flex direction={"column"} bg="white" color="black" p={6} borderRadius={"lg"}>
          <Text fontSize={"xl"} fontWeight={"semibold"}>
            According to your answers, you should feel the first positive change in your{" "}
            <Span fontWeight={"bold"} color="green.500">
              Career
            </Span>{" "}
            within{" "}
            <Span fontWeight={"bold"} color="green.500">
              1 Week
            </Span>
          </Text>
          <StaticImage alt="" src="../../images/method_benefits.png" />
        </Flex>

        {/* <CTALinkToPricing
          backgroundColor="green.700"
          _hover={{
            backgroundColor: "green.800",
          }}
          boxShadow={`inset 0 0 0 3px ${theme.colors.green["500"]}`}
          color="white"
        /> */}
      </Box>

      <Box>
        <Headline>
          What You Get With Your{" "}
          <HeadlineHighlight> Astrological Self-Discovery Mentorship Program:</HeadlineHighlight>
        </Headline>

        <Flex flexDirection={"column"} alignItems={"center"} px={3} my={8}>
          <Features />
        </Flex>

        <StaticImage alt="" src="../../images/package3.png" />

        <PricingSection my={8} />
      </Box>
    </>
  );
}

function Features() {
  return (
    <Stack alignItems={"start"} spacing={2} color="white" fontSize={"md"} fontWeight={"bold"}>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Astrological Profile Analysis
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Everyday personalised horoscopes
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Everyday positivity mantras
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        24/7 access to a personal astrologer
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Career Guidance
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Relationship Analysis and Advice
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Personal growth plan
      </Flex>

      <Text
        mt={4}
        color="purple.300"
        fontWeight={"bold"}
        textAlign={"center"}
        alignSelf={"stretch"}
        fontSize={"xl"}
      >
        + FREE now for a limited time
      </Text>

      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"purple.300"} boxSize="20px" mr={1} />
        Printable PDF Birth Chart Reading (worth $149)
      </Flex>
    </Stack>
  );
}
