import { ShortTextState, QuizQuestionsState, DateState, SingleState } from "@martynasj/quiz-lib";

import { getZodiacSign } from "@utils/service";

import { toTitleCase } from "@utils/string";

function splitFullName(fullName: string) {
  const parts = fullName.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

export function getPersonalInfoFromState(state: QuizQuestionsState) {
  const yourGender = (state["your-gender"] as SingleState)?.value?.value;
  const yourName = toTitleCase((state["your-birth-name"] as ShortTextState)?.value ?? "Anonymous");
  const yourBirthDate = (state["your-birth-date"] as DateState)?.value ?? {
    year: 1990,
    month: 1,
    day: 1,
  };

  const yourZodiac = getZodiacSign(
    new Date(yourBirthDate.year, yourBirthDate.month - 1, yourBirthDate.day).toISOString()
  );

  const partnerName = splitFullName(
    toTitleCase((state["partner-birth-name"] as ShortTextState)?.value ?? "Anonymous")
  );

  return {
    yourName,
    yourGender,
    yourBirthDate,
    yourZodiac,
    partnerName,
  };
}
