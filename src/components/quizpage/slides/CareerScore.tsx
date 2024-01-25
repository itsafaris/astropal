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
        { text: "Not satisfied", icon: "😕" },
        { text: "Somewhat satisfied", icon: "🙂" },
        { text: "Very satisfied", icon: "😊" },
        { text: "Super. I want more", icon: "🌟" },
      ]}
    >
      <ChatBubble
        text={`How satisfied are you with your career? 💼`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
