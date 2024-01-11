import React, { Fragment, createElement, useState } from "react";
import { Callout, Selector, Slide, Title, useQuiz } from "@martynasj/quiz-lib";
import { Text, Box, useTheme, Flex, Image } from "@chakra-ui/react";
import { ArrowDownIcon, CheckIcon } from "@chakra-ui/icons";

import colorMap from "@images/color_map.png";
import orbGif from "@images/orb_animated_2.gif";

import { TestimonialCard } from "@components/testimonial";
import { StaticImage } from "gatsby-plugin-image";

import { getPersonalInfoFromState } from "@utils/state";
import { useQuizServiceWrapper } from "./quizServiceWrapper";

import { Caption, ChatBubble, NextButton, Span, Subtitle } from "./components";
import { NatalChartInterpreter } from "./interpreter";
import { navigate } from "gatsby";

export function YourGoalSlide() {
  return (
    <Slide
      id="your-goal"
      type="multi"
      variant="list"
      options={[
        {
          text: "Fix relationship problems",
          icon: "🔥",
        },
        {
          text: "Increase relationship satisfaction",
          icon: "💞",
        },
        {
          text: "Keep the current relationship",
          icon: "🤗",
        },
        {
          text: "Other",
          icon: "",
        },
      ]}
    >
      <Title>What are your primary goals regarding relationships?</Title>
      <Subtitle>
        Knowing your <Span>goal</Span> will allow us to provide more tailored advice to you.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

export function YourGenderSlide() {
  return (
    <Slide
      id="your-gender"
      type="single"
      variant="picture"
      size="small"
      options={[
        {
          text: "Female",
          imgComponent: (
            <StaticImage
              alt="image of a female"
              src="../../images/female.png"
              placeholder="blurred"
            />
          ),
        },
        {
          text: "Male",
          imgComponent: (
            <StaticImage alt="image of a male" src="../../images/male.png" placeholder="blurred" />
          ),
        },
        {
          text: "Other",
          imgComponent: (
            <StaticImage
              alt="image of a gender neutral"
              src="../../images/neutral.png"
              placeholder="blurred"
            />
          ),
        },
      ]}
    >
      <Title>Let's start with your gender</Title>
      <Subtitle>
        <Span>Gender</Span> is a key characteristic that allows us to provide a fine-tuned
        relationship guidance.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

export function YourBirthNameSlide() {
  return (
    <Slide
      id="your-birth-name"
      type="short-text"
      label="Your birth name"
      placeholder="e.g. John / Jessica"
    >
      <Title>What's your birth name?</Title>
      <Selector />
    </Slide>
  );
}

export function IntroSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro" type="filler">
      <ChatBubble
        text={`👋 Hey, nice to meet you!\n\nIn order to provide you with astrological insights, we need to create your Natal Chart first.`}
        instant={showInput}
        onFinishedTyping={() => {
          setTimeout(() => {
            setShowInput(true);
          }, 300);
        }}
      />
      {showInput && (
        <>
          <Callout emoji="What is a Natal Chart?">
            It's a personalized astrology map based on your birth moment, helping you understand
            your personality and life journey.
          </Callout>
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Let's do it
          </NextButton>
        </>
      )}
    </Slide>
  );
}

export function YourBirthDateSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-date" type="date">
      <ChatBubble
        text={"Let's start with your date of birth."}
        instant={showInput}
        onFinishedTyping={() => {
          setTimeout(() => {
            setShowInput(true);
          }, 300);
        }}
      />
      {showInput && <Selector />}
      {showInput && (
        <NextButton
          onClick={() => {
            submitQuestion();
          }}
        >
          Next
        </NextButton>
      )}
    </Slide>
  );
}

export function YourBirthTimeSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-time" type="time">
      {({ quizState }) => {
        return (
          <Fragment>
            <ChatBubble
              instant={showInput}
              text="What is the time you were born?"
              onFinishedTyping={() => {
                setShowInput(true);
              }}
            />
            {showInput && (
              <>
                <Callout emoji="Tip">
                  If you don't know the exact time, select just the approximate hour. You will
                  always be able to adjust it later
                </Callout>
                <Selector />
              </>
            )}
            {showInput && (
              <NextButton
                onClick={() => {
                  submitQuestion();
                }}
              >
                Next
              </NextButton>
            )}
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function YourBirthPlaceSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="your-birth-place" type="location" placeholder="e.g. New York">
      <ChatBubble
        text="Where were you born?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && (
        <>
          <Callout emoji="Tip">
            If you don't know the exact location, enter a major city near your location. You will be
            able to change it later if needed.
          </Callout>
          <Selector />
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Next
          </NextButton>
        </>
      )}
    </Slide>
  );
}

