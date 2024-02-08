import React from "react";
import {
  Callout,
  Selector,
  ShortTextState,
  Slide,
  useQuizState,
  useSlideState,
} from "@martynasj/quiz-lib";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { NextButton, SlideHeading, Span, SpanJust, Subtitle } from "./components";
import { StaticImage } from "gatsby-plugin-image";
import { BookCover } from "@components/book/bookCover";
import { getPersonalInfoFromState } from "@utils/state";

export function DecisionMakingStruggles() {
  return (
    <Slide
      id="decision-making-struggles"
      type="single"
      variant="list"
      options={[
        { text: "Career", icon: "🏢" },
        { text: "Relationships", icon: "❤️" },
        { text: "Finances", icon: "💰" },
        { text: "Personal Growth", icon: "🌱" },
        { text: "Health", icon: "🍏" },
      ]}
    >
      <SlideHeading text={"Which area of your life is the hardest to make decisions in?"} />
      <Selector />
    </Slide>
  );
}

export function DecisionChallengeAgreement() {
  return (
    <Slide
      id="decision-challenge-agreement"
      type="single"
      variant="list"
      options={[
        { text: "Strongly agree", icon: "🙌" },
        { text: "Agree", icon: "👍" },
        { text: "Neutral", icon: "😐" },
        { text: "Disagree", icon: "👎" },
        { text: "Strongly disagree", icon: "🙅" },
      ]}
    >
      <Subtitle>"I often struggle to make decisions when opportunities arise"</Subtitle>
      <Selector />
    </Slide>
  );
}

export function HesitationCause() {
  return (
    <Slide
      id="hesitation-cause"
      type="single"
      variant="list"
      options={[
        { text: "Fear of Failure", icon: "😨" },
        { text: "Lack of Confidence", icon: "🙁" },
        { text: "Overthinking the Outcomes", icon: "🤔" },
        { text: "Not Feeling Prepared", icon: "📚" },
        { text: "Worrying About Others' Opinions", icon: "👥" },
        { text: "Uncertainty About the Correct Decision", icon: "❓" },
        { text: "Lack of Support", icon: "🚫" },
      ]}
    >
      <SlideHeading
        text={
          "What is the main cause for you to hesitate to take action when a major opportunity arises?"
        }
      />
      <Selector />
    </Slide>
  );
}

export function LifeChangeTiming() {
  return (
    <Slide
      id="life-change-timing"
      type="single"
      variant="list"
      options={[
        { text: "Completely Confident", icon: "🌟" },
        { text: "Somewhat Confident", icon: "⚖️" },
        { text: "Unsure", icon: "❓" },
      ]}
    >
      <SlideHeading
        text={
          "When making a big change in your life, how confident do you feel about your decisions?"
        }
      />
      <Selector />
    </Slide>
  );
}

export function AstrologyExperienceLevel() {
  return (
    <Slide
      id="astrology-experience-level"
      type="single"
      variant="list"
      options={[
        { text: "Expert", icon: "🌟" },
        { text: "Knowledgeable (I know a few terms)", icon: "🔭" },
        { text: "Beginner - (Just starting now)", icon: "🍃" },
        { text: "I have 0 knowledge", icon: "0️⃣" },
      ]}
    >
      <SlideHeading text={"How would you describe your experience level with astrology?"} />
      <Selector />
    </Slide>
  );
}

export function DefineSuccess() {
  return (
    <Slide
      id="define-success"
      type="multi"
      variant="list"
      options={[
        { text: "Achieving Personal Goals", icon: "🎯" },
        { text: "Professional Achievements and Milestones", icon: "🏆" },
        { text: "Continuous Growth and Learning", icon: "🌱" },
        { text: "Maintaining Personal Well-being", icon: "💆" },
        { text: "Making a Positive Impact on Others", icon: "❤️" },
        { text: "Finding a Balance Between Work and Life", icon: "⚖️" },
      ]}
    >
      <SlideHeading text={"Which of the following means success to you?"} />
      <Selector />
    </Slide>
  );
}

