import React, { ComponentProps, createElement } from "react";
import { Box, Flex, Grid, Stack, Text, TextProps } from "@chakra-ui/react";
import { QuizStateParsed, getZodiacFromState } from "@utils/state";

import { NatalChart } from "./NatalChart";
import { getReadableDate, getReadableTime } from "@utils/dates";
import { toTitleCase } from "@utils/string";

export interface Interpretation {
  about: string;
  strengths: string[];
  weaknesses: string[];
}

export function AstrologicalProfile({ quizState }: { quizState?: QuizStateParsed }) {
  if (!quizState) {
    return null;
  }

  const zodiac = getZodiacFromState(quizState);

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
            date={quizState.yourBirthDate}
            time={quizState.yourBirthTime}
            location={quizState.yourBirthLocation}
            size={240}
          />
        </Box>
      </Stack>

      <Divider />

      <ZodiacTitleHeader quizState={quizState} />

      <Grid gridTemplateColumns={"1fr 1fr"} gap={2}></Grid>

      <Divider />

      <Stack spacing={5}>
        <Title fontSize={"xl"}>Your personality</Title>
        <Text>{zodiac.personality}</Text>
      </Stack>

      <Divider />

      <Stack spacing={5}>
        <Title fontSize={"xl"}>Your strengths</Title>
        <Stack spacing={0} alignItems={"center"}>
          {zodiac.strengths.map((it) => {
            return <ListItem key={it}>{toTitleCase(it)}</ListItem>;
          })}
        </Stack>
      </Stack>

      <Divider />

      <Stack spacing={5}>
        <Title fontSize={"xl"}>Your weaknesses</Title>
        <Stack spacing={0} alignItems={"center"}>
          {zodiac.weaknesses.map((it) => {
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

export function ZodiacTitleHeader({
  quizState,
  ...rest
}: { quizState: QuizStateParsed } & ComponentProps<typeof Grid>) {
  const zodiac = getZodiacFromState(quizState);

  return (
    <Grid gridTemplateColumns="auto 1fr auto" alignItems={"center"} gap={1} {...rest}>
      <Flex
        padding={4}
        borderRadius="50%"
        height={"70px"}
        width={"70px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {createElement(zodiac.svgComponent, {
          stroke: "black",
          fill: "white",
          strokeWidth: 3,
        })}
      </Flex>

      <Stack textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1}>
        <Text fontSize={"2xl"}>{toTitleCase(zodiac.name)}</Text>
        <Text fontSize={"sm"} textTransform={"uppercase"}>
          {getReadableDate(quizState.yourBirthDate)}
          {", "} {getReadableTime(quizState.yourBirthTime)}
        </Text>
        <Text fontSize={"sm"}>{quizState.yourBirthLocation.formattedText}</Text>
      </Stack>

      <Flex
        padding={4}
        borderRadius="50%"
        height={"70px"}
        width={"70px"}
        justifyContent={"center"}
        alignItems={"center"}
        transform={"rotateY(180deg)"}
      >
        {createElement(zodiac.svgComponent, {
          stroke: "black",
          fill: "white",
          strokeWidth: 3,
        })}
      </Flex>
    </Grid>
  );
}