export function YourProfileSavingSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide id="your-profile-saving" type="loading" duration={4} autoProceed>
      <ChatBubble
        text="That's it! Now give me a moment to put all this information together to create your Natal Chart"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}

export function IntroToSecondPart() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro-to-second-part" type="filler">
      <ChatBubble
        text={`I'm glad to have helped you answer your first questions. How did you `}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Text color="bg.900" fontSize={"lg"} fontWeight={"bold"} textAlign={"center"} mb={6}>
            After this, you will be able to:
          </Text>
          <Flex
            flexDirection={"column"}
            gap={1}
            color="bg.700"
            mx={6}
            alignItems={"center"}
            mb={12}
          >
            <Text>+ Ask questions about any topic</Text>
            <Text>+ Receive super accurate reading</Text>
            <Text>+ Future predictions</Text>
          </Flex>
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}

export function DescribeYourNatalChart() {
  const [showInput, setShowInput] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const quiz = useQuiz();

  return (
    <Slide id="personality-description" type="filler">
      <ChatBubble
        text={`Let's see what your natal chart tells about you as a person.`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowAdvice(true);
        }}
      />
      {showAdvice && (
        <NatalChartInterpreter
          question="What is my personality like? (do not mention any planets or signs, only tell very briefly about my personality)"
          onFinishedAnswer={() => {
            setShowInput(true);
          }}
        />
      )}
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

export function IntroToFinetuningPart() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="intro-to-finetuning-part" type="filler">
      <ChatBubble
        text={`In order to deliver you the best advice possible, I will ask you a few more questions. This time - about your personality.`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <Text color="bg.900" fontSize={"lg"} fontWeight={"bold"} textAlign={"center"} mb={6}>
            After this, I will act as a hyper personalised astrologer to help you:
          </Text>
          <Flex
            flexDirection={"column"}
            gap={1}
            color="bg.700"
            mx={6}
            alignItems={"center"}
            mb={12}
          >
            <Text>
              <CheckIcon /> Answer any question about any area of your life
            </Text>
            <Text>
              <CheckIcon /> Provide analysis based on current astrological events
            </Text>
            <Text>
              <CheckIcon /> Deliver insights into the short term and long term future
            </Text>
          </Flex>
          <NextButton
            onClick={() => {
              submitQuestion();
            }}
          >
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}

export function SatisfactionScoreSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide
      id="statisfaction-score"
      type="single"
      variant="list"
      options={[
        { text: "Not satisfied", icon: "😕" },
        { text: "Somewhat satisfied", icon: "🙂" },
        { text: "Very satisfied", icon: "😊" },
        { text: "Super. I want more", icon: "🌟" },
      ]}
    >
      <ChatBubble
        text={`I'm glad I was able to answer some questions for you 🤭\n\nHow satisfied were you with my answers?`}
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}

export function AsnwerLongevity() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide
      id="answer-longevity"
      type="single"
      variant="list"
      options={[
        { text: "Shorter and to-the-point", icon: "💬" },
        { text: "Just as they are now", icon: "👌" },
        { text: "More detailed and elaborate", icon: "📝" },
      ]}
    >
      <ChatBubble
        text="Ok. How do you prefer my responses to your questions?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}

export function AstrologerIsReadySlide() {
  return (
    <Slide
      id="astrologer-ready"
      type="filler"
      nextButtonProps={{ title: "Start using your astrologer" }}
    >
      <Title>Congratulations! Your astrologer is now ready</Title>
      <Selector />
    </Slide>
  );
}

