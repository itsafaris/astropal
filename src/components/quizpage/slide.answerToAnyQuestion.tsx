import { Selector, Slide } from "@martynasj/quiz-lib";

import { ChatBubble } from "./components";

export function AnswerToAnyQuestionSlide() {
  return (
    <Slide
      id="answer-to-any-question"
      type="filler"
      nextButtonProps={{ title: "Fine tune me to get better answers" }}
    >
      <ChatBubble text="You asked this and that. Here is your answer" />
      <Selector />
    </Slide>
  );
}
