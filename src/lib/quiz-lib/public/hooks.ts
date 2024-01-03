import { useQuizActions } from "../internal/state";

export function useQuiz() {
  const actions = useQuizActions();
  return {
    submitQuestion() {
      actions.submitQuestion();
    },
  };
}
