import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, Span } from "../components";

export function AreasOfInterestSlide() {
  return (
    <Slide
      id="areas-of-interest"
      type="multi"
      variant="list"
      label="Choose one or more"
      options={[
        { text: "Love & Relationships", icon: "💞", value: "relationships" },
        { text: "Career & Education", icon: "💼", value: "career" },
        { text: "Growth & Self-Discovery", icon: "🧘", value: "personality" },
        { text: "Adventure & Exploration", icon: "🏔️", value: "exploration" },
      ]}
    >
      <SlideHeading>
        <Span>Choose your interest areas.</Span> You will receive increased attention from your
        personal astrologer on these areas.
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
