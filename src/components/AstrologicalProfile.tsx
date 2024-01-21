import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";
import { getZodiacSign } from "@services/zodiacService";

import { NatalChart } from "./NatalChart";
import { toTitleCase } from "@utils/string";

export function AstrologicalProfile({ quizState }: { quizState?: QuizStateParsed }) {
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
      px={6}
      py={4}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
    >
      <Box
        position={"absolute"}
        height={100}
        width={100}
        borderRadius={"50%"}
        top={100}
        left="50%"
        transform={"translate(-50%, -50%)"}
        boxShadow={`0px 0px 500px 150px #89d1ff45`}
        zIndex={-1}
      />

      <Flex height={"full"} width={"full"} flexDirection={"column"} alignItems={"flex-start"}>
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          height={"full"}
          width={"full"}
        >
          <NatalChart
            date={state.yourBirthDate}
            time={state.yourBirthTime}
            location={state.yourBirthLocation}
            size={250}
            // onComplete={setData}
          />
        </Flex>
      </Flex>

      <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          Zodiac:
        </Text>

        <Flex flexDirection={"row"} alignItems={"center"} gap={3}>
          {React.createElement(state.yourZodiac.svgComponent, {
            height: 22,
            width: "100%",
            fill: "transparent",
            stroke: "black",
            strokeWidth: 8,
          })}

          <Text fontSize={"2xl"} color="black" fontWeight={"bold"}>
            {toTitleCase(state.yourZodiac.name)}
          </Text>
        </Flex>
      </Flex>

      <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Text>Birth date:</Text>

        <Text color="black" fontWeight={"semibold"}>
          {" "}
          {state.yourBirthDate.day}-{state.yourBirthDate.month}-{state.yourBirthDate.year}
        </Text>
      </Flex>

      <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Text>Birth time:</Text>

        <Text color="black" fontWeight={"semibold"}>
          {state.yourBirthTime.time24.hour}:{state.yourBirthTime.time24.minute}
        </Text>
      </Flex>

      <Flex flexDirection={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Text>Birth location:</Text>

        <Text color="black" textAlign={"right"} fontWeight={"semibold"}>
          {state.yourBirthLocation.formattedText}
        </Text>
      </Flex>

      <Flex mt={3} flexDirection={"column"} alignItems={"flex-start"} gap={1}>
        <Text>Description:</Text>

        <Text color="black">
          Your astrological profile is a cosmic snapshot of the positions of celestial bodies at the
          moment of your birth, unveiling the unique energies that shape your personality and life
          path
        </Text>
      </Flex>

      <Box
        width={"full"}
        height={200}
        bgGradient="linear(to-t, bg.50 0%, transparent)"
        position={"absolute"}
        bottom={0}
        left={0}
        zIndex={1}
      />
    </Flex>
  );
}
