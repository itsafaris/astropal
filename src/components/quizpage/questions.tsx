import React from "react";
import { Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";
import { Box, Flex, Grid, Stack, Text, useTheme } from "@chakra-ui/react";
import { NextButton, SlideHeading, Span } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { getPersonalInfoFromState } from "@utils/state";
import { toTitleCase } from "@utils/string";
import { astrologyThemes } from "@utils/astrologyThemes";
import { NatalChart } from "@components/NatalChart";

export function DecisionMakingStruggles() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide
      id="decision-making-struggles"
      type="multi"
      variant="list"
      options={[
        { value: astrologyThemes.relationships.id, text: "Relationships and Love", icon: "❤️" },
        { value: astrologyThemes.career.id, text: "Career and Work", icon: "🏢" },
        { value: astrologyThemes.selfGrowth.id, text: "Personal Growth", icon: "🌱" },
        { value: astrologyThemes.wellBeing.id, text: "Health and Well-being", icon: "🍏" },
        { value: "none", text: "I'm doing well in all areas", icon: "🫣" },
      ]}
    >
      <SlideHeading>
        Now, let's determine how we can assist you. Please mark the areas in which you currently{" "}
        <Span>struggle the most</Span>
      </SlideHeading>
      <Selector />
      <NextButton onClick={() => submitQuestion()}>Continue</NextButton>
    </Slide>
  );
}

