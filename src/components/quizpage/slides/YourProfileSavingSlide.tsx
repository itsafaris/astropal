import { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function YourProfileSavingSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide id="your-profile-saving" type="loading" duration={5} autoProceed>
      <ChatBubble
        text="Take a brief pause while we collect the celestial insights 😌"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
