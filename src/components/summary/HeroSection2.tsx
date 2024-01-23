import { Box, Text, Heading, Flex, Grid, Container } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";

import { HarmonyChart, COLORS } from "./HarmonyChart/HarmonyChart";

import { CTALinkToPricing } from "./components";
import { AstrologicalProfile } from "../AstrologicalProfile";

export function HeroSection2({ quizState }: { quizState?: QuizStateParsed }) {
  return (
    <Box py={12} id="astrological-profile-section" bgGradient="linear(to-t, #170d28, bg.50)">
      <Container>
        <Heading textAlign={"center"} fontWeight={"bold"} mx={8} fontSize={"3xl"} color="white">
          Your Astrological Profile Is Ready
        </Heading>

        <Heading
          px={4}
          py={4}
          fontWeight={"semibold"}
          fontSize={{ base: "xl" }}
          color="brand.700"
          textAlign={"center"}
        >
          On average,{" "}
          <Text as="span" color="green.400">
            93%
          </Text>{" "}
          of our users report feeling less self-doubt and greater clarity in their lives within just{" "}
          <Text as="span" color="green.400">
            14 days
          </Text>{" "}
          of consulting personalized astrologer.
        </Heading>

        <Flex flexDirection={"column"} gap={3} borderRadius={"xl"}>
          <Flex width={"full"} height={500} justifyContent={"center"} alignItems={"center"} p={4}>
            <HarmonyChart
              size={300}
              items={[
                {
                  id: "a",
                  title: "Personal growth",
                  value: 1,
                },
                {
                  id: "b",
                  title: "Career",
                  value: 5,
                },
                {
                  id: "c",
                  title: "Timing",
                  value: 3,
                },
                {
                  id: "d",
                  title: "Emotional well-being",
                  value: 2,
                },
                {
                  id: "e",
                  title: "Relationship",
                  value: 3,
                },
                {
                  id: "f",
                  title: "Something",
                  value: 3,
                },
              ]}
            />
          </Flex>

          <Grid
            mx="auto"
            my={3}
            alignItems={"center"}
            gap={2}
            gridTemplateColumns={"auto 1fr auto"}
            maxWidth={300}
            width={"100%"}
          >
            <Text fontWeight={"bold"} color="whiteAlpha.700">
              Low
            </Text>
            <Box
              height={"10px"}
              width={"full"}
              borderRadius={6}
              bgGradient={`linear(to-r, ${COLORS[0]}, ${COLORS[COLORS.length - 1]})`}
            />
            <Text fontWeight={"bold"} color="whiteAlpha.700">
              High
            </Text>
          </Grid>

          <AstrologicalProfile quizState={quizState} />
        </Flex>

        <Flex flexDirection={"row"} justifyContent={"center"}>
          <CTALinkToPricing />
        </Flex>
      </Container>
    </Box>
  );
}
