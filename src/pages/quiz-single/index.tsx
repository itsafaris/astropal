import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import { IdealPartnerSegment } from "@components/quizpage/quizSegments";
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
          <IdealPartnerSegment />
        </QuizUI>
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
