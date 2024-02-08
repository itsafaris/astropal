import { Box, Container, Text, Stack, Flex } from "@chakra-ui/react";

import { ArrowDownIcon } from "@chakra-ui/icons";

import { QuizStateParsed } from "@utils/state";
import { BoltIcon, InfinityIcon, MoonIcon } from "@components/svg/icons";

import { CTALinkToPricing } from "./components";
import { StaticImage } from "gatsby-plugin-image";

export function HeroSection({ quizState }: { quizState?: QuizStateParsed }) {
  return (
    <Box id="hero-section" as="section">
      <Container>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Text
            fontWeight="bold"
            textAlign={"center"}
            width={"full"}
            fontSize={"3xl"}
            color="white"
          >
            Your Personalized Insight is Ready
          </Text>

          <Flex
            width={"full"}
            p={6}
            borderRadius={"xl"}
            backgroundColor={"white"}
            height={500}
          ></Flex>

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
        </Flex>

        <Stack spacing={10}>
          <Flex flexDirection={"row"} alignItems={"center"} gap={4}>
            <StaticImage
              alt=""
              src="../../images/product/get.png"
              style={{ width: 300, borderRadius: 15 }}
            />

            <Text color="white" fontSize={"xl"} fontWeight={"bold"} maxWidth={"40%"} width={"100%"}>
              Receive <br /> Daily
              <br /> Guidance
            </Text>
          </Flex>

          <Flex flexDirection={"row"} alignItems={"center"} gap={4}>
            <Text
              color="white"
              fontSize={"xl"}
              fontWeight={"bold"}
              maxWidth={"40%"}
              width={"100%"}
              textAlign={"right"}
            >
              Read It <br /> Listen to It
              <br /> Use It
            </Text>

            <StaticImage
              alt=""
              src="../../images/product/read.png"
              style={{ width: 300, borderRadius: 15 }}
            />
          </Flex>

          <Flex flexDirection={"row"} alignItems={"center"} gap={4}>
            <StaticImage
              alt=""
              src="../../images/product/ask.png"
              style={{ width: 300, borderRadius: 15 }}
            />

            <Text color="white" fontSize={"xl"} fontWeight={"bold"} maxWidth={"40%"} width={"100%"}>
              Ask <br /> and Get <br /> Insights <br /> Instantly
            </Text>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}
