import {
  ShortTextState,
  QuizQuestionsState,
  DateState,
  SingleState,
  LocationState,
  TimeState,
  MultiState,
} from "@martynasj/quiz-lib";

import { getZodiacSign } from "@services/zodiacService";

import { toTitleCase } from "@utils/string";
import { createTime } from "./dates";
import { createBirthOrigin, createHoroscopeData } from "./natalChart";

// IMPORTANT: change this if structure changes, to invalidate local storage
export const STATE_VERSION = 5;

export type QuizStateParsed = ReturnType<typeof getPersonalInfoFromState>;

function splitFullName(fullName: string) {
  const parts = fullName.split(" ");
  const firstName = parts[0];
  const lastName = parts.slice(1).join(" ");

  return { firstName, lastName };
}

function calculateAge(birthdate: string, currentDate: string): number {
  const birthDateObj = new Date(birthdate);
  const currentDateObj = new Date(currentDate);

  const ageDiffMs = currentDateObj.getTime() - birthDateObj.getTime();
  const ageDate = new Date(ageDiffMs);

  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export function calcPersonalInfo({
  yourBirthDate,
  yourBirthTime,
  yourBirthLocation,
}: QuizStateParsed) {
  const birthOrigin = createBirthOrigin({
    year: yourBirthDate.year,
    month: yourBirthDate.month - 1,
    date: yourBirthDate.day,
    hour: yourBirthTime.time24.hour,
    minute: yourBirthTime.time24.minute,
    latitude: yourBirthLocation.lat,
    longitude: yourBirthLocation.long,
  });

  return {
    birthOrigin,
  };
}

export function getPersonalInfoFromState(state: QuizQuestionsState) {
  const yourGender = (state["your-gender"] as SingleState)?.value?.value.toLowerCase() ?? "male";
  const fullname = toTitleCase((state["name-slide"] as ShortTextState)?.value ?? "Anonymous");

  const { firstName, lastName } = splitFullName(fullname);

  const email = (state["your-email"] as ShortTextState)?.value ?? "";

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

  const horoscope = createHoroscopeData({
    year: yourBirthDate.year,
    month: yourBirthDate.month - 1,
    date: yourBirthDate.day,
    hour: yourBirthTime.time24.hour,
    minute: yourBirthTime.time24.minute,
    latitude: yourBirthLocation.lat,
    longitude: yourBirthLocation.long,
  });

  const yourAge = calculateAge(
    `${yourBirthDate.year}-${yourBirthDate.month}-${yourBirthDate.day}`,
    new Date().toISOString()
  );

  const struggleAreas =
    (state["decision-making-struggles"] as MultiState)?.value?.map((it) => it.value) ?? [];

  const focusArea = (state["astrologer-theme-preferences"] as SingleState)?.value?.value;

  const astrologyLevel =
    (state["your-astrological-involvement"] as SingleState)?.value?.value ?? "";

  const dedicationTime = (state["dedication-time"] as SingleState)?.value?.value ?? "";

  const horoscopeFreqWeekly = (state["daily-horoscope"] as SingleState)?.value?.value ?? "";

  const answerLongevity = (state["answer-longevity"] as SingleState)?.value?.value ?? "";

  const mostImportantFeature =
    (state["most-important-program-feature"] as SingleState)?.value?.value ?? "";

  return {
    version: STATE_VERSION, // IMPORTANT: change this if structure changes, to invalidate local storage
    fullname,
    firstName,
    lastName,
    yourGender,
    yourAge,
    yourBirthDate,
    yourBirthTime,
    yourBirthLocation,
    yourZodiac,
    horoscope,
    struggleAreas,
    focusArea,
    astrologyLevel,
    dedicationTime,
    horoscopeFreqWeekly,
    answerLongevity,
    mostImportantFeature,
    email,
  };
}
