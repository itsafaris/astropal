import React, { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function FinilisingAstrologerSlide() {
  const [navigationEnabled, setNavigationEnabled] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="finilising-astrologer"
      type="loading"
      duration={6}
      onLoadingCompleted={() => {
        setNavigationEnabled(true);
      }}
    >
      <SlideHeading
        text="Thank you! Let me finalize your profile"
        instant={showLoading}
        onFinishedTyping={() => {
          setShowLoading(true);
        }}
      />

      {showLoading && <Selector />}
      {navigationEnabled && <NextButton onClick={() => submitQuestion()}>Continue</NextButton>}
    </Slide>
  );
}
