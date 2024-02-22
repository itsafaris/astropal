import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { Flex } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span } from "../components";
import { AstrologicalProfile } from "@components/AstrologicalProfile";
import { getPersonalInfoFromState } from "@utils/state";

export function NatalChartSlide() {
  const quiz = useQuiz();

  return (
    <Slide id="natal-chart" type="filler">
      {({ quizState }) => {
        const info = getPersonalInfoFromState(quizState);

        return (
          <Flex flexDirection={"column"} position={"relative"} width={"full"}>
            <SlideHeading>
              Your{" "}
              <Span>Natal Chart is a unique cosmic identity that stores your life's story. </Span>{" "}
              Before we go, scroll down to see it all
            </SlideHeading>

            <AstrologicalProfile quizState={info} />

            <NextButton
              position={"fixed"}
              maxWidth={"300px"}
              bottom={0}
              left={"50%"}
              transform={"translateX(-50%)"}
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
