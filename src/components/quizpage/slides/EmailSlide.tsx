import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

import { Text } from "@chakra-ui/react";

export function EmailSlide() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <SlideHeading>
        Your{" "}
        <Text as="span" color={"brand.600"}>
          Personalized Astrology Insights
        </Text>{" "}
        are ready! Let us know where to send them
      </SlideHeading>

      <Selector />

      <Caption mb={7}>
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
