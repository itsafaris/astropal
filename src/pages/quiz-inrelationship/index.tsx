import { useState } from "react";

import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import {
  partnerPersonalInfoSegment,
  personalInfoSegment,
  relationshipsNonSingleSegment,
  goalSegment,
} from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";

export default function QuizInRelationship() {
  const [birthname, setBirthname] = useState("");

  return (
    <QuizPageWrapper>
      <QuizWrapper
        onSlideSubmitted={(slide) => {
          if (slide.id === "birth-name" && slide.state.type === "short-text") {
            setBirthname(slide.state.value ?? "");
          }
        }}
      >
        {goalSegment()}
        {personalInfoSegment({ birthname })}
        {partnerPersonalInfoSegment()}
        {relationshipsNonSingleSegment()}
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
