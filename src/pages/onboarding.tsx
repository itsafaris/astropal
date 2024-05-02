import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";

import { isProdMode } from "@utils/isProdMode";
import { setPersonProperties, trackEvent } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { clearQuizState, saveQuizState } from "@utils/localStorage";
import { calcPersonalInfo, getTypedQuizState } from "@utils/state";
import {
  AreasOfInterestSlide,
  AstrologicalKnowledgeLevelSlide,
  EmailSlide,
  Loading_SavingAstrologerPreferences,
  MajorLifeEventsSlide,
  Loading_NatalChart,
  NatalChartSlide,
  QuoteSlide,
  RelationshipStatusSlide,
  YourBirthDateSlide,
  YourBirthPlaceSlide,
  YourBirthTimeSlide,
  YourGenderSlide,
  YourNameSlide,
  WeaknessSlide,
} from "@components/quizpage/slides";
import { useUserProfileState } from "src/appState";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export const Head = () => {
  return <SEO title="Start your journey now" />;
};

export default function OnboardingQuiz() {
  const [mounted, setMounted] = useState(false);
  const [_, setUserProfile] = useUserProfileState();

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
      onSlideSubmitted={async (state) => {
        const rawState = await state.getQuizState();
        const parsedState = getTypedQuizState(rawState);
        const calcState = calcPersonalInfo(parsedState);

        setPersonProperties({
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
          dedication_time_per_day: parsedState.dedicationTime,
          answer_longevity: parsedState.answerLongevity,
        });

        // reset state
        if (state.id === "your-gender") {
          clearQuizState();
          setUserProfile({ result: undefined, error: undefined, isLoading: false });
        }
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
          <Loading_SavingAstrologerPreferences />
          <WeaknessSlide />
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
    saveQuizState(quizState);
  }, [q.slideStateByID]);

  return null;
}
