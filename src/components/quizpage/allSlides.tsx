import React, { Fragment, createElement } from "react";
import {
  Callout,
  Selector,
  Slide,
  Title,
  ContainerPropsOverride,
  TransitionText,
  Span as SpanRaw,
  Subtitle as SubtitleRaw,
} from "@martynasj/quiz-lib";

import femaleImg from "@images/female.png";
import maleImg from "@images/male.png";
import neutralImg from "@images/neutral.png";
import astroProfileImg from "@images/astro_profile.png";
import colorMap from "@images/color_map.png";

import patternIcon1 from "static/images/patterns/pattern-icon-1.svg";
import patternIcon2 from "static/images/patterns/pattern-icon-2.svg";
import patternIcon3 from "static/images/patterns/pattern-icon-3.svg";
import patternIcon4 from "static/images/patterns/pattern-icon-4.svg";
import patternIcon5 from "static/images/patterns/pattern-icon-5.svg";
import patternIcon6 from "static/images/patterns/pattern-icon-6.svg";
import patternIcon7 from "static/images/patterns/pattern-icon-7.svg";
import patternIcon8 from "static/images/patterns/pattern-icon-8.svg";
import patternIcon9 from "static/images/patterns/pattern-icon-9.svg";
import patternIcon10 from "static/images/patterns/pattern-icon-10.svg";

import { TestimonialCard } from "@components/testimonial";
import PythagoreanNumbers from "@components/svg/pythagoreanNumbers";
import { StaticImage } from "gatsby-plugin-image";
import { Text, Box, useTheme, Flex, Image } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";
import { useQuizServiceWrapper } from "./quizServiceWrapper";

const fillerStyles: ContainerPropsOverride = {
  bg: "radial-gradient(circle,rgba(56,4,59,.8) 0,#1c0630 70%)",
  progressBar: {
    activeSegmentBg: "#989898",
    inactiveSegmentBg: "#565656",
    textColor: "white",
    colorScheme: "whiteAlpha",
  },
};

const numerologyNumbersJson = [
  {
    Name: "Life Path Number",
    "Significance in Relationships":
      "Reflects life's journey and personal characteristics, influencing relationship style and partner compatibility.",
    "Source of Calculation": "Date of Birth",
    imageUrl: patternIcon1,
  },
  {
    Name: "Expression Number (Destiny Number)",
    "Significance in Relationships":
      "Indicates talents and expression, key to understanding roles in relationships.",
    "Source of Calculation": "Birth Name",
    imageUrl: patternIcon2,
  },
  {
    Name: "Soul Urge Number (Heart's Desire Number)",
    "Significance in Relationships": "Reveals deepest desires and values in relationships.",
    "Source of Calculation": "Vowels in Birth Name",
    imageUrl: patternIcon3,
  },
  {
    Name: "Birthday Number",
    "Significance in Relationships":
      "Highlights specific talents and their role in personal interactions.",
    "Source of Calculation": "Day of Birth",
    imageUrl: patternIcon4,
  },
  {
    Name: "Personality Number",
    "Significance in Relationships":
      "Affects how one is perceived socially, influencing social and romantic relationships.",
    "Source of Calculation": "Consonants in Birth Name",
    imageUrl: patternIcon5,
  },
  {
    Name: "Sun Sign",
    "Significance in Relationships":
      "Determines fundamental personality traits and identity, crucial for compatibility.",
    "Source of Calculation": "Date of Birth",
    imageUrl: patternIcon6,
  },
  {
    Name: "Moon Sign",
    "Significance in Relationships":
      "Reflects emotional inner self and relational emotional needs, essential for emotional connections.",
    "Source of Calculation": "Date and Time of Birth",
    imageUrl: patternIcon7,
  },
  {
    Name: "Venus Sign",
    "Significance in Relationships":
      "Governs love style and preferences in relationships, vital for romantic interactions.",
    "Source of Calculation": "Date and Time of Birth",
    imageUrl: patternIcon8,
  },
  {
    Name: "Mars Sign",
    "Significance in Relationships":
      "Influences assertiveness and pursuit of desires, affecting relationship dynamics.",
    "Source of Calculation": "Date and Time of Birth",
    imageUrl: patternIcon9,
  },
  {
    Name: "Ascendant (Rising Sign)",
    "Significance in Relationships":
      "Represents self-image and initial approach to relationships, impacting first impressions.",
    "Source of Calculation": "Date, Time, and Place of Birth",
    imageUrl: patternIcon10,
  },
];

