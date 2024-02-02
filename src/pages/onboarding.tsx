import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";

import { NatalChartPreviewSlide } from "@components/quizpage/slides/NatalChartPreview";

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
import { CreatingSelfDiscoveryGuideSlide } from "@components/quizpage/slides/FinetuningSavingSlide";
import { EmailSlide } from "@components/quizpage/slides/EmailSlide";
import {
  AstrologerThemePreferences,
  DailyHoroscope,
  NotificationReceiver,
  SavingYourPreferences,
  YourGuidanceIsReady,
  AstrologerAdviceRelationships,
  AstrologerAdviceCareer,
  AstrologerAdvicePersonality,
} from "@components/quizpage/slides/otherSlides";
import {
  AdviceSeekingFrequency,
  DecisionChallengeAgreement,
  DecisionMakingStruggles,
  LifeChangeTiming,
} from "@components/quizpage/questions";

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
            <DecisionMakingStruggles />
            <AdviceSeekingFrequency />
            <DecisionChallengeAgreement />
            <LifeChangeTiming />
            {/* <IntroSlide /> */}
            <YourBirthDateSlide />
            <YourBirthTimeSlide />
            <YourBirthPlaceSlide />
            {/* <YourProfileSavingSlide /> */}
            {/* <NatalChartPreviewSlide /> */}
            <AstrologerAdvicePersonality />
            <AstrologerAdviceRelationships />
            <AstrologerAdviceCareer />
            {/* <PersonalGrowthScore /> */}
            {/* <RelationshipScore /> */}
            {/* <CareerScore /> */}
            {/* <SavingYourPreferences /> */}
            {/* <YourGuidanceIsReady /> */}
            {/* <AsnwerLongevity /> */}
            {/* <AstrologerThemePreferences /> */}
            {/* <DailyHoroscope /> */}
            {/* <NotificationReceiver /> */}
            {/* <CreatingSelfDiscoveryGuideSlide /> */}
            <EmailSlide />
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
