import React, { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function AsnwerLongevity() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide
      id="answer-longevity"
      type="single"
      variant="list"
      options={[
        { text: "Shorter and to-the-point", icon: "💬" },
        { text: "Just as they are now", icon: "👌" },
        { text: "Longer and detailed", icon: "📝" },
      ]}
    >
      <ChatBubble
        text="With the Self-Discovery guide you will get such insights daily! How would you like them to be presented?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
