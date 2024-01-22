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
      pb={0}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
      borderTopRadius={"xl"}
    >
      <Flex
        flexDirection={"column"}
        borderTopRadius={"lg"}
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

        <Text height={110} overflow={"hidden"} color="black">
          Your astrological profile is a cosmic snapshot of the positions of celestial bodies at the
          moment of your birth, unveiling the unique energies that shape your personality and life
          path. The sun sign represents your core identity, the moon reflects your emotional
          instincts, and the rising sign signifies your outward demeanor.
        </Text>

        <Box
          width={"full"}
          height={110}
          bgGradient="linear(to-t, bg.50 15%, transparent)"
          position={"absolute"}
          bottom={0}
          left={0}
          zIndex={1}
        />

        <Box
          position={"absolute"}
          height={100}
          width={100}
          borderRadius={"50%"}
          top={100}
          left="50%"
          transform={"translate(-50%, -50%)"}
          boxShadow={`0px 0px 100px 80px #89d1ff45`}
          zIndex={-1}
        />
      </Flex>
    </Flex>
  );
}
