import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { Card, Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span } from "../components";

import { useUserProfileState } from "src/appState";

export function NatalChartSlide() {
  const quiz = useQuiz();
  const [userProfile] = useUserProfileState();

  return (
    <Slide id="natal-chart" type="filler">
      {({ quizState }) => {
        return (
          <Flex flexDirection={"column"} position={"relative"} width={"full"}>
            <SlideHeading>
              <Span>Here's what you are according to your natal chart reading</Span>{" "}
            </SlideHeading>

            {userProfile.result && (
              <NatalChartReading natalChartReading={userProfile.result.natalChartReading} />
            )}

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

function NatalChartReading({ natalChartReading }: { natalChartReading: any }) {
  return (
    <Card bg="bg.50" p={4}>
      <Text fontWeight={"bold"}>Your Core Personality</Text>
      <Flex fontSize={"sm"}>{natalChartReading.core}</Flex>
      <Text fontWeight={"bold"}>Relatioships</Text>
      <Flex fontSize={"sm"}>{natalChartReading.relationships}</Flex>
    </Card>
  );
}
