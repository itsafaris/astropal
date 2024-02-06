import {
  ShortTextState,
  QuizQuestionsState,
  DateState,
  SingleState,
  LocationState,
  TimeState,
} from "@martynasj/quiz-lib";

import { getZodiacSign } from "@services/zodiacService";

import { toTitleCase } from "@utils/string";
import { createTime } from "./dates";

// IMPORTANT: change this if structure changes, to invalidate local storage
export const STATE_VERSION = 2;

export type QuizStateParsed = ReturnType<typeof getPersonalInfoFromState>;

function splitFullName(fullName: string) {
  const parts = fullName.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

export function getPersonalInfoFromState(state: QuizQuestionsState) {
  const yourGender = (state["your-gender"] as SingleState)?.value?.value;
  const fullname = toTitleCase((state["name-slide"] as ShortTextState)?.value ?? "Anonymous");
  const { firstName, lastName } = splitFullName(fullname);

  const yourBirthDate = (state["your-birth-date"] as DateState)?.value ?? {
    year: 1990,
    month: 4,
    day: 15,
  };

  const yourZodiac = getZodiacSign(
    new Date(yourBirthDate.year, yourBirthDate.month - 1, yourBirthDate.day).toISOString()
  );

  const yourBirthTime = createTime(
    (state["your-birth-time"] as TimeState)?.value ?? {
      hour: 10,
      minute: 20,
      meridiem: "am",
    }
  );

  const yourBirthLocation = (state["your-birth-place"] as LocationState)?.value ?? {
    formattedText: "Unknown loc",
    placeID: "0",
    lat: 55,
    long: 22,
  };

  const goal = (state["top-personal-goal"] as SingleState)?.value?.value ?? "Find ideal partner";

  return {
    version: STATE_VERSION, // IMPORTANT: change this if structure changes, to invalidate local storage
    fullname,
    firstName,
    lastName,
    yourGender,
    yourBirthDate,
    yourBirthTime,
    yourBirthLocation,
    yourZodiac,
    goal,
  };
}