function Span(props: React.ComponentProps<typeof SpanRaw>) {
  return <SpanRaw color="brand.500" fontWeight={"semibold"} {...props} />;
}

function Subtitle(props: React.ComponentProps<typeof SubtitleRaw>) {
  return <SubtitleRaw {...props} />;
}

// Your Goal

export function GoalSlide() {
  return (
    <Slide
      id="your-goal"
      type="multi"
      variant="list"
      options={[
        {
          text: "Find partner",
          icon: "💑",
        },
        {
          text: "Fix relationship problems",
          icon: "🔥",
        },
        {
          text: "Increase relationship satisfaction",
          icon: "💞",
        },
        {
          text: "End toxic relationship",
          icon: "💔",
        },
        {
          text: "Get married",
          icon: "💍",
        },
        {
          text: "Have children",
          icon: "🍼",
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

// Your Info

export function GenderSlide() {
  return (
    <Slide
      id="gender"
      type="single"
      variant="picture"
      size="small"
      options={[
        {
          text: "Female",
          imgUrl: femaleImg,
        },
        {
          text: "Male",
          imgUrl: maleImg,
        },
        {
          text: "Other",
          imgUrl: neutralImg,
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

export function BirthNameSlide() {
  return (
    <Slide id="birth-name" type="short-text" placeholder="Your birth name (or full name)">
      <Title>What's your full name?</Title>
      <Subtitle>
        <Span>Destiny Number</Span> is derived from your full name. It unveils your natural
        attractions in partnerships.
      </Subtitle>
      <PythagoreanNumbers mb={8} width={"100%"} height={"120px"} color={"brand.400"} />
      <Selector />
    </Slide>
  );
}

export function BirthDateSlide() {
  return (
    <Slide id="birth-date" type="date">
      {({ quizState }) => {
        const { fullName } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title>
              <Text as="span">{fullName}</Text>
              {", "}
              when were you born?
            </Title>
            <Flex flexDirection={"column"} mx="auto" mb={8}>
              <StaticImage
                src={"../../images/birthday_numerology.png"}
                alt="planet numerology"
                style={{ height: 180, borderRadius: 12 }}
              />
              <Subtitle mb={8} fontSize={"sm"} mt={2}>
                Your birth date determines the key indicators like <Span>Life Path Number</Span>
              </Subtitle>
            </Flex>
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function BirthPlaceSlide() {
  return (
    <Slide id="birth-place" type="location" placeholder="Your birthplace" optional>
      <Title>Where were you born?</Title>
      <Subtitle>
        The birthplace helps to pinpoint the arrangement of <Span>astrological houses</Span> in
        one's birth chart
      </Subtitle>
      <Box mb={8}>
        <StaticImage
          src={"../../images/birth_inception.png"}
          alt="child birth"
          style={{ height: "180px", borderRadius: 16 }}
        />
      </Box>
      <Selector />
    </Slide>
  );
}

export function FillerUserCount() {
  const theme = useTheme();
  return (
    <Slide id="filler-user-count" type="filler">
      {({ quizState }) => {
        const { zodiac } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title textAlign={"center"}>Your profile is ready</Title>
            <Subtitle textAlign={"center"} color="bg.600">
              We are currently guiding <Span>{zodiac.countOfProfiles.toLocaleString()}</Span> people
              with profiles similar to yours, who report an average <Span>2x</Span> improvement in
              their relationships after just <Span>two weeks</Span> using our service
            </Subtitle>

            <Flex p={8} gap={2} flexDirection={"column"}>
              {zodiac.svgComponent &&
                createElement(zodiac.svgComponent, {
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
                {zodiac.name}
              </Text>
            </Flex>
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function LoadingAfterPersonalInfo() {
  const { numerologyData } = useQuizServiceWrapper();

  const data = numerologyData
    ? [
        {
          text: "Zodiac sign",
          value: numerologyData.zodiacSign,
        },
        {
          text: "Destiny number",
          value: numerologyData.destinyNumber,
        },
        {
          text: "Lucky day",
          value: numerologyData.favDay,
        },
        {
          text: "Matching metal",
          value: numerologyData.favMetal,
        },
        {
          text: "Lucky stone",
          value: numerologyData.favStone,
        },
      ]
    : [];

  function findIntervalIndex(progressValue: number, count: Array<Record<string, any>>): number {
    if (progressValue < 0 || progressValue > 100) {
      throw new Error("ProgressValue must be between 0 and 100 inclusive.");
    }

    if (count.length === 0) {
      return -1;
    }

    const intervals = count.length;
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

  function renderNumerologyData(progressValue?: number): string {
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
      id="loading-one"
      type="loading"
      from={0}
      to={100}
      duration={10}
      autoProceed
      quizContainerProps={{
        bgGradient: "radial(bg.300, bg.50)",
      }}
      statusText={({ progress }) => renderNumerologyData(progress)}
    >
      {({ quizState }) => {
        const { fullName } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title textAlign={"center"}>
              Great <Span>{fullName}</Span>!<br /> We are updating your Spiritual DNA Profile
            </Title>
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

// Partner's Info

export function PartnerGenderSlide() {
  return (
    <Slide
      id="partner-gender"
      type="single"
      variant="picture"
      size="small"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Male",
          imgUrl: maleImg,
        },
        {
          text: "Female",
          imgUrl: femaleImg,
        },
        {
          text: "Other",
          imgUrl: neutralImg,
        },
      ]}
    >
      <Title>What's your partner's gender?</Title>
      <Selector />
    </Slide>
  );
}

export function PartnerBirthNameSlide() {
  return (
    <Slide
      id="partner-birth-name"
      type="short-text"
      placeholder="Partner's full name"
      quizContainerProps={partnerProfileFillerStyles}
    >
      <Title>What's your partner's full name?</Title>
      <Selector />
    </Slide>
  );
}

export function PartnerBirthDateSlide() {
  return (
    <Slide id="partner-birth-date" type="date" quizContainerProps={partnerProfileFillerStyles}>
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title>When is {partnerName.firstName} born?</Title>
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function PartnerBirthPlaceSlide() {
  return (
    <Slide
      id="partner-birth-place"
      type="location"
      placeholder="Your birthplace"
      quizContainerProps={partnerProfileFillerStyles}
      optional
    >
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title>Where was {partnerName.firstName} born?</Title>
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function LoadingAfterPartnersInfo() {
  return (
    <Slide id="loading-two" type="loading" quizContainerProps={partnerProfileFillerStyles}>
      {({ state }) => {
        return (
          <Fragment>
            <Title color="white" textAlign={"center"}>
              {`Finalising your profile`}
            </Title>
            <TransitionText
              height={16}
              textAlign={"center"}
              color="white"
              text={
                state.isComplete
                  ? `Your profile is now improved`
                  : "Based on your partner's details, we're fine-tuning your personal guidance advisor"
              }
            />
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function LoadingAfterIdealPartnersInfo() {
  return (
    <Slide
      id="updating-ideal-partner-info"
      type="loading"
      from={0}
      to={100}
      duration={10}
      quizContainerProps={{
        bgGradient: "radial(bg.300, bg.50)",
      }}
      statusText={({ progress }) => {
        if (progress === 100) {
          return "Done";
        }

        if (progress > 66) {
          return "Matching both profiles...";
        }

        if (progress > 33) {
          return "Calculating possibilities...";
        }

        return "Updating partners info...";
      }}
    >
      <Title textAlign={"center"}>We are almost done! Generating profile of ideal partner.</Title>
      <Selector />
    </Slide>
  );
}

export function QuickLoading() {
  return (
    <Slide id="loading-quick" type="loading" duration={1} autoProceed>
      {({ state }) => {
        return (
          <Fragment>
            <Title color="white" textAlign={"center"}>
              {`Saving profile`}
            </Title>
            <TransitionText
              height={6}
              textAlign={"center"}
              color="white"
              text={state.isComplete ? `Your profile is created` : ""}
            />
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

// Your Personality

export function ValuesAndPrioritiesSlide() {
  return (
    <Slide
      id="values-and-priorities"
      type="single"
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
      <Title>What is most important to you?</Title>
      <Selector />
    </Slide>
  );
}

export function PersonalityTypeSlide() {
  return (
    <Slide
      id="personality-type"
      type="single"
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
      <Title>Which personality type best describes you?</Title>
      <Subtitle>
        We merge astrological insights with your <Span>personal traits</Span> to deliver
        individualized guidance.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

// Partner's personality

export function PartnerEmotionalOpennessSlide() {
  return (
    <Slide
      id="partner-emotional-openness"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Closed off",
          icon: "🔒",
        },
        {
          text: "Somewhat reserved",
          icon: "🤐",
        },
        {
          text: "Open, but cautious",
          icon: "🚪",
        },
        {
          text: "Expressive and open",
          icon: "💬",
        },
        {
          text: "Completely transparent",
          icon: "🔍",
        },
      ]}
    >
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>What level of emotional openness does {partnerName.firstName} exhibit?</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function PartnerTemperamentSlide() {
  return (
    <Slide
      id="partner-temperament"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Calm and difficult to irritate",
          icon: "😌",
        },
        {
          text: "Gets angry or irritated easily",
          icon: "😠",
        },
      ]}
    >
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>Does {partnerName.firstName} get angry or irritated easily?</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function PartnerPersonalityTypeSlide() {
  return (
    <Slide
      id="partner-personality-type"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Practical and dependable",
          icon: "🔐",
        },
        {
          text: "Energetic and social",
          icon: "💃",
        },
        {
          text: "Compassionate and supportive",
          icon: "🩹",
        },
        {
          text: "Creative and insightful",
          icon: "💡",
        },
        {
          text: "Analytical and strategic",
          icon: "♟️",
        },
        {
          text: "None of the above",
          icon: "-",
        },
      ]}
    >
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>Which personality type best describes {partnerName.firstName}?</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

// Spiritituality

export function SpiritualInvolvementSlide() {
  return (
    <Slide
      id="spiritual-involvement"
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
      <Title>To what extent are you engaged with spiritual practices and concepts?</Title>
      <Subtitle>
        Knowing your <Span>engagement level</Span> allows us to fine-tune the insights and advice to
        resonate with your spiritual journey.
      </Subtitle>
      <Selector />
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

export function ColorResonanceSlide() {
  return (
    <Slide
      id="color-resonance"
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

// Ideal Partner

export function mustHaveTraitSlide() {
  return (
    <Slide
      id="must-have-trait"
      type="single"
      variant="list"
      options={[
        {
          text: "Kindness",
          icon: "💖",
        },
        {
          text: "Intelligence",
          icon: "🧠",
        },
        {
          text: "Sense of humor",
          icon: "😄",
        },
        {
          text: "Ambition",
          icon: "🚀",
        },
        {
          text: "Creativity",
          icon: "🎨",
        },
        {
          text: "Empathy",
          icon: "🤝",
        },
      ]}
    >
      <Title>What trait is a must-have in your ideal partner?</Title>
      <Selector />
    </Slide>
  );
}

export function sharedLifestyleAspectSlide() {
  return (
    <Slide
      id="shared-lifestyle-aspect"
      type="single"
      variant="list"
      options={[
        {
          text: "Health and fitness",
          icon: "💪",
        },
        {
          text: "Travel and adventure",
          icon: "✈️",
        },
        {
          text: "Arts and culture",
          icon: "🎭",
        },
        {
          text: "Family and home life",
          icon: "👨‍👩‍👦",
        },
        {
          text: "Spirituality and mindfulness",
          icon: "🧘‍♂️",
        },
        {
          text: "Career and ambitions",
          icon: "💼",
        },
      ]}
    >
      <Title>Which lifestyle aspect should your ideal partner absolutely share with you?</Title>
      <Selector />
    </Slide>
  );
}

export function approachToConflictsSlide() {
  return (
    <Slide
      id="approach-to-conflicts"
      type="single"
      variant="list"
      options={[
        {
          text: "Avoids conflict",
          icon: "🚫",
        },
        {
          text: "Confronts directly",
          icon: "👊",
        },
        {
          text: "Communicative and understanding",
          icon: "💬",
        },
        {
          text: "Compromises and adapts",
          icon: "✌️",
        },
        {
          text: "Reacts emotionally",
          icon: "😢",
        },
      ]}
    >
      <Title>How should your ideal partner approach conflicts and disagreements?</Title>
      <Selector />
    </Slide>
  );
}

export function emotionalOpennessSlide() {
  return (
    <Slide
      id="emotional-openness"
      type="single"
      variant="list"
      options={[
        {
          text: "Reserved",
          icon: "🔒",
        },
        {
          text: "Somewhat open",
          icon: "🚪",
        },
        {
          text: "Very open",
          icon: "💞",
        },
        {
          text: "Completely transparent",
          icon: "🔍",
        },
      ]}
    >
      <Title>What level of emotional openness do you desire from your ideal partner?</Title>
      <Selector />
    </Slide>
  );
}

export function viewOnGrowthSlide() {
  return (
    <Slide
      id="view-on-growth"
      type="single"
      variant="list"
      options={[
        {
          text: "Prefers routine and stability",
          icon: "🏡",
        },
        {
          text: "Willing to grow but cautiously",
          icon: "🌱",
        },
        {
          text: "Eager to take on new challenges",
          icon: "🏋️",
        },
        {
          text: "Always prioritizing personal and career growth",
          icon: "📈",
        },
      ]}
    >
      <Title>How should your ideal partner view personal and career growth?</Title>
      <Selector />
    </Slide>
  );
}

// Relationship questions (non single)

export function FeelingsAboutRelationshipSlide() {
  return (
    <Slide
      id="feelings-about-relationship"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Very happy",
          icon: "😊",
        },
        {
          text: "Somewhat satisfied",
          icon: "🙂",
        },
        {
          text: "Neutral",
          icon: "😐",
        },
        {
          text: "Somewhat dissatisfied",
          icon: "😕",
        },
        {
          text: "Very unhappy",
          icon: "😞",
        },
      ]}
    >
      <Title>How do you feel about your relationship?</Title>
      <Selector />
    </Slide>
  );
}

export function RelationshipImportanceSlide() {
  return (
    <Slide
      id="relationship-importance"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Trust",
          icon: "🤝",
        },
        {
          text: "Communication",
          icon: "💬",
        },
        {
          text: "Passion",
          icon: "💓",
        },
        {
          text: "Respect",
          icon: "🙏",
        },
        {
          text: "Shared interests",
          icon: "🎯",
        },
      ]}
    >
      <Title>What is the most important thing to you in a relationship?</Title>
      <Selector />
    </Slide>
  );
}

export function RelationshipFactorsSlide() {
  return (
    <Slide
      id="relationship-factors"
      type="multi"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Work or career stress",
          icon: "💼",
        },
        {
          text: "Financial issues",
          icon: "💸",
        },
        {
          text: "Lack of quality time",
          icon: "⏳",
        },
        {
          text: "Mismatched libidos",
          icon: "🔥",
        },
        {
          text: "Family obligations",
          icon: "👪",
        },
      ]}
    >
      <Title>Are any of these factors currently affecting your relationship?</Title>
      <Selector />
    </Slide>
  );
}

export function ConflictResolutionSatisfactionSlide() {
  return (
    <Slide
      id="conflict-resolution-satisfaction"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Very satisfied",
          icon: "😌",
        },
        {
          text: "Somewhat satisfied",
          icon: "😐",
        },
        {
          text: "Neutral",
          icon: "😶",
        },
        {
          text: "Somewhat dissatisfied",
          icon: "😡",
        },
        {
          text: "Very dissatisfied",
          icon: "😤",
        },
      ]}
    >
      <Title>Are you satisfied with the way you and your partner deal with conflict?</Title>
      <Selector />
    </Slide>
  );
}

// Relationship questions (single)

export function healthyRelationshipVisionSlide() {
  return (
    <Slide
      id="healthy-relationship-vision"
      type="multi"
      variant="list"
      options={[
        {
          text: "Mutual respect",
          icon: "🤝",
        },
        {
          text: "Open communication",
          icon: "💬",
        },
        {
          text: "Emotional support",
          icon: "🫂",
        },
        {
          text: "Shared values and goals",
          icon: "🌟",
        },
        {
          text: "Maintaining personal independence",
          icon: "🚀",
        },
        {
          text: "Consistent affection",
          icon: "💓",
        },
      ]}
    >
      <Title>How do you envision a healthy relationship?</Title>
      <Selector />
    </Slide>
  );
}

export function potentialPartnerValuesSlide() {
  return (
    <Slide
      id="potential-partner-values"
      type="multi"
      variant="list"
      options={[
        {
          text: "Honesty and integrity",
          icon: "🔒",
        },
        {
          text: "Intelligence",
          icon: "🧠",
        },
        {
          text: "Humor and lightheartedness",
          icon: "😆",
        },
        {
          text: "Compassion and empathy",
          icon: "❤️",
        },
        {
          text: "Ambition and drive",
          icon: "⏫",
        },
        {
          text: "Lifestyle compatibility",
          icon: "🏡",
        },
      ]}
    >
      <Title>What do you value most when considering a potential partner?</Title>
      <Selector />
    </Slide>
  );
}

export function relationshipDealBreakersSlide() {
  return (
    <Slide
      id="relationship-deal-breakers"
      type="multi"
      variant="list"
      options={[
        {
          text: "Lack of trust",
          icon: "🔓",
        },
        {
          text: "Poor communication",
          icon: "🔇",
        },
        {
          text: "Incompatibility in lifestyle",
          icon: "👣",
        },
        {
          text: "Lack of emotional connection",
          icon: "💔",
        },
        {
          text: "Differing values or beliefs",
          icon: "📜",
        },
        {
          text: "Unresolved past issues",
          icon: "🕰️",
        },
      ]}
    >
      <Title>Are there specific deal-breakers you're aware of from past relationships?</Title>
      <Selector />
    </Slide>
  );
}

export function findingCompatiblePartnerSatisfactionSlide() {
  return (
    <Slide
      id="finding-compatible-partner-satisfaction"
      type="single"
      variant="list"
      options={[
        {
          text: "Very satisfied",
          icon: "😁",
        },
        {
          text: "Somewhat satisfied",
          icon: "🙂",
        },
        {
          text: "Neutral",
          icon: "😐",
        },
        {
          text: "Somewhat dissatisfied",
          icon: "😟",
        },
        {
          text: "Very dissatisfied",
          icon: "😞",
        },
      ]}
    >
      <Title>How satisfied are you with your approach to finding a compatible partner?</Title>
      <Selector />
    </Slide>
  );
}

// Expecations

export function appFeaturesImportanceSlide() {
  return (
    <Slide
      id="app-features-importance"
      type="multi"
      variant="list"
      quizContainerProps={partnerProfileFillerStyles}
      options={[
        {
          text: "Daily spiritual advice and tips",
          icon: "☀️",
        },
        {
          text: "Ability to ask questions and get answers",
          icon: "❓",
        },
        {
          text: "Insights into the future",
          icon: "🔮",
        },
        {
          text: "Compatibility checks with others",
          icon: "💑",
        },
        {
          text: "Personalized astrology profiles",
          icon: "⭐",
        },
        {
          text: "Affirmations and mantras",
          icon: "🙏",
        },
      ]}
    >
      <Title>What kind of assistance are you seeking that would be most beneficial to you?</Title>
      <Selector />
    </Slide>
  );
}

// filler

export function SocialProofFiller() {
  return (
    <Slide type="filler" id="user-testimonial">
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        gap={1}
        width={"full"}
        mb={5}
      >
        <Text color="white" textAlign="center" fontSize={"4xl"} fontWeight={700}>
          9 out of 10 users
        </Text>

        <Text color="white" textAlign="center" fontSize={"lg"} fontWeight={500}>
          say AstroPal helped overcome relationship challenges.
        </Text>
      </Box>

      <TestimonialCard
        testimonial={{
          authorName: "Louise Peereman",
          text: "Grateful for the genuine support and insights that made a profound difference in my life. Finding love after divorce is challenging, but with your guidance, I feel much more confident in my journey.",
          rating: 5,
          imgComponent: (
            <StaticImage
              layout={"constrained"}
              placeholder={"none"}
              src={"../../images/testimonial-one.jpeg"}
              alt=""
            />
          ),
        }}
      />
    </Slide>
  );
}

export function YourProfileIntroFiller() {
  return (
    <Slide
      type="filler"
      id={"your-profile"}
      quizContainerProps={{
        bgGradient: "radial(bg.400, bg.50)",
      }}
    >
      <Title>Creation of your spiritual DNA profile</Title>
      <Subtitle>
        Your <Span>name</Span> and <Span>date of birth</Span> hold the key to unlocking personalized
        insights about you.
      </Subtitle>

      <Image src={astroProfileImg} mb={4} borderRadius={"full"} height={"180px"} mx="auto" />

      <Callout emoji="Significance of numbers">
        <Box my={2}>
          <Flex
            direction="column"
            w="100%"
            fontSize={"14px"}
            color="brand.500"
            fontStyle={"italic"}
            fontFamily={"serif"}
          >
            {numerologyNumbersJson.map((n) => {
              return (
                <Flex key={n.Name} py={2} gap={3} flexDirection={"row"} alignItems={"flex-start"}>
                  <Image src={n.imageUrl} height={"22px"} mx="auto" />

                  <Flex flexDirection={"column"} flex={1}>
                    <Box>
                      <Text color="bg.900" fontWeight={"bold"}>
                        {n.Name}
                      </Text>
                    </Box>

                    <Box>
                      <Text>{n["Significance in Relationships"]}</Text>
                    </Box>
                  </Flex>
                </Flex>
              );
            })}
          </Flex>
        </Box>
      </Callout>
    </Slide>
  );
}

const partnerProfileFillerStyles = {
  bgGradient: "radial(#0c3439, #221139)",
};

export function PartnerProfileIntroFiller() {
  return (
    <Slide type="filler" id={"partner-profile"} quizContainerProps={partnerProfileFillerStyles}>
      <Title>
        Spiritual DNA
        <br /> of your Partner
      </Title>
      <Subtitle>
        The final piece needed to craft your personalized guidance is understanding your{" "}
        <Span>significant other</Span>
      </Subtitle>
      {/* <Callout>
        We'll ask a couple of questions about your partner to reveal compatibility insights in your
        relationship.
      </Callout> */}
      <Box my={4}>
        <StaticImage alt="picture of a significant other" src="../../images/partner.png" />
      </Box>
    </Slide>
  );
}
