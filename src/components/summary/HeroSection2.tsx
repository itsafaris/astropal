import { Box, Text, Stack, Flex, Grid } from "@chakra-ui/react";
import React from "react";
import { QuizStateParsed } from "@utils/state";
import { CheckIcon } from "@chakra-ui/icons";
import { InvertedHighlight } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { AstrologicalProfileSmall } from "./AstrologicalProfileSmall";
import { Span } from "@components/quizpage/components";
import { Headline } from "./components";

export function HeroSection({ state }: { state: QuizStateParsed }) {
  return (
    <>
      <Box id="hero-section" as="section" color="text.main" pt={12} pb={12}>
        <Headline fontSize={"3xl"} mb={6}>
          Your <InvertedHighlight>Astrological Self-Discovery Mentorship Program</InvertedHighlight>{" "}
          Is Ready. You Will Start Receiving Personalized Horoscopes Shortly!
        </Headline>

        <Flex
          direction={"column"}
          bg="white"
          color="black"
          p={6}
          borderRadius={"lg"}
          gap={8}
          maxW={400}
          mx="auto"
        >
          <Text fontSize={"xl"}>
            According to your answers, you should feel the first positive change in your{" "}
            <Span fontWeight={"black"} color="green.400">
              {state.focusArea}
            </Span>{" "}
            within{" "}
            <Span fontWeight={"black"} color="green.400">
              1 Week
            </Span>
          </Text>

          <StaticImage alt="" src="../../images/hero-diagram.png" />
        </Flex>
      </Box>

      <BenefitsSection state={state} />
    </>
  );
}

export function BenefitsSection({ state }: { state?: QuizStateParsed }) {
  return (
    <Box>
      <Headline fontSize={"3xl"} mt={5} mb={10}>
        Get Instant Access To All The Benefits Of{" "}
        <InvertedHighlight>Your Program</InvertedHighlight> From Your Phone
      </Headline>

      <Flex flexDirection={"column"} alignItems={"center"} px={3} my={8}>
        <Features />
      </Flex>

      <Grid gridTemplateColumns={"repeat(2, 1fr)"} maxWidth={400} mx={"auto"}>
        <Box position={"relative"}>
          <StaticImage
            alt=""
            src="../../images/hero-books.png"
            style={{
              position: "absolute",
              width: "140%",
              right: "-40%",
              top: "5%",
            }}
          />

          <Box
            position={"absolute"}
            bottom={"-70px"}
            right={"-80px"}
            transform={{
              base: "scale(0.5)",
              sm: "scale(0.55)",
            }}
          >
            {state && <AstrologicalProfileSmall quizState={state} />}
          </Box>
        </Box>

        <Box alignSelf={"center"}>
          <StaticImage alt="" src="../../images/hero-phone.png" />
        </Box>
      </Grid>

      <Flex
        flexDirection={"row"}
        width={"100%"}
        gap={5}
        alignItems={"center"}
        alignSelf={"center"}
        maxWidth={400}
        mx="auto"
        mt={10}
      >
        <StaticImage
          alt=""
          src="../../images/user9.png"
          style={{ width: 100, height: 100, borderRadius: "50%", flexShrink: 0 }}
        />

        <Flex flexDirection={"column"} gap={1}>
          <Text fontSize={"md"} lineHeight={1.3}>
            "This unique program helped me to unveil my authentic essence"
          </Text>

          <Text textAlign={"right"} fontSize={"md"} width={"100%"}>
            - Linda Miller
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

function Features() {
  return (
    <Stack alignItems={"start"} spacing={2} color="text.main" fontSize={"md"} fontWeight={"bold"}>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Continuous Learning and Guidance
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Astrological Profile Analysis
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Everyday Personalised Horoscopes
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Everyday Positivity Mantras
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        24/7 Access To a Personal Astrologer
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Career Opportunities
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Relationship Analysis and Advice
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"#80db4b"} boxSize="20px" mr={1} />
        Personal Growth Plan
      </Flex>

      <Text
        mt={4}
        color="brand.600"
        fontWeight={"bold"}
        textAlign={"center"}
        alignSelf={"stretch"}
        fontSize={"xl"}
      >
        + FREE now for a limited time
      </Text>

      <Flex alignItems={"center"} gap={2}>
        <CheckIcon color={"brand.600"} boxSize="20px" mr={1} />
        Printable PDF Birth Chart Reading (worth $149)
      </Flex>
    </Stack>
  );
}
