import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { Box } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { SlideHeading, NextButton, SpanJust, Span } from "../components";

import { AstrologicalProfile } from "../../AstrologicalProfile";

export function Filler_NatalChartPreviewSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="natal-chart-preview" type="filler">
      {({ quizState }) => {
        return (
          <Box>
            <SlideHeading
              text={
                <SpanJust>
                  This is your Birth Chart! <Span color="green.600">99%</Span> of your{" "}
                  <Span>Self-Discovery Guide</Span> will be based on it.
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