export function SelfUnderstanding() {
  return (
    <Slide
      id="self-understanding"
      type="single"
      variant="list"
      options={[
        { text: "Not well at all", icon: "1️⃣" },
        { text: "Somewhat understand", icon: "2️⃣" },
        { text: "Moderately understand", icon: "3️⃣" },
        { text: "Very well", icon: "4️⃣" },
        { text: "Extremely well", icon: "5️⃣" },
      ]}
    >
      <SlideHeading text={"How well do you think you understand yourself?"} />
      <Selector />
    </Slide>
  );
}

export function TopPersonalGoal() {
  return (
    <Slide
      id="top-personal-goal"
      type="single"
      variant="list"
      options={[
        { text: "Advance in My Career", icon: "🚀" },
        { text: "Improve Personal Health and Fitness", icon: "🏋️" },
        { text: "Achieve Financial Stability", icon: "💰" },
        { text: "Cultivate Meaningful Relationships", icon: "❤️" },
        { text: "Pursue Further Education or Training", icon: "📚" },
        { text: "Travel and Explore New Cultures", icon: "🌍" },
        { text: "Invest in a Personal Hobby or Skill", icon: "🎨" },
        { text: "Contribute to Social Causes", icon: "👐" },
        { text: "Achieve a Work-Life Balance", icon: "⚖️" },
      ]}
    >
      <SlideHeading text={"What is your main personal goal for the next year?"} />
      <Selector />
    </Slide>
  );
}

export function NameOnTheBook() {
  const s = useSlideState<ShortTextState>();
  return (
    <Slide id="name-on-book" type="short-text" placeholder="E.g John Doe" hideNextButton>
      {({ quizState }) => {
        const p = getPersonalInfoFromState(quizState);
        return (
          <>
            <SlideHeading>
              What is your name?{" "}
              <Span color="bg.700">(it will be displayed on the cover of the book)</Span>
            </SlideHeading>
            <Selector />
            <Flex justifyContent={"center"}>
              <BookCover
                height={300}
                author={s?.value ?? "[your name here]"}
                gender={p.yourGender}
              />
            </Flex>
            <NextButton mt={4}>Create My Guide</NextButton>
          </>
        );
      }}
    </Slide>
  );
}

export function DetailLevelPreference() {
  return (
    <Slide
      id="detail-level-preference"
      type="single"
      variant="list"
      options={[
        { text: "Surface-Level Summary", icon: "🌊" },
        { text: "Key Insights and Highlights", icon: "💡" },
        { text: "In-Depth Analysis with Examples", icon: "🔍" },
        { text: "Comprehensive Exploration of All Aspects", icon: "📚" },
        { text: "Customized Deep Dive on Selected Topics", icon: "🎯" },
      ]}
    >
      <SlideHeading text={"How detailed do you want your birth chart book to be?"} />
      <Selector />
    </Slide>
  );
}

export function IncludeRealLifeExamples() {
  return (
    <Slide
      id="include-real-life-examples"
      type="single"
      variant="list"
      options={[
        { text: "Yes, include real life examples", icon: "🌟" },
        { text: "No, stick to theoretical knowledge", icon: "📚" },
        { text: "Mix of both, but with a focus on real life situations", icon: "🔄" },
      ]}
    >
      <SlideHeading
        text={"Do you want some real life situations as examples to be included in the chapters?"}
      />
      <Selector />
    </Slide>
  );
}

