import { SelectorState, useQuizActions, useQuizSnapshot } from "../internal/state";

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

export function useSlideState<T extends SelectorState>() {
  const s = useQuizSnapshot();
  const slideState = s.currentSlideID ? s.slideStateByID[s.currentSlideID] : undefined;
  return slideState as T;
}
