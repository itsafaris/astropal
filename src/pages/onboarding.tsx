import { QuizUI, Segment, QuizProvider, useQuizSnapshot, useQuizState } from "@martynasj/quiz-lib";

import { Filler_NatalChartPreviewSlide } from "@components/quizpage/slides/NatalChartPreview";

import { QuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { trackEvent, trackPixel } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { saveQuizState } from "@utils/localStorage";
import { getPersonalInfoFromState } from "@utils/state";
import { IntroSlide } from "@components/quizpage/slides/IntroSlide";
import { YourBirthDateSlide } from "@components/quizpage/slides/YourBirthDateSlide";
import { YourBirthTimeSlide } from "@components/quizpage/slides/YourBirthTimeSlide";
import { YourBirthPlaceSlide } from "@components/quizpage/slides/YourBirthPlaceSlide";
import { YourProfileSavingSlide } from "@components/quizpage/slides/YourProfileSavingSlide";
import { AsnwerLongevity } from "@components/quizpage/slides/AsnwerLongevity";

import { PersonalGrowthScore } from "@components/quizpage/slides/PersonalGrowthScore";
import { RelationshipScore } from "@components/quizpage/slides/RelationshipScore";
import { CareerScore } from "@components/quizpage/slides/CareerScore";
import { Loading_CreatingBook } from "@components/quizpage/slides/FinetuningSavingSlide";
import { EmailSlide } from "@components/quizpage/slides/EmailSlide";
import {
  Loading_CreatingBirthChart,
  Filler_BookStructure,
  Filler_IntroToPersonality,
  Loading_CreatingBlueprint,
} from "@components/quizpage/slides/otherSlides";
import {
  AstrologyExperienceLevel,
  DecisionChallengeAgreement,
  DecisionMakingStruggles,
  DefineSuccess,
  DetailLevelPreference,
  FillerPeopleInControl,
  HyperPersonalisedInsights,
  IncludeRealLifeExamples,
  InsightVsHoroscopeComparison,
  LifeChangeTiming,
  NameOnTheBook,
  SelfUnderstanding,
  TopPersonalGoal,
} from "@components/quizpage/questions";
import { YourGenderSlide } from "@components/quizpage/slides/YourGenderSlide";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export const Head = () => {
  return <SEO />;
};

export default function OnboardingQuiz() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QuizProvider
      showDebugUI={!isProdMode()}
      onErrorEvent={(_) => {
        //
      }}
      locationApiKey={locationApiKey}
      onTrackingEvent={(event) => {
        trackEvent(event);
      }}
    >
      <QuizStateSaver />
      <QuizServiceWrapper>
        <QuizUI
          containerProps={{
            minH: "100vh",
          }}
        >
          <Segment title="Progress">
            <YourGenderSlide />
            <YourBirthDateSlide />
            <YourBirthTimeSlide />
            <YourBirthPlaceSlide />
            <Loading_CreatingBirthChart />
            <Filler_NatalChartPreviewSlide />
            <Filler_IntroToPersonality />
            <SelfUnderstanding />
            <DefineSuccess />
            <DecisionMakingStruggles />
            <DecisionChallengeAgreement />
            <LifeChangeTiming />
            <AstrologyExperienceLevel />
            <TopPersonalGoal />
            <Loading_CreatingBlueprint />
            <Filler_BookStructure />
            <NameOnTheBook />
            <Loading_CreatingBook />
            <EmailSlide />
          </Segment>
        </QuizUI>
      </QuizServiceWrapper>
    </QuizProvider>
  );
}

function QuizStateSaver() {
  const { quizState } = useQuizState();

  useEffect(() => {
    const q = getPersonalInfoFromState(quizState);
    saveQuizState(q);
  }, [quizState]);

  return null;
}