export function FillerBookIsBasedOnNatalChart() {
  return (
    <Slide id="filler-people-in-control" type="filler">
      <SlideHeading>82% of people feel out of control in similar ways like you.</SlideHeading>
      <Box bg="white" borderRadius={"xl"}>
        <StaticImage
          alt="chart showing how many people are in control with their lives"
          src="../../images/lost_in_life_chart.png"
        />
      </Box>
      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function FillerPeopleInControl() {
  return (
    <Slide id="filler-people-in-control" type="filler">
      <SlideHeading>82% of people feel out of control in similar ways like you.</SlideHeading>

      <Box bg="white" borderRadius={"xl"}>
        <StaticImage
          alt="chart showing how many people are in control with their lives"
          src="../../images/lost_in_life_chart.png"
        />
      </Box>

      <NextButton mt={8}>Continue</NextButton>
    </Slide>
  );
}

export function HyperPersonalisedInsights() {
  return (
    <Slide id="personalised-insights-intro" type="filler">
      <SlideHeading>
        <Span>Hyper personalised insights</Span> enables to regain this clarity
      </SlideHeading>

      <Box bg="white" borderRadius={"xl"}>
        <StaticImage
          alt="chart showing how many people are in control with their lives"
          src="../../images/personalised_astro_benefits.png"
        />
      </Box>

      <NextButton mt={8}>Get yours</NextButton>
    </Slide>
  );
}

export function InsightVsHoroscopeComparison() {
  return (
    <Slide id="insight-vs-horoscope" type="filler">
      <SlideHeading>Here is an example, the difference is huge.</SlideHeading>

      <Box mb={4}>
        <Text mb={2} color="white">
          Regular horoscope
        </Text>
        <RegularHoroscope />
      </Box>

      <Box>
        <Text mb={2} color="white">
          Hyper Personalised Insight
        </Text>
        <PersonalisedInsight />
      </Box>

      <NextButton mt={8}>Get yours</NextButton>
    </Slide>
  );
}

function RegularHoroscope() {
  return (
    <Box bg="gray.400" p={2} borderRadius={"lg"}>
      <Text fontSize={"2xs"}>
        Today, Aquarius, you might find yourself at a crossroads, feeling an urge for change. Social
        interactions and teamwork are highlighted. It's a good day to explore new ideas and maybe
        even challenge the status quo. However, be mindful of potential conflicts with authority
        figures. Your lucky color today is blue, and your lucky number is 7.
      </Text>
    </Box>
  );
}
function PersonalisedInsight() {
  return (
    <Stack
      border="4px solid"
      borderColor={"teal.400"}
      bg="white"
      p={2}
      borderRadius={"lg"}
      fontSize={"2xs"}
      whiteSpace={"pre-wrap"}
      spacing={2}
      px={3}
    >
      <Text>
        <Span color="black">🔮 Overall Vibe</Span>
        <br />
        Today is a day of profound transformation, especially in your career sphere. The cosmos is
        urging you to embrace change and use your innovative Aquarius spirit to navigate through.
      </Text>
      <Text>
        <Span color="black">🌙 Emotional Landscape</Span>
        <Span color="pink.600">
          <br />
          Moon in Scorpio:
        </Span>{" "}
        Expect deep emotional revelations that could lead to significant shifts in how you approach
        your professional life.
        <br />
        <Span color="pink.600">Insight:</Span> Dive into these emotions; they're the key to
        understanding what changes need to be made. opportunities on the horizon.
      </Text>
      <Text>
        <Span color="black">💼 Career Dynamics:</Span>
        <br />
        <Span color="pink.600">Mars in the 10th House:</Span> Your ambition is at an all-time high,
        pushing you towards assertive action in your career.
        <br />
        <Span color="pink.600">Action Points:</Span> Leverage your unique ideas for a breakthrough.
        Be prepared for power struggles with authority figures; use your intuition to navigate
        these.
      </Text>
      <Text>
        <Span color="black">✨ Personal Growth:</Span> Transformation is your theme today. Embrace
        it, and let it guide you toward your next big achievement. Innovation is your best friend.
        Your ability to think outside the box is what will lead you to success.
      </Text>
      <Text>
        <Span color="black">🎨 Lucky Color & Number:</Span> Color: Deep Red 🟥 - symbolizing courage
        and power. Number: 22 - indicating significant changes and
      </Text>
    </Stack>
  );
}
