import { useContext } from "react";
import { QuizCtx, SelectorState, useQuizActions, useQuizSnapshot } from "../internal/state";

/** Non-reactive usage */
export function useQuizContext() {
  const c = useContext(QuizCtx).state.slideStateByID;
  return c;
}

export function useQuiz() {
  const actions = useQuizActions();
  return {
    submitQuestion() {
      return actions.submitQuestion();
    },
    checkQuestion() {
      return actions.checkQuestion();
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
