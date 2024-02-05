import React, { useState } from "react";
import { Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";
import { Box, Flex, Text } from "@chakra-ui/react";

import {
  SlideHeading,
  ChatMessage,
  NextButton,
  Span,
  SpanJust,
  CustomerMessage,
} from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { NatalChartInterpreter } from "../interpreter";
import { AstrologicalProfile } from "@components/AstrologicalProfile";
import { astrologers, getPersonalInfoFromState } from "@utils/state";
import { bookToc } from "@utils/book";

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
      <SlideHeading text="Select which of the chapters should be included in your book?" />
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

export function Loading_CreatingBirthChart() {
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  return (
    <Slide
      id="loading-creating-birthchart"
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
      <SlideHeading>
        We're now calculating your <Span>Birth Chart</Span> - a snapshot of the sky at the time and
        place you were born.
      </SlideHeading>
      <Selector />
      {loadingCompleted && <NextButton>Continue</NextButton>}
    </Slide>
  );
}

export function Loading_SavingInterpretationPreferences() {
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  return (
    <Slide
      id="loading-saving-interpretatation-preferences"
      type="loading"
      duration={4}
      statusText={({ progress }) => {
        if (progress < 100) {
          return "Loading...";
        }
        return "Completed";
      }}
      onLoadingCompleted={() => {
        setLoadingCompleted(true);
      }}
    >
      <SlideHeading>Creating a template of your book</SlideHeading>
      <Selector />
      {loadingCompleted && <NextButton>Continue</NextButton>}
    </Slide>
  );
}

export function Filler_BirthChartInterpretation() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-birth-chart-interpretation" type="filler">
      <SlideHeading>
        <Span>The book of life</Span> is based on the planets and celestial bodies of your birth
        chart. They all encode a part of the story about you.
      </SlideHeading>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Personalise interpretation
      </NextButton>

      <Box
        position={"absolute"}
        left={"50%"}
        transform={"translateX(-50%)"}
        width={"70%"}
        mt={4}
        borderRadius={"xl"}
        bottom="0"
        overflow={"hidden"}
      >
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../../images/book1.png"
        />
      </Box>
    </Slide>
  );
}

export function Filler_BookStructure() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-book-structure" type="filler">
      <SlideHeading text={<SpanJust>This is how your personal book will be structured</SpanJust>} />

      <Box
        bg="white"
        mx="auto"
        px={4}
        py={8}
        boxShadow={"4px 4px 9px 0px #cebeaf"}
        borderRadius={"md"}
        width={"300px"}
      >
        <Text textAlign={"center"} mb={4}>
          Table of Contents
        </Text>
        <Box ml={8} as="ol">
          {bookToc.chapters.map((chapter) => {
            return (
              <Text as="li" key={chapter.title} fontSize={"2xs"} fontFamily={"monospace"}>
                {chapter.title}
              </Text>
            );
          })}
        </Box>
      </Box>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Personalise interpretation
      </NextButton>
    </Slide>
  );
}

export function Filler_WhyPersonalDetails() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-personal-details" type="filler">
      <SlideHeading
        text={
          <SpanJust>
            To make the interpretation more personal, we just need a few more details to know you
            better.
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
        Personalise interpretation
      </NextButton>
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

export function AstrologerAdvicePersonality() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="personality-description" type="filler">
      <SlideHeading text="   Tell me about my personality" />

      <NatalChartInterpreter
        title="Your personality"
        prompt="What is my personality like? Provide a short list of my strenghts and weaknesses"
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}

export function AstrologerAdviceCareer() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="advice-career" type="filler">
      <SlideHeading text="What are my career prospects?" />

      <NatalChartInterpreter
        title="Your career"
        prompt={`Describe my career. Structure your response in these sections. Section titles should be as follows:
        - Short summary of what generic career and professional choices are good for me (do not include the section title).
        - Careers that fit you
        - Career choices to avoid
        
         Only respond with what is asked for. Do not add any other text to your response beyong the sections that are asked for.
        `}
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}

export function AstrologerAdviceRelationships() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="advice-relationships" type="filler">
      <SlideHeading text="Tell me about my relationships" />

      <NatalChartInterpreter
        title="Your relationships"
        prompt={`Describe me what am I in a relationships? Structure your response in these sections:
        - Short summary (do not include section title)
        - Zodiac signs that I match well with (include section title). Every list item should have an emoji representing this zodiac sign. Include a few word description summarising the match with this sign.
        - A list of zodiac signs that I should avoid (include section title).
        - A short list of my weaknesses in relationships.
        
         Only respond with what is asked for. Do not add any other text to your response beyong the sections that are asked for.
        `}
        onFinishedAnswer={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          onClick={() => {
            quiz.submitQuestion();
          }}
          my={8}
        >
          Continue
        </NextButton>
      )}
    </Slide>
  );
}
