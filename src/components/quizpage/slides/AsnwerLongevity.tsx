import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading } from "../components";
import { Text } from "@chakra-ui/react";

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
        How would you like your{" "}
        <Text as="span" color="brand.600">
          Astrology Insights
        </Text>{" "}
        to be present?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}
