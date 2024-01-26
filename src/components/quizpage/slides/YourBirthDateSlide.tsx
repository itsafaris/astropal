import React from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { ChatBubble, NextButton } from "../components";

export function YourBirthDateSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-date" type="date">
      <ChatBubble
        text={"Let's start with your Astrological Profile. What is the date you were born?"}
        instant={showInput}
        onFinishedTyping={() => {
          setTimeout(() => {
            setShowInput(true);
          }, 300);
        }}
      />
      {showInput && <Selector />}
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
