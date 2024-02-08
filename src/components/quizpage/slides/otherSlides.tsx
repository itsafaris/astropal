import React, { useState } from "react";
import { Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";
import { Box, Card, Flex, Text } from "@chakra-ui/react";

import { SlideHeading, NextButton, Span, SpanJust } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { NatalChartInterpreter } from "../interpreter";

import { bookToc } from "@utils/book";

import { SquaredStar } from "@components/svg/icons";
import { getPersonalInfoFromState } from "@utils/state";
import { FaCalendarDays, FaClock, FaRegClock, FaVenusMars } from "react-icons/fa6";

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

export function BookTone() {
  return (
    <Slide
      id="book-tone"
      type="single"
      variant="list"
      options={[
        { text: "Friendly and easy to read", icon: "🌅" },
        { text: "Balanced", icon: "☀️" },
        { text: "Scientific", icon: "🌃" },
      ]}
    >
      <SlideHeading>How do you want your book to be written?</SlideHeading>
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
  return (
    <Slide
      id="loading-creating-birthchart"
      type="loading"
      duration={8}
      statusText={({ progress }) => {
        if (progress < 100) {
          return "Calculating chart...";
        }
        return "Completed";
      }}
    >
      <SlideHeading>
        We're now calculating your <Span>Birth Chart</Span> - a snapshot of the sky at the time and
        place you were born.
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function Loading_CreatingBlueprint() {
  return (
    <Slide
      id="loading-creating-blueprint"
      type="loading"
      duration={8}
      statusText={({ progress }) => {
        if (progress < 40) {
          return "Analysing your answers...";
        }
        if (progress < 100) {
          return "Creating blueprint...";
        }
        return "Completed";
      }}
    >
      <Selector />
    </Slide>
  );
}

export function Filler_BirthChartInterpretation() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-birth-chart-interpretation" type="filler">
      <SlideHeading>
        <Span color="purple.600">The Book of You</Span> is created from your{" "}
        <Span>Birth Chart</Span>. It is an easy to read interpretation of the information encoded in
        the chart
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

export function Filler_IntroToPersonality() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="filler-personality" type="filler">
      <SlideHeading>
        Believe it or not, your Birth Chart contains the <Span color="purple.600">reasons</Span>{" "}
        behind most of <Span color="purple.600">your actions</Span> and{" "}
        <Span color="purple.600">choices</Span>.{" "}
        <Span>It can be decoded to reveal the most significant insights</Span>
      </SlideHeading>

      <Box width={"70%"} mx="auto" mt={4} borderRadius={"xl"} bottom="0" overflow={"hidden"}>
        <StaticImage
          alt="Clarity increase when using astrologer guidance chart"
          src="../../../images/iceberg.png"
        />
      </Box>

      <NextButton mt={8} onClick={() => submitQuestion()}>
        Continue
      </NextButton>
    </Slide>
  );
}

export function PersonalizedBirthChartReading() {
  return (
    <Slide
      id="personalized-birth-chart-reading"
      type="single"
      variant="list"
      options={[
        { text: "Yes", icon: "✅" },
        { text: "No", icon: "❌" },
        { text: "Not sure", icon: "😕" },
      ]}
    >
      <SlideHeading text={"Have you ever received a personalised reading of your birth chart?"} />
      <Selector />
    </Slide>
  );
}

export function Filler_BookStructure() {
  return (
    <Slide id="filler-book-structure" type="filler">
      <SlideHeading>
        Your Personalised Self-Discovery Guide will contain <Span>92 pages of unique content</Span>.
        Here's a sneak peek:
      </SlideHeading>

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
          Chapters
        </Text>
        <Box>
          {bookToc.chapters.map((chapter) => {
            return (
              <Box key={chapter.title} mb={2}>
                <Text key={chapter.title} fontSize={"2xs"} fontFamily={"monospace"}>
                  {chapter.title}
                </Text>
                <Box ml={4}>
                  {chapter.chapters?.map((subchapter) => {
                    return (
                      <Text
                        key={subchapter.title}
                        fontSize={"2xs"}
                        fontFamily={"monospace"}
                        fontWeight={"semibold"}
                      >
                        {subchapter.title}
                      </Text>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function Filler_FactOnMissedOpportunities() {
  return (
    <Slide id="filler-missed-opportunities" type="filler">
      <SlideHeading>
        Did you know that the main cause of hesitation is the{" "}
        <Span>lack of self understanding</Span>
      </SlideHeading>
      <StaticImage
        placeholder="none"
        alt="unused opportunities by people"
        src="../../../images/confidence_chart.png"
      />
      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function Filler_OptimalPath() {
  return (
    <Slide id="filler-optimal-path" type="filler">
      <SlideHeading>
        A Birth Chart-based <Span>Self-Discovery Guide</Span> is a tool to the optimal
        decision-making
      </SlideHeading>
      <Box my={4} overflow={"hidden"} borderRadius={"lg"} bg="white" p={4}>
        <StaticImage
          alt="road to reaching a goal"
          placeholder="none"
          src="../../../images/reaching_goal.png"
        />
      </Box>
      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function Filler_SummaryOfAnswers() {
  const { quizState } = useQuizState();
  const p = getPersonalInfoFromState(quizState);

  return (
    <Slide id="filler-summary-of-answers" type="filler">
      <SlideHeading>Your Guide will be created based on the following:</SlideHeading>

      <Flex gap={1} alignItems={"center"} color="blackAlpha.600">
        <FaVenusMars />
        <Text fontWeight={"regular"}>Gender:</Text>
        <Text color="black" textTransform={"capitalize"} fontWeight={"bold"}>
          {p.yourGender}
        </Text>
      </Flex>

      <Flex gap={1} alignItems={"center"} color="blackAlpha.600">
        <FaCalendarDays />
        <Text fontWeight={"regular"}>Date of birth:</Text>
        <Text color="black" textTransform={"capitalize"} fontWeight={"bold"}>
          {p.localeDate}
        </Text>
      </Flex>

      <Flex gap={1} alignItems={"center"} color="blackAlpha.600">
        <FaRegClock />
        <Text fontWeight={"regular"}>Time of birth:</Text>
        <Text color="black" textTransform={"capitalize"} fontWeight={"bold"}>
          {p.yourBirthTime.hour}:{p.yourBirthTime.minute.toString().padStart(2, "0")}
          {p.yourBirthTime.meridiem}
        </Text>
      </Flex>

      <Flex gap={1} alignItems={"center"} color="blackAlpha.600">
        <FaRegClock />
        <Text fontWeight={"regular"}>Focus Area:</Text>
        <Text color="black" textTransform={"capitalize"} fontWeight={"bold"}>
          {p.struggleArea}
        </Text>
      </Flex>

      <Text>
        <Span fontWeight={"regular"} color="blackAlpha.600">
          Number of pages:
        </Span>{" "}
        <Span textTransform={"capitalize"}>92</Span>
      </Text>
      <Text>
        <Span fontWeight={"regular"} color="blackAlpha.600">
          Self-Discovery potential:
        </Span>{" "}
        <Span textTransform={"capitalize"}>Moderate</Span>
      </Text>
      <NextButton mt={8}>Continue</NextButton>
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
