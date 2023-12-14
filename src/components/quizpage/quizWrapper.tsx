import { QuizProvider, QuizProps } from "@martynasj/quiz-lib";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

import { QuizServiceWrapper } from "./quizServiceWrapper";
import { isProdMode } from "@utils/isProdMode";
import { trackEvent } from "@utils/tracking";

export function QuizWrapper({ children, ...rest }: Omit<QuizProps, "locationApiKey">) {
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
      {...rest}
    >
      <QuizServiceWrapper>{children}</QuizServiceWrapper>
    </QuizProvider>
  );
}
