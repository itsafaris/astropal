import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function AsnwerLongevity() {
  return (
    <Slide
      id="answer-longevity"
      type="single"
      variant="list"
      options={[
        { text: "Shorter and to-the-point", icon: "💬" },
        { text: "Balanced", icon: "👌" },
        { text: "Longer and detailed", icon: "📝" },
      ]}
    >
      <SlideHeading text="How would you like your astrologer to respond?" />
      <Selector />
    </Slide>
  );
}
