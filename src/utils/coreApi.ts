import { edenFetch } from "@elysiajs/eden";
import { QuizStateParsed } from "./state";
import { CoreServerType } from "@astropal/api-client";
import { siteConfig } from "src/conf";

export const eden = edenFetch<CoreServerType>(siteConfig.coreApiHost);

export type TrialPricingPlan = Awaited<ReturnType<typeof getTrialPricingPlan>>;
export type PricingPlans = Awaited<ReturnType<typeof getPricingPlans>>;

export async function createNewUserProfile(
  input: QuizStateParsed,
  funnelTheme?: "relationships" | "loneliness"
): Promise<{ id: string }> {
  const r = await fetch(`${siteConfig.coreApiHost}/createNewUser`, {
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
      initial_sales_funnel_theme: funnelTheme,
    }),
  });

  if (r.status !== 200) {
    throw new Error(r.statusText);
  }

  return await r.json();
}

export async function createNatalChartReading({ userID }: { userID: string }): Promise<void> {
  const r = await fetch(`${siteConfig.coreApiHost}/createNatalChartReading`, {
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
}) {
  return eden(`/updateUserProfile`, {
    method: "POST",
    body: {
      id: userID,
      name: quizState.fullname,
      // @ts-expect-error
      areas_of_interest: quizState.areasOfInterest?.map((it) => it.value),
      // @ts-expect-error
      major_life_events: quizState.majorLifeEvents?.map((it) => it.value),
      // @ts-expect-error
      relationship_status: quizState.relationshipStatus,
      astrologer_persona_id: quizState.astrologerID,
    },
  });
}

export async function convertUserFromAnonymous(input: { userID: string; email: string }) {
  return eden(`/convertUserFromAnonymous`, {
    method: "POST",
    body: {
      userID: input.userID,
      email: input.email,
    },
  });
}

export async function getTrialPricingPlan() {
  const res = await eden("/currentPaidTrialPricingPlan", {
    method: "GET",
  });
  return res.data!;
}

export async function getPricingPlans() {
  const res = await eden("/currentPricingPlans", {
    method: "GET",
  });
  return res.data!;
}

export async function createSubscription({
  userID,
  priceID,
  oneTimeFeePriceID,
  couponID,
}: {
  userID: string;
  priceID: string;
  oneTimeFeePriceID?: string;
  couponID?: string;
}) {
  const res = await eden("/payments/createSubscription", {
    method: "POST",
    body: {
      userID,
      priceID,
      oneTimeFeePriceID,
      couponID,
    },
  });
  return res.data!;
}
