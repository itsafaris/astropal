import { Text, Stack, Box, Flex } from "@chakra-ui/react";

import { QuizStateParsed } from "@utils/state";
import { AstrologicalProfile } from "./AstrologicalProfile";
import { StaticImage } from "gatsby-plugin-image";

export function PersonalizationSection({ state }: { state: QuizStateParsed }) {
  return (
    <Stack spacing={6} id="product-section" mx="auto" py={10}>
      <Text
        fontWeight="semibold"
        textAlign={"center"}
        width={"full"}
        fontSize={"2xl"}
        color="white"
        px={6}
      >
        Insights Are Tailored Uniquely For You. Using Your Natal Chart
      </Text>

      <StaticImage
        alt=""
        src="../../images/art-8.png"
        style={{ width: 90, opacity: 1, marginLeft: "auto", marginRight: "auto" }}
      />

      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        position={"relative"}
        height={450}
        overflow={"hidden"}
      >
        <AstrologicalProfile
          quizState={state}
          interpretation={{ about: "", strengths: [], weaknesses: [] }}
        />

        <Box
          position={"absolute"}
          zIndex={1}
          bottom={0}
          left={0}
          width={"full"}
          height={"80px"}
          bgGradient="linear(to-t, bg.50, transparent)"
        />
      </Flex>
    </Stack>
  );
}
