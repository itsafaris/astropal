import React, { createElement } from "react";
import { Callout, Selector, Slide, Title } from "@martynasj/quiz-lib";

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

export function RelationshipFocusSlide() {
  return (
    <Slide
      id="relationship-focus"
      type="single"
      variant="list"
      options={[
        {
          text: "Communication",
          icon: "💬",
        },
        {
          text: "Intimacy",
          icon: "❤️",
        },
        {
          text: "Conflict resolution",
          icon: "🛠",
        },
        {
          text: "Personal growth",
          icon: "🌱",
        },
      ]}
    >
      <Title>Which areas of your relationship would you like to focus on?</Title>
      <Selector />
    </Slide>
  );
}

export function GuidanceActivityPreferenceSlide() {
  return (
    <Slide
      id="guidance-activity-preference"
      type="single"
      variant="list"
      options={[
        {
          text: "Self-guided",
          icon: "🧘",
        },
        {
          text: "Interactive",
          icon: "🤝",
        },
        {
          text: "A bit of both",
          icon: "🤝",
        },
      ]}
    >
      <Title>Do you prefer self-guided activities or interactive sessions with your partner?</Title>
      <Selector />
    </Slide>
  );
}

export function FrequencyOfInsightsSlide() {
  return (
    <Slide
      id="frequency-insights"
      type="single"
      variant="list"
      options={[
        {
          text: "Daily",
          icon: "📅",
        },
        {
          text: "Few times per week",
          icon: "📆",
        },
        {
          text: "Once a week",
          icon: "🗓",
        },
      ]}
    >
      <Title>How often would you like to receive astrological insights?</Title>
      <Selector />
    </Slide>
  );
}

export function TimeOfDayReflectionSlide() {
  return (
    <Slide
      id="time-of-day-reflection"
      type="single"
      variant="list"
      options={[
        {
          text: "Morning",
          icon: "🌅",
        },
        {
          text: "Afternoon",
          icon: "🌞",
        },
        {
          text: "Evening",
          icon: "🌜",
        },
      ]}
    >
      <Title>What time of day do you prefer for reflection and guidance activities?</Title>
      <Selector />
    </Slide>
  );
}

export function GuidanceDetailLevelSlide() {
  return (
    <Slide
      id="guidance-detail-level"
      type="single"
      variant="list"
      options={[
        {
          text: "Detailed analysis",
          icon: "🔍",
        },
        {
          text: "Quick insights",
          icon: "⚡",
        },
      ]}
    >
      <Title>Would you like your guidance to be detailed or brief?</Title>
      <Selector />
    </Slide>
  );
}

export function AstrologicalEventAlignmentSlide() {
  return (
    <Slide
      id="astrological-event-alignment"
      type="single"
      variant="list"
      options={[
        {
          text: "Very important",
          icon: "✨",
        },
        {
          text: "Somewhat important",
          icon: "🌟",
        },
        {
          text: "Not important",
          icon: "⭐",
        },
      ]}
    >
      <Title>
        How important is it for your guidance to align with current astrological events?
      </Title>
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

export function RelationshipDurationSlide() {
  return (
    <Slide
      id="relationship-duration"
      type="single"
      variant="list"
      options={[
        {
          text: "Less than 6 months",
          icon: "🌱",
        },
        {
          text: "6 months to a year",
          icon: "🍃",
        },
        {
          text: "1-2 years",
          icon: "🌿",
        },
        {
          text: "More than 2 years",
          icon: "🌲",
        },
      ]}
    >
      <Title>How long have you two been in the current relationship?</Title>
      <Selector />
    </Slide>
  );
}

export function PartnerRelationshipFactorsSlide() {
  return (
    <Slide
      id="relationship-factors"
      type="single"
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
      <Title>What negatively impacts your relationship the most?</Title>
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
      nextButtonProps={{ title: "Create my personalised guide" }}
    >
      <Title>
        Users with profiles similar to yours report a <Span>27%</Span> increase in relationship
        satisfaction within the <Span>first two weeks</Span> using our Astrology Guide
      </Title>

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
