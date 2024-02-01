import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

export function EmailSlide() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <SlideHeading
        text={`Your Self-Discovery guide is ready! Let us know where we should be sending it ✉️`}
      />

      <Selector />

      <Caption mb={5}>
        We'll only use your email to send you the guide. It's all about keeping it simple and
        friendly ❣️
      </Caption>

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
