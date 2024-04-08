import { Selector, Slide } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton } from "../components";

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <SlideHeading color="text.main" fontSize={"md"} mt={-3} mb={7}>
        Where would you like to receive your program?
      </SlideHeading>

      <Selector />

      <Caption mt={-6} mb={7}>
        🔒 We respect your privacy and are committed to protecting your personal data. We will only
        send you personalized astrological insights and updates to enlighten your journey.
      </Caption>

      <NextButton>Get My Program</NextButton>
    </Slide>
  );
}
