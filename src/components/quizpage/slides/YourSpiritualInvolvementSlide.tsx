import React, { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function YourSpiritualInvolvementSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide
      id="your-spiritual-involvement"
      type="single"
      variant="list"
      options={[
        {
          text: "I'm new to spirituality",
          icon: "🌑",
        },
        {
          text: "I have a casual interest",
          icon: "🌒",
        },
        {
          text: "I actively practice and study",
          icon: "🌔",
        },
        {
          text: "Deeply committed",
          icon: "🌕",
        },
      ]}
    >
      <ChatBubble
        text="To what degree are you engaged with spiritual practices and concepts?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
