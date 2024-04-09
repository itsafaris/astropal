import { Callout, Selector, Slide, useQuiz } from "@martynasj/quiz-lib";

import { SlideHeading, NextButton } from "../components";
import { StaticImage } from "gatsby-plugin-image";

export function YourBirthTimeSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      <SlideHeading text="What is your birth hour?" mb={2} />
      <StaticImage
        alt="Astropal - pencil drawing of an astrological clock"
        layout="fixed"
        placeholder="blurred"
        height={180}
        style={{ margin: "0 auto" }}
        src="../../../images/clock_pencil.png"
      />
      <Callout mt={2}>💡 If you're unsure about the time, pick the closest hour.</Callout>
      <Selector />

      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}
