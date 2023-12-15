import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import { QuizUI } from "@martynasj/quiz-lib";
import {
  PartnerPersonalInfoSegment,
  PersonalInfoSegment,
  GoalSegment,
} from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";

import { SEO } from "@components/seo";

export const Head = () => {
  return <SEO />;
};

export default function QuizInRelationship() {
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
          <PartnerPersonalInfoSegment />
        </QuizUI>
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
