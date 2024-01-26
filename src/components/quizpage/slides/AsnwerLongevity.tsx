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
        text="Before we continue, how you'd like our insights delivered as we move forward? We want to make sure it's just right for you!"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
