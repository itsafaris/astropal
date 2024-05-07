import React from "react";
import {
  Callout,
  QuizQuestionsState,
  Selector,
  Slide,
  useQuiz,
  useQuizActions,
  useQuizContext,
  useQuizState,
} from "@martynasj/quiz-lib";

import { Caption, NextButton, SlideHeading, Span } from "../components";
import { StaticImage } from "gatsby-plugin-image";
import {
  Container,
  Flex,
  Text,
  Box,
  Card,
  Stack,
  Tag,
  TagLeftIcon,
  TagLabel,
  Progress,
  Grid,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { Headline, InvertedHighlight } from "@components/summary/components";
import { FaArrowDown } from "react-icons/fa";
import { useUserProfileState } from "src/appState";
import { QuizStateParsed, getTypedQuizState, getZodiacFromState } from "@utils/state";
import {
  convertUserFromAnonymous,
  createNatalChartReading,
  createNewUserProfile,
  updateUserProfile,
} from "@utils/coreApi";
import { useEffect, useState } from "react";

import { ZodiacSignDataType } from "@services/zodiacService";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import posthog from "posthog-js";
import { trackPixel } from "@utils/tracking";
import { ZodiacTitleHeader } from "@components/AstrologicalProfile";
import { BsChevronRight } from "react-icons/bs";

export function YourGenderSlide() {
  return (
    <Slide
      id="your-gender"
      type="single"
      variant="picture"
      size="medium"
      label=""
      options={[
        {
          text: "Female",
          imgComponent: (
            <StaticImage
              alt="image of a female"
              src="../../../images/female.png"
              placeholder="blurred"
              style={{ borderRadius: "8px" }}
              height={140}
            />
          ),
        },
        {
          text: "Male",
          imgComponent: (
            <StaticImage
              alt="image of a male"
              src="../../../images/male.png"
              placeholder="blurred"
              style={{ borderRadius: "8px" }}
              height={140}
            />
          ),
        },
      ]}
    >
      <Container>
        <Flex flexDirection={"column"} gap={2}>
          <Flex flexDirection={"row"} justifyContent={"center"}>
            <Flex
              borderRadius={"full"}
              overflow={"hidden"}
              height={"150px"}
              width={"150px"}
              boxShadow={"inset 0 0 50px 0 #ffc9001f, 0 0 50px 0 #ffc9002b"}
              position={"relative"}
            >
              <StaticImage
                src={`../../../images/partner-3.png`}
                alt="Option - in relationship"
                placeholder="none"
                width={140}
                height={140}
                layout="fixed"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  border: `1px solid #e4b382`,
                  borderRadius: "50%",
                }}
              />

              <StaticImage
                style={{ opacity: 1, position: "absolute", top: 0, left: 0, zIndex: 0 }}
                alt=""
                src="../../../images/astro-avatar.png"
                width={170}
                height={170}
              />
            </Flex>
          </Flex>

          <Headline fontSize={"3xl"} my={4}>
            <InvertedHighlight>
              Experience the Most Accurate Personalized Astrology
            </InvertedHighlight>
          </Headline>

          <Flex flexDirection={"column"} alignItems={"center"} gap={2} mb={4}>
            <Text mt={5} fontSize={"md"} fontWeight={"bold"} textAlign={"center"}>
              Choose your gender to get started
            </Text>
            <FaArrowDown />
          </Flex>
        </Flex>
      </Container>

      <Selector />
    </Slide>
  );
}

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
        alt="Astropal - pencil drawing of an astrological clock"
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
  const [userProfile, setUserProfile] = useUserProfileState();

  const p = getTypedQuizState(quizState);

  async function createUser(p: QuizStateParsed) {
    setUserProfile({ isLoading: true, result: undefined, error: undefined });
    createNewUserProfile(p)
      .then((result) => {
        setUserProfile({ isLoading: false, error: undefined, result });
        submitQuestion();
        // this does not need to be awaited, it's only for the backend to make things quicker to appear
        void createNatalChartReading({ userID: result.id });
      })
      .catch((err) => {
        console.error(err);
        setUserProfile({ isLoading: false, error: err, result: undefined });
      });
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
      <NextButton
        isLoading={userProfile.isLoading}
        isDisabled={!!userProfile.error}
        onClick={() => {
          const r = checkQuestion();
          if (!r) {
            return;
          }

          void createUser(p);
        }}
      >
        Continue
      </NextButton>
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

export function NatalChartSlide() {
  return (
    <Slide id="natal-chart" type="filler">
      <NatalChartSlide_ />
    </Slide>
  );
}

function NatalChartSlide_() {
  const { quizState } = useQuizState();
  const actions = useQuizActions();

  const p = getTypedQuizState(quizState);
  const zodiac = getZodiacFromState(p);

  return (
    <Flex flexDirection={"column"} position={"relative"} width={"full"}>
      <SlideHeading>Here's a sneak peek into your cosmic identity</SlideHeading>

      <PersonalityReading state={zodiac} quizState={quizState} />

      <NextButton
        onClick={() => {
          actions.submitQuestion();
        }}
        my={8}
      >
        Continue
      </NextButton>
    </Flex>
  );
}

function PersonalityReading({
  state,
  quizState,
}: {
  state: ZodiacSignDataType;
  quizState: QuizQuestionsState;
}) {
  const p = getTypedQuizState(quizState);
  return (
    <Card
      bg="bg.50"
      px={4}
      py={4}
      boxShadow={`0 0 100px 20px #7bb4d859`}
      border="1px solid"
      borderColor={"gray.500"}
    >
      <ZodiacTitleHeader quizState={p} mb={4} />

      <Stack my={4}>
        <Grid templateColumns={"1fr auto 1fr"} mb={4}>
          <Flex gap={2} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            <Text textAlign={"center"} fontWeight={"semibold"}>
              Your strengths
            </Text>
            {state.strengths.map((str, idx) => {
              return (
                <Tag size={"md"} fontWeight={"bold"} key={str} variant="solid" colorScheme="green">
                  <TagLeftIcon boxSize="12px" as={AddIcon} />
                  <Text textAlign={"center"} py={1}>
                    {str}
                  </Text>
                </Tag>
              );
            })}
          </Flex>
          <Divider orientation="vertical" mx={3} color={"black"} borderColor={"black"} />
          <Flex gap={2} flexWrap={"wrap"} justifyContent={"center"} alignItems={"center"}>
            <Text textAlign={"center"} fontWeight={"semibold"}>
              Your weaknesses
            </Text>
            {state.weaknesses.map((str, idx) => {
              return (
                <Tag size={"md"} fontWeight={"bold"} key={str} variant="solid" colorScheme="red">
                  <TagLeftIcon boxSize="12px" as={MinusIcon} />
                  <Text textAlign={"center"} py={1}>
                    {str}
                  </Text>
                </Tag>
              );
            })}
          </Flex>
        </Grid>

        <Flex fontSize={"md"} fontWeight={"normal"}>
          {state.personality}
        </Flex>
      </Stack>
    </Card>
  );
}

export function Loading_NatalChart() {
  return (
    <Slide id="natal-chart-loading" type="filler">
      <Loading_NatalChart_ />
    </Slide>
  );
}

function Loading_NatalChart_() {
  const [loadedValue, setLoadedValue] = useState(0);

  useEffect(() => {
    const it = setInterval(() => {
      setLoadedValue((v) => {
        if (v === 100) {
          clearInterval(it);
          return 100;
        }
        return v === 100 ? 100 : v + 1;
      });
    }, 40);

    return () => {
      clearInterval(it);
    };
  }, []);

  function renderStatusText() {
    if (loadedValue <= 0) {
      return "";
    }

    if (loadedValue <= 30) {
      return "Acquiring natal data";
    }

    if (loadedValue <= 60) {
      return "Calculating your chart";
    }

    if (loadedValue < 100) {
      return "Creating cosmic identity";
    }

    if (loadedValue === 100) {
      return "Done";
    }
  }

  return (
    <>
      <SlideHeading>Hold on while we calculate your cosmic identity</SlideHeading>
      <Callout title="What's a cosmic identity?">
        It's a unique astrological <Span whiteSpace={"nowrap"}>🌌 map</Span> that outlines the
        positions of the <Span whiteSpace={"nowrap"}>🪐 planets</Span> and{" "}
        <Span whiteSpace={"nowrap"}>⭐ stars</Span> at the exact moment and location of your birth,
        shaping your personality, potential, and life path.
      </Callout>

      <Text fontSize="sm" fontWeight={"semibold"} mb={2}>
        {renderStatusText()}
      </Text>
      <Progress
        value={loadedValue}
        size="sm"
        colorScheme={loadedValue === 100 ? "green" : "bg"}
        borderRadius={"full"}
      />
      <Text
        fontWeight={"semibold"}
        color={loadedValue === 100 ? "text.main" : "text.300"}
        fontSize={"sm"}
        mt={2}
      >
        {loadedValue === 100 ? "Cosmic identity is ready" : `${loadedValue} / 100`}
      </Text>

      {loadedValue === 100 && <NextButton my={8}>Continue</NextButton>}
    </>
  );
}

export function Loading_SavingAstrologerPreferences() {
  const [showInput, setShowInput] = useState<boolean>(false);

  return (
    <Slide
      id="saving-preferences"
      type="loading"
      duration={3}
      onLoadingCompleted={() => setShowInput(true)}
      statusText={"creating..."}
    >
      <SlideHeading>Creating your personal astrologer</SlideHeading>

      <Flex flexDirection={"column"} alignItems={"center"}>
        <Box my={5}>
          <Selector />
        </Box>

        {showInput && <NextButton mb={5}>Continue</NextButton>}
      </Flex>
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
        { text: "Love, Family & Relationships", icon: "💞", value: "relationships" },
        { text: "Career, Finance & Education", icon: "💼", value: "career" },
        { text: "Health & Mental Wellbeing", icon: "💚", value: "wellbeing" },
        { text: "Growth & Self-Discovery", icon: "🧘", value: "personality" },
        { text: "Decision Making & Future Planning", icon: "🤔", value: "decision-making" },
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

  return (
    <Slide id="unique-gift-uncovered" type="filler">
      <SlideHeading>
        Astrologer has identified numerous natural hidden gifts and talents in your profile 🫶
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

export function EmailSlide() {
  return (
    <Slide id="your-email" type="email" placeholder="Enter your email">
      <EmailSlide_ />
    </Slide>
  );
}

type RequestStatus = {
  isLoading: boolean;
  error?: any;
};

function EmailSlide_() {
  const { submitQuestion } = useQuiz();
  const quizState = useQuizContext();

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({ isLoading: false });
  const [userProfile] = useUserProfileState();

  function redirectToApp(input: { userID: string; question: string }) {
    const params = new URLSearchParams();
    params.append("userID", input.userID);
    params.append("onboardingQuestion", input.question);
    const url = `${process.env.GATSBY_WEBAPP_URL}/onboarding?${params.toString()}`;
    location.href = url;
  }

  return (
    <>
      <SlideHeading color="text.main" mb={4}>
        Before we proceed to your astrologer, enter your email so we can identify you in the future
        💌
      </SlideHeading>

      <StaticImage
        alt="image of the astrological map"
        src="../../../images/astrologer_planets.png"
        placeholder="blurred"
        style={{ borderRadius: "8px", margin: "0 auto" }}
        layout="fixed"
        height={140}
      />

      <Selector mt={4} mb={2} />

      <Caption mt={0} mb={7} fontSize={"xs"}>
        🔒 We respect your privacy and protect your personal data. We will use your email to
        identify you and send personalized astrological insights.
      </Caption>

      {requestStatus.error && <Text>{String(requestStatus.error)}</Text>}

      <NextButton
        isLoading={requestStatus.isLoading}
        onClick={async () => {
          const result = submitQuestion();
          // validation failed
          if (!result) {
            return;
          }

          const parsedQuizState = getTypedQuizState(quizState);

          posthog.identify(parsedQuizState.email);
          trackPixel("Lead", {});

          if (!userProfile) {
            return;
          }

          setRequestStatus({ isLoading: true });
          try {
            await convertUserFromAnonymous({
              userID: userProfile.result!.id,
              email: parsedQuizState.email,
            });
            setRequestStatus({ isLoading: false });
          } catch (err) {
            setRequestStatus({ isLoading: false, error: err });
            return;
          }

          // const zodiac = getZodiacFromState(parsedQuizState);

          redirectToApp({
            userID: userProfile.result!.id,
            // question: zodiac.onboardingQuestion
            question: "What is the most significant natural gift highlighted in my birth chart?",
            // question: "Which single and most powerful talent is indicated by my birth chart?",
          });
        }}
      >
        Go to your astrologer <Icon as={BsChevronRight} ml={4} fontSize={"md"} />
      </NextButton>
    </>
  );
}
