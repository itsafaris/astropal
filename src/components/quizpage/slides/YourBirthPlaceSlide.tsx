import React, { useState } from "react";
import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { ChatBubble, NextButton } from "../components";

export function YourBirthPlaceSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <ChatBubble
        text="Where were you born?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && (
        <>
          <Callout emoji="Tip">
            If you don't know the exact location, enter a major city near your location. You will be
            able to change it later if needed.
          </Callout>
          <Selector />
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Next
          </NextButton>
        </>
      )}
    </Slide>
  );
}
