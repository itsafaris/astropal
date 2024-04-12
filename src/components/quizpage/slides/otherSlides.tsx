import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, Span } from "../components";

export function FocusThemeSlide() {
  return (
    <Slide
      id="focus-theme"
      type="single"
      variant="list"
      options={[
        { text: "Love & Relationships", icon: "💞", value: "relationships" },
        { text: "Career", icon: "💼", value: "career" },
        { text: "Emotional Growth", icon: "🍀", value: "emotions" },
        { text: "Self understanding", icon: "🧘", value: "personality" },
      ]}
    >
      <SlideHeading>
        <Span>Choose your focus area.</Span> You will receive increased attention from your personal
        astrologer on your specified area.
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function DedicationTime() {
  return (
    <Slide
      id="dedication-time"
      type="single"
      variant="list"
      options={[
        { text: "Up to 5 minutes", icon: "◔", value: "quick" },
        { text: "Up to 20 minutes", icon: "◕", value: "regular" },
        { text: "Up to 1 hour", icon: "⏺︎", value: "dedicated" },
      ]}
    >
      <SlideHeading>
        How much time per day do you want to dedicate to self-discovery and reflection?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}
