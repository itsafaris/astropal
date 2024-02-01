import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function CareerScore() {
  return (
    <Slide
      id="career-score"
      type="single"
      variant="list"
      options={[
        { text: "Regretful and unfulfilled", icon: "😕" },
        { text: "Indifferent", icon: "🙂" },
        { text: "Pleased with the career choice", icon: "😊" },
        { text: "Enthusiastic and passionate", icon: "🌟" },
      ]}
    >
      <SlideHeading text={`How happy are you with the choice of your career?`} />
      <Selector />
    </Slide>
  );
}
