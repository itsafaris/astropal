import React from "react";
import {
  Callout,
  Selector,
  Slide,
  useQuiz,
  useQuizActions,
  useQuizState,
  useSlide,
} from "@martynasj/quiz-lib";

import { NextButton, SlideHeading } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import { Flex, Text, Box, Grid, Button } from "@chakra-ui/react";
import { QuizStateParsed, getTypedQuizState } from "@utils/state";
import { createNewUserProfile } from "@utils/coreApi";
import { astrologers, getAstrologerOrDefault } from "@utils/astrologers";

export function YourBirthTimeSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      <SlideHeading text="What is your birth hour?" mb={2} />

      <Selector />

      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>

      <StaticImage
        alt="Intuvist - pencil drawing of an astrological clock"
        layout="fixed"
        placeholder="blurred"
        height={180}
        style={{ margin: "0 auto" }}
        src="../../../images/clock_pencil.png"
      />
    </Slide>
  );
}

export function YourBirthPlaceSlide() {
  return (
    <Slide id="your-birth-place" type="location" placeholder="Start typing to search">
      <YourBirthPlaceSlide_ />
    </Slide>
  );
}

function YourBirthPlaceSlide_() {
  const { checkQuestion, submitQuestion } = useQuiz();
  const { quizState } = useQuizState();
  const slide = useSlide();
  const actions = useQuizActions();

  const p = getTypedQuizState(quizState);

  async function createUser(p: QuizStateParsed) {
    createNewUserProfile(p)
      .then(() => {
        submitQuestion();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function submit() {
    const r = checkQuestion();
    if (!r) {
      return;
    }

    void createUser(p);
  }

  return (
    <>
      <SlideHeading mb={2} text="Where were you born?" />
      <StaticImage
        src="../../../images/city_skyline_pencil.png"
        alt="pencil drawing of a city skyline"
        layout="fixed"
        placeholder="blurred"
        height={180}
        style={{ margin: "0 auto 16px" }}
      />

      <Selector mb={3} />
      <Callout mb={8}>
        💡 If you're unsure of the exact location, enter a nearby major city.
      </Callout>
      <NextButton onClick={submit}>Continue</NextButton>

      <Button
        mt={8}
        px={6}
        variant={"link"}
        colorScheme="brand"
        width={"full"}
        onClick={() => {
          // Sets the default location which is the center of USA
          actions.setLocationValue(slide.id, {
            formattedText: "",
            lat: 39.7508287,
            long: -101.532943,
            placeID: "323203125123",
          });

          submit();
        }}
      >
        I don't know
      </Button>
    </>
  );
}

export function YourBirthDateSlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-date" type="date">
      <SlideHeading mb={2}>What is your date of birth?</SlideHeading>
      <StaticImage
        alt="Pencil drawing, calendar sheet"
        layout="fixed"
        height={180}
        style={{ margin: "0 auto" }}
        placeholder="blurred"
        src="../../../images/calendar_pencil.png"
      />
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

export function AreasOfInterestSlide() {
  return (
    <Slide
      id="areas-of-interest"
      type="multi"
      variant="list"
      label="Choose one or more"
      options={[
        {
          text: "Love, Family & Relationships",
          icon: "💞",
          value: "relationships",
        },
        { text: "Career, Finance & Education", icon: "💼", value: "career" },
        { text: "Health & Mental Wellbeing", icon: "💚", value: "wellbeing" },
        { text: "Growth & Self-Discovery", icon: "🧘", value: "personality" },
        {
          text: "Decision Making & Future Planning",
          icon: "🤔",
          value: "decision-making",
        },
        { text: "Relocation & Travel", icon: "🏡", value: "exploration" },
      ]}
    >
      <SlideHeading>Which areas interest you most?</SlideHeading>
      <Callout title="💡 Why this matters?">
        You will receive increased attention from your personal astrologer on these areas.
      </Callout>
      <Selector />
      <NextButton>Continue</NextButton>
    </Slide>
  );
}

export function AstrologicalKnowledgeLevelSlide() {
  return (
    <Slide
      id="astro-knowledge-level"
      type="single"
      variant="list"
      label="Select one"
      options={[
        { text: "I'm new to astrology", icon: "🌙", value: "beginner" },
        { text: "I know a few things", icon: "🌗", value: "intermediate" },
        { text: "I'm an expert", icon: "🌕", value: "advanced" },
      ]}
    >
      <SlideHeading>What's your level of astrological knowledge?</SlideHeading>
      <Selector />
    </Slide>
  );
}

export function MajorLifeEventsSlide() {
  return (
    <Slide
      id="major-life-events"
      type="multi"
      variant="list"
      direction="row"
      size="small"
      label="Choose one or more"
      options={[
        { text: "Graduation", icon: "🎓", value: "graduation" },
        { text: "First Job", icon: "💼", value: "firstjob" },
        { text: "Marriage", icon: "💍", value: "marriage" },
        { text: "Birth of Child", icon: "👶", value: "birthofchild" },
        { text: "Buying a Home", icon: "🏠", value: "buyingahome" },
        { text: "Starting a Business", icon: "🏢", value: "startingabusiness" },
        { text: "Career Change", icon: "🔄", value: "careerchange" },
        { text: "Retirement", icon: "🏖️", value: "retirement" },
        { text: "Divorce", icon: "💔", value: "divorce" },
        { text: "Significant Loss", icon: "🕊️", value: "significantloss" },
        { text: "Major Travel", icon: "✈️", value: "majortravel" },
      ]}
    >
      <SlideHeading>Which events had the biggest impact in your lifetime?</SlideHeading>
      <Selector />
      <NextButton>Continue</NextButton>
    </Slide>
  );
}

export function RelationshipStatusSlide() {
  return (
    <Slide
      id="relationship-status"
      type="single"
      variant="list"
      label="Select one"
      options={[
        { text: "Single", icon: "🧍", value: "single" },
        { text: "Dating", icon: "💏", value: "dating" },
        { text: "Committed", icon: "💖", value: "committed" },
        { text: "Engaged", icon: "💍", value: "engaged" },
        { text: "Married", icon: "💒", value: "married" },
      ]}
    >
      <SlideHeading>What is your current relationship status?</SlideHeading>
      <Callout title="💡 Why this matters?">
        Understanding your relationship status helps us offer insights tailored to your love life.
      </Callout>
      <Selector />
    </Slide>
  );
}

export function YourNameSlide() {
  return (
    <Slide id="name-slide" type="short-text" placeholder="E.g. Jane" optional>
      <NameSlideContent />
    </Slide>
  );
}

function NameSlideContent() {
  const { submitQuestion } = useQuiz();

  return (
    <>
      <SlideHeading>How should we call you?</SlideHeading>
      <StaticImage
        alt="image of a unisex face"
        src="../../../images/unisex_face.png"
        placeholder="blurred"
        style={{ borderRadius: "100%", margin: "0 auto" }}
        height={200}
        layout="fixed"
      />
      <Selector mt={4} />
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Continue
      </NextButton>
    </>
  );
}

export function ChooseAstrologerSlide() {
  return (
    <Slide
      id="choose-astrologer"
      type="single"
      variant="picture"
      size="medium"
      options={astrologers.map((a) => ({
        imgComponent: a.imgComponent,
        value: a.id,
        text: a.name,
      }))}
    >
      <SlideHeading>Choose your AI astrologer</SlideHeading>
      <Callout>
        💬 Each Astrologer offers a unique communication style, but they are all of the same level
        of expertise
      </Callout>
      <Selector />
    </Slide>
  );
}

export function QuoteSlide() {
  return (
    <Slide id="quote" type="filler">
      <StaticImage
        alt="famous astrology quote"
        src="../../../images/person-in-doubt.png"
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

export function UniqueGiftSlideUncovered() {
  const { quizState } = useQuizState();
  const q = getTypedQuizState(quizState);
  const astrologer = getAstrologerOrDefault(q.astrologerID);

  return (
    <Slide id="unique-gift-uncovered" type="filler">
      <SlideHeading>
        {astrologer.name} has identified numerous natural hidden gifts and talents in your profile 🫶
      </SlideHeading>

      <Box bg="white.400" borderRadius={"xl"} p={2} boxShadow={"xl"} mb={4}>
        <Box
          bg="gray.50"
          boxShadow={"inner"}
          p={2}
          border="1px solid"
          borderColor={"white"}
          borderRadius={"xl"}
        >
          <Flex flexDirection={"row"} alignItems={"center"} mr="auto" justifyContent={"center"}>
            <Text fontSize={32}>💛</Text>
            <Text
              fontSize={82}
              fontWeight={"bold"}
              textAlign={"center"}
              color="orange.500"
              mx="16px"
            >
              7
            </Text>
            <Text fontSize={32}>💛</Text>
          </Flex>
          <Text textAlign={"center"} fontWeight={"semibold"} mt={0} mb={8}>
            Natural Gifts
          </Text>
        </Box>
      </Box>

      <NextButton mt={4}>Explore your gifts</NextButton>
    </Slide>
  );
}
