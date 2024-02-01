import { useState } from "react";
import { Slide, useQuiz } from "@martynasj/quiz-lib";

import { NextButton } from "../components";
import { NatalChartInterpreter } from "../interpreter";

export function DescribeYourNatalChart() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="personality-description" type="filler">
      <NatalChartInterpreter
        question="What is my personality like? (do not mention any planets or signs, only tell very briefly about my personality)"
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

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
