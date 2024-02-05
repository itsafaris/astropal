import React from "react";
import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function YourBirthTimeSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      <SlideHeading text="What is the time you were born?" />

      <Callout>💡 If you're unsure about the time, pick the closest hour.</Callout>
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
