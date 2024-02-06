import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, Span } from "../components";

export function YourBirthTimeSlide() {
  return (
    <Slide id="your-birth-time" type="time" optional>
      <SlideHeading>
        🕰️ What is the <Span>time</Span> you were born?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}
