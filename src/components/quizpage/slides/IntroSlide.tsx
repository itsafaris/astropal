import React from "react";
import { Callout, Slide, useQuiz } from "@martynasj/quiz-lib";

import { ChatBubble, NextButton } from "../components";

export function IntroSlide() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro" type="filler">
      <ChatBubble
        text={`👋 Hey, nice to meet you!\n\nIn order to provide you with astrological insights, we need to create your Natal Chart first.`}
        instant={showInput}
        onFinishedTyping={() => {
          setTimeout(() => {
            setShowInput(true);
          }, 300);
        }}
      />
      {showInput && (
        <>
          <Callout emoji="What is a Natal Chart?">
            It's a personalized astrology map based on your birth moment, helping you understand
            your personality and life journey.
          </Callout>
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Let's do it
          </NextButton>
        </>
      )}
    </Slide>
  );
}
