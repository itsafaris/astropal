import { QuizStateParsed } from "./state";

export async function createNewUserProfile(input: QuizStateParsed): Promise<{ id: string }> {
  const r = await fetch(`${process.env.GATSBY_CORE_URL}/createNewUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gender: input.yourGender,
      current_tz_id: Intl.DateTimeFormat().resolvedOptions().timeZone,
      dob_local_year: input.yourBirthDate.year,
      dob_local_month: input.yourBirthDate.month - 1,
      dob_local_date: input.yourBirthDate.day,
      dob_local_hour: input.yourBirthTime.time24.hour,
      dob_local_minute: input.yourBirthTime.time24.minute,
      birth_place_place_id: input.yourBirthLocation.placeID,
      birth_place_formatted_text: input.yourBirthLocation.formattedText,
      birth_place_lat: input.yourBirthLocation.lat,
      birth_place_lng: input.yourBirthLocation.long,
    }),
  });

  if (r.status !== 200) {
    throw new Error(r.statusText);
  }

  return await r.json();
}

export async function createNatalChartReading({ userID }: { userID: string }): Promise<void> {
  const r = await fetch(`${process.env.GATSBY_CORE_URL}/createNatalChartReading`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: userID,
    }),
  });

  if (r.status !== 200) {
    throw new Error(r.statusText);
  }
}

export async function updateUserProfile({
  quizState,
  userID,
}: {
  quizState: QuizStateParsed;
  userID: string;
}): Promise<{ user: { id: string } }> {
  const r = await fetch(`${process.env.GATSBY_CORE_URL}/updateUserProfile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: userID,
      name: quizState.fullname,
      areas_of_interest: quizState.areasOfInterest?.map((it) => it.value),
      major_life_events: quizState.majorLifeEvents?.map((it) => it.value),
      relationship_status: quizState.relationshipStatus,
      astrologer_persona_id: quizState.astrologerID,
    }),
  });

  if (r.status !== 200) {
    throw new Error(r.statusText);
  }

  const user = await r.json();

  return {
    user,
  };
}

export async function convertUserFromAnonymous(input: {
  userID: string;
  email: string;
}): Promise<{ id?: string }> {
  const r = await fetch(`${process.env.GATSBY_CORE_URL}/convertUserFromAnonymous`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID: input.userID,
      email: input.email,
    }),
  });

  if (r.status !== 200) {
    throw new Error(r.statusText);
  }

  return await r.json();
}
