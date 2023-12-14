import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import {
  PersonalInfoSegment,
  GoalSegment,
  IdealPartnerSegment,
  RelationshipsSingleSegment,
} from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";

import { SEO } from "@components/seo";

import { QuizUI } from "@martynasj/quiz-lib";

export const Head = () => {
  return <SEO />;
};

export default function QuizSingle() {
  return (
    <QuizPageWrapper>
      <QuizWrapper>
        <QuizUI
          containerProps={{
            minH: "100vh",
          }}
        >
          <GoalSegment />
          <PersonalInfoSegment />
          <IdealPartnerSegment />
          <RelationshipsSingleSegment />
        </QuizUI>
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