export function YourNameSlide() {
  return (
    <Slide id="name-slide" type="short-text" placeholder="E.g. Jane" optional>
      <SlideHeading>How should we call you?</SlideHeading>
      <Selector />
      <NextButton>Continue</NextButton>
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

export function WrongDecisionSlide() {
  return (
    <Slide
      id="wrong-decision"
      type="single"
      variant="list"
      options={[
        { text: "Unfortunatelly yes", icon: "🤦" },
        { text: "Not yet", icon: "🙆" },
        { text: "I'm not sure", icon: "🤷" },
      ]}
    >
      <SlideHeading text={"Have you ever made a decision that negatively affected your life?"} />
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
      <SlideHeading>
        <Text mb={3}>Do you agree with the statement:</Text>
        <Text textAlign="center" color="bg.700" fontSize={"lg"}>
          "I often struggle to decide what is best for me"
        </Text>
      </SlideHeading>

      <Selector />
    </Slide>
  );
}

export function InsightSourcesSlide() {
  return (
    <Slide
      id="insight-sources"
      type="single"
      variant="list"
      options={[
        { text: "Not useful at all", icon: "❌" },
        { text: "It usually lacks personalization", icon: "👤" },
        { text: "Sometimes it seems correct", icon: "🤏" },
        { text: "I find it useful", icon: "👍" },
        { text: "It reflects me perfectly", icon: "💯" },
      ]}
    >
      <SlideHeading>
        When in doubt do you find your <Span>horoscope readings</Span> useful?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function NatalChartReading() {
  return (
    <Slide
      id="natal-chart-reading"
      type="single"
      variant="list"
      options={[
        { text: "I don't know", icon: "🤷" },
        { text: "No", icon: "😟" },
        { text: "Yes", icon: "🌟" },
      ]}
    >
      <SlideHeading>
        Have you received a full reading of your personal <Span>Natal Chart</Span> before?
      </SlideHeading>

      <Selector />
    </Slide>
  );
}

export function QuoteSlide() {
  return (
    <Slide id="quote" type="filler">
      <StaticImage
        alt="famous astrology quote"
        src="../../images/person-in-doubt.png"
        style={{
          height: "200px",
        }}
      />

      <SlideHeading textAlign={"center"} fontStyle={"italic"} mt={8}>
        <Grid gridTemplateColumns="auto 1fr auto">
          <Text fontSize={"4xl"} alignSelf="flex-start">
            “
          </Text>
          <Text fontSize={"xl"}>
            Astrology is a language. If you understand this language, the sky speaks to you.
          </Text>
          <Text fontSize={"4xl"} alignSelf="flex-end">
            „
          </Text>
        </Grid>
      </SlideHeading>
      <Text color="text.main" textAlign={"right"}>
        - Dane Rudhyar
      </Text>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function FillerPeopleInControl() {
  return (
    <Slide id="filler-people-in-control" type="filler">
      {({ quizState }) => {
        const info = getPersonalInfoFromState(quizState);

        return (
          <>
            <SlideHeading>
              <Text as="span" color="#f65874">
                81% of {toTitleCase(info.yourZodiac.pluralName)} admit to having made at least 4
                wrong major life decisions.
              </Text>{" "}
              All could have been avoided with the right assistance.
            </SlideHeading>

            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              bg="bg.100"
              borderRadius={"xl"}
              py={7}
            >
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
          </>
        );
      }}
    </Slide>
  );
}

export function HyperPersonalisedInsights() {
  return (
    <Slide id="personalised-insights-intro" type="filler">
      <SlideHeading>
        <Span> 9 out of 10 people</Span> claim that having a Natal Chart reading has enabled them to
        make better decisions and experience less self-doubt.
      </SlideHeading>

      <Flex justifyContent={"center"} alignItems={"center"} bg="bg.100" borderRadius={"xl"} py={7}>
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

      <NextButton mt={8}>Create My Reading</NextButton>
    </Slide>
  );
}

export function Filler_MentorshipProgramIntro() {
  const { quizState } = useQuizState();
  const p = getPersonalInfoFromState(quizState);

  return (
    <Slide id="mentorship-program-intro" type="filler">
      <SlideHeading>Your Chart Analysis is complete!</SlideHeading>
      <SlideHeading mt={-4}>
        We will now create your personalized{" "}
        <Span>Astrological Self-Discovery Mentorship Program</Span> based on the result of the
        analysis
      </SlideHeading>

      <Box
        position={"relative"}
        bg="bg.200"
        p={4}
        borderRadius={"xl"}
        border="2px solid"
        borderColor={"brand.800"}
      >
        <Flex bg="white" position={"absolute"} bottom={8} right={4} borderRadius={"xl"}>
          <NatalChart
            date={p.yourBirthDate}
            time={p.yourBirthTime}
            location={p.yourBirthLocation}
            size={240}
          />
        </Flex>
        <StaticImage
          alt="chart showing how your self-esteem will increase over time"
          src="../../images/program_preview.png"
          width={200}
          layout="fixed"
          style={{ borderRadius: 16 }}
        />
      </Box>
      <NextButton mt={8}>Create My Program</NextButton>
    </Slide>
  );
}

export function InsightVsHoroscopeComparison() {
  return (
    <Slide id="insight-vs-horoscope" type="filler">
      <SlideHeading>
        Take a look at the insight that Sarah received,{" "}
        <Text as="span" color="brand.600">
          the difference is huge
        </Text>
      </SlideHeading>

      <Box mb={4}>
        <Text mb={2} color="gray.200">
          Regular horoscope based on zodiac
        </Text>
        <RegularHoroscope />
      </Box>

      <Box>
        <Text mb={2} color="brand.600" fontWeight={"bold"}>
          Personalized Astrology Insight
        </Text>
        <PersonalisedInsight />
      </Box>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

function RegularHoroscope() {
  return (
    <Box bg="gray.400" px={3} py={2} borderRadius={"lg"}>
      <Text fontSize={"2xs"}>
        Today,{" "}
        <Text as="span" fontWeight={"bold"}>
          Aquarius
        </Text>
        , you might find yourself at a crossroads, feeling an urge for change. Social interactions
        and teamwork are highlighted. It's a good day to explore new ideas and maybe even challenge
        the status quo. However, be mindful of potential conflicts with authority figures.
      </Text>
    </Box>
  );
}
function PersonalisedInsight() {
  const theme = useTheme();

  return (
    <Stack
      bg="white"
      p={2}
      pb={0}
      borderTopRadius={"lg"}
      fontSize={"2xs"}
      whiteSpace={"pre-wrap"}
      position={"relative"}
      overflow={"hidden"}
      fontStyle={"italic"}
    >
      <Flex
        flexDirection={"column"}
        borderTopRadius={"lg"}
        border={`1px solid ${theme.colors.gray[300]}`}
        px={3}
        py={3}
        gap={5}
      >
        <Box
          position={"absolute"}
          bottom={0}
          left={0}
          width={"full"}
          height={200}
          bgGradient={"linear(to-t, bg.50, transparent)"}
        />

        <Text fontWeight={"semibold"} fontSize={"14px"} fontStyle={"normal"}>
          Good morning, Sarah!
        </Text>

        <Text>
          I trust you're feeling inspired and ready to make the most of today's opportunities.
          Drawing from our previous conversations and your unique astrological profile, I've crafted
          insights specifically tailored to support you today.
        </Text>

        <Stack spacing={1}>
          <Text color="black" fontStyle="normal" fontWeight={"bold"} fontSize={"11px"}>
            Overview 🔮
          </Text>

          <Text>
            Today is a day of profound transformation, especially in your career sphere. The cosmos
            is urging you to embrace change and use your innovative Aquarius spirit to navigate
            through.
          </Text>
        </Stack>

        <Stack spacing={1}>
          <Text color="black" fontStyle="normal" fontWeight={"bold"} fontSize={"11px"}>
            Emotional Landscape 🧘
          </Text>

          <Text>
            Moon in Scorpio: Expect deep emotional revelations that could lead to significant shifts
            in how you approach your professional life.
            <br />
            <br />
            <Span color="pink.600">Actions to take:</Span> Dive into these emotions; they're the key
            to understanding what changes need to be made. opportunities on the horizon.
          </Text>
        </Stack>

        <Stack spacing={1}>
          <Text color="black" fontStyle="normal" fontWeight={"bold"} fontSize={"11px"}>
            Career Dynamics 💼
          </Text>

          <Text>
            Mars in the 10th House: Your ambition is at an all-time high, pushing you towards
            assertive action in your career.
            <br />
            <br />
            <Span color="pink.600">Actions to take:</Span> Leverage your unique ideas for a
            breakthrough. Be prepared for power struggles with authority figures; use your intuition
            to navigate these.
          </Text>
        </Stack>

        <Stack spacing={1}>
          <Text color="black" fontStyle="normal" fontWeight={"bold"} fontSize={"11px"}>
            Personal Growth 🌱
          </Text>

          <Text>
            Transformation is your theme today. Embrace it, and let it guide you toward your next
            big achievement. Innovation is your best friend. Your ability to think outside the box
            is what will lead you to success.
          </Text>
        </Stack>

        <Stack spacing={1}>
          <Text color="black" fontStyle="normal" fontWeight={"bold"} fontSize={"11px"}>
            Lucky Color & Number 🌟
          </Text>

          <Text>
            Color: Deep green 🟢 - symbolizing courage and power. Number: 22 - indicating
            significant changes
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}
