import { QuizUI, Segment, QuizProvider, useQuizSnapshot } from "@martynasj/quiz-lib";
import { navigate } from "gatsby";

import { QuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { setPersonProperties, trackEvent, trackPixel } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";
import { saveQuizState } from "@utils/localStorage";
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
import { Loading_CreatingNatalChartReading } from "@components/quizpage/slides/SavingProfileSlide";
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
          await createNewUserProfile(parsedState);
          // navigate("/summary");
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
            <DecisionMakingStruggles />
            <AdviceSeekingFrequency />
            <MajorLifeEventsSlide />
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
            <DedicationTime />
            <DailyHoroscope />
            <AsnwerLongevity />
            <MostImportantProgramFeatureSlide />
            <FinalizingProfileSlide />
            <YourNameSlide />
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

async function createNewUserProfile(input: QuizStateParsed) {
  await fetch(`${process.env.GATSBY_CORE_URL}/createNewUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: input.email,
      gender: input.yourGender,
      name: input.fullname,
      current_tz_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dob_local_year: input.yourBirthDate.year,
      dob_local_month: input.yourBirthDate.month - 1,
      dob_local_date: input.yourBirthDate.day,
      dob_local_hour: input.yourBirthTime.time24.hour,
      dob_local_minute: input.yourBirthTime.time24.minute,
      birth_place_place_id: input.yourBirthLocation.placeID,
      birth_place_formatted_text: input.yourBirthLocation.formattedText,
      birth_place_lat: input.yourBirthLocation.lat,
      birth_place_lng: input.yourBirthLocation.long,
      focus_area: input.focusArea,
    }),
  });
}
