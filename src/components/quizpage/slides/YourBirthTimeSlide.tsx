import React from "react";
import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function YourBirthTimeSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      <SlideHeading text="What is the time you were born?" />

      <Callout emoji="Tip">
        If you don't know the exact time, select just the approximate hour
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
