import { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { NextButton, ChatMessage } from "../components";

export function IntroToFinetuningPart() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro-to-finetuning-part" type="filler">
      <ChatMessage
        avatarIcon="🧙‍♂️"
        avatarName="Starlyn"
        messageText={`Looks like we're almost there 👏👏.\n\nWe have our foundation settled. In order to provide you the best advice possible, I need to know your current life challenges.`}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          mt={8}
          onClick={() => {
            submitQuestion();
          }}
        >
          Let's begin
        </NextButton>
      )}
    </Slide>
  );
}
