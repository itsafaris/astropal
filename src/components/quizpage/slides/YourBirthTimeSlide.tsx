import { Selector, Slide } from "@martynasj/quiz-lib";
import { Text } from "@chakra-ui/react";

import { SlideHeading, Span } from "../components";

export function YourBirthTimeSlide() {
  return (
    <Slide id="your-birth-time" type="time">
      <SlideHeading>
        What is the <Span>time</Span> you were born?
      </SlideHeading>
      <Text textAlign={"center"} fontSize={64} mt={-8}>
        🕰️
      </Text>
      <Selector />
    </Slide>
  );
}
