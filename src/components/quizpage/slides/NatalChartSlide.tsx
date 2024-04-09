import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { Card, Flex, Stack, Tag, TagLabel, TagLeftIcon, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span } from "../components";

import { StaticImage } from "gatsby-plugin-image";
import { getPersonalInfoFromState } from "@utils/state";
import { ZodiacSignDataType } from "@services/zodiacService";
import { toTitleCase } from "@utils/string";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { DateValue, Time, getReadableDate, getReadableTime } from "@utils/dates";

export function NatalChartSlide() {
  const quiz = useQuiz();

  return (
    <Slide id="natal-chart" type="filler">
      {({ quizState }) => {
        const p = getPersonalInfoFromState(quizState);

        return (
          <Flex flexDirection={"column"} position={"relative"} width={"full"}>
            <SlideHeading>
              <Span>Here's a sneak peek into your cosmic identity</Span>{" "}
            </SlideHeading>

            <PersonalityReading
              state={p.yourZodiac}
              birthDate={p.yourBirthDate}
              birthTime={p.yourBirthTime}
              birthLocFormatted={p.yourBirthLocation.formattedText}
            />

            <NextButton
              onClick={() => {
                quiz.submitQuestion();
              }}
              my={8}
            >
              Continue
            </NextButton>
          </Flex>
        );
      }}
    </Slide>
  );
}

function PersonalityReading({
  state,
  birthDate,
  birthTime,
  birthLocFormatted,
}: {
  state: ZodiacSignDataType;
  birthDate: DateValue;
  birthTime: Time;
  birthLocFormatted: string;
}) {
  return (
    <Card bg="bg.50" p={4} boxShadow={`0 0 100px 20px #ff752b, 0 0 5px 5px #cf6d093b`}>
      <Stack mb={4} textAlign={"center"} color="black" fontWeight={"bold"} lineHeight={1}>
        <Text fontSize={"3xl"}>{toTitleCase(state.name)}</Text>
        <Text fontSize={"sm"} textTransform={"uppercase"}>
          {getReadableDate(birthDate)}
          {", "} {getReadableTime(birthTime)}
        </Text>
        <Text fontSize={"sm"}>{birthLocFormatted}</Text>
      </Stack>

      <StaticImage
        alt="A graphical drawing of a personalised natal chart"
        src="../../../images/cosmic_identity.png"
      />

      <Stack my={4}>
        <Text fontWeight={"bold"}>Your Core Personality</Text>
        <Flex fontSize={"sm"}>{state.personality}</Flex>
        <Text fontWeight={"bold"}>Strengths</Text>
        <Flex gap={2} flexWrap={"wrap"}>
          {state.strengths.map((str) => {
            return (
              <Tag size={"sm"} key={str} variant="solid" colorScheme="green">
                <TagLeftIcon boxSize="12px" as={AddIcon} />
                <TagLabel>{str}</TagLabel>
              </Tag>
            );
          })}
        </Flex>
        <Text fontWeight={"bold"}>Weaknesses</Text>
        <Flex gap={2} flexWrap={"wrap"}>
          {state.weaknesses.map((str) => {
            return (
              <Tag size={"sm"} key={str} variant="solid" colorScheme="red">
                <TagLeftIcon boxSize="12px" as={MinusIcon} />
                <TagLabel>{str}</TagLabel>
              </Tag>
            );
          })}
        </Flex>
      </Stack>
    </Card>
  );
}
