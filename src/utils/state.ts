import { ShortTextState, QuizQuestionsState, DateState } from "@martynasj/quiz-lib";

import { getZodiacSign } from "@utils/service";

import { toTitleCase } from "@utils/string";

function splitFullName(fullName: string) {
  const parts = fullName.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

export function getPersonalInfoFromState(state: QuizQuestionsState) {
  const _name = (state["your-birth-name"] as ShortTextState).value ?? "Anonymous";
  const _birthDate = (state["your-birth-date"] as DateState).value ?? {
    year: 1990,
    month: 1,
    day: 1,
  };

  const fullName = toTitleCase(_name);

  const birthDatetime = new Date(
    _birthDate.year,
    _birthDate.month - 1,
    _birthDate.day
  ).toISOString();
  const zodiac = getZodiacSign(birthDatetime);

  const _partnerName = (state["partner-birth-name"] as ShortTextState).value ?? "Anonymous";
  const partnerName = splitFullName(toTitleCase(_partnerName));

  return {
    fullName,
    birthDate: _birthDate,
    zodiac,
    partnerName,
  };
}
