import React from "react";
import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function YourBirthPlaceSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <SlideHeading text="Where were you born?" />

      <Callout emoji="Tip">
        If you don't know the exact location, enter a major city near your location. You will be
        able to change it later if needed.
      </Callout>
      <Selector />
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}
