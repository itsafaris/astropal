import { Callout, Selector, Slide, Title, ContainerPropsOverride } from "@martynasj/quiz-lib";

import femaleImg from "@images/female.png";
import maleImg from "@images/male.png";
import neutralImg from "@images/neutral.png";

import { TestimonialCard } from "@components/testimonial";

import { StaticImage } from "gatsby-plugin-image";

import { Text, Box } from "@chakra-ui/react";
import { withPrefix } from "gatsby";

const fillerStyles: ContainerPropsOverride = {
  bg: "radial-gradient(circle,rgba(56,4,59,.8) 0,#1c0630 70%)",
  progressBar: {
    activeSegmentBg: "#989898",
    inactiveSegmentBg: "#565656",
    textColor: "white",
    colorScheme: "whiteAlpha",
  },
};

// Your Goal

export function goalSlide() {
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
      <Title>What are your current primary goals and aspirations regarding relationships?</Title>
      <Callout>
        Don't worry if none of the options reflect your goal. You will be able to define it later as
        well.
      </Callout>
      <Selector />
    </Slide>
  );
}

// Your Info

export function genderSlide() {
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
      <Title>What is your gender?</Title>
      <Selector />
    </Slide>
  );
}

export function birthNameSlide() {
  return (
    <Slide id="birth-name" type="short-text" placeholder="Your birth name">
      <Title>What is your full birth name?</Title>
      <Callout>
        A person's name holds a significant information about their personality and life path
      </Callout>
      <Selector />
    </Slide>
  );
}

export function birthDateSlide() {
  return (
    <Slide id="birth-date" type="date">
      <Title>What's your date of birth?</Title>
      <Callout emoji="🎂">
        Knowing your birth date enables precise astrological and numerological analysis, key to
        unlocking personalized relationship guidance.
      </Callout>
      <Selector />
    </Slide>
  );
}

export function birthPlaceSlide() {
  return (
    <Slide id="birth-place" type="location" placeholder="Your birthplace" optional>
      <Title>Where were you born?</Title>
      <Callout>
        Discovering this place is key to uncovering the fundamental aspects of who you are, your
        innermost yearnings, and your true aspirations.
      </Callout>
      <Selector />
    </Slide>
  );
}

export function loadingAfterPersonalInfo({ birthname }: { birthname: string }) {
  return (
    <Slide
      id="loading-one"
      type="loading"
      phases={[
        {
          title: "Creating your meta profile",
          duration: 2,
        },
        {
          title: "Connecting to the stars",
          duration: 2,
        },
        {
          title: "Matching personalised psychics readers",
          duration: 2,
        },
      ]}
    >
      <Title>
        Thanks for your patience {birthname}! We will configure your meta profile based on the phase
        1 answers
      </Title>
      <Selector />
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
      <Callout emoji="🧠">
        Selecting your personality type helps identify spiritual and emotional compatibilities,
        fostering deeper and more meaningful relationships.
      </Callout>
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
      ]}
    >
      <Title>
        Is there a color that you feel particularly drawn to or that resonates with you?
      </Title>
      <Callout emoji="🌈">
        Colors are deeply symbolic in spirituality, often linked to specific energy vibrations that
        can harmonize with your love life and personal aura.
      </Callout>
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

export function socialProofFiller() {
  return (
    <Slide type="filler" id="user-testimonial" quizContainerProps={fillerStyles}>
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

export function yourProfileIntroFiller() {
  return (
    <Slide type="filler" id={"your-profile"}>
      <Title>Your personal metaphysical profile</Title>
      <Callout>
        To unveil the energies shaping your love life, we'll create your personalized metaphysical
        profile through questions.
      </Callout>
      <Box
        height={"200px"}
        width={"200px"}
        mx="auto"
        shadow={"inset 0 0px 70px 0px rgb(0 0 0)"}
        borderRadius={"50%"}
        background={`url(${withPrefix("/images/bg-5.jpeg")}) no-repeat center center / cover`}
      ></Box>
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

export function yourProfileSummaryFiller() {
  return (
    <Slide type="filler" id="your-profile-summary" quizContainerProps={fillerStyles}>
      <Title>Generating your profile...</Title>
    </Slide>
  );
}

export function partnerProfileSummaryFiller() {
  return (
    <Slide type="filler" id="partner-profile-summary" containerProps={{ backgroundColor: "teal" }}>
      <Title>Generating partners profile...</Title>
    </Slide>
  );
}
