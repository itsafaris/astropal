export type PricingPlanType = {
  id: string;
  title: string;
  price: number;
  priceBefore: number;
  daily: number;
  dailyBefore: number;
  durationInMonths: number;
};

export const pricingPlans = {
  "6month": {
    id: "6month",
    title: "6 month plan",
    price: 49.99,
    priceBefore: 199.99,
    daily: 0.28,
    dailyBefore: 1.11,
    durationInMonths: 6,
  },
  "3month": {
    id: "3month",
    title: "3 month plan",
    price: 39.99,
    priceBefore: 116.99,
    daily: 0.43,
    dailyBefore: 1.25,
    durationInMonths: 3,
  },
  "1month": {
    id: "1month",
    title: "1 month plan",
    price: 29.99,
    priceBefore: 59.99,
    daily: 0.99,
    dailyBefore: 1.99,
    durationInMonths: 1,
  },
} satisfies Record<string, PricingPlanType>;

export function getPlanByID(id: string): PricingPlanType | undefined {
  // @ts-ignore
  return pricingPlans[id];
}
