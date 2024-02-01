import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton, SpanJust, Span } from "../components";

export function IntroSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro" type="filler">
      <SlideHeading
        text={
          <SpanJust>
            Hey there! We have helped more than <Span>31,000 souls</Span> explore and understand
            themselves better, so we can help you too 👋
          </SpanJust>
        }
      />

      <NextButton
        mt={8}
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}
