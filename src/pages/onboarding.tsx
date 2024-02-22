import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";
import { navigate } from "gatsby";

import { QuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { trackEvent, trackPixel } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { saveQuizState } from "@utils/localStorage";
import { getPersonalInfoFromState } from "@utils/state";
import { YourBirthDateSlide } from "@components/quizpage/slides/YourBirthDateSlide";
import { YourBirthTimeSlide } from "@components/quizpage/slides/YourBirthTimeSlide";
import { YourBirthPlaceSlide } from "@components/quizpage/slides/YourBirthPlaceSlide";
import { CreatingSelfDiscoveryGuideSlide } from "@components/quizpage/slides/FinetuningSavingSlide";
import { EmailSlide } from "@components/quizpage/slides/EmailSlide";
import {
  AdviceSeekingFrequency,
  DecisionChallengeAgreement,
  DecisionMakingStruggles,
  FillerPeopleInControl,
  Filler_MentorshipProgramIntro,
  HyperPersonalisedInsights,
  InsightSourcesSlide,
  InsightVsHoroscopeComparison,
  NatalChartReading,
  QuoteSlide,
  WrongDecisionSlide,
} from "@components/quizpage/questions";
import { PersonalityDescriptionSlide } from "@components/quizpage/slides/PersonalityDescriptionSlide";
import { Loading_CreatingNatalChartReading } from "@components/quizpage/slides/SavingProfileSlide";
import { AsnwerLongevity } from "@components/quizpage/slides/AsnwerLongevity";
import {
  AskingQuestionsDirectly,
  AstrologerThemePreferences,
  DailyHoroscope,
} from "@components/quizpage/slides/otherSlides";
import { FinalizingProfileSlide } from "@components/quizpage/slides/FinalizingProfileSlide";
import { YourAstrologicalInvolvementSlide } from "@components/quizpage/slides/YourAstrologicalInvolvementSlide";

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
          navigate("/summary");
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
            <YourBirthDateSlide />
            <YourBirthTimeSlide />
            <YourBirthPlaceSlide />
            <PersonalityDescriptionSlide />
            <DecisionMakingStruggles />
            <AdviceSeekingFrequency />
            <WrongDecisionSlide />
            <FillerPeopleInControl />
            <YourAstrologicalInvolvementSlide />
            <QuoteSlide />
            <InsightSourcesSlide />
            <NatalChartReading />
            <HyperPersonalisedInsights />
            <Loading_CreatingNatalChartReading />
            <Filler_MentorshipProgramIntro />
            <AstrologerThemePreferences />
            <DailyHoroscope />
            <AsnwerLongevity />
            <FinalizingProfileSlide />
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
