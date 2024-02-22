import { Selector, Slide } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <SlideHeading color="white" fontSize={"md"} mt={-3} mb={7}>
        Where would you like to receive your program?
      </SlideHeading>

      <Selector />

      <Caption mt={-6} mb={7}>
        🔒 We respect your privacy and are committed to protecting your personal data. We will email
        you the instructions on how to get access to the program
      </Caption>

      <NextButton>Get My Program</NextButton>
    </Slide>
  );
}
