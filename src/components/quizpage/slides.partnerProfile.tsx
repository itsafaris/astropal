import React, { createElement } from "react";
import { Selector, Slide, Title } from "@martynasj/quiz-lib";

import { StaticImage } from "gatsby-plugin-image";
import { Box, Flex, Grid, Text, useTheme } from "@chakra-ui/react";

import { getPersonalInfoFromState } from "@utils/state";

import { Span, Subtitle } from "./components";

import { getZodiacCompatibility } from "@utils/service";

export function PartnerGenderSlide() {
  return (
    <Slide
      id="partner-gender"
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
      {({ quizState }) => {
        const { yourName } = getPersonalInfoFromState(quizState);

        return (
          <>
            <Title>Let's see how you match with your Partner. What's your partner's gender?</Title>

            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function PartnerBirthNameSlide() {
  return (
    <Slide id="partner-birth-name" type="short-text" placeholder="e.g. John" label="Name">
      <Title>What's your partner's name?</Title>
      <Selector />
    </Slide>
  );
}

export function PartnerBirthDateSlide() {
  return (
    <Slide id="partner-birth-date" type="date">
      {({ quizState }) => {
        const { partnerName } = getPersonalInfoFromState(quizState);
        return (
          <>
            <Title>When was {partnerName.firstName} born?</Title>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function PartnerBirthPlaceSlide() {
  return (
    <Slide id="partner-birth-place" type="location" placeholder="e.g. New York" optional>
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

export function RelationshipSatisfactionLevelSlide() {
  return (
    <Slide
      id="relationship-satisfaction-level"
      type="single"
      variant="list"
      options={[
        {
          text: "Extremely dissatisfied",
          icon: "😢",
        },
        {
          text: "Dissatisfied",
          icon: "🙁",
        },
        {
          text: "Neutral",
          icon: "😐",
        },
        {
          text: "Satisfied",
          icon: "🙂",
        },
        {
          text: "Completely satisfied",
          icon: "😍",
        },
      ]}
    >
      <Title>How satisfied are you with your current relationship?</Title>
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
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
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

export function CompatibilityScoreLoadingSlide() {
  return (
    <Slide
      id="compatibility-score-loading"
      type="loading"
      duration={3}
      autoProceed
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
    >
      <Title color="white" textAlign={"center"}>
        {`Matching astrological profiles`}
      </Title>
      <Selector />
    </Slide>
  );
}

export function CompatibilityScoreGoalLoadingSlide() {
  return (
    <Slide
      id="compatibility-score-goal-loading"
      type="loading"
      duration={2}
      autoProceed
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
    >
      <Title color="white" textAlign={"center"}>
        {`Loading...`}
      </Title>
      <Selector />
    </Slide>
  );
}

export function CompatibilityScoreSlide() {
  const theme = useTheme();

  return (
    <Slide
      type="filler"
      id="compatibility-score"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
      nextButtonProps={{ title: "Continue" }}
    >
      {({ quizState }) => {
        const { yourZodiac, partnerZodiac } = getPersonalInfoFromState(quizState);
        const compatibility = getZodiacCompatibility(yourZodiac.name, partnerZodiac.name);

        return (
          <>
            <Title>Your astrological profiles</Title>
            {/* <Title>Here's the how astrologicaly compatible you two are</Title> */}

            <Grid width={"full"} gridTemplateColumns={"auto 1fr auto"} my={6}>
              <Flex gap={2} flexDirection={"column"}>
                {yourZodiac.svgComponent &&
                  createElement(yourZodiac.svgComponent, {
                    height: 90,
                    width: "100%",
                    fill: theme.colors.bg["200"],
                    stroke: theme.colors.bg["600"],
                    strokeWidth: 2,
                  })}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                  fontFamily={"cursive"}
                  color="brand.500"
                >
                  {yourZodiac.name}
                </Text>
              </Flex>

              <Text
                color="white"
                opacity={0.8}
                textAlign="center"
                fontSize={70}
                fontWeight={"bold"}
              >
                {compatibility.value}
                <span style={{ fontSize: 30 }}>%</span>
              </Text>

              <Flex gap={2} flexDirection={"column"}>
                {partnerZodiac.svgComponent &&
                  createElement(partnerZodiac.svgComponent, {
                    height: 90,
                    width: "100%",
                    fill: theme.colors.bg["200"],
                    stroke: theme.colors.bg["600"],
                    strokeWidth: 2,
                  })}
                <Text
                  fontSize={"xl"}
                  fontWeight={"semibold"}
                  textAlign={"center"}
                  fontFamily={"cursive"}
                  color="brand.500"
                >
                  {partnerZodiac.name}
                </Text>
              </Flex>
            </Grid>

            <Text textAlign={"center"} color="bg.900" fontSize={"xl"}>
              Dont worry if score seems low
            </Text>
            <Selector />
          </>
        );
      }}
    </Slide>
  );
}

export function CompatibilityScoreGoalSlide() {
  return (
    <Slide
      type="filler"
      id="compatibility-score-goal"
      quizContainerProps={{
        bgGradient: "radial(bg.200, bg.50)",
      }}
    >
      <Title>
        Users report 35% increase in relationship satisfaction using our Astrology Guide
      </Title>

      <Text textAlign={"center"} color="bg.900">
        You can improve this score by <Span>+12%</Span> in the <Span>next week</Span> following our
        simple guidance
      </Text>

      <Box my={7}>
        <StaticImage
          alt="compatibility score chart"
          src="../../images/compatibility-goal-chart.png"
          placeholder="blurred"
        />
      </Box>
    </Slide>
  );
}
