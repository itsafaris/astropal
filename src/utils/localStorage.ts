import { QuizStateParsed, STATE_VERSION } from "./state";
import { getZodiacSign } from "@services/zodiacService";

export function saveQuizState(state: QuizStateParsed) {
  localStorage.setItem("quizstate", JSON.stringify(state));
}

export function clearQuizState() {
  localStorage.removeItem("quizstate");
}

export function loadQuizState(): QuizStateParsed | undefined {
  const it = localStorage.getItem("quizstate");
  if (!it) {
    return;
  }

  let state;

  try {
    state = JSON.parse(it);
  } catch (err) {
    return;
  }

  if (!isQuizState(state)) {
    localStorage.removeItem("quizstate");
    return;
  }

  if (state.version !== STATE_VERSION) {
    localStorage.removeItem("quizstate");
    return;
  }

  state.yourZodiac = getZodiacSign(
    new Date(
      state.yourBirthDate.year,
      state.yourBirthDate.month - 1,
      state.yourBirthDate.day
    ).toISOString()
  );

  return state;
}

function isQuizState(obj: unknown): obj is QuizStateParsed {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }
  return true;
}
