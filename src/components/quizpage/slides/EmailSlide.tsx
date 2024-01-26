import React from "react";

import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { Caption, ChatBubble, NextButton } from "../components";
import { useState } from "react";

export function EmailSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <ChatBubble
        text={`Your Self-Discovery guide is ready! Let us know where we should be sending it ✉️`}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Selector />

          <Caption mb={5}>
            We'll only use your email to send you the guide. It's all about keeping it simple and
            friendly ❣️
          </Caption>

          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}
