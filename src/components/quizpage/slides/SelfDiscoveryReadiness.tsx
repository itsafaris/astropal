import React from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";
import { ChatBubble, NextButton } from "../components";

export function SelfDiscoveryReadiness() {
  const [showInput, setShowInput] = React.useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="self-discovery-readiness" type="filler">
      <ChatBubble
        text={`Thank you! Answers you provide are important in determing the areas of self-discovery that we should focus on first`}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton mt={6} mb={3} onClick={() => submitQuestion()}>
          Continue
        </NextButton>
      )}
    </Slide>
  );
}
