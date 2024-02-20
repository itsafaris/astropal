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
      gap={2}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
      borderRadius={"lg"}
      width={100}
      {...rest}
    >
      <Flex height={90} width={90} position={"relative"} mx="auto" my={-2}>
        <Box transform={"scale(0.35)"} position={"absolute"} left={"-87%"} top={"-88%"}>
          <NatalChart
            date={quizState.yourBirthDate}
            time={quizState.yourBirthTime}
            location={quizState.yourBirthLocation}
            size={250}
          />
        </Box>
      </Flex>

      <Divider />

      <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1} spacing={1}>
        <Text fontSize={"12px"}>{toTitleCase(quizState.yourZodiac.name)}</Text>
        <Text fontSize={"7px"} textTransform={"uppercase"}>
          {getReadableDate(quizState.yourBirthDate)}
          {", "} {getReadableTime(quizState.yourBirthTime)}
        </Text>
        <Text fontSize={"7px"}>{quizState.yourBirthLocation.formattedText}</Text>
      </Stack>
    </Flex>
  );
}

function Divider() {
  return <Box height={"1px"} width={"90%"} mx="auto" backgroundColor={"gray.200"} />;
}
