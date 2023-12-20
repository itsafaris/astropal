import React from "react";
import { Callout, Selector, Slide, Title, TransitionText } from "@martynasj/quiz-lib";
import { Caption } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { Box } from "@chakra-ui/react";

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
  return (
    <Slide
      id="your-email"
      type="email"
      placeholder="Enter your email"
      nextButtonProps={{ title: "Submit" }}
    >
      <Title>We're out of free service slots at the moment</Title>
      <Callout emoji="⚠️ New users limit reached">
        We have reached the capacity of new users limit. You can leave your email below and we will
        send you the invite link once we're ready to onboard new users.
      </Callout>
      <Selector />
      <Caption mb={8}>Your email will only be used to send you the invite link.</Caption>
    </Slide>
  );
}
