import React, { createElement } from "react";
import { Box, Flex, Grid, Stack, Text, TextProps } from "@chakra-ui/react";
import { QuizStateParsed } from "@utils/state";
import { getZodiacSign } from "@services/zodiacService";

import { ChartPosition, NatalChart } from "./NatalChart";
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
      px={5}
      py={7}
      gap={7}
      position={"relative"}
      fontStyle="italic"
      fontFamily={"serif"}
      color="black"
      borderRadius={"xl"}
      mb={"100px"}
    >
      <Stack spacing={5}>
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

      <Grid gridTemplateColumns="auto 1fr auto" alignItems={"center"} gap={1}>
        <Flex
          padding={4}
          borderRadius="50%"
          height={"70px"}
          width={"70px"}
          backgroundColor="gray.100"
          justifyContent={"center"}
          alignItems={"center"}
        >
          {createElement(state.yourZodiac.svgComponent, {
            stroke: "black",
            fill: "white",
            strokeWidth: 3,
          })}
        </Flex>

        <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1}>
          <Text fontSize={"2xl"}>{toTitleCase(state.yourZodiac.name)}</Text>
          <Text fontSize={"xs"} textTransform={"uppercase"}>
            {getReadableDate(state.yourBirthDate)}
            {", "} {getReadableTime(state.yourBirthTime)}
          </Text>
          <Text fontSize={"xs"}>{state.yourBirthLocation.formattedText}</Text>
        </Stack>

        <Flex
          padding={4}
          borderRadius="50%"
          height={"70px"}
          width={"70px"}
          backgroundColor="gray.100"
          justifyContent={"center"}
          alignItems={"center"}
          transform={"rotateY(180deg)"}
        >
          {createElement(state.yourZodiac.svgComponent, {
            stroke: "black",
            fill: "white",
            strokeWidth: 3,
          })}
        </Flex>
      </Grid>

      <Grid gridTemplateColumns={"1fr 1fr"} gap={2}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Box>
            {state.horoscope.CelestialBodies.all.map((it: any, idx: number) => {
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
            {state.horoscope.CelestialBodies.all.map((it: any, idx: number) => {
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

      <Divider />

      <Stack spacing={5}>
        <Title fontSize={"xl"}>Your personality</Title>
        <Text>{interpretation.about}</Text>
      </Stack>

      <Divider />

      <Stack spacing={5}>
        <Title fontSize={"xl"}>Your strenghts</Title>
        <Stack spacing={0} alignItems={"center"}>
          {interpretation.strengths.map((it) => {
            return <ListItem key={it}>{toTitleCase(it)}</ListItem>;
          })}
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={5}>
        <Title fontSize={"xl"}>Your weaknesses</Title>
        <Stack spacing={0} alignItems={"center"}>
          {interpretation.weaknesses.map((it) => {
            return <ListItem key={it}>{toTitleCase(it)}</ListItem>;
          })}
        </Stack>
      </Stack>
    </Flex>
  );
}

function Divider() {
  return <Box height={"1px"} width={"90%"} mx="auto" backgroundColor={"gray.200"} />;
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

function ListItem({ children, ...rest }: TextProps) {
  return (
    <Flex flexDirection={"row"} alignItems={"center"} gap={2}>
      <Box height={"4px"} width={"4px"} borderRadius={"50%"} backgroundColor={"black"} />
      <Text {...rest}>{children}</Text>
    </Flex>
  );
}
