import { ShortTextState, QuizQuestionsState, DateState } from "@martynasj/quiz-lib";

import { getZodiacSign } from "@utils/service";

import { toTitleCase } from "@utils/string";

export function getPersonalInfoFromState(state: QuizQuestionsState) {
  const _name = (state["birth-name"] as ShortTextState).value ?? "Anonymous";
  const _birthDate = (state["birth-date"] as DateState).value ?? { year: 1990, month: 1, day: 1 };

  const fullName = toTitleCase(_name);

  const birthDatetime = new Date(
    _birthDate.year,
    _birthDate.month - 1,
    _birthDate.day
  ).toISOString();
  const zodiac = getZodiacSign(birthDatetime);

  return {
    fullName,
    birthDate: _birthDate,
    zodiac,
  };
}
