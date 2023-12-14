import { QuizPageWrapper } from "@components/quizpage/pageWrapper";
import { PersonalInfoSegment } from "@components/quizpage/quizSegments";
import { QuizWrapper } from "@components/quizpage/quizWrapper";

export default function QuizSingle() {
  return (
    <QuizPageWrapper>
      <QuizWrapper>
        <PersonalInfoSegment />
      </QuizWrapper>
    </QuizPageWrapper>
  );
}
