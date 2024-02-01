import React, { useState } from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
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

export function WhyNatalChart() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="why-natal-chart" type="filler">
      <SlideHeading text="Astrologers use a birth chart to interpret an individual's personality, potential, and life path based on celestial positions at their time of birth." />
      <SlideHeading text="It is the most important aspect of personal astrology." />
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}

export function AstrologerCreationStart() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="astrologer-creation-start" type="filler">
      <SlideHeading text="Let's now train our astrologer on your Birth Chart" />
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Train Astrologer
      </NextButton>
    </Slide>
  );
}

export function TrainingAstrologerSlide() {
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="training-astrologer"
      type="loading"
      duration={4}
      statusText={({ progress }) => {
        if (progress < 40) {
          return "Collecting current celestial data";
        }

        if (progress < 100) {
          return "Astrologer is learning your Birth Chart";
        }
        return "Completed";
      }}
      onLoadingCompleted={() => {
        setLoadingCompleted(true);
      }}
    >
      <Text fontWeight={"bold"} fontSize={"xl"} textAlign={"center"} color={"white"} mb={4}>
        Training Astrologer
      </Text>
      <Selector />
      {loadingCompleted && (
        <NextButton
          onClick={() => {
            submitQuestion();
          }}
        >
          Try your astrologer
        </NextButton>
      )}
    </Slide>
  );
}

export function NameYourAstrologer() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="name-astrologer"
      type="single"
      variant={"list"}
      options={[
        { text: "Starlyn", icon: "🧙‍♂️" },
        { text: "AstroMax", icon: "🧞‍♂️" },
        { text: "Moonique", icon: "🧛‍♀️" },
        { text: "Solara", icon: "🧝‍♀️" },
        { text: "Zenith", icon: "🧚‍♂️" },
      ]}
    >
      <SlideHeading text="How would you like your astrologer to look like?" />
      <Selector />

      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </Slide>
  );
}

export function AstrologerHello() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="astrologer-hello" type="filler">
      <ChatMessage
        avatarIcon="🧙‍♂️"
        avatarName="Starlyn"
        messageText="Hello! I hope I will be able to answer your most important questions about yourself and help you grow"
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <NextButton
          mt={8}
          onClick={() => {
            submitQuestion();
          }}
        >
          Tell me about my personality
        </NextButton>
      )}
    </Slide>
  );
}

export function AstrologerImpression() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide id="astrologer-impression" type="filler">
      <SlideHeading text="Your astrologer is already quite capable 👏👏 Let's make it even more personalised to you!" />
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Personalise Your Astrologer
      </NextButton>
    </Slide>
  );
}

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
            When would you like to receive your personalised{" "}
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
        Personalising your astrologer
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
            Your astrologer is now ready to provide you a <Span>personalised life guidance</Span>
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
      <CustomerMessage text="Tell me about my personality" />

      <NatalChartInterpreter
        question="What is my personality like? (do not mention any planets or signs, only tell very briefly about my personality)"
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
          Tell me about my relationships
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
      <CustomerMessage text="What are my career prospects?" />

      <NatalChartInterpreter
        question="What are my career prospects? (do not mention any planets or signs, only tell very briefly about my personality)"
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
      <CustomerMessage text="Tell me about my relationships" />

      <NatalChartInterpreter
        question="What are my relationship strengths and struggles? (do not mention any planets or signs, only tell very briefly about my personality)"
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
          Tell me about my career
        </NextButton>
      )}
    </Slide>
  );
}

export function AstrologerAdviceRecap() {
  const [showInput, setShowInput] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="advice-recap" type="filler">
      <NatalChartInterpreter
        question="What are my career prospects? (do not mention any planets or signs, only tell very briefly about my personality)"
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
