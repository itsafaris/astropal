import React, { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { ChatBubble, NextButton } from "../components";
import { NatalChartInterpreter } from "../interpreter";

export function DescribeYourNatalChart() {
  const [showInput, setShowInput] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="personality-description" type="filler">
      <ChatBubble
        text={`Let's see what your natal chart tells about you as a person.`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowAdvice(true);
        }}
      />

      {showAdvice && (
        <NatalChartInterpreter
          question="What is my personality like? (do not mention any planets or signs, only tell very briefly about my personality)"
          onFinishedAnswer={() => {
            setShowInput(true);
          }}
        />
      )}

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}
