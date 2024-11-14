import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";

import { isProdMode } from "@utils/isProdMode";
import { trackPosthogEvent } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { clearStorage, saveToStorage } from "@utils/localStorage";
import { calcPersonalInfo, getTypedQuizState } from "@utils/state";
import {
  AreasOfInterestSlide,
  EmailSlide,
  Loading_SavingAstrologerPreferences,
  MajorLifeEventsSlide,
  Loading_NatalChart,
  NatalChartSlide,
  RelationshipStatusSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourBirthTimeSlide,
  YourGenderSlide,
  YourNameSlide,
  ChooseAstrologerSlide,
  TestimonialSlide,
} from "@components/quizpage/slides";
import { useUserProfileState } from "src/appState";
import posthog from "posthog-js";
import { NatalChartStatsSlide } from "@components/quizpage/slides/natalChartStatsSlide";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export const Head = () => {
  return <SEO />;
};

export default function OnboardingQuiz() {
  const [mounted, setMounted] = useState(false);
  const [_, setUserProfile] = useUserProfileState();

  useEffect(() => {
    setMounted(true);
    // reset state
    clearStorage("quizstate");
    setUserProfile({ result: undefined, error: undefined, isLoading: false });
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
        trackPosthogEvent(event);
      }}
      onSlideSubmitted={async (state) => {
        const rawState = await state.getQuizState();
        const parsedState = getTypedQuizState(rawState);
        const calcState = calcPersonalInfo(parsedState);

        posthog.setPersonProperties({
          email: parsedState.email,
          gender: parsedState.yourGender,
          birth_date_local: calcState.birthOrigin.localTimeFormatted,
          birth_date_local_extracted: {
            year: parsedState.yourBirthDate.year,
            month: parsedState.yourBirthDate.month - 1,
            date: parsedState.yourBirthDate.day,
          },
          birth_date_utc: calcState.birthOrigin.utcTimeFormatted,
          birth_place: parsedState.yourBirthLocation,
          theme_focus: parsedState.areasOfInterest?.map((a) => a.value),
          astrologer_persona_id: parsedState.astrologerID,
          relationship_status: parsedState.relationshipStatus,
        });
      }}
    >
      <QuizStateSaver />
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
          <Loading_NatalChart />
          <NatalChartSlide />
          {/* <AstrologicalKnowledgeLevelSlide /> */}
          <AreasOfInterestSlide />
          <RelationshipStatusSlide />
          <MajorLifeEventsSlide />

          <YourNameSlide />
          <ChooseAstrologerSlide />
          <Loading_SavingAstrologerPreferences />
          <NatalChartStatsSlide />
          <TestimonialSlide />
          {/* <QuoteSlide /> */}
          <EmailSlide />
        </Segment>
      </QuizUI>
    </QuizProvider>
  );
}

function QuizStateSaver() {
  const q = useQuizSnapshot();

  useEffect(() => {
    const quizState = getTypedQuizState(q.slideStateByID);
    saveToStorage("quizstate", quizState);
  }, [q.slideStateByID]);

  return null;
}
