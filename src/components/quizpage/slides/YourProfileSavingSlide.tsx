import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { NextButton, SlideHeading } from "../components";
import { useState } from "react";

export function YourProfileSavingSlide() {
  const [showNext, setShowNext] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="your-profile-saving"
      type="loading"
      duration={5}
      onLoadingCompleted={() => {
        setShowNext(true);
      }}
    >
      <SlideHeading text="Take a brief pause while we collect the celestial insights 😌" />
      <Selector />
      {showNext && (
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