export function YourSimilarProfilesSlide() {
  const theme = useTheme();
  return (
    <Slide id="similar-profiles" type="filler">
      {({ quizState }) => {
        const { yourZodiac, yourGender } = getPersonalInfoFromState(quizState);

        return (
          <Fragment>
            <Title textAlign={"center"}>{`We helped other ${yourZodiac.name} ${
              !yourGender ? "" : yourGender === "Other" ? "people" : yourGender.toLowerCase() + "s"
            } like you`}</Title>
            <Subtitle textAlign={"center"} color="bg.600">
              We are currently guiding <Span>{yourZodiac.countOfProfiles.toLocaleString()}</Span>{" "}
              people with profiles similar to yours, who report an average <Span>2x</Span>{" "}
              improvement in their relationships after just <Span>two weeks</Span> using our service
            </Subtitle>

            <Flex p={8} gap={2} flexDirection={"column"}>
              {yourZodiac.svgComponent &&
                createElement(yourZodiac.svgComponent, {
                  height: 160,
                  width: "100%",
                  fill: theme.colors.bg["200"],
                  stroke: theme.colors.bg["600"],
                  strokeWidth: 2,
                })}
              <Text
                fontSize={"3xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                fontFamily={"cursive"}
                color="brand.500"
              >
                {yourZodiac.name}
              </Text>
            </Flex>
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function YourValuesAndPrioritiesSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="your-values-and-priorities"
      type="multi"
      variant="list"
      options={[
        {
          text: "Romance",
          icon: "💞",
        },
        {
          text: "Freedom",
          icon: "🕊",
        },
        {
          text: "Stability",
          icon: "🏠",
        },
        {
          text: "Adventure",
          icon: "🌄",
        },
        {
          text: "Success",
          icon: "🏆",
        },
        {
          text: "Wellness",
          icon: "🧘",
        },
      ]}
    >
      <ChatBubble
        text="What is most important to you?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
      {showInput && <NextButton onClick={() => submitQuestion()}>Continue</NextButton>}
    </Slide>
  );
}

export function YourPersonalityTypeSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide
      id="your-personality-type"
      type="multi"
      variant="list"
      options={[
        {
          text: "Adventurous and spontaneous",
          icon: "✈️",
        },
        {
          text: "Caring and nurturing",
          icon: "🤗",
        },
        {
          text: "Determined and persistent",
          icon: "🏋️",
        },
        {
          text: "Ambitious and driven",
          icon: "🚀",
        },
        {
          text: "Intellectual and curious",
          icon: "🔍",
        },
        {
          text: "Organized and methodical",
          icon: "🗂️",
        },
        {
          text: "Relaxed and easygoing",
          icon: "🌴",
        },
        {
          text: "Creative and original",
          icon: "🎨",
        },
      ]}
    >
      <ChatBubble
        text="Which personality type best describes you?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}

      {showInput && <NextButton onClick={() => submitQuestion()}>Continue</NextButton>}
    </Slide>
  );
}

export function YourSpiritualInvolvementSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide
      id="your-spiritual-involvement"
      type="single"
      variant="list"
      options={[
        {
          text: "I'm new to spirituality",
          icon: "🌱",
        },
        {
          text: "I have a casual interest",
          icon: "🔍",
        },
        {
          text: "I actively practice and study",
          icon: "📚",
        },
        {
          text: "I consider myself deeply committed",
          icon: "🧘‍♂️",
        },
        {
          text: "Spirituality is a core part of my life",
          icon: "✨",
        },
      ]}
    >
      <ChatBubble
        text="To what extent are you engaged with spiritual practices and concepts?"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}

export function NameSlide() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="name-slide" type="short-text" label="Your full name" placeholder="e.g. Jane Doe">
      <ChatBubble
        text="Before saving your profile, let me know how should I call you"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
      {showInput && <NextButton onClick={() => submitQuestion()}>Continue</NextButton>}
    </Slide>
  );
}

export function FinilisingAstrologerSlide() {
  const [showInput, setShowInput] = useState(false);

  return (
    <Slide
      id="finilising-astrologer"
      type="loading"
      duration={4}
      onLoadingCompleted={() => {
        navigate("/summary");
      }}
    >
      <ChatBubble
        text="Thank you! I am now memorising details about you"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />
      {showInput && <Selector />}
    </Slide>
  );
}

