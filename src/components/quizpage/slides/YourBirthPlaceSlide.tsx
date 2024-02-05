import React from "react";
import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function YourBirthPlaceSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <SlideHeading text="What city were you born in?" />

      <Callout>💡 If you're unsure of the exact location, enter a nearby major city.</Callout>
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
