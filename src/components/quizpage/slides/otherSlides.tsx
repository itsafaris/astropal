import React, { useState } from "react";
import { Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";
import { Box, Fade, Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span, SpanJust } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { useInterpreter } from "../interpreter";
import { LoadingSlide } from "@martynasj/quiz-lib/internal/loading";
import { LoadingPulse } from "../LoadingPulse";

export function AstrologerThemePreferences() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide
      id="astrologer-theme-preferences"
      type="multi"
      variant="list"
      options={[
        { text: "Career", icon: "💼" },
        { text: "Finances", icon: "💰" },
        { text: "Love & Relationships", icon: "💞" },
        { text: "Personal Growth", icon: "🍀" },
        { text: "Self understanding", icon: "🧘" },
      ]}
    >
      <SlideHeading text="What are the themes you want your astrologer to be most trained on?" />
      <Selector />
      <NextButton onClick={() => submitQuestion()}>Continue</NextButton>
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
        { text: "Morning", icon: "🌅" },
        { text: "Afternoon", icon: "☀️" },
        { text: "Evening", icon: "🌃" },
      ]}
    >
      <SlideHeading
        text={
          <SpanJust>
            When would you like to receive your personalized{" "}
            <Span color="blue.400">daily horoscope</Span>?
          </SpanJust>
        }
      />
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

export function PersonalityDescriptionSlide() {
  const quiz = useQuiz();
  const [showInterpretation, setShowInterpretation] = useState<boolean>(false);
  const { interpretation, error } = useInterpreter(
    "What is my personality like? Provide a short list of my strenghts and weaknesses"
  );

  return (
    <Slide id="personality-description" type="filler">
      <SlideHeading text="Tell me about my personality" />

      {!showInterpretation && (
        <>
          <LoadingSlide id="loading-interpretation" type="loading" />
          <LoadingPulse isLoading={!Boolean(interpretation)} />

          {interpretation && (
            <NextButton onClick={() => setShowInterpretation(true)} my={8}>
              Continue
            </NextButton>
          )}
        </>
      )}

      {showInterpretation && (
        <>
          <Fade in={Boolean(interpretation)} transition={{ enter: { duration: 0.3, delay: 0.5 } }}>
            <Flex
              flexDirection={"column"}
              backgroundColor={"white"}
              px={5}
              py={7}
              position={"relative"}
              color="black"
              borderRadius={"lg"}
            >
              <Text
                textAlign={"center"}
                fontStyle="italic"
                fontSize={"2xl"}
                color={"brand.300"}
                mb={5}
                fontWeight={"bold"}
              >
                Your personality
              </Text>

              <Text>{interpretation}</Text>
            </Flex>

            <NextButton
              onClick={() => {
                quiz.submitQuestion();
              }}
              my={8}
            >
              Continue
            </NextButton>
          </Fade>
        </>
      )}
    </Slide>
  );
}
