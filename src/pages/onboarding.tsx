import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";

import { NatalChartPreviewSlide } from "@components/quizpage/slides/NatalChartPreview";
import { FirstQuestionTrial } from "@components/quizpage/slides/FirstTrialQuestion";
import { QuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { trackEvent, trackPixel } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { saveQuizState } from "@utils/localStorage";
import { getPersonalInfoFromState } from "@utils/state";
import { SelfDiscoveryReadiness } from "@components/quizpage/slides/SelfDiscoveryReadiness";
import { IntroSlide } from "@components/quizpage/slides/IntroSlide";
import { YourBirthDateSlide } from "@components/quizpage/slides/YourBirthDateSlide";
import { SatisfactionScoreSlide } from "@components/quizpage/slides/SatisfactionScoreSlide";
import { YourBirthTimeSlide } from "@components/quizpage/slides/YourBirthTimeSlide";
import { YourBirthPlaceSlide } from "@components/quizpage/slides/YourBirthPlaceSlide";
import { YourProfileSavingSlide } from "@components/quizpage/slides/YourProfileSavingSlide";
import { DescribeYourNatalChart } from "@components/quizpage/slides/DescribeYourNatalChart";
import { AsnwerLongevity } from "@components/quizpage/slides/AsnwerLongevity";
import { SocialProofFiller } from "@components/quizpage/slides/SocialProofFiller";
import { IntroToFinetuningPart } from "@components/quizpage/slides/IntroToFinetuningPart";
import { FinilisingAstrologerSlide } from "@components/quizpage/slides/FinilisingAstrologerSlide";
import { AstrologerReadySlide } from "@components/quizpage/slides/AstrologerReadySlide";
import { YourPersonalityTypeSlide } from "@components/quizpage/slides/YourPersonalityTypeSlide";
import { YourValuesAndPrioritiesSlide } from "@components/quizpage/slides/YourValuesAndPrioritiesSlide";
import { YourSpiritualInvolvementSlide } from "@components/quizpage/slides/YourSpiritualInvolvementSlide";
import { NameSlide } from "@components/quizpage/slides/NameSlide";
import { PersonalGrowthScore } from "@components/quizpage/slides/PersonalGrowthScore";
import { RelationshipScore } from "@components/quizpage/slides/RelationshipScore";
import { CareerScore } from "@components/quizpage/slides/CareerScore";
import { SavingWithTestimonialSlide } from "@components/quizpage/slides/FinetuningSavingSlide";

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
            {/* <SatisfactionScoreSlide /> */}
            <AsnwerLongevity />
            <SavingWithTestimonialSlide />
            {/* <SocialProofFiller /> */}
            <IntroToFinetuningPart />
            <PersonalGrowthScore />
            <RelationshipScore />
            <CareerScore />
            <YourSpiritualInvolvementSlide />
            <SelfDiscoveryReadiness />
            {/* <YourPersonalityTypeSlide />
            <YourValuesAndPrioritiesSlide />
            <NameSlide /> */}
            <FinilisingAstrologerSlide />
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
