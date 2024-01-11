import { QuizStateParsed, STATE_VERSION } from "./state";

export function saveQuizState(state: QuizStateParsed) {
  localStorage.setItem("quizstate", JSON.stringify(state));
}

export function loadQuizState() {
  const it = localStorage.getItem("quizstate");
  if (!it) {
    return;
  }

  let maybestate;
  try {
    maybestate = JSON.parse(it);
  } catch (err) {
    return;
  }

  if (!isQuizState(maybestate)) {
    localStorage.removeItem("quizstate");
    return;
  }

  if (maybestate.version !== STATE_VERSION) {
    localStorage.removeItem("quizstate");
    return;
  }

  return maybestate;
}

function isQuizState(obj: unknown): obj is QuizStateParsed {
  if (typeof obj !== "object" || obj == null) {
    return false;
  }
  return true;
}
