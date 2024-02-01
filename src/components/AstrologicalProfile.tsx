import React from "react";
import { Box, Flex, Text, useTheme } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";
import { getZodiacSign } from "@services/zodiacService";

import { NatalChart } from "./NatalChart";
import { getReadableDate, getReadableTime } from "@utils/dates";
import { toTitleCase } from "@utils/string";

export function AstrologicalProfile({ quizState }: { quizState?: QuizStateParsed }) {
  const theme = useTheme();
  const state = React.useMemo(() => {
    const res = quizState;
    if (!res) {
      return;
    }

    res.yourZodiac = getZodiacSign(
      new Date(
        res.yourBirthDate.year,
        res.yourBirthDate.month - 1,
        res.yourBirthDate.day
      ).toISOString()
    );

    return res;
  }, [quizState]);

  if (!state) {
    return null;
  }

  return (
    <Flex
      flexDirection={"column"}
      backgroundColor={"white"}
      p={2}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
      borderRadius={"xl"}
    >
      <Flex
        flexDirection={"column"}
        borderRadius={"lg"}
        border={`1px solid ${theme.colors.bg[700]}`}
        p={3}
      >
        <NatalChart
          date={state.yourBirthDate}
          time={state.yourBirthTime}
          location={state.yourBirthLocation}
          size={250}
        />

        <Box mb={4} textAlign={"center"} color="black" fontWeight={"bold"}>
          <Text fontSize={"3xl"}>{toTitleCase(state.yourZodiac.name)}</Text>
          <Text fontSize={"md"} textTransform={"uppercase"}>
            {getReadableDate(state.yourBirthDate)}
            {", "} {getReadableTime(state.yourBirthTime)}
          </Text>
          <Text fontSize={"md"}>{state.yourBirthLocation.formattedText}</Text>
        </Box>
      </Flex>
    </Flex>
  );
}
