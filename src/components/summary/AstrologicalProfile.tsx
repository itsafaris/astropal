import React from "react";
import { Box, Flex, Stack, Tag, Text } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";

import { getReadableDate, getReadableTime } from "@utils/dates";
import { toTitleCase } from "@utils/string";
import { astrologyThemes } from "@utils/astrologyThemes";
import { Rating } from "@components/rating";

export interface Interpretation {
  about: string;
  strengths: string[];
  weaknesses: string[];
}

const majorAreas = [
  { ...astrologyThemes.career, defaultScore: 5 },
  { ...astrologyThemes.relationships, defaultScore: 4 },
  { ...astrologyThemes.selfGrowth, defaultScore: 6 },
  { ...astrologyThemes.wellBeing, defaultScore: 5 },
];

function getColorScheme(rating: number): string {
  if (rating < 4) {
    return "red";
  }
  if (rating < 7) {
    return "orange";
  }
  return "green";
}

export function AstrologicalProfile({
  quizState,
  interpretation,
}: {
  quizState?: QuizStateParsed;
  interpretation: Interpretation;
}) {
  if (!quizState) {
    return null;
  }

  const { struggleAreas } = quizState;

  return (
    <Flex
      flexDirection={"column"}
      backgroundColor={"white"}
      px={5}
      py={7}
      gap={5}
      position={"relative"}
      color="black"
      borderRadius={"xl"}
      minW={"90%"}
    >
      <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1} spacing={3}>
        <Text fontSize={"4xl"} fontStyle="italic" fontFamily={"serif"}>
          {toTitleCase(quizState.yourZodiac.name)}
        </Text>
        <Text fontSize={"md"} textTransform={"uppercase"}>
          {getReadableDate(quizState.yourBirthDate)}
          {", "} {getReadableTime(quizState.yourBirthTime)}
        </Text>
        <Text fontSize={"md"}>{quizState.yourBirthLocation.formattedText}</Text>
      </Stack>

      <Divider />

      <Stack fontStyle={"normal"}>
        {majorAreas.map((area) => {
          const hasSelected = struggleAreas.includes(area.id);
          const score = hasSelected ? 3 : area.defaultScore;
          return (
            <Box key={area.id}>
              <Text fontWeight={"bold"} mb={1}>
                {area.title}
              </Text>
              <Rating value={score} total={10} colorScheme={getColorScheme(score)} />
            </Box>
          );
        })}
      </Stack>

      <Divider />

      <Flex textAlign={"center"} alignItems={"center"} justifyContent={"space-between"}>
        <Text>Personalisation Rate</Text>
        <Text fontSize={"xl"} color={"green.700"} fontWeight={"bold"}>
          93%
        </Text>
      </Flex>

      <Flex textAlign={"center"} alignItems={"center"} justifyContent={"space-between"}>
        <Text>Clarity Growth Score</Text>
        <Tag size={"lg"} colorScheme={"green"} fontWeight={"bold"}>
          Strong
        </Tag>
      </Flex>
    </Flex>
  );
}

function Divider() {
  return <Box height={"1px"} width={"90%"} mx="auto" backgroundColor={"gray.200"} />;
}
