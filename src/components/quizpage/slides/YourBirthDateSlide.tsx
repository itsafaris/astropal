import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton, SpanJust } from "../components";

export function YourBirthDateSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-date" type="date">
      <SlideHeading text={<SpanJust>What is the date you were born?</SpanJust>} />
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
