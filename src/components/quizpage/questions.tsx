import { Selector, Slide } from "@martynasj/quiz-lib";
import { Text } from "@chakra-ui/react";
import { SlideHeading, Subtitle } from "./components";

export function DecisionMakingStruggles() {
  return (
    <Slide
      id="decision-making-struggles"
      type="single"
      variant="list"
      options={[
        { text: "Career and Work", icon: "🏢" },
        { text: "Relationships and Love", icon: "❤️" },
        { text: "Financial Management", icon: "💰" },
        { text: "Personal Growth and Self-Improvement", icon: "🌱" },
        { text: "Health and Well-being", icon: "🍏" },
      ]}
    >
      <SlideHeading text={"What areas of your life do you find it hardest to make decisions in?"} />
      <Selector />
    </Slide>
  );
}

export function AdviceSeekingFrequency() {
  return (
    <Slide
      id="advice-seeking-frequency"
      type="single"
      variant="list"
      options={[
        { text: "Multiple times a day", icon: "🔍" },
        { text: "Once a day", icon: "📅" },
        { text: "A few times a week", icon: "🗓️" },
        { text: "Occasionally", icon: "🤷" },
        { text: "Rarely", icon: "🚫" },
      ]}
    >
      <SlideHeading text={"How often do you find yourself seeking advice?"} />
      <Selector />
    </Slide>
  );
}

export function DecisionChallengeAgreement() {
  return (
    <Slide
      id="decision-challenge-agreement"
      type="single"
      variant="list"
      options={[
        { text: "Strongly agree", icon: "👍" },
        { text: "Agree", icon: "👍" },
        { text: "Neutral", icon: "😐" },
        { text: "Disagree", icon: "👎" },
        { text: "Strongly disagree", icon: "👎" },
      ]}
    >
      <SlideHeading text={"Do you agree with the statement:"} />
      <Subtitle>"I often find it challenging to make a decision"</Subtitle>
      <Selector />
    </Slide>
  );
}

export function LifeChangeTiming() {
  return (
    <Slide
      id="life-change-timing"
      type="single"
      variant="list"
      options={[
        { text: "Always", icon: "🌟" },
        { text: "Often", icon: "✨" },
        { text: "Sometimes", icon: "🤔" },
        { text: "Rarely", icon: "😕" },
        { text: "Never", icon: "🚫" },
      ]}
    >
      <SlideHeading
        text={
          "When making a big change in your life, do you feel that you know the right moment to do it?"
        }
      />
      <Selector />
    </Slide>
  );
}
