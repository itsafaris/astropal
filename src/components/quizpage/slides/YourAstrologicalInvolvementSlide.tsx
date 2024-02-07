import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function YourAstrologicalInvolvementSlide() {
  return (
    <Slide
      id="your-astrological-involvement"
      type="single"
      variant="list"
      options={[
        {
          text: "I'm new to astrology",
          icon: "🌑",
        },
        {
          text: "I have a casual interest",
          icon: "🌒",
        },
        {
          text: "I actively practice and study",
          icon: "🌔",
        },
        {
          text: "Deeply committed",
          icon: "🌕",
        },
      ]}
    >
      <SlideHeading text="To what degree are you engaged with astrological practices and concepts?" />
      <Selector />
    </Slide>
  );
}
