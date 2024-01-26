import React, { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function CareerScore() {
  const [showInput, setShowInput] = useState(false);

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
      <ChatBubble
        text={`How happy are you with the choice of your career?`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
