import { Selector, Slide } from "@martynasj/quiz-lib";

import { NextButton, SlideHeading, Span } from "../components";

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
      <NextButton>Continue</NextButton>
    </Slide>
  );
}

export function AstrologicalKnowledgeLevelSlide() {
  return (
    <Slide
      id="astro-knowledge-level"
      type="single"
      variant="list"
      label="Select one"
      options={[
        { text: "I'm new to astrology", icon: "🌙", value: "beginner" },
        { text: "I know a few things", icon: "🌗", value: "intermediate" },
        { text: "I'm an expert", icon: "🌕", value: "advanced" },
      ]}
    >
      <SlideHeading>
        <Span>What's your level of astrological knowledge?</Span>
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function MajorLifeEventsSlide() {
  return (
    <Slide
      id="major-life-events"
      type="multi"
      variant="list"
      label="Choose one or more"
      options={[
        { text: "Graduation", icon: "🎓", value: "graduation" },
        { text: "First Job", icon: "💼", value: "firstjob" },
        { text: "Marriage", icon: "💍", value: "marriage" },
        { text: "Birth of Child", icon: "👶", value: "birthofchild" },
        { text: "Buying a Home", icon: "🏠", value: "buyingahome" },
        { text: "Starting a Business", icon: "🏢", value: "startingabusiness" },
        { text: "Career Change", icon: "🔄", value: "careerchange" },
        { text: "Retirement", icon: "🏖️", value: "retirement" },
        { text: "Divorce", icon: "💔", value: "divorce" },
        { text: "Significant Loss", icon: "🕊️", value: "significantloss" },
        { text: "Major Travel", icon: "✈️", value: "majortravel" },
      ]}
    >
      <SlideHeading>
        <Span>Select any major life events that have happened to you.</Span>
      </SlideHeading>
      <Selector />
      <NextButton>Continue</NextButton>
    </Slide>
  );
}

export function RelationshipStatusSlide() {
  return (
    <Slide
      id="relationship-status"
      type="single"
      variant="list"
      label="Select one"
      options={[
        { text: "Single", icon: "🧍", value: "single" },
        { text: "Dating", icon: "💏", value: "dating" },
        { text: "Committed", icon: "💖", value: "committed" },
        { text: "Engaged", icon: "💍", value: "engaged" },
        { text: "Married", icon: "💒", value: "married" },
        { text: "Divorced", icon: "💔", value: "divorced" },
        { text: "Widowed", icon: "🕊️", value: "widowed" },
      ]}
    >
      <SlideHeading>
        <Span>What is your current relationship status?</Span> Understanding your relationship
        status helps us offer insights tailored to your love life.
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
