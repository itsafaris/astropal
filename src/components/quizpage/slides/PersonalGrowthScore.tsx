import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function PersonalGrowthScore() {
  return (
    <Slide
      id="personal-growth-score"
      type="single"
      variant="list"
      options={[
        { text: "Struggling", icon: "🍃" },
        { text: "Finding my way", icon: "🌱" },
        { text: "Growing steadily", icon: "🍀" },
        { text: "Embracing continuous improvement", icon: "🌳" },
      ]}
    >
      <SlideHeading text={`How satisfied are you with your personal growth?`} />
      <Selector />
    </Slide>
  );
}
