import { Text, Stack, Flex, Box } from "@chakra-ui/react";

import { QuizStateParsed } from "@utils/state";
import { AstrologicalProfile } from "./AstrologicalProfile";
import { StaticImage } from "gatsby-plugin-image";
import { Span } from "@components/quizpage/components";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { Rating } from "@components/rating";
import { getThemeByID } from "@utils/astrologyThemes";

export function PersonalizationSection({ state }: { state: QuizStateParsed }) {
  const { struggleAreas } = state;
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
        overflow={"hidden"}
      >
        <AstrologicalProfile
          quizState={state}
          interpretation={{ about: "", strengths: [], weaknesses: [] }}
        />
      </Flex>

      <Text textAlign={"center"} fontSize={"xl"}>
        Based on our estimates, you will feel <Span color="green.300">💚 more clarity</Span> in
        these areas using our isnights
      </Text>

      <Flex direction={"column"} alignItems={"center"}>
        <Span>After first 2 weeks</Span>
        <ArrowDownIcon mx="auto" fontSize={52} />
      </Flex>

      <Box w={"300px"} mx="auto">
        {struggleAreas.map((s) => {
          const theme = getThemeByID(s);
          if (!theme) {
            return null;
          }
          return (
            <Box my={2}>
              <Text>
                {theme.title} <Span color="green.400">(+34%)</Span>{" "}
              </Text>
              <Rating total={10} value={7} lowValue={3} colorScheme="green" />
            </Box>
          );
        })}
      </Box>
    </Stack>
  );
}
