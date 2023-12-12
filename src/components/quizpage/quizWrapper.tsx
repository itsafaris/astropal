import { QuizProvider, QuizProps } from "@martynasj/quiz-lib";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

import { QuizServiceWrapper } from "./quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { trackEvent } from "@utils/tracking";

export function QuizWrapper(props: Omit<QuizProps, "locationApiKey">) {
  return (
    <QuizServiceWrapper>
      <QuizProvider
        showDebugUI={!isProdMode()}
        onErrorEvent={(_) => {
          //
        }}
        locationApiKey={locationApiKey}
        onSlideChange={(slide) => {
          trackEvent({ event: "slide-change", slideID: slide.id });
        }}
        {...props}
      />
    </QuizServiceWrapper>
  );
}
