import React from "react";
import { Selector, Slide, useQuiz, useQuizState } from "@martynasj/quiz-lib";
import { Flex, Grid, Text } from "@chakra-ui/react";
import { NextButton, SlideHeading, Span } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { getTypedQuizState, getZodiacFromState } from "@utils/state";
import { toTitleCase } from "@utils/string";
import { astrologyThemes } from "@utils/astrologyThemes";
import { updateUserProfile } from "@utils/coreApi";
import { useUserProfileState } from "src/appState";

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
    <Slide id="name-slide" type="short-text" placeholder="E.g. Jane">
      <NameSlideContent />
    </Slide>
  );
}

function NameSlideContent() {
  const [userProfile] = useUserProfileState();
  const { submitQuestion } = useQuiz();
  const { quizState } = useQuizState();

  const p = getTypedQuizState(quizState);

  function updateUserProf() {
    if (!userProfile.result) {
      console.error("User profile has not been created");
      return;
    }

    void updateUserProfile({ userID: userProfile.result.id, quizState: p }).catch((err) => {
      console.error(err);
    });
  }

  return (
    <>
      <SlideHeading>How should we call you?</SlideHeading>
      <Selector />
      <NextButton
        isLoading={userProfile.isLoading}
        isDisabled={userProfile.error}
        onClick={() => {
          const r = submitQuestion();
          if (r) {
            updateUserProf();
          }
        }}
      >
        Continue
      </NextButton>
    </>
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
        const p = getTypedQuizState(quizState);
        const zodiac = getZodiacFromState(p);

        return (
          <>
            <SlideHeading>
              <Text as="span" color="#f65874">
                81% of {toTitleCase(zodiac.pluralName)} admit to having made at least 4 wrong major
                life decisions.
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
