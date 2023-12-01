import { useState } from "react";

import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import {
  partnerPersonalInfoSegment,
  personalInfoSegment,
  relationshipsNonSingleSegment,
} from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";
import { ShortTextState } from "@martynasj/quiz-lib/dist/internal/state";

export default function QuizInRelationship() {
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
        {partnerPersonalInfoSegment()}
        {relationshipsNonSingleSegment()}
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