export function AstrologerReadySlide() {
  const { submitQuestion } = useQuiz();

  return (
    <Slide id="astrologer-ready" type="filler">
      {({ quizState }) => {
        const { yourZodiac } = getPersonalInfoFromState(quizState);
        const theme = useTheme();

        return (
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Flex my={8} flexDirection={"row"} justifyContent={"center"}>
              <Flex
                borderRadius={"full"}
                overflow={"hidden"}
                height={"250px"}
                width={"250px"}
                boxShadow={"inset 0 0 50px 0 #d2890052, 0 0 50px 0 #d289006e"}
                position={"relative"}
              >
                <Flex
                  flexDirection={"column"}
                  position={"absolute"}
                  zIndex={10}
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                >
                  {yourZodiac.svgComponent &&
                    createElement(yourZodiac.svgComponent, {
                      height: 150,
                      width: 150,
                      stroke: "#f2bf79",
                      fill: theme.colors.bg["100"],
                      strokeWidth: 4,
                    })}
                </Flex>

                <Flex
                  borderRadius={"full"}
                  overflow={"hidden"}
                  height={"250px"}
                  width={"250px"}
                  position={"absolute"}
                  zIndex={-1}
                  boxShadow={"0 0 20px 0 black"}
                  opacity={0.4}
                >
                  <img src={orbGif} />
                </Flex>

                <StaticImage style={{ opacity: 1 }} alt="" src="../../images/astro-avatar.png" />
              </Flex>
            </Flex>

            <Text
              fontWeight="bold"
              textAlign={"center"}
              width={"full"}
              fontSize={"2xl"}
              color="white"
            >
              Your Personal <br /> Astrologer Is Ready
            </Text>

            <Text
              my={2}
              textAlign={"center"}
              width={"full"}
              fontSize={"md"}
              color={"whiteAlpha.600"}
            >
              Know more about yourself.
            </Text>

            <ArrowDownIcon mb={6} color="whiteAlpha.600" fontSize={"3xl"} />

            <NextButton onClick={() => submitQuestion()}>Start using my astrologer</NextButton>
          </Flex>
        );
      }}
    </Slide>
  );
}

function CircleDiv(props: React.ComponentProps<typeof Box>) {
  return (
    <Box
      width={"32px"}
      height={"32px"}
      borderRadius={"full"}
      border="1px solid"
      borderColor={"whiteAlpha.400"}
      shadow={"lg"}
      {...props}
    />
  );
}

export function YourColorResonanceSlide() {
  return (
    <Slide
      id="your-color-resonance"
      type="single"
      variant="list"
      options={[
        {
          text: "Red",
          icon: <CircleDiv backgroundColor={"red"} />,
        },
        {
          text: "Orange",
          icon: <CircleDiv backgroundColor={"orange"} />,
        },
        {
          text: "Yellow",
          icon: <CircleDiv backgroundColor={"yellow"} />,
        },
        {
          text: "Green",
          icon: <CircleDiv backgroundColor={"green"} />,
        },
        {
          text: "Blue",
          icon: <CircleDiv backgroundColor={"blue"} />,
        },
        {
          text: "Indigo",
          icon: <CircleDiv backgroundColor={"indigo"} />,
        },
        {
          text: "Violet",
          icon: <CircleDiv backgroundColor={"violet"} />,
        },
        {
          text: "Pink",
          icon: <CircleDiv backgroundColor={"pink"} />,
        },
        {
          text: "Gold",
          icon: <CircleDiv backgroundColor={"gold"} />,
        },
        {
          text: "Silver",
          icon: <CircleDiv backgroundColor={"silver"} />,
        },
        {
          text: "White",
          icon: <CircleDiv backgroundColor={"white"} />,
        },
        {
          text: "Black",
          icon: <CircleDiv backgroundColor={"black"} />,
        },
      ]}
    >
      <Title>Which color resonates with you the most?</Title>
      <Subtitle>
        Color in astrology reflects <Span>planetary energies</Span> that influence emotional needs,
        impacting relationship compatibility
      </Subtitle>
      <Image mb={8} src={colorMap} borderRadius={"xl"} height={"160px"} mx="auto" />
      <Selector />
    </Slide>
  );
}

