import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";

import {
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourProfileSavingSlide,
  YourBirthTimeSlide,
  SatisfactionScoreSlide,
  AsnwerLongevity,
  IntroToFinetuningPart,
  YourPersonalityTypeSlide,
  YourValuesAndPrioritiesSlide,
  YourSpiritualInvolvementSlide,
  FinilisingAstrologerSlide,
  IntroSlide,
  DescribeYourNatalChart,
  NameSlide,
  SocialProofFiller,
  AstrologerReadySlide,
} from "@components/quizpage/slides.simple";
import { NatalChartPreviewSlide } from "@components/quizpage/slide.natalChartPreview";
import { FirstQuestionTrial } from "@components/quizpage/slide.firstTrialQuestion";
import { QuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { trackEvent, trackPixel } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { saveQuizState } from "@utils/localStorage";
import { getPersonalInfoFromState } from "@utils/state";
import { LifeSatisfactionScoreSlide } from "@components/quizpage/slide.lifeSatisfactionScore";

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
      onSlideSubmitted={(state) => {
        if (state.id === "your-email") {
          trackPixel("Purchase", { currency: "USD", value: 30.0 });
        }
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
            <IntroSlide />
            <YourBirthDateSlide />
            <YourBirthTimeSlide />
            <YourBirthPlaceSlide />
            <YourProfileSavingSlide />
            <NatalChartPreviewSlide />
            <DescribeYourNatalChart />
            <FirstQuestionTrial />
            <SatisfactionScoreSlide />
            <AsnwerLongevity />
            <SocialProofFiller />
            <IntroToFinetuningPart />
            <YourPersonalityTypeSlide />
            <YourValuesAndPrioritiesSlide />
            <YourSpiritualInvolvementSlide />
            <NameSlide />
            <FinilisingAstrologerSlide />
            <LifeSatisfactionScoreSlide />
            <AstrologerReadySlide />
          </Segment>
        </QuizUI>
      </QuizServiceWrapper>
    </QuizProvider>
  );
}

function QuizStateSaver() {
  const q = useQuizSnapshot();

  useEffect(() => {
    const quizState = getPersonalInfoFromState(q.slideStateByID);
    saveQuizState(quizState);
  }, [q.slideStateByID]);

  return null;
}
