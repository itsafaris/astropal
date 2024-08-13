import { Box, Flex, Icon, keyframes, Text } from "@chakra-ui/react";
import { Caption, NextButton, SlideHeading, Span } from "@components/quizpage/components";
import { useSiteMetadata } from "@hooks/useSiteMetadata";
import { Selector, Slide, useQuiz, useQuizContext } from "@martynasj/quiz-lib/index";
import { getTypedQuizState } from "@utils/state";
import { trackPixel } from "@utils/tracking";
import { Link, navigate } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import posthog from "posthog-js";

import { GiCrossedAirFlows, GiEarthSpit, GiFire, GiWaterSplash } from "react-icons/gi";

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
        In physiognomy, everyone has both masculine and feminine traits. Knowing your's will lead to
        a more accurate reading.
      </Text>

      <Box px={8} mt={8}>
        <Selector />
      </Box>
    </Slide>
  );
}

export function YourBirthDateSlide() {
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
      <NextButton>Continue</NextButton>
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
        { text: "Health & Vitality", icon: "🧘", value: "health" },
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
        We've helped 124,327 men with <Span fontWeight={"bold"}>Aquarius</Span> Sun sign gain
        insights into their intelect and decision making. We can't wait to do the same for you!
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
function EmailSlide_() {
  const { submitQuestion } = useQuiz();
  const quizState = useQuizContext();
  const meta = useSiteMetadata();

  return (
    <Flex height={"100%"} position={"relative"} flexDirection={"column"}>
      <SlideHeading color="text.main" mb={8} textAlign={"center"} fontWeight={"bold"}>
        Ready for insights into your love, life, and emotions?
      </SlideHeading>

      <Text>
        <Span fontWeight={"bold"}>Share* your email</Span> so you don't lose all your information
      </Text>

      <Selector mt={4} mb={2} />

      <Caption mt={0} mb={7} fontSize={"xs"}>
        *{meta.brandName} does not share any personal information. We'll email you a copy of your
        program for convenient access.
      </Caption>

      <NextButton
        onClick={async () => {
          const result = submitQuestion();
          // validation failed
          if (!result) {
            return;
          }

          const parsedQuizState = getTypedQuizState(quizState);

          posthog.identify(parsedQuizState.email);
          trackPixel("Lead", {});

          navigate("/face-reading/summary");
        }}
      >
        Continue
      </NextButton>

      <Text position={"sticky"} fontSize={"xs"} mt={8} textAlign={"center"}>
        By continuing, I agree to {meta.brandName}'s{" "}
        <Link to="/privacy-policy">Privacy policy</Link> and{" "}
        <Link to="/terms-and-conditions">Terms & Conditions</Link>
      </Text>
    </Flex>
  );
}
