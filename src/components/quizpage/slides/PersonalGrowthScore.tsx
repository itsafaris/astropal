import React, { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function PersonalGrowthScore() {
  const [showInput, setShowInput] = useState(false);

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
      <ChatBubble
        text={`How satisfied are you with your personal growth?`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
