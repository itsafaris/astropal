import React from "react";
import { Box, Flex, Grid, Stack, Text } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";

import { ChartPosition, NatalChart } from "../NatalChart";
import { getReadableDate, getReadableTime } from "@utils/dates";
import { toTitleCase } from "@utils/string";

export interface Interpretation {
  about: string;
  strengths: string[];
  weaknesses: string[];
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

  return (
    <Flex
      flexDirection={"column"}
      backgroundColor={"white"}
      px={5}
      py={7}
      gap={5}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
      borderRadius={"xl"}
      mb={"100px"}
    >
      <Box mx="auto" my={-5}>
        <NatalChart
          date={quizState.yourBirthDate}
          time={quizState.yourBirthTime}
          location={quizState.yourBirthLocation}
          size={240}
        />
      </Box>

      <Divider />

      <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1} spacing={3}>
        <Text fontSize={"4xl"}>{toTitleCase(quizState.yourZodiac.name)}</Text>
        <Text fontSize={"lg"} textTransform={"uppercase"}>
          {getReadableDate(quizState.yourBirthDate)}
          {", "} {getReadableTime(quizState.yourBirthTime)}
        </Text>
        <Text fontSize={"lg"}>{quizState.yourBirthLocation.formattedText}</Text>
      </Stack>

      <Grid gridTemplateColumns={"1fr 1fr"} gap={2}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Box>
            {quizState.horoscope._celestialBodies.all.map((it: any, idx: number) => {
              if (idx <= 5) {
                const pos = it.ChartPosition as ChartPosition;
                const relPos = pos.Ecliptic.ArcDegreesFormatted30;
                const [degrees] = relPos.split(" ");
                return (
                  <Text key={it.key} fontSize={"xs"}>
                    <Text as="span" fontWeight={"bold"}>
                      {it.label}
                    </Text>{" "}
                    at {degrees} in {it.Sign.label}
                  </Text>
                );
              }
            })}
          </Box>
        </Flex>

        <Flex flexDirection={"column"} alignItems={"center"}>
          <Box>
            {quizState.horoscope._celestialBodies.all.map((it: any, idx: number) => {
              if (idx > 5) {
                const pos = it.ChartPosition as ChartPosition;
                const relPos = pos.Ecliptic.ArcDegreesFormatted30;
                const [degrees] = relPos.split(" ");
                return (
                  <Text key={it.key} fontSize={"xs"}>
                    <Text as="span" fontWeight={"bold"}>
                      {it.label}
                    </Text>{" "}
                    at {degrees} in {it.Sign.label}
                  </Text>
                );
              }
            })}
          </Box>
        </Flex>
      </Grid>
    </Flex>
  );
}

function Divider() {
  return <Box height={"1px"} width={"90%"} mx="auto" backgroundColor={"gray.200"} />;
}
