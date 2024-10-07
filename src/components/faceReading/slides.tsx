import { Box, Flex, Icon, keyframes, Text } from "@chakra-ui/react";
import * as Sentry from "@sentry/gatsby";
import { NextButton, SlideHeading, Span } from "@components/quizpage/components";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import {
  Selector,
  Slide,
  useQuiz,
  useQuizActions,
  useQuizContext,
  useQuizState,
} from "@martynasj/quiz-lib/index";
import { convertUserFromAnonymous, eden } from "@utils/coreApi";
import { trackPixel } from "@utils/tracking";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import posthog from "posthog-js";

import { GiCrossedAirFlows, GiEarthSpit, GiFire, GiWaterSplash } from "react-icons/gi";
import { getTypedQuizState, getZodiacFromState, QuizStateTyped } from "./quizState";
import { useGlobalState2, useGlobalUpdate2 } from "@components/wrappers/RootWrapper";
import { useState } from "react";

const PULSE_ANIMATION_2 = keyframes`
  0% { box-shadow: 0 0 0 0px #805ad5; }
  100% { box-shadow: 0 0 0 30px rgba(0, 0, 0, 0); }; }
`;

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
          styleProps: {
            bg: "purple.50",
            color: "black",
            animation: `${PULSE_ANIMATION_2} 1.5s ease-in-out  infinite`,
            px: 1,
            py: 1,
            outline: "4px solid",
            outlineColor: "purple.500",
          },
          imgComponent: (
            <StaticImage
              alt="image of a female"
              src="../../images/female.png"
              placeholder="blurred"
              style={{ borderRadius: "8px" }}
              height={140}
            />
          ),
        },
        {
          text: "Male",
          styleProps: {
            bg: "purple.50",
            color: "black",
            animation: `${PULSE_ANIMATION_2} 1.5s ease-in-out  infinite`,
            px: 1,
            py: 1,
            outline: "4px solid",
            outlineColor: "purple.500",
          },
          imgComponent: (
            <StaticImage
              alt="image of a male"
              src="../../images/male.png"
              placeholder="blurred"
              style={{ borderRadius: "8px" }}
              height={140}
            />
          ),
        },
      ]}
    >
      <SlideHeading fontSize={"md"} fontWeight={"semibold"} textAlign={"center"}>
        Choose your gender to start
      </SlideHeading>

      <Text textAlign={"center"}>
        In face reading, everyone has both masculine and feminine traits. Knowing your's will lead
        to a more accurate reading.
      </Text>

      <Box px={8} mt={8}>
        <Selector />
      </Box>
    </Slide>
  );
}

export function YourBirthDateSlide() {
  const { submitQuestion, checkQuestion } = useQuizActions();
  const { quizState } = useQuizState();
  const [userProfile, setUserProfile] = useState<{
    isLoading?: boolean;
    result?: { id: string } | null;
    error?: any;
  }>({});
  const update = useGlobalUpdate2();

  const typedState = getTypedQuizState(quizState);

  async function createUser(input: QuizStateTyped) {
    setUserProfile({ isLoading: true, result: undefined, error: undefined });

    eden("/createNewUser", {
      method: "POST",
      body: {
        gender: input.yourGender as any,
        current_tz_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dob_local_year: input.yourBirthDate.year,
        dob_local_month: input.yourBirthDate.month - 1,
        dob_local_date: input.yourBirthDate.day,
        dob_local_hour: input.yourBirthTime.time24.hour,
        dob_local_minute: input.yourBirthTime.time24.minute,
        birth_place_place_id: input.yourBirthLocation.placeID,
        birth_place_formatted_text: input.yourBirthLocation.formattedText,
        birth_place_lat: input.yourBirthLocation.lat,
        birth_place_lng: input.yourBirthLocation.long,
      },
    })
      .then((result) => {
        if (!result.data) {
          return;
        }
        update((s) => ({ ...s, userProfile: result.data }));
        submitQuestion();
      })
      .catch((err) => {
        console.error(err);
        setUserProfile({ isLoading: false, error: err, result: undefined });
      });
  }

  function submit() {
    const r = checkQuestion();
    if (!r) {
      return;
    }

    void createUser(typedState);
  }

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
        isLoading={userProfile.isLoading}
        isDisabled={!!userProfile.error}
        onClick={submit}
      >
        Continue
      </NextButton>
    </Slide>
  );
}

export function FillerFaceInformation() {
  return (
    <Slide id="filler-face-info" type="filler">
      <StaticImage
        src="../../images/3dface.png"
        alt="3d face physiogonomy"
        style={{ maxWidth: 240, margin: "0 auto" }}
        width={240}
      />
      <Text textAlign={"center"} mt={2}>
        Your face holds a wealth of information about your fate and personality
      </Text>
      <Selector />
      <NextButton>Continue</NextButton>
    </Slide>
  );
}

export function LifeArea() {
  return (
    <Slide
      id="life-area"
      type="single"
      variant="list"
      label="Choose one or more"
      options={[
        { text: "Love & Relationships", icon: "💏", value: "relationships" },
        { text: "Health & Vitality", icon: "🧘", value: "wellbeing" },
        { text: "Career & Destiny", icon: "💼", value: "career" },
      ]}
    >
      <SlideHeading>
        Which aspects of life do you wish to gain insights into with face reading?
      </SlideHeading>
      <Selector />
    </Slide>
  );
}

