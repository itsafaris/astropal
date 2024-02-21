import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { Text } from "@chakra-ui/react";

import { SlideHeading, NextButton } from "../components";

export function YourBirthTimeSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      <SlideHeading text="What is the time you were born?" />
      <Text fontSize={40} textAlign={"center"} mt={-6}>
        🕰️
      </Text>
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
