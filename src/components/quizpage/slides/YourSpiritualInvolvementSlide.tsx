import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function YourSpiritualInvolvementSlide() {
  return (
    <Slide
      id="your-spiritual-involvement"
      type="single"
      variant="list"
      options={[
        {
          text: "I'm new to spirituality",
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
      <SlideHeading text="To what degree are you engaged with spiritual practices and concepts?" />
      <Selector />
    </Slide>
  );
}