export function ElementSlide() {
  return (
    <Slide
      id="element"
      type="single"
      variant="list"
      label="Choose one or more"
      options={[
        { text: "Earth", icon: <Icon fontSize={"2xl"} as={GiEarthSpit} /> },
        { text: "Water", icon: <Icon fontSize={"2xl"} as={GiWaterSplash} /> },
        { text: "Fire", icon: <Icon fontSize={"2xl"} as={GiFire} /> },
        { text: "Air", icon: <Icon fontSize={"2xl"} as={GiCrossedAirFlows} /> },
      ]}
    >
      <SlideHeading>Which element resonates with you the most?</SlideHeading>
      <Selector />
    </Slide>
  );
}

export function DecisionMaking() {
  return (
    <Slide
      id="decision-making"
      type="single"
      variant="list"
      label="Choose one or more"
      options={[
        { text: "Heart", icon: "💛" },
        { text: "Head", icon: "🧠" },
        { text: "Both", icon: "🤝" },
      ]}
    >
      <SlideHeading>Do you make decisions with your head or heart?</SlideHeading>
      <Selector />
    </Slide>
  );
}

export function LoadingSimilarPeople() {
  const { quizState } = useQuizState();
  const typed = getTypedQuizState(quizState);
  const zodiac = getZodiacFromState(typed);

  return (
    <Slide
      id="loading-similar-people"
      type="loading"
      variant="linear"
      statusText={"Connecting to database..."}
      autoProceed
      duration={6}
    >
      <Text textAlign={"center"} mt={2}>
        We've helped 124,327 {typed.yourGender === "female" ? "women" : "men"} with{" "}
        <Span fontWeight={"bold"} textTransform={"capitalize"}>
          {zodiac.name}
        </Span>{" "}
        Sun sign gain insights into their intelect and decision making. We can't wait to do the same
        for you!
      </Text>
      <Text mt={4} fontSize={"sm"} textAlign={"center"}>
        * as of April, 2024
      </Text>
      <Selector mt={8} />
      {/* <NextButton>Continue</NextButton> */}
    </Slide>
  );
}

export function FaceDescription() {
  return (
    <Slide
      id="decision-making"
      type="single"
      variant="list"
      label="Choose one or more"
      options={[
        { text: "Heart", icon: "💛" },
        { text: "Head", icon: "🧠" },
        { text: "Both", icon: "🤝" },
      ]}
    >
      <SlideHeading>Do you make decisions with your head or heart?</SlideHeading>
      <Selector />
      <NextButton>Continue</NextButton>
    </Slide>
  );
}

export function IntroToScan() {
  return (
    <Slide id="intro-to-scan" type="filler">
      <StaticImage src="../../images/face_scan.png" alt="face reading features" />
      <SlideHeading textAlign={"center"} fontWeight={"bold"} mt={4} mb={4}>
        Let's scan your face
      </SlideHeading>
      <Text>
        Follow the on-screen instructions, so we can analyze your face points and reveal your
        future, and the secrets of your destiny!
      </Text>
      <Selector />
      <NextButton>Let's do it</NextButton>
      <Text fontSize={"sm"} mt={4}>
        🔒 No biometric data is collected. All recognition processes are performed on your device.
      </Text>
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

  const [requestStatus, setRequestStatus] = useState<RequestStatus>({
    isLoading: false,
  });
  const quizState = useQuizContext();
  const meta = useSiteMetadata();
  const { userProfile } = useGlobalState2();

  return (
    <Flex height={"100%"} position={"relative"} flexDirection={"column"}>
      <SlideHeading color="text.main" mb={8} textAlign={"center"} fontWeight={"bold"}>
        Your Face Reading Awaits
      </SlideHeading>

      <Text fontSize={"lg"} textAlign={"center"}>
        Enter your email to get your advanced Face reading with Astropal
      </Text>

      <Selector mt={4} mb={2} />

      <NextButton
        onClick={async () => {
          const result = submitQuestion();
          // validation failed
          if (!result) {
            return;
          }

          setRequestStatus({ isLoading: true, error: null });

          const parsedQuizState = getTypedQuizState(quizState);

          posthog.identify(parsedQuizState.email);
          trackPixel("Lead");

          if (!userProfile) {
            console.error("no user profile created");
            return;
          }

          try {
            eden("/updateUserProfile", {
              method: "POST",
              body: {
                id: userProfile.id,
                // @ts-expect-error
                focus_area: parsedQuizState.focusArea,
              },
            });

            const res = await convertUserFromAnonymous({
              userID: userProfile.id,
              email: parsedQuizState.email,
            });

            if (res.error) {
              console.error(res.error);
            }
          } catch (err) {
            Sentry.captureException(err);
            setRequestStatus({ isLoading: false, error: String(err) });
            return;
          }

          setRequestStatus({ isLoading: false });

          navigate("/face-reading/paywall");
        }}
      >
        Continue
      </NextButton>

      <Text position={"sticky"} fontSize={"xs"} mt={8} textAlign={"center"}>
        {meta.brandName} ensures the confidentiality of your personal information. By clicking
        "Continue" you agree to {meta.brandName}'s' <Link to="/privacy-policy">Privacy policy</Link>{" "}
        and <Link to="/terms-and-conditions">Terms & Conditions</Link>
      </Text>
    </Flex>
  );
}
