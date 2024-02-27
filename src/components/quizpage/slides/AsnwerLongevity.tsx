import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, Span } from "../components";

export function AsnwerLongevity() {
  return (
    <Slide
      id="answer-longevity"
      type="single"
      variant="list"
      options={[
        { text: "Short and to-the-point", icon: "💬", value: "short" },
        { text: "Balanced", icon: "👌", value: "balanced" },
        { text: "Long and detailed", icon: "📝", value: "detailed" },
      ]}
    >
      <SlideHeading>
        How would you like your <Span>Personalized Horoscopes</Span> to be present?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}
