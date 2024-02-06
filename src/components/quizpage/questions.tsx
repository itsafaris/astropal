import React from "react";
import { Selector, Slide, useQuiz } from "@martynasj/quiz-lib";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { NextButton, SlideHeading, Span } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { getPersonalInfoFromState } from "@utils/state";
import { toTitleCase } from "@utils/string";

export function DecisionMakingStruggles() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide
      id="decision-making-struggles"
      type="multi"
      variant="list"
      options={[
        { text: "Relationships and Love", icon: "❤️" },
        { text: "Career and Work", icon: "🏢" },
        { text: "Financial Management", icon: "💰" },
        { text: "Personal Growth", icon: "🌱" },
        { text: "Health and Well-being", icon: "🍏" },
        { text: "I'm doing well in all areas", icon: "🫣" },
      ]}
    >
      <SlideHeading text={"What areas of your life do you struggle with the most?"} />
      <Selector />
      <NextButton onClick={() => submitQuestion()}>Continue</NextButton>
    </Slide>
  );
}

export function AdviceSeekingFrequency() {
  return (
    <Slide
      id="advice-seeking-frequency"
      type="single"
      variant="list"
      options={[
        { text: "Always", icon: "😩" },
        { text: "Sometimes", icon: "😟" },
        { text: "Occasionally", icon: "🤔" },
        { text: "Rarely", icon: "😐" },
        { text: "Never", icon: "😌" },
      ]}
    >
      <SlideHeading text={"How often do you find yourself seeking advice?"} />
      <Selector />
    </Slide>
  );
}

export function DecisionChallengeAgreement() {
  return (
    <Slide
      id="decision-challenge-agreement"
      type="single"
      variant="list"
      options={[
        { text: "Strongly agree", icon: "👍" },
        { text: "Agree", icon: "👍" },
        { text: "Neutral", icon: "😐" },
        { text: "Disagree", icon: "👎" },
        { text: "Strongly disagree", icon: "👎" },
      ]}
    >
      <SlideHeading
        text={
          <Text as="span">
            Do you agree with the statement: <br />{" "}
            <Text as="span" color="bg.700" fontStyle="italic">
              "I often struggle to make decisions when opportunities arise"
            </Text>
          </Text>
        }
      />

      <Selector />
    </Slide>
  );
}

export function LifeChangeTiming() {
  return (
    <Slide
      id="life-change-timing"
      type="single"
      variant="list"
      options={[
        { text: "Yes", icon: "🙋" },
        { text: "No", icon: "🙅" },
        { text: "I don't know", icon: "🤷" },
      ]}
    >
      <SlideHeading text={"Do you feel like you're missing out on opportunities in your life?"} />
      <Selector />
    </Slide>
  );
}

