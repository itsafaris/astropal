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
          <Box>
            <SlideHeading
              text={
                <SpanJust>
                  Your <Span>Birth Chart</Span> is like a fingerprint. No two are exactly alike.
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
