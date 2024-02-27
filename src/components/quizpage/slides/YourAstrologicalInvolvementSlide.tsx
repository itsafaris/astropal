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
          value: "beginner",
          text: "I'm new to astrology",
          icon: "🌑",
        },
        {
          value: "casual",
          text: "I have a casual interest",
          icon: "🌒",
        },
        {
          value: "modest",
          text: "I actively practice and study",
          icon: "🌔",
        },
        {
          value: "expert",
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
