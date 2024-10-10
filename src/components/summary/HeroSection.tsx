import { Box, Container, Text, Stack, Flex } from "@chakra-ui/react";

import { StaticImage } from "gatsby-plugin-image";
import { ArrowDownIcon } from "@chakra-ui/icons";

import { QuizStateParsed } from "@utils/state";
import { BoltIcon, InfinityIcon, MoonIcon } from "@components/svg/icons";

import { CTALinkToPricing } from "./components";

export function HeroSection({ quizState }: { quizState?: QuizStateParsed }) {
  return (
    <Box id="hero-section" as="section" position={"relative"}>
      <Box
        position={"absolute"}
        height="550px"
        width="100%"
        bottom="0"
        left="0"
        bgGradient="linear(to-t, bg.300, blackAlpha.100)"
      />
      <Box
        position={"absolute"}
        height="60px"
        width="100%"
        bottom="0"
        left="0"
        opacity={0.3}
        bgGradient="linear(to-t, bg.600, blackAlpha.100)"
        zIndex={1}
      />
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"} position={"relative"}>
          <Text
            fontWeight="bold"
            textAlign={"center"}
            width={"full"}
            fontSize={"3xl"}
            color="text.main"
          >
            <Text as="span" color="teal.500">
              {quizState?.firstName}
            </Text>
            , <br /> Your Personal <br /> Astrologer Is Ready
          </Text>

          <Stack my={10} alignItems={"start"} color="brand.700">
            <Text fontWeight={"semibold"}>
              <InfinityIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Ask unlimited questions
            </Text>
            <Text fontWeight={"semibold"}>
              <BoltIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Get Instant answers
            </Text>
            <Text fontWeight={"semibold"}>
              <MoonIcon color="brand.500" height={"24px"} width={"24px"} mr={2} />
              Receive daily horoscopes
            </Text>
          </Stack>

          <CTALinkToPricing />

          <Text
            mt={8}
            mb={2}
            textAlign={"center"}
            width={"full"}
            fontSize={"sm"}
            color={"whiteAlpha.600"}
          >
            Or scroll to find out more
          </Text>
          <ArrowDownIcon mb={6} color="whiteAlpha.600" fontSize={"2xl"} />

          <Box position="relative" overflow={"hidden"}>
            <StaticImage alt="Intuvist UI preview" src="../../images/phone_ui.png" />

            <Box position={"absolute"} top="40%" width="100%" px={16}>
              <Text fontSize={"xl"} textAlign={"center"}>
                Hi,{" "}
                <Text as="span" color="brand.500">
                  {quizState?.firstName}!
                </Text>
              </Text>
              <Text textAlign={"center"}>What would you like to ask?</Text>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
