import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { Box } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { SlideHeading, NextButton, SpanJust, Span } from "../components";

import { AstrologicalProfile } from "../../AstrologicalProfile";

export function NatalChartPreviewSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="natal-chart-preview" type="filler">
      {({ quizState }) => {
        return (
          <Box textColor={"white"}>
            <SlideHeading
              text={
                <SpanJust>
                  Here is your <Span>Birth Chart</Span>. It contains a snapshot of the sky data at
                  the time you were born
                </SpanJust>
              }
            />

            <AstrologicalProfile quizState={getPersonalInfoFromState(quizState)} />

            <NextButton mt={6} mb={3} onClick={() => submitQuestion()}>
              Continue
            </NextButton>
          </Box>
        );
      }}
    </Slide>
  );
}
