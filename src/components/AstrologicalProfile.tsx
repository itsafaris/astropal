import React, { createElement } from "react";
import { Box, Flex, Stack, Text, TextProps, useTheme } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";
import { getZodiacSign } from "@services/zodiacService";

import { ChartPosition, NatalChart } from "./NatalChart";
import { getReadableDate, getReadableTime } from "@utils/dates";
import { toTitleCase } from "@utils/string";

export function AstrologicalProfile({
  quizState,
  interpretation,
}: {
  quizState?: QuizStateParsed;
  interpretation: string;
}) {
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
      mb={"100px"}
    >
      <Flex
        flexDirection={"column"}
        borderRadius={"lg"}
        border={`1px solid ${theme.colors.gray[400]}`}
        px={5}
        py={7}
        gap={7}
      >
        <Stack spacing={4}>
          <Flex
            padding="30px"
            borderRadius="50%"
            height={"170px"}
            width={"170px"}
            backgroundColor="gray.100"
            justifyContent={"center"}
            alignItems={"center"}
            mx="auto"
          >
            {createElement(state.yourZodiac.svgComponent, {
              height: 100,
              width: 100,
              stroke: "black",
              fill: "white",
              strokeWidth: 2,
            })}
          </Flex>

          <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1}>
            <Text fontSize={"4xl"}>{toTitleCase(state.yourZodiac.name)}</Text>
            <Text fontSize={"md"} textTransform={"uppercase"}>
              {getReadableDate(state.yourBirthDate)}
              {", "} {getReadableTime(state.yourBirthTime)}
            </Text>
            <Text fontSize={"md"}>{state.yourBirthLocation.formattedText}</Text>
          </Stack>
        </Stack>

        <Divider />

        <Stack spacing={5}>
          <Title>Your personality</Title>
          <Text>{interpretation}</Text>
        </Stack>

        <Divider />

        <Stack spacing={5}>
          <Title>Birth chart</Title>
          <Box mx="auto" my={-5}>
            <NatalChart
              date={state.yourBirthDate}
              time={state.yourBirthTime}
              location={state.yourBirthLocation}
              size={240}
            />
          </Box>
        </Stack>

        <Divider />

        <Stack spacing={5}>
          <Title lineHeight={1.3}>
            Positions of celestial <br /> bodies
          </Title>

          <Flex flexDirection={"column"} alignItems={"center"}>
            <Box>
              {state.horoscope.CelestialBodies.all.map((it: any) => {
                const pos = it.ChartPosition as ChartPosition;
                const relPos = pos.Ecliptic.ArcDegreesFormatted30;
                const [degrees] = relPos.split(" ");
                return (
                  <Text key={it.key}>
                    <Text as="span" fontWeight={"bold"}>
                      {it.label}
                    </Text>{" "}
                    at {degrees} in {it.Sign.label}
                  </Text>
                );
              })}
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}

function Divider() {
  return <Box height={"1px"} width={"80px"} mx="auto" backgroundColor={"gray.300"} />;
}

function Title(props: TextProps) {
  return (
    <Text
      textAlign={"center"}
      fontStyle="italic"
      fontSize={"2xl"}
      fontWeight={"bold"}
      lineHeight={1}
      {...props}
    />
  );
}
