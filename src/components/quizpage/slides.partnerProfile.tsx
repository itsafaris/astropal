import React from "react";
import { Selector, Slide, Title } from "@martynasj/quiz-lib";

import { StaticImage } from "gatsby-plugin-image";
import { Box, Flex, Text } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";

import { Span, Subtitle } from "./components";

import { partnerProfileStyles } from "./slides.shared";
import { PulsatingArrow } from "@components/svg/pulsatingArrow";

export function PartnerGenderSlide() {
  return (
    <Slide
      id="partner-gender"
      type="single"
      variant="picture"
      size="small"
      quizContainerProps={partnerProfileStyles}
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
      quizContainerProps={partnerProfileStyles}
    >
      <Title>What's your partner's full name?</Title>
      <Selector />
    </Slide>
  );
}

export function PartnerBirthDateSlide() {
  return (
    <Slide id="partner-birth-date" type="date" quizContainerProps={partnerProfileStyles}>
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>When is {partnerName.firstName} born?</Title>
            <Selector />
          </>
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
      placeholder="Start typing to search..."
      quizContainerProps={partnerProfileStyles}
      optional
    >
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>Where was {partnerName.firstName} born?</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function PartnerEmotionalOpennessSlide() {
  return (
    <Slide
      id="partner-emotional-openness"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileStyles}
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
      quizContainerProps={partnerProfileStyles}
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
      quizContainerProps={partnerProfileStyles}
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

export function PartnerRelationshipFeelingsSlide() {
  return (
    <Slide
      id="relationship-feelings"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileStyles}
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

export function PartnerRelationshipImportanceSlide() {
  return (
    <Slide
      id="relationship-importance"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileStyles}
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
      <Title>Which aspect would you like to improve in the first two weeks?</Title>
      <Selector />
    </Slide>
  );
}

export function PartnerRelationshipFactorsSlide() {
  return (
    <Slide
      id="relationship-factors"
      type="multi"
      variant="list"
      quizContainerProps={partnerProfileStyles}
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

export function PartnerRelationshipConflictResolutionSlide() {
  return (
    <Slide
      id="relationship-conflict-resolution"
      type="single"
      variant="list"
      quizContainerProps={partnerProfileStyles}
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

export function PartnerSpiritualProfileIntroFiller() {
  return (
    <Slide
      type="filler"
      id="partner-spiritual-profile-intro"
      quizContainerProps={partnerProfileStyles}
    >
      <Title>Now, let's create your partner's Spiritual Profile</Title>

      <Subtitle>
        The final piece needed to craft your personalized guidance is understanding your{" "}
        <Span>significant other</Span>
      </Subtitle>

      <Box mb={4} width={"180px"} mx={"auto"} borderRadius={"full"} overflow={"hidden"}>
        <StaticImage alt="picture of a significant other" src="../../images/partner.png" />
      </Box>
    </Slide>
  );
}

export function PartnerMatchScore() {
  return (
    <Slide type="filler" id="partner-matching-score" quizContainerProps={partnerProfileStyles}>
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>You and {partnerName.firstName} are a good match!</Title>

            <Text textAlign={"center"} color="bg.900">
              This is how you match <Span>currently</Span>
            </Text>
            <Text color="white" opacity={0.8} textAlign="center" fontSize={90} fontWeight={"bold"}>
              6.2
            </Text>

            {/* <Flex gap={8} alignItems={"center"}>
              <PulsatingArrow height={"80px"} width={"unset"} />
              <Text color="bg.800" textAlign="center" fontSize={32}>
                +25%
              </Text>
            </Flex> */}

            <Text textAlign={"center"} color="bg.900">
              You can improve this score by <Span>+12%</Span> in the <Span>next week</Span>{" "}
              following our simple guidance
            </Text>
            {/* <Text color="white" opacity={0.8} textAlign="center" fontSize={90} fontWeight={"bold"}>
              74%
            </Text>
            <Text
              color="white"
              opacity={0.8}
              textAlign="center"
              fontSize={"lg"}
              fontWeight={"bold"}
            >
              +12%
            </Text> */}
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}
