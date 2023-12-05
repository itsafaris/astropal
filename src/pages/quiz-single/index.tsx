import { useState } from "react";

import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import { personalInfoSegment } from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";
import { ShortTextState } from "@martynasj/quiz-lib";

export default function QuizSingle() {
  const [birthname, setBirthname] = useState("");

  return (
    <QuizPageWrapper>
      <QuizWrapper
        onSlideSubmitted={(slide) => {
          if (slide.id === "birth-name") {
            setBirthname((slide.state as ShortTextState).value ?? "");
          }
        }}
      >
        {personalInfoSegment({ birthname })}
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
