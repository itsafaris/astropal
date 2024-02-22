import React from "react";
import { Selector, Slide } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";

export function NatalChartLoadingSlide() {
  const [showInput, setShowInput] = React.useState<boolean>(false);

  return (
    <Slide
      id="natal-chart-loading"
      type="loading"
      duration={3}
      onLoadingCompleted={() => {
        setShowInput(true);
      }}
    >
      <SlideHeading textAlign={"center"} text="Just a moment... finding your cosmic identity" />

      <Selector />

      {showInput && <NextButton my={8}>Continue</NextButton>}
    </Slide>
  );
}
