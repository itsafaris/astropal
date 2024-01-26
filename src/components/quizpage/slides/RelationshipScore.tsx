import React, { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function RelationshipScore() {
  const [showInput, setShowInput] = useState(false);

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
      <ChatBubble
        text={`To what extent do you feel fulfilled in terms of relationships?`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && <Selector />}
    </Slide>
  );
}
