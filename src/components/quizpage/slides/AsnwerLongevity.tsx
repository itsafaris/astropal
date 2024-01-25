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
        { text: "More detailed and elaborate", icon: "📝" },
      ]}
    >
      <ChatBubble
        text="Ok. How do you prefer my responses to your questions?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
