import { Fragment, createElement } from "react";
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
import planetPositionsImg from "@images/planet_positions.png";
import astroProfileImg from "@images/astro_profile.png";
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
import colorMap from "@images/color_map.png";
import birthdayNumerologyImg from "@images/birthday_numerology.png";

import { TestimonialCard } from "@components/testimonial";
import PythagoreanNumbers from "@components/svg/pythagoreanNumbers";
import { StaticImage } from "gatsby-plugin-image";
import { Text, Box, useTheme, Flex, Image } from "@chakra-ui/react";
import { withPrefix } from "gatsby";

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
  return <SubtitleRaw p={3} borderRadius={"2xl"} backgroundColor="blackAlpha.400" {...props} />;
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
      <Subtitle>Knowing your goal will allow us to provide a better advice</Subtitle>
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
      <Title>Let's start with your gender</Title>
      <Subtitle>
        Understanding your gender helps us to customize our relationship guidance, taking into
        account how gender-specific experiences and societal dynamics may shape your interactions
        and connections with others.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

export function birthNameSlide() {
  return (
    <Slide id="birth-name" type="short-text" placeholder="Your birth name (or full name)">
      <Title>Tell us your full name</Title>
      <Subtitle>
        <Span>Destiny number</Span> - represents how you express yourself and can indicate your
        natural talents and abilities, as well as potential career paths.
      </Subtitle>
      <PythagoreanNumbers mb={8} width={"100%"} height={"120px"} color={"brand.400"} />
      <Selector />
    </Slide>
  );
}

