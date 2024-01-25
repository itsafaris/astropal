import React, { useState } from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "../components";

export function YourProfileSavingSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide id="your-profile-saving" type="loading" duration={4} autoProceed>
      <ChatBubble
        text="That's it! Now give me a moment to put all this information together to create your Natal Chart"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}