export function SocialProofFiller() {
  const [showInput, setShowInput] = useState(false);
  const { submitQuestion } = useQuiz();

  return (
    <Slide type="filler" id="user-testimonial">
      <ChatBubble
        text="Thank you for your feedback 😊. Here's what people like you are saying after using a personalized astrologer"
        instant={showInput}
        onFinishedTyping={() => {
          setShowInput(true);
        }}
      />

      {showInput && (
        <>
          <TestimonialCard
            testimonial={{
              authorName: "Louise Peereman, 52",
              text: "I've been using my personalized astrologer for a couple of months now, and it's been surprisingly insightful. What's cool is I can get answers whenever, wherever. Very convenient!",
              // text: "I've been using my personalized astrologer for a couple of months now, and it's been surprisingly insightful. What's cool is, I don't have to go searching for info anymore — I can get answers whenever, wherever. Very convenient!",
              // text: "I've gained some insights that actually make sense about my husband and me. Who would've thought, right? Anyway, it's been a thoughtful journey, and I'm appreciating the personalized astrologer for shedding light on aspects that bring us closer.",
              // text: "Grateful for the genuine support and insights that made a profound difference in my life. Finding love after divorce is challenging, but with your guidance, I feel much more confident in my journey.",
              rating: 5,
              imgComponent: (
                <StaticImage
                  layout={"constrained"}
                  placeholder={"none"}
                  src={"../../images/testimonial-3.png"}
                  alt=""
                />
              ),
            }}
          />

          <NextButton mt={4} onClick={() => submitQuestion()}>
            Continue
          </NextButton>
        </>
      )}
    </Slide>
  );
}

export function YourSummaryLoadingSlide() {
  const { numerologyData } = useQuizServiceWrapper();

  function findIntervalIndex(progressValue: number, data: Array<Record<string, any>>): number {
    if (progressValue < 0 || progressValue > 100) {
      throw new Error("ProgressValue must be between 0 and 100 inclusive.");
    }

    if (data.length === 0) {
      return -1;
    }

    const intervals = data.length;
    const intervalSize = 100 / intervals;

    const progressInInterval = progressValue % intervalSize;
    const index = Math.floor(progressValue / intervalSize);

    // Adjust index for the last interval
    const lastIndex = intervals - 1;
    const lastIntervalSize = 100 - lastIndex * intervalSize;
    if (index === lastIndex && progressInInterval > lastIntervalSize) {
      return lastIndex;
    }

    return index;
  }

  function renderNumerologyData(progressValue: number, data: Array<Record<string, any>>): string {
    if (progressValue == null) {
      return "";
    }

    if (progressValue === 100) {
      return "Profile updated";
    }

    const index = findIntervalIndex(progressValue, data);
    if (index === -1) {
      return "";
    }

    return `${data[index]?.text}: ${data[index]?.value}`;
  }

  return (
    <Slide
      id="your-summary-loading"
      type="loading"
      from={0}
      to={100}
      duration={4}
      autoProceed
      statusText={({ progress }) => {
        const data = [
          {
            text: "Zodiac sign",
            value: numerologyData.zodiacSign ?? "",
          },
          {
            text: "Destiny number",
            value: numerologyData.destinyNumber ?? "",
          },
          {
            text: "Lucky day",
            value: numerologyData.favDay ?? "",
          },
          {
            text: "Matching metal",
            value: numerologyData.favMetal ?? "",
          },
          {
            text: "Lucky stone",
            value: numerologyData.favStone ?? "",
          },
        ];

        return renderNumerologyData(progress, data);
      }}
    >
      {() => {
        return (
          <>
            <Title textAlign={"center"}>Calculating your astrological profile</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function EmailSlide() {
  const { submitQuestion } = useQuiz();
  return (
    <Slide
      id="your-email"
      type="email"
      placeholder="Enter your email"
      nextButtonProps={{ title: "Submit" }}
    >
      <Title>Service is at highest capacity</Title>
      <Callout emoji="⚠️ New users limit reached">
        Due to the high number of new users, we are limiting access to our service at the moment.
        Your astrologer is however saved and will be ready to use, once we send you an invite
      </Callout>
      <Selector />
      <Caption mb={8}>Your email will only be used to send you the invite link.</Caption>
      <NextButton
        onClick={() => {
          submitQuestion();
        }}
      >
        Submit
      </NextButton>
    </Slide>
  );
}

export function ThankYouSlide() {
  return (
    <Slide id="thank-you" type="filler">
      <Title>Thank you!</Title>
      <Callout emoji="🎉">We will send you the invitation link as soon as possible</Callout>
    </Slide>
  );
}
