import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";

export function RelationshipScore() {
  return (
    <Slide
      id="relationship-score"
      type="single"
      variant="list"
      options={[
        { text: "Lacking intimacy", icon: "💔" },
        { text: "Finding balance", icon: "❤️‍🩹" },
        { text: "Emotionally enriched", icon: "❤️" },
        { text: "Flourishing in relationships", icon: "💗" },
      ]}
    >
      <SlideHeading text={`To what extent do you feel fulfilled in terms of relationships?`} />
      <Selector />
    </Slide>
  );
}
