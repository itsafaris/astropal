import { Callout, Selector, Slide, Title, useQuiz } from "@martynasj/quiz-lib";

import { Caption, NextButton } from "../components";

export function EmailSlide() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide
      id="your-email"
      type="email"
      placeholder="Enter your email"
      nextButtonProps={{ title: "Submit" }}
    >
      <Title>Service is at highest capacity</Title>
      <Callout emoji="⚠️ New users limit reached">
        Due to the high number of new users, we are limiting access to our service at the moment.
        Your astrologer is however saved and will be ready to use, once we send you an invite
      </Callout>
      <Selector />
      <Caption mb={8}>Your email will only be used to send you the invite link.</Caption>
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Submit
      </NextButton>
    </Slide>
  );
}
