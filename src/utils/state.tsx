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
export const STATE_VERSION = 7;

export type QuizStateParsed = ReturnType<typeof getTypedQuizState>;

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

  return {
    birthOrigin,
    horoscope,
    yourAge,
  };
}

export function getZodiacFromState(state: QuizStateParsed) {
  return getZodiacSign(
    new Date(
      state.yourBirthDate.year,
      state.yourBirthDate.month - 1,
      state.yourBirthDate.day
    ).toISOString()
  );
}

/** IMPORTANT: this function should have no derived state, only the state extracted directly from the quiz state */
export function getTypedQuizState(state: QuizQuestionsState) {
  const yourGender = (state["your-gender"] as SingleState)?.value?.value.toLowerCase() ?? "male";
  const fullname = toTitleCase((state["name-slide"] as ShortTextState)?.value ?? "");

  const email = (state["your-email"] as ShortTextState)?.value ?? "";

  const yourBirthDate = (state["your-birth-date"] as DateState)?.value ?? {
    year: 1990,
    month: 4,
    day: 15,
  };

  const yourBirthTime = createTime(
    (state["your-birth-time"] as TimeState)?.value ?? {
      hour: 10,
      minute: 20,
      meridiem: "am",
    }
  );

  const yourBirthLocation = (state["your-birth-place"] as LocationState)?.value ?? {
    formattedText: "",
    lat: 39.7508287,
    long: -101.532943,
    placeID: "323203125123",
  };

  const areasOfInterest = (state["areas-of-interest"] as MultiState)?.value;

  const dedicationTime = (state["dedication-time"] as SingleState)?.value?.value ?? "";

  const answerLongevity = (state["answer-longevity"] as SingleState)?.value?.value ?? "";

  const relationshipStatus = (state["relationship-status"] as SingleState)?.value?.value ?? "";

  const majorLifeEvents = (state["major-life-events"] as MultiState)?.value;

  const astrologerID = (state["choose-astrologer"] as SingleState)?.value?.value;

  // const astrologicalKnowledgeLevel =
  //   (state["astro-knowledge-level"] as SingleState)?.value?.value ?? "";

  return {
    version: STATE_VERSION, // IMPORTANT: change this if structure changes, to invalidate local storage
    fullname,
    yourGender,
    yourBirthDate,
    yourBirthTime,
    yourBirthLocation,
    areasOfInterest,
    dedicationTime,
    answerLongevity,
    // astrologicalKnowledgeLevel,
    majorLifeEvents,
    relationshipStatus,
    astrologerID,
    email,
  };
}
