import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, Span } from "../components";

export function AsnwerLongevity() {
  return (
    <Slide
      id="answer-longevity"
      type="single"
      variant="list"
      options={[
        { text: "Short and to-the-point", icon: "💬" },
        { text: "Balanced", icon: "👌" },
        { text: "Long and detailed", icon: "📝" },
      ]}
    >
      <SlideHeading>
        How would you like your <Span>Personalized Horoscopes</Span> to be present?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}
