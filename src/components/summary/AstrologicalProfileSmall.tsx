import React from "react";
import { Box, Flex, FlexProps, Stack, Text } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";

import { NatalChart } from "../NatalChart";
import { getReadableDate, getReadableTime } from "@utils/dates";
import { toTitleCase } from "@utils/string";

export interface Interpretation {
  about: string;
  strengths: string[];
  weaknesses: string[];
}

export function AstrologicalProfileSmall({
  quizState,
  ...rest
}: { quizState?: QuizStateParsed } & FlexProps) {
  if (!quizState) {
    return null;
  }

  return (
    <Flex
      flexDirection={"column"}
      backgroundColor={"white"}
      px={1}
      py={3}
      pb={5}
      gap={2}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
      borderRadius={"lg"}
      {...rest}
    >
      <NatalChart
        date={quizState.yourBirthDate}
        time={quizState.yourBirthTime}
        location={quizState.yourBirthLocation}
        size={220}
      />

      <Divider />

      <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1} spacing={2}>
        <Text fontSize={"3xl"}>{toTitleCase(quizState.yourZodiac.name)}</Text>
        <Text fontSize={"md"} textTransform={"uppercase"}>
          {getReadableDate(quizState.yourBirthDate)}
          {", "} {getReadableTime(quizState.yourBirthTime)}
        </Text>
        <Text fontSize={"md"}>{quizState.yourBirthLocation.formattedText}</Text>
      </Stack>
    </Flex>
  );
}

function Divider() {
  return <Box height={"1px"} width={"90%"} mx="auto" backgroundColor={"gray.200"} />;
}
