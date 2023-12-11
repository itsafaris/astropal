import { useEffect } from "react";

import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import { QuizUI, useQuizSnapshot } from "@martynasj/quiz-lib";
import {
  partnerPersonalInfoSegment,
  personalInfoSegment,
  relationshipsNonSingleSegment,
  GoalSegment,
} from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";

export default function QuizInRelationship() {
  return (
    <QuizPageWrapper>
      <QuizWrapper>
        <Quiz_ />
      </QuizWrapper>
    </QuizPageWrapper>
  );
}

function Quiz_() {
  const state = useQuizSnapshot();

  useEffect(() => {
    console.log(state.slideStateByID);
  }, [state.slideStateByID]);

  return (
    <QuizUI
      containerProps={{
        minH: "100vh",
      }}
    >
      <GoalSegment />
      {personalInfoSegment()}
      {partnerPersonalInfoSegment()}
      {relationshipsNonSingleSegment()}
    </QuizUI>
  );
}
