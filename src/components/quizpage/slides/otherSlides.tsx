import { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { Box, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span, SpanJust } from "../components";
import { StaticImage } from "gatsby-plugin-image";

export function AstrologerThemePreferences() {
  return (
    <Slide
      id="astrologer-theme-preferences"
      type="single"
      variant="list"
      options={[
        { text: "Love & Relationships", icon: "💞" },
        { text: "Career", icon: "💼" },
        { text: "Finances", icon: "💰" },
        { text: "Personal Growth", icon: "🍀" },
        { text: "Self understanding", icon: "🧘" },
      ]}
    >
      <SlideHeading>
        Where would you like to start your <Span>Astrological Self-Discovery journey</Span>?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function AskingQuestionsDirectly() {
  return (
    <Slide
      id="asking-questions-directly"
      type="single"
      variant="list"
      options={[
        { text: "I would love to", icon: "❤️" },
        { text: "Not sure yet", icon: "🤔" },
        { text: "No", icon: "🙅‍♂️" },
      ]}
    >
      <SlideHeading>
        Would you like to be able to ask questions and{" "}
        <Text as="span" color="brand.600">
          receive insights whenever something worries
        </Text>{" "}
        you?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function DailyHoroscope() {
  return (
    <Slide
      id="daily-horoscope"
      type="single"
      variant="list"
      options={[
        { text: "In the mornings", icon: "🌅" },
        { text: "In the afternoons", icon: "☀️" },
        { text: "In the evenings", icon: "🌃" },
      ]}
    >
      <SlideHeading>
        At what time of the day would you like to receive your <Span>personalized horoscopes</Span>?{" "}
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function NotificationReceiver() {
  return (
    <Slide
      id="weekly-forecast"
      type="single"
      variant="list"
      options={[
        { text: "Yes", icon: "✅" },
        { text: "No", icon: "➖" },
      ]}
    >
      <SlideHeading
        text={
          <SpanJust>
            Would you like to <Span color="green.400">receive notifications</Span> for making
            important life decisions based on cosmic events?
          </SpanJust>
        }
      />
      <Selector />
    </Slide>
  );
}

export function SavingYourPreferences() {
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="saving-preferences"
      type="loading"
      duration={4}
      statusText={({ progress }) => {
        if (progress < 100) {
          return "Memorising...";
        }
        return "Completed";
      }}
      onLoadingCompleted={() => {
        setLoadingCompleted(true);
      }}
    >
      <Text fontWeight={"bold"} fontSize={"xl"} textAlign={"center"} color={"white"} mb={4}>
        Personalizing your astrologer
      </Text>
      <Selector />
      {loadingCompleted && (
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

export function YourGuidanceIsReady() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="guidance-ready" type="filler">
      <SlideHeading
        text={
          <SpanJust>
            Your astrologer is now ready to provide you a <Span>personalized life guidance</Span>
          </SpanJust>
        }
      />
      <Box mt={4} overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../../images/clarity_chart.png"
        />
      </Box>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Continue
      </NextButton>
    </Slide>
  );
}
