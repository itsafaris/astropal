import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, Span } from "../components";

export function YourBirthDateSlide() {
  return (
    <Slide id="your-birth-date" type="date">
      <SlideHeading>
        🗓️ What is the <Span>date</Span> you were born?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}
