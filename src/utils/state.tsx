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
import { StaticImage } from "gatsby-plugin-image";
import { createHoroscopeData } from "./natalChart";

// IMPORTANT: change this if structure changes, to invalidate local storage
export const STATE_VERSION = 1;

export type QuizStateParsed = ReturnType<typeof getPersonalInfoFromState>;

export const astrologers = {
  astrologer1: {
    image: (
      <StaticImage
        alt="image of astropal astrologer"
        src={"../images/patterns/pattern-icon-1.svg"}
      />
    ),
  },
  astrologer2: {
    image: (
      <StaticImage
        alt="image of astropal astrologer"
        src={"../images/patterns/pattern-icon-2.svg"}
      />
    ),
  },
  astrologer3: {
    image: (
      <StaticImage
        alt="image of astropal astrologer"
        src={"../images/patterns/pattern-icon-3.svg"}
      />
    ),
  },
  astrologer4: {
    image: (
      <StaticImage
        alt="image of astropal astrologer"
        src={"../images/patterns/pattern-icon-4.svg"}
      />
    ),
  },
};

export function getAstrologer(id: keyof typeof astrologers) {
  return astrologers[id];
}

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

  const astrologerID = (state["choose-astrologer"] as SingleState)?.value?.value;
  const astrologer = astrologerID ? getAstrologer(astrologerID as any) : astrologers.astrologer1;
  const horoscope = createHoroscopeData({
    year: yourBirthDate.year,
    month: yourBirthDate.month,
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
    astrologer,
    horoscope,
    struggleAreas,
  };
}
