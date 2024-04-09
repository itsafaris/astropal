import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";
import { navigate } from "gatsby";

import { QuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { setPersonProperties, trackEvent, trackPixel } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { clearQuizState, saveQuizState } from "@utils/localStorage";
import { QuizStateParsed, calcPersonalInfo, getPersonalInfoFromState } from "@utils/state";
import { YourBirthDateSlide } from "@components/quizpage/slides/YourBirthDateSlide";
import { YourBirthTimeSlide } from "@components/quizpage/slides/YourBirthTimeSlide";
import { YourBirthPlaceSlide } from "@components/quizpage/slides/YourBirthPlaceSlide";

import { EmailSlide } from "@components/quizpage/slides/EmailSlide";
import {
  AdviceSeekingFrequency,
  DecisionMakingStruggles,
  FillerPeopleInControl,
  Filler_MentorshipProgramIntro,
  HyperPersonalisedInsights,
  InsightSourcesSlide,
  NatalChartReading,
  QuoteSlide,
  WrongDecisionSlide,
  YourNameSlide,
} from "@components/quizpage/questions";
import { NatalChartLoadingSlide } from "@components/quizpage/slides/NatalChartLoadingSlide";
import { NatalChartSlide } from "@components/quizpage/slides/NatalChartSlide";
import { Loading_SavingAstrologerPreferences } from "@components/quizpage/slides/SavingProfileSlide";
import { AsnwerLongevity } from "@components/quizpage/slides/AsnwerLongevity";
import {
  AstrologerThemePreferences,
  DailyHoroscope,
  DedicationTime,
  MajorLifeEventsSlide,
  MostImportantProgramFeatureSlide,
} from "@components/quizpage/slides/otherSlides";
import { FinalizingProfileSlide } from "@components/quizpage/slides/FinalizingProfileSlide";
import { YourAstrologicalInvolvementSlide } from "@components/quizpage/slides/YourAstrologicalInvolvementSlide";
import { YourGenderSlide } from "@components/quizpage/slides/YourGenderSlide";
import posthog from "posthog-js";
import { useUserProfileState } from "src/appState";
import { createNewUserProfile } from "@utils/coreApi";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export const Head = () => {
  return <SEO />;
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

  async function createUser(p: QuizStateParsed) {
    setUserProfile({ isLoading: true, result: undefined, error: undefined });
    createNewUserProfile(p)
      .then((result) => {
        setUserProfile({ isLoading: false, error: undefined, result });
      })
      .catch((err) => {
        setUserProfile({ isLoading: false, error: err, result: undefined });
      });
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
        const parsedState = getPersonalInfoFromState(rawState);
        const calcState = calcPersonalInfo(parsedState);

        setPersonProperties({
          gender: parsedState.yourGender,
          zodiac_sign: parsedState.yourZodiac.name,
          birth_date_local: calcState.birthOrigin.localTimeFormatted,
          birth_date_local_extracted: {
            year: parsedState.yourBirthDate.year,
            month: parsedState.yourBirthDate.month - 1,
            date: parsedState.yourBirthDate.day,
          },
          birth_date_utc: calcState.birthOrigin.utcTimeFormatted,
          birth_place: parsedState.yourBirthLocation,
          astrology_level: parsedState.astrologyLevel,
          theme_focus: parsedState.focusArea,
          dedication_time_per_day: parsedState.dedicationTime,
          horoscope_freq_weekly: parsedState.horoscopeFreqWeekly,
          answer_longevity: parsedState.answerLongevity,
          most_important_feature: parsedState.mostImportantFeature,
        });

        if (state.id === "your-email") {
          posthog.identify(parsedState.email);
          trackPixel("Lead", {});
        }

        if (state.id === "your-gender") {
          clearQuizState();
        }

        if (state.id === "your-birth-place") {
          void createUser(parsedState);
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
            <YourGenderSlide />
            <YourBirthDateSlide />
            <YourBirthTimeSlide />
            <YourBirthPlaceSlide />
            <NatalChartLoadingSlide />
            <NatalChartSlide />
            <AstrologerThemePreferences />
            <DedicationTime />
            <AsnwerLongevity />
            <Loading_SavingAstrologerPreferences />
            <YourNameSlide />
            <EmailSlide />
            <FinalizingProfileSlide />
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