export function birthDateSlide() {
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
            <Subtitle>
              Your birth date determines the key indicators like <Span>Life Path Number</Span>
            </Subtitle>
            <Image
              mb={8}
              src={birthdayNumerologyImg}
              borderRadius={"xl"}
              height={"160px"}
              mx="auto"
            />
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function birthPlaceSlide() {
  return (
    <Slide id="birth-place" type="location" placeholder="Your birthplace" optional>
      <Title>Where were you born?</Title>
      <Subtitle>
        Birthplace determines the exact position of the planets at the time of birth
      </Subtitle>
      <Image mb={8} src={planetPositionsImg} borderRadius={"xl"} height={"130px"} mx="auto" />
      <Selector />
    </Slide>
  );
}

export function fillerUserCount() {
  const theme = useTheme();
  return (
    <Slide
      id="filler-user-count"
      type="filler"
      quizContainerProps={{
        bgGradient: "radial(bg.400, bg.50)",
      }}
    >
      {({ quizState }) => {
        const { zodiac } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title textAlign={"center"}>Found matching profiles</Title>
            <Text textAlign={"center"} color="bg.900" fontWeight={"bold"}>
              We are currently guiding{" "}
              <Text as="span" color="brand.600">
                {zodiac.countOfProfiles.toLocaleString()}
              </Text>{" "}
              people with similar profiles to yours, reporting an average{" "}
              <Text as="span" color="brand.600">
                2x
              </Text>{" "}
              improvement in relationships within just{" "}
              <Text as="span" color="brand.600">
                two weeks
              </Text>{" "}
              of usage.
            </Text>

            <Flex p={8} gap={2} flexDirection={"column"}>
              {zodiac.svgComponent &&
                createElement(zodiac.svgComponent, {
                  height: 160,
                  width: "100%",
                  fill: theme.colors.bg["200"],
                  stroke: theme.colors.bg["400"],
                })}
              <Text
                fontSize={"4xl"}
                fontWeight={"semibold"}
                textAlign={"center"}
                fontFamily={"cursive"}
                color="bg.200"
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
      return "Profile completed";
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
      quizContainerProps={{
        bgGradient: "radial(bg.300, bg.50)",
      }}
      statusText={({ progress }) => renderNumerologyData(progress)}
    >
      {({ quizState }) => {
        const { fullName } = getPersonalInfoFromState(quizState);
        return (
          <Fragment>
            <Title color="white" textAlign={"center"}>
              <Span>
                Great <Span>{fullName}</Span>!<br /> We are setting up your astrological profile
              </Span>
            </Title>
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

// Partner's Info

export function partnerGenderSlide() {
  return (
    <Slide
      id="partner-gender"
      type="single"
      variant="picture"
      size="small"
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

export function partnerBirthNameSlide() {
  return (
    <Slide id="partner-birth-name" type="short-text" placeholder="Your birth name">
      <Title>What's your partner's full birth name?</Title>
      <Callout>
        A person's name holds a significant information about their personality and life path
      </Callout>
      <Selector />
    </Slide>
  );
}

export function partnerBirthDateSlide() {
  return (
    <Slide id="partner-birth-date" type="date">
      <Title>What's your partner's date of birth?</Title>
      <Callout>
        Knowing the day you were born is vital for crafting thorough and precise forecasts as well.
      </Callout>
      <Selector />
    </Slide>
  );
}

export function partnerBirthPlaceSlide() {
  return (
    <Slide id="partner-birth-place" type="location" placeholder="Your birthplace" optional>
      <Title>Where was your partner born?</Title>
      <Callout>
        Discovering this place is key to uncovering the fundamental aspects of who you are, your
        innermost yearnings, and your true aspirations.
      </Callout>
      <Selector />
    </Slide>
  );
}

export function loadingAfterPartnersInfo() {
  return (
    <Slide id="loading-two" type="loading" quizContainerProps={fillerStyles}>
      {({ state }) => {
        return (
          <Fragment>
            <Title color="white" textAlign={"center"}>
              {`Fine-tuning your profile`}
            </Title>
            <TransitionText
              height={6}
              textAlign={"center"}
              color="white"
              text={
                state.isComplete
                  ? `Your profile is now improved`
                  : "Based on your partner's details, we're fine-tuning your meta profile"
              }
            />
            <Selector />
          </Fragment>
        );
      }}
    </Slide>
  );
}

export function QuickLoading() {
  return (
    <Slide id="loading-quick" type="loading" duration={1}>
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

export function valuesAndPrioritiesSlide() {
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

export function personalityTypeSlide() {
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
        Selecting your personality type helps identify spiritual and emotional compatibilities,
        fostering deeper and more meaningful relationships.
      </Subtitle>
      <Selector />
    </Slide>
  );
}

// Partner's personality

export function partnerEmotionalOpennessSlide() {
  return (
    <Slide
      id="partner-emotional-openness"
      type="single"
      variant="list"
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
      <Title>What level of emotional openness does your current partner exhibit?</Title>
      <Selector />
    </Slide>
  );
}

export function partnerTemperamentSlide() {
  return (
    <Slide
      id="partner-temperament"
      type="single"
      variant="list"
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
      <Title>Does your partner get angry or irritated easily?</Title>
      <Selector />
    </Slide>
  );
}

export function partnerPersonalityTypeSlide() {
  return (
    <Slide
      id="partner-personality-type"
      type="single"
      variant="list"
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
      <Title>Which personality type best describes your partner?</Title>
      <Selector />
    </Slide>
  );
}

// Spiritituality

export function spiritualInvolvementSlide() {
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
      <Callout emoji="✨">
        Your engagement level with spiritual practices allows us to fine-tune the insights and
        advice to resonate with your spiritual journey.
      </Callout>
      <Selector />
    </Slide>
  );
}

export function colorResonanceSlide() {
  return (
    <Slide
      id="color-resonance"
      type="single"
      variant="list"
      options={[
        {
          text: "Red",
          icon: "🔴",
        },
        {
          text: "Orange",
          icon: "🟠",
        },
        {
          text: "Yellow",
          icon: "🟡",
        },
        {
          text: "Green",
          icon: "🟢",
        },
        {
          text: "Blue",
          icon: "🔵",
        },
        {
          text: "Indigo",
          icon: "🟣",
        },
        {
          text: "Violet",
          icon: "🟣",
        },
        {
          text: "Pink",
          icon: "🌸",
        },
        {
          text: "Gold",
          icon: "🟡",
        },
        {
          text: "Silver",
          icon: "⚪",
        },
        {
          text: "White",
          icon: "⚪",
        },
        {
          text: "Black",
          icon: "⚫",
        },
      ]}
    >
      <Title>Which color resonates with you the most?</Title>
      <Subtitle>
        Colors are often associated with planets and signs, carrying symbolic meanings.
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

export function feelingsAboutRelationshipSlide() {
  return (
    <Slide
      id="feelings-about-relationship"
      type="single"
      variant="list"
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

export function relationshipImportanceSlide() {
  return (
    <Slide
      id="relationship-importance"
      type="single"
      variant="list"
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

export function relationshipFactorsSlide() {
  return (
    <Slide
      id="relationship-factors"
      type="multi"
      variant="list"
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

export function conflictResolutionSatisfactionSlide() {
  return (
    <Slide
      id="conflict-resolution-satisfaction"
      type="single"
      variant="list"
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
      <Title textAlign={"center"}>Creation of your spiritual DNA profile</Title>
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
                <Flex py={2} gap={3} flexDirection={"row"} alignItems={"flex-start"}>
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

export function partnerProfileIntroFiller() {
  return (
    <Slide type="filler" id={"partner-profile"}>
      <Title>Let us create metaphysical profile of your partner</Title>
      <Callout>
        We'll ask a couple of questions about your partner to reveal compatibility insights in your
        relationship.
      </Callout>
      <Box
        height={"200px"}
        width={"200px"}
        mx="auto"
        shadow={"inset 0 0px 70px 0px rgb(0 0 0)"}
        borderRadius={"50%"}
        background={`url(${withPrefix("/images/bg-9.jpeg")}) no-repeat center center / cover`}
      ></Box>
    </Slide>
  );
}