export function FillerPeopleInControl() {
  return (
    <Slide id="filler-people-in-control" type="filler">
      <SlideHeading>
        <Text as="span" color="#f65874" fontWeight={"semibold"}>
          86% of people feel lost in their lives
        </Text>{" "}
        or struggle to find help. Astropal offers guidance, helping you navigate life's challenges
        with ease
      </SlideHeading>

      <Flex justifyContent={"center"} alignItems={"center"} bg="bg.100" borderRadius={"xl"} py={7}>
        <StaticImage
          alt="chart showing how many people feel lost in their lives"
          src="../../images/confidence_chart.png"
          layout="fullWidth"
          style={{
            width: "280px",
            marginLeft: "-15px",
          }}
        />
      </Flex>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function FillerToBirthChart() {
  return (
    <Slide id="intro-birth-chart" type="filler">
      <SlideHeading>
        To overcome the problem we have a solution. But first lets find out who you are
      </SlideHeading>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function HyperPersonalisedInsights() {
  return (
    <Slide id="personalised-insights-intro" type="filler">
      {({ quizState }) => {
        const info = getPersonalInfoFromState(quizState);

        function roundAgeUp(age: number): number {
          return Math.ceil(age / 10) * 10;
        }

        return (
          <>
            <SlideHeading>
              <Text as="span" fontWeight={"bold"}>
                9 out of 10 {toTitleCase(info.yourZodiac.pluralName)} under{" "}
                {roundAgeUp(info.yourAge)}
              </Text>{" "}
              say they're better at{" "}
              <Text as="span" fontStyle={"italic"} color="#63dc94">
                "knowing when and what decisions to make"
              </Text>{" "}
              with personalized Astropal insights
            </SlideHeading>

            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bg="bg.100"
              borderRadius={"xl"}
              py={7}
            >
              <StaticImage
                alt="chart showing how your self-esteem will increase over time"
                src="../../images/personalised_astro_benefits.png"
                layout="fullWidth"
                style={{
                  width: "280px",
                  marginLeft: "-15px",
                }}
              />
            </Flex>

            <NextButton mt={8}>Continue</NextButton>
          </>
        );
      }}
    </Slide>
  );
}

export function InsightVsHoroscopeComparison() {
  return (
    <Slide id="insight-vs-horoscope" type="filler">
      <SlideHeading>Here is an example, the difference is huge.</SlideHeading>

      <Box mb={4}>
        <Text mb={2} color="white">
          Regular horoscope
        </Text>
        <RegularHoroscope />
      </Box>

      <Box>
        <Text mb={2} color="white">
          Hyper Personalised Insight
        </Text>
        <PersonalisedInsight />
      </Box>

      <NextButton mt={8}>Get yours</NextButton>
    </Slide>
  );
}

function RegularHoroscope() {
  return (
    <Box bg="gray.400" p={2} borderRadius={"lg"}>
      <Text fontSize={"2xs"}>
        Today, Aquarius, you might find yourself at a crossroads, feeling an urge for change. Social
        interactions and teamwork are highlighted. It's a good day to explore new ideas and maybe
        even challenge the status quo. However, be mindful of potential conflicts with authority
        figures. Your lucky color today is blue, and your lucky number is 7.
      </Text>
    </Box>
  );
}
function PersonalisedInsight() {
  return (
    <Stack
      border="4px solid"
      borderColor={"teal.400"}
      bg="white"
      p={2}
      borderRadius={"lg"}
      fontSize={"2xs"}
      whiteSpace={"pre-wrap"}
      spacing={2}
      px={3}
    >
      <Text>
        <Span color="black">🔮 Overall Vibe</Span>
        <br />
        Today is a day of profound transformation, especially in your career sphere. The cosmos is
        urging you to embrace change and use your innovative Aquarius spirit to navigate through.
      </Text>
      <Text>
        <Span color="black">🌙 Emotional Landscape</Span>
        <Span color="pink.600">
          <br />
          Moon in Scorpio:
        </Span>{" "}
        Expect deep emotional revelations that could lead to significant shifts in how you approach
        your professional life.
        <br />
        <Span color="pink.600">Insight:</Span> Dive into these emotions; they're the key to
        understanding what changes need to be made. opportunities on the horizon.
      </Text>
      <Text>
        <Span color="black">💼 Career Dynamics:</Span>
        <br />
        <Span color="pink.600">Mars in the 10th House:</Span> Your ambition is at an all-time high,
        pushing you towards assertive action in your career.
        <br />
        <Span color="pink.600">Action Points:</Span> Leverage your unique ideas for a breakthrough.
        Be prepared for power struggles with authority figures; use your intuition to navigate
        these.
      </Text>
      <Text>
        <Span color="black">✨ Personal Growth:</Span> Transformation is your theme today. Embrace
        it, and let it guide you toward your next big achievement. Innovation is your best friend.
        Your ability to think outside the box is what will lead you to success.
      </Text>
      <Text>
        <Span color="black">🎨 Lucky Color & Number:</Span> Color: Deep Red 🟥 - symbolizing courage
        and power. Number: 22 - indicating significant changes and
      </Text>
    </Stack>
  );
}
