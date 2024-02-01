import { useQuizActions, useQuizSnapshot } from "../internal/state";

export function useQuiz() {
  const actions = useQuizActions();
  return {
    submitQuestion() {
      actions.submitQuestion();
    },
  };
}

export function useQuizState() {
  const snap = useQuizSnapshot();
  return {
    quizState: snap.slideStateByID,
  };
}
