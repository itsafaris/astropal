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

import { ShortTextState, DateState } from "@martynasj/quiz-lib";
import { getService } from "@utils/service";
import { getPersonalInfoFromState } from "@utils/state";
import { useQuizServiceWrapper } from "@components/quizpage/quizServiceWrapper";
import { SEO } from "@components/seo";

export const Head = () => {
  return <SEO />;
};

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
  const serviceState = useQuizServiceWrapper();

  useEffect(() => {
    async function fetchNumerologyData() {
      if (!state) {
        return;
      }

      const nameState = state.slideStateByID["birth-name"] as ShortTextState;
      const birthdateState = state.slideStateByID["birth-date"] as DateState;

      if (
        nameState &&
        nameState.value &&
        nameState.confirmed &&
        birthdateState &&
        birthdateState.value &&
        birthdateState.confirmed &&
        !serviceState.numerologyData
      ) {
        const service = getService({ mock: true });
        const personalInfo = getPersonalInfoFromState(state.slideStateByID);
        const numerologyData = await service.getNumerologyData({
          day: birthdateState.value.day,
          month: birthdateState.value.month,
          year: birthdateState.value.year,
          name: nameState.value,
        });

        serviceState.setNumerologyData({
          zodiacSign: personalInfo.zodiac.name,
          destinyNumber: numerologyData.destiny_number,
          favDay: numerologyData.fav_day,
          favMetal: numerologyData.fav_metal,
          favStone: numerologyData.fav_stone,
        });
      }
    }

    fetchNumerologyData();
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
