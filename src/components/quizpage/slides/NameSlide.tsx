import React, { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function NameSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="name-slide" type="short-text" label="Your name" placeholder="e.g. Jane">
      <SlideHeading
        text="Before saving your profile, let me know how should I call you"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
      {showInput && <NextButton onClick={() => submitQuestion()}>Continue</NextButton>}
    </Slide>
  );
}
