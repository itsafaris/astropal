import { QuizProvider, QuizProps } from "@martynasj/quiz-lib";

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

import { QuizServiceWrapper } from "./quizServiceWrapper";

export function QuizWrapper(props: Omit<QuizProps, "locationApiKey">) {
  return (
    <QuizServiceWrapper>
      <QuizProvider
        showDebugUI
        onErrorEvent={(_) => {
          //
        }}
        locationApiKey={locationApiKey}
        {...props}
      />
    </QuizServiceWrapper>
  );
}
