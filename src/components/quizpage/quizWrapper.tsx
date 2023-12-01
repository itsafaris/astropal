import { Quiz, QuizProps, QuizTheme } from "@martynasj/quiz-lib";
import { brandColor } from "@utils/theme";

const quizTheme: QuizTheme = {
  mainColor: brandColor,
};

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export function QuizWrapper(props: Omit<QuizProps, "locationApiKey">) {
  return (
    <Quiz
      theme={quizTheme}
      onErrorEvent={(_) => {
        //
      }}
      {...props}
      showDebugUI
      locationApiKey={locationApiKey}
    />
  );
}
