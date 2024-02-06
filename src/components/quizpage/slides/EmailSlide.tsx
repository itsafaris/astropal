import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

export function EmailSlide() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <SlideHeading
        text={`Your Personalized Astrology Insights are ready! Let us know where we should be sending them ✉️`}
      />

      <Selector />

      <Caption mb={5}>
        We'll only use your email to send you the insights. It's all about keeping it simple and
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
