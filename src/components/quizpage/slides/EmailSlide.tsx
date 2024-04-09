import { Selector, Slide } from "@martynasj/quiz-lib";

import { Caption, SlideHeading, NextButton, Span } from "../components";

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <SlideHeading color="text.main" fontSize={"md"} mt={-3} mb={7}>
        <Span>One last thing!</Span> Enter your email and start using your personalised astrologer
      </SlideHeading>

      <Selector />

      <Caption mt={-6} mb={7}>
        🔒 We respect your privacy and are committed to protecting your personal data. We will only
        send you personalized astrological insights and updates to enlighten your journey.
      </Caption>

      <NextButton>Take me to my astrologer</NextButton>
    </Slide>
  );
}
