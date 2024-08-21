import { DateState, EmailState, QuizQuestionsState, SingleState } from "@martynasj/quiz-lib/index";
import { getZodiacSign } from "@services/zodiacService";
import { createTime } from "@utils/dates";

export type QuizStateTyped = ReturnType<typeof getTypedQuizState>;

export function getZodiacFromState(state: QuizStateTyped) {
  return getZodiacSign(
    new Date(
      state.yourBirthDate.year,
      state.yourBirthDate.month - 1,
      state.yourBirthDate.day
    ).toISOString()
  );
}

export function getTypedQuizState(state: QuizQuestionsState) {
  const yourGender = (state["your-gender"] as SingleState)?.value?.value.toLowerCase() ?? "male";
  const focusArea = (state["life-area"] as SingleState)?.value?.value;
  const email = (state["your-email"] as EmailState)?.value ?? "";

  const yourBirthDate = (state["your-birth-date"] as DateState)?.value ?? {
    year: 1990,
    month: 4,
    day: 15,
  };

  // since we don't ask this question, default to this time
  const yourBirthTime = createTime({
    hour: 10,
    minute: 20,
    meridiem: "am",
  });

  // we don't ask, so default to mid US
  const yourBirthLocation = {
    formattedText: "",
    lat: 39.7508287,
    long: -101.532943,
    placeID: "323203125123",
  };

  return {
    yourGender,
    yourBirthDate,
    yourBirthTime,
    yourBirthLocation,
    email,
    focusArea,
  };
}
