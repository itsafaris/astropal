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

  const partnerName = splitFullName(
    toTitleCase((state["partner-birth-name"] as ShortTextState)?.value ?? "Anonymous")
  );
  const partnerGender = (state["partner-gender"] as SingleState)?.value?.value;

  const partnerBirthDate = (state["partner-birth-date"] as DateState)?.value ?? {
    year: 1990,
    month: 1,
    day: 1,
  };

  const partnerZodiac = getZodiacSign(
    new Date(partnerBirthDate.year, partnerBirthDate.month - 1, partnerBirthDate.day).toISOString()
  );

  return {
    yourName,
    yourGender,
    yourBirthDate,
    yourBirthTime,
    yourBirthLocation,
    yourZodiac,
    partnerName,
    partnerBirthDate,
    partnerGender,
    partnerZodiac,
  };
}
