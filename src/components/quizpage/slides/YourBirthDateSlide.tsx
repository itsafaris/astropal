import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton, SpanJust, Span } from "../components";

export function YourBirthDateSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-date" type="date">
      <SlideHeading
        text={
          <SpanJust>
            Let's start with your <Span>Birth Chart</Span>. What is the date you were born?
          </SpanJust>
        }
      />
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
