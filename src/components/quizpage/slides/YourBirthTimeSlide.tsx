import React from "react";
import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { ChatBubble, NextButton } from "../components";

export function YourBirthTimeSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      <ChatBubble
        instant={showInput}
        text="What is the time you were born?"
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && (
        <>
          <Callout emoji="Tip">
            If you don't know the exact time, select just the approximate hour. You will always be
            able to adjust it later
          </Callout>
          <Selector />
        </>
      )}
      {showInput && (
        <NextButton
          onClick={() => {
            submitQuestion();
          }}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}
