import React from "react";
import { Callout, Selector, Slide, Title, useQuiz } from "@martynasj/quiz-lib";
import { Caption, NextButton } from "./components";

export function ExpectationsSlide() {
  return (
    <Slide
      id="your-expectations"
      type="multi"
      variant="list"
      options={[
        {
          text: "Daily spiritual advice and tips",
          icon: "☀️",
        },
        {
          text: "Ability to ask questions and get answers",
          icon: "❓",
        },
        {
          text: "Insights into the future",
          icon: "🔮",
        },
        {
          text: "Compatibility checks with others",
          icon: "💑",
        },
        {
          text: "Personalized astrology profiles",
          icon: "⭐",
        },
        {
          text: "Affirmations and mantras",
          icon: "🙏",
        },
      ]}
    >
      <Title>What kind of assistance are you seeking that would be most beneficial to you?</Title>
      <Selector />
    </Slide>
  );
}

export function FinalizingProfileSlide() {
  return (
    <Slide
      id="finalizing-profile"
      type="loading"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Get my Astrology Guide" }}
    >
      {({ state }) => {
        return (
          <>
            <Title color="white" textAlign={"center"} height={20}>
              {state.isComplete
                ? "Congratulations! Your Astrology Guide is ready"
                : "We're creating your personalised Astrology Guide"}
            </Title>
            {/* <TransitionText
              height={16}
              textAlign={"center"}
              color="white"
              text={
                state.isComplete
                  ? `Click next to access your personalized relationship guidance advisor.`
                  : "Based on your answers, we're fine-tuning your personal guidance advisor."
              }
            /> */}
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

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

export function ThankYouSlide() {
  return (
    <Slide id="thank-you" type="filler">
      <Title>Thank you!</Title>
      <Callout emoji="🎉">We will send you the invitation link as soon as possible</Callout>
    </Slide>
  );
}
