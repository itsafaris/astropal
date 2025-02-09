import { QuizUI, Segment, QuizProvider } from "@martynasj/quiz-lib";

import { isProdMode } from "@utils/isProdMode";
import { trackPosthogEvent, trackPixelEvent } from "@utils/tracking";
import { SEO } from "@components/seo";
import { useEffect, useState } from "react";

import {
  YourGenderSlide,
  YourBirthDateSlide,
  LifeArea,
  FillerFaceInformation,
  ElementSlide,
  DecisionMaking,
  LoadingSimilarPeople,
  IntroToScan,
  EmailSlide,
} from "@components/faceReading/slides";
import { FaceScanSlide } from "@components/faceReading/faceScanSlide";
import { FaceScanAnalysisSlide } from "@components/faceReading/faceScanAnalysisSlide";
import posthog from "posthog-js";
import { getTypedQuizState } from "@components/faceReading/quizState";
import { calcPersonalInfo } from "@utils/state";
import { TopNavigation } from "@components/topnavigation";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export const Head = () => {
  return <SEO />;
};

export default function FaceReadingPage() {
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
        trackPosthogEvent(event);

        if (event.name === "slide-entered") {
          trackPixelEvent({ event: "ViewContent" });
        }
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
          theme_focus: parsedState.focusArea,
        });
      }}
    >
      <QuizUI
        headerComponent={<TopNavigation border="none" />}
        containerProps={{
          minH: "100vh",
        }}
        progressContainerProps={{
          showTitle: false,
          pt: 0,
        }}
      >
        <Segment title="">
          <YourGenderSlide />
          <LifeArea />
          <FillerFaceInformation />
          <YourBirthDateSlide />
          <ElementSlide />
          <DecisionMaking />
          <LoadingSimilarPeople />
          <IntroToScan />
          <FaceScanSlide />
          <FaceScanAnalysisSlide />
          <EmailSlide />
        </Segment>
      </QuizUI>
    </QuizProvider>
  );
}
