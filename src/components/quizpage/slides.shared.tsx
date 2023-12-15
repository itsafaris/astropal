import React from "react";
import { Selector, Slide, Title, TransitionText } from "@martynasj/quiz-lib";
import { Caption } from "./components";

export const partnerProfileStyles = {
  bgGradient: "radial(#0c3439, #221139)",
};

export function ExpectationsSlide() {
  return (
    <Slide
      id="your-expectations"
      type="multi"
      variant="list"
      quizContainerProps={partnerProfileStyles}
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
    <Slide id="finalizing-profile" type="loading" quizContainerProps={partnerProfileStyles}>
      {({ state }) => {
        return (
          <>
            <Title color="white" textAlign={"center"}>
              {state.isComplete
                ? "Congratulations! Your guidance advisor is ready"
                : "Give us a moment to finalize your profile"}
            </Title>
            <TransitionText
              height={16}
              textAlign={"center"}
              color="white"
              text={
                state.isComplete
                  ? `Click next to access your personalized relationship guidance advisor.`
                  : "Based on your answers, we're fine-tuning your personal guidance advisor."
              }
            />
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function EmailSlide() {
  return (
    <Slide
      id="your-email"
      type="email"
      label="Enter your email"
      placeholder="e.g. lyra@gmail.com"
      quizContainerProps={partnerProfileStyles}
    >
      <Title>What's your email?</Title>

      <Caption>
        We're thrilled to share that your personalized guidance summary is ready with insights to
        support you on your journey. To ensure a seamless delivery, we kindly ask for your email
        address.
      </Caption>

      <Caption>This will be used solely for sending you the summary – no spam, we promise!</Caption>

      <Selector />
    </Slide>
  );
}
