import { QuizStateParsed } from "./state";

export async function createNewUserProfile(
  input: QuizStateParsed
): Promise<{ user: { id: string }; natalChartReading: {} }> {
  const r = await fetch(`${process.env.GATSBY_CORE_URL}/createNewUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gender: input.yourGender,
      name: input.fullname,
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
      focus_area: input.focusArea,
    }),
  });

  if (r.status !== 200) {
    throw new Error(r.statusText);
  }

  const user = await r.json();

  const _reading = await fetch(
    `${process.env.GATSBY_CORE_URL}/getNatalChartReading?userID=${user.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (_reading.status !== 200) {
    throw new Error(r.statusText);
  }

  const natalChartReading = await _reading.json();

  return {
    user,
    natalChartReading,
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
